module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["/*.*"],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".scss"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
    react: {
      version: "^17.0.2",
    },
  },
  globals: {
    moment: true,
    document: true,
    window: true,
    localStorage: true,
    Audio: true,
    Event: true,
    Blob: true,
  },
  rules: {
    "func-names": "off",

    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
    "max-len": ["off", { code: 80, ignoreComments: true }],
    "no-console": "off",
    "no-nested-ternary": "error",
    "no-else-return": "error",
    "react/react-in-jsx-scope": "off",
    "no-undef": "off",

    "comma-dangle": "off",
    radix: "off",
    eqeqeq: ["error", "smart"],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/display-name": "off",
    "react/prefer-stateless-function": "error",
    "import/prefer-default-export": "off",
    "import/order": ["error", { groups: ["external", "internal"] }],
    "import/no-cycle": ["warn", { ignoreExternal: true }],
    "no-shadow": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    "@typescript-eslint/no-shadow": ["off"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/comma-dangle": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": {
            message: "Prefer explicit types for clarity",
          },
        },
      },
    ],
  },
};
