import './ListAccountAdmin.scss';
import AddButton from '../../../../components/AddButton/AddButton';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import Table from '../../../../components/Table/Table';
import { TableUserHeader } from '../../../../components/Table/constants/table.constant';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getAccountPagination, selectAccountState } from '../../../user/actions/getUserData';
import { useEffect, useState } from 'react';
import Account from '../../../../interfaces/account';
import { UserTypeDto } from '../../../../interfaces';
import { FormName } from '../../../../enum';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import FormManageAccount from '../../component/FormManageAccount';
import useClearNotification from '../../../../utils/useClearNotification';

const limit = 15;

const prepareDataTableAccount = (listAccount: Account[]): UserTypeDto[] => {
  const data: UserTypeDto[] = [];
  // eslint-disable-next-line array-callback-return
  listAccount.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatarUrl, ...rest } = user;
    const dataAccountTable = { ...rest, role: rest.role.name };
    const objectAccount: UserTypeDto = {
      id: '',
      name: '',
      available: '',
      phoneNumber: '',
      email: '',
      freeUnit: 0,
      role: '',
    };
    const reAccountDataTable: UserTypeDto = Object.assign(objectAccount, dataAccountTable);
    data.push(reAccountDataTable);
  });

  return data;
};

const ListAccountAdmin = () => {
  const dispatch = useAppDispatch();
  const responseDataAccount = useSelector(selectAccountState);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);
  const [isShowFormAddNewAccount, setIsShowFormAddNewAccount] = useState(false);
  const [typeShowNotification, setTypeShowNotification] = useClearNotification();

  useEffect(() => {
    async function getData() {
      const dataAccount = await dispatch(getAccountPagination({ limit })).unwrap();
      const isCheckLastPage = dataAccount.totalUser <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataAccount.user.length);
    }

    getData();
  }, [dispatch]);

  const totalAccount = responseDataAccount.totalUser;
  const ListAccount = responseDataAccount.user;
  const dataTableAccount: UserTypeDto[] = prepareDataTableAccount(ListAccount);

  const onClickMoveNextPage = (total: number) => {
    if (isLastPage) {
      return;
    }

    if (isFirstPage) {
      setIsFirstPage(false);
    }

    if (lastIndex + limit >= total) {
      setStartIndex(lastIndex + 1);
      setLastIndex(total);
      setIsLastPage(true);
      dispatch(getAccountPagination({ limit, offset: lastIndex }));
      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    dispatch(getAccountPagination({ limit, offset: startIndex + limit - 1 }));
  };

  const onClickMovePreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      dispatch(getAccountPagination({ limit, offset: startIndex - limit - 1 }));

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    dispatch(getAccountPagination({ limit, offset: startIndex - limit - 1 }));

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  const onClickExit = () => {
    setIsShowFormAddNewAccount(false);
  };

  const onShowFormAddNewAccountHandler = () => {
    setIsShowFormAddNewAccount(true);
  };

  const onAddNewAccountHandler = () => {
    dispatch(getAccountPagination({ limit, offset: startIndex - 1 }));
    setIsShowFormAddNewAccount(false);
    onClickExit();
  };
  return (
    <>
      <div className="list-account">
        <div className="list-account-header">
          <AddButton name="Add Account" onClick={onShowFormAddNewAccountHandler} />
          {/* //TODO: Add component input here */}
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={totalAccount || 0}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            onClickNextPage={() => onClickMoveNextPage(totalAccount)}
            onClickPreviousPage={() => onClickMovePreviousPage()}
          />
        </div>

        <div className="list-account-table">
          <Table header={TableUserHeader} body={dataTableAccount} isHaveDropdown={true} startIndex={startIndex} />
        </div>
      </div>
      {isShowFormAddNewAccount && (
        <FormManageAccount
          formName={FormName.ADD_ACCOUNT}
          onSave={onAddNewAccountHandler}
          onClickExit={onClickExit}
          setShowNotification={setTypeShowNotification}
        />
      )}

      {typeShowNotification.message && (
        <ToastNotification type={typeShowNotification.type} message={typeShowNotification.message} />
      )}
    </>
  );
};
export default ListAccountAdmin;
