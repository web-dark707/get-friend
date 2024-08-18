export type CheckboxValue = string | number;

export interface CheckboxProps {
    checked: boolean;
    value: CheckboxValue;
    label: string;
    onChange?: (value: CheckboxValue, bool: boolean) => void;
    /**
     * 自定义类名
     */
    className?: string;
}
