import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
  { courseId: 1, courseName: 'Son lì Luxury Matte Red', progress: 50 },
  { courseId: 2, courseName: 'Serum dưỡng trắng LumiSkin', progress: 75 },
  { courseId: 3, courseName: 'Kem chống nắng DailyShield', progress: 60 },
  { courseId: 4, courseName: 'Toner dịu nhẹ PureCare', progress: 80 },
  { courseId: 5, courseName: 'Mặt nạ đất sét GreenTea', progress: 90 },
  { courseId: 6, courseName: 'Sữa rửa mặt Herbal Clean', progress: 70 },
  { courseId: 7, courseName: 'Kem dưỡng ẩm DeepHydra', progress: 85 },
  { courseId: 8, courseName: 'Phấn phủ Silky Powder', progress: 65 },
  { courseId: 9, courseName: 'Sữa tắm Relax Lavender', progress: 55 },
  { courseId: 10, courseName: 'Dầu gội Organic HairCare', progress: 45 },
  { courseId: 11, courseName: 'Tinh chất trị mụn AcneX', progress: 75 },
  { courseId: 12, courseName: 'Nước hoa mini Passion Bloom', progress: 80 },
  { courseId: 13, courseName: 'Kem nền Natural Glow', progress: 70 },
  { courseId: 14, courseName: 'Son dưỡng LipCare Pinky', progress: 60 },
  { courseId: 15, courseName: 'Sáp khử mùi FreshFeel', progress: 50 },
  { courseId: 16, courseName: 'Tẩy tế bào chết BodyScrub Coffee', progress: 40 }
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
                    Tỉ lệ sản phẩm đã bán (%): {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function HBarChart_CourseprogressPercentage() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Top sản phẩm bán chạy nhất trong 3 tháng qua</Text>
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
                yAxisLabel="Danh sách sản phẩm"
                xAxisLabel=" Tỉ lệ sản phẩm đã bán (%)"
            />
        </Group>
    );
}