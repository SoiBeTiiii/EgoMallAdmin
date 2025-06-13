import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { Group, NumberInput, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUpdateQuestion {
    id?: number;
    questionOrder?: number;
    content?: string;
    CLOId?: number;
    ratingGuide?: string;
    maximunScore?: number;
}

export default function F_v3u6xoc6id_UpdateQuestion({ questionValues }: { questionValues: IUpdateQuestion }) {

    const form = useForm<IUpdateQuestion>({
        initialValues: {
            ...questionValues
        }
    });

    return (
        <MyActionIconUpdate
            title="Chi tiết câu hỏi"
            modalSize={"80%"}
            form={form}
            onSubmit={() => {
                console.log(form.values);
            }}>
            <NumberInput
                w={{ base: "100%", sm: "50%" }}
                label="Thứ tự"
                placeholder="Nhập thứ tự câu hỏi"
                {...form.getInputProps("questionOrder")}
            />
            <Textarea
                label="Nội dung câu hỏi"
                placeholder="Nhập nội dung câu hỏi"
                {...form.getInputProps("content")}
            />
            <Group>
                <Select
                    clearable
                    placeholder='Chọn CLO'
                    label='CLO'
                    data={[
                        {
                            value: "1",
                            label: "CLO1"
                        },
                        {
                            value: "2",
                            label: "CLO2"
                        },
                        {
                            value: "3",
                            label: "CLO3"
                        },
                    ]}
                    defaultValue={form.values.CLOId?.toString()}
                    onChange={(value: any) => form.setFieldValue("CLOId", parseInt(value?.toString()!))}
                />
            </Group>
            <Textarea
                label="Hướng dẫn đánh giá"
                placeholder="Nhập thông tin hướng dẫn đánh giá"
                {...form.getInputProps("ratingGuide")}
            />
            <NumberInput
                label="Điểm tối đa"
                placeholder="Nhập điểm tối đa"
                {...form.getInputProps("maximunScore")}
            />
        </MyActionIconUpdate>
    );
}