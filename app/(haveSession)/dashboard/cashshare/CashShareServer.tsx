import { getServerSession } from "next-auth";
import CashShareClient from "./CashShareClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
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
import { db } from "@/datastore/firebase/firestore";
import { TablePageRequest, TablePageResponse } from "@/types/common/commonType";
import {
  CashshareRequest,
  CashshareResponse,
} from "@/types/haveSession/dashboard/cashshare/request";

async function getCollectionCashShare(
  queryInstance: CashshareRequest
): Promise<TablePageResponse<CashshareResponse[]>> {
  let {
    page,
    size,
    sort,
    orderBy: orderDirection,
    stepType,
    searchType,
    searchKeyWord,
  } = queryInstance;

  page = Number(page);
  size = Number(size);

  const cashShareCollection = collection(db, "collection_cashshare");

  // 기본적인 정렬 조건을 추가
  let queryConstraints: any[] = [orderBy(sort, orderDirection)];

  // stepType이 제공되었다면 조건 추가
  if (stepType) {
    queryConstraints.push(where("step", "==", stepType));
  }

  // 검색 키워드가 제공되었다면 조건 추가
  if (searchKeyWord && searchKeyWord.length > 0) {
    if (searchType === "SELLER_ID") {
      queryConstraints.push(
        where("sellerId", ">=", searchKeyWord),
        where("sellerId", "<", searchKeyWord + "\uf8ff")
      );
    } else if (searchType === "ITEM_NAME") {
      queryConstraints.push(
        where("itemName", ">=", searchKeyWord),
        where("itemName", "<", searchKeyWord + "\uf8ff")
      );
    } else {
      queryConstraints.push(
        // where("sellerId", "!=", searchKeyWord),
        where("distributionUserList", "array-contains", searchKeyWord)
      );
    }
  }

  // 총 문서 수
  const filteredQuery = query(cashShareCollection, ...queryConstraints);
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
  const q = query(cashShareCollection, ...queryConstraints);
  const querySnapshot = await getDocs(q);

  // 결과를 CashshareResponse 형식으로 변환
  const cashShares: CashshareResponse[] = querySnapshot.docs.map(
    (doc) =>
      ({
        docId: doc.id,
        ...doc.data(),
      } as CashshareResponse)
  );

  // 첫 번째 및 마지막 페이지 여부 계산
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return {
    content: cashShares,
    first: isFirstPage,
    last: isLastPage,
    number: page,
    size: size,
    totalPages: totalPages,
    totalElements: totalElements,
  };
}

export default async function CashShareServer({
  searchParams,
}: {
  searchParams: CashshareRequest;
}) {
  const session = await getServerSession(authOptions);
  const isEmptySearchParams = Object.keys(searchParams).length === 0;

  let queryInstance: CashshareRequest = {
    page: 1,
    size: 5,
    sort: "regDt",
    orderBy: "desc",
    stepType: "TRANSACTION_REGISTRATION",
    searchType: "SELLER_ID",
    searchKeyWord: "",
  };

  if (!isEmptySearchParams) {
    queryInstance = {
      ...queryInstance, // DefaultQueryString 세팅
      ...searchParams, // QueryString (검색조건)
    };
  }

  const tableResponse: TablePageResponse<CashshareResponse[]> =
    await getCollectionCashShare(queryInstance);

  return (
    <CashShareClient
      session={session!}
      queryInstance={queryInstance}
      tableResponse={tableResponse}
    />
  );
}
