import React, { useCallback, useState } from 'react';
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
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const handleChecked = useCallback(
        (key: string, bool: boolean) => {
            const temp = bool ? [key] : [];
            setCheckedList(temp);
            onChange('serviceItemIds', temp);
        },
        [onChange],
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
                            {it.name} 原價:&nbsp;<s>{it.oriPrice}P </s>
                            活動價:&nbsp;
                            {it.promotionPrice}P
                        </div>
                    }
                />
            ))}
        </div>
    );
};

export default BasicServicesFilter;
