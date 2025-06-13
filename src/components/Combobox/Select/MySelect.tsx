import { Select, SelectProps } from '@mantine/core';

interface IMySelect extends SelectProps {
    label?: string;
    data: Array<string | { value: string; label: string }>; // Thêm `data` là mảng các lựa chọn
}

export default function MySelect({ label, ...rest }: IMySelect) {
    return (
        <Select label={label} placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""} {...rest} />
    )
}
