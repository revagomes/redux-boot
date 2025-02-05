import {createAction} from 'redux-actions'
import processModules from './processModules'
import configureStore from './configureStore'

export const BOOT = 'redux-boot/BOOT'

export default function boot(initialState = {}, modules = []) {
  const {reducers, middlewares} = processModules(modules)

  let store = configureStore(initialState, reducers, middlewares)

  return store
    .dispatch(bootAction(initialState))
    .then(action => {
      return {
        action,
        store
      }
    })
}

export const bootAction = createAction(BOOT, async initialState => initialState)
