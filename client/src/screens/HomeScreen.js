import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

const HomeScreen = props => {
  const { userInfo } = props;
  return userInfo ? (
    <View style={styles.mainContainer}>
      <Text>Home Screen</Text>
      <Text>Welcome {userInfo.name}</Text>
      <Image style={styles.image} source={{ uri: `${userInfo.pictureUrl}` }} />
    </View>
  ) : (
    <Text> Nothing here </Text>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: '#4cfcf3',
    marginBottom: 20,
  },
});

const mapState = ({ userInfo }) => ({ userInfo });
export default connect(mapState)(HomeScreen);
