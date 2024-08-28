import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import UserToken from '@/common/token';
import { Input, Form, Button, Toast } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
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
            pwd: values.pwd,
        };
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
        <div className="w-full flex-col-center-start  min-h-full  bg-[#C95793]">
            <h2 className="mt-50px text-[26px] text-[#E7B6D0]">
                桜花私人俱楽部
            </h2>
            <h4 className="text-[#E7B6D0] mb-10px">さくらプライベートクラブ</h4>
            <img
                src={require('@/assets/images/home/login.jpg')}
                className="h-180px w-180px rounded-[48px]"
            />
            <Form
                form={form}
                onSubmit={onSubmit}
                className="flex justify-between text-[16px] text-[#fff] min-h-[180px] mt-[38px] mx-[12px]"
                onValuesChange={() => {
                    form.getFieldsError().then((res) => {
                        setLoginDisabled(res.hasError);
                    });
                }}
            >
                <div className="bg-[#EA82B4] text-[18px] font-bold w-[90px] px-[8px] flex flex-col justify-around items-center mr-[8px] rounded-xl flex-shrink-0">
                    <div>帳號</div>
                    <div>密碼</div>
                </div>
                <div className="bg-[#BF2A81] flex-1 flex flex-col justify-around items-center rounded-xl px-[8px] py-[12px]">
                    {/* -------------------------------------------户口号--------------------------------------------- */}
                    <Form.Item
                        field="username"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: '請輸入帳號',
                            },
                        ]}
                    >
                        <Input
                            placeholder={'請輸入帳號'}
                            inputClass="placeholder-[#bbb]"
                            className="h-[40px] text-[#222] border-1 border-solid border-[#c2c2c2] bg-[#fff] rounded-md mb-[8px]"
                        />
                    </Form.Item>
                    <Form.Item
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: '請輸入密碼',
                            },
                        ]}
                        field="pwd"
                    >
                        {/* -------------------------------------------密码--------------------------------------------- */}
                        <Input
                            type="password"
                            placeholder={'請輸入密碼'}
                            inputClass="placeholder-[#bbb]"
                            className="h-[40px] text-[#222] border-1 border-solid border-[#c2c2c2] bg-[#fff] rounded-md mb-[8px]"
                        />
                    </Form.Item>
                </div>
            </Form>
            <Button
                onClick={() => form.submit()}
                disabled={loginDisabled}
                loading={isLoading}
                className="w-[340px] mx-auto h-[40px] text-[18px]  mt-[20px] border-1 border-solid border-[#fff]"
            >
                登入
            </Button>
            <div
                className="text-center mt-[16px] text-[#fff]"
                onClick={() => navigate('/register')}
            >
                去注册
            </div>
            <div className="text-center w-full pb-[20px] mt-[40px]">
                <img
                    className="w-[200px] mx-auto"
                    src={require('@/assets/images/home/my-logo.jpg')}
                />
                <div className="text-[#fff]">
                    日本サンインフォメーションテクノロジー株式会社
                </div>
                <div className="text-[#fff]">@COPYRIGHT 2018-2021</div>
            </div>
        </div>
    );
};
export default LoginPage;
