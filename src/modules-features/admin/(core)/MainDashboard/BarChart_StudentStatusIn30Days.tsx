"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { student_status: 'Chưa xếp lớp', amount: 94, color: 'orange.6' },
    { student_status: 'Đang học', amount: 154, color: 'blue.6' },
    { student_status: 'Tạm dừng', amount: 32, color: 'yellow.6' },
    { student_status: 'Hoàn thành', amount: 120, color: 'green.6' },
    { student_status: 'Bỏ học', amount: 5, color: '#96172e' }
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


export default function BarChart_StudentStatusIn30Days() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ trạng thái học viên trong 30 ngày qua</Text>
                <BarChart
                    h={200}
                    w={"90%"}
                    data={data}
                    dataKey="student_status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Tổng số học viên"
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
            </Group>
        </>
    );
}
