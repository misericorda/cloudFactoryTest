import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from 'react-navigation';
import About from "./src/screens/About"
import Prices from "./src/screens/Prices"


export default createBottomTabNavigator(
  {
    'О приолжении': About,
    'Котировки': Prices,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = routeName === 'О Приолжении' ? 'ios-home' : 'ios-stats';
        return <Icon name={iconName} size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
