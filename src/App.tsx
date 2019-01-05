import * as React from 'react'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
// import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apolloReducer } from 'apollo-cache-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReduxLink from 'apollo-link-redux'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistStore, persistCombineReducers } from 'redux-persist'
import ReduxStorage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import { setContext } from 'apollo-link-context'

import { createApolloFetch } from 'apollo-fetch'
import createSagaMiddleware from 'redux-saga'

import AppNavigator, { navReducer, navMiddleware } from './navigation'

import auth from './reducers/auth'
import { logout } from './actions/auth'
import sagas from './sagas'

const REMOTE_HOST = 'localhost'
const REMOTE_HOST_PORT = 8080

export const URL = `${REMOTE_HOST}:${REMOTE_HOST_PORT}` // set your comp's url here

const config = {
  key: 'root',
  storage: ReduxStorage,
  blacklist: ['nav', 'apollo'] // don't persist nav for now
}

const reducer = persistCombineReducers(config, {
  apollo: apolloReducer,
  auth,
  nav: navReducer
})

const sagaMiddleware = createSagaMiddleware()
export const store: any = createStore(
  reducer,
  {}, // initial state
  applyMiddleware(thunk, navMiddleware, sagaMiddleware)
)
sagaMiddleware.run(sagas)

export const fetch = createApolloFetch({
  uri: `http://${URL}/graphql`
})

fetch.use((req: any, next) => {
  if (!req.options.headers) {
    req.options.headers = {}
  }
  // get the authentication token from local storage if it exists
  const jwt = store.getState().auth.jwt
  if (jwt) {
    req.options.headers.authorization = `Bearer ${jwt}`
  }
  next()
})

// persistent storage
const persistor = persistStore(store)

const cache = new InMemoryCache()

const reduxLink = new ReduxLink(store)

// const httpLink = createHttpLink({ uri: `http://${URL}/graphql` })

const uploadLink = createUploadLink({ uri: `http://${URL}/graphql` })

// middleware for requests
const middlewareLink = setContext((req, previousContext) => {
  // get the authentication token from local storage if it exists
  const { jwt } = store.getState().auth
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    }
  }

  return previousContext
})

// afterware for responses
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  let shouldLogout = false
  if (graphQLErrors) {
    console.log({ graphQLErrors })
    graphQLErrors.forEach(({ message, locations, path }: any) => {
      console.log({ message, locations, path })
      if (message === 'Unauthorized') {
        shouldLogout = true
      }
    })

    if (shouldLogout) {
      store.dispatch(logout())
    }
  }
  if (networkError) {
    console.log('[Network error]:')
    console.log({ networkError })
    if (networkError.statusCode === 401) {
      logout()
    }
  }
})

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/subscriptions`, {
  lazy: true,
  reconnect: true,
  connectionParams () {
    // get the authentication token from local storage if it exists
    return { jwt: store.getState().auth.jwt }
  }
})

const webSocketLink = new WebSocketLink(wsClient)

const requestLink = ({ queryOrMutationLink, subscriptionLink }: any) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation }: any = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    subscriptionLink,
    queryOrMutationLink
  )

const link = ApolloLink.from([
  reduxLink,
  errorLink,
  requestLink({
    queryOrMutationLink: middlewareLink.concat(uploadLink),
    subscriptionLink: webSocketLink
  })
])

export const client = new ApolloClient({
  link,
  cache
})

export default class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    )
  }
}
