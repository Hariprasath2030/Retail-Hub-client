import { CircleX } from "lucide-react";
import { Card, Typography, Form, Input, Button, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/userlogin.jpg';
import useLogin from '../hooks/customerLogin'; // Correct hook import
import '../Auth/form.css';
import Navbar from '../components/MNavbar';

const Login = () => {
  const { loading, error, LoginUser } = useLogin(); // Call hook as a function
  const handleLogin = async (values) => {
    await LoginUser(values);
  }

  return (
    <>
    {/* Navbar Component */}
    <Navbar />
    
    <div className="background-image"></div>
    <Card className='form-container'>
    <div className="w-full flex justify-end align-top">
            <Link to={"/"}>
              <button>
                <CircleX className="bg-red-600 rounded-full text-white" />
              </button>
            </Link>
          </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <img src={loginImage} alt="Login" className='auth-image' />
        </div>
        <div style={{ flex: 1 }}>
          <Typography.Title level={3} strong className='title'>
            Customer  Sign In 
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Log in to your Account
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete='off'>
            
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'The input is not a valid Email!' },
              ]}
              >
              <Input size="large" placeholder="Enter your Email" />
            </Form.Item>
            
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
              <Input.Password size="large" placeholder="Enter your Password" />
            </Form.Item>

            {error && (
              <Alert
              description={error}
              type="error"
              showIcon
              closable
              className='alert'
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className='btn'
                disabled={loading}
                >
                {loading ? <Spin /> : 'Sign In'}
              </Button>
            </Form.Item>
            
            <Form.Item>
              <Link to="/user_register">
                <Button size="large" className='btn'>
                  Create an Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
                </>
  );
}

export default Login;
