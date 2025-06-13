import baseAxios from "@/api/baseAxios";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { I_mxmrddxhnz_SubjectMethodsRobric } from "./F_mxmrddxhnz_Read_SubjectMethodsRobric";

interface Props {
    tempSubjectMethodRubrics: I_mxmrddxhnz_SubjectMethodsRobric[];
    enrichedSubjectMethodRubrics: I_mxmrddxhnz_SubjectMethodsRobric[];
}

export default function F_mxmrddxhnz_Update_SubjectMethodsRobric({ tempSubjectMethodRubrics, enrichedSubjectMethodRubrics }: Props) {
    const queryClient = useQueryClient();
    const handleUpdate = () => {
        mutionCreateSubjectMethodRubrics.mutate(tempSubjectMethodRubrics);
        mutionUpdateSubjectMethodRubrics.mutate(enrichedSubjectMethodRubrics);
    }

    const mutionCreateSubjectMethodRubrics = useMutation(
        {
            mutationFn: async (data: I_mxmrddxhnz_SubjectMethodsRobric[]) => {
                data.map(async (item) => {
                    const res = await baseAxios.post('COESubjectMethodRubrics/Create', item);
                    return res.data;
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries();
            }
        }
    )

    const mutionUpdateSubjectMethodRubrics = useMutation(
        {
            mutationFn: async (data: I_mxmrddxhnz_SubjectMethodsRobric[]) => {
                data.map(async (item) => {
                    const res = await baseAxios.post('COESubjectMethodRubrics/Update', item);
                    return res.data;
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries();
                notifications.show({
                    color: "green",
                    message: 'Cập nhật thành công'
                })
            }
        }
    )

    return (
        <MyButton crudType='save' onClick={handleUpdate}>
            Lưu
        </MyButton>
    );
}