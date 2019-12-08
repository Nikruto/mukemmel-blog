import React from 'react';
import Link from 'next/link';

import mediumLogo from '../src/img/logo/medium.png';
import twitterLogo from '../src/img/logo/twitter.png';
import linkedinLogo from '../src/img/logo/linkedin.png';

class Hero extends React.Component {
  constructor() {
    super();
    this.state = {
      isLinksActive: false
    };
  }
  renderLinks = () => {
    if (this.state.isLinksActive) {
      return (
        <div className="hero-social-links">
          <div
            onClick={() =>
              this.setState({ isLinksActive: !this.state.isLinksActive })
            }
            className="hero-social-toggle"
          >
            <svg width="21" height="21" viewBox="0 0 21 21">
              <path
                d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="hero-social-links-wrapper">
            <Link href="https://medium.com/@selmankahya">
              <img src={mediumLogo} className="social-link"></img>
            </Link>
            <Link href="https://www.twitter.com/selmankahyax">
              <img src={twitterLogo} className="social-link"></img>
            </Link>
            <Link href="https://www.instagram.com/selmankahyax/?hl=en">
              <img src={mediumLogo} className="social-link"></img>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="hero-social-links">
          <div
            onClick={() =>
              this.setState({ isLinksActive: !this.state.isLinksActive })
            }
            className="hero-social-toggle"
          >
            <svg width="21" height="21" viewBox="0 0 21 21">
              <path
                d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="hero">
        <h1 className="hero-title">
          <Link href="/">
            <a>Selman Kahya</a>
          </Link>
        </h1>
        <p className="hero-desc">
          💻 uber’de muhendis 📸 youtube’da icerik ureticisi
        </p>
        {this.renderLinks()}
      </div>
    );
  }
}

export default Hero;
