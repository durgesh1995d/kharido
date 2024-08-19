import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Card = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.opPress}>
        <View style={styles.card}>
          <Text style={styles.textStyle}>
            {props?.title ? props?.title : 'Create Match'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  card: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'red',
  },
});

export default Card;
