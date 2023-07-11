import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import { TableReportHeader } from '../../../../components/Table/constants/table.constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { selectOrderByDateState, getOrderByDate } from '../../../order/actions/getOrderByDate';
import DatePicker from 'react-date-picker';
import './Report.scss';
import AddButton from '../../../../components/AddButton/AddButton';
import DownloadIcon from '../../../../share/assets/vector/Download.svg';
import Order, { OrderReportType } from '../../../../interfaces/order';
import { getOrderByDateParams } from '../../../order/api/orderParams';
import { moneyFormat } from '../../../../utils/MoneyFormat';
import moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const limit = 15;

const processDownLoadData = (data: OrderReportType[]) => {
  let blobData = '';
  blobData += TableReportHeader.join(',');
  data.forEach((row, indx) => {
    const copyData = { ...row };
    delete copyData['id'];
    // copyData.createAt = moment(copyData.createAt).format('DD/MM/YYYY HH:mm').toString();
    blobData += '\n' + [indx + 1, ...Object.values(copyData)].join(',');
  });

  return blobData;
};

const prepareDataTableReport = (listOrder: Order[]) => {
  const data: OrderReportType[] = [];
  listOrder.map((order) => {
    const dataReportTable = {
      id: order.id,
      createAt: moment(order.createdAt).format('DD-MMM-YYYY HH:mm').toString(),
      user: order.user.name,
      product: order.product.name,
      quantity: order.quantity,
      orderStatus: order.orderStatus.name.toUpperCase(),
      price: order.product.price * order.quantity,
    };
    data.push(dataReportTable);
  });

  return data;
};

