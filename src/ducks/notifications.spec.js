//test utils
import {Reducer} from 'redux-testkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAsyncStorage from '../../test/mock/AsyncStorage';
import MockPermissions from '../../test/mock/Permissions';
import MockNotifications from '../../test/mock/Notifications';
import testDeck from '../../test/mock/deck';
import testCard from '../../test/mock/card';
import {storageKey} from '../common/constants/config';

//test methods
import {
	messages,
	NOTIFICATION_KEY,
	clearLocalNotification,
	notificationMessage,
	createNotification,
	setLocalNotification,
} from './notifications';

//mocks

const AsyncStorage = new MockAsyncStorage();
const Granted = new MockPermissions({status: {notifications: 'granted'}});
const Denied = new MockPermissions({status: {notifications: 'undetermined'}});
let Notifications;

describe('Push notifications tests', () => {
	beforeEach(() => {
		AsyncStorage.clear();
		Notifications = new MockNotifications();
	});

	it('correctly forms a notification message', async () => {
		await clearLocalNotification(AsyncStorage, Notifications);
		expect(Notifications.cancelAllScheduledNotificationsAsync).toBeCalled();
	});
	it('correctly clears a notification message', () => {
		const notification = createNotification();
		const body = notification.body;
		expect(notification.title).toEqual('Time to take a quiz on Flashr!');
		expect(messages.includes(body.substring(0, body.length - 1))).toBe(true);
	});
	it('does not set local notification if permission is not granted', async () => {
		await setLocalNotification(AsyncStorage, Denied, Notifications);
		expect(Denied.askAsync).toBeCalled();
		expect(Notifications.cancelAllScheduledNotificationsAsync).not.toBeCalled();
		expect(Notifications.scheduleLocalNotificationAsync).not.toBeCalled();
		const storedKey = await AsyncStorage.getItem(NOTIFICATION_KEY);
		expect(storedKey).toBeFalsy();
	});
	it('does not set local notification if it has already been set', async () => {
		await AsyncStorage.setItem(NOTIFICATION_KEY, 'O Hai!');
		await setLocalNotification(AsyncStorage, Granted, Notifications);
		expect(Notifications.cancelAllScheduledNotificationsAsync).not.toBeCalled();
		expect(Notifications.scheduleLocalNotificationAsync).not.toBeCalled();
	});
	it('correctly sets local notification if permission granted', async () => {
		await setLocalNotification(AsyncStorage, Granted, Notifications);
		expect(Notifications.cancelAllScheduledNotificationsAsync).toBeCalled();
		expect(Notifications.scheduleLocalNotificationAsync).toBeCalled();
		expect(AsyncStorage.getItem(NOTIFICATION_KEY)).toBeTruthy();
	});
});
