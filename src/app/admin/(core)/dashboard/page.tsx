'use client'
import baseAxios from "@/api/baseAxios";
import AQStatCard1 from "@/components/DataDisplay/StatCard/AQStatCard1";
import BarChart_CourseStatus from "@/modules-features/admin/(core)/MainDashboard/BarChart_CourseStatus";
import BarChart_StudentStatusIn30Days from "@/modules-features/admin/(core)/MainDashboard/BarChart_StudentStatusIn30Days";
import HBarChart_CourseDropOutPercentage from "@/modules-features/admin/(core)/MainDashboard/HBarChart_CourseDropOutPercentage";
import HBarChart_CourseProgressPercentage from "@/modules-features/admin/(core)/MainDashboard/HBarChart_CourseProgressPercentage";
import LineChart_RevenueIn12Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_RevenueIn12Months";
import LineChart_TotalRevenueByDiscountIn3Months from "@/modules-features/admin/(core)/MainDashboard/LineChart_TotalRevenueByDiscountIn3Months";

import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function DashboardStatistics() {
  const [statCards, setStatCards] = useState<{
    revenue: number;
    revenueGrowth: number;
    orderTotal: number;
    productTotal: number;
    userTotal: number;
  } | null>(null);


  useEffect(() => {
    const fetchCardStats = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const data = res.data.data;

        setStatCards({
          revenue: data.revenue_statistics[0]?.revenue || 0,
          revenueGrowth: data.revenue_statistics[0]?.growth || 0,
          orderTotal: data.total_order_statistics[0]?.total_order || 0,
          productTotal: data.total_product_statistics[0]?.total_product || 0,
          userTotal: data.total_user_statistics[0]?.total_user || 0,
        });
      } catch (error) {
        console.error("Lỗi khi load thống kê tổng quan:", error);
      }
    };

    fetchCardStats();
  }, []);



  return (
    <>
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }}>
        {statCards ? (
          <>
            <AQStatCard1
              title="Doanh thu"
              value={Number(statCards.revenue).toLocaleString("vi-VN")}
              unit="Triệu VNĐ"
              description="So với tháng trước"
              icons={<IconReportMoney opacity={0.3} style={{ width: "100%", height: "100%" }} stroke={1.5} />}
              diff={statCards.revenueGrowth}
            />
            <AQStatCard1
              title="Tổng đơn hàng"
              value={statCards.orderTotal.toLocaleString("vi-VN")}
              description="So với tháng trước"
              icons={<IconBook opacity={0.3} style={{ width: "100%", height: "100%" }} stroke={1.5} />}
              diff={18} // placeholder nếu chưa có growth
            />
            <AQStatCard1
              title="Tổng sản phẩm"
              value={statCards.productTotal.toLocaleString("vi-VN")}
              description="So với tháng trước"
              icons={<IconClipboardCheck opacity={0.3} style={{ width: "100%", height: "100%" }} stroke={1.5} />}
              diff={60} // placeholder
            />
            <AQStatCard1
              title="Tổng số khách hàng"
              value={statCards.userTotal.toLocaleString("vi-VN")}
              description="So với tháng trước"
              icons={<IconUserPlus opacity={0.3} style={{ width: "100%", height: "100%" }} stroke={1.5} />}
              diff={-30} // placeholder
            />
          </>
        ) : (
          <>Đang tải thống kê...</>
        )}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Paper mt={"md"} p={'24'}>
            <BarChart_CourseStatus />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper mt={"md"} p={'24'}>
            <BarChart_StudentStatusIn30Days />
          </Paper>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper mt="md" p="24">
            <LineChart_TotalRevenueByDiscountIn3Months />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper mt="md" p="24">
            <LineChart_RevenueIn12Months />
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid>
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
      </Grid></>

  )
}
