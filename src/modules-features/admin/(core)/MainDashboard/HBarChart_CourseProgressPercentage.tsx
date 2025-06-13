import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { courseId: 1, courseName: 'Introduction to Programming K2024', progress: 50 },
    { courseId: 2, courseName: 'Data Structures K2024', progress: 75 },
    { courseId: 3, courseName: 'Algorithms K2023', progress: 60 },
    { courseId: 4, courseName: 'Operating Systems K2024', progress: 80 },
    { courseId: 5, courseName: 'Databases K2023', progress: 90 },
    { courseId: 6, courseName: 'Computer Networks K2024', progress: 70 },
    { courseId: 7, courseName: 'Software Engineering K2024', progress: 85 },
    { courseId: 8, courseName: 'Artificial Intelligence K2023', progress: 65 },
    { courseId: 9, courseName: 'Machine Learning K2024', progress: 55 },
    { courseId: 10, courseName: 'Human-Computer Interaction K2023', progress: 45 },
    { courseId: 11, courseName: 'Cybersecurity K2024', progress: 75 },
    { courseId: 12, courseName: 'Cloud Computing K2023', progress: 80 },
    { courseId: 13, courseName: 'Big Data Analytics K2024', progress: 70 },
    { courseId: 14, courseName: 'Internet of Things K2023', progress: 60 },
    { courseId: 15, courseName: 'Blockchain Technology K2024', progress: 50 },
    { courseId: 16, courseName: 'Quantum Computing K2023', progress: 40 }
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
                <Text key={item.name} c={"black"} fz="sm">
                    Tiến độ: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function HBarChart_CourseProgressPercentage() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi tiến độ giảng dạy của lớp</Text>
            <BarChart
                h={800}
                w={"96%"}
                data={data}
                dataKey="courseName"
                orientation="vertical"
                yAxisProps={{ width: 220 }}
                xAxisProps={{ domain: [0, 100] }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'progress', color: 'blue.6', label: 'courseName' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        // content: ({ value }) => `${value}%`,
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Danh sách lớp"
                xAxisLabel="Tiến độ hoàn thành (%)"
            />
        </Group>
    );
}