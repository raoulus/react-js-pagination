import React, { Component, PropTypes } from 'react';
import paginator from 'paginator';
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
      total_pages: totalPages,
      previous_page: activePage - 1,
      next_page: activePage + 1,
      has_previous_page: activePage !== 1,
      has_next_page: activePage !== totalPages
    };
  }

  buildPages() {
    const pages = [];
    const {
      activePage,
      prevPageText,
      nextPageText,
      onChange,
      activeClass
    } = this.props;

    const PAGE_THRESHOLD = 3;

    function exceedsMinPages() {
      return paginationInfo.total_pages > PAGE_THRESHOLD;
    }

    function getBoundaryEnd() {
      return paginationInfo.total_pages - 2;
    }

    function hasReachedMiddle() {
      return exceedsMinPages() && activePage >= getBoundaryEnd();
    }

    const paginationInfo = this.getPaginationInfo();
    const firstPages = exceedsMinPages() ? PAGE_THRESHOLD : paginationInfo.total_pages - 1;

    // first page
    pages.push(<Page
      isActive={activePage === 1}
      key='first'
      pageNumber={1}
      onClick={onChange}
      activeClass={activeClass}
      />
    );

    // first pages
    if (activePage <= PAGE_THRESHOLD) {
      for(let i = 2; i <= firstPages; i++) {
        pages.push(
          <Page
            isActive={i === activePage}
            key={i}
            pageNumber={i}
            onClick={onChange}
            activeClass={activeClass}
            />
        );
      }
    }

    // middle page
    if (activePage > PAGE_THRESHOLD) {
      pages.push(
        <Page
          key={'dotsBefore'}
          pageText={<li><span>...</span></li>}
          />,
        <Page
          isActive={activePage <= getBoundaryEnd()}
          key='middle'
          pageNumber={hasReachedMiddle() ? getBoundaryEnd() : activePage}
          onClick={onChange}
          activeClass={activeClass}
          />
      );
    }

    // last pages
    if (hasReachedMiddle()) {
      for(let i = paginationInfo.total_pages - 1; i <= paginationInfo.total_pages - 1; i++) {
        console.log(i);
        pages.push(
          <Page
            isActive={activePage === i}
            key={i}
            pageNumber={i}
            onClick={onChange}
            activeClass={activeClass}
            />
        );
      }
    }

    // dots
    (exceedsMinPages() && activePage < getBoundaryEnd()) && pages.push(
      <Page
        key={'dotsAfter'}
        pageText={<li><span>...</span></li>}
        />
    );

    // last page
    pages.push(
      <Page
        key={'last'}
        isActive={activePage === paginationInfo.total_pages}
        pageNumber={paginationInfo.total_pages}
        onClick={onChange}
        activeClass={activeClass}
        />
    );

    // previous page
    pages.unshift(
      <Page
        key={'prev' + paginationInfo.previous_page}
        pageNumber={paginationInfo.previous_page}
        onClick={onChange}
        pageText={prevPageText}
        isDisabled={!paginationInfo.has_previous_page}
        />
    );

    // next page
    pages.push(
      <Page
        key={'next' + paginationInfo.next_page}
        pageNumber={paginationInfo.next_page}
        onClick={onChange}
        pageText={nextPageText}
        isDisabled={!paginationInfo.has_next_page}
        />
    );

    return pages;
  }

  render() {
    const pages = this.buildPages();
    return (
      <ul className={this.props.innerClass}>{pages}</ul>
    );
  }
}
