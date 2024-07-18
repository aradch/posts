module.exports = {
  env: {
    browser: true, // Browser global variables like `window` etc.
    es6: true, // Enable all ECMAScript 6 features except for modules.
    node: true // Defines things like process.env when generating through node
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'semi': 'error',
    'indent': ['error', 2],
    'nonblock-statement-body-position': ['error', 'below'],
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};
