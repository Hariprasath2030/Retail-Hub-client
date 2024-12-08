import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const LoginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('https://retail-hub-server.onrender.com/api/customer/customerLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) { // Check for 200 OK status
        message.success(data.message || 'Login successful');
        login(data.token, data.user);  // Adjusted for backend response
      } else {
        setError(data.message || 'Login failed');
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error: Unable to log in');
      message.error('Network error: Unable to log in');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, LoginUser }; // Rename to loginUser
};

export default useLogin;
