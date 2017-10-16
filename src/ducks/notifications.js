import { Notifications, Permissions } from 'expo'

export const NOTIFICATION_KEY = 'Flashr:notifications'

export const messages = [
  'Practice makes perfect',
  'Consistency is key',
  "When you're busy, it's extra important to take time out",
  "Curiosity didn't kill the cat; Lack of studying did"
]

export function notificationMessage() {
  return `${messages[Math.floor(Math.random() * messages.length)]}!`
}

export function createNotification() {
  return {
    title: 'Time to take a quiz on Flashr!',
    body: notificationMessage(),
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

export function setLocalNotification(
  storage = AsyncStorage,
  permissions = Permissions,
  notifications = Notifications
) {
  return storage
    .getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        return permissions.askAsync(
          permissions.NOTIFICATIONS
        ).then(({ status }) => {
          if (status === 'granted') {
            notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMintutes(0)

            notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            })

            storage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
