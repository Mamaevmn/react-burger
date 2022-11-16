import styles from './not-found.module.css';

function NotFound() {
    return (
        <section className={styles.wrapper}>
            <h2 className='text text_type_digits-large'>
                404
            </h2>
            <p className='text text_type_main-large'>
            страница не найдена :(
            </p>
        </section>
    )
}

export default NotFound