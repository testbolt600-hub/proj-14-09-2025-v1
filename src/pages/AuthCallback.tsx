import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/signin?error=auth_callback_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard or onboarding
          navigate('/dashboard');
        } else {
          // No session, redirect to sign in
          navigate('/signin');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        navigate('/signin?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;