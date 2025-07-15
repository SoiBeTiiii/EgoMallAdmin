import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
  { courseId: 1, courseName: 'Son lì Luxury Matte Red', dropOutPercent: 5 },
  { courseId: 2, courseName: 'Serum dưỡng trắng LumiSkin', dropOutPercent: 0 },
  { courseId: 3, courseName: 'Kem chống nắng DailyShield', dropOutPercent: 0 },
  { courseId: 4, courseName: 'Toner dịu nhẹ PureCare', dropOutPercent: 0 },
  { courseId: 5, courseName: 'Mặt nạ đất sét GreenTea', dropOutPercent: 0 },
  { courseId: 6, courseName: 'Sữa rửa mặt Herbal Clean', dropOutPercent: 2 },
  { courseId: 7, courseName: 'Kem dưỡng ẩm DeepHydra', dropOutPercent: 0 },
  { courseId: 8, courseName: 'Phấn phủ Silky Powder', dropOutPercent: 0 },
  { courseId: 9, courseName: 'Sữa tắm Relax Lavender', dropOutPercent: 0 },
  { courseId: 10, courseName: 'Dầu gội Organic HairCare', dropOutPercent: 45 },
  { courseId: 11, courseName: 'Tinh chất trị mụn AcneX', dropOutPercent: 30 },
  { courseId: 12, courseName: 'Nước hoa mini Passion Bloom', dropOutPercent: 1 },
  { courseId: 13, courseName: 'Kem nền Natural Glow', dropOutPercent: 10 },
  { courseId: 14, courseName: 'Son dưỡng LipCare Pinky', dropOutPercent: 0 },
  { courseId: 15, courseName: 'Sáp khử mùi FreshFeel', dropOutPercent: 0 },
  { courseId: 16, courseName: 'Tẩy tế bào chết BodyScrub Coffee', dropOutPercent: 0 }
]
;

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
                    Cảnh báo tồn kho thấp: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function HBarChart_CourseDropOutPercentage() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Danh sách sản phẩm sắp hết hàng</Text>
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
                yAxisLabel="Danh sách sản phẩm"
                xAxisLabel="Cảnh báo tồn kho thấp"
            />
        </Group>
    );
}