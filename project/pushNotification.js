import axios from 'axios';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import config from '../../config';
import {Alert} from 'react-native';

export const registerForPush = (patientId) => (dispatch) => {
  console.log('')
  PushNotification.configure({
    onRegister: function (token) {
      console.log(token.token, 'firebase token in android');
      console.log('Expert----', patientId)
      PushNotification.subscribeToTopic('all');
      axios
        .post(config.url + '/api/device-tokens/create', {
          osType: 'android',
          notificationToken: token.token,
          user : patientId
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('====Res Notification====', res.data)
            console.log(res.data.deviceToken._id, '=========deviceid in android===========');
            dispatch({
              type: 'device_id',
              deviceToken: res.data.deviceToken._id,
            });
          }
        });
    },

    onNotification: function (notification) {
      PushNotification.localNotification({
        channelId: 'grad_patient', // Ensure this channel ID matches the one created in your notification setup
        title: notification.title,
        message: notification.message,
        playSound: true,
        soundName: 'default',
      });
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};


