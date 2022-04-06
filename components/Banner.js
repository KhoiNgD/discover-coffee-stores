import styles from "./Banner.module.css";

const Banner = ({ buttonText, handleClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Coffee <strong>Connoiseur</strong>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
