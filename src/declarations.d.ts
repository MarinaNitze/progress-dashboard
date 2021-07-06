declare const graphql: (query: TemplateStringsArray) => void

declare module '*.yml' {
    const data: any
    export default data
  }