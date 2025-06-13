'use client'

import baseAxios from "@/api/baseAxios";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Fieldset, Group, ScrollArea, Space, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ICoreSubject } from "./Interface";


interface IPI extends IBaseEntity {
    densityPI?: number
}

interface IPloByGrade extends IBaseEntity {
    order?: number,
    coepIs?: IPI[]
}

export default function CoreSubjectTable({ gradeId }: { gradeId: number | undefined | null }) {

    let [gradeDisplayName, setGradeDisplayName] = useState("")
    const ploByGrade = useQuery<IPloByGrade[]>({
        queryKey: ["CoreSubjectTablePLO", gradeId],
        queryFn: async () => {
            if (!gradeId || gradeId == null) return []
            const res = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?coeGradeId=${gradeId}&cols=COEPIs`)
            return res.data.data
        }
    })
    const coreSubjectsByGrade = useQuery<ICoreSubject[]>({
        queryKey: ["CoreSubjectTable", gradeId],
        queryFn: async () => {
            if (!gradeId || gradeId == null) return []
            const res = await baseAxios.get(`/COEGrade/GetDetail?IsCore=true&gradeId=${gradeId}`)
            if (res.data.data.length > 0) {
                setGradeDisplayName(res.data.data[0]?.name)
            }
            return res.data.data
        }
    })

    return (
        <Fieldset
            legend={`Ma trận tỷ trọng CLO và PI thuộc chương trình đào tạo - Khóa ${gradeDisplayName}`
            }>
            <Group>
                <MyButton crudType="export" />
            </Group>
            <Space />
            <ScrollArea.Autosize>
                <Table highlightOnHover={false} striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th colSpan={7} rowSpan={2}></Table.Th>
                            {ploByGrade.data?.map((item, idx) => (
                                <Table.Th ta={'center'} bg={'cyan'} key={idx} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr >
                            {ploByGrade.data?.flatMap(item2 => item2.coepIs).map((item, idx) => (
                                <Table.Th bg={'blue'} key={idx}>{item?.densityPI}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th>Năm học kỳ</Table.Th>
                            <Table.Th>Thứ tự</Table.Th>
                            <Table.Th>Mã môn học</Table.Th>
                            <Table.Th>Tên môn học</Table.Th>
                            <Table.Th>Mã CLO</Table.Th>
                            <Table.Th>Tỷ trọng</Table.Th>


                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg={'green'} key={idx}>{item?.code}</Table.Th>
                            ))}
                        </Table.Tr>

                    </Table.Thead>


                    <Table.Tbody>
                        {coreSubjectsByGrade.data?.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Table.Tr>
                                    <Table.Td >
                                        {idx + 1}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSemester?.name}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.order}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.code}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Mã CLO */}
                                        <MyFlexColumn w={70} gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.code}</Text>
                                                ))
                                            }
                                        </MyFlexColumn>
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Tỷ trọng */}
                                        <MyFlexColumn gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.densityCLO}</Text>
                                                ))
                                            }
                                        </MyFlexColumn>
                                    </Table.Td>


                                    {/* Sửa lại code phần này để map đúng ma trận */}
                                    {ploByGrade.data?.flatMap(plo => plo.coepIs).map((pi, piIdx) => (
                                        <Table.Td key={piIdx} miw={75} w={100}>
                                            <MyFlexColumn gap={10} justify={'space-around'}>
                                                {item.coecGs!.length > 0 &&
                                                    item.coecGs!.flatMap(cg => cg.coeclOs).map((clo, cloIdx) => {
                                                        // Find the relationship between this CLO and this PI
                                                        const relation = clo?.coeclopi?.find((cp: any) => cp.coepiId === pi?.id);
                                                        if (relation?.rating == null) return (
                                                            <Text key={cloIdx}>NULL</Text>
                                                        )
                                                        return (
                                                            <Text key={cloIdx}>
                                                                {relation?.rating}
                                                            </Text>
                                                        );
                                                    })
                                                }
                                            </MyFlexColumn>
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            </React.Fragment>
                        ))}

                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
        </Fieldset>
    )
}