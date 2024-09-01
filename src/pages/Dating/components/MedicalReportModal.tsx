import React from 'react';
import { Button, Overlay } from '@/components/vip-ui';

const MedicalReportModal = ({ url = '' }: { url: string }) => {
    return (
        <Overlay trigger={<Button width="w-[80px]">查看报告</Button>}>
            <div className="mx-auto">
                <iframe
                    src={'https://img.sakuraclubjp.com/' + url}
                    className="w-full h-[75vh]"
                ></iframe>
            </div>
        </Overlay>
    );
};

export default MedicalReportModal;
