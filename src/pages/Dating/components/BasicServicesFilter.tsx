import React, { useCallback, useState } from 'react';
import { uniq } from 'lodash';
import Checkbox from '@/components/Checkbox';

interface Props {
    filterList: {
        extraInfo: any;
        girlId: string;
        id: string;
        name: string;
        oriPrice: number;
        promotionPrice: number;
    }[];
    onChange: (key, value) => void;
}
const BasicServicesFilter = (props: Props) => {
    const { filterList, onChange } = props;
    const [checkedList, setCheckedList] = useState([]);
    const handleChecked = useCallback(
        (key, bool) => {
            let temp = [];
            if (bool) {
                temp = uniq([...checkedList, key]);
            } else {
                temp = checkedList.filter((it) => it !== key);
            }
            setCheckedList(temp);
            onChange('serviceItemIds', temp);
        },
        [checkedList, onChange],
    );
    return (
        <div>
            {filterList.map((it) => (
                <Checkbox
                    className="flex justify-start"
                    key={it.id}
                    value={it.id}
                    onChange={handleChecked}
                    checked={checkedList.includes(it.id)}
                    label={
                        <div>
                            {it.name} 原價:<s>{it.oriPrice}P </s>活動價:
                            {it.promotionPrice}P
                        </div>
                    }
                />
            ))}
        </div>
    );
};

export default BasicServicesFilter;
