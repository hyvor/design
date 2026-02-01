## Syncing in Dev

Syncing HDS to a product is not supported because [vite does not support](https://github.com/vitejs/vite/issues/8619) hot reloading for files within node_modules.

What I've tried so far:

- `npm run package` on HDS
- mount `./dist` to `node_modules/@hyvor/design/dist` in Docker Compose (`../design/dist:/app/frontend/node_modules/@hyvor/design/dist:ro`)

Better solution for testing cloud components:

```bash
docker compose up

# visit https://design.hyvor.localhost
# API calls will work as long as you set instance to https://hyvor.localhost
## Commands
```

```bash
# fix prettier
npm run format

# fix prettier via Docker (recommended for compatibility issues with CI)
docker compose run design npm run format
```
