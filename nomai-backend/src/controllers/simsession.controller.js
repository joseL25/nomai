import SimSessionModel from '../models/simsession.model.js';

const simSessionModel = new SimSessionModel();

const serializeSimSession = (session) => ({
  id: session.id,
  user_id: session.user_id,
  project_id: session.project_id,
  company_id: session.company_id,
  ai_persona_id: session.ai_persona_id,
  status: session.status,
  mode: session.mode,
  started_at: session.started_at,
  completed_at: session.completed_at,
  deadline: session.deadline,
  last_activity_at: session.last_activity_at,
  trigger_log: session.trigger_log,
  metadata: session.metadata,
  created_at: session.created_at,
});

export const getAll = async (req, res) => {
  try {
    const sessions = await simSessionModel.getAll();
    res.status(200).json(sessions.map(serializeSimSession));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await simSessionModel.getById(id);

    if (!session) {
      return res.status(404).json({ message: 'SimSession not found' });
    }

    res.status(200).json(serializeSimSession(session));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const createdSession = await simSessionModel.create(req.body);
    res.status(201).json(serializeSimSession(createdSession));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSession = await simSessionModel.update(id, req.body);
    if (!updatedSession) {
      return res.status(404).json({ message: 'SimSession not found' });
    }
    res.status(200).json(serializeSimSession(updatedSession));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSession = await simSessionModel.remove(id);

    if (!deletedSession) {
      return res.status(404).json({ message: 'SimSession not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
