module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "xo-space/esnext",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  },
  "env": {
    "jest": true,
    "node": true,
  }
}
