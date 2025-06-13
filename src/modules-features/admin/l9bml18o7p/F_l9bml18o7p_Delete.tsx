'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function F_l9bml18o7p_Delete() {
    const disc = useDisclosure();
    const contentDelete = "Khóa"
    return (
        <MyButtonModal crudType="delete" disclosure={disc}>
            <form>
                {/* <IconAlertTriangle style={{ color: "orange" }} width={"100%"} height={"100%"} /> */}
                <MyFlexColumn>
                    <Text>Bạn sắp xóa dữ liệu {contentDelete}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</Text>
                    <Group grow>
                        <MyButton
                            crudType="delete"
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
