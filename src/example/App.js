import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../components/Pagination';
require('bootstrap/less/bootstrap.less');

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      activePage: 1,
      totalItemsCount: 5,
      itemsCountPerPage: 1
    };
    this.handlePageChange = ::this._handlePageChange;
  }

  _handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handleItemsCountPerPageChange(event) {
    this.setState({
      itemsCountPerPage: parseInt(event.target.value, 10),
      activePage: 1
    });
  }

  handleTotalNumberChange(event) {
    this.setState({
      totalItemsCount: parseInt(event.target.value, 10),
      activePage: 1
    });
  }

  render() {
    return (
      <div>
        <div>
          Items per page: <input type="text" onChange={this.handleItemsCountPerPageChange.bind(this)} value={this.state.itemsCountPerPage} />
          Total items: <input type="text" onChange={this.handleTotalNumberChange.bind(this)} value={this.state.totalItemsCount} />
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
