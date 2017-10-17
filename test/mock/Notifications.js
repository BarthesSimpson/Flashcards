export default class Notifications {
  constructor(cache = {}) {}
  cancelAllScheduledNotificationsAsync = jest.fn(localNotificationId => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  })
  scheduleLocalNotificationAsync = jest.fn(
    (localNotification, schedulingOptions) => {
      return new Promise((resolve, reject) => {
        resolve('localNotificationId')
      })
    }
  )
}
