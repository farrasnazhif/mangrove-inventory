# mangrove-inventory

Frontend for the Mangrove Carbon Stock Inventory.

## Clone and run

You need [Node.js](https://nodejs.org/) 22 and [pnpm](https://pnpm.io/) 10.13.1 (`corepack enable` installs the right pnpm).

```sh
git clone https://github.com/farrasnazhif/mangrove-inventory.git
cd mangrove-inventory
nvm use          # selects Node 22 from .nvmrc
pnpm install
pnpm run dev
```

Open http://localhost:3000. The pages that fetch data call the backend (`mangrove-be`), by default at `http://localhost:8080/api/v1`. To use another address, copy the example and edit it, then restart `pnpm run dev`:

```sh
cp .env.example .env.local
```

More commands and notes: [docs/setup.md](docs/setup.md).
