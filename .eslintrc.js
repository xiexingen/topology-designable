module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-plusplus': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/ban-types': 0,
    'no-return-await': 0,
    'no-template-curly-in-string': 0,
    'no-console': ['error'],
  },
};
