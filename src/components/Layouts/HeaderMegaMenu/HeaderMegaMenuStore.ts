import { createGenericStore } from "@/stores/S0GenericStore";

interface I {
    name?: string;
}

const useHeaderMegaMenuStore = createGenericStore<I>({
    initialState: { name: "Đăng ký khóa học" },
    storageKey: 'HeaderMegaMenuStore'
});

export default useHeaderMegaMenuStore