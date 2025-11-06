"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setUser(null);
        return false;
      }

      // Check auth with token
      const response = await fetch(`/api/auth/check?token=${encodeURIComponent(token)}`);
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        localStorage.removeItem('auth_token');
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth_token');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Token is automatically stored in localStorage by the API
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/admin/login');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };
}