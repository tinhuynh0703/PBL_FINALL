import OrderIcon from '../share/assets/vector/OrderVector.svg';
import ReportIcon from '../share/assets/vector/ReportVector.svg';
import ItemIcon from '../share/assets/vector/MenuVector.svg';
import AccountIcon from '../share/assets/vector/AccountIcon.svg';
import CategoryIcon from '../share/assets/vector/CategoriesVector.svg';
// TODO: Add Report page for staff and admin
export const TabName = {
  STAFF: {
    ORDER: 'Orders',
    ITEM: 'Items',
    CATEGORIES: 'Categories',
    REPORT: 'Reports',
  },
  ADMIN: {
    ACCOUNT: 'Accounts',
    // REPORT: 'Reports',
  },
};

export const TabIcon = {
  STAFF: {
    ORDER_ICON: OrderIcon,
    ITEM_ICON: ItemIcon,
    CATEGORIES_ICON: CategoryIcon,
    REPORT_ICON: ReportIcon,
  },
  ADMIN: {
    ACCOUNT_ICON: AccountIcon,
    REPORT_ICON: ReportIcon,
  },
};

export const TabNameNavbar = {
  HOME_PAGE: 'homePage',
  MY_ORDER: 'myOrder',
  INFORMATION: 'information',
};
