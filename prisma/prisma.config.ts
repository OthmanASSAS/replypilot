import { defineCliConfig } from "prisma/cli";

const config = defineCliConfig({
  seed: {
    exec: "tsx prisma/seed.ts",
  },
});

export default config;
