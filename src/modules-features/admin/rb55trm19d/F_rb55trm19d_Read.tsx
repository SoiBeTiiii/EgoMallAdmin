'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_rb55trm19d_Delete from "./F_rb55trm19d_Delete";


export interface IPLO {
    id?: number; // STT
    ploCode?: string; // Mã PLO
    content?: string; // Nội dung
    ploDensity?: number; // Tỷ trọng PLO
    pisCode?: string; // Mã PIs
    pisDensity?: number; // Tỷ trọng Pis
    content2?: string; // Nội dung 2
    subjectCode?: string; // Mã môn học
    subjectName?: string; // Tên môn học
    credit?: number; // Tín chỉ
    semester?: string; // Học kỳ
    teachingUnit?: string; // Đơn vị giảng dạy
    unitOfMeasurement?: string; // Đơn vị đo lường
    unitOfReview?: string; // Đơn vị đánh giá
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_rb55trm19d_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const form = useForm<IPLO>({
        initialValues: {},
    });

    // Query to fetch mock data
    const query = useQuery<IPLO[]>({
        queryKey: ["F_rb55trm19d_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<IPLO>[]>(() => [
        { header: "Mã PLO", accessorKey: "ploCode" },
        { header: "Nội dung", accessorKey: "content" },
        { header: "Tỷ trọng PLO", accessorKey: "ploDensity" },
        { header: "Mã PIs", accessorKey: "pisCode" },
        { header: "Tỷ trọng Pis", accessorKey: "pisDensity" },
        { header: "Nội dung ", accessorKey: "content2" },
        { header: "Mã môn học", accessorKey: "subjectCode" },
        { header: "Tên môn học", accessorKey: "subjectName" },
        { header: "Tín chỉ", accessorKey: "credit" },
        { header: "Học kỳ", accessorKey: "semester" },
        { header: "Đơn vị giảng dạy", accessorKey: "teachingUnit" },
        { header: "Đơn vị đo lường", accessorKey: "unitOfMeasurement" },
        {
            header: "Đơn vị đánh giá",
            accessorKey: "unitOfReview",
            // cell: ({ getValue }: { getValue: () => string }) => (
            //     <span style={{ color: "blue", textDecoration: "underline" }}>
            //         {getValue()}
            //     </span>
            // ),
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.unitOfReview}
                />
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

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "ploCode", header: "Mã PLO" },
            { fieldName: "content", header: "Nội dung" },
            { fieldName: "ploDensity", header: "Tỷ trọng PLO" },
            { fieldName: "pisCode", header: "Mã PIs" },
            { fieldName: "pisDensity", header: "Tỷ trọng Pis" },
            { fieldName: "content2", header: "Nội dung " },
            { fieldName: "subjectCode", header: "Mã môn học" },
            { fieldName: "subjectName", header: "Tên môn học" },
            { fieldName: "credit", header: "Tín chỉ" },
            { fieldName: "semester", header: "Học kỳ" },
            { fieldName: "teachingUnit", header: "Đơn vị giảng dạy" },
            { fieldName: "unitOfMeasurement", header: "Đơn vị đo lường" },
            { fieldName: "unitOfReview", header: "Đơn vị đánh giá" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyFlexRow>
                <MySelect
                    label="Chương trình"
                    data={[
                        { value: "1", label: "Kế toán" },
                        { value: "2", label: "Kiểm toán" },
                    ]}
                    defaultValue={1?.toString()}
                    onChange={(value) => form.setFieldValue("donViQuanLy", parseInt(value?.toString()!))}
                />
                <MySelect
                    label="Chương trình"
                    data={[
                        { value: "1", label: "Kế toán khóa 15" },
                        { value: "2", label: "Kế toán khóa 16" },

                    ]}
                    defaultValue={1?.toString()}
                    onChange={(value) => form.setFieldValue("donViQuanLy", parseInt(value?.toString()!))}
                />
            </MyFlexRow>

            <MyDataTable

                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <MyButton crudType="save" />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsPLO"
                                    data={query.data!}
                                    exportConfig={exportConfig}

                                />
                                <F_rb55trm19d_Delete />
                            </Group>
                        </>
                    )
                }}

            />
        </MyFlexColumn>
    );
}

const data: IPLO[] = [
    {
        id: 1,
        ploCode: "PLO1",
        content: "Nắm vững các nguyên tắc chuẩn mực kế toán và quy định pháp luật liên quan đến kế toán tài chính",
        ploDensity: 15,
        pisCode: "PI1.1",
        pisDensity: 35,
        content2: "Biết cách lập và trình bày các báo cáo tài chính như bảng cân đối kế toán",
        subjectCode: "KT001",
        subjectName: "Nguyên lý kế toán",
        credit: 3,
        semester: "2021-1",
        teachingUnit: "Khoa Kinh tế",
        unitOfMeasurement: "Khoa Kinh tế",
        unitOfReview: "Phòng đảm bảo chất lượng",
        nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        id: 1,
        ploCode: "PLO1",
        content: "Nắm vững các nguyên tắc chuẩn mực kế toán và quy định pháp luật liên quan đến kế toán tài chính",
        ploDensity: 15,
        pisCode: "PI1.2",
        pisDensity: 35,
        content2: "Biết cách lập và trình bày các báo cáo tài chính như bảng cân đối kế toán",
        subjectCode: "KT002",
        subjectName: "Xác suất thống kê",
        credit: 3,
        semester: "2021-1",
        teachingUnit: "Khoa Kinh tế",
        unitOfMeasurement: "Khoa Kinh tế",
        unitOfReview: "Phòng đảm bảo chất lượng",
        nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        id: 1,
        ploCode: "PLO1",
        content: "Nắm vững các nguyên tắc chuẩn mực kế toán và quy định pháp luật liên quan đến kế toán tài chính",
        ploDensity: 15,
        pisCode: "PI1.3",
        pisDensity: 30,
        content2: "Biết cách lập và trình bày các báo cáo tài chính như bảng cân đối kế toán",
        subjectCode: "KT001",
        subjectName: "Kinh tế vĩ mô",
        credit: 3,
        semester: "2021-1",
        teachingUnit: "Khoa Kinh tế",
        unitOfMeasurement: "Khoa kinh tế",
        unitOfReview: "Phòng đảm bảo chất lượng",
        nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        id: 2,
        ploCode: "PLO2",
        content: "Có khả năng áp dụng các nguyên tắc và chuẩn mực kế toán để ghi nhận, phân loại và tổng hợp các nghiệp vụ kinh tế phát sinh trong doanh nghiệp",
        ploDensity: 25,
        pisCode: "PI2.1",
        pisDensity: 25,
        content2: "Có khả năng áp dụng các nguyên tắc và chuẩn mực kế toán để ghi nhận các nghiệp vụ kinh tế phát sinh trong doanh nghiệp",
        subjectCode: "KT001",
        subjectName: "Kinh tế vĩ mô",
        credit: 3,
        semester: "2021-1",
        teachingUnit: "Khoa Kinh tế",
        unitOfMeasurement: "Khoa kinh tế",
        unitOfReview: "Phòng đảm bảo chất lượng",
        nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
];
