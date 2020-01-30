import App from 'next/app';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900&display=swap');

p {
  font-family: 'Nunito Sans';
  font-weight: 400;
}

a {
  text-decoration: none;
  color: black;
}

.LoadingWrapper {
  margin: 150px auto 0px auto;
  width: 30px;
  height: 30px;
  border-right: 2px solid black;
  border-top: 2px solid black;
  border-radius: 50%;
  animation-name: loadingBarRotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes loadingBarRotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

`;
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />

        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;