/*eslint-env node, mocha */
import {mount, shallow} from 'enzyme';
import Page from './Page';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  const props = {
    totalItemsCount: 120,
    onClick: () => {},
    onChange: () => {}
  };

  describe('render()', () => {
    it('renders a UL tag', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('ul')).to.have.length(1);
    });

    it('renders the prev page link if there is one', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.childAt(0).text()).to.eql(wrapper.prop('prevPageText'));
    });

    it('renders the first page link', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.childAt(1).text()).to.eql('1');
    });

    it('renders the next page link', () => {
      const wrapper = mount(<Pagination {...props} />);
      const lastPageIndex = wrapper.find('li').length - 1;
      expect(wrapper.childAt(lastPageIndex).text()).to.eql(wrapper.prop('nextPageText'));
    });

    it('renders the last page link if there is one', () => {
      const wrapper = mount(<Pagination {...props} />);
      const lastPageIndex = wrapper.find('li').length - 2;
      const totalPages = wrapper.instance().getPaginationInfo().total_pages;
      expect(wrapper.find('li').at(lastPageIndex).text()).to.eql(totalPages.toString());
    });

    it('renders class in UL tag', () => {
      const wrapper = mount(<Pagination {...props} innerClass='pagination list-inline center-block text-center' />);
      expect(wrapper.find('ul').hasClass('pagination')).to.be.true;
      expect(wrapper.find('ul').hasClass('list-inline')).to.be.true;
      expect(wrapper.find('ul').hasClass('center-block')).to.be.true;
      expect(wrapper.find('ul').hasClass('text-center')).to.be.true;
    });
  });

  describe('totalPages is lower than 4', function() {
    beforeEach(() => {
      props.totalItemsCount = 30;
      props.itemsCountPerPage = 10;
    });

    it('shows pages 1-3 and prev/next button', function() {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('li')).to.have.length(5);
    });

    describe.skip('navigation', function() {
      it('changes the active state', function() {
        const wrapper = mount(<Pagination {...props} />);
        const firstPage = wrapper.find(Page).at(1);
        expect(firstPage.prop('isActive')).to.be.true;
        console.log(wrapper.find(Page).last().html());
        wrapper.find(Page).last().find('a').simulate('click');
        expect(firstPage.prop('isActive')).to.be.false;
      });
    });

  });


});
