import Header from '../Header';
import styles from './Layout.module.scss';

const Layout = ({ children, path }) => {
    return (
        <>
            <div className={styles.container}>
                <Header path={path} />
                {children}
            </div>
        </>
    );
};

export default Layout;
