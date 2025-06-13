"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import MyTab from "@/components/Layouts/Tab/MyTab";
import { OBJECT_DOCUMENT_TYPES } from "@/constants/object/documentTypes";
import F_core18256_Read from "@/modules-features/admin/(core)/core18256/F_core18256_Read";
import { Tabs } from "@mantine/core";

const tabData = [
    { label: "1. Văn bản quy định" },
    { label: "2. Quy trình xử lý công việc" },
    { label: "3. Danh mục biểu mẫu" },
];

export default function Page() {
    return (
        <MyPageContent>
            <MyTab tabList={tabData}>
                <Tabs.Panel value="1. Văn bản quy định">
                    <F_core18256_Read documentType={OBJECT_DOCUMENT_TYPES.Regulations} />
                </Tabs.Panel>
                <Tabs.Panel value="2. Quy trình xử lý công việc">
                    <F_core18256_Read documentType={OBJECT_DOCUMENT_TYPES.Workflow} />
                </Tabs.Panel>
                <Tabs.Panel value="3. Danh mục biểu mẫu">
                    <F_core18256_Read documentType={OBJECT_DOCUMENT_TYPES.Form} />
                </Tabs.Panel>
            </MyTab>
        </MyPageContent>
    );
}
