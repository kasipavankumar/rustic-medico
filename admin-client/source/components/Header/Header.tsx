import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, Position, SideSheet, Pane, Heading, Icon } from 'evergreen-ui';
import styles from './Header.module.scss';

export default function Header({ path }) {
    const [menuOpenSwitch, toggleMenuOpenSwitch] = useState<boolean>(false);
    const subPath = path ? ` / ${path}` : '';

    return (
        <nav>
            <Pane display="flex" alignItems="center" backgroundColor="tint1" marginY={20}>
                <Icon icon={MenuIcon} onClick={() => toggleMenuOpenSwitch(true)}></Icon>
                <Heading className={styles.title} size={700} marginX={10}>
                    <Link href="/">
                        <a>Rustic Medico</a>
                    </Link>
                    {subPath}
                </Heading>
            </Pane>
            <SideSheet
                width={300}
                position={Position.LEFT}
                isShown={menuOpenSwitch}
                onCloseComplete={() => toggleMenuOpenSwitch(false)}
                preventBodyScrolling
                containerProps={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                }}
            >
                <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane padding={16}>
                        <Heading size={600}>Menu</Heading>
                    </Pane>
                </Pane>

                <Pane zIndex={1} marginBottom={10} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane zIndex={1} marginBottom={10} flexShrink={0} elevation={0} backgroundColor="white">
                        <Pane padding={16}>
                            🏠{' '}
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </Pane>
                    </Pane>
                    <Pane padding={16}>
                        💊{' '}
                        <Link href="/drugs">
                            <a>Drugs</a>
                        </Link>
                    </Pane>
                    <Pane zIndex={1} marginBottom={10} flexShrink={0} elevation={0} backgroundColor="white">
                        <Pane padding={16}>
                            👨‍💼{' '}
                            <Link href="/employees">
                                <a>Employees</a>
                            </Link>
                        </Pane>
                    </Pane>
                    <Pane padding={16}>
                        🙋‍♂️{' '}
                        <Link href="/customers">
                            <a>Customers</a>
                        </Link>
                    </Pane>
                </Pane>
            </SideSheet>
        </nav>
    );
}
