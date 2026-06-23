import { supabase } from '../supabase.js';

const ROLE_VALUES = ['freelancer', 'recruiter', 'admin'];
const STATUS_VALUES = ['active', 'suspended', 'pending_verification'];

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
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*');

      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error in UserModel.getAll:', error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in UserModel.getById for id ${id}:`, error.message);
      throw error;
    }
  }

  async create(payload) {
    validateUserPayload(payload, { isCreate: true });

    try {
      // Check email uniqueness
      const { data: existingUser, error: checkError } = await supabase
        .from('User')
        .select('id')
        .eq('email', payload.email)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const now = new Date().toISOString();
      const insertData = {
        email: payload.email,
        password_hash: payload.password_hash,
        full_name: payload.full_name,
        avatar_url: payload.avatar_url ?? null,
        role: payload.role,
        status: payload.status,
        created_at: now,
        updated_at: now,
      };

      const { data, error } = await supabase
        .from('User')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('Email already registered');
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in UserModel.create:', error.message);
      throw error;
    }
  }

  async update(id, payload) {
    validateUserPayload(payload, { isCreate: false });

    try {
      if (payload.email) {
        const { data: existingUser, error: checkError } = await supabase
          .from('User')
          .select('id, email')
          .eq('email', payload.email)
          .maybeSingle();

        if (checkError) {
          throw checkError;
        }

        if (existingUser && String(existingUser.id) !== String(id)) {
          throw new Error('Email already registered');
        }
      }

      const updateData = {
        ...payload,
        updated_at: new Date().toISOString(),
      };

      // Remove read-only or auto-generated fields
      delete updateData.id;
      delete updateData.created_at;

      const { data, error } = await supabase
        .from('User')
        .update(updateData)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        if (error.code === '23505') {
          throw new Error('Email already registered');
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in UserModel.update for id ${id}:`, error.message);
      throw error;
    }
  }

  async remove(id) {
    try {
      const { data, error } = await supabase
        .from('User')
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error in UserModel.remove for id ${id}:`, error.message);
      throw error;
    }
  }
}
