import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../../helpers/generateToken';
import * as users from "../../services/usersService";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
     const password = values.password;
     const checkingPassword = values.checkingPassword;

     if(password === checkingPassword) {
      const fullName = values.fullName;
      const email = values.email;
      const token = generateToken();

      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: token
      };

      const checkExist = await users.getUser(email);

      if(checkExist.length > 0) {
        messageApi.open({
          type: 'warning',
          content: 'Tài khoản đã tồn tại',
        });
      }else {
        const result = await users.createUser(options);
        if(result) {
          messageApi.open({
            type: 'success',
            content: 'This is a success message',
          });
          navigate("/login");
        }
      }
     }else {
      messageApi.open({
        type: 'error',
        content: 'Nhập mật khẩu sai. Vui lòng nhập lại!',
      });
     }
  }

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="on"
        className='login-form'
      >

        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
          ]}
        >
          <Input placeholder='Enter full name' />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input type='email' placeholder='Enter email' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='Enter password' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="checkingPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password again!',
            },
          ]}
        >
          <Input.Password placeholder='Re-enter password' />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Register;