module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:boundaries/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        '@vue/eslint-config-typescript/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['import', 'vue', 'prettier', 'boundaries', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            typescript: true,
            node: true,
        },
        'boundaries/include': ['src/**/*'],
        'boundaries/elements': [
            {
                type: 'app',
                pattern: 'app',
            },
            {
                type: 'pages',
                pattern: 'src/pages/*',
                capture: ['page'],
            },
            {
                type: 'widgets',
                pattern: 'widgets/*',
                capture: ['widget'],
            },
            {
                type: 'features',
                pattern: 'features/*',
                capture: ['feature'],
            },
            {
                type: 'entities',
                pattern: 'entities/*',
                capture: ['entity'],
            },
            {
                type: 'shared',
                pattern: 'shared/*',
                capture: ['segment'],
            },
        ],
        'boundaries/ignore': ['**/*.test.*'],
    },
    rules: {
        // ESLint Core Rules
        'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'no-console': 'error',
        'no-debugger': 'error',

        // Vue Rules
        'vue/no-parsing-error': 'error',
        'vue/valid-template-root': 'error',
        'vue/v-bind-style': 'error',
        'vue/require-prop-types': 'error',
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/no-multi-spaces': 'error',
        'vue/padding-line-between-blocks': 'error',
        'vue/v-slot-style': ['error', 'shorthand'],
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/define-macros-order': [
            'error',
            { defineExposeLast: true, order: ['defineProps', 'defineEmits', 'defineModel'] },
        ],
        'vue/v-for-delimiter-style': 'error',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }],
        // 'vue/max-attributes-per-line': ['error', { singleline: 1, multiline: 1 }],
        'vue/html-self-closing': [
            'error',
            {
                html: { void: 'always', normal: 'never', component: 'always' },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: true }],
        'vue/no-irregular-whitespace': [
            'error',
            {
                skipStrings: true,
                skipComments: false,
                skipRegExps: false,
                skipTemplates: false,
                skipHTMLAttributeValues: false,
                skipHTMLTextContents: false,
            },
        ],
        'vue/no-dupe-keys': 'error',
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'key',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    ['provide', 'inject'],
                    'ROUTER_GUARDS',
                    'layout',
                    'middleware',
                    'validate',
                    'scrollToTop',
                    'transition',
                    'loading',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'emits',
                    'setup',
                    'asyncData',
                    'data',
                    'fetch',
                    'head',
                    'computed',
                    'watch',
                    'watchQuery',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError',
                ],
            },
        ],

        // Import Rules
        'import/export': 'error',
        'import/no-deprecated': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-unused-modules': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-amd': 'error',
        'import/no-commonjs': 'error',
        'import/no-import-module-exports': 'error',
        'import/no-nodejs-modules': 'off',
        'import/unambiguous': 'off',
        'import/default': 'error',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/no-absolute-path': 'error',
        'import/no-cycle': 'error',
        'import/no-dynamic-require': 'error',
        'import/no-internal-modules': 'off',
        'import/no-relative-packages': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
        'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/consistent-type-specifier-style': 'error',
        'import/extensions': ['error', 'never', { ts: 'never', tsx: 'never', json: 'always', scss: 'always' }],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-named-default': 'error',
        'import/no-namespace': 'error',
        'import/no-unassigned-import': [
            'error',
            {
                allow: ['**/*.css', '**/*.scss', '**/*.less', '**/*.sass'],
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'never',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                distinctGroup: true,
            },
        ],
        // boundaries rules
        'boundaries/element-types': [
            2,
            {
                default: 'allow',
                message: '${file.type} is not allowed to import (${dependency.type})',
                rules: [
                    {
                        from: ['shared'],
                        disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
                        message: 'Shared module must not import upper layers (${dependency.type})',
                    },
                    {
                        from: ['entities'],
                        message: 'Entity must not import upper layers (${dependency.type})',
                        disallow: ['app', 'pages', 'widgets', 'features'],
                    },
                    {
                        from: ['entities'],
                        message: 'Entity must not import other entity',
                        disallow: [
                            [
                                'entities',
                                {
                                    entity: '!${entity}',
                                },
                            ],
                        ],
                    },
                    {
                        from: ['features'],
                        message: 'Feature must not import upper layers (${dependency.type})',
                        disallow: ['app', 'pages', 'widgets'],
                    },
                    {
                        from: ['features'],
                        message: 'Feature must not import other feature',
                        disallow: [
                            [
                                'features',
                                {
                                    feature: '!${feature}',
                                },
                            ],
                        ],
                    },
                    {
                        from: ['widgets'],
                        message: 'Feature must not import upper layers (${dependency.type})',
                        disallow: ['app', 'pages'],
                    },
                    {
                        from: ['widgets'],
                        message: 'Widget must not import other widget',
                        disallow: [
                            [
                                'widgets',
                                {
                                    widget: '!${widget}',
                                },
                            ],
                        ],
                    },
                    {
                        from: ['pages'],
                        message: 'Page must not import upper layers (${dependency.type})',
                        disallow: ['app'],
                    },
                    {
                        from: ['pages'],
                        message: 'Page must not import other page',
                        disallow: [
                            [
                                'pages',
                                {
                                    page: '!${page}',
                                },
                            ],
                        ],
                    },
                ],
            },
        ],
    },
};
