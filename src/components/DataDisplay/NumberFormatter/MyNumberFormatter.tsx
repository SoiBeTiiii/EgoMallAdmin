import { NumberFormatter, NumberFormatterProps } from '@mantine/core'


interface I extends NumberFormatterProps { }
export default function MyNumberFormatter({ ...rest }: I) {
    return (
        <NumberFormatter thousandSeparator suffix=' VNĐ' {...rest}></NumberFormatter>
    )
}
