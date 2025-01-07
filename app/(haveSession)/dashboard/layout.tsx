import ms from "./layout.module.scss";
import Header from "@/component/Layout/Header/Header";

export default function HaveSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={ms.wrap}>
      {/* LEFT */}
      <div className={ms.left}>
        <Header />
      </div>

      {/* RIGHT */}
      <div className={ms.right}>{children}</div>
    </div>
  );
}
