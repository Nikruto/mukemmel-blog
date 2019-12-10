import Reat from 'react';

import '../styles/main.css';

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
        <div
          onClick={() => this.handleClick(i)}
          id={this.props.currentPage == i + 1 ? 'PaginationActivePage' : ''}
          className="PageCounter"
        >
          {i + 1}
        </div>
      );
    }

    return <div className="Pagination">{pageButtons}</div>;
  }
}

export default Pagination;
