import styles from "./Layout.module.css";
function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="">github</a> | Soroush
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>developed By Soroush with ☕️</p>
      </footer>
    </>
  );
}
export default Layout;
