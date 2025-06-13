'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { rem, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArticle, IconPresentationAnalytics, IconSmartHome } from "@tabler/icons-react";
import { useState } from "react";
import F_mxmrddxhnz_Read_CGgoal from "./CLO/F_mxmrddxhnz_Read_CGgoal";
import F_mxmrddxhnz_Read_CLOoutput from "./CLO/F_mxmrddxhnz_Read_CLOoutput";
import F_mxmrddxhnz_Read_hinhthuc from "./SubjectFormula/F_mxmrddxhnz_Read_SubjectFormula";
import F_mxmrddxhnz_Read_SubjectMethod from "./SubjectMethod/F_mxmrddxhnz_Read_SubjectMethod";


import useS_mxmrddxhnz from "./useS_mxmrddxhnz";

import GradeSubjectAssessmentTable from "./CRUDGradeSubjectAssessment/GradeSubjectAssessmentTable";
import F_mxmrddxhnz_Read_SubjectMethodsRobric from './SubjectMethodsRobric/F_mxmrddxhnz_Read_SubjectMethodsRobric';

//mxmrddxhnz
interface I_mxmrddxhnz_CLO {
    id?: number;
    programId?: number;
    courseId?: number;
    tenMonHoc?: string;
}
export default function F_mxmrddxhnz_CLO({ data }: { data: ICoeGradeSubject }) {
    const store = useS_mxmrddxhnz()
    const disc = useDisclosure(false);
    const [activeTab, setActiveTab] = useState<string | null>("CGgoal")
    const iconStyle = { width: rem(14), height: rem(14) }
    return (
        <MyButtonModal
            label="Cập nhật"
            modalSize="100%"
            disclosure={disc}
            title="Chi tiết chuẩn đầu ra môn học"
        >
            <MyFlexColumn>
                <MyFlexRow>
                    <Text style={{ flex: "1" }}><strong>Chương trình : </strong>{store.state.programId ? store.state.programId : "Không xác định"}</Text>
                    <Text style={{ flex: "1" }} ><strong>Khóa : </strong>{store.state.gradeCode ? store.state.gradeCode : "Không xác định"}</Text>
                    <Text style={{ flex: "1" }} ><strong>Môn học : </strong>{data.coeSubject ? (data.coeSubject.name ? data.coeSubject.name : "Không xác định") : "Không xác định"} </Text>
                </MyFlexRow>

                <Tabs
                    radius={0}
                    value={activeTab}
                    onChange={setActiveTab}
                >
                    <Tabs.List grow justify="space-between">
                        <Tabs.Tab
                            bg={"rgba(131, 204, 235, 0.3)"}
                            color="rgba(131, 204, 235, 1)"
                            value="CGgoal"
                            leftSection={<IconPresentationAnalytics style={iconStyle} />}
                            style={{ padding: "10px" }} // Fixed width
                        >
                            Mục tiêu môn học CG
                        </Tabs.Tab>
                        <Tabs.Tab
                            bg={"rgba(247, 216, 54, 0.3)"}
                            color="rgba(247, 216, 54, 1)"
                            value="CLOoutput"
                            leftSection={<IconArticle style={iconStyle} />}
                            style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                        >
                            <div>Chuẩn đầu ra môn học CLO</div>
                        </Tabs.Tab>
                        <Tabs.Tab
                            bg={"rgba(243, 156, 18, 0.3)"}
                            color="rgba(243, 156, 18, 1)"
                            value="hinhthucdanhgia"
                            leftSection={<IconArticle style={iconStyle} />}
                            style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                        >
                            <div>Hình thức đánh giá CA</div>
                        </Tabs.Tab>
                        <Tabs.Tab
                            bg={"rgba(169, 50, 38, 0.3)"}
                            color="rgba(169, 50, 38, 1)"
                            value="noidungdanhgia"
                            leftSection={<IconArticle style={iconStyle} />}
                            style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                        >Nội dung đánh giá</Tabs.Tab>
                        <Tabs.Tab
                            bg={"rgba(46, 135, 56, 0.3)"}
                            color="rgba(46, 135, 56, 1)"
                            value="phuongphapdanhgia"
                            leftSection={<IconSmartHome style={iconStyle} />}
                            style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                        >
                            <div>Phương pháp đánh giá</div>
                        </Tabs.Tab>
                        <Tabs.Tab
                            bg={"rgba(229, 138, 19, 0.3)"}
                            color="rgb(111, 225, 124)"
                            value="congcudanhgia"
                            leftSection={<IconSmartHome style={iconStyle} />}
                            style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                        >
                            <div>Công cụ đánh giá</div>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="CGgoal">
                        <F_mxmrddxhnz_Read_CGgoal gradeSubjectId={data.id || 0} />
                    </Tabs.Panel>
                    <Tabs.Panel value="CLOoutput">
                        <F_mxmrddxhnz_Read_CLOoutput gradeSubjectId={data.id || 0} />
                    </Tabs.Panel>
                    <Tabs.Panel value="hinhthucdanhgia">
                        <F_mxmrddxhnz_Read_hinhthuc />
                    </Tabs.Panel>
                    <Tabs.Panel value="noidungdanhgia">
                        <GradeSubjectAssessmentTable gradeSubjectId={data.id} />
                    </Tabs.Panel>
                    <Tabs.Panel value="phuongphapdanhgia">
                        <F_mxmrddxhnz_Read_SubjectMethod />
                    </Tabs.Panel>
                    <Tabs.Panel value="congcudanhgia">
                        <F_mxmrddxhnz_Read_SubjectMethodsRobric />
                    </Tabs.Panel>
                </Tabs>
            </MyFlexColumn>


        </MyButtonModal>
    )
}