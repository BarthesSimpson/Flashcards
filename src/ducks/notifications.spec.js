//test utils
import { Reducer } from 'redux-testkit'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from '../../test/mock/AsyncStorage'
import MockPermissions from '../../test/mock/Permissions'
import testDeck from '../../test/mock/deck'
import testCard from '../../test/mock/card'
import { storageKey } from '../common/constants/config'

//test methods
import {
  messages,
  NOTIFICATION_KEY,
  notificationMessage,
  createNotification,
  setLocalNotification
} from './notifications'

//mocks

const AsyncStorage = new MockAsyncStorage()
const Granted = new MockPermissions({notifications: 'granted'})
const Denied = new MockPermissions({notifications: 'undetermined'})

describe('Push notifications tests', () => {
  beforeEach(() => {
    AsyncStorage.clear()
  })

  it('correctly forms a notification message', () => {
    const notification = createNotification()
    const body = notification.body
    expect(notification.title).toEqual('Time to take a quiz on Flashr!')
    expect(messages.includes(body.substring(0, body.length - 1))).toBe(true)
  })
  it('does not set local notification if permission is not granted', done => {
    setLocalNotification(AsyncStorage, Denied).then(done())
    expect(Denied.askAsync).toBeCalled()
    expect(Notifications.cancelAllScheduledNotificationsAsync).not.toBeCalled()
    expect(Notifications.scheduleLocalNotificationAsync).not.toBeCalled()
    expect(AsyncStorage.getItem(NOTIFICATION_KEY)).toBeFalsy()
  })
  // it('does not set local notification if it has already been set', done => {
  //   AsyncStorage.setItem(NOTIFICATION_KEY, 'O Hai!').then(() => {
  //     setLocalNotification(AsyncStorage).then(done())
  //   })
  //   expect(Notifications.cancelAllScheduledNotificationsAsync).not.toBeCalled()
  //   expect(Notifications.scheduleLocalNotificationAsync).not.toBeCalled()
  //   //   expect(AsyncStorage.getItem(NOTIFICATION_KEY)).toBeFalsy()
  // })
  // it('correctly sets local notification if permission granted', done => {
  //   setLocalNotification(AsyncStorage).then(done())
  //   expect(Notifications.cancelAllScheduledNotificationsAsync).toBeCalled()
  //   expect(Notifications.scheduleLocalNotificationAsync).toBeCalled()
  //   //   expect(AsyncStorage.getItem(NOTIFICATION_KEY)).toBeTruthy()
  // })
})
