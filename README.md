# Frontend Developer Assignments

A monorepo containing two assignments built with React ecosystem tools.

---

## Projects

| Folder | Description | Stack |
|---|---|---|
| [`react-task-manager/`](#1-react-task-manager) | Web task manager with CRUD, filters, and persistence | Vite · React · Redux Toolkit · Tailwind CSS v4 |
| [`react-native-user-list/`](#2-react-native-user-list) | Mobile user list with search and client-side pagination | Expo · NativeWind · RTK Query · redux-persist |

---

## 1. React Task Manager

### Features

- Add tasks with a title and priority (High / Medium / Low)
- Edit tasks inline with a priority selector
- Delete tasks with a confirmation modal
- Toggle task completion with visual line-through
- Filter tasks by priority (All / High / Medium / Low)
- Task counter shows total and completed counts
- Persists to `localStorage` — survives page refreshes
- Custom SVG icon set in a central `icons/` folder
- Reusable `Button` and `Badge` UI primitives

### Tech Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Redux Toolkit](https://redux-toolkit.js.org/) — slice with `addTask`, `deleteTask`, `toggleTask`, `editTask`, `setFilter`
- [Tailwind CSS v4](https://tailwindcss.com/) — via `@tailwindcss/vite` plugin (no config file)
- Custom `localStorage` middleware — no external persistence library

### Project Structure

```
react-task-manager/src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Reusable button (primary / ghost / danger variants)
│   │   ├── Badge.tsx         # Priority badge (High / Medium / Low colors)
│   │   └── ConfirmModal.tsx  # Delete confirmation overlay with Escape key support
│   ├── icons/
│   │   └── index.tsx         # Central SVG icon exports
│   ├── Header.tsx            # App title + task counter chips
│   ├── FilterBar.tsx         # Priority filter tabs
│   ├── TaskForm.tsx          # Add task input + priority select
│   ├── TaskList.tsx          # Filtered task list
│   └── TaskItem.tsx          # Single task row (view / edit mode)
├── redux/
│   ├── store.ts              # Store + localStorage middleware
│   └── tasksSlice.ts         # Task state, actions, and selectors
└── types.ts                  # Task, Priority, FilterValue types
```

### Setup

```bash
cd react-task-manager
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 2. React Native User List

### Features

- Fetches all users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) in a single API call
- Client-side pagination — shows 5 users at a time; "Load More" reveals the next 5
- Live search by name — filters instantly as you type (bypasses pagination)
- Header displays total loaded vs. currently shown
- UserCard shows avatar initial, full name, username, email, and formatted address
- Offline support — user list cached to `AsyncStorage` via `redux-persist`
- Custom icon set using `@expo/vector-icons` (Ionicons)
- Reusable `Button` and `Input` UI primitives (NativeWind styled)

### Tech Stack

- [Expo](https://expo.dev/) SDK 54 + React Native + TypeScript
- [NativeWind v4](https://www.nativewind.dev/) — Tailwind CSS for React Native
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) — data fetching and caching
- [redux-persist](https://github.com/rt2zz/redux-persist) + `AsyncStorage` — offline persistence
- [`@expo/vector-icons`](https://docs.expo.dev/guides/icons/) — Ionicons vector icons

### Project Structure

```
react-native-user-list/src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Reusable button (primary / outline / ghost / danger)
│   │   └── Input.tsx         # Reusable text input with label, icons, and error
│   ├── icons/
│   │   └── index.tsx         # Central Ionicons exports (IconPeople, IconMail, …)
│   ├── Header.tsx            # Stats chips (loaded / shown)
│   ├── SearchBar.tsx         # Controlled search input
│   ├── UserCard.tsx          # User info card (memoised)
│   └── LoadMoreButton.tsx    # "Load More" / loading state button
├── screens/
│   └── UserListScreen.tsx    # Main screen — fetches, caches, paginates, searches
├── redux/
│   ├── store.ts              # Store + redux-persist config
│   ├── usersApi.ts           # RTK Query endpoint (GET /users)
│   └── usersSlice.ts         # cachedUsers, displayedCount, searchQuery state
├── utils/
│   └── formatAddress.ts      # Formats User.address to a single string
└── types.ts                  # User, Address interfaces
```

### Environment Setup

Create a `.env` file in the `react-native-user-list/` folder:

```env
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

### Setup

```bash
cd react-native-user-list
npm install
npx expo start --clear
```

Scan the QR code with [Expo Go](https://expo.dev/go) on your device, or press `a` for Android emulator / `i` for iOS simulator.
