import React, { Component, PropTypes } from 'react';
import Page from './Page';

export default class Pagination extends React.Component {
  static propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    prevPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    nextPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    innerClass: PropTypes.string,
    activeClass: PropTypes.string,
    disabledClass: PropTypes.string
  }

  static defaultProps = {
    itemsCountPerPage: 25,
    activePage: 1,
    prevPageText: '⟨',
    nextPageText: '⟩',
    innerClass: 'pagination',
  }

  getPaginationInfo() {
    const {
      itemsCountPerPage,
      activePage,
      totalItemsCount
    } = this.props;

    const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
    return {
      totalPages: totalPages,
      previous_page: activePage - 1,
      nextPage: activePage + 1,
      hasPreviousPage: activePage !== 1,
      hasNextPage: activePage !== totalPages
    };
  }

  renderPagination() {
    const pages = [];
    const {
      activePage,
      prevPageText,
      nextPageText,
      onChange,
      activeClass
    } = this.props;

    const FIRST_PAGE = 1;
    const PAGE_OFFSET = 3;
    const MAX_PAGES = 5;
    const paginationInfo = this.getPaginationInfo();
    const LAST_PAGE = paginationInfo.totalPages;

    function addPage(pageNumber) {
      pages.push(
        <Page
          isActive={pageNumber === activePage}
          key={pageNumber}
          pageNumber={pageNumber}
          onClick={onChange}
          activeClass={activeClass}
          />
      );
    }

    function addDots(key) {
      pages.push(
        <Page
          key={key}
          pageText={<li><span>...</span></li>}
          />
      );
    }

    function addNavigation() {
      pages.unshift(
        <Page
          key={'prev' + paginationInfo.previous_page}
          pageNumber={paginationInfo.previous_page}
          onClick={onChange}
          pageText={prevPageText}
          isDisabled={!paginationInfo.hasPreviousPage}
          />
      );
      pages.push(
        <Page
          key={'next' + paginationInfo.nextPage}
          pageNumber={paginationInfo.nextPage}
          onClick={onChange}
          pageText={nextPageText}
          isDisabled={!paginationInfo.hasNextPage}
          />
      );
    }

    if (paginationInfo.totalPages <= MAX_PAGES) {
      // render plain pagination
      for (let j = 1; j <= LAST_PAGE; j++) {
        addPage(j);
      }
    } else {
      if (activePage <= PAGE_OFFSET) {
        addPage(FIRST_PAGE);
        addPage(FIRST_PAGE + 1);
        addPage(FIRST_PAGE + 2);
        addDots('rightDots');
        addPage(LAST_PAGE);
      } else if (activePage > PAGE_OFFSET && (LAST_PAGE - activePage) >= PAGE_OFFSET) {
        addPage(FIRST_PAGE);
        addDots('leftDots');
        addPage(activePage);
        addDots('rightDots');
        addPage(LAST_PAGE);
      } else if (activePage > PAGE_OFFSET && (LAST_PAGE - activePage) < PAGE_OFFSET) {
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

  render() {
    return (
      <ul className={this.props.innerClass}>
        {this.renderPagination()}
      </ul>
    );
  }
}
