import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Alert} from 'react-native';
import * as Actions from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Button from '../component/Button';
import CustomDatePicker from '../component/Date-picker';

const CreateMatch = () => {
  const dispatch = useDispatch();

  const matches = useSelector(state => state.match);

  const navigation = useNavigation();
  const [scheduleData, setScheduleData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [timeValidation, setTimeValidation] = useState(false);

  useEffect(() => {
    dispatch(Actions.viewMatches());
  }, []);

  useEffect(() => {
    setScheduleData(matches.matches);
  }, [matches.matches]);

  const handleCreateMatch = () => {
    if (fromDate == null) {
      return Alert.alert('Please Select Date and Time');
    }
    if (timeValidation) {
      return Alert.alert('Please Select different Time');
    }
    const match = {
      id: Math.random().toString(),
      date: moment(fromDate).format('YYYY-MM-DD'),
      time: moment(fromDate).format('HH:mm'),
    };
    dispatch(Actions.addMatch(match));
    navigation.goBack();
  };

  const checkingSlot = date => {
    if (date != null) {
      for (let slot = 0; slot < scheduleData.length; slot++) {
        if (
          moment(moment(date).format('YYYY-MM-DD')).isSame(
            moment(scheduleData[slot]?.date),
          )
        ) {
          if (moment(date).format('HH:mm') != scheduleData[slot]?.time) {
            setTimeValidation(false);
            setFromDate(date);
          } else {
            setTimeValidation(true);
            Alert.alert('same time Already Scheduled on match');
            break;
          }
        } else {
          setFromDate(date);
          setTimeValidation(false);
        }
      }
      if (scheduleData.length == 0) {
        setFromDate(date);
      }
    } else {
      return Alert.alert('Please Select Date and Time');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#000',
        }}>
        Date And Time:
      </Text>
      <CustomDatePicker
        title={'From'}
        label={
          (fromDate != null &&
            moment(fromDate).format('DD-MM-YYYY | hh:mm A')) ||
          'Select Date and time'
        }
        selectedDate={selectedDate => checkingSlot(selectedDate)}
      />
      <View style={{paddingVertical: 20}}>
        <Button
          title="Create Match"
          onPress={handleCreateMatch}
          textStyle={{fontSize: 24}}
        />
      </View>
    </View>
  );
};

export default CreateMatch;
