import crypto from 'crypto';

const ROLE_VALUES = ['freelancer', 'recruiter', 'admin'];
const STATUS_VALUES = ['active', 'suspended', 'pending_verification'];

const initialUsers = [
  {
    id: 'user-123',
    email: 'admin@nomai.app',
    password_hash: '$2b$10$mockedPasswordHash',
    full_name: 'Admin User',
    avatar_url: null,
    role: 'admin',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const validateUserPayload = (payload, { isCreate = false } = {}) => {
  const requiredFields = ['email', 'password_hash', 'full_name', 'role', 'status'];

  if (isCreate) {
    for (const field of requiredFields) {
      if (!payload[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  if (payload.role && !ROLE_VALUES.includes(payload.role)) {
    throw new Error(`Invalid role. Allowed values: ${ROLE_VALUES.join(', ')}`);
  }

  if (payload.status && !STATUS_VALUES.includes(payload.status)) {
    throw new Error(`Invalid status. Allowed values: ${STATUS_VALUES.join(', ')}`);
  }
};

export default class UserModel {
  constructor() {
    this.users = [...initialUsers];
  }

  getAll() {
    return [...this.users];
  }

  getById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  create(payload) {
    validateUserPayload(payload, { isCreate: true });

    const emailExists = this.users.some((user) => user.email === payload.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const now = new Date().toISOString();
    const user = {
      id: crypto.randomUUID?.() || crypto.randomBytes(16).toString('hex'),
      email: payload.email,
      password_hash: payload.password_hash,
      full_name: payload.full_name,
      avatar_url: payload.avatar_url ?? null,
      role: payload.role,
      status: payload.status,
      created_at: now,
      updated_at: now,
    };

    this.users.push(user);
    return user;
  }

  update(id, payload) {
    const existingIndex = this.users.findIndex((user) => user.id === id);
    if (existingIndex === -1) {
      return null;
    }

    validateUserPayload(payload, { isCreate: false });

    const existingUser = this.users[existingIndex];
    if (payload.email && payload.email !== existingUser.email) {
      const emailExists = this.users.some((user) => user.email === payload.email);
      if (emailExists) {
        throw new Error('Email already registered');
      }
    }

    const updatedUser = {
      ...existingUser,
      ...payload,
      avatar_url: payload.avatar_url ?? existingUser.avatar_url,
      updated_at: new Date().toISOString(),
    };

    this.users[existingIndex] = updatedUser;
    return updatedUser;
  }

  remove(id) {
    const existingIndex = this.users.findIndex((user) => user.id === id);
    if (existingIndex === -1) {
      return null;
    }

    const [removedUser] = this.users.splice(existingIndex, 1);
    return removedUser;
  }
}
