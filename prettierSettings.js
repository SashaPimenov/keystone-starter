/** @type {import('prettier').Config} */

module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  parser: 'typescript',
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'decorators-legacy'
  ],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  jsxSingleQuote: true,
  printWidth: 150,
  endOfLine: 'auto'
}
