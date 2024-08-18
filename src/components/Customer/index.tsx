import React from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import {
    selectIsShowCustomerState,
    selectorConfig,
} from '@/store/common/selectors';
import { useSetIsShowCustomer } from '@/store/common/hooks';
import { customerLangMap } from '@/common/options/lang';
import { Button, Popup } from '../vip-ui';

const Customer = () => {
    const isShowCustomer = useRecoilValue(selectIsShowCustomerState);
    const phoneInfo = useRecoilValue(selectorConfig)?.service_hotline;
    const setIsShowCustomer = useSetIsShowCustomer();
    const { t } = useTranslation();

    const handleCancel = () => {
        setIsShowCustomer(false);
    };
    const handleClick = (phone: string) => {
        handleCancel();
        window.location.href = `tel:${phone}`;
    };
    const CustomerRender = () => {
        return (
            <div className="w-full popup-gradient text-lgSize text-[#fff]">
                <div className="flex-row-center py-12px border-b border-solid border-[rgba(255,255,255,0.2)] text-16px">
                    {t('message.title.serviceHotline')}
                </div>
                <div className="w-full flex-col-center-start px-48px">
                    <div
                        className="flex-row-center py-16px mt-8px border-b border-solid border-[rgba(255,255,255,0.2)]"
                        onClick={() => handleClick(phoneInfo?.['en'])}
                    >
                        <img
                            src={require('@/assets/images/icon/other/phone.png')}
                            className="w-16px h-16px mr-6px"
                        />
                        <span>
                            {t('message.label.call')}
                            {phoneInfo?.['en']}
                        </span>
                        <span className="ml-4px">
                            ({customerLangMap['zh']}/{customerLangMap['en']})
                        </span>
                    </div>

                    <div
                        className="flex-row-center py-16px"
                        onClick={() => handleClick(phoneInfo?.['kr'])}
                    >
                        <img
                            src={require('@/assets/images/icon/other/phone.png')}
                            className="w-16px h-16px mr-6px"
                        />
                        <span>
                            {t('message.label.call')}
                            {phoneInfo?.['kr']}
                        </span>
                        <span className="ml-4px">
                            ({customerLangMap['kr']})
                        </span>
                    </div>
                    <Button className="mt-16px mb-40px" onClick={handleCancel}>
                        {t('app.ui.cancel')}
                    </Button>
                </div>
            </div>
        );
    };
    return (
        <Popup
            visible={isShowCustomer}
            content={CustomerRender()}
            isHeaderHide={true}
            onCancel={handleCancel}
        />
    );
};

export default Customer;
