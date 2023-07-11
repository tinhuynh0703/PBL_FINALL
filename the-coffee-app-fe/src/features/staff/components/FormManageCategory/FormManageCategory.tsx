import React, { useEffect, useState } from 'react';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import { InputParams } from '../../../../interfaces';
import { CategoryTypeDto } from '../../../../interfaces/category';
import { NotificationParams } from '../../../../interfaces';
import { useAppDispatch } from '../../../../storage/hooks';
import { createCategory, updateCategory } from '../../../product/actions/createCategoryData';
import { statusCodeError } from '../../../../constant';
import { NotificationType } from '../../../../enum';
import { startCase } from 'lodash';

type Props = {
  selectedCategory?: CategoryTypeDto;
  formName: string;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
  onSave: () => void;
};

const FormManageCategory = (props: Props) => {
  const [isFullFill, setIsFullFill] = useState(false);
  const [category, setCategory] = useState<CategoryTypeDto>(props.selectedCategory ?? { id: '', name: '' });
  const dispatch = useAppDispatch();

  const handleChange = (inputParams: InputParams) => {
    if (inputParams.event) {
      const { value } = inputParams.event.target;
      setCategory({ ...category, name: value });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setContentNotification = (message: string, response: any) => {
    if (statusCodeError.includes(response.payload.status)) {
      props.setShowNotification({
        type: NotificationType.FAILURE,
        message: message,
      });
    } else {
      props.setShowNotification({ message, type: NotificationType.SUCCESS });
      props.onSave();
    }
  };

  useEffect(() => {
    if (category.name) {
      setIsFullFill(true);
    } else {
      setIsFullFill(false);
    }
  }, [category]);

  const onSaveDataHandler = async () => {
    if (!isFullFill) {
      return;
    }

    category.name = startCase(category.name.trim());
    if (category.id) {
      const response = await dispatch(updateCategory({ categoryId: category.id, body: { name: category.name } }));
      if (updateCategory.fulfilled.match(response)) {
        setContentNotification('Update Category successfully!', response);
      } else {
        setContentNotification('Category name already existed', response);
      }
    } else {
      const response = await dispatch(createCategory({ name: category.name }));
      if (createCategory.fulfilled.match(response)) {
        setContentNotification('New Category added successfully!', response);
      } else {
        setContentNotification('Category name already existed', response);
      }
    }
  };

  return (
    <WrapperForm
      name={props.formName}
      isFullFill={isFullFill}
      onClickSave={onSaveDataHandler}
      onClickExit={props.onClickExit}
      onClickCancel={props.onClickExit}
    >
      <div className="w-50 my-2">
        <CustomInput value={category.name} type="text" name="category" placeholder="Category" onChange={handleChange} />
      </div>
    </WrapperForm>
  );
};
export default FormManageCategory;
