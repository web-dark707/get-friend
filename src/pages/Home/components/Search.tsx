import React, { useState } from 'react';
import Overlay from '@/components/vip-ui/Overlay';
import FilterBox from './FilterBox';

const Search = () => {
    const [visible, setVisible] = useState(false);
    const filter = [
        {
            value: 'job',
            label: '职业',
            items: [
                { value: 1, label: '学生' },
                { value: 2, label: '老师' },
            ],
        },
    ];
    return (
        <div className="w-full h-[50px] bg-primaryColor">
            <div onClick={() => setVisible(true)}>搜索</div>
            <Overlay visible={visible} onCancel={() => setVisible(false)}>
                <div className="w-[80%] h-[360px] mx-auto bg-[#fff]">
                    <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                        篩選條件
                    </div>
                    <div>
                        <FilterBox />
                    </div>
                </div>
            </Overlay>
        </div>
    );
};

export default Search;
