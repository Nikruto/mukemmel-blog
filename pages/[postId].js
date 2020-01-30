import React from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

import Hero from '../components/Hero/Hero.js';
import {
  isBookmarked,
  addBookmark,
  removeBookmark
} from '../src/bookmarkParser.js';

import PostViewer from '../components/PostViewer/PostViewer.js';

import {
  Container,
  PostViewerWrapper
} from '../styles/views/[postId]/style.js';

class BlogPost extends React.Component {
  static async getInitialProps({ req, query }) {
    let postId = query.postId;
    const { protocol, host } = absoluteUrl(req);
    const baseUrl = `${protocol}//${host}`;

    let res = await axios(`${baseUrl}/api/post/${postId}`);
    let post = res.data.post;

    return { postId: query.postId, post };
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      post: null
    };
  }

  async componentDidMount() {
    let post = this.props.post;
    post.isBookmarked = false;
    this.setState({ isLoading: false, post: post });
  }
  render() {
    return (
      <Container>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Hero />
        {this.state.isLoading == true ? (
          <div className="LoadingWrapper"></div>
        ) : (
          <div>
            {this.state.post ? (
              <PostViewerWrapper>
                <PostViewer
                  fullPage={true}
                  post={{
                    ...this.state.post,
                    text: this.state.post.details,
                    useBookmark: true
                  }}
                />
              </PostViewerWrapper>
            ) : null}
          </div>
        )}
      </Container>
    );
  }
}

export default BlogPost;
