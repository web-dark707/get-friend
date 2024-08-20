import React from 'react';
import { isEqual, sortBy, uniq } from 'lodash';
import Checkbox from '@/components/Checkbox';
import { CheckboxValue } from '@/types/vip-ui/check';

interface Option {
    label: string;
    value: CheckboxValue;
}
interface Props {
    filtersData: {
        checkboxItems: {
            canSelect: boolean;
            checked: boolean;
            text: string;
            value: string;
        }[];
        text: string;
        value: string;
    }[];
    onChange: (obj: { [key: string]: string[] }) => void;
    checkedMap: { [key: string]: string[] };
}
const FilterBox = (props: Props) => {
    const { filtersData, onChange, checkedMap } = props;
    const handleChange = (key, values) => {
        const temp = {
            ...checkedMap,
            [key]: values,
        };
        onChange(temp);
    };

    return (
        <div className="">
            {filtersData.map((item) => (
                <FilterItem
                    key={item.value}
                    checkedList={checkedMap?.[item.value]}
                    onChange={handleChange}
                    label={item.text}
                    value={item.value}
                    options={item.checkboxItems
                        .filter((it) => it.canSelect)
                        .map((it) => ({ value: it.value, label: it.text }))}
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
                    key={key}
                    value={key}
                    label={'全选'}
                    checked={isEqual(
                        sortBy(checkedList),
                        sortBy(options.map((it) => it.value)),
                    )}
                    onChange={handleAllChange}
                />
            </div>
            <div className="flex justify-between flex-wrap px-[14px] py-[8px]">
                {options.map((it) => (
                    <Checkbox
                        className="mr-[8px] flex-1"
                        value={it.value}
                        label={it.label}
                        key={it.value}
                        checked={checkedList.includes(it.value)}
                        onChange={handleItemChange}
                    />
                ))}
                {Array(options.length % 4)
                    .fill('')
                    .map((_, i) => (
                        <i className="w-1/4" key={i} />
                    ))}
            </div>
        </div>
    );
};

export default FilterBox;
