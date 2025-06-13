import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COECourseSectionStudent_GetStudentByCourseSection from "@/hooks/query-hooks/COECourseSectionStudent/useQ_COECourseSectionStudent_GetStudentByCourseSection";
import useS_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/useS_Shared_FilterGrade";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import useS_nugmpmukta from "../useS_nugmpmukta";
import F_nugmpmukta_ViewUpdate_Delete from "./F_nugmpmukta_ViewUpdate_Delete";
import F_nugmpmukta_ViewUpdate_Form from "./F_nugmpmukta_ViewUpdate_Form";

export default function F_nugmpmukta_ViewUpdate({ values }: { values?: ICOECourseSection }) {
    const disc = useDisclosure()
    const FilterGradeStore = useS_Shared_FilterGrade()
    const store = useS_nugmpmukta()
    const query = useQ_COECourseSectionStudent_GetStudentByCourseSection({
        params: "?COECourseSectionId=" + values?.id,
        options: {
            enabled: disc[0]
        }
    })
    useEffect(() => {
        if (disc[0] == true) {
            store.setProperty("subject", {
                id: values?.coeGradeSubject?.coeSubject?.id,
                code: values?.coeGradeSubject?.coeSubject?.code,
                name: values?.coeGradeSubject?.coeSubject?.name
            })
        }
    }, [disc[0]])
    const columns = useMemo<MRT_ColumnDef<ICoeCourseSectionStudent>[]>(() => [
        {
            header: "Mã môn học",
            accessorFn: () => {
                return store.state.subject?.code
            }
        },
        {
            header: "Tên môn học",
            accessorFn: () => {
                return store.state.subject?.name
            }
        },
        {
            header: "Mã sinh viên",
            accessorFn: (row) => {
                return row.user?.code
            }
        },
        {
            header: "Họ tên",
            accessorFn: (row) => {
                return row.user?.fullName
            }
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
            }
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender"
        },
        {
            header: "Mã lớp",
            accessorKey: "coeCourseSection.code"
        },
        {
            header: "Tên lớp",
            accessorKey: "coeCourseSection.name"
        },
        {
            header: "Mã khóa",
            accessorFn: () => {
                return FilterGradeStore.state.grade?.code
            }
        },
        {
            header: "Tên khóa",
            accessorFn: () => {
                return FilterGradeStore.state.grade?.name
            }
        }
    ], [store.state])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyButtonModal
            label="Xem/ Cập nhật"
            disclosure={disc}
            title="Danh sách sinh viên"
            modalSize={"80%"}
        >
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_nugmpmukta_ViewUpdate_Form />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_nugmpmukta_ViewUpdate_Delete />
                    </MyCenterFull>
                )}
            />
        </MyButtonModal>
    )
}
