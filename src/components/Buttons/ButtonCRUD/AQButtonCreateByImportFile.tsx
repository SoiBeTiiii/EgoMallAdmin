import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { utils_notification_show } from "@/utils/notification"
import { FileInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { IconFileTypeXls } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps } from "react"
import * as XLSX from 'xlsx'
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonCreate extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form"> {
    onSubmit: () => void,
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    form: ReturnType<typeof useForm>;
    setImportedData?: (data: any) => void;
}

export default function AQButtonCreateByImportFile({ form, onSubmit, onSuccess, onError,
    // children,
    setImportedData,
    ...rest }: IMyButtonCreate) {

    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            return await onSubmit()
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
            utils_notification_show({ crudType: "create" });
            disc[1].close();
            form.reset()
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    })


    const handleFileChange = (file: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result;
            if (binaryStr) {
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet name
                const sheet = workbook.Sheets[sheetName]; // Get the first sheet
                const data = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
                setImportedData && setImportedData(data); // Save the parsed data to the form
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <MyButtonModal disclosure={disc} crudType="createMultiple"  {...rest}>
            <form onSubmit={form.onSubmit((values) => {

            })}>
                <MyFlexColumn>
                    {/* {children} */}
                    <FileInput
                        leftSection={<IconFileTypeXls />}
                        accept=".xlsx"
                        description="Định dạng hợp lệ: .xlsx"
                        label="Chọn file"
                        onChange={handleFileChange}
                        clearable={true}
                        placeholder="Chọn file" />
                    <MyButton type="submit" crudType="createMultiple" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}