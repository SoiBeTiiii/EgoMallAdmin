'use client'
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useS0Sidebar } from "@/stores/S0Sidebar";
import { utils_notification_show } from "@/utils/notification";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps } from "react";

interface IActionIconDelete extends Omit<ComponentProps<typeof MyActionIconModal>, "disclosure"> {
    onSubmit: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}
export default function F_rb55trm19d_Delete({

}) {
    const SidebarStore = useS0Sidebar();
    const disc = useDisclosure();
    const queryClient = useQueryClient();



    return (
        <MyButtonModal disclosure={disc} crudType="delete" title="Xóa dữ liệu" >
            <form>
                {/* <IconAlertTriangle style={{ color: "orange" }} width={"100%"} height={"100%"} /> */}
                <MyFlexColumn>
                    <Text>Bạn sắp xóa dữ liệu Khóa. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</Text>
                    <Group grow>
                        <MyButton
                            crudType="delete"
                            onClick={() => {
                                utils_notification_show({ crudType: "delete" });
                                disc[1].close()
                            }}
                        // loading={loading}
                        />
                        <MyButton
                            crudType="cancel"
                            onClick={() => {
                                disc[1].close()
                                // mutation.mutate();
                            }}
                        // loading={loading}
                        />
                    </Group >
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
