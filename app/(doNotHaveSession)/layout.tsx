import "@/styles/globals.scss"; // 경로가 올바르게 설정되었는지 확인

export default function HaveSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
