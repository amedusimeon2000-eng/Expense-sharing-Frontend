# SplitBook

**Backend at [splitbook-backend.onrender.com/api](https://splitbook-backend.onrender.com/api)** · deployed on Vercel

SplitBook keeps track of shared costs within a group, so friends don't have to work out who owes whom.

**This is the web frontend**: the app people sign into to manage their groups. Users create a group for a trip, a flat or a regular lunch and add friends by email. They log who paid for what and how to split it, and follow a settle-up plan that keeps the number of payments as low as possible.

The data and the rules live in the SplitBook backend, an Express + MongoDB API. Roughly: this app collects and displays the data, and the backend validates it, works out balances and builds the settle-up plan.

## Table Of Content

- [What The App Does](#what-the-app-does)
- [Installation](#installation)
  - [Clone](#clone)
  - [Install Dependencies](#dependencies)
  - [Run locally](#run-locally)
- [Important Notice](#important-note)
- [File Structure](#file-structure)
  - [Shared](#shared)
- [Hooks](#hooks)
- [Features](#features)
- [Layout](#layout)
- [Schema](#schema)
- [Models](#models)
- [Utils](#utils)
- [Data](#data)
- [Tools Used](#tools-used)
- [Environment Keys](#environment-keys)
- [Deployment](#deployment)

## What The App Does

A few things shape almost every screen, so they are worth knowing before you read any feature:

- **Everything happens inside a group.** Expenses, balances and settlements all belong to a group. The dashboard is the only screen that adds them up across groups, person by person.
- **Money is stored in kobo.** Amounts are whole numbers in kobo (₦1 = 100 kobo), both in the API and in the app. Convert to naira only for display and input, using `MoneyUtils` in `src/utils/money.js`.
- **A group can't be left half-settled.** The backend refuses to remove a member, or delete a group, while money is still owed, and the app shows its error message as a toast.
- **Admins manage the group.** Only a group admin can remove other members. Any member who isn't an admin can leave.

Only the landing page and the login and register pages are public. Every other route needs a signed-in user.

## Installation

### Clone

```bash
git clone https://github.com/amedusimeon2000-eng/Expense-sharing-Frontend.git
```

## package manager

We are using `npm`. Commit `package-lock.json` with any dependency change, and don't add a lock file from another package manager.

## Dependencies

```bash
cd Expense-sharing-Frontend
npm install
```

### Run locally

```bash
npm run dev
```

And open http://localhost:5173/ in your browser. By default the app uses the deployed backend, so you don't need to run the API locally. To use a local backend, see [Environment Keys](#environment-keys).

Other commands:

```bash
npm run build       # Production build into dist/
npm run preview     # Preview the production build
npm run lint        # Run ESLint
```

## Important Note

Please follow best practices when importing modules. Import only the specific components or functions a file needs, straight from the file that defines them, rather than from a whole directory.

`@/*` is aliased to `src/*`, so prefer `@/components/buttons/BrandButton` over a long relative path.

The project is **JavaScript only** (`.js` / `.jsx`). Don't add TypeScript files.

Keep **one component per file**. A helper component (a row, a form, a tab) gets its own `.jsx` file next to the component that uses it. Constants shared by several components go in a `store/` folder, because exporting anything other than components from a component file breaks React Fast Refresh.

## File Structure

We try to make each function, component and layout reusable. Before starting a task, check whether a component or function for it already exists. If it doesn't, and the functionality will be needed elsewhere, make it a reusable component and update this README to reflect it.

```
src/
├── assets/       # Images used by the landing page
├── components/   # Reusable UI — buttons/, inputs/, modals/, nav/, select/,
│                 # shared/, status/, table/
├── features/     # Feature modules (see the table below)
├── hooks/        # Global hooks — utils/
├── layout/       # Route layouts (RootLayout, DashboardLayout, AuthLayout, guards)
├── models/       # Enums and constants: query keys, split types, roles
├── pages/        # Route components
├── routes/       # Route definitions (AppRoutes class) and route tables
├── schema/       # Zod validation schemas
├── services/     # API service layer (client.js holds the Axios instance + interceptors)
├── store/        # Global state (Zustand stores, localForage) and shared static data
└── utils/        # cn.js, endpoints.js, constants.js, money.js, date.js and friends
```

### Shared

Components used widely around the app are stored in `src/components/shared`, for example `Avatar`, `EmptyState`, `Panel` and `StatCard`.

## Hooks

Hooks live in two places:

- **Feature hooks**: every hook that talks to the API lives in its feature, under `src/features/<feature>/hooks/`, with one hook per file.
  - Fetch hooks are named `useFetchX`, for example `useFetchGroups` or `useFetchBalances`.
  - Mutation hooks are named verb + noun, for example `useCreateGroup` or `useRevokeSession`. They return `{ xFn, isPendingX }`, show a toast on success or failure, and invalidate the queries they affect.
- **Utils**: `src/hooks/utils/` holds hooks that aren't tied to one feature or to fetching data, for example `useDebouncedCallback`, `useIsMobile` or `useInvalidateQueries`.

```js
export const useCreateGroup = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: createGroupFn, isPending: isPendingCreateGroup } =
    useMutation({
      mutationKey: [QueryKeys.CreateGroup],
      mutationFn: GroupService.createGroup,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({
          message: message || 'Group created successfully',
        });
        invalidateQueries([QueryKeys.Groups, QueryKeys.Summary]);
        if (data?.group) onSuccess?.(data.group);
      },
      // onError shows an error toast
    });

  return { createGroupFn, isPendingCreateGroup };
};
```

## Features

The `features` directory holds the logic and UI for each area of the app. Each subfolder is a feature and contains what it needs to work on its own, apart from schemas and shared models, which are global.

Each feature folder typically contains:

- **ui/**: components for that feature's screens.
- **hooks/**: the feature's fetch and mutation hooks.
- **store/**: constants and static data for that feature (`data.js`).
- **utils/**: helpers only that feature needs.

| Feature       | Domain                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `auth`        | Login, register, logout, change password, active sessions, password strength meter                                  |
| `dashboard`   | Overview: stat cards, what each person owes you or you owe them across groups, recent activity                      |
| `expenses`    | Add, edit and delete expenses; equal, exact and percentage splits with a live per-person preview (`utils/split.js`) |
| `groups`      | Group list and detail, members, balances, settle-up plan; tabs for expenses, balances, members and settlements      |
| `landing`     | Public marketing page: hero, how it works, features, call to action                                                 |
| `settlements` | Record a payment between two members, and undo it                                                                   |
| `user`        | Current user, profile details, summary totals, user search when adding members                                      |

## Layout

A layout is a component that gives several pages the same structure, such as a sidebar and top bar, so they look and behave consistently. Layouts are in `src/layout/`:

- `RootLayout` wraps every route.
- `ProtectedRouteLayout` sends signed-out users to the login page. `GuestRouteLayout` sends signed-in users away from the login and register pages.
- `DashboardLayout` adds the sidebar and top bar. `AuthLayout` frames the login and register forms.

## Schema

Schema validation checks form input before it is sent to the API, so most mistakes are caught without a round trip and the user sees a clear message next to the field.

We use **[Zod](https://zod.dev/v4)**, wired into React Hook Form through `@hookform/resolvers`. Schemas live in `src/schema/` and mirror the backend's validators, so the two agree on what is valid.

For example:

```js
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirm: z.string(),
  })
  .refine((data) => data.confirm && data.confirm === data.password, {
    message: "Passwords don't match.",
    path: ['confirm'],
  });
```

## Models

`src/models/` is the single place for constants that describe the app's data, grouped by domain (`auth.js`, `expense.js`, `query.js`). For example, `expense.js` defines the split types (`equal`, `exact`, `percentage`), the expense categories and the group roles. Define a value here once rather than repeating a string around the codebase.

React Query keys live in the `QueryKeys` class (`src/models/query.js`), so that caching and invalidation stay consistent across features.

## Utils

Functions that format values or do small checks are stored here. We group related functions in a class (`MoneyUtils`, `QueryUtils`, `ToastUtils`) to keep them easy to find and maintain.

- `utils/endpoints.js` is the single source of truth for every API path. Add new endpoints there rather than writing URLs inside a service.
- `utils/money.js` converts between kobo and naira and formats amounts.
- Route paths live in `src/routes`, where the `AppRoutes` class exposes them as static members, for example `AppRoutes.groupID(id)`.
- Styles are composed with the `cn()` helper (clsx + tailwind-merge) in `utils/cn.js`.

## Data

We use [Axios](https://axios-http.com/) for requests, wrapped in `ClientHTTP` (`src/services/client.js`). It owns the base URL and adds the auth token to each request. Its response interceptor handles expired sessions: there is no refresh endpoint, so a 401 clears the token and sends the user to the login page. A `redirect` parameter brings them back to the page they were on after signing in again. Fetched data is managed with [TanStack Query](https://tanstack.com/query), which handles caching, refetching and query invalidation.

For local state we use [Zustand](https://zustand.docs.pmnd.rs/), for example the sidebar's open state. The auth token is stored with [localForage](https://localforage.github.io/localForage/) (IndexedDB, falling back to localStorage).

Every endpoint gets a static method on a service class:

```js
import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class GroupService {
  static getGroups = (params) => {
    const config = { ...Endpoints.getGroups, params };
    return ClientHTTP.apiRequest(config);
  };

  static updateGroup = ({ groupId, ...data }) => {
    const config = { ...Endpoints.updateGroup(groupId), data };
    return ClientHTTP.apiRequest(config);
  };
}
```

## Tools Used

The project is built with the following technologies:

1. **React**: A library for building user interfaces from composable components. This project runs React 19 as a client-side single-page app.
2. **Vite**: The build tool and dev server. It serves the app over native ES modules in development and bundles it for production.
3. **Tailwind CSS v4**: Utility-first styling. Design tokens (colors, type, spacing) are defined with `@theme` in `src/index.css` and composed through `cn()`.
4. **TanStack Query**: Server state: caching, refetching and invalidation.
5. **Zustand**: Client state.
6. **localForage**: Persistent storage for the auth token.
7. **React Router**: Routing, with paths centralized in the `AppRoutes` class.
8. **React Hook Form + Zod**: Form state and schema validation.
9. **Axios**: HTTP, wrapped in `ClientHTTP` with interceptor-based auth.
10. **Sonner**: Toast notifications.
11. **Tabler Icons**: Icon set.

## Environment Keys

You don't need a `.env` file to run the app. If you add one, put it at the project root. Only variables prefixed with `VITE_` reach the browser, so never put a secret in one.

| Key                 | Required | Description                                                                                                                                                      |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | No       | Base URL of the SplitBook backend API. Falls back to `https://splitbook-backend.onrender.com/api`. Set it to `http://localhost:5000/api` to use a local backend. |

The backend only accepts requests from origins listed in its `CLIENT_URL` setting, so make sure `http://localhost:5173` is in that list. Restart `npm run dev` after changing `.env`.

## Deployment

The app is deployed on Vercel. `vercel.json` sends every path to `index.html` so React Router can handle the URL. Without it, refreshing on a page such as `/groups/123` shows Vercel's 404 page.
