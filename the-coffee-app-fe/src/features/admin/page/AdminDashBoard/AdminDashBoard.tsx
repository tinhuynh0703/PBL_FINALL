import LeftSideBar from '../../../../components/LeftSideBar/LeftSideBar';
import { TabIcon, TabName } from '../../../../constant';
import { useState } from 'react';
import ListAccount from '../AccountPage/ListAccountAdmin';
import Report from "../../../staff/page/Report/Report";

const AdminDashBoard = () => {
  const [tabName, setTabName] = useState(TabName.ADMIN.ACCOUNT);
  const handleClickChangeTab = (tabName: string) => {
    setTabName(tabName);
  };
  const switchPage = () => {
    switch (tabName) {
      case TabName.ADMIN.ACCOUNT:
        return <ListAccount />;
    }
  };
  return (
    <div className="flex">
      <LeftSideBar
        currentTab={tabName}
        listTabName={Object.values(TabName.ADMIN)}
        listTabIcon={Object.values(TabIcon.ADMIN)}
        onClickChangeTab={handleClickChangeTab}
      />
      <div className="w-full">{switchPage()}</div>
    </div>
  );
};
export default AdminDashBoard;
