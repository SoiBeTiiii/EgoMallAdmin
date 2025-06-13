import { createGenericStore } from "@/stores/S0GenericStore";

export interface I_core83092_RolePermission {
    pageId?: number;
    isCreate?: boolean;
    isUpdate?: boolean;
    isDelete?: boolean;
    isRead?: boolean;
    isPrint?: boolean;
    isExport?: boolean;
}

interface I {
    roleId?: number
    rolePermissions?: I_core83092_RolePermission[]
}

const useStore = createGenericStore<I>({
    initialState: { roleId: 0 },
    storageKey: "useS_core83092"
});
export default function useS_core83092() {
    const store = useStore()
    function toogleAllPermissionWithType(field: keyof I_core83092_RolePermission, isCheck: boolean) {
        const updatedData = store.state.rolePermissions?.map(item => ({
            ...item,
            [field]: isCheck
        }))
        store.setProperty("rolePermissions", updatedData)
    }
    function findByPageId(pageId: number): I_core83092_RolePermission | undefined {
        const rolePermission = store.state.rolePermissions?.find(item => item.pageId == pageId)
        return rolePermission
    }
    function updatePermission(pageId: number, updatedPermission: Partial<I_core83092_RolePermission>) {
        const updatedData = store.state.rolePermissions?.map(item =>
            item.pageId === pageId ? { ...item, ...updatedPermission } : item
        );
        store.setProperty("rolePermissions", updatedData);
    }
    function isAllPermission(field: keyof I_core83092_RolePermission): boolean {
        return store.state.rolePermissions?.every(item => item[field] === true) ?? false;
    }
    return {
        ...store,
        toogleAllPermissionWithType,
        findByPageId,
        updatePermission,
        isAllPermission
    };
}


export function utils_core83092_mergePage(arr1: I_core83092_RolePermission[], arr2: I_core83092_RolePermission[]): I_core83092_RolePermission[] {
    const pageMap = new Map<number, I_core83092_RolePermission>();

    // Đưa tất cả object từ arr1 vào Map
    arr1.forEach(page => pageMap.set(page.pageId!, page));

    // Chỉ thay thế nếu id đã tồn tại trong arr1
    arr2.forEach(page => {
        if (pageMap.has(page.pageId!)) {
            pageMap.set(page.pageId!, page); // Ghi đè object từ arr2
        }
    });

    // Chuyển Map thành mảng kết quả
    return Array.from(pageMap.values());
}

