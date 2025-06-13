import { NumberInput, NumberInputProps } from '@mantine/core'

interface INumberInput extends NumberInputProps {
    label?: string
}


export default function MyNumberInput({ label, ...rest }: INumberInput) {
    return (
        <NumberInput label={label} placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
