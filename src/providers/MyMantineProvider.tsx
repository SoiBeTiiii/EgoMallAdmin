'use client'
import { ActionIcon, Blockquote, Divider, FileInput, Indicator, MantineProvider, Modal, Paper, Select, SimpleGrid, Space, Switch, Table, TextInput, Textarea, Title, Tooltip, createTheme } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { IconFile, IconInfoCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ReactNode } from 'react';
import classes from './mantine.module.css';
dayjs.locale('vi');
export default function MyMantineProvider({ children }: { children?: ReactNode }) {
    return (
        <MantineProvider defaultColorScheme="light" theme={theme}>
            <ModalsProvider labels={{
                confirm: 'Thêm', cancel: 'Huỷ'
            }}>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider >
    )
}

const theme = createTheme({
    cursorType: 'pointer',
    components: {
        Switch: Switch.extend({
            defaultProps: {
                maw: "fit-content"
            }
        }),
        Paper: Paper.extend({
            defaultProps: {
                withBorder: true,
                shadow: "sm",
                radius: "md",
            }
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                classNames: classes
            }
        }),
        Textarea: Textarea.extend({
            defaultProps: {
                autosize: true,
                minRows: 4,
                w: '100%'
            }
        }),
        Title: Title.extend({
            defaultProps: {
                order: 2
            }
        }),
        Modal: Modal.extend({
            defaultProps: {
                centered: true,
                overlayProps: {
                    backgroundOpacity: 0.55,
                    blur: 3,
                },
            }
        }),
        DateInput: DateInput.extend({
            defaultProps: {
                dateParser: (value) => {
                    const [day, month, year] = value.split("/");
                    return new Date(`${year}-${month}-${day}`);
                },
                valueFormat: "DD/MM/YYYY",
                locale: "vi",
                clearable: true,
                highlightToday: true,
            },
        }),
        TimeInput: TimeInput.extend({
            defaultProps: {
            }
        }),
        Divider: Divider.extend({
            defaultProps: {
                my: "md"
            }
        }),

        Tooltip: Tooltip.extend({
            defaultProps: {
                withArrow: true,
                transitionProps: { transition: 'skew-up', duration: 150 }
            }
        }),
        SimpleGrid: SimpleGrid.extend({
            defaultProps: {
                cols: { base: 1, sm: 2, lg: 4 }
            }
        }),
        Blockquote: Blockquote.extend({
            defaultProps: {
                iconSize: 30,
                icon: <IconInfoCircle />
            }
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: "light"
            }
        }),
        Indicator: Indicator.extend({
            defaultProps: {
                size: 16,
                inline: true,
            }
        }),
        Table: Table.extend({
            defaultProps: {
                withTableBorder: true,
                withColumnBorders: true,
                highlightOnHover: true,
            },
        }),
        Space: Space.extend({
            defaultProps: {
                my: "md",
                mx: "md"
            }
        }),
        FileInput: FileInput.extend({
            defaultProps: {
                leftSection: <IconFile></IconFile>
            }
        }),
        Select: Select.extend({
            defaultProps: {
                allowDeselect: false
            }
        })
    }
});