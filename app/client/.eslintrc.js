module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
  },
};
