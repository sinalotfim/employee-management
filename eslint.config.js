import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    {
        rules: {
            // Disable strict TypeScript checks
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-non-null-assertion": "off",
            // Disable React specific rules
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            // Disable other strict rules
            "no-console": "off",
            "no-unused-vars": "off",
            // Disable other rules that might be too strict
            "no-undef": "warn",
        },
    },
    {
        // Add Jest environment for test files
        files: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx"],
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        // Ignore test files
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/__tests__/**",
        "**/jest.config.js",
        "**/jest.setup.js",
    ]),
]);

export default eslintConfig;
