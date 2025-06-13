import { ActionIcon } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload } from "@tabler/icons-react";
import { useRef } from "react";

export default function MyActionIconUpload() {
    const openRef = useRef<() => void>(null);
    return (
        <Dropzone
            openRef={openRef}
            onDrop={() => { }}
            radius="md"

            accept={[MIME_TYPES.pdf]}
        >
            <ActionIcon><IconCloudUpload /></ActionIcon>
        </Dropzone>
    )
}
