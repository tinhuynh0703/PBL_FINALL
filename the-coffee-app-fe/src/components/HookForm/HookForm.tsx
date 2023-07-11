import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../storage/hooks';
import { addDeviceToken, checkRole, login, setDeviceToken } from '../../features/auth/actions/auth';
import { useState } from 'react';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
import { getDeviceToken } from '../../services/firebase';
import { useHistory } from 'react-router';
import { ROLE } from '../../enum';
import Button from '../Button/Index';
import { customerAccessRole } from '../../constant';
import { FormLogin, schemaFormLogin } from '../../interfaces';
import Input from '../Input/Input';

const HookForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const methods = useForm<FormLogin>({
    resolver: yupResolver(schemaFormLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const {
    setError,
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = methods;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (dataForm: FormLogin) => {
    const responeLogin = await dispatch(login({ email: dataForm.email, password: dataForm.password }));

    dispatch(checkRole([ROLE.CUSTOMER, ROLE.ADMIN]));

    if (login.fulfilled.match(responeLogin) && customerAccessRole.includes(responeLogin.payload.userInfor.role)) {
      const deviceToken = await getDeviceToken();
      if (deviceToken) {
        await dispatch(addDeviceToken({ deviceToken: deviceToken }));
        dispatch(setDeviceToken(deviceToken));
      }
    } else {
      reset({ email: '', password: '' });
      setError('password', {
        message: 'Email or password incorrect',
      });
    }
  };
  const moveToLoginStaff = () => {
    history.push(`/login`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 mb-3">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Email"
              onChange={(event) => onChange(event.target.value)}
              value={value}
              error={errors.email}
              className="block-input--white m-auto"
              src={UserIcon}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              onChange={(event) => onChange(event.target.value)}
              value={value}
              src={isShowPassword ? CloseEyeIcon : EyeIcon}
              onClickSecondIcon={() => setIsShowPassword(!isShowPassword)}
              error={errors.password}
              className="mt-1.5 block-input--white m-auto"
            />
          )}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          isDisabled={!isValid}
          className={`btn btn-primary ${isValid ? 'btn--enabled' : 'btn--disabled'}`}
          titleButton="Đăng nhập ngay"
        />
      </div>
      <p
        className="text-error cursor-pointer text-right  mt-2.5 sm:text-style-375-body md:text-style-768-body xxl:text-style-1440-body sm:mr-0.75 sm:hidden md:block"
        onClick={moveToLoginStaff}
      >
        Đăng nhập với tư cách nhân viên
      </p>
    </form>
  );
};

export default HookForm;
