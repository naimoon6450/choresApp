import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { fbLogin } from '../redux/creators';

const LoginScreen = ({ fbLoginDisp, userInfo, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Button
        style={styles.buttonContainer}
        onPress={() => {
          fbLoginDisp();
          // navigation.navigate('App');
        }}
      >
        <AntDesign name="facebook-square" style={styles.iconStyle} />
        <Text style={styles.buttonText}>Login With Facebook</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 30,
    color: 'white',
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    // alignSelf: 'center',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    // flexGrow: 1,
    textAlign: 'center',
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
const mapDispatchToState = dispatch => {
  return {
    fbLoginDisp: () => dispatch(fbLogin()),
  };
};
export default connect(
  mapState,
  mapDispatchToState
)(LoginScreen);
