import { DateInput, DateInputProps } from '@mantine/dates';

interface IDateInput extends DateInputProps {
    label?: string
}

export default function MyDateInput({ label, ...rest }: IDateInput) {
    return (
        <DateInput label={label} placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
