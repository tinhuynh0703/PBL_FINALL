import { useEffect, useState } from 'react';
import AddButton from '../../../../components/AddButton/AddButton';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import { TableCategoryHeader } from '../../../../components/Table/constants/table.constant';
import Table from '../../../../components/Table/Table';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getAllCategory, selectCategoryState } from '../../../product/actions/getCategoryData';
import Category, { CategoryTypeDto } from '../../../../interfaces/category';
import useClearNotification from '../../../../utils/useClearNotification';
import FormManageCategory from '../../components/FormManageCategory/FormManageCategory';

const limit = 15;

const prepareDataTableCategory = (listCategory: Category[]): CategoryTypeDto[] => {
  const data: CategoryTypeDto[] = [];
  // eslint-disable-next-line array-callback-return
  listCategory.map((category) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { products, ...categoryTypeDto } = category;
    data.push(categoryTypeDto);
  });
  return data;
};

const ListCategoryStaff = () => {
  const dispatch = useAppDispatch();
  const responseDataCategory = useSelector(selectCategoryState);

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [typeShowNotification, setTypeShowNotification] = useClearNotification();

  useEffect(() => {
    async function getData() {
      const dataCategory = await dispatch(getAllCategory({ limit })).unwrap();
      const isCheckLastPage = dataCategory.totalCategories <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataCategory.categories.length);
    }
    getData();
  }, [dispatch]);

  const totalCategory = responseDataCategory.totalCategories;
  const listCategory = responseDataCategory.categories;
  const dataTableCategory: CategoryTypeDto[] = prepareDataTableCategory(listCategory);

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
      dispatch(getAllCategory({ limit, offset: lastIndex }));
      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    dispatch(getAllCategory({ limit, offset: startIndex + limit - 1 }));
  };

  const onClickMovePreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      dispatch(getAllCategory({ limit, offset: startIndex - limit - 1 }));

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    dispatch(getAllCategory({ limit, offset: startIndex - limit - 1 }));

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  const handleShowFormAddCategory = () => {
    setIsShowFormAdd(true);
  };

  const onClickExit = () => {
    setIsShowFormAdd(false);
  };

  const onAddNewCategotyHandler = () => {
    dispatch(getAllCategory({ limit, offset: startIndex - 1 }));
    setIsShowFormAdd(false);
    onClickExit();
  };
  return (
    <>
      <div className="list-account">
        <div className="list-account-header">
          <AddButton name="Add Category" onClick={handleShowFormAddCategory} />
          {/* //TODO: Add component input search here */}
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={totalCategory || 0}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            onClickNextPage={() => onClickMoveNextPage(totalCategory)}
            onClickPreviousPage={() => onClickMovePreviousPage()}
          />
        </div>

        <div className="list-account-table">
          <Table
            header={TableCategoryHeader}
            body={dataTableCategory}
            isHaveDropdown={true}
            startIndex={startIndex}
            className="text-center"
          />
        </div>
      </div>

      {isShowFormAdd && (
        <FormManageCategory
          formName="Add New Category"
          setShowNotification={setTypeShowNotification}
          onSave={onAddNewCategotyHandler}
          onClickExit={onClickExit}
        />
      )}

      {typeShowNotification.message && (
        <ToastNotification type={typeShowNotification.type} message={typeShowNotification.message} />
      )}
    </>
  );
};

export default ListCategoryStaff;
