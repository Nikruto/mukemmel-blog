import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import Hero from '../components/Hero.js';
import Pagination from '../components/Pagination.js';

import bookmarkParser from '../src/bookmarkParser.js';
import dateToTurkish from '../src/dateToTurkish.js';

import notBookmarked from '../src/img/bookmark1.png';
import bookmarked from '../src/img/bookmark2.png';

import '../styles/main.css';

const POSTPERPAGE = 2;
class Home extends React.Component {
  constructor() {
    super();
    this.posts = [];
    this.scrollCache = [];
    this.state = {
      currentPage: 1,
      pageCount: 0,
      postCount: 0
    };
  }

  OnClickPage = async index => {
    this.scrollCache[this.state.currentPage - 1] = window.scrollY;
    let res = await axios(
      `/api/posts?from=${index * POSTPERPAGE + 1}&to=${(index + 1) *
        POSTPERPAGE}`
    );
    this.posts = res.data.posts;
    this.posts.forEach(element => {
      element.isBookmarked = bookmarkParser.isBookmarked(element.slug);
    });
    await this.setState({ currentPage: index + 1 });
    window.scrollTo(0, this.scrollCache[index]);
  };

  async componentDidMount() {
    let res = await axios('/api/postcount');
    let postCount = res.data.count;
    let pageCount = Math.ceil(postCount / POSTPERPAGE);

    res = await axios(`/api/posts?from=1&to=${POSTPERPAGE}`);
    this.posts = res.data.posts;

    this.posts.forEach(element => {
      element.isBookmarked = bookmarkParser.isBookmarked(element.slug);
    });
    for (let i = 0; i < pageCount; i++) {
      this.scrollCache.push(0);
    }

    this.setState({ pageCount, postCount });
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
        <Pagination
          count={this.state.pageCount}
          OnClickPage={this.OnClickPage}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }
}

export default Home;
