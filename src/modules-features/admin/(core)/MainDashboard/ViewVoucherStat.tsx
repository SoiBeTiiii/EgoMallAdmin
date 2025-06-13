'use client'
import { Center, Progress, Space, Text } from "@mantine/core";

// const data_singleDiscountCode = {
//     total: 500,
//     used: 453,
// }

export default function ViewDiscountStat() {
    return (
        <>
            <PieChart_VoucherUsedPercentage />
            {/* <Divider />
            <Group w={"100%"} align="end">
                <TextInput
                    flex={1}
                    label="Tìm mã giảm giá"
                    placeholder="Nhập mã giảm giá"
                />
                <Button>
                    Tìm kiếm
                </Button>
            </Group>
            <Space mt={32} />
            <Center>
                <Text>Đã sử dụng: <strong>{data_singleDiscountCode.used} / {data_singleDiscountCode.total}</strong> - ({((data_singleDiscountCode.used / data_singleDiscountCode.total) * 100).toFixed(2)}%)</Text>
            </Center>
            <Progress color="yellow" radius="xs" size="lg" value={(data_singleDiscountCode.used / data_singleDiscountCode.total) * 100} /> */}
        </>
    )
}


import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { PieChart } from '@mantine/charts';
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

const data_used_discountCode = [
    { name: 'VOU01', value: 124, color: getRandomColor(1) },
    { name: 'VOU02', value: 34, color: getRandomColor(2) },
    { name: 'VOU03', value: 23, color: getRandomColor(3) },
    { name: 'VOU04', value: 34, color: getRandomColor(4) },
    { name: 'VOU05', value: 46, color: getRandomColor(5) },
    { name: 'VOU06', value: 123, color: getRandomColor(6) },
    { name: 'VOU07', value: 87, color: getRandomColor(7) },
    { name: 'VOU08', value: 25, color: getRandomColor(8) },
    { name: 'VOU09', value: 34, color: getRandomColor(9) },
    { name: 'VOU10', value: 67, color: getRandomColor(10) },
    { name: 'VOU11', value: 23, color: getRandomColor(11) },
    { name: 'VOU12', value: 98, color: getRandomColor(12) },
    { name: 'VOU13', value: 54, color: getRandomColor(13) },
    { name: 'VOU14', value: 27, color: getRandomColor(14) },
    { name: 'VOU15', value: 3, color: getRandomColor(15) },
    { name: 'VOU16', value: 56, color: getRandomColor(16) },
    { name: 'VOU17', value: 85, color: getRandomColor(17) },
    { name: 'VOU18', value: 45, color: getRandomColor(18) },
    { name: 'VOU19', value: 64, color: getRandomColor(19) },
    { name: 'VOU20', value: 12, color: getRandomColor(20) }
];

interface IUsedVoucherCode {
    code: string;
    name: string;
    total: number
    used: number;
    color: string;
}

