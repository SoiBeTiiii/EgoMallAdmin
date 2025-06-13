'use client'
import MyButtonImport from '@/components/Buttons/ButtonImport/MyButtonImport';
import useS_ButtonImport from '@/components/Buttons/ButtonImport/useS_ButtonImport';
import { IUtils_Excel_ColumnConfig, utils_excel_download, utils_excel_exportExcel } from '@/utils/excel';
import { Center } from '@mantine/core';
import '@schedule-x/theme-default/dist/index.css';
import ExcelJS from "exceljs";
import { useEffect } from 'react';
interface I {
    userId?: number,
    subjectId?: number,
    content?: string
}
const config: IUtils_Excel_ColumnConfig<I>[] = [
    {
        fieldKey: "userId",
        fieldName: "Mã người dùng",
        isRequired: true
    },
    {
        fieldKey: "subjectId",
        fieldName: "Mã môn học",
        isRequired: true
    },
    {
        fieldKey: "content",
        fieldName: "Nội dung",
        isRequired: true
    },
]
function CalendarApp() {
    const store = useS_ButtonImport()
    async function handleExportStructure() {
        const workbook = new ExcelJS.Workbook();
        await utils_excel_exportExcel<I>({
            workbook: workbook,
            sheetName: "Sinh viên",
            data: [],
            config: config
        })
        // Generate and download the Excel file
        utils_excel_download({ name: "Sinh viên", workbook })
    }
    useEffect(() => {
        store.setProperty("fieldConfig", config)
    }, [])
    return (
        <Center h={'100vh'}>
            <MyButtonImport
                onExportStructure={handleExportStructure}
                onImport={(values) => {
                    console.log(values);
                }}
            />

        </Center>
    )
}

export default CalendarApp