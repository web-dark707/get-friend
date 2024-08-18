import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import UserToken from '@/common/token';
import { Input, Form, Button, Toast } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { getUserInfo, userLogin } from '@/api/user';
import { useSetIsChangePwdState, useSetUserInfo } from '@/store/user/hooks';
import { cryptoEncrypt } from '@/utils/tools';
import { ACCOUNT_AES_KEY } from '@/common/constants';
import { UserLoginParams } from '@/types/api/user';
import { setStorage } from '@/utils/storage';

type RegisterPageProps = {};

const RegisterPage: FC<RegisterPageProps> = () => {
    const navigate = useNavigate();
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [form] = useForm();
    const location = useLocation();
    const { t } = useTranslation();
    const setIsChangePwdState = useSetIsChangePwdState();
    const setUserInfo = useSetUserInfo();

    const { mutateAsync: mutateUserLogin, isLoading } = useMutation(userLogin);
    const { mutateAsync: mutateGetUserInfo } = useMutation(getUserInfo);

    const fetchUserLogin = async (values) => {
        const params: UserLoginParams = {
            account: values.account,
            password: undefined,
        };
        params.password = cryptoEncrypt(values.password, ACCOUNT_AES_KEY);
        const res = await mutateUserLogin(params);

        if (res.code === 10000) {
            Toast.success(t('app.message.success.login'));

            UserToken.setToken(res.data.token);

            await fetchGetUserInfo();
            if (location.state?.pathname) {
                navigate(location.state?.pathname + location.state?.search);
            } else {
                navigate('/', { replace: true });
            }
            window.location.reload();
        } else {
            return t('message.content.codeError');
        }
    };

    // 获取用户信息
    const fetchGetUserInfo = async () => {
        const res = await mutateGetUserInfo();
        if (res.code === 10000) {
            setUserInfo(res.data);
            setIsChangePwdState(!!res.data.r);
        }
    };

    const onSubmit = (values: any, result: any) => {
        fetchUserLogin(values);
    };

    useEffect(() => {
        if (UserToken.getToken()) navigate('/', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full flex-col-center-start">
            <div className="w-350px bg-[#BF2A81] rounded-16px mt-32px">
                <Form
                    form={form}
                    onSubmit={onSubmit}
                    className="w-full  p-24px"
                    onValuesChange={() => {
                        form.getFieldsError().then((res) => {
                            setLoginDisabled(res.hasError);
                        });
                    }}
                >
                    {/* -------------------------------------------户口号--------------------------------------------- */}
                    <Form.Item
                        label="帳號"
                        field="account"
                        className="mb-16px"
                        labelClassName="w-50px mr-16px text-right flex-shrink-0 leading-[30px]"
                        rules={[
                            {
                                required: true,
                                message: '請輸入帳號',
                            },
                        ]}
                    >
                        <Input
                            inputClass="placeholder-primaryColor"
                            placeholder={'請輸入帳號'}
                            className="flex-between-center px-[10px] rounded-8px h-42px "
                            prefixDom={
                                <img
                                    src={require('@/assets/images/icon/form/user.png')}
                                    className="w-22px h-22px"
                                />
                            }
                            onClear={() => {
                                setStorage('account', '');
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="密碼"
                        labelClassName="w-50px mr-16px text-right flex-shrink-0 leading-[30px]"
                        rules={[
                            {
                                required: true,
                                message: '請輸入密碼',
                            },
                        ]}
                        field="password"
                        className="mb-16px"
                    >
                        {/* -------------------------------------------密码--------------------------------------------- */}
                        <Input
                            inputClass="placeholder-primaryColor"
                            type="password"
                            placeholder={'請輸入密碼'}
                            className="flex-between-center px-[10px] rounded-8px h-42px "
                            prefixDom={
                                <img
                                    src={require('@/assets/images/icon/form/lock.png')}
                                    className="w-22px h-22px"
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="重複密碼"
                        labelClassName="w-50px mr-16px text-right flex-shrink-0 leading-[30px]"
                        rules={[
                            {
                                required: true,
                                message: '請輸入重複密碼',
                            },
                        ]}
                        field="repeat-password"
                        className="mb-16px"
                    >
                        {/* -------------------------------------------密码--------------------------------------------- */}
                        <Input
                            inputClass="placeholder-primaryColor"
                            type="password"
                            placeholder={'請輸入重複密碼'}
                            className="flex-between-center px-[10px] rounded-8px h-42px "
                            prefixDom={
                                <img
                                    src={require('@/assets/images/icon/form/lock.png')}
                                    className="w-22px h-22px"
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="啟用設定"
                        field="enabling-settings"
                        className="mb-16px"
                        labelClassName="w-50px mr-16px text-right flex-shrink-0 leading-[30px]"
                        rules={[
                            {
                                required: true,
                                message: '請輸入啟用設定',
                            },
                        ]}
                    >
                        <Input
                            inputClass="placeholder-primaryColor"
                            placeholder={'請輸入啟用設定'}
                            className="flex-between-center px-[10px] rounded-8px h-42px "
                            prefixDom={
                                <img
                                    src={require('@/assets/images/icon/form/user.png')}
                                    className="w-22px h-22px"
                                />
                            }
                            onClear={() => {
                                setStorage('account', '');
                            }}
                        />
                    </Form.Item>

                    <Button
                        onClick={() => form.submit()}
                        disabled={loginDisabled}
                        loading={isLoading}
                        className="w-full flex-row-center"
                    >
                        註冊
                    </Button>
                </Form>
            </div>
        </div>
    );
};
export default RegisterPage;
