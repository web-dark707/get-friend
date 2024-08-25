import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Overlay } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { isWithDotNumber } from '@/utils/validate';
import { getLastAddress } from '@/api/home';
import { LastAddressResult } from '@/types/api/home';
interface Props {
    visible: boolean;
    onCancel: () => void;
    addressInfo: { tel: string; tg: string; address: string } | null;
    handleChange: (key: string, values: LastAddressResult) => void;
}
const ContactDetailsModal = ({
    handleChange,
    addressInfo,
    onCancel,
    visible,
}: Props) => {
    const [form] = useForm();
    const [initialValues, setInitialValues] = useState(addressInfo);
    const { mutateAsync: mutateLastAddress, isLoading } =
        useMutation(getLastAddress);

    const onSubmit = (values) => {
        handleChange('addressInfo', values);
        onCancel();
    };
    const handleUseLastAddress = async () => {
        const res = await mutateLastAddress();
        if (res.data) {
            setInitialValues(res.data);
        }
    };
    const handleConfirm = () => {
        form.submit();
    };

    return (
        <Overlay visible={visible} onCancel={onCancel}>
            <div className="w-[88%] bg-[#2c1e2b] rounded-[10px] shadow-lg mx-auto text-[#e0e0e0]">
                <div className="bg-[#b8336a] text-white text-[18px] font-bold py-[8px] rounded-t-[10px] w-full text-center">
                    輸入聯絡方式
                </div>
                <div className="px-[16px]  pb-[8px]">
                    <Form
                        className="mt-[20px] rounded-[8px]"
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <Form.Item
                            field="tel"
                            label={
                                <div className="flex items-center text-[16px] text-center">
                                    <div className="w-[80px]">手机</div>
                                    <div className="w-[2px] h-[30px] bg-[#5D5B5B] mr-[10px]"></div>
                                </div>
                            }
                            className="mb-[24px] !items-center"
                            errorClassName="text-right text-[#ff4d4f]"
                            labelClassName="flex"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机',
                                },
                            ]}
                        >
                            <Input
                                placeholder="请输入手机"
                                isClear={false}
                                validator={isWithDotNumber}
                                className="!border-none !opacity-100"
                                inputClass="text-right text-[14px] font-semibold bg-[#5d394d] text-[#ffffff] border border-[#c72c77] rounded-[8px] px-[10px] py-[8px]"
                            />
                        </Form.Item>
                        <Form.Item
                            field="tg"
                            label={
                                <div className="flex items-center text-[16px] text-center">
                                    <div className="w-[80px]">Telegram</div>
                                    <div className="w-[2px] h-[30px] bg-[#5D5B5B] mr-[10px]"></div>
                                </div>
                            }
                            className="mb-[24px] !items-center"
                            errorClassName="text-right text-[#ff4d4f]"
                            labelClassName="flex"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入Telegram',
                                },
                            ]}
                        >
                            <Input
                                placeholder="请输入Telegram"
                                isClear={false}
                                className="!border-none !opacity-100"
                                inputClass="text-right text-[14px] font-semibold bg-[#5d394d] text-[#ffffff] border border-[#c72c77] rounded-[8px] px-[10px] py-[8px]"
                            />
                        </Form.Item>

                        <Form.Item
                            field="address"
                            label={
                                <div className="flex items-center text-[16px] text-center">
                                    <div className="w-[80px]">地址</div>
                                    <div className="w-[2px] h-[30px] bg-[#5D5B5B] mr-[10px]"></div>
                                </div>
                            }
                            className="mb-[24px] !items-center"
                            errorClassName="text-right text-[#ff4d4f]"
                            labelClassName="flex"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入地址',
                                },
                            ]}
                        >
                            <Input
                                placeholder="请输入地址"
                                isClear={false}
                                className="!border-none !opacity-100"
                                inputClass="text-right text-[14px] font-semibold bg-[#5d394d] text-[#ffffff] border border-[#c72c77] rounded-[8px] px-[10px] py-[8px]"
                            />
                        </Form.Item>
                    </Form>
                    <div className="flex justify-end">
                        <Button
                            className="w-[100px]"
                            onClick={handleUseLastAddress}
                            loading={isLoading}
                        >
                            使用上次地址
                        </Button>
                    </div>
                    <div className="text-[14px] text-[#ff4d4f] mt-[20px] text-center font-semibold">
                        注意：請提供真實有效的聯絡方式並保持暢通，以便為您安排後續約會
                    </div>
                    <div className="flex justify-end">
                        <Button className="w-[60px]" onClick={handleConfirm}>
                            确认
                        </Button>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default ContactDetailsModal;
