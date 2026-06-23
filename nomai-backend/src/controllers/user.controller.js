import UserModel from '../models/user.model.js';

const userModel = new UserModel();

const serializeUser = (user) => ({
  id: user.id,
  email: user.email,
  full_name: user.full_name,
  avatar_url: user.avatar_url,
  role: user.role,
  status: user.status,
  created_at: user.created_at,
  updated_at: user.updated_at,
});

export const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users.map(serializeUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(serializeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const createdUser = await userModel.create(req.body);
    res.status(201).json(serializeUser(createdUser));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await userModel.update(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(serializeUser(updatedUser));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.remove(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
