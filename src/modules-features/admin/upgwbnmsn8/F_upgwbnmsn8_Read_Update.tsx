import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { Divider, Group, Paper, rem, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArticle, IconPresentationAnalytics } from "@tabler/icons-react";
import { useState } from "react";
import { IF_upgwbnmsn8_Read } from "./F_upgwbnmsn8_Read";
import F_upgwbnmsn8_Tab1_Read from "./F_upgwbnmsn8_Tab1/F_upgwbnmsn8_Tab1_Read";
import F_upgwbnmsn8_Tab2_Read from "./F_upgwbnmsn8_Tab2/F_upgwbnmsn8_Tab2_Read";
import useS_upgwbnmsn8 from "./useS_upgwbnmsn8";

interface I_upgwbnmsn8_Read_Update {
  data: IF_upgwbnmsn8_Read;
  coeGradeSubjectId: number | null;
}

export default function F_upgwbnmsn8_Read_Update({
  data,
  coeGradeSubjectId
}: I_upgwbnmsn8_Read_Update) {
  const store = useS_upgwbnmsn8();
  const dis = useDisclosure()
  const [activeTab, setActiveTab] = useState<string | null>("CG")
  const iconStyle = { width: rem(14), height: rem(14) }

  return (
    <MyButtonModal label="Xem/Cập nhập" title="Chi tiết chuẩn đầu ra môn học" modalSize={'100%'} disclosure={dis}>
      <Paper p={"md"}>
        <Group mb={'sm'} justify="space-between">
          <Text>Chương trình: {store.state.programCode}</Text>
          <Text>Khóa: {store.state.gradeCode}</Text>
          <Text>Môn học: {data.coeSubject?.name}</Text>
        </Group>
        <Divider></Divider>
        <Tabs
          radius={0}
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List grow justify="space-between">
            <Tabs.Tab
              bg={"rgba(131, 204, 235, 0.3)"}
              color="rgba(131, 204, 235, 1)"
              value="CG"
              leftSection={<IconPresentationAnalytics style={iconStyle} />}
              style={{ width: "250px" }}
            >
              Mục tiêu môn học CG
            </Tabs.Tab>
            <Tabs.Tab
              bg={"rgba(247, 216, 54, 0.3)"}
              color="rgba(247, 216, 54, 1)"
              value="CLO"
              leftSection={<IconArticle style={iconStyle} />}
              style={{ width: "250px" }}
            >
              Chuẩn đầu ra môn học CLO
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="CG">
            <F_upgwbnmsn8_Tab1_Read coeGradeSubjectId={coeGradeSubjectId ?? null} />
          </Tabs.Panel>
          <Tabs.Panel value="CLO">
            <F_upgwbnmsn8_Tab2_Read coegradeSubjectId={coeGradeSubjectId ?? null} />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </MyButtonModal>
  )
}