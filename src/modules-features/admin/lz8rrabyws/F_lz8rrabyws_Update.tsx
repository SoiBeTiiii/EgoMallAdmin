import baseAxios from '@/api/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { Button, Group, Tabs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import F_lz8rrabyws_PIs_Adjustment from './PIs_Adjustment/F_lz8rrabyws_PIs_Adjustment';
import F_lz8rrabyws_PLO_Adjustment from './PLO_Adjustment/F_lz8rrabyws_PLO_Adjustment';

interface IF_lz8rrabyws_Read {
    id?: number;
    code?: string;
    name?: string;
    courseCode?: string;
    falcutyCode?: string;
    PLOCode?: string;
    PLOPercentage?: number;
    descriptionPage1?: string;
    PIsCode?: string;
    PIsPercentage?: number;
    descriptionPage2?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_lz8rrabyws_Update({ id, name, code }: { id: number, name: string, code: string }) {
    const dis = useDisclosure()
    

    return (
        <MyButtonModal modalSize={"90%"} disclosure={dis} label='Cập nhật' title='Chi tiết chuẩn đầu ra chương trình đào tạo'>
            <Group>
                <Text>Chương trình: {name} </Text>
                <Text>Khoá: {code || ""} </Text>
            </Group>
            <Tabs variant='pills' defaultValue="chuanDauRaPLO" >
                <Tabs.List>
                    <Tabs.Tab value="chuanDauRaPLO">Chuẩn đầu ra PLO</Tabs.Tab>
                    <Tabs.Tab value="chiSoThucHienPIs">Chỉ số thực hiện PIs</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="chuanDauRaPLO"><F_lz8rrabyws_PLO_Adjustment id={id} /></Tabs.Panel>
                <Tabs.Panel value="chiSoThucHienPIs"><F_lz8rrabyws_PIs_Adjustment id={id} /></Tabs.Panel>
            </Tabs>

        </MyButtonModal>
    )
}
