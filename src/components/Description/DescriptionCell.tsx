import { useState } from "react";
import { Button, Collapse, Text } from "@mantine/core";

interface DescriptionCellProps {
  description: string;
}

export default function DescriptionCell({ description }: DescriptionCellProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        variant="subtle"
        size="xs"
        onClick={() => setOpened((o) => !o)}
      >
        {opened ? "Ẩn mô tả" : "Xem mô tả"}
      </Button>

      <Collapse in={opened}>
        <Text size="sm" mt="xs">
          {description || "Không có mô tả"}
        </Text>
      </Collapse>
    </>
  );
}
