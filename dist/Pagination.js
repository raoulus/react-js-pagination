'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
        totalPages: totalPages,
        previous_page: activePage - 1,
        nextPage: activePage + 1,
        hasPreviousPage: activePage !== 1,
        hasNextPage: activePage !== totalPages
      };
    }
  }, {
    key: 'renderPagination',
    value: function renderPagination() {
      var pages = [];
      var _props2 = this.props,
          activePage = _props2.activePage,
          prevPageText = _props2.prevPageText,
          nextPageText = _props2.nextPageText,
          onChange = _props2.onChange,
          activeClass = _props2.activeClass;


      var FIRST_PAGE = 1;
      var PAGE_OFFSET = 3;
      var MAX_PAGES = 5;
      var paginationInfo = this.getPaginationInfo();
      var LAST_PAGE = paginationInfo.totalPages;

      function addPage(pageNumber) {
        pages.push(_react2.default.createElement(_Page2.default, {
          isActive: pageNumber === activePage,
          key: pageNumber,
          pageNumber: pageNumber,
          onClick: onChange,
          activeClass: activeClass
        }));
      }

      function addDots(key) {
        pages.push(_react2.default.createElement(_Page2.default, {
          key: key,
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
      }

      function addNavigation() {
        pages.unshift(_react2.default.createElement(_Page2.default, {
          key: 'prev' + paginationInfo.previous_page,
          pageNumber: paginationInfo.previous_page,
          onClick: onChange,
          pageText: prevPageText,
          isDisabled: !paginationInfo.hasPreviousPage,
          className: 'pagination-prev-link'
        }));
        pages.push(_react2.default.createElement(_Page2.default, {
          key: 'next' + paginationInfo.nextPage,
          pageNumber: paginationInfo.nextPage,
          onClick: onChange,
          pageText: nextPageText,
          isDisabled: !paginationInfo.hasNextPage,
          className: 'pagination-next-link'
        }));
      }

      if (paginationInfo.totalPages <= MAX_PAGES) {
        // render plain pagination
        for (var j = 1; j <= LAST_PAGE; j++) {
          addPage(j);
        }
      } else {
        if (activePage <= PAGE_OFFSET) {
          addPage(FIRST_PAGE);
          addPage(FIRST_PAGE + 1);
          addPage(FIRST_PAGE + 2);
          addDots('rightDots');
          addPage(LAST_PAGE);
        } else if (activePage > PAGE_OFFSET && LAST_PAGE - activePage >= PAGE_OFFSET) {
          addPage(FIRST_PAGE);
          addDots('leftDots');
          addPage(activePage);
          addDots('rightDots');
          addPage(LAST_PAGE);
        } else if (activePage > PAGE_OFFSET && LAST_PAGE - activePage < PAGE_OFFSET) {
          addPage(FIRST_PAGE);
          addDots('leftDots');
          addPage(LAST_PAGE - 2);
          addPage(LAST_PAGE - 1);
          addPage(LAST_PAGE);
        }
      }

      addNavigation();

      return pages;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { className: this.props.innerClass },
        this.renderPagination()
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