declare module 'apollo-link-redux'
declare module 'apollo-upload-client'
declare module 'redux-persist/lib/integration/react'

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const value: DocumentNode
  export default value
}
