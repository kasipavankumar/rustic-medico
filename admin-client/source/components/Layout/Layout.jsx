import Header from '../Header';
import styles from './Layout.module.scss';

const Layout = ({ children, path }) => {
    return (
        <>
            <Header path={path} />
            <div className={styles.container}>{children}</div>
        </>
    );
};

export default Layout;
