'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group, NumberInput, Text } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


//clzixswvmy
// Interface cho dữ liệu
export interface I_clzixswvmy {
    id?: number;
    noiDungCauHoi?: string;
    CLO?: string;
    diemToiDa?: number;
    diem?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

interface I_userData {
    id?: number;
    fullname?: string;
    classId?: number;
    // className?: string;
    programId?: number;
    courseId?: number;
    subjectId?: number;
    groupId?: number;

}
export default function F_clzixswvmy() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_clzixswvmy[]>({
        queryKey: ["I_clzixswvmy_data"],
        queryFn: async () => sampleData
    });
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    // Cột dữ liệu cho bảng
    const columns = useMemo<MRT_ColumnDef<I_clzixswvmy>[]>(() => [
        // {
        //     header: "STT",
        //     accessorKey: "id",
        // },
        {
            header: "Nội dung câu hỏi",
            accessorKey: "noiDungCauHoi",
        },
        {
            header: "CLO",
            accessorKey: "CLO",
        },
        {
            header: "Điểm tối đa",
            accessorKey: "diemToiDa",

        },
        {
            header: "Điểm",
            accessorKey: "diem",
            accessorFn: (row) =>
                <NumberInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.diem}
                />
            ,
        },

        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
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
            { "fieldName": "id", "header": "STT" },
            { "fieldName": "noiDungCauHoi", "header": "Nội dung câu hỏi" },
            { "fieldName": "CLO", "header": "CLO" },
            { "fieldName": "diemToiDa", "header": "Điểm tối đa" },
            { "fieldName": "diem", "header": "Điểm" },
            { "fieldName": "nguoiCapNhat", "header": "Người cập nhật" },
            { "fieldName": "ngayCapNhat", "header": "Ngày cập nhật" }
        ]
    };


    // Kiểm tra trạng thái của query
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <>
            <MyFlexColumn>
                <MyFlexRow>
                    <MyTextInput label="Mã sinh viên" />
                    <Text><strong>Họ và tên: </strong>{userData.fullname ? userData.fullname : "No fullname found"}</Text>
                    <Text><strong>Lớp: </strong>{userData.classId ? classMapping[userData.classId] : "No classId found"}</Text>



                </MyFlexRow>

                <MyFlexRow>
                    <Text ><strong>Chương trình: </strong>{userData.programId ? programMapping[userData.programId] : "No programId found"}</Text>

                    <Text ><strong>Khoá: </strong>{userData.courseId ? courseMapping[userData.courseId] : "No courseId found"}</Text>
                    <Text ><strong>Môn học: </strong>{userData.subjectId ? subjectMapping[userData.subjectId] : "No subjectId found"}</Text>
                    <Text ><strong>Nhóm học: </strong>{userData.groupId ? groupMapping[userData.groupId] : "No groupId found"}</Text>
                </MyFlexRow>
                <MyFlexRow>
                    <MySelect label="Hình thức đánh giá" data={[{ value: "1", label: 'CK - Cuối kỳ' }]} defaultValue={"1"} />
                    <MySelect label="Nội dung đánh giá" data={[{ value: "1", label: 'Bài tập thi hết môn' }]} defaultValue={"1"} />
                    <MySelect label="Phương pháp đánh giá" data={[{ value: "1", label: 'Trắc nghiệm' }]} defaultValue={"1"} />

                </MyFlexRow>
            </MyFlexColumn>
            <Fieldset legend={`Danh sách điểm từng câu hỏi`}>
                <MyDataTable
                    enableRowSelection
                    columns={columns}
                    data={query.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (



                            <Group>
                                <Button color="green" style={{ padding: '10px' }} >
                                    Lưu
                                </Button>

                                <AQButtonCreateByImportFile
                                    setImportedData={() => { }}
                                    form={form_multiple}
                                    onSubmit={() => {
                                        console.log(form_multiple.values);
                                    }}
                                ></AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsCauHoi"
                                    data={query.data!}
                                    exportConfig={exportConfig}
                                />
                                <Button color="red" leftSection={<IconTrash />}>
                                    Xóa
                                </Button>
                            </Group>


                        )
                    }}
                />
            </Fieldset>
        </>
    );
}


const sampleData: I_clzixswvmy[] = [
    {
        "id": 1,
        "noiDungCauHoi": "Nguyên tắc nào sau đây là nguyên tắc cơ bản của kế toán?",
        "CLO": "CLO1",
        "diemToiDa": 1,
        diem: 0.5,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 2,
        "noiDungCauHoi": "Tô trùng DN khi tham gia vào qtr sx sẽ biến động như thế nào",
        "CLO": "CLO1",
        "diemToiDa": 1,
        diem: 0.5,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 3,
        "noiDungCauHoi": "KT tài chính có đặc điểm?",
        "CLO": "CLO2",
        "diemToiDa": 1,
        "diem": 0,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 4,
        "noiDungCauHoi": "Kính từ Tài chính có đặc điểm?",
        "CLO": "CLO3",
        "diemToiDa": 2,
        "diem": 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 5,
        "noiDungCauHoi": "Nợ phải trả phát sinh do",
        "CLO": "CLO4",
        "diemToiDa": 5,
        "diem": 2.5,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
]


const userData: I_userData =
{
    id: 1,
    fullname: "Tô Ngọc Bảo",
    classId: 1,

    programId: 1,
    courseId: 1,
    subjectId: 1,
    groupId: 2,
}

const classMapping: Record<number, string> = {
    1: 'KT2401'
}

const programMapping: Record<number, string> = {
    1: 'CKCT - Cơ khí chế tạo'
}

const courseMapping: Record<number, string> = {
    1: 'CKCT24'
}

const groupMapping: Record<number, string> = {
    1: '01',
    2: '02'
}

const subjectMapping: Record<number, string> = {
    1: 'Chế tạo máy'
} 