const mockData = [
    {
        code: 'VOU01',
        name: 'Voucher Code 1',
        total: 150,
        used: 124,
        color: getRandomColor(1)
    },
    {
        code: 'VOU02',
        name: 'Voucher Code 2',
        total: 150,
        used: 34,
        color: getRandomColor(2)
    },
    {
        code: 'VOU03',
        name: 'Voucher Code 3',
        total: 50,
        used: 23,
        color: getRandomColor(3)
    },
    {
        code: 'VOU04',
        name: 'Voucher Code 4',
        total: 100,
        used: 34,
        color: getRandomColor(4)
    },
    {
        code: 'VOU05',
        name: 'Voucher Code 5',
        total: 100,
        used: 46,
        color: getRandomColor(5)
    },
    {
        code: 'VOU06',
        name: 'Voucher Code 6',
        total: 130,
        used: 123,
        color: getRandomColor(6)
    },
    {
        code: 'VOU07',
        name: 'Voucher Code 7',
        total: 100,
        used: 87,
        color: getRandomColor(7)
    },
    {
        code: 'VOU08',
        name: 'Voucher Code 8',
        total: 100,
        used: 25,
        color: getRandomColor(8)
    },
    {
        code: 'VOU09',
        name: 'Voucher Code 9',
        total: 100,
        used: 34,
        color: getRandomColor(9)
    },
    {
        code: 'VOU10',
        name: 'Voucher Code 10',
        total: 100,
        used: 67,
        color: getRandomColor(10)
    },
    {
        code: 'VOU11',
        name: 'Voucher Code 11',
        total: 100,
        used: 23,
        color: getRandomColor(11)
    },
    {
        code: 'VOU12',
        name: 'Voucher Code 12',
        total: 100,
        used: 98,
        color: getRandomColor(12)
    },
    {
        code: 'VOU13',
        name: 'Voucher Code 13',
        total: 100,
        used: 54,
        color: getRandomColor(13)
    },
    {
        code: 'VOU14',
        name: 'Voucher Code 14',
        total: 100,
        used: 27,
        color: getRandomColor(14)
    },
    {
        code: 'VOU15',
        name: 'Voucher Code 15',
        total: 100,
        used: 3,
        color: getRandomColor(15)
    },
    {
        code: 'VOU16',
        name: 'Voucher Code 16',
        total: 100,
        used: 56,
        color: getRandomColor(16)
    },
    {
        code: 'VOU17',
        name: 'Voucher Code 17',
        total: 100,
        used: 85,
        color: getRandomColor(17)
    },
    {
        code: 'VOU18',
        name: 'Voucher Code 18',
        total: 100,
        used: 45,
        color: getRandomColor(18)
    },
    {
        code: 'VOU19',
        name: 'Voucher Code 19',
        total: 100,
        used: 64,
        color: getRandomColor(19)
    },
    {
        code: 'VOU20',
        name: 'Voucher Code 20',
        total: 100,
        used: 12,
        color: getRandomColor(20)
    }
]

export function PieChart_VoucherUsedPercentage() {

    const totalVoucherCode = mockData.reduce((acc, cur) => acc + cur.used, 0);

    const columns = useMemo<MRT_ColumnDef<IUsedVoucherCode>[]>(
        () => [
            {
                header: "Màu",
                accessorKey: "color",
                accessorFn(originalRow) {
                    return (
                        <div style={{ width: 20, height: 20, backgroundColor: originalRow.color }} />
                    )
                },
                minSize: 30,
                maxSize: 30
            },
            {
                header: "Mã",
                accessorKey: "code",
                minSize: 20,
                maxSize: 20

            },
            {
                header: "%",
                accessorKey: "used",
                accessorFn(originalRow) {
                    return (
                        <>
                            <Center>
                                <Text>{((originalRow.used / totalVoucherCode) * 100).toFixed(0)}%</Text>
                            </Center>
                        </>
                    )
                },
                minSize: 64,
                maxSize: 64
            },
            {
                header: "Số lượng sử dụng",
                accessorKey: "value",
                accessorFn(originalRow) {
                    return originalRow.used;
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <Text>Đã sử dụng: <strong>{row.original.used} / {row.original.total}</strong> - ({((row.original.used / row.original.total) * 100).toFixed(2)}%)</Text>
                            </Center>
                            <Progress color="yellow" radius="xs" size="lg" value={(row.original.used / row.original.total) * 100} />
                        </>
                    )
                },
                minSize: 50,
                maxSize: 50
            }
        ],
        []
    );

    return (
        <>
            <MyFlexColumn>
                <Text mb={"20"}>Biểu đồ phần trăm sử dụng mã giảm giá học viên trong 60 ngày qua</Text>
                <Center>
                    <PieChart
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        withLabelsLine
                        labelsPosition="outside"
                        withLabels
                        labelsType="percent"
                        data={data_used_discountCode}
                    />
                </Center>
                <Space mt={5} />
                <MyDataTable
                    data={mockData}
                    columns={columns}
                    initialState={{
                        density: "xs",
                        pagination: { pageIndex: 0, pageSize: 5 },
                    }}
                />
            </MyFlexColumn>
        </>
    )
}

