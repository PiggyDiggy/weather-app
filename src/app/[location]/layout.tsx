import style from "./page.module.css";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div className={style.page}>
      <section className={style.section}>{children}</section>
    </div>
  );
}
