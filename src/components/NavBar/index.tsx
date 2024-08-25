import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getLanguage } from '@/config/locale';

type HeaderProps = {
    title?: string;
    rightContent?: React.ReactNode;
    type?: 'nav' | 'cell';
    onLeftClick?: () => void;
    className?: string;
};

const Header: FC<HeaderProps> = ({
    title,
    rightContent,
    type = 'nav',
    onLeftClick,
    className,
}) => {
    const navigate = useNavigate();
    const handelClick = () => {
        if (onLeftClick) onLeftClick();
        else navigate(-1);
    };
    const lang = getLanguage();

    return type === 'nav' ? (
        <div
            className={classNames(
                'flex-between-center h-48px pr-[20px] py-14px relative bg-[#C95793] text-[#fff]',
                className,
            )}
        >
            <div className="pl-16px" onClick={handelClick}>
                <img
                    className="w-24px h-24px"
                    src={require('@/assets/images/icon/other/back.png')}
                />
            </div>
            <div className="text-18px primary-text-gradient font-bold absolute left-1/2 transform -translate-x-1/2 text-center">
                {title}
            </div>
            <div
                className={`absolute ${
                    lang === 'zh' ? 'text-[12px] right-4' : 'text-sm right-0'
                }`}
            >
                {rightContent}
            </div>
        </div>
    ) : (
        <div
            className={classNames(
                'w-full flex-col-center h-48px text-18px py-14px  primary-text-gradient',
                className,
            )}
        >
            {title}
        </div>
    );
};

export default Header;
