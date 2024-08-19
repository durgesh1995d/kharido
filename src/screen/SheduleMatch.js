import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../redux/actions';
import Button from '../component/Button';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const ScheduleMatch = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const matches = useSelector(state => state.match);

  useEffect(() => {
    dispatch(Actions.viewMatches());
  }, []);

  const deletefn = id => {
    dispatch(Actions.deleteMatch(id));
  };

  return (
    <View style={styles.container}>
      <Text>Match Schedules:</Text>
      <FlatList
        data={matches.matches}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.textStyle}>Date : </Text>
                <Text style={styles.textStyle}>
                  {item.date} - {item.time}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textStyle}>Time : </Text>
                <Text style={styles.textStyle}>
                  {moment(item.time, ['HH:mm']).format('h:mm A')}
                </Text>
              </View>
              <View
                style={[
                  styles.row,
                  {justifyContent: 'space-around', paddingTop: 10},
                ]}>
                {console.log('console==>', item?.teamDetail)}
                <Button
                  title={
                    item?.teamDetail != undefined ? 'Edit Team' : 'Add Team'
                  }
                  onPress={() => navigate('Add Team', {matchDetails: item})}
                />
                <Button
                  title="Cancel Match"
                  onPress={() => deletefn(item.id)}
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return <Text>Empty List</Text>;
        }}
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
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
  },
});

export default ScheduleMatch;
