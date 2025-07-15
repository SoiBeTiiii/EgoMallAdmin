"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
// import { BarChart } from "recharts";

const data = [
    { course_status: 'Còn hàng', amount: 120, color: 'blue.6' },
    { course_status: 'Sắp hết hàng', amount: 50, color: 'green.6' },
    { course_status: 'Hết hàng', amount: 32, color: 'red.6' }
];
interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

// interface DataItem {
//     name: string;
//     value: number;
// }

// const data2: DataItem[] = [
//     { name: "Page A", value: 400 },
//     { name: "Page B", value: 300 },
//     { name: "Page C", value: 300 },
//     { name: "Page D", value: 200 },
// ];

export default function BarChart_CourseStatus() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Chuyển thành trạng thái sản phẩm</Text>
                <BarChart
                    h={200}
                    w={"90%"}
                    data={data}
                    dataKey="course_status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
                    yAxisProps={{ width: 64 }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />

                {/* <BarChart width={600} height={300} data={data2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={"#2298ec"} color='black'>
                        <LabelList dataKey="value" fill="white" position="inside" />
                    </Bar>
                </BarChart> */}
            </Group>
        </>
    );
}
