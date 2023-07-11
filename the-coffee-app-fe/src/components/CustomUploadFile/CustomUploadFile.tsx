import { useEffect, useState } from 'react';
import './CustomUploadFile.css';
import IconUpload from '../../share/assets/vector/IconUpload.svg';
import { InputParams } from '../../interfaces';

type Props = {
  selectedImage?: File | string;
  setIsHavePreviewFile: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  onClickBrowse: React.MouseEventHandler<HTMLElement>;
  name: string;
  onChange: (inputParam: InputParams) => void;
};

const CustomUploadFile = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<File | string>(props.selectedImage ?? '');
  const [failMessage, setFailMessage] = useState('');

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

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    props.onChange({
      body: {
        name: props.name,
        value: selectedFile,
      },
    });
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewFile(objectUrl);
    setFailMessage('');

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    props.setIsHavePreviewFile(!!previewFile);
  }, [previewFile]);

  // useEffect(() => {
  //   if (selectedFile) {
  //     props.onChange({
  //       body: {
  //         name: props.name,
  //         value: selectedFile,
  //       },
  //     });
  //   }
  // }, [selectedFile]);

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (countSizeInMB(file.size) > 10) {
      setFailMessage('The file being attached exceeds the size limit of 10 MB');
    } else if (!validateFileType(file)) {
      setFailMessage('We only accept PNG, JPG, JPEG or SVG files.');
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <div
      className="custom-upload"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <div className="custom-upload__header">Item Image</div>
      <div className="custom-upload__area">
        <input
          type="file"
          name={props.name}
          accept="image/*"
          ref={props.fileRef}
          className={`custom-upload__file-upload ${previewFile ? 'absolute w-0 h-0' : 'w-full h-full'}`}
          onChange={onChangeFile}
        />
        {previewFile ? (
          <img
            className="w-full h-full"
            alt="previewFile"
            src={typeof previewFile === 'string' ? previewFile : URL.createObjectURL(previewFile)}
          />
        ) : (
          <>
            <img className="absolute" alt="iconUpload" src={IconUpload} onClick={props.onClickBrowse} />
            <p className="custom-upload__label">
              Use 1:1 ratio Image. <br /> 512x512 for best display.
            </p>
          </>
        )}
      </div>
      {failMessage && <div className="custom-upload__error">{failMessage}</div>}

      <div className="custom-upload__footer">Browse or Drag item image into the area</div>
    </div>
  );
};

export default CustomUploadFile;
