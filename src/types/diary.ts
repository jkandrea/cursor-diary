// Tiptap 에디터의 JSON 형식
export type TiptapContent = {
  type: string
  content?: TiptapContent[]
  [key: string]: unknown
}

// 일기 데이터베이스 타입
export interface Diary {
  id: string
  user_id: string
  title: string
  content: TiptapContent | string // JSONB는 객체 또는 문자열로 파싱됨
  emotion: string | null // 감정 이모티콘 코드
  weather: string | null // 날씨 이모티콘 코드
  diary_date: string // DATE 형식 (YYYY-MM-DD)
  is_public: boolean
  is_deleted: boolean
  deleted_at: string | null // ISO 8601 형식
  created_at: string // ISO 8601 형식
  updated_at: string // ISO 8601 형식
}

// 일기 생성 시 사용하는 타입 (user_id, created_at 등은 자동 생성)
export type DiaryInsert = Omit<
  Diary,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'is_deleted' | 'deleted_at'
> & {
  diary_date?: string // 선택 사항 (기본값: 오늘 날짜)
}

// 일기 수정 시 사용하는 타입
export type DiaryUpdate = Partial<
  Omit<Diary, 'id' | 'user_id' | 'created_at' | 'updated_at'>
>

// 일기 목록 조회 시 사용하는 타입 (간소화된 버전)
export type DiaryListItem = Pick<
  Diary,
  | 'id'
  | 'title'
  | 'emotion'
  | 'weather'
  | 'diary_date'
  | 'created_at'
  | 'is_public'
> & {
  preview?: string // 미리보기 텍스트
  thumbnail_url?: string // 썸네일 이미지 URL
}
