# Environment variables

This project supports multiple backend environments (local / uat / prod).

## Required (server-only)

- **APP_ENV**: `local` | `uat` | `prod`
- **BACKEND_BASE_URL**: backend base URL (e.g. `http://localhost:5000`)

If `BACKEND_BASE_URL` is not set, the app falls back to a built-in mapping in `src/config/urls.server.ts`.

## Notes

- `BACKEND_BASE_URL` is **server-only** and should not be prefixed with `NEXT_PUBLIC_`.
- Frontend code should call Next.js BFF routes under `/api/**` (see `src/api/*`), not the backend directly.


