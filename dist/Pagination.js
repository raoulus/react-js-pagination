'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paginator = require('paginator');

var _paginator2 = _interopRequireDefault(_paginator);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  _createClass(Pagination, [{
    key: 'getPaginationInfo',
    value: function getPaginationInfo() {
      var _props = this.props,
          itemsCountPerPage = _props.itemsCountPerPage,
          activePage = _props.activePage,
          totalItemsCount = _props.totalItemsCount;


      var totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
      return {
        total_pages: totalPages,
        previous_page: activePage - 1,
        next_page: activePage + 1,
        has_previous_page: activePage !== 1,
        has_next_page: activePage !== totalPages
      };
    }
  }, {
    key: 'buildPages',
    value: function buildPages() {
      var pages = [];
      var _props2 = this.props,
          activePage = _props2.activePage,
          prevPageText = _props2.prevPageText,
          nextPageText = _props2.nextPageText,
          onChange = _props2.onChange,
          activeClass = _props2.activeClass;


      var PAGE_THRESHOLD = 3;

      function exceedsMinPages() {
        return paginationInfo.total_pages > PAGE_THRESHOLD;
      }

      function getBoundaryEnd() {
        return paginationInfo.total_pages - 2;
      }

      function hasReachedMiddle() {
        return exceedsMinPages() && activePage >= getBoundaryEnd();
      }

      var paginationInfo = this.getPaginationInfo();
      var firstPages = exceedsMinPages() ? PAGE_THRESHOLD : paginationInfo.total_pages - 1;

      // first page
      pages.push(_react2.default.createElement(_Page2.default, {
        isActive: activePage === 1,
        key: 'first',
        pageNumber: 1,
        onClick: onChange,
        activeClass: activeClass
      }));

      // first pages
      if (activePage <= PAGE_THRESHOLD) {
        for (var i = 2; i <= firstPages; i++) {
          pages.push(_react2.default.createElement(_Page2.default, {
            isActive: i === activePage,
            key: i,
            pageNumber: i,
            onClick: onChange,
            activeClass: activeClass
          }));
        }
      }

      // middle page
      if (activePage > PAGE_THRESHOLD) {
        pages.push(_react2.default.createElement(_Page2.default, {
          key: 'dotsBefore',
          pageText: _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'span',
              null,
              '...'
            )
          )
        }), _react2.default.createElement(_Page2.default, {
          isActive: activePage <= getBoundaryEnd(),
          key: 'middle',
          pageNumber: hasReachedMiddle() ? getBoundaryEnd() : activePage,
          onClick: onChange,
          activeClass: activeClass
        }));
      }

      // last pages
      if (hasReachedMiddle()) {
        for (var _i = paginationInfo.total_pages - 1; _i <= paginationInfo.total_pages - 1; _i++) {
          pages.push(_react2.default.createElement(_Page2.default, {
            isActive: activePage === _i,
            key: _i,
            pageNumber: _i,
            onClick: onChange,
            activeClass: activeClass
          }));
        }
      }

      // dots
      exceedsMinPages() && activePage < getBoundaryEnd() && pages.push(_react2.default.createElement(_Page2.default, {
        key: 'dotsAfter',
        pageText: _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'span',
            null,
            '...'
          )
        )
      }));

      // last page
      paginationInfo.total_pages !== 1 && pages.push(_react2.default.createElement(_Page2.default, {
        key: 'last',
        isActive: activePage === paginationInfo.total_pages,
        pageNumber: paginationInfo.total_pages,
        onClick: onChange,
        activeClass: activeClass
      }));

      // previous page
      pages.unshift(_react2.default.createElement(_Page2.default, {
        key: 'prev' + paginationInfo.previous_page,
        pageNumber: paginationInfo.previous_page,
        onClick: onChange,
        pageText: prevPageText,
        isDisabled: !paginationInfo.has_previous_page
      }));

      // next page
      pages.push(_react2.default.createElement(_Page2.default, {
        key: 'next' + paginationInfo.next_page,
        pageNumber: paginationInfo.next_page,
        onClick: onChange,
        pageText: nextPageText,
        isDisabled: !paginationInfo.has_next_page
      }));

      return pages;
    }
  }, {
    key: 'render',
    value: function render() {
      var pages = this.buildPages();
      return _react2.default.createElement(
        'ul',
        { className: this.props.innerClass },
        pages
      );
    }
  }]);

  return Pagination;
}(_react2.default.Component);

Pagination.propTypes = {
  totalItemsCount: _react.PropTypes.number.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  activePage: _react.PropTypes.number,
  itemsCountPerPage: _react.PropTypes.number,
  prevPageText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  nextPageText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  innerClass: _react.PropTypes.string,
  activeClass: _react.PropTypes.string,
  disabledClass: _react.PropTypes.string
};
Pagination.defaultProps = {
  itemsCountPerPage: 25,
  activePage: 1,
  prevPageText: '⟨',
  nextPageText: '⟩',
  innerClass: 'pagination'
};
exports.default = Pagination;