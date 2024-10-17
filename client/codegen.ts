import type { CodegenConfig } from "@graphql-codegen/cli";

const apiUri = import.meta.env.VITE_API_URI;

const config: CodegenConfig = {
  schema: apiUri,
  documents: ["src/schema/*.ts"],
  generates: {
    "./src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  overwrite: true,
};

export default config;
