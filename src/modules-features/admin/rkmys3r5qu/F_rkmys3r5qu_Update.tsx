import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Group, Tabs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_rkmys3r5qu_PIs_Adjustment from './PIs_Adjustment/F_rkmys3r5qu_PIs_Adjustment';
import F_rkmys3r5qu_PLO_Adjustment from './PLO_Adjustment/F_rkmys3r5qu_PLO_Adjustment';
interface IF_rkmys3r5qu_Read {
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
export default function F_rkmys3r5qu_Update({ data }: { data: IF_rkmys3r5qu_Read }) {
    const dis = useDisclosure()
    const [activeTab, setActiveTab] = useState<string | null>('chuanDauRaPLO');
    console.dir(data)
    const chuanDauRaPLOColumns = useMemo<MRT_ColumnDef<IF_rkmys3r5qu_Read>[]>(
        () => [

            {
                header: "Mã PLO",
                accessorKey: "PLOCode"
            },
            {
                header: "Tỷ trọng PLO (%)",
                accessorKey: "PLOPercentage",
                accessorFn: (originalRow) => `${originalRow.PLOPercentage}%`,
            },
            {
                header: "Mô tả PLO",
                accessorKey: "descriptionPage1"
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
            },
        ],
        []
    );

    return (
        <MyButtonModal modalSize={"90%"} disclosure={dis} label='Cập nhật' title='Chi tiết chuẩn đầu ra chương trình đào tạo'>
            <Group>
                <Text>Chương trình: {data.code} - {data.name} </Text>
                <Text>Khoá: {data.courseCode} </Text>
            </Group>
            <Tabs variant='pills' value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="chuanDauRaPLO">Chuẩn đầu ra PLO</Tabs.Tab>
                    <Tabs.Tab value="chiSoThucHienPIs">Chỉ số thực hiện PIs</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="chuanDauRaPLO"><F_rkmys3r5qu_PLO_Adjustment /></Tabs.Panel>
                <Tabs.Panel value="chiSoThucHienPIs"><F_rkmys3r5qu_PIs_Adjustment /></Tabs.Panel>
            </Tabs>

        </MyButtonModal>
    )
}
