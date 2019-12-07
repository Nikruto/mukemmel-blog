import React from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import bookmarkParser from '../src/bookmarkParser.js';

import '../styles/main.css';
import mediumLogo from '../src/img/logo/medium.png';
import twitterLogo from '../src/img/logo/twitter.png';
import linkedinLogo from '../src/img/logo/linkedin.png';

import notBookmarked from '../src/img/bookmark1.png';
import bookmarked from '../src/img/bookmark2.png';
class Home extends React.Component {
  constructor() {
    super();
    this.posts = [];
    this.state = {
      isLinksActive: false
    };
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:3000/api/posts');
    const json = await res.json();
    json.posts.forEach(element => {
      element.isBookmarked = bookmarkParser.isBookmarked(element.slug);
    });
    this.posts = json.posts;
    this.setState({});
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
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <Link to="https://medium.com/@selmankahya">
            <img src={mediumLogo} className="social-link"></img>
          </Link>
          <Link href="https://www.twitter.com/selmankahyax">
            <img src={twitterLogo} className="social-link"></img>
          </Link>
          {/* <Link href="https://www.linkedin.com/in/selmankahya">
          <img src={linkedinLogo} className="social-link"></img>
        </Link> */}
          <Link href="https://www.instagram.com/selmankahyax/?hl=en">
            <img src={mediumLogo} className="social-link"></img>
          </Link>
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
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="container">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="hero">
          <h1 className="hero-title">Selman Kahya</h1>
          <p className="hero-desc">
            💻 uber’de muhendis 📸 youtube’da icerik ureticisi
          </p>
          {this.renderLinks()}
        </div>
        <div className="blog-list">
          {this.posts.map(post => (
            <div className="blog">
              <div className="blog-wrapper">
                <div className="head">
                  <h2 className="blog-title">
                    <Link href={post.slug}>
                      <a className="blog-title-link">{post.title}</a>
                    </Link>
                  </h2>
                  <div className="bookmark-wrapper">
                    <img
                      className="bookmark"
                      src={post.isBookmarked ? bookmarked : notBookmarked}
                      onClick={() => {
                        //console.log(post.isBookmarked);
                        if (post.isBookmarked) {
                          bookmarkParser.removeBookmark(post.slug);
                        } else {
                          bookmarkParser.addBookmark(post.slug);
                        }
                        post.isBookmarked = !post.isBookmarked;
                        this.setState({});
                      }}
                    ></img>
                  </div>
                </div>
                <div className="blog-text">
                  <ReactMarkdown source={post.details} />
                </div>
                <div className="blog-date">{post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;
