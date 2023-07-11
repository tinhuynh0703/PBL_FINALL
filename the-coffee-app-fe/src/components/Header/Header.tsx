import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from '../../share/assets/img/logo.svg';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CancelVector from '../../share/assets/vector/cancelVector.svg';
import NotFound from '../../share/assets/vector/NotFoundIcon.svg';
import Input from '../Input/Input';
import Button from '../Button/Index';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import SearchItem from '../SearchItem/SearchItem';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import useComponentVisible from '../../utils/useComponentVisible';
import Spinner from '../Spinner/Spinner';
import useDebounce from '../../Hook/useDebounce';
import { useHistory } from 'react-router';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import { useSelector } from 'react-redux';
import { getSearchItems, searchLoadingState, selectSearchState } from '../../features/search/action/getSearchItemData';
import { getProductId } from '../../features/order/actions/order';
import { RequestState, ROLE } from '../../enum';
import { getFreeUnit, selectLoginState, selectUserState } from '../../features/auth/actions/auth';
import { getWebhook } from '../../features/webhook/action/webhook';
import { customerAccessRole } from '../../constant';
import FadeLoader from 'react-spinners/FadeLoader';

import './Header.scss';
import OrderProcess from '../OrderProcess/OrderProcess';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [itemSearchDrink, setItemSearchDrink] = useState({} as Product);
  const [ref, isShowSearchDrink, setIsShowSearchDrink] = useComponentVisible(false);
  const [popUpLoginRightRef, isShowPopUpLoginRight, setIsShowPopupLoginRight] = useComponentVisible(false);
  const [refOrderProcess, isOpenPopUpOrder, setIsOpenPopUpOrder] = useComponentVisible(false);
  const debouncedKeyword = useDebounce(keyword, 500);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { role } = useSelector(selectUserState);
  const auth = useSelector(selectLoginState);
  const searchItems = useSelector(selectSearchState);
  const isLoading = useSelector(searchLoadingState);
  const checkUser = auth && customerAccessRole.includes(role as ROLE);
  useEffect(() => {
    if (checkUser) {
      dispatch(getWebhook());
      dispatch(getFreeUnit());
    }
  }, []);

  useEffect(() => {
    if (keyword.length >= 2) {
      dispatch(getSearchItems(keyword.toLocaleLowerCase())).unwrap();
      setIsShowSearchDrink(true);
    } else {
      setIsShowSearchDrink(false);
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    if (checkUser) {
      setIsShowPopupLoginRight(false);
    }
  }, [auth]);

  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClickSearchItem = (item: Product) => {
    setItemSearchDrink(item);
    setIsOpenPopUpOrder(!isOpenPopUpOrder);
    dispatch(getProductId(item.id));
    resetValue();
  };

  const handleOnFocus = () => {
    if (keyword.length >= 2) {
      setIsShowSearchDrink(true);
    }
  };

  useEffect(() => {
    if (keyword.length >= 2) {
      dispatch(getSearchItems(keyword.toLocaleLowerCase())).unwrap();
      setIsShowSearchDrink(true);
    } else {
      setIsShowSearchDrink(false);
    }
  }, [debouncedKeyword]);

  const goHome = () => {
    const path = `/`;
    history.push(path);
  };

  const resetValue = () => {
    setKeyword('');
  };

  return (
    <>
      <div className="header md:px-1 xxl:px-[40px] z-[1]">
        <div className="header__logo">
          <img className="h-full image" src={logo} alt="logo" onClick={goHome} />
        </div>

        {isShowSearchDrink && <div className="background-blur" />}
        <div className={`header__search-block ${isShowPopUpLoginRight ? '' : 'z-[2]'}`} ref={ref}>
          <Input
            placeholder="Tìm kiếm đồ uống..."
            src={keyword.length === 0 ? SearchVector : CancelVector}
            className="block-input--white block-input"
            value={keyword}
            onChange={handleSearchDrink}
            onClickSecondIcon={resetValue}
            onFocus={handleOnFocus}
          />

          {isShowSearchDrink &&
            (isLoading === RequestState.PENDING ? (
              <div className="loading h-[150px] bg-white">
                <FadeLoader color="#36d7b7" />
              </div>
            ) : searchItems.length ? (
              <div className="search-list">
                {searchItems.map((searchItem: Product) => (
                  <SearchItem
                    key={searchItem.id}
                    avatarUrl={searchItem.images}
                    name={searchItem.name}
                    price={searchItem.price.toString()}
                    onClick={() => handleClickSearchItem(searchItem)}
                  />
                ))}
              </div>
            ) : (
              <div className="not-found">
                <img src={NotFound} alt="Not Found" className="w-4 mb-1" />
                <p className="text-grey-1">Không tìm thấy sản phẩm</p>
              </div>
            ))}
        </div>
        <div className={`${isShowSearchDrink || isShowPopUpLoginRight ? '' : 'z-[2]'} header__button`}>
          {checkUser ? (
            <CustomerInformation />
          ) : (
            <div className="md:min-w-[100px] xxl:min-w-[120px] ">
              <Button
                className="btn btn-primary btn-login"
                titleButton="Đăng nhập"
                onClick={() => {
                  setIsShowPopupLoginRight(true);
                }}
              />
            </div>
          )}
        </div>
        {isShowPopUpLoginRight && (
          <div ref={popUpLoginRightRef} className="background-blur">
            <PopUpLoginRight />
          </div>
        )}
      </div>
      {isOpenPopUpOrder && (
        <div ref={refOrderProcess} className="background-blur">
          {
            <OrderProcess
              categoryId={itemSearchDrink.category.id}
              itemDrink={itemSearchDrink}
              setIsOpenPopUp={setIsOpenPopUpOrder}
            />
          }
        </div>
      )}
    </>
  );
};
export default Header;
