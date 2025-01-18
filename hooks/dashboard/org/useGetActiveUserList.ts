import { db } from "@/datastore/firebase/firestore";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

async function fetchCollectionUserList(): Promise<UserResponse[]> {
  const userCollection = collection(db, "collection_user"); // "collection_user" 컬렉션 참조
  const q = query(userCollection, where("useYn", "==", "Y")); // useYn == "N" 조건 추가

  const querySnapshot = await getDocs(q); // 쿼리 실행
  const userList: UserResponse[] = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  })) as UserResponse[];

  return userList;
}

// React Query 훅
export const useGetActiveUserList = () => {
  return useQuery({
    queryKey: ["useGetActiveUserList"],
    queryFn: fetchCollectionUserList,
    initialData: [],
  });
};
