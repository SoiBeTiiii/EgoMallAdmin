'use client'
import { MySwitchTheme } from '@/components/ActionIcons/SwitchTheme/MySwitchTheme';
import { OBJECT_COlORS } from '@/constants/object/color';
import {
    Box,
    Burger,
    Button,
    Container,
    Divider,
    Drawer,
    Group,
    Image,
    ScrollArea,
    Text,
    TextInput,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconBook,
    IconChartPie3,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconSearch
} from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import MyFlexColumn from '../FlexColumn/MyFlexColumn';
import classes from './css.module.css';
import useHeaderMegaMenuStore from './HeaderMegaMenuStore';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];
interface IMenu {
    label?: string,
    href?: string
}

interface IHeaderMegaMenu {
    children?: ReactNode
    menus?: IMenu[]
}

export function HeaderMegaMenu({ children, menus }: IHeaderMegaMenu) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const HeaderMegaMenuStore = useHeaderMegaMenuStore()
    const theme = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box>
            <header className={classes.header} >
                <Group justify="space-between" h="100%">
                    <Group>
                        <Image src={"/imgs/0/IMG0LogoAQTech.png"} h={30} alt="" w="auto"></Image>

                        <Group h="100%" gap={5} visibleFrom="sm" >
                            {menus?.map((item, idx) => (
                                <Button key={idx} component={Link} href={item.href!} variant={HeaderMegaMenuStore.state.name == item.label ? "light" : "subtle"} onClick={() => HeaderMegaMenuStore.setState({ name: item.label })}>{item.label}</Button>
                            ))}
                        </Group>
                    </Group>

                    <Group>
                        <TextInput placeholder='Tìm kiếm' leftSection={<IconSearch />} radius={'xl'} w={'250px'} />
                        <MySwitchTheme />
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>
            <Container fluid pt={'sm'} pb={'md'} bg={OBJECT_COlORS.mantineBackgroundSecondary} mih={'93vh'}>
                {children}
            </Container>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />
                    <MyFlexColumn h="100%" gap={0} >
                        {menus?.map((item, idx) => (
                            <Button key={idx} component={Link} href={item.href!} variant={HeaderMegaMenuStore.state.name == item.label ? "light" : "subtle"} onClick={() => HeaderMegaMenuStore.setState({ name: item.label })}>{item.label}</Button>
                        ))}
                    </MyFlexColumn>
                    <Divider my="sm" />
                </ScrollArea>
            </Drawer>
        </Box>
    );
}