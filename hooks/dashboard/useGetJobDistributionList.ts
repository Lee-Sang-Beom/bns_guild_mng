import { jobList } from "@/datastore/common/common";
import { db } from "@/datastore/firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

// Firebase 유저 데이터 타입 정의
interface UserData {
  job: string; // 유저의 직업
}

// 대시보드 직업 분포 리스트 타입
interface DashboardJobDistributionListType {
  job: string; // 직업명
  representCount: number; // 대표캐릭터 직업 수
  subCount: number; // 서브캐릭터 직업 수
  totalCount: number; // 합산 직업 수
}

// Firebase에서 직업 분포 리스트를 가져오는 함수
const fetchJobDistributionList = async (): Promise<
  DashboardJobDistributionListType[]
> => {
  // Firebase 컬렉션 조회
  const userCollection = collection(db, "collection_user");
  const subUserCollection = collection(db, "collection_sub_user");

  const [userSnapshot, subUserSnapshot] = await Promise.all([
    getDocs(query(userCollection, where("useYn", "==", "Y"))),
    getDocs(query(subUserCollection)),
  ]);

  // 직업별 카운트 맵 생성
  const jobCountMap: Record<
    string,
    { representCount: number; subCount: number }
  > = jobList.reduce((acc, { value }) => {
    acc[value] = { representCount: 0, subCount: 0 };
    return acc;
  }, {} as Record<string, { representCount: number; subCount: number }>);

  // 대표 캐릭터 카운트 (collection_user)
  userSnapshot.forEach((doc) => {
    const data = doc.data() as UserData;
    if (data.job && jobCountMap[data.job] !== undefined) {
      jobCountMap[data.job].representCount += 1;
    }
  });

  // 서브 캐릭터 카운트 (collection_sub_user)
  subUserSnapshot.forEach((doc) => {
    const data = doc.data() as UserData;
    if (data.job && jobCountMap[data.job] !== undefined) {
      jobCountMap[data.job].subCount += 1;
    }
  });

  // 결과 배열 반환
  return Object.entries(jobCountMap).map(
    ([job, { representCount, subCount }]) => ({
      job,
      representCount,
      subCount,
      totalCount: representCount + subCount,
    })
  );
};

// React Query 훅
export const useGetJobDistributionList = () => {
  // 초기 데이터 생성
  const initialData: DashboardJobDistributionListType[] = jobList.map(
    ({ value }) => ({
      job: value,
      representCount: 0,
      subCount: 0,
      totalCount: 0,
    })
  );

  return useQuery({
    queryKey: ["useGetJobDistributionList"],
    queryFn: fetchJobDistributionList,
    initialData,
  });
};
