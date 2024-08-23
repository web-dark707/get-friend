import React, { useState } from 'react';
import Checkbox from '@/components/Checkbox';

interface Props {
    filterList: string[];
    onChange: (key, value) => void;
}
const SlotFilter = (props: Props) => {
    const { filterList, onChange } = props;
    const [active, setActive] = useState();
    const handleChecked = (key, bool) => {
        if (bool) {
            setActive(key);
            onChange('timeslot', key);
        } else if (key === active && !bool) {
            setActive(undefined);
            onChange('timeslot', undefined);
        }
    };
    return (
        <div className="flex justify-start content-center">
            {filterList.length > 0
                ? filterList.map((it) => (
                      <Checkbox
                          className="mr-[12px]"
                          key={it}
                          value={it}
                          onChange={handleChecked}
                          checked={active === it}
                          label={it}
                      />
                  ))
                : '暫無檔期'}
        </div>
    );
};

export default SlotFilter;
