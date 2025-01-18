import { db } from "@/datastore/firebase/firestore";
import { SubUserDocResponse } from "@/types/haveSession/dashboard/dashboard/response";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  where,
} from "firebase/firestore";

// Firebase에서 최근 등록된 현금 분배 3개 항목을 가져오는 함수
const fetchSubUserList = async (
  parentId: string
): Promise<SubUserDocResponse[]> => {
  const subUserCollection = collection(db, "collection_sub_user");
  const q = query(subUserCollection, where("parentId", "==", parentId));

  // 쿼리 실행
  const querySnapshot = await getDocs(q);

  // 쿼리 결과를 배열로 반환
  const result: SubUserDocResponse[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...(doc.data() as SubUserDocResponse), docId: doc.id });
  });

  return result;
};

// React Query 훅
export const useGetSubUserList = (parentId: string) => {
  return useQuery({
    queryKey: ["useGetSubUserList", parentId],
    queryFn: () => fetchSubUserList(parentId),
    initialData: [],
  });
};
