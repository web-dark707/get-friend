import React, { FC, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import Big from 'big.js';
import { useNavigate } from 'react-router';
import { getQueryString, processUSDTAddress } from '@/utils/tools';
import { getRecordDetail, recordDisputeLog } from '@/api/record';
import Datalist from '@/components/DataList';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/vip-ui';
import { handleClipboard } from '@/utils/clipboard';
import { selectorDict } from '@/store/common/selectors';
import { StatusType } from '@/enums/record';
import ComplainModal from './components/ComplainModal';
import './styles.scss';

const Home: FC = () => {
    const { depositMoney } = useRecoilValue(selectorDict);
    const navigate = useNavigate();
    const id = getQueryString('id');
    const {
        mutateAsync: mutateRecordDetail,
        data,
        isLoading,
    } = useMutation(getRecordDetail);
    const { mutateAsync: mutateRecordDisputeLog, data: disputeLog } =
        useMutation(recordDisputeLog);

    const renderDetail = () => {
        switch (data?.data.status) {
            case StatusType.WAIT_RECEIVE_DEPOSIT_MONEY:
                return (
                    <>
                        <p>USDT trc20</p>
                        <div className="whitespace-pre flex justify-between items-center">
                            <span>
                                地址:&nbsp;
                                {processUSDTAddress(data?.data.usdtAddress)}
                            </span>
                            <Button
                                width="w-[80px]"
                                onClick={(e) =>
                                    handleClipboard(data?.data.usdtAddress, e)
                                }
                            >
                                複製地址
                            </Button>
                        </div>

                        <p className="mt-[8px]">
                            實際支付：{data?.data.usdtPrice}&nbsp;U
                        </p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>支付狀態：請10分鐘內支付訂金鎖定檔期</p>
                        <div className="flex justify-between items-center">
                            <div className="text-[18px] font-bold text-error">
                                定金：{depositMoney}U
                            </div>
                            <Button
                                width="w-[100px]"
                                onClick={(e) =>
                                    handleClipboard(String(depositMoney), e)
                                }
                            >
                                複製訂金金額
                            </Button>
                        </div>
                    </>
                );
            case StatusType.WAIT_PLATFORM_ACK:
                return (
                    <>
                        <p>USDT trc20</p>
                        <p>
                            地址:&nbsp;
                            {processUSDTAddress(data?.data.usdtAddress)}
                        </p>
                        <p className="mt-[8px]">
                            實際支付：{data?.data.usdtPrice}&nbsp;U
                        </p>
                        <p>
                            尾款支付：
                            {new Big(data?.data.usdtPrice)
                                .minus(data?.data.depositMoneyUsdt)
                                .toNumber()}
                            &nbsp;U
                        </p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>支付狀態：已支付訂金10U，待鎖定檔期</p>
                        <p>
                            訂金到款時間:
                            {data?.data.receiveDepositTime}
                        </p>
                    </>
                );
            case StatusType.WAIT_PAY:
                return (
                    <>
                        <p>USDT trc20</p>
                        <div className="whitespace-pre flex justify-between items-center">
                            <span>
                                地址:&nbsp;
                                {processUSDTAddress(data?.data.usdtAddress)}
                            </span>
                            <Button
                                width="w-[80px]"
                                onClick={(e) =>
                                    handleClipboard(data?.data.usdtAddress, e)
                                }
                            >
                                複製地址
                            </Button>
                        </div>
                        <p className="mt-[8px]">
                            實際支付：{data?.data.usdtPrice}&nbsp;U
                        </p>
                        <p>
                            尾款支付：
                            {new Big(data?.data.usdtPrice)
                                .minus(data?.data.depositMoneyUsdt)
                                .toNumber()}
                            &nbsp;U
                        </p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>
                            支付狀態：已支付訂金{data?.data.depositMoneyUsdt}
                            &nbsp;U，待付尾款
                        </p>
                        <p>
                            訂金到款時間:
                            {data?.data.receiveDepositTime}
                        </p>
                        <div className="flex justify-end">
                            <Button
                                width="w-[100px]"
                                onClick={(e) =>
                                    handleClipboard(
                                        new Big(data?.data.usdtPrice)
                                            .minus(data?.data.depositMoneyUsdt)
                                            .toString(),
                                        e,
                                    )
                                }
                            >
                                複製尾款金額
                            </Button>
                        </div>
                    </>
                );
            case StatusType.FINISH:
                return (
                    <>
                        <p>USDT trc20</p>
                        <div className="whitespace-pre flex justify-between items-center">
                            <span>
                                地址:&nbsp;
                                {processUSDTAddress(data?.data.usdtAddress)}
                            </span>
                            <Button
                                width="w-[80px]"
                                onClick={(e) =>
                                    handleClipboard(data?.data.usdtAddress, e)
                                }
                            >
                                複製地址
                            </Button>
                        </div>
                        <p className="mt-[8px]">
                            實際支付：{data?.data.usdtPrice}&nbsp;U
                        </p>
                        <p>
                            尾款支付：
                            {new Big(data?.data.usdtPrice)
                                .minus(data?.data.depositMoneyUsdt)
                                .toNumber()}
                            &nbsp;U
                        </p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>
                            支付狀態：已支付訂金{data?.data.depositMoneyUsdt}
                            &nbsp;U，尾款
                            {new Big(data?.data.usdtPrice)
                                .minus(data?.data.depositMoneyUsdt)
                                .toNumber()}
                            &nbsp;U
                        </p>
                        <p>
                            訂金到款時間:
                            {data?.data.receiveDepositTime}
                        </p>
                        <p>
                            尾款到款時間:
                            {data?.data.paidTime}
                        </p>
                    </>
                );
            case StatusType.NO_TIMESLOT:
                return (
                    <>
                        <p>USDT trc20</p>
                        <p>
                            地址:&nbsp;
                            {processUSDTAddress(data?.data.usdtAddress)}
                        </p>
                        <p className="mt-[8px]">
                            實際支付：{data?.data.usdtPrice}&nbsp;U
                        </p>
                        <p>
                            尾款支付：
                            {new Big(data?.data.usdtPrice)
                                .minus(data?.data.depositMoneyUsdt)
                                .toNumber()}
                            &nbsp;U
                        </p>
                        <p>即時匯率: {data?.data.usdtToPhpRate}</p>
                        <p>
                            支付狀態：已支付訂金{data?.data.depositMoneyUsdt}
                            &nbsp;U, 檔期衝突
                        </p>
                        <p>
                            訂金到款時間:
                            {data?.data.receiveDepositTime}
                        </p>
                        <div className="text-error mt-[16px]">
                            {data?.data.depositMoneyUsdt}
                            &nbsp;U 訂金已返還為待值優惠券，請查收
                        </div>
                    </>
                );
            default:
                return <></>;
        }
    };

    const getRecordDisputeLog = useCallback(() => {
        mutateRecordDisputeLog({
            datingRecordId: id,
        });
    }, [id, mutateRecordDisputeLog]);

    useEffect(() => {
        mutateRecordDetail({ datingId: id });
    }, [id, mutateRecordDetail]);

    useEffect(() => {
        getRecordDisputeLog();
    }, [getRecordDisputeLog]);

    return (
        <Datalist isLoading={isLoading} noData={!data?.data}>
            <div className="my min-h-[100vh] relative pb-[80px]">
                <NavBar
                    title="約會記錄詳情"
                    onLeftClick={() => {
                        navigate(`/record`);
                    }}
                />
                <div className="bg-[#521933] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                    約會內容
                </div>
                <div className="px-[12px] py-[8px] relative">
                    <div>女生：{data?.data.girlName}</div>
                    <div>
                        基本服務：
                        {data?.data?.serviceItems.map((it, i) => (
                            <span key={i}>{it.name}</span>
                        ))}
                    </div>
                    <div>
                        日期：{data?.data.timeslot} 時間:{data?.data?.hour}
                    </div>
                </div>
                <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                    聯絡方式
                </div>
                <div className="px-[12px] py-[8px] relative">
                    <div>手機:{data?.data?.tel}</div>
                    <div>tg:{data?.data?.tg}</div>
                    <div>地址:{data?.data?.address}</div>
                </div>
                <div className="asset">
                    <p className="title">支付訊息</p>
                    <div className="detail">
                        <p>優惠價:{data?.data.totalPromotionPrice}P</p>
                        {data?.data.discountPrice && (
                            <p>優惠券:{data?.data.discountPrice}P</p>
                        )}
                        <p>應付款項: {data?.data.realPayPrice}P</p>
                    </div>
                </div>
                <div className="asset-4">
                    <p className="title mb-[8px]">支付方式</p>
                    <div className="detail">
                        {renderDetail()}
                        {![StatusType.NO_TIMESLOT].includes(
                            data?.data.status,
                        ) && (
                            <article className="mt-[8px]">
                                注意：此地址只接收trc20協議的USDT，充入其它幣種無法到賬，且無法找回，支付金額需等於上面所示實際支付金額，少充無法到賬，多充無法補回，由操作失誤導致的資金問題平台概不付責
                            </article>
                        )}
                    </div>
                </div>
                {data?.data.status === StatusType.FINISH && (
                    <>
                        <div className="boon">
                            <ComplainModal
                                datingRecordId={data?.data.id}
                                reloadData={() => getRecordDisputeLog()}
                            />
                        </div>
                        <div className="remark">
                            <p className="bold">投诉内容</p>
                            {disputeLog?.data
                                .filter((it) => it.disputeOwner !== 'PLATFORM')
                                .map((it) => (
                                    <div key={it.id}>
                                        <p>
                                            投诉时间:
                                            {dayjs(it.createdTime).format(
                                                'YYYY-MM-DD HH:mm:ss',
                                            )}
                                        </p>
                                        <p>{it.content}</p>
                                    </div>
                                ))}
                        </div>
                        <div className="remark">
                            <p className="bold">处理结果</p>
                            {disputeLog?.data.filter(
                                (it) => it.disputeOwner === 'PLATFORM',
                            ).length === 0
                                ? '暂无'
                                : disputeLog?.data
                                      .filter(
                                          (it) =>
                                              it.disputeOwner === 'PLATFORM',
                                      )
                                      .map((it) => (
                                          <div key={it.id}>
                                              <p>
                                                  回复时间:
                                                  {dayjs(it.createdTime).format(
                                                      'YYYY-MM-DD HH:mm:ss',
                                                  )}
                                              </p>
                                              <p>{it.content}</p>
                                          </div>
                                      ))}
                        </div>
                    </>
                )}
                <div className="footer w-full absolute bottom-0 left-0">
                    <img src={require('@/assets/images/home/my-logo.jpg')} />
                </div>
            </div>
        </Datalist>
    );
};

export default Home;
