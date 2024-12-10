const prettierSettings = require('./prettierSettings')

module.exports = {
  $schema:
    'https://json.schemastore.org/eslintrc',
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'next',
    'plugin:react-perf/recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:tailwindcss/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'tailwindcss',
    'react',
    'react-perf',
    'prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'warn',
    'no-unused-vars': 'warn',
    'import/no-anonymous-default-export': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-perf/jsx-no-new-function-as-prop':
      'warn',
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-object-as-prop':
      'warn',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': [
      'error',
      prettierSettings
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index']
        ]
      }
    ]
  },

  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: 'tailwind.config.js'
    },
    next: {
      rootDir: ['./']
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser'
    }
  ]
}
