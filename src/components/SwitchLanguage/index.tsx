import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { selectIsShowSwitchLanguage } from '@/store/common/selectors';
import { useSetIsShowSwitchLanguage } from '@/store/common/hooks';
import { changeLanguage, langList } from '@/config/locale';
import { langIconMap } from '@/common/options/lang';
import { getLanguage } from '@/config/locale';
import { LocaleEnum } from '@/enums/appEnum';
import { Popup } from '../vip-ui';

type SwitchLanguageProps = {};

export const SwitchLanguage: FC<SwitchLanguageProps> = (props) => {
    const isShowSwitchLanguage = useRecoilValue(selectIsShowSwitchLanguage);
    const setIsShowSwitchLanguage = useSetIsShowSwitchLanguage();
    const { t } = useTranslation();

    const handleCancel = () => {
        setIsShowSwitchLanguage(false);
    };

    const SwitchLanguageRender = () => {
        return (
            <div className="w-full popup-gradient text-lgSize text-[#fff]">
                <div className="flex-row-center py-12px border-b  border-solid  border-[rgba(255,255,255,0.2)] text-16px">
                    {t('card.guide.switchLanguage')}
                </div>
                <div className="w-full flex-col-center-start px-48px">
                    <div className="w-full pb-20px pt-10px text-lgSize">
                        {langList.map((lang, index) => (
                            <div
                                key={index}
                                className={classNames(
                                    'flex-row-center my-12px',
                                    {
                                        'text-primaryColor':
                                            getLanguage() === lang.value,
                                    },
                                )}
                                onClick={() => {
                                    changeLanguage(LocaleEnum[lang.value]);
                                    handleCancel();
                                }}
                            >
                                <img
                                    src={langIconMap[lang.value]}
                                    className="w-16px h-16px mr-6px"
                                />
                                <span>{lang.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <Popup
            visible={isShowSwitchLanguage}
            content={SwitchLanguageRender()}
            isHeaderHide={true}
            onCancel={handleCancel}
        />
    );
};

export default SwitchLanguage;
