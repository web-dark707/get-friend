import React from 'react';
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
    // onChange: (obj: { [key: string]: string[] }) => void;
}
const BasicServicesFilter = (props: Props) => {
    const { filterList } = props;
    return (
        <div>
            {filterList.map((it) => (
                <Checkbox
                    key={it.id}
                    value={it.id}
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
