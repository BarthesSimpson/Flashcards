/**
 * @param {Object} status - key/value pairs for permissions
 * (notifications, location, camera, audioRecording, contacts)
 * N.B The status should be 'granted' or 'undetermined' ('denied' doesn't exist)
 */
export default class Permissions {
  constructor({ status }) {
    this.status = status
  }
  askAsync = jest.fn(
    key => new Promise((resolve, reject) => resolve(this.status[key]))
  )
  NOTIFICATIONS = 'notifications'
  LOCATION = 'location'
  CAMERA = 'camera'
  AUDIO_RECORDING = 'audioRecording'
  CONTACTS = 'contacts'
}
