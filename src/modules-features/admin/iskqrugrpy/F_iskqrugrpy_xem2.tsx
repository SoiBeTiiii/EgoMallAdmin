
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I_iskqrugrpy_xem2 {
    id?: number;         
    evaluationComponent?: string; // Thành phần đánh giá
    assignment?: string;          // Bài đánh giá
    timing?: string;              
    clo?: string;                 
    plo?: string;                
    weight?: string;              // Tỷ lệ
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const exampleData: I_iskqrugrpy_xem2[] = [
    {
        evaluationComponent: "Quá trình", assignment: "Thảo luận", timing: "Sau chương 2", clo: "CLO3", plo: "PLO1", weight: "10%", nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        evaluationComponent: "Quá trình", assignment: "Bài tập thực hành", timing: "Sau chương 7", clo: "CLO1", plo: "PLO1", weight: "10%", nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        evaluationComponent: "Giữa kỳ", assignment: "Tự luận", timing: "Sau chương 4", clo: "CLO2", plo: "PLO1", weight: "30%", nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
    {
        evaluationComponent: "Cuối kỳ", assignment: "Trắc nghiệm", timing: "Khi thi hết môn", clo: "CLO1", plo: "PLO1", weight: "50%", nguoiCapNhat: 'Admin',
        ngayCapNhat: new Date('2024-12-20'),
    },
];

export default function F_iskqrugrpy_xem2() {
    const disc = useDisclosure(false);

    const columns = useMemo<MRT_ColumnDef<I_iskqrugrpy_xem2>[]>(() => [
        { header: "Thành phần đánh giá", accessorKey: "evaluationComponent" },
        { header: "Bài đánh giá", accessorKey: "assignment" },
        { header: "Thời điểm", accessorKey: "timing" },
        { header: "CLO", accessorKey: "clo", size: 100 },
        { header: "PLO", accessorKey: "plo", size: 100 },
        { header: "Tỷ lệ", accessorKey: "weight", size: 100 },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    return (
        <MyButtonModal
            label="Xem"
            modalSize="100%"
            disclosure={disc}
            title="Ma trận đánh giá kêt kết quả môn học"
        >
            <MyFlexRow style={{ justifyContent: "space-evenly", alignItems: "center" }}>
                <Text >
                    Khóa: Ngôn ngữ Anh 2024
                </Text>
                <Text >
                    Môn: Tiếng Anh thương mại
                </Text>
            </MyFlexRow>


            <MyDataTable
                exportAble
                columns={columns}
                data={exampleData}
                enableRowSelection
            />
        </MyButtonModal>
    );
}
