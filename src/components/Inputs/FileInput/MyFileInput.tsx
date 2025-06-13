import { FileInput, FileInputProps } from '@mantine/core'

interface IFileInput extends FileInputProps {
    label?: string
}


export default function MyFileInput({ label, ...rest }: IFileInput) {
    return (
        <FileInput label={label} placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
