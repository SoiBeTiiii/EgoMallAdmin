import { createGenericStore } from "@/stores/S0GenericStore";
import { IUtils_Excel_ColumnConfig } from "@/utils/excel";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import * as XLSX from 'xlsx';

interface IFieldConfig extends IUtils_Excel_ColumnConfig<any> {
    isSelected?: boolean
    fieldToMap?: string
}

interface I {
    file?: File | null
    title?: string[]
    data?: any[]
    startTitleIndex?: string | number
    startDataIndex?: string | number
    fieldConfig?: IFieldConfig[]
}
const useStore = createGenericStore<I>({
    initialState: {
        data: [],
        title: [],
        startTitleIndex: 2,
        startDataIndex: 3,
    },
})

export default function useS_ButtonImport() {
    const store = useStore()

    function autoMap() {
        if (!store.state.data || !store.state.data.length || !store.state.fieldConfig) return;

        const sampleRow = store.state.data[0];

        const updatedFieldConfig = store.state.fieldConfig.map((config) => {
            const matchingKey = Object.keys(sampleRow).find((key) =>
                key.toLowerCase().trim() === config.fieldKey.toString().toLowerCase().trim()
            );

            if (matchingKey) {
                return {
                    ...config,
                    fieldToMap: matchingKey,
                    isSelected: true,
                };
            }

            return config;
        });

        store.setProperty("fieldConfig", updatedFieldConfig);
    }

    function getDataFinal<T>(): T[] {
        const finalData: T[] = [];

        store.state.data!.forEach((row) => {
            const rowData: Record<string, any> = {};

            store.state.fieldConfig!.forEach((colConfig) => {
                if (colConfig.isSelected) {
                    const key = colConfig.fieldKey;
                    const sourceKey = colConfig.fieldToMap || key;

                    rowData[key as string] = row[sourceKey as string];
                }
            });

            finalData.push(rowData as T);
        });

        return finalData;
    }

    function changeAllSelected(isSelected: boolean) {
        store.setProperty("fieldConfig", store.state.fieldConfig?.map(item => ({
            ...item,
            isSelected
        })))
    }

    function changeSelected(fieldKey: string, isSelected: boolean) {
        if (!store.state.fieldConfig) {
            store.setProperty("fieldConfig", []);
        }

        const existingFieldConfigIndex = store.state.fieldConfig!.findIndex(
            config => config.fieldKey === fieldKey
        );

        if (existingFieldConfigIndex !== -1) {
            // Update existing field config
            const updatedFieldConfig = [...store.state.fieldConfig!];
            updatedFieldConfig[existingFieldConfigIndex] = {
                ...updatedFieldConfig[existingFieldConfigIndex],
                isSelected
            };
            store.setProperty("fieldConfig", updatedFieldConfig);
        } else {
            // Field config doesn't exist yet, find the field name from titles
            const fieldName = store.state.title?.find(title => title === fieldKey) || fieldKey;

            // Create new field config
            const updatedFieldConfig = [
                ...store.state.fieldConfig!,
                {
                    fieldKey: fieldKey as any,
                    fieldName,
                    isSelected
                }
            ];
            store.setProperty("fieldConfig", updatedFieldConfig);
        }
    }
    function setFieldToMap(fieldKey: string, fieldToMap: string) {
        if (!store.state.fieldConfig) {
            store.setProperty("fieldConfig", []);
        }

        const existingFieldConfigIndex = store.state.fieldConfig!.findIndex(
            config => config.fieldKey === fieldKey
        );

        if (existingFieldConfigIndex !== -1) {
            // Update existing field config
            const updatedFieldConfig = [...store.state.fieldConfig!];
            updatedFieldConfig[existingFieldConfigIndex] = {
                ...updatedFieldConfig[existingFieldConfigIndex],
                fieldToMap
            };
            store.setProperty("fieldConfig", updatedFieldConfig);
        } else {
            // Field config doesn't exist yet, find the field name from titles
            const fieldName = store.state.title?.find(title => title === fieldKey) || fieldKey;

            // Create new field config
            const updatedFieldConfig = [
                ...store.state.fieldConfig!,
                {
                    fieldKey: fieldKey as any,
                    fieldName,
                    fieldToMap
                }
            ];
            store.setProperty("fieldConfig", updatedFieldConfig);
        }
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        ...(store.state.title?.map(item => ({
            header: item!,
            accessorKey: item!
        }) as MRT_ColumnDef<any>) || [])
    ], [store.state.title])
    useEffect(() => {
        if (store.state.file == null) {
            store.resetState()
        }
        // Handle file change
        if (!store.state.file) return

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result;
            if (!binaryStr) return

            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
            const sheet = workbook.Sheets[sheetName]; // Lấy sheet đầu tiên

            const dataBook = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][]
            const data = XLSX.utils.sheet_to_json(sheet, { range: 1 }) as any// Đọc dữ liệu dạng mảng 2D\

            if (data.lenght == 0) return
            store.setProperty("title", dataBook[1])
            store.setProperty("data", data)
        };
        reader.readAsArrayBuffer(store.state.file!);
    }, [store.state.file])

    useEffect(() => {
        if (store.state.data?.length == 0) return
        autoMap()
    }, [store.state.data])
    return {
        ...store,
        columns,
        changeSelected,
        setFieldToMap,
        getDataFinal,
        changeAllSelected,
        autoMap
    }
}