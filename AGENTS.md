# Agent Guidelines for haianbeauty

> This file provides instructions for AI agents (Google Antigravity, Google Jules) working on this codebase.

---

## Tech Stack

| Technology     | Version  | Purpose                           |
| -------------- | -------- | --------------------------------- |
| Next.js        | 16.1.1   | App Router, React Server Components |
| React          | 19.2.3   | UI with `use()` hook, Actions     |
| TypeScript     | 5.x      | Strict mode enabled               |
| Tailwind CSS   | 4.x      | CSS-first configuration           |
| Biome          | 2.3.11   | Linting + formatting (replaces ESLint/Prettier) |
| next-intl      | 4.7.0    | i18n (cs, en, vi, ru)             |

---

## Project Structure

```
haianbeauty/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-based routing
│   └── api/                # API routes
├── features/               # Feature-based modules (business logic)
│   ├── blog/               # Blog feature
│   ├── booking/            # Booking feature
│   ├── gallery/            # Gallery feature
│   ├── reviews/            # Reviews feature
│   └── services/           # Services feature
├── components/             # Shared UI components
│   ├── ui/                 # Primitives (Button, Dialog, etc.)
│   ├── layout/             # Layout components
│   └── sections/           # Page sections
├── lib/                    # Utilities and helpers
├── messages/               # Translation files (cs.json, en.json, vi.json, ru.json)
├── types/                  # Global TypeScript types
└── public/                 # Static assets
```

---

## Agent Roles

### Google Antigravity (Primary Agent)

**Role**: Main development agent for interactive, real-time work.

**Responsibilities**:
- Feature implementation and bug fixes
- Interactive debugging and troubleshooting
- Refactoring with immediate feedback
- Architecture decisions and planning
- Running dev server and testing (`npm run dev`)

### Google Jules (Sub-Agent)

**Role**: Async code review and batch tasks.

**Responsibilities**:
- Pull request code reviews
- Large-scale refactoring (when assigned specific tasks)
- Type safety improvements across multiple files
- Dependency updates and migration tasks
- Documentation generation

---

## Solo Developer Workflow

```
┌────────────────────────────────────────────────────────────┐
│  1. ANTIGRAVITY: Active Development Session                │
│     • Plan features → Write code → Test → Commit           │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│  2. Push to GitHub → Create PR (or push to branch)         │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│  3. JULES: Async Code Review                                │
│     • Review PR for best practices                          │
│     • Suggest improvements                                  │
│     • Fix minor issues if assigned                          │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│  4. Merge PR → Continue with ANTIGRAVITY                    │
└────────────────────────────────────────────────────────────┘
```

**Best tasks for Jules**:
- "Review this PR for React 19 best practices"
- "Refactor these 5 files to remove `any` types"
- "Update all components to use the new naming convention"
- "Add JSDoc comments to all exported functions in features/"

---

## React 19 + TypeScript 5 Best Practices (2026)

### Component Patterns

```typescript
// ✅ Server Component (default in app/)
export default async function ProductPage({ params }: Props) {
  const data = await fetchData(params.id);
  return <ProductView product={data} />;
}

// ✅ Client Component (when needed)
"use client";
export function InteractiveWidget({ initialData }: Props) {
  const [state, setState] = useState(initialData);
  return <div onClick={() => setState(newValue)}>{state}</div>;
}
```

### React 19 `use()` Hook

```typescript
// ✅ Use the `use()` hook for promises in render
import { use } from "react";

export function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise);
  return <div>{data.title}</div>;
}
```

### Server Actions

```typescript
// ✅ Server Action in a separate file
"use server";

export async function submitForm(formData: FormData) {
  const email = formData.get("email") as string;
  await saveToDatabase({ email });
  revalidatePath("/");
}
```

### TypeScript Strict Patterns

```typescript
// ✅ Use `satisfies` for type inference with validation
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} satisfies AppConfig;

// ✅ Use type predicates for type guards
function isNotionRichText(prop: unknown): prop is NotionRichTextProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "rich_text"
  );
}

// ✅ Use `const` type parameters (TS 5.0+)
function createConfig<const T extends readonly string[]>(values: T): T {
  return values;
}

// ❌ NEVER use `any` - use `unknown` and narrow
function processData(data: unknown): string {
  if (typeof data === "string") return data;
  if (isValidData(data)) return data.value;
  throw new Error("Invalid data");
}
```

