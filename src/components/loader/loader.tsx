import styles from './loader.module.css'
import loaderGif from './../../images/icons/loader.png'

function Loader() {
    return (
        <div className={styles.loader}>
            <img src={loaderGif} alt="loader" />
        </div>
    )
}

export default Loader