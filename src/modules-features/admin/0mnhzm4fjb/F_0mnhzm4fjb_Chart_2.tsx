import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { BarChart } from "@mantine/charts";
import { Fieldset, Text } from "@mantine/core";

export default function F_0mnhzm4fjb_Chart_2() {
    return (
        <Fieldset legend="Tương quan tỷ lệ đo lương kết quả tổng kết CLO và tổng kết học vụ">
            <MyFlexColumn>
                <Text mb={'md'} fw={600} size="lg">TỶ LỆ SV ĐẠT CLO</Text>
                <BarChart
                    h={300}
                    data={data}
                    title="TỶ LỆ SV ĐẠT CLO"
                    dataKey="name"
                    withBarValueLabel
                    withLegend
                    unit="%"
                    // yAxisProps={{
                    //     domain: [0, 120], // Đặt giá trị tối đa của trục y là 120
                    // }}
                    series={[
                        { name: 'Đạt', color: 'green.6' },
                        { name: 'Không đạt', color: 'red.6' },

                    ]}
                    tickLine="y"
                />
            </MyFlexColumn>
        </Fieldset>
    )
}


const data = [
    { name: 'Tổng kết CLO', "Đạt": 85.5, "Không đạt": 14.5 },
    { name: 'Tổng kết học vụ', "Đạt": 87.3, "Không đạt": 12.7 },
];
