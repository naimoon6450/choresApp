import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getUserInfo, retrieveToken } from './../redux/creators';
import GetAllInfoFromServer from './../components/GetAllInfoFromServer';
import marketChoresReducer from '../redux/reducers/marketChoresReducer';
import ChoreCard from '../components/ChoreCard';
import theme from './../styles/theme.style';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
} from 'native-base';

const HomeScreen = props => {
  const { userInfo, userChores, marketChores, navigation } = props;
  // if there's a token in state, then do nothing, otherwise set it again via getToken
  // if (!userInfo.token) getToken();
  // console.log('TOKEN', userInfo.token);

  return (
    <Container>
      <GetAllInfoFromServer />
      <Header style={styles.headerBack}>
        <Left />
        <Body>
          <Title style={{ color: 'white' }}>My Chores</Title>
        </Body>
        <Right />
      </Header>

      <ChoreCard
        name={userChores[0].chore.name}
        diff={userChores[0].chore.difficulty}
        currUserInfo={userInfo}
        details={() =>
          navigation.navigate('Chores', {
            choreName: userChores[0].chore.name,
            details: userChores[0].chore.details[0],
            userName: userInfo.firstName,
            lastName: userInfo.surName,
            timeLimit: userChores[0].chore.timeLimit,
            currChoreId: userChores[0].id,
          })
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'column',
  },
  headerBack: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
});

const mapState = ({ userInfo, userChores, marketChores }) => ({
  userInfo,
  userChores,
  marketChores,
});
const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserInfo()),
    getToken: () => dispatch(retrieveToken()),
  };
};
export default connect(
  mapState,
  mapDispatch
)(HomeScreen);
