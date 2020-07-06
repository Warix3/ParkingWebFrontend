import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Prijava">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Pogrešna lozinka ili korisničko ime（admin/ant.design）" />
          )}

          <UserName
            name="userName"
            placeholder="Korisničko ime: admin ili user"
            rules={[
              {
                required: true,
                message: 'Molimo unesite korisničko ime!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Lozinka: ant.design"
            rules={[
              {
                required: true,
                message: 'Molimo unesite lozinku!',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="Prijava preko mobitela">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="Pogreška sa kontrolnim kodom" />
          )}
          <Mobile
            name="mobile"
            placeholder="Broj telefona"
            rules={[
              {
                required: true,
                message: 'Molimo unesite broj telefona',
              },
              {
                pattern: /^1\d{10}$/,
                message: 'Broj telefona je u pogrešnom formatu!',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="Kontrolni kod"
            countDown={120}
            getCaptchaButtonText="Pošalji kontrolni kod"
            getCaptchaSecondText="Drugi"
            rules={[
              {
                required: true,
                message: 'Molimo unesite kontrolni kod',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            Zapamti prijavu
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Zaboravili ste lozinku?
          </a>
        </div>
        <Submit loading={submitting}>Prijava</Submit>
        <div className={styles.other}>
          Druge metode prijave
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            Registrirajte se
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
