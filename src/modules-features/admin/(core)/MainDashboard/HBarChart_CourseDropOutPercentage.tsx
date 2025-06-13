import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { courseId: 1, courseName: 'Introduction to Programming K2024', dropOutPercent: 5 },
    { courseId: 2, courseName: 'Data Structures K2024', dropOutPercent: 0 },
    { courseId: 3, courseName: 'Algorithms K2023', dropOutPercent: 0 },
    { courseId: 4, courseName: 'Operating Systems K2024', dropOutPercent: 0 },
    { courseId: 5, courseName: 'Databases K2023', dropOutPercent: 0 },
    { courseId: 6, courseName: 'Computer Networks K2024', dropOutPercent: 2 },
    { courseId: 7, courseName: 'Software Engineering K2024', dropOutPercent: 0 },
    { courseId: 8, courseName: 'Artificial Intelligence K2023', dropOutPercent: 0 },
    { courseId: 9, courseName: 'Machine Learning K2024', dropOutPercent: 0 },
    { courseId: 10, courseName: 'Human-Computer Interaction K2023', dropOutPercent: 45 },
    { courseId: 11, courseName: 'Cybersecurity K2024', dropOutPercent: 30 },
    { courseId: 12, courseName: 'Cloud Computing K2023', dropOutPercent: 1 },
    { courseId: 13, courseName: 'Big Data Analytics K2024', dropOutPercent: 10 },
    { courseId: 14, courseName: 'Internet of Things K2023', dropOutPercent: 0 },
    { courseId: 15, courseName: 'Blockchain Technology K2024', dropOutPercent: 0 },
    { courseId: 16, courseName: 'Quantum Computing K2023', dropOutPercent: 0 }
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
                    Tỉ lệ vắng: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function HBarChart_CourseDropOutPercentage() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi nguy cơ bỏ học</Text>
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
                series={[{ name: 'dropOutPercent', color: 'orange.6', label: 'courseName' }]}
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
                xAxisLabel="Tỉ lệ vắng (%)"
            />
        </Group>
    );
}