import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';

const data = [
    { month: '06/23', totalStudent: 245 },
    { month: '03/23', totalStudent: 456 },
    { month: '08/23', totalStudent: 343 },
    { month: '09/23', totalStudent: 860 },
    { month: '10/23', totalStudent: 930 },
    { month: '11/23', totalStudent: 790 },
    { month: '12/23', totalStudent: 1060 },
    { month: '01/24', totalStudent: 1700 },
    { month: '02/24', totalStudent: 1350 },
    { month: '03/24', totalStudent: 700 },
    { month: '04/24', totalStudent: 860 },
    { month: '05/24', totalStudent: 930 },
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
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function LineChart_TotalStudentIn12Months() {
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ số lượng học viên 12 tháng qua</Text>
                <LineChart
                    w={"100%"}
                    h={200}
                    data={data}
                    dataKey="month"
                    series={[
                        { name: 'totalStudent', color: 'rgba(64, 65, 135, 1)' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    curveType="linear"
                    yAxisLabel="Tổng số học viên"
                    tickLine="y"
                />
            </Group>
        </>
    );
}