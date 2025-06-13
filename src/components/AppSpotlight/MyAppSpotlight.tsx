"use client";

import { useS0Sidebar } from '@/stores/S0Sidebar';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { I0LinkItem } from '../Layouts/BasicAppShell/BasicAppShell';

// Hàm đệ quy để chuyển đổi menu thành các action cho Spotlight
function convertMenuToSpotlightActions(
    items: I0LinkItem[],
    router: any,
    parentPath: string = '',
    sideBarStore: any,
    pathName: string
): any[] {
    let actions: any[] = [];

    items.forEach(item => {
        // Nếu có link, thêm action cho item này
        if (item.link) {
            actions.push({
                id: item.label.toLowerCase().replace(/\s+/g, '-'),
                label: item.label,
                description: `Chuyển đến ${item.label} (Code: ${item.link})`,
                onClick: () => {
                    sideBarStore.setTitle(item.label);
                    sideBarStore.setMenuCode(item.link);
                    router.push(pathName.split("/")[0] + "/" + pathName.split("/")[1] + "/" + item.link);
                    spotlight.close();
                },
                rightSection: item.status ?
                    (item.status === 'Prototype' ? 'P' :
                        item.status === 'New' ? 'N' :
                            item.status === 'Menu' ? 'M' : null)
                    : null
            });
        }

        // Nếu có submenu, gọi đệ quy để thêm các action con
        if (item.links) {
            actions = actions.concat(
                convertMenuToSpotlightActions(item.links, router, item.link || '', sideBarStore, pathName)
            );
        }
    });

    return actions;
}

export function MyAppSpotlight({ menu }: { menu: I0LinkItem[] }) {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const pathName = usePathname()
    const sideBarStore = useS0Sidebar();  // Get the sidebar store here

    // Chuyển đổi menu thành các action một lần để tối ưu hiệu suất
    const spotlightActions = useMemo(() =>
        convertMenuToSpotlightActions(menu, router, '', sideBarStore, pathName),
        [menu, router, sideBarStore]  // Add sideBarStore to the dependency array
    );

    return (
        <Spotlight
            actions={spotlightActions}
            query={query}
            scrollable
            maxHeight={800}
            onQueryChange={setQuery}
            shortcut={['mod + K', '/']} // Hỗ trợ Ctrl/Cmd + K và phím /
            nothingFound="Không tìm thấy trang"
            highlightQuery
            searchProps={{
                leftSection: <IconSearch stroke={1.5} />,
                placeholder: 'Tìm kiếm trang...',
            }}
        />
    );
}

// Nếu muốn thêm nút mở Spotlight
export function SpotlightTrigger() {
    return (
        <button
            onClick={spotlight.open}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <IconSearch stroke={1.5} />
            Tìm kiếm (Ctrl + K)
        </button>
    );
}
