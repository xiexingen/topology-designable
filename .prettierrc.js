module.exports = {
    pluginSearchDirs: false,
    plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
    printWidth: 80,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'preserve',
            },
        },
    ],
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: [
        '<TYPE>^[./]',
        '<THIRD_PARTY_TYPES>',
        '^react',
        '^lodash/(.*)$',
        '^classnames$',
        '^html-to-image$',
        '^antd$',
        '^antd-(.*)$',
        // "^@antv/(.*)$",
        '^@ant-design(.*)$',
        '^@formily(.*)$',
        '^ahooks$',
        '^@/(.*)$',
        '^../(.*)$',
        '^./(.*)$',
        '^[./]',
    ],
    // importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
