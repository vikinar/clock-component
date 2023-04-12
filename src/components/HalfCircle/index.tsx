import styles from './halfCircle.module.scss'

const HalfCircle = () => {
    return (
        <>
            <div className={styles['half-circle']}></div>
            <div className={styles['half-circle-clip-path']}></div>
        </>
    )
}

export default HalfCircle
