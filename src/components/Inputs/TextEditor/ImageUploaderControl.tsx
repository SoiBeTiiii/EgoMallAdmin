import { useState } from "react";
import { Modal } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import ImageUploaderBox from "@/components/ImageUploaderBox/blogs/ImageUploaderBox";
import { RichTextEditor } from "@mantine/tiptap";

export default function ImageUploaderControl({
  editor,
  uploadToken,
}: {
  editor: any;
  uploadToken: string;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      
      <RichTextEditor.Control
        aria-label="Upload image"
        title="Upload image"
        onClick={() => setOpened(true)}
      >
        <IconPhoto size={16} />
      </RichTextEditor.Control>

      {/* Modal để chọn ảnh */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Chèn ảnh"
        centered
        size="sm"
        overlayProps={{
          blur: 3,
          opacity: 0.4,
        }}
      >
        <ImageUploaderBox
          uploadToken={uploadToken}
          onChange={(file: string | File) => {
            const url =
              typeof file === "string" ? file : URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: url }).run();
            setOpened(false);
          }}
        />
      </Modal>
    </>
  );
}
