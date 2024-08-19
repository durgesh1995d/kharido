import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Card from '../component/Card';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <Card title={'Create Match'} opPress={() => navigate('CreateMatch')} />
      <Card
        title={'Schedule Match'}
        opPress={() => navigate('ScheduleMatch')}
      />
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

export default HomeScreen;
