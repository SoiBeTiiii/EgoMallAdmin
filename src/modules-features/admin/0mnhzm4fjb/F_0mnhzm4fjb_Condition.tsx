import MySelect from "@/components/Combobox/Select/MySelect";
import { Group } from "@mantine/core";

export default function F_0mnhzm4fjb_Condition() {
    return (
        <Group>
            <MySelect label="Chương trình" data={['CKCT - Cơ khí đào tạo']} defaultValue={'CKCT - Cơ khí đào tạo'} />
            <MySelect label="Khóa" data={['CKCT24']} defaultValue={'CKCT24'} />
            <MySelect label="Môn học" data={['Chế tạo máy']} defaultValue={'Chế tạo máy'} />
        </Group>
    )
}
