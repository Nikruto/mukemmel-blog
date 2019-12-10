import React from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Hero from '../components/Hero.js';
import bookmarkParser from '../src/bookmarkParser.js';
import dateToTurkish from '../src/dateToTurkish.js';

import '../styles/main.css';

import notBookmarked from '../src/img/bookmark1.png';
import bookmarked from '../src/img/bookmark2.png';
class Home extends React.Component {
  constructor() {
    super();
    this.posts = [];
    this.state = {};
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

  render() {
    return (
      <div className="container">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Hero />

        <div className="blog-list">
          {this.posts.map(post => (
            <div key={post.slug} className="blog">
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
                  <Link href={post.slug}>
                    <a>
                      <p>{post.shortDesc}</p>
                    </a>
                  </Link>
                </div>
                <div className="blog-date">
                  {dateToTurkish(new Date(post.date))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
