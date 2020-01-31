import React from 'react';
import Link from 'next/link';

import twitter from '../../src/img/logo/twitter.png';
import instagram from '../../src/img/logo/instagram.png';

import {
  HeroContainer,
  HeroTitle,
  HeroTitleLink,
  HeroDescription,
  SocialContainer,
  SocialLink,
  SocialImage
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
            <HeroTitleLink href="#">Nikruto</HeroTitleLink>
          </Link>
        </HeroTitle>
        <HeroDescription>
          Oyunları 🎮, Tersine mühendisliği ve kodlamayı seven bir öğrenci👨‍🎓
        </HeroDescription>
        <SocialContainer>
          <SocialLink href="https://twitter.com/faennn" target="_blank">
            <SocialImage src={twitter} />
          </SocialLink>

          <SocialLink href="https://instagram.com/neafle" target="_blank">
            <SocialImage src={instagram} />
          </SocialLink>
        </SocialContainer>
      </HeroContainer>
    );
  }
}

export default Hero;
