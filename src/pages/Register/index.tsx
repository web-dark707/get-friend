import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import UserToken from '@/common/token';
import { Input, Form, Button, Toast } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { cryptoEncrypt, getQueryString } from '@/utils/tools';
import { ACCOUNT_AES_KEY } from '@/common/constants';
import { register } from '@/api/login';
import { RegisterParams } from '@/types/api/login';

type RegisterPageProps = {};

const RegisterPage: FC<RegisterPageProps> = () => {
    const navigate = useNavigate();
    const code = getQueryString('code'); // 邀请码
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [form] = useForm();
    const location = useLocation();
    const { mutateAsync: mutateRegister, isLoading } = useMutation(register);

    const fetchUserLogin = async (values) => {
        const params: RegisterParams = {
            username: values.username,
            pwd: undefined,
            activationCode: values.activationCode,
        };
        params.pwd = cryptoEncrypt(values.pwd, ACCOUNT_AES_KEY);
        const res = await mutateRegister(params);
        console.log(res);

        if (res.code) {
            Toast.error(res.message);
        } else {
            Toast.success('注册成功');
            UserToken.setToken(res.data);
            if (location.state?.pathname) {
                navigate(location.state?.pathname + location.state?.search);
            } else {
                navigate('/', { replace: true });
            }
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
        <div className="w-full flex-col-center-start h-full bg-[#C95793]">
            <h2 className="mt-50px text-[26px] text-[#E7B6D0]">
                桜花私人俱楽部
            </h2>
            <h4 className="text-[#E7B6D0] mb-10px">さくらプライベートクラブ</h4>
            <img
                src={require('@/assets/images/home/login.jpg')}
                className="h-180px w-180px rounded-[48px]"
            />
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
                        field="username"
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
                            {
                                validator: (value, callback) => {
                                    if (form.getFieldValue('repeat-pwd')) {
                                        form.validateField('repeat-pwd');
                                    }
                                    return Promise.resolve(true);
                                },
                            },
                        ]}
                        field="pwd"
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
                            {
                                validator: (value, callback) => {
                                    if (value !== form.getFieldValue('pwd')) {
                                        callback(
                                            '两次输入密码不一致,请重新输入',
                                        );
                                    }
                                    return Promise.resolve(true);
                                },
                            },
                        ]}
                        field="repeat-pwd"
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
                        field="activationCode"
                        className="mb-16px"
                        labelClassName="w-50px mr-16px text-right flex-shrink-0 leading-[30px]"
                        rules={[
                            {
                                required: true,
                                message: '請輸入啟用設定',
                            },
                        ]}
                        initialValue={code}
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
