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
  count: number; // 직업 수
}

// Firebase에서 직업 분포 리스트를 가져오는 함수
const fetchJobDistributionList = async (): Promise<
  DashboardJobDistributionListType[]
> => {
  // 컬렉션을 두 개 모두 조회: collection_user, collection_sub_user
  const userCollection = collection(db, "collection_user");
  const subUserCollection = collection(db, "collection_sub_user");

  const [userSnapshot, subUserSnapshot] = await Promise.all([
    getDocs(query(userCollection, where("useYn", "==", "Y"))),
    getDocs(query(subUserCollection)),
  ]);

  // 초기 카운트 맵 생성
  const jobCountMap: Record<string, number> = jobList.reduce(
    (acc, { value }) => {
      acc[value] = 0;
      return acc;
    },
    {} as Record<string, number>
  );

  // 유저 데이터 카운트 (collection_user)
  userSnapshot.forEach((doc) => {
    const data = doc.data() as UserData;
    if (data.job && jobCountMap[data.job] !== undefined) {
      jobCountMap[data.job] += 1;
    }
  });

  // 서브 유저 데이터 카운트 (collection_sub_user)
  subUserSnapshot.forEach((doc) => {
    const data = doc.data() as UserData;

    if (data.job && jobCountMap[data.job] !== undefined) {
      jobCountMap[data.job] += 1;
    }
  });

  // 결과를 배열로 변환
  return Object.entries(jobCountMap).map(([job, count]) => ({
    job,
    count,
  }));
};

// React Query 훅
export const useGetJobDistributionList = () => {
  // 초기 데이터 생성: 모든 직업의 count를 0으로 설정
  const initialData: DashboardJobDistributionListType[] = jobList.map(
    ({ value }) => ({
      job: value,
      count: 0,
    })
  );

  return useQuery({
    queryKey: ["useGetJobDistributionList"],
    queryFn: () => fetchJobDistributionList(),
    initialData,
  });
};
