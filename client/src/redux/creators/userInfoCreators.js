import * as Facebook from 'expo-facebook';
import axios from 'axios';

// action constants
export const GOT_USER_INFO = 'GOT_USER_INFO';

// action creators
export const gotUserInfo = (name, pictureUrl) => ({
  type: GOT_USER_INFO,
  name,
  pictureUrl,
});

// fb login thunk, using fetch temporarily
export const fbLogin = () => dispatch => {
  Facebook.logInWithReadPermissionsAsync('895184290846348', {
    permissions: ['public_profile'],
  })
    .then(result => {
      const { type, token, expires, permissions, declinedPermissions } = result;
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        axios
          .get(
            `https://graph.facebook.com/me?fields=name,email,hometown,picture&access_token=${token}`
          )
          .then(result => result.data)
          .then(data => {
            // console.log(data);
            // Alert.alert('Logged in!', `Hi ${data.name}!`);
            dispatch(gotUserInfo(data.name, data.picture.data.url));
          })
          .catch(err => console.error('Login error: ', err));
      }
    })
    .catch(err => {
      Alert.alert(`Facebook Login Error: ${err}`);
    });
};
