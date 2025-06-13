"use client"
import { Divider, Flex, Group, Tabs } from '@mantine/core';
import { IconCategory, IconListCheck, IconListDetails, IconSubtask, IconTable, IconTargetArrow } from '@tabler/icons-react';
import { IGradeSubject } from './Interfaces';
import GSAssessmentTable from './TabAssessment/GSAssessmentTable';
import TabAssessmentByToolLayout from './TabAssessmentByTool/TabAssessmentByToolLayout';
import CGTable from './TabCG/CGTable';
import CLOTable from './TabCLO/CLOTable';
import GSFormulaTable from './TabFormula/GSFormulaTable';
import TabGSMethodLayout from './TabMethod/TabGSMethodLayout';

export default function ConfigCLOAssessmentModalContent(
    { gradeSubjectValues, modalDiscState }: { gradeSubjectValues: IGradeSubject, modalDiscState: boolean }
) {
    return (
        <>
            <Group gap="lg" mb={12}>
                <span>
                    Khóa: {gradeSubjectValues.coeGrade?.name}
                </span>
                <span>
                    Môn học: {gradeSubjectValues.coeSubject?.name}
                </span>
                <span>
                    Chương trình: Chưa có dữ liệu
                </span>
            </Group>
            <Tabs
                orientation="vertical"
                color="cyan" variant="pills" radius="xs" defaultValue="ca_cg">
                <Tabs.List>
                    <Tabs.Tab value="ca_cg" leftSection={<IconTargetArrow />}>
                        Mục tiêu môn học CG
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_clo" leftSection={<IconListCheck />}>
                        Chuẩn đầu ra môn học CLO
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_formula" leftSection={<IconCategory />}>
                        Hình thức đánh giá CA
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_assessment" leftSection={<IconSubtask />}>
                        Nội dung đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_method" leftSection={<IconListDetails />}>
                        Phương pháp đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_tool" leftSection={<IconTable />}>
                        Công cụ đánh giá
                    </Tabs.Tab>
                </Tabs.List>

                <Divider my="0" orientation="vertical" />

                <Tabs.Panel value="ca_cg" w={"90%"}>
                    <Group ml={16} grow>
                        <CGTable gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>
                <Tabs.Panel value="ca_clo" w={"90%"}>
                    <Group ml={16} grow>
                        <CLOTable gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_formula" w={"90%"}>
                    <Group ml={16} grow>
                        <GSFormulaTable gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_assessment" w={"90%"}>
                    <Group ml={16} grow>
                        <GSAssessmentTable gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_method" w={"90%"}>
                    <Group ml={16} grow>
                        <TabGSMethodLayout gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_tool" w={"90%"}>
                    <Flex ml={16} gap={16} direction="column">
                        <TabAssessmentByToolLayout gradeSubjectId={gradeSubjectValues.id} />
                    </Flex>
                </Tabs.Panel>
            </Tabs>
        </>
    )
}



