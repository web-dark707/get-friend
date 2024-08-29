import React, { FC, useEffect, useState } from 'react';
import './styles.scss';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { getUserInfo } from '@/api/user';
import { selectorDict } from '@/store/common/selectors';
import { getMyCoupons } from '@/api/home';
import { Button } from '@/components/vip-ui';
import { handleClipboard } from '@/utils/clipboard';
import CouponModal from '../Dating/components/CouponModal';

const Home: FC = () => {
    const [visible, setVisible] = useState(false);
    const { csBot } = useRecoilValue(selectorDict);
    const { mutateAsync: mutateMyCoupons, data } = useMutation(getMyCoupons);
    const { mutateAsync: mutateUserInfo, data: userInfo } =
        useMutation(getUserInfo);
    useEffect(() => {
        mutateUserInfo();
        mutateMyCoupons();
    }, [mutateMyCoupons, mutateUserInfo]);
    return (
        <div className="my">
            {visible && (
                <CouponModal
                    visible={visible}
                    isShowBtn={false}
                    onCancel={() => setVisible(false)}
                    couponList={data?.data}
                />
            )}
            <header className="header">
                <span>我的</span>
                <img src={require('@/assets/images/home/my-logo.jpg')} />
            </header>
            <div className="asset relative">
                <p className="title">帳號資訊</p>
                <div className="detail">
                    <p>登入帳號:&nbsp;{userInfo?.data.username}</p>
                    <p>啟用設定:&nbsp;{userInfo?.data.activationCode}</p>
                    <p>會員等級:&nbsp;{userInfo?.data.customerLevel}</p>
                </div>
                <Button className="w-[60px]  absolute right-[16px] top-[50px]">
                    <a href={csBot}>客服</a>
                </Button>
            </div>
            <div className="boon">
                <span>會員福利</span>
                <span className="show-more" onClick={() => setVisible(true)}>
                    查看優惠券
                </span>
            </div>
            <div className="content">
                <div className="line-1">推廣福利</div>
                <div className="line-2">
                    平台推出推廣福利，每位會員可以複製邀請連結並發送好友加入俱樂部，新增會員將獲得1000P優惠券，且新增會員第一次消費成功後，推廣會員將獲得價值2000P優惠券
                </div>
                <div className="line-3">
                    本平台為私人俱樂部，不對外開放註冊，均為邀請制，會員資格有限，請珍惜名額
                </div>
                <div className="line-4">
                    {userInfo?.data.subActivationCode.map((item, index) => {
                        return (
                            <p key={index}>
                                <span>
                                    名额{index + 1}:
                                    {item.username ? item.username : '未注册'}
                                </span>
                                <span
                                    onClick={(e) =>
                                        handleClipboard(
                                            item.invitationCopyContent,
                                            e,
                                        )
                                    }
                                >
                                    複製註冊連接
                                </span>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
