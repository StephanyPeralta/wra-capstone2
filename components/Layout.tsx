import Meta from "./Meta";
import styles from "../styles/Layout.module.css";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <div className={styles.layout}>
        <main className={styles.layout__main}>
          <h1 className={styles.layout__title}>APOD APP</h1>
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
