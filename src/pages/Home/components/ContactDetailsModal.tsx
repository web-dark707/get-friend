import React from 'react';
import { Button, Form, Input, Overlay } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { isWithDotNumber } from '@/utils/validate';

const MedicalReportModal = () => {
    const [form] = useForm();
    const onSubmit = () => {};

    return (
        <Overlay
            trigger={
                <Button className="button-gradient text-white font-bold">
                    輸入聯絡方式
                </Button>
            }
        >
            <div className="w-[88%] bg-[#2c1e2b] rounded-[10px] shadow-lg mx-auto text-[#e0e0e0] pb-[20px]">
                <div className="bg-[#b8336a] text-white text-[18px] font-bold px-[12px] py-[8px] rounded-t-[10px] w-full text-center">
                    輸入聯絡方式
                </div>
                <Form
                    className="mt-[20px] p-[20px] rounded-[8px]"
                    form={form}
                    onSubmit={onSubmit}
                >
                    <Form.Item
                        field="mobile"
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
                            validator={isWithDotNumber}
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
                <div className="text-[14px] text-[#ff4d4f] mt-[20px] text-center font-semibold">
                    注意：請提供真實有效的聯絡方式並保持暢通，以便為您安排後續約會
                </div>
            </div>
        </Overlay>
    );
};

export default MedicalReportModal;
