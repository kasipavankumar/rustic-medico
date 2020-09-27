import { Pane, TextInputField, Button, Heading } from 'evergreen-ui';
import styles from './LoginForm.module.scss';

const LoginForm = ({ formTitle }) => {
    return (
        <div className={styles.formContainer}>
            <Pane className={styles.form} elevation={2} padding={20}>
                <form className={styles.form}>
                    <Heading marginY={15} size={600}>
                        {formTitle}
                    </Heading>
                    <TextInputField label="Username" name="username" htmlFor="password" placeholder="Enter employee name" />
                    <TextInputField type="password" name="password" htmlFor="password" label="Password" placeholder="Enter password" />
                    <Button appearance="primary">Login</Button>
                </form>
            </Pane>
        </div>
    );
};

export default LoginForm;
