import ExcelJS from "exceljs";
import saveAs from "file-saver";

// Interface định nghĩa cấu trúc cột
export interface IUtils_Excel_ColumnConfig<T> {
    fieldKey: keyof T;  // fieldKey phải là key của interface T
    fieldName: string;
    isRequired?: boolean;
}

export async function utils_excel_exportExcel<T extends Record<string, any>>({
    workbook,
    sheetName,
    data,
    config,
}: {
    workbook: ExcelJS.Workbook,
    sheetName: string,
    data: T[],
    config: IUtils_Excel_ColumnConfig<T>[]
}) {
    // Thêm 1 sheet mới
    const sheet = workbook.addWorksheet(sheetName);

    // Extract field names and create mappings from config
    const fieldNames: string[] = config.map(item => String(item.fieldKey));
    const headerMappings: Record<string, string> = {};
    const markedColumns: string[] = [];

    config.forEach(item => {
        const fieldKeyStr = String(item.fieldKey);
        headerMappings[fieldKeyStr] = item.fieldName;
        if (item.isRequired) {
            markedColumns.push(fieldKeyStr);
        }
    });

    // Create columns configuration
    const columns = fieldNames.map(fieldName => {
        return {
            key: fieldName,
            width: 20
        };
    });

    sheet.columns = columns;

    // Create first row with display names (values from headerMappings)
    const displayRow = sheet.addRow(
        fieldNames.map(fieldName => {
            // Get display name from headerMappings
            const displayName = headerMappings[fieldName] || fieldName;
            // Add a red asterisk to marked columns
            return markedColumns.includes(fieldName) ? `${displayName} *` : displayName;
        })
    );

    // Create second row with field names (keys)
    const keyRow = sheet.addRow(fieldNames);

    // Add data rows starting from the third row (if any)
    data.forEach(item => {
        const rowData: any = {};
        fieldNames.forEach(field => {
            rowData[field] = item[field];
        });
        sheet.addRow(rowData);
    });

    // Style the first row (display names) - only for columns with data
    for (let i = 1; i <= fieldNames.length; i++) {
        const cell = displayRow.getCell(i);
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }  // Light gray background
        };
    }

    // Style the second row (field names) - only for columns with data
    for (let i = 1; i <= fieldNames.length; i++) {
        const cell = keyRow.getCell(i);
        cell.font = { italic: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F0F0' }  // Lighter gray background
        };
    }

    // Apply red color to asterisks in header cells
    if (markedColumns.length > 0) {
        for (let i = 1; i <= fieldNames.length; i++) {
            const cell = displayRow.getCell(i);
            const text = cell.value;

            if (typeof text === 'string' && text.endsWith(' *')) {
                // Use rich text to apply red color only to the asterisk
                cell.value = {
                    richText: [
                        {
                            text: text.substring(0, text.length - 2),
                            font: { bold: true }
                        },
                        {
                            text: ' *',
                            font: { bold: true, color: { argb: 'FFFF0000' } }  // Red color
                        }
                    ]
                };
            }
        }
    }
    return workbook;
}

export async function utils_excel_download({
    workbook,
    name
}: {
    workbook: ExcelJS.Workbook,
    name: string
}) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(blob, name);
}