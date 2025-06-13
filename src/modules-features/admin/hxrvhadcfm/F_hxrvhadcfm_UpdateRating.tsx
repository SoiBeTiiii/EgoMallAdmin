import { MyButton } from "@/components/Buttons/Button/MyButton";
import useM_COEGrade_CLOPIRating from "@/hooks/mutation-hooks/COEGrade/useM_COEGrade_CLOPIRating";
import useS_hxrvhadcfm from "./useS_hxrvhadcfm";

export default function F_hxrvhadcfm_UpdateRating() {
    const mutation = useM_COEGrade_CLOPIRating()
    const store = useS_hxrvhadcfm()
    return (
        <MyButton crudType="save" onClick={() => {
            mutation.mutate(Object.values(store.state.edited!))
        }} />
    )
}
