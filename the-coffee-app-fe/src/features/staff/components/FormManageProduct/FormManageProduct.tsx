import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import CustomUploadFile from '../../../../components/CustomUploadFile/CustomUploadFile';
import React, { useEffect, useRef, useState } from 'react';
import { InputParams, NotificationParams, OptionType, ProductTypeDto } from '../../../../interfaces';
import { ProductStatusList, statusCodeError } from '../../../../constant';
import { createProduct, updateProduct, createProductLoadingState } from '../../../product/actions/createProductData';
import { useAppDispatch } from '../../../../storage/hooks';
import './FormManageProduct.css';
import { NotificationType, RequestState } from '../../../../enum';
import Spinner from '../../../../components/Spinner/Spinner';
import { useSelector } from 'react-redux';

type Props = {
  selectedProduct?: ProductTypeDto;
  listCategory: OptionType[];
  formName: string;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
  onSave: () => void;
};

const prepareDataToCallApi = (dataProduct: ProductTypeDto) => {
  const { id, price, ...rest } = dataProduct;

  const prepareDataProduct = {
    ...rest,
    price: price.toString(),
  };

  const dataForm = new FormData();
  Object.entries(prepareDataProduct).forEach((obj) => {
    const key = obj[0];
    const value = obj[1];
    dataForm.append(key, value);
  });
  return { id, dataForm };
};

const FormManageProduct = (props: Props) => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isHavePreviewFile, setIsHavePreviewFile] = useState(false);
  const [isFullFill, setIsFullFill] = useState(false);
  const isLoading = useSelector(createProductLoadingState);
  const [dataProduct, setDataProduct] = useState<ProductTypeDto>(
    props.selectedProduct ?? {
      name: '',
      category: '',
      price: 0,
      status: '',
      images: '',
    },
  );

  useEffect(() => {
    if (Object.values(dataProduct).every(Boolean)) {
      setIsFullFill(true);
    } else {
      setIsFullFill(false);
    }
  }, [dataProduct]);

  const onClickBrowse = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (inputParams: InputParams) => {
    let name = '';
    let value: string | number | File = '';

    if (inputParams.event) {
      name = inputParams.event.target.name;
      value = inputParams.event.target.value;
    } else if (inputParams.body) {
      name = inputParams.body.name;
      value = inputParams.body.value;
    }

    setDataProduct({
      ...dataProduct,
      [name]: value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setContentNotification = (message: string, response: any) => {
    if (statusCodeError.includes(response.payload?.status)) {
      props.setShowNotification({
        type: NotificationType.FAILURE,
        message: response.payload.description,
      });
    } else {
      props.setShowNotification({ message, type: NotificationType.SUCCESS });
      props.onSave();
    }
  };

  const onSaveDataHandler = async () => {
    if (!isFullFill) {
      return;
    }

    const { id, dataForm } = prepareDataToCallApi(dataProduct);
    // eslint-disable-next-line no-console
    if (id) {
      const response = await dispatch(updateProduct({ productId: id, body: dataForm }));
      setContentNotification('Update item successfully!', response);
    } else {
      const response = await dispatch(createProduct(dataForm));
      setContentNotification('New Item added successfully!', response);
    }
  };

  return (
    <>
      <WrapperForm
        name={props.formName}
        isHavePreviewFile={isHavePreviewFile}
        isFullFill={isFullFill}
        onClickBrowseAgain={onClickBrowse}
        onClickSave={onSaveDataHandler}
        onClickExit={props.onClickExit}
        onClickCancel={props.onClickExit}
      >
        <div className="add-product">
          <div className="w-full h-fit">
            <CustomInput
              type="text"
              name="name"
              placeholder="Item Name"
              onChange={handleChange}
              value={dataProduct.name}
            />
          </div>
          <div className="w-full h-fit">
            <CustomSelect
              listOptions={props.listCategory}
              placeholder="Category"
              name="category"
              onChange={handleChange}
              selectedValue={dataProduct.category}
            />
          </div>
          <div className="w-full h-fit">
            <CustomInput
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={dataProduct.price}
            />
          </div>
          <div className="w-full h-fit">
            <CustomSelect
              listOptions={ProductStatusList}
              placeholder="Status"
              name="status"
              onChange={handleChange}
              selectedValue={dataProduct.status}
            />
          </div>
        </div>
        <div className="area-upload-file">
          <CustomUploadFile
            name="images"
            setIsHavePreviewFile={setIsHavePreviewFile}
            fileRef={fileRef}
            onClickBrowse={onClickBrowse}
            onChange={handleChange}
            selectedImage={dataProduct.images}
          />
        </div>
      </WrapperForm>
      {isLoading === RequestState.PENDING && (
        <div className="background-blur flex flex-col justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};
export default FormManageProduct;
