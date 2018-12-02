import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ChaptersScreen from '../screens/ChaptersScreen';
import CommentariesScreen from '../screens/CommentariesScreen';

//The pre-loaded icons can be viewed @ https://ionicons.com/
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
  navigationOptions: {
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
    },
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'cinzel',
      },
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'HOME',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ChaptersStack = createStackNavigator({
  Chapters: ChaptersScreen,
  },
  {
  navigationOptions: {
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
    },
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'cinzel',
      },
    }
  }
);

ChaptersStack.navigationOptions = {
  tabBarLabel: 'CHAPTERS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
         ? `ios-paper${focused ? '' : '-outline'}`
         : 'md-paper'}
    />
  ),
};

const CommentariesStack = createStackNavigator({
  Commentaries: CommentariesScreen,
  },
  {
  navigationOptions: {
    headerStyle: {
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
    },
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'cinzel',
      },
    }
  }
);

/*
  * Changed label from 'Settings' to 'Meditations' below
  * At some point we should clean up the file names and classes that refer to 'Settings'
*/
CommentariesStack.navigationOptions = {
  tabBarLabel: 'COMMENTARIES',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
      ? `ios-headset${focused ? '' : '-outline'}`
      : 'md-headset'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ChaptersStack,
  CommentariesStack,
});
