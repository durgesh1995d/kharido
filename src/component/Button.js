import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = props => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={styles.buttonStyle}>
      <View>
        <Text style={[props?.textStyle, {color: '#fff'}]}>{props?.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default Button;
