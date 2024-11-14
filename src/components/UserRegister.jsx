import { CircleX } from "lucide-react";
import { Card, Typography, Form, Input, Button, Spin, Alert } from 'antd';
import { Link} from 'react-router-dom';
import Navbar from '../components/MNavbar';
import registerImage from '../assets/userregister.jpg';
import useSignup from '../hooks/customerSignup';
import '../Auth/form.css';

const Register = () => {
  const { loading, error, registerUser } = useSignup();

  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      <Card className="form-container">
        <div className="w-full flex justify-end align-top">
            <Link to={"/"}>
              <button>
                <CircleX className="bg-red-600 rounded-full text-white" />
              </button>
            </Link>
          </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Typography.Title level={3} strong className="title">
              Create User an account
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Enter your details
            </Typography.Text>
            <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input size="large" placeholder="Enter your Full name" />
              </Form.Item>
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
                label="Phone number"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number!' },
                  { type: 'phone', message: 'The input is not a valid number!' },
                ]}
              >
                <Input size="large" placeholder="Enter your Phone number" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" placeholder="Enter your Password" />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
              >
                <Input.Password size="large" placeholder="Re-enter your Password" />
              </Form.Item>

              {error && (
                <Alert 
                  description={error} 
                  type="error" 
                  showIcon 
                  closable
                  className="alert"
                />
              )}

              <Form.Item>
                <Button 
                  type={`${loading ? '' : 'primary'}`} 
                  htmlType="submit" 
                  size="large" 
                  className="btn"
                >
                  { loading ? <Spin /> : 'Create Account' }
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/user_login">
                  <Button size="large" className="btn">
                    Sign in
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1 }}>
            <img src={registerImage} alt="Register" className="auth-image" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Register;
