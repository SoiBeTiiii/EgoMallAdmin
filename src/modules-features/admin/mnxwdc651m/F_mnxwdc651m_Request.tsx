'use client'

import { Button, Group } from "@mantine/core";
import baseAxios from "@/api/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { useForm } from "@mantine/form";

interface F_mnxwdc651m_RequestProps {
    reason?: string
  uniqueId: string;
  returnStatus: "requested" | "approved" | "rejected" | "completed" | null;
  canApprove: boolean;
  canReject: boolean;
  canComplete: boolean;
  onSuccess?: () => void; // callback refresh data
}

export default function F_mnxwdc651m_Request({
  uniqueId,
  returnStatus,
  canApprove,
  canReject,
  canComplete,
  onSuccess,
}: F_mnxwdc651m_RequestProps) {
    const disc = useDisclosure(false);
  const [loading, setLoading] = useState(false);
    const form = useForm<F_mnxwdc651m_RequestProps>({
      initialValues: {
          uniqueId: "",
          returnStatus: null,
          canApprove: false,
          canReject: false,
          canComplete: false
      }
    })
  const handleAction = async (type: "approve" | "reject" | "complete") => {
    try {
      setLoading(true);
      await baseAxios.post(`/orders/return-${type}/${uniqueId}`);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
      <Group gap="sm">
        {returnStatus === "requested" && (
          <MyButtonModal label="Có yêu cầu trả hàng" crudType="check" title="Đơn hàng chi tiết" disclosure={disc}>
            <MyTextArea placeholder="Yêu cầu trả hàng" {...form.getInputProps("reason")} />
            {canApprove && (
              <MyButton
              type="submit"
                crudType="default"
                color="green"
                loading={loading}
                onClick={() => handleAction("approve")}
              >
                Duyệt trả hàng
              </MyButton>
            )}
            {canReject && (
              <MyButton
                crudType="default"
                color="red"
                loading={loading}
                onClick={() => handleAction("reject")}
              >
                Từ chối
              </MyButton>
            )}
          </MyButtonModal>
        )}

        {returnStatus === "approved" && canComplete && (
          <MyButton
            crudType="default"
            color="blue"
            loading={loading}
            onClick={() => handleAction("complete")}
          >
            Hoàn tất
          </MyButton>
        )}

        {(returnStatus === "rejected" || returnStatus === "completed") && (
          <MyButton crudType="default" variant="light" disabled>
            Đã {returnStatus === "rejected" ? "từ chối" : "hoàn tất"}
          </MyButton>
        )}
        {(returnStatus === null) && (
          <MyButton crudType="default" variant="light" disabled>
            không có yêu cầu
          </MyButton>
        )}
      </Group>
  );
}
