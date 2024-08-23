import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Overlay from '@/components/vip-ui/Overlay';
import { Button } from '@/components/vip-ui';
import { DatingGirlsResult } from '@/types/api/home';
import { selectorDict } from '@/store/common/selectors';
import FilterBox from './FilterBox';
interface Props {
    onSelected: (obj: { [key: string]: string[] }) => void;
    isShowDetails: boolean;
    girlData: DatingGirlsResult;
}

const Header = (props: Props) => {
    const { onSelected, isShowDetails, girlData } = props;
    const { filterCondition } = useRecoilValue(selectorDict);
    const [visible, setVisible] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedMap, setCheckedMap] = useState({});
    const handleChange = (obj) => {
        setCheckedMap(obj);
    };
    const handleSearch = () => {
        onSelected(checkedMap);
        setVisible(false);
    };
    const handleAllSelected = () => {
        const temp = {};
        for (let i = 0; i < filterCondition?.conditionItems?.length; i++) {
            const element = filterCondition?.conditionItems[i];
            temp[element.value] = element.checkboxItems
                .map((it) => {
                    if (it.canSelect) return it.value;
                })
                .filter((it) => it);
        }
        setCheckedMap(temp);
        setIsAllChecked(true);
    };

    const handleCancelAllSelected = () => {
        const temp = {};
        for (let i = 0; i < filterCondition?.conditionItems?.length; i++) {
            const element = filterCondition?.conditionItems[i];
            temp[element.value] = element.checkboxItems
                .map((it) => {
                    if (it.checked) {
                        return it.value;
                    }
                })
                .filter((it) => it);
        }
        setCheckedMap(temp);
        setIsAllChecked(false);
    };
    // 初始化选中
    useEffect(() => {
        const temp = {};
        for (let i = 0; i < filterCondition?.conditionItems?.length; i++) {
            const element = filterCondition?.conditionItems[i];
            temp[element.value] = element.checkboxItems
                .map((it) => {
                    if (it.checked) {
                        return it.value;
                    }
                })
                .filter((it) => it);
        }
        setCheckedMap(temp);
    }, [filterCondition?.conditionItems]);
    return (
        <div className="w-full h-[50px] bg-primaryColor">
            {isShowDetails ? (
                <div>
                    <span>{girlData.name}</span>
                    <span>{girlData.age}</span>
                </div>
            ) : (
                <>
                    <div
                        className="h-full flex justify-end items-center px-[16px]"
                        onClick={() => setVisible(true)}
                    >
                        <img
                            className="w-[24px]"
                            src={require('@/assets/images/icon/form/search.png')}
                        />
                    </div>
                    <Overlay
                        visible={visible}
                        onCancel={() => setVisible(false)}
                    >
                        <div className="w-[80%] mx-auto bg-[#fff]">
                            <div className="bg-[#FD6298] h-[30px] text-[16px] font-bold leading-[30px] pl-[12px] text-[#fff]">
                                篩選條件
                            </div>
                            <div>
                                <FilterBox
                                    checkedMap={checkedMap}
                                    filtersData={
                                        filterCondition?.conditionItems ?? []
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-end">
                                {isAllChecked ? (
                                    <Button
                                        className="w-[60px] mr-[12px]"
                                        onClick={handleCancelAllSelected}
                                    >
                                        取消全选
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-[60px] mr-[12px]"
                                        onClick={handleAllSelected}
                                    >
                                        全选
                                    </Button>
                                )}
                                <Button
                                    className="w-[60px]"
                                    onClick={handleSearch}
                                >
                                    搜索
                                </Button>
                            </div>
                        </div>
                    </Overlay>
                </>
            )}
        </div>
    );
};

export default Header;
