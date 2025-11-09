const { defineConfig, globalIgnores } = require("eslint/config");
const nextVitals = require("eslint-config-next/core-web-vitals");
const nextTs = require("eslint-config-next/typescript");
const prettier = require("eslint-plugin-prettier/recommended");

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
            "no-undef": "warn",
        },
    },
    {
        // Add Jest environment for test files
        files: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx"],
    },
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "dist/**",
        "next-env.d.ts",

        // Ignore test files
        "node_modules/**",
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/__tests__/**",
        "**/jest.config.js",
        "**/jest.setup.js",
        "**/jest.config.cjs",
        "**/jest.setup.cjs",
        "**/babel.config.js",
        "**/babel.config.cjs",
    ]),
]);

module.exports = eslintConfig;
