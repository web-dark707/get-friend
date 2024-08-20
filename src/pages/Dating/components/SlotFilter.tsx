import React, { useState } from 'react';
import Checkbox from '@/components/Checkbox';

interface Props {
    filterList: string[];
    // onChange: (obj: { [key: string]: string[] }) => void;
}
const SlotFilter = (props: Props) => {
    const { filterList } = props;
    const [active, setActive] = useState();
    const handleChecked = (key, bool) => {
        if (bool) {
            setActive(key);
        } else if (key === active && !bool) {
            setActive(undefined);
        }
    };
    return (
        <div className="flex justify-start content-center">
            {filterList.map((it) => (
                <Checkbox
                    className="mr-[12px]"
                    key={it}
                    value={it}
                    onChange={handleChecked}
                    checked={active === it}
                    label={it}
                />
            ))}
        </div>
    );
};

export default SlotFilter;
