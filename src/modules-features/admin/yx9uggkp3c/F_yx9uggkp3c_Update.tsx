'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMessageDown, IconPlus, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

// Interfaces
interface IQuestionList {
    id?: number; // STT
    questionContent?: string; // Nội dung câu hỏi
    clo?: string; // CLO
    maximumPoint?: number; // Điểm tối đa
    point?: number; // Điểm
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

interface I_yx9uggkp3c {
    codeStudent?: string; // Mã sinh viên
    name?: string; // Họ tên
    class?: string; // Lớp
    program?: string; // Chương trình
    course?: string; // Khóa
    subjectName?: string; // Môn học
    group?: string; // Nhóm học
    assessmentFormId?:number // Hình thức đánh giá Id
    assessmentForm?: string; // Hình thức đánh giá
    reviewContent?: string; // Nội dung đánh giá
    evaluationMethodId?:number 
    evaluationMethod?: string; // Phương pháp đánh giá
    questionList?: IQuestionList[]; // Danh sách câu hỏi
   
}

const mockQuestions: IQuestionList[] = [
    { id: 1, questionContent: "Nguyên tắc nào sau đây là nguyên tắc cơ bản của kế toán", clo: "CLO1", maximumPoint: 1, point: 0.5,nguoiCapNhat: "Nguyễn Văn A",ngayCapNhat: new Date("2021-07-11T15:00:00Z") },
    { id: 2, questionContent: "TS trong DN khi tham gia vào qtr sx sẽ biến động như thế nào", clo: "CLO1", maximumPoint: 1, point: 0.5,nguoiCapNhat: "Nguyễn Văn A",ngayCapNhat: new Date("2021-07-11T15:00:00Z") },
    { id: 3, questionContent: "KT Tài chính có đặc điểm", clo: "CLO2", maximumPoint: 1, point: 0,nguoiCapNhat: "Nguyễn Văn A",ngayCapNhat: new Date("2021-07-11T15:00:00Z") },
    {id:4,questionContent:"Kinh tế Tài chính có đặc điểm",clo:"CLO3",maximumPoint:2,point:1,nguoiCapNhat: "Nguyễn Văn A",ngayCapNhat: new Date("2021-07-11T15:00:00Z")},
    {id:5,questionContent:"Nợ phải trả phát sinh do",clo:"CLO4",maximumPoint:5,point:2.5,nguoiCapNhat: "Nguyễn Văn A",ngayCapNhat: new Date("2021-07-11T15:00:00Z")}
];

export default function F_yx9uggkp3c_Update({data}:{data:I_yx9uggkp3c}) {
    
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    // const QuestionList = useListState<IQuestionList>([
    //     { id: 1, questionContent: "Câu hỏi 1", clo: "CLO1", maximumPoint: 5, point: 3 },
    // { id: 2, questionContent: "Câu hỏi 2", clo: "CLO2", maximumPoint: 10, point: 8 },
    // { id: 3, questionContent: "Câu hỏi 3", clo: "CLO3", maximumPoint: 7, point: 5 },
    // ]);
    const AllQuestion = useQuery<IQuestionList[]>({
        queryKey: [`F_yx9uggkp3cAllQuestionById`],
        queryFn: async () => {
            return mockQuestions
        },
    });
    
    const form = useForm<I_yx9uggkp3c>({
        initialValues: data
    });

    const questionColumns = useMemo<MRT_ColumnDef<IQuestionList>[]>(() => [
        {
            header: "Nội dung câu hỏi",
            accessorKey: "questionContent",
        },
        {
            header: "CLO",
            accessorKey: "clo",
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maximumPoint",
        },
        {
            header: "Điểm",
            accessorKey: "point",
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
            { fieldName: "id", header: "STT" },
            { fieldName: "questionContent", header: "Nội dung câu hỏi" },
            { fieldName: "clo", header: "CLO" },
            { fieldName: "maximumPoint", header: "Điểm tối đa" },
            { fieldName: "point", header: "Điểm" },
        ],
    };
    
    return (
        <MyActionIconUpdate
            modalSize={"100%"}
            form={form}
            onSubmit={() => {
                console.log(form.values);
            }}
        >
            <Group>
            <MyFlexRow>
                <MyTextInput style={{flex:"1"}} label="Mã sinh viên" {...form.getInputProps("codeStudent")} disabled/>
                <MyTextInput style={{flex:"1"}} label="Họ tên" {...form.getInputProps("name")} />
                <MyTextInput style={{flex:"1"}} label="Lớp" {...form.getInputProps("class")} />
                </MyFlexRow>
            </Group>

            <Group> 
                <MyFlexRow>
                <MyTextInput style={{flex:"1"}} label="Chương trình" {...form.getInputProps("program")} />
                <MyTextInput style={{flex:"1"}} label="Khóa" {...form.getInputProps("course")} />
                <MyTextInput style={{flex:"1"}} label="Môn học" {...form.getInputProps("subjectName")} />
                <MyTextInput style={{flex:"1"}} label="Nhóm học" {...form.getInputProps("group")} />
                </MyFlexRow>
            </Group>

            <Group>
                <MyFlexRow>
                <Select
                    style={{flex:"1",width:"550px"}}
                    label="Hình thức đánh giá"
                    placeholder="Chọn hình thức"
                    data={[
                        {value:"1",
                        label:"GK-Giữa kỳ",
                        }, 
                        {value:"2",label:"CK-Cuối kỳ"}, 
                        {value:"3",label:"TH-Thực hành"}
                    ]}
                    
                    defaultValue={form.values.assessmentFormId?.toString()}
                    onChange={(value:any)=>form.setFieldValue("assessmentFormId",parseInt(value?.toString()!))}
                />
                <MyTextInput style={{flex:"1"}} label="Nội dung đánh giá" {...form.getInputProps("reviewContent")} />

               <Select
                  style={{flex:"1"}}
                  label="Phương pháp đánh giá"
                  placeholder="Chọn phương pháp"
                  data={[
                      {value:"1",label:"Trắc nghiệm"}, 
                      {value:"2",label:"Tự luận"}, 
                      {value:"3",label:"Vấn đáp"}]}
                      defaultValue={form.values.evaluationMethodId?.toString()}
                      onChange={(value:any)=>form.setFieldValue("evaluationMethodId",parseInt(value?.toString()!))}
                />
                </MyFlexRow>
            </Group>
            <MyDataTable
                columns={questionColumns} 
                data={AllQuestion.data!}
                enableRowSelection={true}
                enableRowNumbers={true} 
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button leftSection={<IconPlus />}>Thêm</Button>
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => {
                                console.log("Dữ liệu đã nhập:", fileData);
                            }}
                            form={form_multiple}
                        />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsCauHoi"
                            data={AllQuestion.data!}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>
                            Xóa
                        </Button>
                        <Button color="cyan" leftSection={<IconMessageDown />}>
                        Lưu
                    </Button>
                    </Group>
                )}         
            >
            </MyDataTable>
        </MyActionIconUpdate>
    );
}
