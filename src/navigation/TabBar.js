import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.transitioningView}>
        {state.routes.map((element, index) => {
          let routeName = element?.name;
          let iconName;
          if (routeName === 'Home') {
            iconName = require('../assets/ic_tab_dashboard.png');
          } else if (routeName === 'CartScreen') {
            iconName = require('../assets/ic_tab_community.png');
          } else if (routeName === 'Finance') {
            iconName = require('../assets/ic_tab_finance.png');
          } else if (routeName === 'More') {
            iconName = require('../assets/ic_tab_more.png');
          }
          return (
            <View style={{backgroundColor: '#fff'}} key={element?.name}>
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                onPress={() => {
                  // Navigate using the `navigation` prop that you received
                  navigation.navigate(element.name);
                }}>
                <View style={{alignSelf: 'center'}}>
                  <Image
                    source={iconName}
                    style={{
                      width: 26,
                      height: 26,
                      tintColor: state?.index === index ? 'red' : '#000',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: state?.index === index ? 'red' : '#000',
                    fontFamily: state?.index === index ? 'Bold' : 'Light',
                  }}>
                  {element.name === 'Finance'
                    ? 'My Finance'
                    : element.name === 'Community'
                    ? 'My Community'
                    : element.name === 'Overview'
                    ? 'Dashboard'
                    : element.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    // marginBottom:
    // Dimensions.get('window').height < 850 ||
    //   (Dimensions.get('window').height > 900 && Platform.OS === 'ios')
    //   ? 30
    //   : 0,
  },
  transitioningView: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    paddingRight: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default React.memo(TabBar);
