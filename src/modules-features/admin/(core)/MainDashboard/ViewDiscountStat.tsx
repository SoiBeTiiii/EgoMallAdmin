'use client'
import { Center, Progress, Space, Text } from "@mantine/core";

// const data_singleDiscountCode = {
//     total: 500,
//     used: 453,
// }

export default function ViewDiscountStat() {
    return (
        <>
            <PieChart_DiscountUsedPercentage />
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
    { name: 'DSC01', value: 54, color: getRandomColor(1) },
    { name: 'DSC02', value: 32, color: getRandomColor(2) },
    { name: 'DSC03', value: 5, color: getRandomColor(3) },
    { name: 'DSC04', value: 20, color: getRandomColor(4) },
    { name: 'DSC05', value: 12, color: getRandomColor(5) },
    { name: 'DSC06', value: 45, color: getRandomColor(6) },
    { name: 'DSC07', value: 23, color: getRandomColor(7) },
    { name: 'DSC08', value: 34, color: getRandomColor(8) },
    { name: 'DSC09', value: 29, color: getRandomColor(9) },
    { name: 'DSC10', value: 18, color: getRandomColor(10) },
    { name: 'DSC11', value: 37, color: getRandomColor(11) },
    { name: 'DSC12', value: 22, color: getRandomColor(12) },
    { name: 'DSC13', value: 41, color: getRandomColor(13) },
    { name: 'DSC14', value: 27, color: getRandomColor(14) },
    { name: 'DSC15', value: 33, color: getRandomColor(15) },
    { name: 'DSC16', value: 19, color: getRandomColor(16) },
    { name: 'DSC17', value: 25, color: getRandomColor(17) },
    { name: 'DSC18', value: 30, color: getRandomColor(18) },
    { name: 'DSC19', value: 21, color: getRandomColor(19) },
    { name: 'DSC20', value: 26, color: getRandomColor(20) }
];

interface IUsedDiscountCode {
    code: string;
    name: string;
    total: number
    used: number;
    color: string;
}

const mockData = [
    {
        code: 'DSC01',
        name: 'Discount Code 1',
        total: 100,
        used: 54,
        color: getRandomColor(1)
    },
    {
        code: 'DSC02',
        name: 'Discount Code 2',
        total: 150,
        used: 32,
        color: getRandomColor(2)
    },
    {
        code: 'DSC03',
        name: 'Discount Code 3',
        total: 10,
        used: 5,
        color: getRandomColor(3)
    },
    {
        code: 'DSC04',
        name: 'Discount Code 4',
        total: 100,
        used: 20,
        color: getRandomColor(4)
    },
    {
        code: 'DSC05',
        name: 'Discount Code 5',
        total: 100,
        used: 12,
        color: getRandomColor(5)
    },
    {
        code: 'DSC06',
        name: 'Discount Code 6',
        total: 100,
        used: 45,
        color: getRandomColor(6)
    },
    {
        code: 'DSC07',
        name: 'Discount Code 7',
        total: 100,
        used: 23,
        color: getRandomColor(7)
    },
    {
        code: 'DSC08',
        name: 'Discount Code 8',
        total: 100,
        used: 34,
        color: getRandomColor(8)
    },
    {
        code: 'DSC09',
        name: 'Discount Code 9',
        total: 100,
        used: 29,
        color: getRandomColor(9)
    },
    {
        code: 'DSC10',
        name: 'Discount Code 10',
        total: 100,
        used: 18,
        color: getRandomColor(10)
    },
    {
        code: 'DSC11',
        name: 'Discount Code 11',
        total: 100,
        used: 37,
        color: getRandomColor(11)
    },
    {
        code: 'DSC12',
        name: 'Discount Code 12',
        total: 100,
        used: 22,
        color: getRandomColor(12)
    },
    {
        code: 'DSC13',
        name: 'Discount Code 13',
        total: 100,
        used: 41,
        color: getRandomColor(13)
    },
    {
        code: 'DSC14',
        name: 'Discount Code 14',
        total: 100,
        used: 27,
        color: getRandomColor(14)
    },
    {
        code: 'DSC15',
        name: 'Discount Code 15',
        total: 100,
        used: 33,
        color: getRandomColor(15)
    },
    {
        code: 'DSC16',
        name: 'Discount Code 16',
        total: 100,
        used: 19,
        color: getRandomColor(16)
    },
    {
        code: 'DSC17',
        name: 'Discount Code 17',
        total: 100,
        used: 25,
        color: getRandomColor(17)
    },
    {
        code: 'DSC18',
        name: 'Discount Code 18',
        total: 100,
        used: 30,
        color: getRandomColor(18)
    },
    {
        code: 'DSC19',
        name: 'Discount Code 19',
        total: 100,
        used: 21,
        color: getRandomColor(19)
    },
    {
        code: 'DSC20',
        name: 'Discount Code 20',
        total: 100,
        used: 26,
        color: getRandomColor(20)
    }
]

export function PieChart_DiscountUsedPercentage() {

    const totalDisountCode = mockData.reduce((acc, cur) => acc + cur.used, 0);

    const columns = useMemo<MRT_ColumnDef<IUsedDiscountCode>[]>(
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
                                <Text>{((originalRow.used / totalDisountCode) * 100).toFixed(0)}%</Text>
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
                <Text mb={"20"}>Biểu đồ phần trăm sử dụng mã khuyến mãi trong 60 ngày qua</Text>
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

