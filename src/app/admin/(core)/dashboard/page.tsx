'use client'
import AQStatCard1 from "@/components/DataDisplay/StatCard/AQStatCard1";
import BarChart_CourseStatus from "@/modules-features/admin/(core)/MainDashboard/BarChart_CourseStatus";
import BarChart_ExamStatus from "@/modules-features/admin/(core)/MainDashboard/BarChart_ExamStatus";
import BarChart_RevenueByAcademicYear from "@/modules-features/admin/(core)/MainDashboard/BarChart_RevenueByAcademicYear";
import BarChart_StudentStatusIn30Days from "@/modules-features/admin/(core)/MainDashboard/BarChart_StudentStatusIn30Days";
import HBarChart_CourseDropOutPercentage from "@/modules-features/admin/(core)/MainDashboard/HBarChart_CourseDropOutPercentage";
import HBarChart_CourseProgressPercentage from "@/modules-features/admin/(core)/MainDashboard/HBarChart_CourseProgressPercentage";
import LineChart_RevenueIn12Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_RevenueIn12Months";
import LineChart_TotalRevenueByDiscountIn3Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_TotalRevenueByDiscountIn3Months";
import LineChart_TotalRevenueByVoucherIn3Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_TotalRevenueByVoucherIn3Months";
import LineChart_TotalStudentIn12Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_TotalStudentIn12Months";
import ViewDiscountStat from "@/modules-features/admin/(core)/MainDashboard/ViewDiscountStat";
import ViewVoucherStat from "@/modules-features/admin/(core)/MainDashboard/ViewVoucherStat";

import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";

export default function Page() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }}>
                <AQStatCard1
                    title={"Doanh thu"} value={'4.653.425'}
                    unit="Triệu VNĐ" description={"So với tháng trước"}
                    icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={34} />
                <AQStatCard1
                    title={"Tổng doanh thu"} value={'152'}
                    description={"So với tháng trước"}
                    icons={<IconBook opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={18} />
                <AQStatCard1
                    title={"Tổng sản phẩm"} value={'36'}
                    description={"So với tháng trước"}
                    icons={<IconClipboardCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={60} />
                <AQStatCard1
                    title={"Tổng số khách hàng"} value={'3.042'}
                    description={"So với tháng trước"}
                    icons={<IconUserPlus opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={-30} />
            </SimpleGrid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_CourseStatus />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_ExamStatus />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_RevenueByAcademicYear />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_RevenueIn12Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_StudentStatusIn30Days />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalStudentIn12Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ViewDiscountStat />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalRevenueByDiscountIn3Months />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ViewVoucherStat />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalRevenueByVoucherIn3Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <HBarChart_CourseProgressPercentage />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <HBarChart_CourseDropOutPercentage />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}
