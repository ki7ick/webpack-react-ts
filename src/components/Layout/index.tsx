import { useOutlet, useNavigate } from "react-router-dom";
import styles from "./index.scss";

type MenuType = {
  text: string;
  link: string;
};

export default function Layout() {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const menus: MenuType[] = [
    {
      text: "首页",
      link: "/",
    },
    {
      text: "工作台",
      link: "/workbench",
    },
  ];

  const renderMenus = (_menus: MenuType[]) => {
    return (
      <ul className={styles.menus}>
        {menus.map(({ text, link }) => {
          return <li onClick={() => navigate(link)}>{text}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.left}>
        <nav>{renderMenus(menus)}</nav>
      </aside>
      <aside className={styles.right}>
        <header className={styles.header}>This is Header.</header>
        <main className={styles.main}>
          <div className={styles.container}>{outlet}</div>
        </main>
      </aside>
    </div>
  );
}
