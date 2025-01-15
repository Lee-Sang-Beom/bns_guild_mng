import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/datastore/firebase/firestore";

import { NoticeResponse } from "@/types/haveSession/dashboard/notice/request";
import NoticeDetailClient from "./NoticeDetailClient";
import ms from "./NoticeDetail.module.scss";
import { redirect } from "next/navigation";
async function getDetailCollectionNoticeByDocId(
  docId: string
): Promise<NoticeResponse | null> {
  const docRef = doc(db, "collection_notice", docId); // 특정 문서 참조 생성
  const docSnap = await getDoc(docRef); // 문서 조회

  if (docSnap.exists()) {
    // 문서가 존재하면 데이터를 NoticeResponse 형식으로 반환
    return {
      docId: docSnap.id,
      ...docSnap.data(),
    } as NoticeResponse;
  } else {
    // 문서가 존재하지 않으면 null 반환
    return null;
  }
}

export default async function NoticeDetailServer({ docId }: { docId: string }) {
  const session = await getServerSession(authOptions);
  const data = await getDetailCollectionNoticeByDocId(docId);

  if (!data || !session) {
    redirect("/dashboard/errors");
  }
  return <NoticeDetailClient session={session} data={data} />;
}
