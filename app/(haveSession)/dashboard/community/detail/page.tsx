import CommunityDetailServer from "./CommunityDetailServer";

interface PageProps {
  searchParams: {
    doc: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  return <CommunityDetailServer docId={searchParams.doc} />;
}
