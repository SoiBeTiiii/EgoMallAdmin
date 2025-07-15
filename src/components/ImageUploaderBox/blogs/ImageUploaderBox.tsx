import { useEffect, useState } from "react";
import { Box, Button, Loader, Skeleton, Text } from "@mantine/core";
import Image from "next/image";
import axios from "axios";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { notifications } from "@mantine/notifications";

interface Props {
  img: { url: string | File };
  onChange: (file: File | string) => void;
  onRemove?: () => void;
  imgIdx?: number;
  uploadToken: string;
  folder?: string;
  label?: string;
  width?: number;
  height?: number;
  previewShape?: "square" | "circle";
  showRemoveButton?: boolean;
}

export default function ImageUploaderBox({
  img,
  onChange,
  onRemove,
  imgIdx,
  uploadToken,
  folder = "egomall/blogs",
  label,
  width = 100,
  height = 100,
  previewShape = "square",
  showRemoveButton = true,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());

 useEffect(() => {
  if (!preview && typeof img.url === "string") {
    setPreview(img.url);
  }
}, [preview,img.url]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_token", uploadToken);
    formData.append("folder", folder);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_UPLOAD}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl: string = response.data.data.url;
      if (uploadedUrl) {
        setPreview(uploadedUrl);
        const preloadImg = new window.Image();
        preloadImg.src = uploadedUrl;
        preloadImg.onload = () => {
          onChange(uploadedUrl);
        };
        notifications.show({ title: "Thành công", message: response.data.message, color: "green" });
      }
    } catch (err: any) {
      const errorMsg = `${err.response?.data?.errors?.upload_token?.[0] || "Upload thất bại"}`;
      notifications.show({ title: "Lỗi", message: errorMsg, color: "red" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFileInputKey(Date.now()); // reset input
    onRemove?.();
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
       {isUploading ? (
          <Skeleton height={100} width={100} radius="md" />
        ) : preview ? (
          <Image
            src={preview}
            alt={`Ảnh ${typeof imgIdx === "number" ? imgIdx + 1 : ""}`}
            width={width}
            height={height}
            style={{
              objectFit: "cover",
              borderRadius: previewShape === "circle" ? "50%" : 8,
              border: "1px solid #ccc",
            }}
          />
        ) : null}

      <MyFileInput
        key={fileInputKey}
        accept="image/*"
        label={label}
        onChange={(file) => {
          if (file) handleUpload(file);
        }}
      />

      {showRemoveButton && handleRemove && (
        <Button
          color="red"
          variant="light"
          size="xs"
          mt={4}
          onClick={handleRemove}
          disabled={isUploading}
        >
          Xoá
        </Button>
      )}
    </Box>
  );
}
