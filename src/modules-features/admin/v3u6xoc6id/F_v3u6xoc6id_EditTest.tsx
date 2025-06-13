import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset, Grid, Group, Select, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_v3u6xoc6id_CreateQuestion from "./F_v3u6xoc6id_CreateQuestion";
import F_v3u6xoc6id_DeleteQuestion from "./F_v3u6xoc6id_DeleteQuestion";
import F_v3u6xoc6id_UpdateQuestion from "./F_v3u6xoc6id_UpdateQuestion";

interface IQuestionViewModel {
    id?: number;
    questionOrder?: number;
    content?: string;
    CLOId?: number;
    CLOName?: string;
    maximunScore?: number;
    ratingGuide?: string;
}

interface ITestViewModel {
    id?: number;
    programName?: string;
    programAcademicYear?: string;
    subjectName?: string;
    ratingTypeId?: number;
    ratingContentId?: number;
    ratingMethodId?: number;
}

const mockData_questionList: IQuestionViewModel[] = [
    {
        id: 1,
        questionOrder: 1,
        content: "Nguyên tắc nào sau đây là nguyên tắc cơ bản của kế toán?",
        CLOId: 1,
        CLOName: "CLO1",
        maximunScore: 1,
        ratingGuide: "Nêu đúng nguyên tắc"
    },
    {
        id: 2,
        questionOrder: 2,
        content: "TS trong DN khi tham gia vào qtr sx sẽ biến động thế nào?",
        CLOId: 1,
        CLOName: "CLO1",
        maximunScore: 1,
        ratingGuide: "Nêu đúng biến động"
    },
    {
        id: 3,
        questionOrder: 3,
        content: "Kinh tế tài chính có đặc điểm?",
        CLOId: 3,
        CLOName: "CLO3",
        maximunScore: 1,
        ratingGuide: "Nêu đủ 3 đặc điểm"
    },
    {
        id: 4,
        questionOrder: 4,
        content: "Nợ phải trả phát sinh do?",
        CLOId: 2,
        CLOName: "CLO2",
        maximunScore: 1,
        ratingGuide: "Nêu đủ 3 nguyên nhân"
    },
];


export default function F_v3u6xoc6id_EditTest({ testValues }: { testValues: ITestViewModel }) {

    const disc = useDisclosure();
    const form = useForm<ITestViewModel>({
        initialValues: {
            ...testValues
        }
    });

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const questionListByTestId = useQuery<IQuestionViewModel[]>({
        queryKey: [`F_v3u6xoc6id_questionList${form.values.id}`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData_questionList
        },
    })

    const questionTableColumns = useMemo<MRT_ColumnDef<IQuestionViewModel>[]>(() => [
        {
            header: "Nội dung câu hỏi",
            accessorKey: "content",
        },
        {
            header: "CLO",
            accessorKey: "CLOName",
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maximunScore",
        },
        {
            header: "Hướng dẫn đánh giá",
            accessorKey: "ratingGuide",
        },
    ], []);

    return (
        <MyButtonModal
            crudType="update"
            modalSize={"100%"}
            label="Cập nhật"
            variant="light"
            leftSection={null}
            onSubmit={() => {
                console.log(form.values);
            }}
            disclosure={disc}
        >
            <form onSubmit={form.onSubmit((values) => {
                console.log(values);
            })}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <Text>
                            <strong>Chương trình:</strong> {form.values.programName}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 2 }}>
                        <Text>
                            <strong>Khóa:</strong> {form.values.programAcademicYear}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Text>
                            <strong>Môn học:</strong> {form.values.subjectName}
                        </Text>
                    </Grid.Col>
                    <Space />
                </Grid>
                <Group gap="xs" grow>
                    <Select
                        clearable
                        placeholder='Chọn hình thức đánh giá'
                        label='Giới tính'
                        data={[
                            {
                                value: "1",
                                label: "Giữa kỳ"
                            },
                            {
                                value: "2",
                                label: "Cuối kỳ"
                            }
                        ]}
                        defaultValue={form.values.ratingMethodId?.toString()}
                        onChange={(value: any) => form.setFieldValue("ratingMethodId", parseInt(value?.toString()!))}
                    />
                    <Select
                        clearable
                        placeholder='Chọn nội dung đánh giá'
                        label='Nội dung đánh giá'
                        data={[
                            {
                                value: "1",
                                label: "Giữa kỳ"
                            },
                            {
                                value: "2",
                                label: "Cuối kỳ"
                            }
                        ]}
                        defaultValue={form.values.ratingContentId?.toString()}
                        onChange={(value: any) => form.setFieldValue("ratingContentId", parseInt(value?.toString()!))}
                    />
                    <Select
                        clearable
                        placeholder='Chọn phương pháp đánh giá'
                        label='Phương pháp đánh giá'
                        data={[
                            {
                                value: "1",
                                label: "Trắc nghiệm"
                            },
                            {
                                value: "2",
                                label: "Tự luận"
                            }
                        ]}
                        defaultValue={form.values.ratingMethodId?.toString()}
                        onChange={(value: any) => form.setFieldValue("ratingMethodId", parseInt(value?.toString()!))}
                    />
                </Group>
            </form>
            <Fieldset legend="Danh sách câu hỏi">
                {questionListByTestId.isLoading && "Đang danh sách chi nhánh..."}
                {questionListByTestId.isError && "Có lỗi khi lấy dữ liệu..."}
                {questionListByTestId.data === undefined ? "Không có dữ liệu..."
                    :
                    <MyDataTable
                        columns={questionTableColumns}
                        data={questionListByTestId.data}
                        enableRowSelection={true}
                        exportAble
                        renderTopToolbarCustomActions={() => (
                            <Group>
                                <F_v3u6xoc6id_CreateQuestion />
                                <AQButtonCreateByImportFile
                                    setImportedData={setFileData}
                                    onSubmit={
                                        () => {
                                            console.log("data: ", fileData);
                                        }
                                    }
                                    form={form_multiple}
                                >
                                </AQButtonCreateByImportFile>
                            </Group>
                        )}
                        renderRowActions={({ row }) => {
                            return (
                                <>
                                    <Group>
                                        <F_v3u6xoc6id_UpdateQuestion questionValues={row.original} />
                                        <F_v3u6xoc6id_DeleteQuestion questionId={row.original.id!} />
                                    </Group>
                                </>
                            )
                        }}
                    />
                }
            </Fieldset>
        </MyButtonModal>
    );
}