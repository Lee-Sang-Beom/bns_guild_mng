import UpdateDetailServer from "./UpdateDetailServer";

interface PageProps {
  searchParams: {
    doc: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  return <UpdateDetailServer docId={searchParams.doc} />;
}
