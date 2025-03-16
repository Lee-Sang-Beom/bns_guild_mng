import { SelectedDate } from "@/component/common/Calendar/CustomCalendar";
import { db } from "@/datastore/firebase/firestore";
import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { ScheduleResponse } from "@/types/haveSession/dashboard/schedule/response";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

async function fetchCollectionSchedule(
  baseDt: SelectedDate
): Promise<ScheduleResponse[]> {
  const userCollection = collection(db, "collection_schedule");
  const q = query(
    userCollection,
    where("baseDt", "==", baseDt!.toISOString().slice(0, 10)) // 'YYYY-MM-DD'
  );

  const querySnapshot = await getDocs(q); // 쿼리 실행
  const scheduleList: ScheduleResponse[] = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  })) as ScheduleResponse[];

  return scheduleList;
}

// React Query 훅
export const useGetScheduleList = (baseDt: SelectedDate) => {
  return useQuery({
    queryKey: ["useGetScheduleList", baseDt],
    queryFn: () => fetchCollectionSchedule(baseDt),
    initialData: [],
  });
};
