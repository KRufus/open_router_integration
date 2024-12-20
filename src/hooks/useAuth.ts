import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types/auth';

const ADMIN_CREDENTIALS = {
  email: 'admin@pragtech.co.in',
  password: 'admin@pragtech'
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check for admin credentials
      if (email === ADMIN_CREDENTIALS.email) {
        if (password !== ADMIN_CREDENTIALS.password) {
          throw new Error('Invalid admin password');
        }
        const adminUser: User = {
          id: 'admin',
          email,
          role: 'admin'
        };
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }

      // Regular user login
      // In production, this would validate against a backend
      const user: User = {
        id: Date.now().toString(),
        email,
        role: 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Prevent registration with admin email
      if (email === ADMIN_CREDENTIALS.email) {
        throw new Error('This email is reserved');
      }

      const user: User = {
        id: Date.now().toString(),
        email,
        role: 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };
}