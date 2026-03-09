# Refactoring Guide

Guidelines for refactoring code in this project, including where to place types, constants, and shared logic.

## Core Principles

1. **不確定就先放模組內** - When unsure, keep it within the module first
2. **第三次重複才提到全域** - Abstraction on the third duplication, not sooner (YAGNI principle)
3. **小步重構，多次 commit** - Small incremental refactorings with frequent commits
4. **搬移成本低，不用怕** - Moving files later is cheap with TypeScript, don't over-optimize early

## Type Definitions Placement

### Decision Tree

```
這個型別是什麼？

├─ API / 資料層型別
│  └─ ✅ lib/types/{module}.ts
│     例：Post, Tag, Author
│
├─ UI 專用型別（前端定義）
│  ├─ 只在單一元件使用
│  │  └─ ✅ 元件內部定義
│  │     例：Props type, local state type
│  │
│  └─ 在功能模組內多個元件使用
│     └─ ✅ app/{feature}/_types.ts
│        例：FilterState（只有 blog 列表用）
│
└─ 通用型別（跨模組使用）
   └─ ✅ types/common.ts
      例：PageProps, ApiResponse<T>（少用）
```

### Examples

**資料層型別 → `lib/types/post.ts`**
```typescript
// ✅ 正確：內容資料結構放在 lib 層
export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string
}
```

**UI 型別 → `app/blog/_types.ts`**
```typescript
// ✅ 正確：只有 blog 模組使用的 UI 型別
export type SortOption = 'newest' | 'oldest'
```

**元件 Props 型別 → 元件內部**
```typescript
// ✅ 正確：只有這個元件用的 Props 型別
type PostCardProps = {
  title: string
  date: string
  tags: string[]
}

export default function PostCard({ title, date, tags }: PostCardProps) { ... }
```

## Constants Placement

### Decision Tree

```
這個常數會被誰使用？

├─ 只在單一元件使用
│  └─ ✅ 元件內部定義
│     const POSTS_PER_PAGE = 10
│
├─ 在功能模組內多個元件使用
│  └─ ✅ app/{feature}/_constants.ts
│     例：SORT_OPTIONS, TAG_COLORS
│
└─ 跨模組使用
   └─ ✅ lib/constants.ts 或 config/
      例：SITE_NAME, BASE_URL, DEFAULT_OG_IMAGE
```

## Hooks Placement

### Decision Tree

```
這個 hook 的性質？

├─ 通用工具（與業務無關）
│  └─ ✅ hooks/
│     例：useDebounce, useLocalStorage, useMediaQuery
│
├─ 功能模組業務邏輯
│  └─ ✅ app/{feature}/_hooks/
│     例：usePostFilter, useTagSelection
│
└─ 未來可能跨模組？
   └─ ⚠️ 先放模組內，第二次使用時再提升
      原則：避免過早抽象
```

## Components Placement

```
這個元件會被誰使用？

├─ 只在單一頁面使用
│  └─ ✅ app/{feature}/_components/
│     例：PostCard（只有 blog 用）
│
└─ 跨頁面共用
   └─ ✅ components/
      例：ThemeToggle, Header, Footer
```

## Common Mistakes to Avoid

### ❌ 錯誤 1：因為「有一點點類似」就放全域

```typescript
// ❌ 錯誤：只有 blog 在用，不該全域
// hooks/usePostFilter.ts
export function usePostFilter() { ... }

// ✅ 正確：放模組內
// app/blog/_hooks/usePostFilter.ts
```

### ❌ 錯誤 2：過早抽象

```typescript
// ❌ 錯誤：只用了一次就建立通用 hook
// hooks/useContentLoader.ts
export function useContentLoader() {
  // 複雜的通用內容載入器，但只有 blog 在用
}

// ✅ 正確：等第三次需要時再抽象
```

### ❌ 錯誤 3：把 UI 型別和資料型別混在一起

```typescript
// ❌ 錯誤：UI 型別放在資料層
// lib/types/post.ts
export type SortOption = 'newest' | 'oldest'  // 這是 UI 型別，不該在這

// ✅ 正確：分開放
// lib/types/post.ts
export type Post = { ... }         // 資料型別

// app/blog/_types.ts
export type SortOption = ...       // UI 型別
```

## Refactoring Strategy: Small Steps

### Phase 1: 提取重複程式碼（最簡單）
1. 建立目錄結構
2. 提取型別定義
3. 提取常數定義

**每一步都是獨立的 commit**

### Phase 2: 拆分元件（中等難度）
1. 識別可拆分的區塊
2. 設計 Props 介面
3. 逐一拆分並驗證

### Phase 3: 提取邏輯（進階）
1. 識別重複的邏輯
2. 封裝成 custom hooks
3. 重構並驗證

## Migration Strategy

當你發現需要將檔案從模組內提升到全域：

**步驟 1：移動檔案**
```bash
mv app/blog/_hooks/useDebounce.ts hooks/useDebounce.ts
```

**步驟 2：修正 import（VS Code 會自動提示）**
```typescript
// 從
import { useDebounce } from './_hooks/useDebounce'

// 改成
import { useDebounce } from '@/hooks/useDebounce'
```

**步驟 3：驗證**
```bash
npm run build
```

**總成本：約 2 分鐘** ✅

## Quick Reference

### 判斷型別位置
- 資料層型別 → `lib/types/`
- UI 型別（模組內共用） → `app/{feature}/_types.ts`
- Props 型別（單一元件） → 元件內部

### 判斷 Hook 位置
- 通用工具 → `hooks/`
- 業務邏輯 → `app/{feature}/_hooks/`
- 不確定 → 先放模組內

### 判斷 Constants 位置
- 模組專用 → `app/{feature}/_constants.ts`
- 跨模組共用 → `lib/constants.ts`
- 站台設定 → `config/`
