import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { utils_notification_show } from "@/utils/notification"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps } from "react"
import { MyButton } from "../Button/MyButton"
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonCreate<T> extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form" | "onSubmit"> {
    onSubmit: (values: T) => void
    onSuccess?: () => void;
    onError?: () => void;
    form: UseFormReturnType<T>;
    notCloseModalWhenSubmit?: boolean
    notResetFormWhenSubmit?: boolean

    disclosure?: ReturnType<typeof useDisclosure>;
}

export default function MyButtonCreate<T>({
    form,
    onSubmit,
    onSuccess,
    onError,
    notCloseModalWhenSubmit = false,
    notResetFormWhenSubmit = false,
    children,
    disclosure: externalDisclosure,
    ...rest
}: IMyButtonCreate<T>) {
    const defaultDisclosure = useDisclosure();
    const disclosure = externalDisclosure ?? defaultDisclosure;
    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: async (values: T) => await onSubmit!(values),
        onSuccess: () => {
            if (onSuccess) {
                onSuccess()
            }
            queryClient.invalidateQueries();
            utils_notification_show({ crudType: "create" });

            if (notCloseModalWhenSubmit == false) {
                disclosure[1].close();
            }
            if (notResetFormWhenSubmit == false) {
                form.reset();
            }
        },
        onError: () => {
            if (onError) onError();
        },
    });

    return (
        <MyButtonModal disclosure={disclosure} crudType="create" {...rest}>
            <form onSubmit={form.onSubmit((values) => {
                mutation.mutate(values);
            })}>
                <MyFlexColumn>
                    {children}
                    <MyButton type="submit" crudType="save" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    );
}