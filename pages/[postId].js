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

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.post = null;
  }

  async componentDidMount() {
    const res = await fetch(
      `http://localhost:3000/api/post/${this.props.postId}`
    );
    const json = await res.json();
    this.post = json.post;
    this.post.isBookmarked = bookmarkParser.isBookmarked(this.post.slug);
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
        {this.post ? (
          <div className="blog">
            <div className="blog-wrapper">
              <div className="head">
                <h2 className="blog-title">
                  <Link href={`/${this.post.slug}`}>
                    <a className="blog-title-link">{this.post.title}</a>
                  </Link>
                </h2>
                <div className="bookmark-wrapper">
                  <img
                    className="bookmark"
                    src={this.post.isBookmarked ? bookmarked : notBookmarked}
                    onClick={() => {
                      //console.log(post.isBookmarked);
                      if (this.post.isBookmarked) {
                        bookmarkParser.removeBookmark(this.post.slug);
                      } else {
                        bookmarkParser.addBookmark(this.post.slug);
                      }
                      this.post.isBookmarked = !this.post.isBookmarked;
                      this.setState({});
                    }}
                  ></img>
                </div>
              </div>
              <div className="blog-text">
                <p>{this.post.details}</p>
              </div>
              <div className="blog-date">
                {dateToTurkish(new Date(this.post.date))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

BlogPost.getInitialProps = ({ req, query }) => {
  return { postId: query.postId };
};

export default BlogPost;
