'use client'
import { Button, Modal, useModalsStack } from "@mantine/core";
import { IconFileImport } from "@tabler/icons-react";
import SelectFieldModal from "./SelectFieldModal";
import SelectFileModal, { SelectFileModalProps } from "./SelectFileModal";
import useS_ButtonImport from "./useS_ButtonImport";

interface MyButtonImportProps extends Omit<SelectFileModalProps, "stack"> {
    onImport: (data: any) => void
}

export default function MyButtonImport({
    onExportStructure,
    onImport
}:
    MyButtonImportProps
) {
    const stack = useModalsStack(['select-file-page', 'select-field-page', 'implement-page']);
    const store = useS_ButtonImport()
    return (
        <>
            <Button color="teal.8" onClick={() => stack.open('select-file-page')} leftSection={<IconFileImport />} title="Import" >Import</Button>
            <Modal.Stack>
                <SelectFileModal stack={stack} onExportStructure={onExportStructure} />
                <SelectFieldModal stack={stack} onImport={() => onImport(store.getDataFinal())} />
            </Modal.Stack>
        </>
    )
}
