import api from '../api';

const sortOptionKey = {
  discount: 'discount', // 할인율순
  minPrice: 'minPrice', // 낮은 가격순
  maxPrice: 'maxPrice', // 높은 가격순
  popularity: 'popularity', // 인기순
  maxLikeCount: 'maxLikeCount', // 찜 많은순
} as const;

type SortOptionKey = (typeof sortOptionKey)[keyof typeof sortOptionKey];

interface SearchRequestBody {
  query: string;
  cursor?: string;
  sort?: SortOptionKey;
}

interface SearchResultItem {
  id: number; // 상품 고유 id
  name: string; // 상품명 (ex. 카페아메리카노 T)
  originalPrice: number; // 원가
  imageUrl: string; // 상품 이미지
  conCategory2: {
    id: number; // 브랜드 고유 id
    name: string; // 브랜드명 (ex. 스타벅스)
  };
  minSellingPrice: number; // 상품 최저가
  discountRate: number; // 할인율
}

export interface SearchResult {
  items: SearchResultItem[];
  totalCount: number;
  cursor: string;
}

/**
 * 상품 검색 요청
 *
 * BODY
 * - `query`: 검색을 원하는 질의어
 * - `cursor`: 현재 페이지의 검색 결과를 식별하는 데 사용되는 값. 페이지 간 탐색에 사용됩니다. 초기 페이지부터 검색 시 `initial`
 * - `sort`: 검색 결과 정렬 방식.
 *
 * RESPONSE
 * - `items`: 응답 결과. 최대 20개까지 반환합니다.
 * - `totalCount`: 요청한 질의어에 대한 총 검색 결과 갯수.
 * - `cursor`: 반환된 응답 결과를 식별하는데 사용되는 값.
 */
export const postSearch = async ({
  query,
  cursor = 'initial',
  sort = 'popularity',
}: SearchRequestBody): Promise<SearchResult> => {
  const {data} = await api.post('/cloud-search/v2', {
    query,
    cursor,
    sort,
  });

  return data;
};
