'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_umg0mq7o3x_Create from "./F_umg0mq7o3x_Create";
import F_umg0mq7o3x_Delete from "./F_umg0mq7o3x_Delete";
import F_umg0mq7o3x_Update from "./F_umg0mq7o3x_Update";

export interface IMIT {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function IMIT_Read() {
    const AllQuery = useQuery<IMIT[]>({
        queryKey: ["F_umg0mq7o3x_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COEMITScale/GetAll");
            return result.data?.data || []
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData:[]    
        },
    })

    const columns = useMemo<MRT_ColumnDef<IMIT>[]>(() => [
        { header: "Mức độ", accessorKey: "name" },
        { header: "Mô tả", accessorKey: "code" },
        { header: "Kiến thức", accessorKey: "knowledge" },
        { header: "Kỹ năng", accessorKey: "skill" },
        { header: "Tự chủ", accessorKey: "autonomy" },
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

        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "name", header: "Mức độ" },
            { fieldName: "code", header: "Mô tả" },
            { fieldName: "knowledge", header: "Kiến thức" },
            { fieldName: "skill", header: "Kỹ năng" },
            { fieldName: "autonomy", header: "Tự chủ" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (AllQuery.isLoading) return "Loading...";

    function setImportData(data: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Fieldset legend={`Danh mục thang đo năng lực (MIT)`}>

     
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <F_umg0mq7o3x_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData} 
                            form={form_multiple}
                            onSubmit={async() => console.log(form_multiple.values)}
                            >
                            Import
                        </AQButtonCreateByImportFile>
                        <AQButtonExportData
                            isAllData={true}
                            objectName="IMIT_Data"
                            data={AllQuery.data!}
                            exportConfig={exportConfig}
                            />
                        <Button leftSection={<IconTrash />} color="red">
                            Xóa
                        </Button>
                    </Group>
                )}
                columns={columns}
                data={AllQuery.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_umg0mq7o3x_Update data={row.original} />
                        <F_umg0mq7o3x_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
                />
       
    </Fieldset>
    );
}

// const data: IMIT[] = [
//     {
//         id: 1,
//         level: 1,
//         description: "Có trải nghiệm và gặp qua",
//         knowlegde: "Nhớ: đã nghe, đã thấy, đã trải nghiệm",
//         skill: "",
//         autonomy: "",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 2,
//         level: 2,
//         description: "Có tham gia và đóng góp",
//         knowlegde: "Hiểu: Nắm bắt được ý nghĩa, giải thích được",
//         skill: "",
//         autonomy: "",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:3,
//         level:3,
//         description:"Có thể giải thích",
//         knowlegde:"Phân tích: Nhìn nhận vấn đề dưới nhiều góc độ khác nhau, có thể giải thích được",
//         skill:"",
//         autonomy:"",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:4,
//         level:4,
//         description:"Có thể thực hành và tổ chức triển khai",
//         knowlegde:"Áp dụng: sử dụng được kiến thức đã học vào tính huống mới, và cụ thể trong thực tiễn",
//         skill:"Đánh giá được chất lượng công việc sau khi hoàn thành và kết quả thực hiện công việc của các thành viên trong nhóm",
//         autonomy:"Tự định hướng đưa ra kết luận chuyên môn và có thể bảo vệ được quan điểm",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id:5,
//         level:5,
//         description:"Có thể sáng tạo, góp ý giải quyết vấn đề",
//         knowlegde:"Sáng tạo: đại diện cho nhận thức ở tầm cao. Có khả năng đánh giá, phán xét giá trị từ nhận thức",
//         skill:"Truyền đạt vấn đề và giải pháp tới người khác tại nơi làm việc",
//         autonomy:"Lập kế hoạch, điều phối, quản lý các nguồn lực đánh giá và cải thiện hiệu quả hoạt động",
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     }
// ];
