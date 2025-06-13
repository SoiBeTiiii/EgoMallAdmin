import { TextInput, TextInputProps } from '@mantine/core';

interface IMyTextInput extends TextInputProps {
    label?: string; defaultValue?: string
}

export default function MyTextInput({ label, defaultValue, ...rest }: IMyTextInput) {
    return (
        <TextInput label={label} defaultValue={defaultValue} placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
