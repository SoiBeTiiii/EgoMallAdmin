import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import useS_nugmpmukta from "../useS_nugmpmukta";

export default function F_nugmpmukta_ViewUpdate_Form({ values }: { values?: ICoeCourseSectionStudent }) {
    const disc = useDisclosure()
    const store = useS_nugmpmukta()
    const query = useQuery<IUser[]>({
        queryKey: ["F_nugmpmukta_ViewUpdate_Form", values],
        queryFn: async () => {
            return [
                { id: 1, code: "207PM65483", name: "Trần Quốc Thiệu" },
                { id: 2, code: "207PM09856", name: "Phạm Minh Lâm" },
                { id: 3, code: "207PM42123", name: "Nguyễn Hữu Luân" }
            ]
        }
    })
    return (
        <MyButtonModal title="Chi tiết sinh viên đăng ký môn học" crudType="create" disclosure={disc}>
            <form>
                <MyFlexColumn>
                    <MyTextInput label="Môn học" readOnly variant="filled" value={store.state.subject?.name} />
                    {/* <MySelect label="Mã sinh viên" data={query.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.code!
                    }))} /> */}
                    <MyTextInput label="Họ tên" readOnly variant="filled" />
                    <MyDateInput label="Ngày sinh" readOnly variant="filled" />
                    <MySelect label="Giới tính" readOnly variant="filled" data={utils_converter_enumToOptions(ENUM_GENDER)} />
                    <MyTextInput label="Lớp" readOnly variant="filled" />
                    <MyButton crudType="save" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
