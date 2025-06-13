'use client'
import { rem, Space, Tabs, TabsProps } from '@mantine/core'
import { Icon, IconProps } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

interface ITab {
    label: string,
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

interface IMyTab extends TabsProps {
    tabList: ITab[],
    children?: ReactNode
}

export default function MyTab({ tabList, children, ...rest }: IMyTab) {
    const iconStyle = { width: rem(20), height: rem(20) };
    return (
        <Tabs defaultValue={tabList[0].label} {...rest}>
            <Tabs.List>
                {tabList.map((item, idx) => {
                    return (
                        <Tabs.Tab key={idx} value={item.label} leftSection={item.icon && <item.icon style={iconStyle}></item.icon>}>
                            {item.label}
                        </Tabs.Tab>
                    )
                })}
            </Tabs.List>
            <Space my={'md'} />
            {children}
        </Tabs>
    )
}
