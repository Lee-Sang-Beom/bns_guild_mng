import { db } from "@/datastore/firebase/firestore";
import {
  SubUserDocResponse,
  SubUserResponse,
} from "@/types/haveSession/dashboard/dashboard/response";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

async function fetchCollectionSubUserList(): Promise<SubUserDocResponse[]> {
  const userCollection = collection(db, "collection_sub_user"); // "collection_user" 컬렉션 참조
  const querySnapshot = await getDocs(userCollection); // 쿼리 실행
  const userList: SubUserDocResponse[] = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...(doc.data() as SubUserResponse),
  })) as SubUserDocResponse[];

  return userList;
}
// React Query 훅
export const useGetActiveSubUserList = () => {
  return useQuery({
    queryKey: ["useGetActiveSubUserList"],
    queryFn: fetchCollectionSubUserList,
    initialData: [],
  });
};
