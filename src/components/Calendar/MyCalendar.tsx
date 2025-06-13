import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';

import { Paper, Text } from '@mantine/core';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect } from "react";
import MyFlexColumn from '../Layouts/FlexColumn/MyFlexColumn';

export default function MyCalendar() {
    const plugins = [createEventsServicePlugin(), createEventModalPlugin()]

    const calendar = useNextCalendarApp({
        locale: "vi-VN",
        dayBoundaries: {
            start: '05:00',
            end: '21:00',
        },
        weekOptions: {
            gridHeight: 700
        },
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
                id: '1',
                giangvien: 'TDMU048- Bùi Đức Anh',
                title: 'Tin học căn bản',
                people: ['Sức chứa: 30'],
                location: 'Phòng: B103',
                start: '2024-12-17 06:00',
                end: '2024-12-17 08:00',
                laLichThi: false,
                description: 'Giảng viên: TDMU048- Bùi Đức Anh',
            },
            {
                id: '2',
                giangvien: 'CNTT030- Nguyễn Thế Bảo',
                title: 'Tin học căn bản',
                people: ['Sức chứa: 30'],
                location: 'Phòng: B103',
                start: '2024-12-18 06:00',
                end: '2024-12-18 08:00',
                laLichThi: false,
                description: 'Giảng viên: CNTT030- Nguyễn Thế Bảo',
            },
            {
                id: 3,
                giangvien: 'CNTT026- Võ Thị Diễm Hương',
                title: 'Tin học căn bản',
                people: ['Sức chứa: 30'],
                location: 'Phòng: B103',
                start: '2024-12-19 06:00',
                end: '2024-12-19 08:00',
                laLichThi: false,
                description: "Giảng viên:  CNTT026- Võ Thị Diễm Hương"
            },
            {
                id: 4,
                giangvien: 'KHNN065- Nguyễn Xuân Tiến',
                title: 'Tin học căn bản',
                people: ['Sức chứa: 30'],
                location: 'Phòng: B102',
                start: '2024-12-20 06:00',
                end: '2024-12-20 08:00',
                laLichThi: false,
                description: "Giảng viên: KHNN065- Nguyễn Xuân Tiến"
            },
            {
                id: 5,
                // giangvien: 'KHNN065- Nguyễn Xuân Tiến',
                title: 'Tiếng anh thương mại',
                people: ['Sức chứa: 30'],
                location: 'Phòng: B102',
                start: '2024-12-16 14:00',
                end: '2024-12-16 16:00',
                laLichThi: true,
                // description: "Giảng viên: KHNN065- Nguyễn Xuân Tiến"
            },
        ],
    }, plugins)

    useEffect(() => {
        // get all events
        calendar?.events.getAll()
    }, [])

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} customComponents={{
                timeGridEvent: ({ calendarEvent }) => {
                    console.log(calendarEvent);
                    return (
                        <Paper h={'100%'} bg={calendarEvent.laLichThi ? 'violet.2' : "blue.2"} p={4}>
                            <MyFlexColumn gap={1}>
                                <Text size='sm' fw={'bold'}>{calendarEvent.laLichThi ? "(Thi) " : "(Học) "}{calendarEvent.title}</Text>
                                {calendarEvent.laLichThi == false && <Text size='sm'>{calendarEvent.giangvien}</Text>}
                                <Text size='sm'>{calendarEvent.location}</Text>
                            </MyFlexColumn>
                        </Paper>
                    )
                },
                // eventModal: ({ calendarEvent }) => {
                //     return (
                //         <Paper bg={'red'} style={{ position: 'relative', overflow: "hidden" }}>
                //             âs
                //         </Paper>
                //     )
                // }
            }} />
        </div>
    )
}
