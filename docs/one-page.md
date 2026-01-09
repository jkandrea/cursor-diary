# 마이디아(MyDia) - 프로젝트 기획서

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [시스템 구조](#2-시스템-구조)
3. [기능 요구 사항](#3-기능-요구-사항)
4. [UI/UX 설계](#4-uiux-설계)
5. [데이터베이스](#5-데이터베이스)
6. [개발 순서](#6-개발-순서)

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
**마이디아(MyDia)** - 개인용 다이어리 웹 애플리케이션

### 1.2 프로젝트 목적
개인만 사용하는 프라이빗 다이어리 웹사이트로, 일상의 기록과 감정을 체계적으로 관리할 수 있는 플랫폼 제공

### 1.3 핵심 가치
- **프라이버시**: 개인 전용 다이어리로 안전한 기록 보관
- **편의성**: 직관적인 UI/UX로 쉬운 일기 작성
- **풍부한 표현**: 이미지, 감정, 날씨 등 다양한 메타데이터 지원
- **빠른 검색**: 제목, 내용, 태그 기반 검색 기능

### 1.4 기술 스택

#### 프론트엔드
- **Framework**: Next.js 16.1.1
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: shadcn/ui
- **에디터**: Tiptap

#### 백엔드
- **서버**: Next.js Server Actions
- **인증**: Supabase Auth
- **데이터베이스**: Supabase PostgreSQL
- **스토리지**: Supabase Storage (이미지)

#### 기타
- **언어**: TypeScript
- **날짜 처리**: 한국 시간(KST) 기준

---

## 2. 시스템 구조

### 2.1 아키텍처 개요
```
┌─────────────────────────────────────────┐
│         Client (Browser)                │
│  ┌───────────────────────────────────┐  │
│  │  Next.js Frontend (React)          │  │
│  │  - Tailwind CSS                    │  │
│  │  - shadcn/ui Components            │  │
│  │  - Tiptap Editor                   │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
               │ HTTP/HTTPS
               │
┌──────────────▼──────────────────────────┐
│      Next.js Server (API Routes)        │
│  ┌───────────────────────────────────┐  │
│  │  Server Actions                   │  │
│  │  - 인증 처리                       │  │
│  │  - CRUD 작업                       │  │
│  │  - 이미지 업로드 처리              │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
               │ Supabase Client
               │
┌──────────────▼──────────────────────────┐
│           Supabase Platform             │
│  ┌──────────────┬────────────────────┐  │
│  │  PostgreSQL  │  Storage           │  │
│  │  Database    │  (Images)          │  │
│  └──────────────┴────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Supabase Auth                    │  │
│  │  - Email/Password                 │  │
│  │  - Social Login                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 2.2 라우팅 구조
```
/                    # 전체 일기 목록 페이지
/diary/[id]          # 특정 일기 상세 페이지
/diary/[id]/edit     # 특정 일기 수정 페이지
/new                 # 새 일기 작성 페이지
```

### 2.3 주요 디렉토리 구조 (예상)
```
src/
├── app/
│   ├── page.tsx                    # 전체 일기 목록
│   ├── new/
│   │   └── page.tsx                # 새 일기 작성
│   └── diary/
│       └── [id]/
│           ├── page.tsx            # 일기 상세
│           └── edit/
│               └── page.tsx        # 일기 수정
├── components/
│   ├── ui/                         # shadcn/ui 컴포넌트
│   ├── diary/
│   │   ├── DiaryCard.tsx           # 일기 카드 컴포넌트
│   │   ├── DiaryEditor.tsx         # Tiptap 에디터 래퍼
│   │   └── DiaryList.tsx           # 일기 목록 컴포넌트
│   ├── sidebar/
│   │   ├── Sidebar.tsx             # 사이드바 메인
│   │   ├── MiniCalendar.tsx        # 미니 달력
│   │   └── ThemeToggle.tsx         # 다크모드 토글
│   └── search/
│       └── SearchBar.tsx           # 검색 바
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Supabase 클라이언트
│   │   └── server.ts               # 서버 클라이언트
│   ├── actions/
│   │   ├── diary.ts                # 일기 CRUD 액션
│   │   └── image.ts                # 이미지 업로드 액션
│   └── utils/
│       ├── date.ts                 # 날짜 유틸리티 (KST)
│       └── export.ts               # PDF 내보내기
└── types/
    └── diary.ts                    # TypeScript 타입 정의
```

---

## 3. 기능 요구 사항

### 3.1 인증 기능
- **Supabase Auth 사용**
  - 이메일/비밀번호 로그인
  - 소셜 로그인 (Google, GitHub 등)
  - 회원가입
  - 로그아웃
  - 세션 관리
- **접근 제어**: 비회원 사용 불가 (모든 페이지 인증 필요)

### 3.2 일기 작성 기능
- **에디터**: Tiptap 기반 리치 텍스트 에디터
  - 기본 텍스트 서식 (볼드, 이탤릭, 밑줄 등)
  - 제목 입력 (필수)
  - 본문 작성 (필수)
  - 태그 추가 기능
- **이미지 업로드**
  - Supabase Storage에 저장
  - 에디터 내 드래그 앤 드롭 지원
  - 클립보드 복사/붙여넣기 지원
  - 이미지 업로드 정책: 추후 결정
- **메타데이터**
  - 감정 이모티콘 선택 (선택 사항)
  - 날씨 이모티콘 선택 (선택 사항)
  - 태그 추가 (선택 사항)
  - 작성 날짜/시간 (한국 시간 기준, 자동 저장)

### 3.3 일기 조회 기능
- **전체 일기 목록** (`/`)
  - 카드형 레이아웃
  - 최신순 정렬 (기본)
  - 미리보기 표시
  - 날짜, 감정, 날씨 표시
- **일기 상세 조회** (`/diary/[id]`)
  - 전체 내용 표시
  - 이미지 표시
  - 태그 표시
  - 작성/수정 날짜 표시

### 3.4 일기 수정 기능
- **일기 수정** (`/diary/[id]/edit`)
  - 기존 내용 로드
  - Tiptap 에디터로 수정
  - 이미지 추가/삭제
  - 메타데이터 수정
  - 수정 날짜 자동 업데이트

### 3.5 일기 삭제 기능
- **삭제 확인 다이얼로그** 표시
- **휴지통 기능**
  - 삭제된 일기는 휴지통으로 이동
  - 휴지통에서 복원 가능
  - 휴지통에서 영구 삭제 가능
- **비공개 기능**
  - 일기를 비공개로 설정 가능
  - 비공개 일기는 목록에서 숨김 처리 (선택적 표시 옵션)

### 3.6 검색 기능
- **검색 범위**
  - 제목 검색
  - 내용 검색
  - 태그 검색
- **검색 UI**: 상단 검색 바
- **실시간 검색** 또는 **검색 버튼 클릭** 방식 (추후 결정)

### 3.7 필터링 기능
- **사이드바 미니 달력**
  - 날짜 클릭 시 해당 날짜 일기만 필터링
  - 여러 날짜 선택 가능 (다중 선택)
  - 선택된 날짜 하이라이트
- **필터 초기화** 기능

### 3.8 통계 기능
- **월별 작성 통계**
  - 월별 일기 작성 개수 표시
  - 차트 또는 숫자로 표시 (추후 결정)
  - 사이드바 또는 별도 페이지에 표시

### 3.9 내보내기 기능
- **PDF 내보내기**
  - 일기 상세 페이지에서 PDF 다운로드
  - 제목, 내용, 이미지 포함
  - 날짜, 메타데이터 포함

### 3.10 테마 기능
- **다크 모드 / 라이트 모드**
  - 사이드바 좌측 상단에 토글 버튼
  - 수동 전환만 지원 (시스템 설정 자동 감지 불가)
  - 사용자 설정 저장 (로컬 스토리지 또는 DB)

---

## 4. UI/UX 설계

### 4.1 전체 레이아웃
```
┌─────────────────────────────────────────────┐
│  Header (검색 바, 사용자 메뉴)              │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Sidebar  │        Main Content              │
│          │                                  │
│ - 미니   │  - 일기 목록 (카드형)            │
│   달력   │  - 일기 상세                     │
│ - 다크   │  - 일기 작성/수정                │
│   모드   │                                  │
│   토글   │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### 4.2 페이지별 UI 설계

#### 4.2.1 전체 일기 목록 페이지 (`/`)
- **레이아웃**: 그리드 또는 플렉스 레이아웃 (카드형)
- **카드 구성 요소**:
  - 제목
  - 미리보기 (내용 일부)
  - 작성 날짜
  - 감정 이모티콘 (있는 경우)
  - 날씨 이모티콘 (있는 경우)
  - 태그 (있는 경우)
  - 썸네일 이미지 (첫 번째 이미지, 있는 경우)
- **반응형**: 모바일 1열, 태블릿 2열, 데스크톱 3열

#### 4.2.2 일기 상세 페이지 (`/diary/[id]`)
- **레이아웃**: 중앙 정렬, 최대 너비 제한
- **구성 요소**:
  - 제목
  - 메타데이터 (날짜, 감정, 날씨, 태그)
  - 본문 내용 (Tiptap 렌더링)
  - 이미지 갤러리
  - 액션 버튼 (수정, 삭제, PDF 내보내기)

#### 4.2.3 일기 작성/수정 페이지 (`/new`, `/diary/[id]/edit`)
- **레이아웃**: 전체 화면 에디터
- **구성 요소**:
  - 제목 입력 필드
  - Tiptap 에디터
  - 메타데이터 선택 (감정, 날씨, 태그)
  - 이미지 업로드 영역
  - 저장/취소 버튼

#### 4.2.4 사이드바
- **위치**: 좌측 고정 또는 토글 가능
- **구성 요소**:
  - 다크 모드 토글 버튼 (상단)
  - 미니 달력
  - 월별 통계 (추후 추가 가능)
  - 네비게이션 메뉴 (추후 결정)

### 4.3 디자인 원칙
- **shadcn/ui 컴포넌트 최대한 활용**
- **일관된 색상 팔레트** (다크/라이트 모드 지원)
- **명확한 타이포그래피** 계층 구조
- **적절한 여백과 간격**
- **직관적인 아이콘** (lucide-react 활용)

### 4.4 반응형 디자인
- **모바일** (< 768px): 사이드바 숨김 또는 오버레이, 카드 1열
- **태블릿** (768px ~ 1024px): 사이드바 토글 가능, 카드 2열
- **데스크톱** (> 1024px): 사이드바 항상 표시, 카드 3열

### 4.5 사용자 경험 (UX)
- **로딩 상태**: 스켈레톤 UI 또는 로딩 스피너
- **에러 처리**: 명확한 에러 메시지 표시
- **성공 피드백**: 작업 완료 시 토스트 알림
- **키보드 단축키**: 저장 (Ctrl+S), 취소 (Esc) 등 (추후 추가 가능)

---

## 5. 데이터베이스

### 5.1 데이터베이스 스키마 (Supabase PostgreSQL)

#### 5.1.1 `diaries` 테이블
```sql
CREATE TABLE diaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Tiptap JSON 형식
  emotion TEXT, -- 감정 이모티콘 (예: '😊', '😢')
  weather TEXT, -- 날씨 이모티콘 (예: '☀️', '🌧️')
  is_public BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_diaries_user_id ON diaries(user_id);
CREATE INDEX idx_diaries_created_at ON diaries(created_at DESC);
CREATE INDEX idx_diaries_is_deleted ON diaries(is_deleted);
CREATE INDEX idx_diaries_title ON diaries USING gin(to_tsvector('korean', title));
CREATE INDEX idx_diaries_content ON diaries USING gin(to_tsvector('korean', content));

-- RLS (Row Level Security)
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own diaries"
  ON diaries FOR SELECT
  USING (auth.uid() = user_id AND is_deleted = false);

CREATE POLICY "Users can insert their own diaries"
  ON diaries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diaries"
  ON diaries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diaries"
  ON diaries FOR DELETE
  USING (auth.uid() = user_id);
```

#### 5.1.2 `tags` 테이블
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5.1.3 `diary_tags` 테이블 (다대다 관계)
```sql
CREATE TABLE diary_tags (
  diary_id UUID REFERENCES diaries(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (diary_id, tag_id)
);

CREATE INDEX idx_diary_tags_diary_id ON diary_tags(diary_id);
CREATE INDEX idx_diary_tags_tag_id ON diary_tags(tag_id);
```

#### 5.1.4 `diary_images` 테이블
```sql
CREATE TABLE diary_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diary_id UUID NOT NULL REFERENCES diaries(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, -- Supabase Storage 경로
  file_name TEXT NOT NULL,
  file_size INTEGER, -- 바이트 단위
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_diary_images_diary_id ON diary_images(diary_id);
```

#### 5.1.5 `user_preferences` 테이블 (선택 사항)
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light', -- 'light' | 'dark'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5.2 Supabase Storage 구조
```
storage/
└── diary-images/
    └── {user_id}/
        └── {diary_id}/
            └── {image_filename}
```

### 5.3 데이터 관계도
```
users (auth.users)
  │
  ├── diaries (1:N)
  │     │
  │     ├── diary_tags (N:M)
  │     │     └── tags
  │     │
  │     └── diary_images (1:N)
  │
  └── user_preferences (1:1)
```

---

## 6. 개발 순서

### Phase 1: 프로젝트 설정 및 인증 (1주)
1. **프로젝트 초기 설정**
   - Supabase 프로젝트 생성 및 연결
   - 환경 변수 설정
   - 기본 레이아웃 구성

2. **인증 시스템 구현**
   - Supabase Auth 설정
   - 로그인/회원가입 페이지
   - 인증 미들웨어
   - 세션 관리

3. **기본 레이아웃 구성**
   - Header 컴포넌트
   - Sidebar 기본 구조
   - 다크 모드 토글 버튼
   - 반응형 레이아웃

### Phase 2: 데이터베이스 및 기본 CRUD (1주)
4. **데이터베이스 스키마 생성**
   - Supabase에서 테이블 생성
   - RLS 정책 설정
   - 인덱스 생성

5. **일기 CRUD 기본 기능**
   - Server Actions 생성 (create, read, update, delete)
   - 타입 정의
   - 기본 API 테스트

6. **이미지 업로드 기능**
   - Supabase Storage 설정
   - 이미지 업로드 Server Action
   - 이미지 URL 생성

### Phase 3: 에디터 및 작성 기능 (1주)
7. **Tiptap 에디터 통합**
   - Tiptap 설치 및 설정
   - 기본 툴바 구성
   - 이미지 드래그 앤 드롭
   - 클립보드 이미지 붙여넣기

8. **일기 작성 페이지**
   - `/new` 페이지 구현
   - 제목, 내용 입력
   - 메타데이터 선택 UI (감정, 날씨)
   - 태그 입력 기능
   - 저장 기능

9. **일기 수정 페이지**
   - `/diary/[id]/edit` 페이지 구현
   - 기존 데이터 로드
   - 수정 및 저장 기능

### Phase 4: 조회 및 목록 기능 (1주)
10. **전체 일기 목록 페이지**
    - `/` 페이지 구현
    - DiaryCard 컴포넌트
    - 카드형 레이아웃
    - 최신순 정렬
    - 반응형 그리드

11. **일기 상세 페이지**
    - `/diary/[id]` 페이지 구현
    - Tiptap 콘텐츠 렌더링
    - 이미지 갤러리
    - 메타데이터 표시

### Phase 5: 검색 및 필터링 (1주)
12. **검색 기능**
    - 검색 바 컴포넌트
    - 제목/내용/태그 검색 로직
    - 검색 결과 표시

13. **미니 달력 필터링**
    - MiniCalendar 컴포넌트
    - 날짜 선택 기능
    - 다중 날짜 선택
    - 필터링 로직 구현

### Phase 6: 고급 기능 (1주)
14. **삭제 및 휴지통 기능**
    - 삭제 확인 다이얼로그
    - 휴지통 로직 (is_deleted 플래그)
    - 휴지통 페이지 (선택 사항)
    - 복원 기능
    - 영구 삭제 기능

15. **비공개 기능**
    - 비공개 설정 UI
    - 필터링 로직

16. **월별 통계**
    - 통계 쿼리 작성
    - 통계 UI 컴포넌트
    - 사이드바 또는 별도 페이지에 표시

### Phase 7: 내보내기 및 마무리 (1주)
17. **PDF 내보내기**
    - PDF 생성 라이브러리 선택 및 통합
    - 일기 내용을 PDF로 변환
    - 이미지 포함 처리
    - 다운로드 기능

18. **UI/UX 개선**
    - 로딩 상태 추가
    - 에러 처리 개선
    - 토스트 알림 추가
    - 애니메이션 및 트랜지션

19. **테스트 및 버그 수정**
    - 기능 테스트
    - 반응형 테스트
    - 성능 최적화
    - 버그 수정

20. **배포 준비**
    - 환경 변수 최종 확인
    - 빌드 테스트
    - 배포 (Vercel 등)

### Phase 8: 향후 개선 사항 (선택)
- 감정/날씨 이모티콘 종류 확정 및 UI 개선
- 이미지 업로드 정책 확정 및 적용
- 네비게이션 메뉴 추가
- 키보드 단축키 추가
- 다국어 지원 (선택 사항)
- PWA 기능 추가 (선택 사항)

---

## 부록

### A. 미정 사항
1. **감정 이모티콘 종류 및 개수**: 추후 결정 필요
2. **날씨 이모티콘 종류 및 개수**: 추후 결정 필요
3. **이미지 업로드 정책**: 최대 개수, 파일 크기 제한 등 추후 결정
4. **네비게이션 메뉴**: 사이드바에 추가할 메뉴 항목 추후 결정

### B. 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Tiptap 공식 문서](https://tiptap.dev/docs)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

---

**작성일**: 2024년
**버전**: 1.0
**작성자**: 개발팀
