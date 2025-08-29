import { useState } from "react";
import axios from "axios";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { notifications } from "@mantine/notifications";

interface Props {
  onChange: (url: string) => void; // chỉ trả URL ảnh sau khi upload
  uploadToken: string;
  folder?: string;
  label?: string;
}

export default function SingleImageUploader({
  onChange,
  uploadToken,
  folder = "egomall/blogs",
  label,
}: Props) {
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleUpload = async (file: File) => {
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
        onChange(uploadedUrl); // chỉ trả URL ảnh về text editor
        notifications.show({ title: "Thành công", message: response.data.message, color: "green" });
      }
    } catch (err: any) {
      const errorMsg = `${err.response?.data?.errors?.upload_token?.[0] || "Upload thất bại"}`;
      notifications.show({ title: "Lỗi", message: errorMsg, color: "red" });
    } finally {
      // reset input sau khi upload xong
      setFileInputKey(Date.now());
    }
  };

  return (
    <MyFileInput
      key={fileInputKey}
      accept="image/*"
      label={label}
      onChange={(file) => {
        if (file) handleUpload(file);
      }}
    />
  );
}
