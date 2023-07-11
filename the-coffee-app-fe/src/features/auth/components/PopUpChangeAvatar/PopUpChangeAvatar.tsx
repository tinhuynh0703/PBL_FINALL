import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button/Index';
import Card from '../../../../components/Card/Index';
import Upload from '../../../../share/assets/vector/Upload.svg';
import { useSelector } from 'react-redux';
import { selectUserState, updateAvatar } from '../../actions/auth';
import { NotificationParams } from '../../../../interfaces';
import { useAppDispatch } from '../../../../storage/hooks';
import { NotificationType, PositionToast } from '../../../../enum';
import './PopUpChangeAvatar.scss';

type Props = {
  onClickClosePopUp: () => void;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
};

const PopUpChangeAvatar = (props: Props) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<string>();
  const [failMessage, setFailMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { avatarUrl } = useSelector(selectUserState);

  const countSizeInMB = (size: number) => {
    return Math.floor(size / (1024 * 1024));
  };

  const validateFileType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const onClickBrowse = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const onSave = async () => {
    if (selectedFile) {
      const dataForm = new FormData();
      dataForm.append('avatarUrl', selectedFile);
      // eslint-disable-next-line no-console
      const response = await dispatch(updateAvatar(dataForm));
      // eslint-disable-next-line no-console
      if (updateAvatar.fulfilled.match(response)) {
        setPreviewFile('');
        props.setShowNotification({
          message: 'Avatar updated successfully!',
          type: NotificationType.SUCCESS,
          position: PositionToast.TOP_CENTER,
        });
      }
      if (updateAvatar.rejected.match(response)) {
        props.setShowNotification({
          message: failMessage,
          type: NotificationType.FAILURE,
          position: PositionToast.TOP_CENTER,
        });
      }
    }
  };

  const handleFileUpload = (file: File) => {
    if (countSizeInMB(file.size) > 20) {
      setFailMessage('The file being attached exceeds the size limit of 10 MB');
    } else if (!validateFileType(file)) {
      setFailMessage('We only accept PNG, JPG, JPEG or SVG files.');
    } else {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewFile(objectUrl);
    setFailMessage('');

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Card className="card card--right flex flex-col justify-around items-center bg-change-avatar">
      <div
        className="flex justify-around items-center rounded-[50%] bg-white  h-[180px] w-[180px]"
        onClick={onClickBrowse}
      >
        <img className="avatar" src={previewFile || avatarUrl || Upload} />
        <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={onChangeFile} />
      </div>
      <div className="text-center">
        <p className="text-style-1440-body mb-1.5">Browse or drag image into the above area</p>
        <p className="text-style-1440-body mb-1.5">JPG/JPEG/PNG - 512x512 for best display</p>
        <p className="text-style-1440-body text-accent-1">Maximum File Size: 5MB</p>
      </div>
      <Button
        className="text-white"
        type="submit"
        titleButton={previewFile ? 'SAVE' : 'BROWSE IMAGE'}
        onClick={previewFile ? onSave : onClickBrowse}
      />
    </Card>
  );
};

export default PopUpChangeAvatar;
