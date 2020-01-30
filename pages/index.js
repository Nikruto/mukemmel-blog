import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import absoluteUrl from 'next-absolute-url';

import Hero from '../components/Hero/Hero.js';
import PostViewer from '../components/PostViewer/PostViewer.js';
import Pagination from '../components/Pagination/Pagination.js';

import { isBookmarked } from '../src/bookmarkParser.js';
import dateToTurkish from '../src/dateToTurkish.js';

import notBookmarked from '../src/img/bookmark1.png';
import bookmarked from '../src/img/bookmark2.png';

import {
  Container,
  BlogList,
  PostViewerWrapper,
  PaginationWrapper
} from '../styles/views/index/style.js';

const POSTPERPAGE = 2;
class Home extends React.Component {
  static async getInitialProps({ req, query }) {
    const { protocol, host } = absoluteUrl(req);
    const baseUrl = `${protocol}//${host}`;
    let res = await axios(`${baseUrl}/api/postcount`);
    let postCount = res.data.count;
    let pageCount = Math.ceil(postCount / POSTPERPAGE);

    res = await axios(`${baseUrl}/api/posts?from=1&to=${POSTPERPAGE}`);
    let posts = res.data.posts;
    return { pageCount, postCount, posts };
  }

  constructor(props) {
    super(props);
    let { pageCount, postCount, posts } = this.props;
    let scrollCache = [];

    for (let i = 0; i < pageCount; i++) {
      scrollCache.push(0);
    }

    this.state = {
      currentPage: 1,
      pageCount: pageCount,
      postCount: postCount,
      posts: [],
      scrollCache: scrollCache,
      isLoading: false
    };
  }

  OnClickPage = async index => {
    if (index == this.state.currentPage - 1) return;
    let scrollCache = this.state.scrollCache;
    scrollCache[this.state.currentPage - 1] = window.scrollY;
    this.setState({ isLoading: true, scrollCache });
    let res = await axios(
      `/api/posts?from=${index * POSTPERPAGE + 1}&to=${(index + 1) *
        POSTPERPAGE}`
    );
    this.setState({ isLoading: false });
    this.posts = res.data.posts;
    this.posts.forEach(element => {
      element.isBookmarked = isBookmarked(element.slug);
    });
    await this.setState({ currentPage: index + 1 });
    window.scrollTo(0, this.scrollCache[index]);
  };

  async componentDidMount() {
    let postsToBookmark = this.props.posts;

    postsToBookmark.forEach(element => {
      element.isBookmarked = isBookmarked(element.slug);
    });

    this.setState({ posts: postsToBookmark });
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
          <BlogList>
            {this.state.posts.map(post => (
              <PostViewerWrapper key={post.slug}>
                <PostViewer
                  key={post.slug}
                  post={{
                    ...post,
                    text: post.details,
                    link: `/${post.slug}`,
                    useBookmark: true,
                    onlyFirstBlock: true
                  }}
                />
              </PostViewerWrapper>
            ))}
          </BlogList>
        )}
        {this.state.isLoading == true || this.state.pageCount == 1 ? null : (
          <PaginationWrapper>
            <Pagination
              count={this.state.pageCount}
              OnClickPage={this.OnClickPage}
              currentPage={this.state.currentPage}
            />
          </PaginationWrapper>
        )}
      </Container>
    );
  }
}

export default Home;
