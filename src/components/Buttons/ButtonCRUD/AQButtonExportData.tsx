import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import * as XLSX from "xlsx";

interface FieldConfig {
    fieldName: string; // Field name in the data
    header: string; // Header name for the export
    formatFunction?: (value: any, row: any) => any; // Optional formatting function
}

interface ExportConfig {
    fields: FieldConfig[]; // Array of field configurations
}

interface AQButtonExportDataProps {
    isAllData: boolean
    objectName: string;
    data: any[];
    exportConfig: ExportConfig;
}

export default function AQButtonExportData({
    isAllData,
    objectName,
    data,
    exportConfig
}: AQButtonExportDataProps) {
    const handleExport = () => {
        // Process data with formatting functions
        const processedData = data.map((row) => {
            const newRow: any = {};
            exportConfig.fields.forEach(({ fieldName, formatFunction }) => {
                newRow[fieldName] = formatFunction ? formatFunction(row[fieldName], row) : row[fieldName];
            });
            return newRow;
        });

        // Map headers to new labels
        const headers: { [key: string]: string } = {};
        exportConfig.fields.forEach(({ fieldName, header }) => {
            headers[fieldName] = header;
        });

        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(processedData);

        // Rename headers in the worksheet
        const headerRow = exportConfig.fields.map(({ fieldName }) => headers[fieldName]);
        XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A1" });

        // Export worksheet as an Excel file
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");

        // Trigger the download
        XLSX.writeFile(workbook, `${objectName}.xlsx`);
    };

    return (
        <Button
            disabled={data.length === 0}
            variant="filled"
            color="teal"
            onClick={(event) => {
                event.preventDefault();
                handleExport();
            }}
            leftSection={<IconDownload />}
        >
            {/* {isAllData ? "Xuất toàn bộ dữ liệu" : "Xuất dữ liệu được chọn"} */}
            {"Export"}
        </Button>
    );
}

