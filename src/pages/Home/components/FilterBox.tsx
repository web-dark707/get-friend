import React, { useEffect, useState } from 'react';
import { isEqual, sortBy, uniq } from 'lodash';
import Checkbox from '@/components/Checkbox';
import { CheckboxValue } from '@/types/vip-ui/check';

interface Option {
    label: string;
    value: CheckboxValue;
}
const FilterBox = () => {
    const [checkedMap, setCheckedMap] = useState({});
    const handleChange = (key, values) => {
        const temp = {
            ...checkedMap,
            [key]: values,
        };
        setCheckedMap(temp);
    };

    const filter = [
        {
            value: 'job',
            label: '职业',
            options: [
                { value: 1, label: '学生' },
                { value: 2, label: '老师' },
            ],
        },
        {
            value: 'age',
            label: '年龄',
            options: [
                { value: 1, label: '12' },
                { value: 2, label: '10' },
            ],
        },
    ];

    // 初始化选中
    useEffect(() => {
        console.log(checkedMap);
    }, [checkedMap]);
    return (
        <div className="">
            {filter.map((item) => (
                <FilterItem
                    {...item}
                    key={item.value}
                    checkedList={checkedMap?.[item.value]}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
};

const FilterItem = (props: {
    label: string;
    value: CheckboxValue;
    options: Option[];
    onChange: (key: CheckboxValue, values: CheckboxValue[]) => void;
    checkedList: CheckboxValue[];
}) => {
    const { value: key, label, options, onChange, checkedList = [] } = props;
    const handleItemChange = (value, bool) => {
        if (bool) {
            onChange(key, uniq([...checkedList, value]));
        } else {
            onChange(
                key,
                checkedList.filter((it) => it !== value),
            );
        }
    };
    const handleAllChange = (key, bool) => {
        //选中全部
        if (bool) {
            onChange(
                key,
                options.map((it) => it.value),
            );
        } else {
            onChange(key, []);
        }
    };
    return (
        <div>
            <div className="flex items-center bg-[#F7D3D8] px-[14px] py-[8px]">
                <span className="text-[14px] text-[#CB5A96] mr-[8px]">
                    {label}
                </span>
                <Checkbox
                    value={key}
                    label={'全选'}
                    checked={isEqual(
                        sortBy(checkedList),
                        sortBy(options.map((it) => it.value)),
                    )}
                    onChange={handleAllChange}
                />
            </div>
            <div className="flex  px-[14px] py-[8px]">
                {options.map((it) => (
                    <Checkbox
                        className="mr-[8px]"
                        value={it.value}
                        label={it.label}
                        key={it.value}
                        checked={checkedList.includes(it.value)}
                        onChange={handleItemChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilterBox;
