import {Notifications, Permissions} from 'expo';
import {AsyncStorage} from 'react-native';

export const NOTIFICATION_KEY = 'Flashr:notifications';

export const messages = [
	'Practice makes perfect',
	'Consistency is key',
	"When you're busy, it's extra important to take time out",
	"Curiosity didn't kill the cat; Lack of studying did",
];

export function notificationMessage() {
	return `${messages[Math.floor(Math.random() * messages.length)]}!`;
}

export function createNotification() {
	return {
		title: 'Time to take a quiz on Flashr!',
		body: notificationMessage(),
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		},
	};
}

export async function clearLocalNotification(
	storage = AsyncStorage,
	notifications = Notifications
) {
	await AsyncStorage.removeItem(NOTIFICATION_KEY);
	notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification(
	storage = AsyncStorage,
	permissions = Permissions,
	notifications = Notifications
) {
	const data = await storage.getItem(NOTIFICATION_KEY);
	if (data === null) {
		const status = await permissions.askAsync(permissions.NOTIFICATIONS);
		if (status === 'granted') {
			notifications.cancelAllScheduledNotificationsAsync();
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(20);
			tomorrow.setMinutes(0);
			notifications.scheduleLocalNotificationAsync(createNotification(), {
				time: tomorrow,
				repeat: 'day',
			});
			storage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
		}
	}
}
