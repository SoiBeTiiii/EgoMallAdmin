"use client";

import MyCardioLoader from "@/components/Loaders/MyCardioLoader";
import { cn } from "@/lib/utils";
import { Center, Space, Text } from "@mantine/core";
import { MyBoxesCore } from "./MyBoxes";

// Default values shown

export default function MyBoxesBackground({ title, desc = "Được phát triển bởi Nhóm EGOMall." }: { title: string, desc?: string }) {
    return (
        <div className="h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <MyBoxesCore />
            <Center className="z-20">
                <MyCardioLoader />
            </Center>
            <Space my={7} />
            <Center>
                <Text className="z-20" fs="italic" fw={"bold"} c={"white"}>
                    Đang tải...
                </Text>
            </Center>
            <Space my={7} />
            <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
                {title}
            </h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">{desc}</p>
        </div>
    );
}
