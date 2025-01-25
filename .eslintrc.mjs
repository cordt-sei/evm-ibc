export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/no-cycle': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
  },
  plugins: ['import', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      },
      node: true
    }
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', 'webpack.config.js']
};