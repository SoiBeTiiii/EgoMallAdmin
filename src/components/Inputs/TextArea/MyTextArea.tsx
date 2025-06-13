import { Textarea, TextareaProps } from '@mantine/core';

interface IMyTextArea extends TextareaProps {
    label?: string
}

export default function MyTextArea({ label, ...rest }: IMyTextArea) {
    return (
        <Textarea label={label} placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
