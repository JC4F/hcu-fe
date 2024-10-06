# HCU FE

### Use:

- 🛠️ React + Vite
- 🧰 Nx workspace, Nx Cloud
- 🎢 Eslint, Prittier
- 🎨 Storybook for UI library
- ⌨️ Mock Server with Mock Service Worker
- 🎆 Radix UI, Shadcn UI, Tailwind
- 🎎 State Manager: Zustand, React Tanstack Query

### WIP:

- 🛠️ E2E with Playwright

### Install packages

```shell
pnpm i
```

### Setup .env file

```shell
cp apps/hcu-fe/.env.example apps/hcu-fe/.env
```

### Mock Server First

```shell
pnpm mock-server:hcu-fe
```

### Start app

```shell
pnpm dev:hcu-fe
```

### Storybook UI library

```shell
pnpm storybook:hcu-fe
```