const Report = () => {
  const dispatch = useAppDispatch();
  const orderByDate = useSelector(selectOrderByDateState);
  const [activeTag, setActiveTag] = useState('Date');
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [listAllOrder, setListAllOrder] = useState([] as OrderReportType[]);
  // const [listOrderAmount, setListOrderAmount] = useState([] as )
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    const param: getOrderByDateParams = {
      type: activeTag,
      from: dateFrom,
      to: dateTo,
      limit,
      offset: 0,
    };
    const getData = async (param: getOrderByDateParams) => {
      if (activeTag === 'Date') {
        param.to = dateFrom;
      }

      if (activeTag === 'Month') {
        const now = new Date();
        now.setDate(1);

        param.to = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);
      }

      const allOrder = await dispatch(getOrderByDate({ code: 'all', ...param })).unwrap();
      setListAllOrder(prepareDataTableReport(allOrder as Order[]));
      // setList
      const dataListOrder = await dispatch(getOrderByDate(param)).unwrap();
      const isCheckLastPage = dataListOrder.totalOrder <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataListOrder.length);
    };

    getData(param);
  }, [activeTag, dateFrom, dateTo]);

  const getDataForTable = (offset: number) => {
    const param: getOrderByDateParams = { type: activeTag, from: dateFrom, to: dateTo, limit, offset };
    dispatch(getOrderByDate(param));
  };

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
      // setOffset(lastIndex);
      getDataForTable(lastIndex);
      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    // setOffset(startIndex + limit - 1);
    getDataForTable(startIndex + limit - 1);
  };

  const onClickMovePreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      // setOffset(startIndex - limit - 1);
      getDataForTable(startIndex - limit - 1);

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    getDataForTable(startIndex - limit - 1);

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  const handleChangeTab = (tab: string) => {
    if (activeTag === tab) return;
    if (tab === 'Date') {
      setDateFrom(new Date());
      setDateTo(new Date());
    }
    if (tab === 'Range') {
      setDateFrom(new Date());
      setDateTo(new Date());
    }
    if (tab === 'Month') {
      const now = new Date();
      now.setDate(1);
      // console.log('123', new Date(now.getFullYear(), now.getMonth() + 1, 0))
      setDateTo(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      setDateFrom(now);
    }
    setActiveTag(tab);
    setStartIndex(1);
    setIsFirstPage(true);
    // setDateFrom(new Date());
  };
  console.log('ddd', dateTo);
  const handleDownloadExcel = () => {
    const data = processDownLoadData(listAllOrder);
    // eslint-disable-next-line no-console
    const blobData = new Blob(['\uFEFF' + data], { type: 'text/csv; charset=utf-18' });
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${new Date()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // const worksheet = utils.json_to_sheet(listAllOrder);
    // utils.book_append_sheet(file, worksheet);
    // writeFile(file, './test.xlsx');
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const handleChangeTime = (date: Date) => {
    // console.log('vaodate', date)
    if (activeTag === 'Month') {
      console.log('dateee', date);
      setDateFrom(date);
      setDateTo(date);
      return;
    }
    setDateFrom(date);
  };

  const exportToCSV = (csvData: any, fileName: any) => {
    const dataToCsv = csvData.map((data: any, index: number) => {
      const { id, ...keep } = data;
      const realData = {
        Index: index,
        User: keep.user,
        Name_Product: keep.product,
        Quantity: keep.quantity,
        Status_Of_Order: keep.orderStatus,
        Price: keep.price,
        Date: keep.createAt,
      };
      return realData;
    });

    const ws = XLSX.utils.json_to_sheet(dataToCsv);
    const wb = { Sheets: { data: ws }, SheetNames: [`data`] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <div className="list-product">
        <div className="list-product-header items-center">
          <div className="tab-list">
            {['Date', 'Month', 'Range'].map((tab) => (
              <p
                key={tab}
                className={activeTag === tab ? `filter-tag--active` : `filter-tag`}
                onClick={() => handleChangeTab(tab)}
              >
                By {tab}
              </p>
            ))}
          </div>
          <AddButton
            name="Download as CSV"
            icon={DownloadIcon}
            onClick={() =>
              exportToCSV(
                listAllOrder,
                `Report ${dateFrom.getDate()}-${
                  dateFrom.getMonth() + 1
                }-${dateFrom.getFullYear()}_${dateTo.getDate()}-${dateTo.getMonth() + 1}-${dateTo.getFullYear()}`,
              )
            }
          />
        </div>
        <div className="list-product-header">
          <div className="flex">
            <DatePicker
              className="react-date-picker"
              calendarClassName="react-calendar"
              maxDetail={activeTag === 'Month' ? 'year' : 'month'}
              clearIcon={null}
              maxDate={new Date()}
              value={dateFrom}
              onChange={(date: Date) => setDateFrom(date)}
              format={activeTag === 'Month' ? 'yyyy--MM' : 'yyyy--MM--dd'}
            />
            {activeTag === 'Range' && (
              <DatePicker
                className="react-date-picker ml-1"
                calendarClassName="react-calendar"
                clearIcon={null}
                minDate={dateFrom}
                value={dateTo}
                onChange={(date: Date) => setDateTo(date)}
                format="yyyy--MM--dd"
              />
            )}
          </div>
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={orderByDate.totalOrder || 0}
            isLastPage={isLastPage}
            isFirstPage={isFirstPage}
            onClickNextPage={() => onClickMoveNextPage(orderByDate.totalOrder)}
            onClickPreviousPage={onClickMovePreviousPage}
          />
        </div>
        {listAllOrder && (
          <div className="flex justify-between mt-1 mb-0.5 mx-1">
            <p>Total Amount: {moneyFormat(listAllOrder.reduce((acc, it) => (acc += it.price), 0))}</p>
            {/*<p>Out of Range: {moneyFormat(listAllOrder.reduce((acc, it) => (acc += it.outOfRange), 0))}</p>*/}
            {/* <p>Best Drink: </p> */}
          </div>
        )}
        {listAllOrder && (
          <div className="list-product-table">
            <Table header={TableReportHeader} body={listAllOrder} startIndex={startIndex} />
          </div>
        )}
      </div>
    </>
  );
};

export default Report;
