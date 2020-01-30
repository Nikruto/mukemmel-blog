import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

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
  constructor() {
    super();
    this.posts = [];
    this.scrollCache = [];
    this.state = {
      currentPage: 1,
      pageCount: 0,
      postCount: 0,
      isLoading: true
    };
  }

  OnClickPage = async index => {
    if (index == this.state.currentPage - 1) return;

    this.scrollCache[this.state.currentPage - 1] = window.scrollY;
    this.setState({ isLoading: true });
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
    let res = await axios('/api/postcount');
    let postCount = res.data.count;
    let pageCount = Math.ceil(postCount / POSTPERPAGE);

    res = await axios(`/api/posts?from=1&to=${POSTPERPAGE}`);
    this.posts = res.data.posts;

    this.posts.forEach(element => {
      element.isBookmarked = isBookmarked(element.slug);
    });
    for (let i = 0; i < pageCount; i++) {
      this.scrollCache.push(0);
    }

    this.setState({ pageCount, postCount, isLoading: false });
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
            {this.posts.map(post => (
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
