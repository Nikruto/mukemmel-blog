import React from 'react';

import {
  PaginationContainer,
  PageCounter,
  ActivePageCounter
} from './style.js';
class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = index => {
    this.props.OnClickPage(index);
  };
  render() {
    let pageButtons = [];
    for (let i = 0; i < this.props.count; i++) {
      pageButtons.push(
        <PageCounter
          key={i}
          onClick={() => this.handleClick(i)}
          isActive={this.props.currentPage == i + 1}
        >
          {i + 1}
        </PageCounter>
      );
    }

    return <PaginationContainer>{pageButtons}</PaginationContainer>;
  }
}

export default Pagination;
