module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", "node_modules", "coverage", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-hooks", "react-refresh"],
  rules: {
    "react/prop-types": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "args",
          "attach",
          "castShadow",
          "receiveShadow",
          "intensity",
          "groundColor",
          "position",
          "rotation",
          "scale",
          "object",
          "map",
          "position-y",
          "rotation-y",
          "shadow-mapSize",
          "angle",
          "penumbra",
          "transparent",
          "size",
          "sizeAttenuation",
          "depthWrite",
          "color",
          "polygonOffset",
          "polygonOffsetFactor",
          "flatShading",
        ],
      },
    ],
    "react-refresh/only-export-components": "off",
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};
