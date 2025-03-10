import { db } from "@/datastore/firebase/firestore";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";

// Firebase에서 최근 등록된 현금 분배 3개 항목을 가져오는 함수
const fetchRecentCommunityDates = async (): Promise<CommunityResponse[]> => {
  const noticeCollection = collection(db, "collection_community");

  // regDt 기준 내림차순으로 3개 항목만 가져오는 쿼리
  const q = query(noticeCollection, orderBy("regDt", "desc"), limit(3));

  // 쿼리 실행
  const querySnapshot = await getDocs(q);

  // 쿼리 결과를 배열로 반환
  const result: CommunityResponse[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...(doc.data() as CommunityResponse), docId: doc.id });
  });

  return result;
};

// React Query 훅
export const useGetRecentCommunityDates = () => {
  return useQuery({
    queryKey: ["useGetRecentCommunityDates"],
    queryFn: fetchRecentCommunityDates,
    initialData: [],
  });
};
