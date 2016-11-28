/*eslint-env node, mocha */
import {mount, shallow} from 'enzyme';
import Page from './Page';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  const props = {
    totalItemsCount: 120,
    itemsCountPerPage: 25,
    onClick: () => {},
    onChange: () => {}
  };

  describe('render()', () => {
    it('renders a UL tag', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('ul')).to.have.length(1);
    });

    it('can overwrite default class of <ul> element', () => {
      const wrapper = mount(<Pagination {...props} innerClass='pagination list-inline' />);
      expect(wrapper.find('ul').hasClass('pagination')).to.be.true;
      expect(wrapper.find('ul').hasClass('list-inline')).to.be.true;
    });

    it('renders previous page link as first item', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.childAt(0).text()).to.eql(wrapper.prop('prevPageText'));
    });

    it('renders last page link as last item', () => {
      const wrapper = mount(<Pagination {...props} />);
      const lastPageIndex = wrapper.children().length - 2;
      const totalPages = wrapper.instance().getPaginationInfo().total_pages;
      expect(wrapper.childAt(lastPageIndex).text()).to.eql(totalPages.toString());
    });

    it('disables previous page link when first page is active', function() {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.childAt(0).find('li').hasClass('disabled')).to.be.true;
    });

    it('disables next page link when last page is active', function() {
      const wrapper = mount(<Pagination {...props} activePage={5} />);
      expect(wrapper.childAt(6).find('li').hasClass('disabled')).to.be.true;
    });
  });

  describe('display logic', function() {
    describe('when there are less than 4 pages', function() {
      beforeEach(() => {
        props.totalItemsCount = 30;
        props.itemsCountPerPage = 10;
      });

      it('shows previous and next links', function() {
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.childAt(0).text()).to.eql(wrapper.prop('prevPageText'));
        expect(wrapper.childAt(4).text()).to.eql(wrapper.prop('nextPageText'));
      });

      it('shows exact 3 page links', function() {
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.instance().getPaginationInfo().total_pages).to.have.eql(3);
        expect(wrapper.find('li')).to.have.length(5);
        expect(wrapper.childAt(1).text()).to.eql('1');
        expect(wrapper.childAt(2).text()).to.eql('2');
        expect(wrapper.childAt(3).text()).to.eql('3');
      });
    });

    describe('when there are more han 4 pages', function() {
      beforeEach(() => {
        props.totalItemsCount = 150;
        props.itemsCountPerPage = 10;
      });

      it('renders page 1, 2 and 3', function() {
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.childAt(1).text()).to.eql('1');
        expect(wrapper.childAt(2).text()).to.eql('2');
        expect(wrapper.childAt(3).text()).to.eql('3');
      });

      it('shows three dots after page 3', function() {
        const wrapper = mount(<Pagination {...props} />);
        expect(wrapper.childAt(4).text()).to.eql('...');
      });

      describe('current page is greater than 3', function() {
        it('shows three dots before and after the current page', function() {
          const wrapper = mount(<Pagination {...props} activePage={4} />);
          expect(wrapper.childAt(1).text()).to.eql('1');
          expect(wrapper.childAt(2).text()).to.eql('...');
          expect(wrapper.childAt(3).text()).to.eql('4');
          expect(wrapper.childAt(3).find('li').hasClass('active')).to.be.true;
          expect(wrapper.childAt(4).text()).to.eql('...');
        });
      });

      describe('current page is greater or equal than totalPages - 2', function() {
        it('shows last three pages', function() {
          const wrapper = mount(<Pagination {...props} activePage={13} />);
          expect(wrapper.childAt(1).text()).to.eql('1');
          expect(wrapper.childAt(2).text()).to.eql('...');
          expect(wrapper.childAt(3).text()).to.eql('13');
          expect(wrapper.childAt(4).text()).to.eql('14');
          expect(wrapper.childAt(5).text()).to.eql('15');
        });
      });

    });
  });

});
