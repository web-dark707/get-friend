import React from 'react';
import { Button, Overlay } from '@/components/vip-ui';

const MedicalReportModal = () => {
    return (
        <Overlay trigger={<Button width="w-[80px]">查看报告</Button>}>
            <div className=" mx-auto">1</div>
        </Overlay>
    );
};

export default MedicalReportModal;
