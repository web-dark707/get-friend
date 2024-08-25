import React, { FC, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Datalist from '@/components/DataList';
import { getRecord } from '@/api/record';
import './styles.scss';
import { formatLabel } from '@/common/format';
import {
    disputeStatus,
    orderStatus,
    paymentStatus,
} from '@/common/options/record';
import NavBar from '@/components/NavBar';
import { Picker } from '@/components/vip-ui';

const Home: FC = () => {
    const navigate = useNavigate();
    const {
        mutateAsync: mutateRecord,
        data: record,
        isLoading,
    } = useMutation(getRecord);

    const handleChange = (val) => {
        mutateRecord({ status: val === 'all' ? undefined : val });
    };
    const orderStatusItems = [
        { value: 'all', label: '所有' },
        ...orderStatus,
    ].map((it) => ({
        ...it,
        children: it.label,
    }));

    useEffect(() => {
        mutateRecord({ status: undefined });
    }, [mutateRecord]);

    return (
        <div className="my">
            <NavBar
                title="約會記錄"
                rightContent={
                    <Picker
                        items={orderStatusItems}
                        onChange={handleChange}
                        triggerClass="right-wrap"
                        pickerValue={'all'}
                    />
                }
            />
            <Datalist
                isLoading={isLoading}
                noData={record?.data?.length === 0}
            ></Datalist>
            <ul className="orders">
                {record?.data.map((item) => {
                    return (
                        <li
                            className="item"
                            key={item.id}
                            onClick={() => navigate('/recordDetail')}
                        >
                            <p>
                                編號:{item.id}
                                <span className="status-1">
                                    {formatLabel(orderStatus, item.status)}
                                </span>
                            </p>
                            <p className="bold">
                                日期:{item.timeslot}
                                <span className="status-2">
                                    {formatLabel(
                                        paymentStatus,
                                        item.paymentStatus,
                                    )}
                                </span>
                            </p>
                            <p className="bold">姓名:{item.girlName}</p>
                            <p className="bold">
                                价格:{item.usdtPrice}U
                                <span className="status-3">
                                    {formatLabel(
                                        disputeStatus,
                                        item.disputeStatus,
                                    )}
                                </span>
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
