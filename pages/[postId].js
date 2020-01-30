import React from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';

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
  constructor(props) {
    super(props);
    this.post = null;
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    const protocol = window.location.hostname == 'localhost' ? 'http' : 'https';
    const res = await fetch(
      `${protocol}://${window.location.host}/api/post/${this.props.postId}`
    );

    const json = await res.json();
    this.post = json.post;
    this.post.isBookmarked = isBookmarked(this.post.slug);
    this.setState({ isLoading: false });
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
            {this.post ? (
              <PostViewerWrapper>
                <PostViewer
                  fullPage={true}
                  post={{
                    ...this.post,
                    text: this.post.details,
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

BlogPost.getInitialProps = ({ req, query }) => {
  return { postId: query.postId };
};

export default BlogPost;
