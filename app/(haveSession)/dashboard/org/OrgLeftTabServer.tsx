import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import { OrgRightTabClient } from "./OrgRightTabClient";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/datastore/firebase/firestore";
import OrgLeftTabClient from "./OrgLeftTabClient";

// Firestore에서 User 데이터를 가져오는 함수
async function getCollectionUserList(): Promise<UserResponse[]> {
  const userCollection = collection(db, "collection_user"); // "collection_user" 컬렉션 참조
  const q = query(userCollection, where("useYn", "==", "Y")); // useYn == "N" 조건 추가

  const querySnapshot = await getDocs(q); // 쿼리 실행
  const userList: UserResponse[] = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  })) as UserResponse[];

  return userList;
}

export default async function OrgLeftTabServer() {
  const session = await getServerSession(authOptions);
  const userList = await getCollectionUserList();

  return <OrgLeftTabClient session={session!} userList={userList} />;
}
