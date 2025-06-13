import { utils_notification_show } from "@/utils/notification";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";

interface I {
    disc?: ReturnType<typeof useDisclosure>
    form?: ReturnType<typeof useForm>,
    crudType?: "delete" | "update" | "create"
    manualNotification?: () => void
}
export default function useC_MutationAction({
    disc,
    form,
    crudType = "create",
    manualNotification
}: I = {}) {
    const queryClient = useQueryClient()

    const Action = ({ manualCrudType }: { manualCrudType?: "delete" | "update" | "create" }) => {
        const finalCrudType = manualCrudType || crudType;
        form && form.reset();
        disc && disc[1].close();
        queryClient.invalidateQueries();

        if (manualNotification) {
            manualNotification();
            return;
        }
        utils_notification_show({ crudType: finalCrudType });
    };
    return {
        Action
    }

}
