import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Un identifiant préfixé par `_` signale un paramètre gardé dans la
      // signature mais pas encore utilisé — la situation reste visible dans le
      // code au lieu d'être masquée par une règle en warning.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Fichier de configuration Tailwind : un export anonyme y est la forme
    // attendue par l'outil.
    files: ["tailwind.config.js", "postcss.config.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
]);
