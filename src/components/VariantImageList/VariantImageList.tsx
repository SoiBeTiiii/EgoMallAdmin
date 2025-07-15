// components/VariantImageList.tsx
import { Image, SimpleGrid, Paper } from "@mantine/core";

interface VariantImageListProps {
  images: { url: string }[];
}

export default function VariantImageList({ images }: VariantImageListProps) {
  if (!images || images.length === 0) return <>Không có hình ảnh</>;

  return (
    <SimpleGrid cols={4} spacing={8}>
      {images.map((img, i) => (
        <Paper
          key={i}
          shadow="sm"
          radius="md"
          withBorder
          p={4}
        >
          <Image
            src={img.url}
            alt={`Ảnh ${i + 1}`}
            width={50}
            height={50}
            fit="cover"
            radius="sm"
          />
        </Paper>
      ))}
    </SimpleGrid>
  );
}
