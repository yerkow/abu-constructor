FROM node:18-alpine AS base

# Установка необходимых зависимостей
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Установка зависимостей
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Сборка приложения
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Производственный образ
FROM node:18-alpine AS runner

WORKDIR /app

# Устанавливаем переменную окружения
ENV NODE_ENV development  # Устанавливаем режим разработки
ENV PORT 3000

# Создаем группу и пользователя для запуска приложения
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из стадии сборки
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Устанавливаем правильные разрешения
RUN mkdir .next && chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

# Запуск приложения в режиме разработки
CMD ["npm", "run", "dev"]
