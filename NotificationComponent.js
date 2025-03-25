import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPushRegistered } from "../../actions/registerNotification";
import { registerForPush } from "../../push_notification/pushNotification";
import { registerForPushIos } from "../../push_notification/pushNotificationIos";
const NotificationComponent = () => {
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.auth.patientId); // Get expertId from Redux store
  const isPushRegistered = useSelector((state) => state.auth.isPushRegistered); // Get push registration status
  useEffect(() => {
    console.log('is Registered  ---', setPushRegistered);
    const setupPermissionsAndNotifications = async () => {
        try {
         
          if (!isPushRegistered) {
            console.log('Sending req------');
  
            if (Platform.OS === 'ios') {
              dispatch(registerForPushIos());
            } else {
              console.log('Endinnnnnn --------- ');
              dispatch(registerForPush(patientId));
            }
  
            // After successful registration, update Redux state
            dispatch(setPushRegistered());
          } else {
            console.log('Push notification already registered.');
          }
        } catch (error) {
          console.warn('Error during permission request or notification setup:', error);
        }
      };
  
      setupPermissionsAndNotifications();
  }, [patientId, dispatch, isPushRegistered]);

  return null;
};

export default NotificationComponent
