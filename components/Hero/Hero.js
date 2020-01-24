import React from 'react';
import Link from 'next/link';

import mediumLogo from '../../src/img/logo/medium.png';
import twitterLogo from '../../src/img/logo/twitter.png';
import linkedinLogo from '../../src/img/logo/linkedin.png';

import {
  HeroContainer,
  HeroTitle,
  HeroTitleLink,
  HeroDescription
} from './style.js';

class Hero extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HeroContainer>
        <HeroTitle>
          <Link href="/">
            <HeroTitleLink href="#">Selman Kahya</HeroTitleLink>
          </Link>
        </HeroTitle>
        <HeroDescription>
          💻 uber’de muhendis 📸 youtube’da icerik ureticisi
        </HeroDescription>
      </HeroContainer>
    );
  }
}

export default Hero;
