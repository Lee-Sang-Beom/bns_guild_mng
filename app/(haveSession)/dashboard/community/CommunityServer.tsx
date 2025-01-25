import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { db } from "@/datastore/firebase/firestore";
import { TablePageResponse } from "@/types/common/commonType";
import { CommunityRequest } from "@/types/haveSession/dashboard/community/request";
import { CommunityResponse } from "@/types/haveSession/dashboard/community/response";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const CommunityClient = dynamic(() => import("./CommunityClient"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

async function getCollectionCommunity(
  queryInstance: CommunityRequest
): Promise<TablePageResponse<CommunityResponse[]>> {
  let {
    page,
    size,
    sort,
    orderBy: orderDirection,
    searchType,
    searchKeyWord,
  } = queryInstance;

  page = Number(page);
  size = Number(size);

  const CommunityCollection = collection(db, "collection_community");

  // 기본적인 정렬 조건을 추가
  let queryConstraints: any[] = [orderBy(sort, orderDirection)];

  // 조회대상 docType
  queryConstraints.push(where("docType", "==", searchType));

  // 검색 키워드가 제공되었다면 조건 추가
  if (searchKeyWord && searchKeyWord.length > 0) {
    queryConstraints.push(
      where("title", ">=", searchKeyWord),
      where("title", "<", searchKeyWord + "\uf8ff")
    );
  }

  // 총 문서 수
  const filteredQuery = query(CommunityCollection, ...queryConstraints);
  const countSnapshot = await getCountFromServer(filteredQuery);
  const totalElements = countSnapshot.data().count;

  // 총 페이지 수 계산
  const totalPages = totalElements > 0 ? Math.ceil(totalElements / size) : 1;

  // 페이지네이션 크기 제한 추가
  queryConstraints.push(limit(size));

  // 첫 번째 페이지가 아니라면, startAfter 조건을 추가
  let lastDocSnapshot = null;
  if (page > 1) {
    // 이전 페이지에서 마지막 문서를 가져옴
    const lastQuerySnapshot = await getDocs(
      query(filteredQuery, limit(size * (page - 1)))
    );
    if (!lastQuerySnapshot.empty) {
      const lastDoc = lastQuerySnapshot.docs[lastQuerySnapshot.docs.length - 1];
      lastDocSnapshot = lastDoc;
      queryConstraints.push(startAfter(lastDoc)); // 현재 문서를 기준으로 startAfter 적용
    }
  }

  // Firestore 쿼리 실행
  const q = query(CommunityCollection, ...queryConstraints);
  const querySnapshot = await getDocs(q);

  // 결과를 CommunityResponse 형식으로 변환
  const Community: CommunityResponse[] = querySnapshot.docs.map(
    (doc) =>
      ({
        docId: doc.id,
        ...doc.data(),
      } as CommunityResponse)
  );

  // 첫 번째 및 마지막 페이지 여부 계산
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return {
    content: Community,
    first: isFirstPage,
    last: isLastPage,
    number: page,
    size: size,
    totalPages: totalPages,
    totalElements: totalElements,
  };
}

export default async function CommunityServer({
  searchParams,
}: {
  searchParams: CommunityRequest;
}) {
  const session = await getServerSession(authOptions);
  const isEmptySearchParams = Object.keys(searchParams).length === 0;

  let queryInstance: CommunityRequest = {
    page: 1,
    size: 5,
    sort: "regDt",
    orderBy: "desc",
    searchType: "ARTWORK",
    searchKeyWord: "",
  };

  if (!isEmptySearchParams) {
    queryInstance = {
      ...queryInstance, // DefaultQueryString 세팅
      ...searchParams, // QueryString (검색조건)
    };
  }

  const tableResponse: TablePageResponse<CommunityResponse[]> =
    await getCollectionCommunity(queryInstance);

  return (
    <CommunityClient
      session={session!}
      queryInstance={queryInstance}
      tableResponse={tableResponse}
    />
  );
}
