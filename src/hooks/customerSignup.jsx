import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';

  const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {  // Updated field name to `passwordConfirm`
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch('https://retail-hub-server.onrender.com/api/customer/customerSignup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
    });
    

      const data = await res.json();

      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);  // Adjust for backend response structure
      } else {
        setError(data.message || 'Registration failed');
        message.error(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error: Unable to register');
      message.error('Network error: Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
