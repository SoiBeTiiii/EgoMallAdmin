'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function useH0Router() {
    const router = useRouter()
    const pathname = usePathname()

    const pushToEnd = (href: string) => {
        router.push(pathname + href)

    }
    return {
        ...router,
        pushToEnd
    }
}
