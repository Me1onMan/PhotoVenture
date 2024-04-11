module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["build", ".eslintrc.cjs"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "react-refresh",
    "simple-import-sort",
    "import",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
      typescript: {},
    },
  },
  rules: {
    // "no-param-reassign": "off",
    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react", "^@?\\w"],
          ["^(@|components)(/.*|$)"],
          ["^\\u0000"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["./src/utils/compressImage.ts"],
      rules: {
        "no-new": "off",
      },
    },
    {
      files: ["./src/store/slices/*"],
      rules: {
        "no-param-reassign": "off",
      },
    },
  ],
};
