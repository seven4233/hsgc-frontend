import Footer from '@/components/Footer';
import {  register } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, Helmet } from '@umijs/max';
import {  message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';


const Login: React.FC = () => {

  const [type, setType] = useState<string>('account');

  const [codeUrl, setCodeUrl] = useState('/api/user/captcha')
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const getCode = ()=>{
    setCodeUrl('/api/user/captcha' + "?" + Math.random())
  }
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await register({
        ...values
      });
      console.log(msg);

      if (msg.status === 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        history.replace('/user/login');
        return;

      }
    } catch (error: any) {
      console.log(error);
      getCode()
      // 如果失败去设置用户错误信息
    }
  };

  const toLogin = (e: MouseEvent)=>{
    e.preventDefault()
    history.push('/user/login')
 }

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="华水共创空间"
          subTitle="华水共创空间，致力服务于每个划水人"
          initialValues={{
            autoLogin: true,
          }}
          actions={<div> 已有账号? &nbsp; <a href='#' onClick={(e: any)=>toLogin(e)} style={{textDecoration: 'none'}}>去登录</a></div> }
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号注册',
              },
            ]}
          />
        
          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号(4-11)位'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码(6-18)位'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
                  <ProFormText
                   fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                    width="sm"
                    name="captcha"
                    required
                    addonAfter= {<img onClick={()=>getCode()} style={{borderRadius:"5px",transform: 'translateY(2px)', cursor:'pointer'}} src={codeUrl} alt='这是验证码' />}
                    placeholder="请输入验证码"
                    rules={[{ required: true, message: '这是必填项' }]}
                />
                </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
