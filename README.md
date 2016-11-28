# react-js-pagination

**A ReactJS [dumb](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) component to render a pagination.**

The component comes with no built-in styles. HTML layout compatible with [Bootstrap](http://getbootstrap.com/components/#pagination) pagination stylesheets.

## Installation

Install `react-js-pagination` with [npm](https://www.npmjs.com/):

```
$ npm install react-js-pagination
```

## Usage

Very easy to use. Just provide props with total amount of things that you want to display on the page.

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "../components/Pagination";
require("bootstrap/less/bootstrap.less");

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      activePage: 15
    };
    this.handlePageChange = ::this._handlePageChange;
  }
  _handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {

    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

```

Check [Live example](http://vayser.github.io/react-js-pagination)

![Example](https://cloud.githubusercontent.com/assets/1379228/20664655/6127bc98-b55c-11e6-9ed7-773711bc2100.png)

![Example](https://cloud.githubusercontent.com/assets/1379228/20664674/7777b6ba-b55c-11e6-9fff-ab7fc21820b1.png)

![Example](https://cloud.githubusercontent.com/assets/1379228/20664683/8278a97a-b55c-11e6-8ca2-7c3b41d0e5d0.png)

## Params

Name | Type | Default | Description
--- | --- | --- | --- |
`totalItemsCount` | Number | | Total count of items which you are going to display
`onChange` | Function | | Page change handler. Receive pageNumber as arg
`acivePage` | Number | `1` | Active page
`itemsCountPerPage` | Number | `10` | Count of items per  page
`prevPageText` | String / ReactElement | `⟨` | Text of prev page navigation button or whole element
`nextPageText` | String / ReactElement | `⟩` | Text of next page navigation button or whole element
`innerClass` | String | `pagination` | Class name of `<ul>` tag
`activeClass` | String | `active` | Class name of active `<li>` tag
`disabledClass` | String | `disabled` | Class name of disabled `<li>` tag
