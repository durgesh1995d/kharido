import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListing from '../screen/ProductListing';
import CartScreen from '../screen/CardScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const MainTabRoute = () => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          name="MainTabNavigator"
          initialRouteName="Home"
          tabBar={props => <TabBar {...props} />}
          animationEnabled
          screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={ProductListing} />
          <Tab.Screen name="CartScreen" component={CartScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
};

export default MainTabRoute;
