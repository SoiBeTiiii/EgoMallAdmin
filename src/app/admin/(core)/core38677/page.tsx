'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { OBJECT_COlORS } from "@/constants/object/color";
import F_core38677_ReadUser from "@/modules-features/admin/(core)/core38677/F_core38677_ReadUser";
import F_core38677_Save from "@/modules-features/admin/(core)/core38677/F_core38677_Save";
import F_core38677_ViewMenuPermissions from "@/modules-features/admin/(core)/core38677/F_core38677_ViewMenuPermissions";
import { Grid, Paper, ScrollArea } from "@mantine/core";
export default function Page() {
    return (
        <MyPageContent >
            <Grid grow>
                <Grid.Col span={4}>
                    <F_core38677_ReadUser />
                </Grid.Col>
                <Grid.Col span={8}>
                    <MyFlexColumn h={'80vh'} flex={1}>
                        <ScrollArea.Autosize h={'100%'}>
                            <Paper p={'md'} bg={OBJECT_COlORS.mantineBackgroundSecondary}>
                                <F_core38677_ViewMenuPermissions />
                            </Paper>
                        </ScrollArea.Autosize>
                        <F_core38677_Save />
                    </MyFlexColumn>
                </Grid.Col>
            </Grid>
        </MyPageContent>
    )
}
