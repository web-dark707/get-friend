import React, { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Overlay, Toast } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { recordDispute } from '@/api/record';
interface Props {
    datingRecordId: string;
    reloadData: () => void;
}
const ComplainModal = ({ datingRecordId, reloadData }: Props) => {
    const [form] = useForm();
    const overlayRef = useRef(null);
    const { mutateAsync: mutateRecordDispute, isLoading } =
        useMutation(recordDispute);

    const onSubmit = async (values) => {
        mutateRecordDispute({
            datingRecordId,
            content: values?.content as string,
        }).then(() => {
            reloadData();
            overlayRef.current.close();
            Toast.error('提交成功');
        });
    };

    const handleConfirm = () => {
        form.submit();
    };

    return (
        <Overlay
            ref={overlayRef}
            trigger={
                <Button className="w-[100px] button-gradient text-white font-bold">
                    我要投訴
                </Button>
            }
        >
            <div className="w-[88%] bg-[#2c1e2b] rounded-[10px] shadow-lg mx-auto text-[#e0e0e0]">
                <div className="bg-[#b8336a] text-white text-[18px] font-bold py-[8px] rounded-t-[10px] w-full text-center">
                    請輸入投訴內容
                </div>
                <div className="px-[16px]  pb-[8px]">
                    <Form
                        className="mt-[20px] rounded-[8px]"
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <Form.Item
                            field="content"
                            className="mb-[24px] !items-center"
                            rules={[
                                { required: true, message: '请输入投诉内容' },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="请输入投诉内容"
                                isClear={false}
                                className="!border-none !opacity-100 h-[100px]"
                                inputClass="text-[14px] font-semibold bg-[#5d394d] text-[#ffffff] border border-[#c72c77] rounded-[8px] px-[10px] py-[8px]"
                            />
                        </Form.Item>
                    </Form>
                    <div className="text-[14px] text-[#ff4d4f] mt-[20px] font-semibold">
                        提示：平台收到投訴後會第一時間進行核實狀況，請保持聯絡方式暢通
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="w-[60px]"
                            onClick={handleConfirm}
                            loading={isLoading}
                        >
                            确认
                        </Button>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default ComplainModal;
