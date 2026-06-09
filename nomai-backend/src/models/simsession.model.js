import crypto from 'crypto';

const STATUS_VALUES = ['pending', 'active', 'completed', 'abandoned'];
const MODE_VALUES = ['learning', 'recruitment'];

const initialSimSessions = [
  {
    id: 'simsession-001',
    user_id: 'user-123',
    project_id: 'project-001',
    company_id: 'company-001',
    ai_persona_id: 'persona-001',
    status: 'active',
    mode: 'recruitment',
    started_at: new Date().toISOString(),
    completed_at: null,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date().toISOString(),
    trigger_log: [
      {
        trigger_id: 'trigger-001',
        event: 'session_started',
        timestamp: new Date().toISOString(),
        metadata: { ip: '192.168.1.1' },
      },
    ],
    metadata: {
      difficulty: 'intermediate',
      tags: ['interview', 'backend'],
    },
    created_at: new Date().toISOString(),
  },
];

const validateSimSessionPayload = (payload, { isCreate = false } = {}) => {
  const requiredFields = isCreate
    ? ['user_id', 'project_id', 'company_id', 'ai_persona_id', 'status', 'mode']
    : [];

  for (const field of requiredFields) {
    if (!payload[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (payload.status && !STATUS_VALUES.includes(payload.status)) {
    throw new Error(`Invalid status. Allowed values: ${STATUS_VALUES.join(', ')}`);
  }

  if (payload.mode && !MODE_VALUES.includes(payload.mode)) {
    throw new Error(`Invalid mode. Allowed values: ${MODE_VALUES.join(', ')}`);
  }

  if (payload.trigger_log && !Array.isArray(payload.trigger_log)) {
    throw new Error('trigger_log must be an array');
  }

  if (payload.metadata && typeof payload.metadata !== 'object') {
    throw new Error('metadata must be an object');
  }
};

export default class SimSessionModel {
  constructor() {
    this.simSessions = [...initialSimSessions];
  }

  getAll() {
    return [...this.simSessions];
  }

  getById(id) {
    return this.simSessions.find((session) => session.id === id) || null;
  }

  create(payload) {
    validateSimSessionPayload(payload, { isCreate: true });

    const now = new Date().toISOString();
    const simSession = {
      id: crypto.randomUUID?.() || `simsession-${crypto.randomBytes(8).toString('hex')}`,
      user_id: payload.user_id,
      project_id: payload.project_id,
      company_id: payload.company_id,
      ai_persona_id: payload.ai_persona_id,
      status: payload.status,
      mode: payload.mode,
      started_at: payload.started_at ?? null,
      completed_at: payload.completed_at ?? null,
      deadline: payload.deadline ?? null,
      last_activity_at: now,
      trigger_log: payload.trigger_log ?? [],
      metadata: payload.metadata ?? {},
      created_at: now,
    };

    this.simSessions.push(simSession);
    return simSession;
  }

  update(id, payload) {
    const existingIndex = this.simSessions.findIndex((session) => session.id === id);
    if (existingIndex === -1) {
      return null;
    }

    validateSimSessionPayload(payload, { isCreate: false });

    const existingSession = this.simSessions[existingIndex];
    const updatedSession = {
      ...existingSession,
      ...payload,
      trigger_log: payload.trigger_log ?? existingSession.trigger_log,
      metadata: payload.metadata ?? existingSession.metadata,
      last_activity_at: new Date().toISOString(),
    };

    this.simSessions[existingIndex] = updatedSession;
    return updatedSession;
  }

  remove(id) {
    const existingIndex = this.simSessions.findIndex((session) => session.id === id);
    if (existingIndex === -1) {
      return null;
    }

    const [removedSession] = this.simSessions.splice(existingIndex, 1);
    return removedSession;
  }
}
