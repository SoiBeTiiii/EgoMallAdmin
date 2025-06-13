import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useDisclosure } from "@mantine/hooks";

export default function F_nugmpmukta_ViewUpdate_Delete() {
    const disc = useDisclosure()
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/")} />
    )
}
