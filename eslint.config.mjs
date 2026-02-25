// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/presentation/components/FaqBareList.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/application/*", "@/domain/*", "@/infrastructure/*"],
              message:
                "Les composants UI ne doivent pas accéder aux couches métier/infrastructure directement. Utilisez un hook de présentation.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
