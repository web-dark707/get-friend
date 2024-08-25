import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import UserToken from '@/common/token';
import { Input, Form, Button, Toast } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { cryptoEncrypt } from '@/utils/tools';
import { ACCOUNT_AES_KEY } from '@/common/constants';
import { getStorage, setStorage } from '@/utils/storage';
import { login } from '@/api/login';
import { LoginParams } from '@/types/api/login';

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [form] = useForm();
    const { mutateAsync: mutateUserLogin, isLoading } = useMutation(login);
    const fetchUserLogin = async (values) => {
        const params: LoginParams = {
            username: values.username,
            pwd: undefined,
        };
        params.pwd = cryptoEncrypt(values.pwd, ACCOUNT_AES_KEY);
        const res = await mutateUserLogin(params);

        if (res.code) {
            Toast.error(res.message);
        } else {
            Toast.success(t('app.message.success.login'));
            UserToken.setToken(res.data);
            navigate('/', { replace: true });
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
        <div className="w-full flex-col-center-start  h-full  bg-[#C95793]">
            <h2 className="mt-50px text-[26px] text-[#E7B6D0]">
                桜花私人俱楽部
            </h2>
            <h4 className="text-[#E7B6D0] mb-10px">さくらプライベートクラブ</h4>
            <img
                src={require('@/assets/images/home/login.jpg')}
                className="h-180px w-180px rounded-[48px]"
            />
            <div className="w-350px rounded-16px mt-32px bg-[#BF2A81] login-form-bg">
                <Form
                    form={form}
                    onSubmit={onSubmit}
                    className="bg-[#BF2A81] h-full  rounded-16px  p-24px"
                    onValuesChange={() => {
                        form.getFieldsError().then((res) => {
                            setLoginDisabled(res.hasError);
                        });
                    }}
                >
                    {/* -------------------------------------------户口号--------------------------------------------- */}
                    <Form.Item
                        label="帳號"
                        field="username"
                        className="mb-16px"
                        initialValue={getStorage('username')}
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
                                setStorage('username', '');
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
                        field="pwd"
                        className="mb-35px"
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
                    <Button
                        onClick={() => form.submit()}
                        disabled={loginDisabled}
                        loading={isLoading}
                        className="w-full flex-row-center"
                    >
                        登入
                    </Button>
                </Form>
                <div
                    className="text-center mt-10px"
                    onClick={() => navigate('/register')}
                >
                    去注册
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
