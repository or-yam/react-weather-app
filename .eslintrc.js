module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-unused-expressions': 0,
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': ['warn', { forbid: [] }],
    'react/jsx-props-no-spreading': 0,
    'comma-dangle': ['error', 'never'],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
  }
};