### Import Organization (Biome handles this)

```typescript
// Biome auto-organizes imports:
// 1. React/Next.js
// 2. External packages
// 3. Internal aliases (@/...)
// 4. Relative imports
// 5. Types

import { use } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { fetchBlogPost } from "./services/notion";
import type { BlogPost } from "./types";
```

---

## Coding Standards

### File Naming

| Type                | Convention           | Example                    |
| ------------------- | -------------------- | -------------------------- |
| Components          | PascalCase           | `BlogCard.tsx`             |
| Hooks               | camelCase + use      | `useMediaQuery.ts`         |
| Utilities           | camelCase            | `formatDate.ts`            |
| Types               | PascalCase           | `BlogPost.ts` or in-file   |
| Constants           | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts`         |
| Route files         | lowercase            | `page.tsx`, `layout.tsx`   |

### Component Structure

```typescript
// 1. "use client" directive (if needed)
"use client";

// 2. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CardProps } from "./types";

// 3. Types (if not imported)
interface Props {
  title: string;
  onAction: () => void;
}

// 4. Component
export function Card({ title, onAction }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Event handlers
  const handleClick = () => {
    setIsOpen(true);
    onAction();
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2>{title}</h2>
      <Button onClick={handleClick}>Open</Button>
    </div>
  );
}
```

### Tailwind CSS v4 Patterns

```typescript
// ✅ Use CSS variables in Tailwind v4
<div className="bg-[--brand-primary] text-[--text-primary]" />

// ✅ Use semantic class names with @apply in CSS
// In globals.css:
// .btn-primary { @apply bg-primary text-white rounded-lg px-4 py-2; }

// ✅ Use clsx/twMerge for conditional classes
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

<button className={cn("px-4 py-2", isActive && "bg-blue-500")} />
```

---

## Commands Reference

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Biome (preferred)
npx biome check .              # Check all files
npx biome check --write .      # Fix all auto-fixable issues
npx biome format --write .     # Format all files
```

---

## Important Files

| File                  | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `biome.json`          | Linting/formatting rules (source of truth)   |
| `next.config.ts`      | Next.js configuration                        |
| `tsconfig.json`       | TypeScript configuration (strict mode)       |
| `messages/*.json`     | Translation files (cs, en, vi, ru)           |
| `.env.local`          | Environment variables (DO NOT COMMIT)        |

---

## Environment Variables

Required variables (see `.env.example`):

```
NOTION_API_KEY          # Notion integration token
NOTION_DATABASE_ID      # Blog database ID
NEXT_PUBLIC_GOOGLE_*    # Google APIs (Maps, Places)
```

---

## Localization (next-intl)

Supported locales: `cs` (default), `en`, `vi`, `ru`

```typescript
// Server Component
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}

// Client Component
"use client";
import { useTranslations } from "next-intl";

export function ClientComponent() {
  const t = useTranslations("Common");
  return <button>{t("submit")}</button>;
}
```

---

## Do's and Don'ts

### ✅ Do

- Use Server Components by default, add `"use client"` only when needed
- Use the `use()` hook for data fetching in client components
- Run `npx biome check --write .` before committing
- Follow the feature-based folder structure
- Use type guards instead of type assertions
- Test with all locales (cs, en, vi, ru)

### ❌ Don't

- Use `any` type (use `unknown` and narrow)
- Mix client/server code inappropriately
- Add `"use client"` to pages that don't need interactivity
- Hardcode strings (use translation files)
- Skip TypeScript strict checks
- Ignore Biome warnings

---

## Questions for Agents

Before making significant changes, consider:

1. **Is this a server or client component?** Default to server.
2. **Does this need i18n?** Add to all 4 translation files.
3. **Is the type fully defined?** No `any`, use proper types.
4. **Did Biome pass?** Run `npx biome check .` before pushing.
