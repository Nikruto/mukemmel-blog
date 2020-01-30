import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  LoginContainer,
  MainContainer,
  Title,
  TextInput,
  SendButton,
  ErrorText
} from './style.js';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
        login: ''
      }
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
  }

  displayErrors(errors) {}
  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
      errors: {
        ...this.state.errors,
        username:
          e.target.value.trim().length === 0
            ? 'Kullanıcı Adı Boş Bırakılamaz'
            : ''
      }
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
      errors: {
        ...this.state.errors,
        password:
          e.target.value.trim().length === 0 ? 'Şifre Boş Bırakılamaz' : ''
      }
    });
  }

  onSendClick(e) {
    const { username, password } = this.state;
    if (this.state.errors.username !== '' || this.state.errors.password !== '')
      return;

    axios
      .post('/api/auth/login', { username, password })
      .then(res => {
        if (res.data.success === true) {
          Cookies.set('token', res.data.token);
          this.props.onLogin();
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            ...this.state.errors,
            login: 'Hatalı kullanıcı adı veya şifre'
          }
        });
      });
  }

  render() {
    return (
      <LoginContainer>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainContainer>
          <Title>Giriş Yap</Title>
          <TextInput
            value={this.state.username}
            onChange={this.onUsernameChange}
            type="text"
            placeholder="KULLANICI ADI"
          />
          <ErrorText style={{ display: this.state.errors.username !== '' }}>
            {this.state.errors.username}
          </ErrorText>
          <TextInput
            value={this.state.password}
            onChange={this.onPasswordChange}
            type="password"
            placeholder="ŞİFRE"
          />
          <ErrorText style={{ display: this.state.errors.password !== '' }}>
            {this.state.errors.password}
          </ErrorText>
          <SendButton onClick={this.onSendClick}>Oturum aç</SendButton>
        </MainContainer>
      </LoginContainer>
    );
  }
}

export default Login;
