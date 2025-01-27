import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/datastore/firebase/firestore";

import { redirect } from "next/navigation";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import CommunityDetailClient from "./CommunityDetailClient";

async function getDetailCollectionCommunityByDocId(
  docId: string
): Promise<CommunityResponse | null> {
  const docRef = doc(db, "collection_community", docId); // 특정 문서 참조 생성
  const docSnap = await getDoc(docRef); // 문서 조회

  if (docSnap.exists()) {
    // 문서가 존재하면 데이터를 CommunityResponse 형식으로 반환
    return {
      docId: docSnap.id,
      ...docSnap.data(),
    } as CommunityResponse;
  } else {
    // 문서가 존재하지 않으면 null 반환
    return null;
  }
}

export default async function CommunityDetailServer({
  docId,
}: {
  docId: string;
}) {
  const session = await getServerSession(authOptions);
  const data = await getDetailCollectionCommunityByDocId(docId);

  if (!data || !session) {
    redirect("/dashboard/errors");
  }
  return <CommunityDetailClient session={session} data={data} />;
}
