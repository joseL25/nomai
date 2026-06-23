import { supabase } from '../supabase.js';

const STATUS_VALUES = ['pending', 'active', 'completed', 'abandoned'];
const MODE_VALUES = ['learning', 'recruitment'];

const validateSimSessionPayload = (payload, { isCreate = false } = {}) => {
  const requiredFields = isCreate
    ? ['user_id', 'project_id', 'company_id', 'ai_persona_id', 'status', 'mode']
    : [];

  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
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
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('SimSession')
        .select('*');

      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error in SimSessionModel.getAll:', error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('SimSession')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in SimSessionModel.getById for id ${id}:`, error.message);
      throw error;
    }
  }

  async create(payload) {
    validateSimSessionPayload(payload, { isCreate: true });

    try {
      const now = new Date().toISOString();
      const insertData = {
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

      const { data, error } = await supabase
        .from('SimSession')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in SimSessionModel.create:', error.message);
      throw error;
    }
  }

  async update(id, payload) {
    validateSimSessionPayload(payload, { isCreate: false });

    try {
      const updateData = {
        ...payload,
        last_activity_at: new Date().toISOString(),
      };

      // Remove read-only or auto-generated fields if they are in payload
      delete updateData.id;
      delete updateData.created_at;

      const { data, error } = await supabase
        .from('SimSession')
        .update(updateData)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in SimSessionModel.update for id ${id}:`, error.message);
      throw error;
    }
  }

  async remove(id) {
    try {
      const { data, error } = await supabase
        .from('SimSession')
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in SimSessionModel.remove for id ${id}:`, error.message);
      throw error;
    }
  }
}
