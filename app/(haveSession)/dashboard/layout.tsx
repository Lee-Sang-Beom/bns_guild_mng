import { MenuItem } from "@/types/common/commonType";
import ms from "./layout.module.scss";
import Header from "@/component/Layout/Header/Header";
import BreadCrumb from "@/component/Layout/BreadCrumb/BreadCrumb";
import SubTop from "@/component/Layout/SubTop/SubTop";

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
      <div className={ms.right}>
        <div className={ms.right_top}>
          <SubTop />
        </div>
        <div className={ms.right_bottom}>{children}</div>
      </div>
    </div>
  );
}
