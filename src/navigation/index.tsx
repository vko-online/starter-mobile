import {
  createStackNavigator
} from 'react-navigation'
import { connect } from 'react-redux'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'

import Auth from '../screens/auth'
import Main from '../screens/main'

const AppNavigator = createStackNavigator({
  Main: { screen: Main },
  Auth: { screen: Auth }
})

export const navReducer = createNavigationReducer(AppNavigator)
export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state: any) => state.nav
)

const App: any = reduxifyNavigator(AppNavigator, 'root')
const mapStateToProps = (state: any) => ({
  state: state.nav
})

export default connect(mapStateToProps)(App)
