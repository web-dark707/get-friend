import React from 'react';
import classNames from 'classnames';
import { CheckboxProps } from '@/types/vip-ui/check';

const Checkbox = (props: CheckboxProps) => {
    const { value, checked, label, onChange, className } = props;
    const handleChange = (e) => {
        const { checked } = e.target;
        onChange && onChange(value, checked);
    };
    return (
        <div className={classNames('flex-row-center', className)}>
            <input
                type="checkbox"
                id={label}
                name={label}
                checked={checked}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-primaryColor border-gray-300 rounded"
            />
            <label htmlFor={label} className="text-baseColor">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
