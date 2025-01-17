import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/datastore/firebase/firestore";

import { redirect } from "next/navigation";
import { UpdateResponse } from "@/types/haveSession/dashboard/update/response";
import UpdateDetailClient from "./UpdateDetailClient";

async function getDetailCollectionUpdateByDocId(
  docId: string
): Promise<UpdateResponse | null> {
  const docRef = doc(db, "collection_update", docId); // 특정 문서 참조 생성
  const docSnap = await getDoc(docRef); // 문서 조회

  if (docSnap.exists()) {
    // 문서가 존재하면 데이터를 UpdateResponse 형식으로 반환
    return {
      docId: docSnap.id,
      ...docSnap.data(),
    } as UpdateResponse;
  } else {
    // 문서가 존재하지 않으면 null 반환
    return null;
  }
}

export default async function UpdateDetailServer({ docId }: { docId: string }) {
  const session = await getServerSession(authOptions);
  const data = await getDetailCollectionUpdateByDocId(docId);

  if (!data || !session) {
    redirect("/dashboard/errors");
  }
  return <UpdateDetailClient session={session} data={data} />;
}
