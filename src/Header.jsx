import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <h2>React-Weather-App</h2>
      <p>
        Developed by <span>Mobin raziji</span>
      </p>
    </header>
  );
}

export default Header;
