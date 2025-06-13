'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import MyActionIconUpload from "@/components/ActionIcons/ActionIconUpload/MyActionIconUpload";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";



export interface I_gqilewxvau_Read {
    courseCode?: string; // Course code
    courseName?: string; // Course name
    number?: number; // Number of lessons
    manageUnit?: string; // Managing unit
    viewFile?: string; // File path for viewing
    updateFile?: string; // File path for updating
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_gqilewxvau_Read() {
    const form = useForm<I_gqilewxvau_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_gqilewxvau_Read[]>({
        queryKey: ["F_gqilewxvau_Read"],
        queryFn: async () => data,
    });

 

    const columns = useMemo<MRT_ColumnDef<I_gqilewxvau_Read>[]>(() => [
        { header: "Mã môn học", accessorKey: "courseCode" },
        { header: "Tên môn học", accessorKey: "courseName" },
        { header: "Số tiết", accessorKey: "number" },
        { header: "Đơn vị quản lý", accessorKey: "manageUnit" },
        {
            header: "Xem đề cương",
            accessorKey: "viewFile",
            Cell: () => <MyButtonViewPDF />,
        },
        {
            header: "Cập nhật đề cương",
            accessorKey: "updateFile",
            Cell: () => (
                <MyCenterFull>
                    <MyActionIconUpload />
                    <MyActionIconDelete onSubmit={() => console.log("File deleted")} />
                </MyCenterFull>
            ),
        },
         {
                    header: "Người cập nhật",
                    accessorKey: "nguoiCapNhat",
                },
                {
                    header: "Ngày cập nhật",
                    accessorKey: "ngayCapNhat",
                    accessorFn(originalRow) {
                        return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                    },
                }
              
        
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách đề cương môn học </Text>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={AllUserQuery.data || []}
            />
        </MyFlexColumn>
    );
}

const data: I_gqilewxvau_Read[] = [
    {
        courseCode: "CS101",
        courseName: "Nhập môn Công nghệ Thông tin",
        number: 45,
        manageUnit: "Khoa công nghệ thông tin",
        viewFile: "cs101_view.pdf",
        updateFile: "cs101_update.pdf",
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23")
    },
    {
        courseCode: "MAT202",
        courseName: "Toán rời rạc",
        number: 60,
        manageUnit: "Khoa toán ",
        viewFile: "mat202_view.pdf",
        updateFile: "mat202_update.pdf",
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23")
    },
    {
        courseCode: "PHY301",
        courseName: "Vật lý đại cương",
        number: 30,
        manageUnit: "Khoa vật lý",
        viewFile: "phy301_view.pdf",
        updateFile: "phy301_update.pdf",
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23")
    },
];
