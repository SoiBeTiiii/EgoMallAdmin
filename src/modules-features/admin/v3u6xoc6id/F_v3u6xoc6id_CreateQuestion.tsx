import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Group, NumberInput, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface ICreateQuestion {
    questionOrder?: number;
    content?: string;
    CLOId?: number;
    ratingGuide?: string;
    maximunScore?: number;
}

export default function F_v3u6xoc6id_CreateQuestion() {

    const form = useForm<ICreateQuestion>({
        initialValues: {
            questionOrder: undefined,
            content: "",
            CLOId: undefined,
            ratingGuide: "",
            maximunScore: undefined,
        }
    });

    return (
        <MyButtonCreate
            modalSize={"80%"}
            objectName="câu hỏi"
            title="Chi tiết câu hỏi"
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
                    {...form.getInputProps("CLOId")}
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
        </MyButtonCreate>
    );
}