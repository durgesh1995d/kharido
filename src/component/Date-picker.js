import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import DatePicker from 'react-native-date-picker';

export default function CustomDatePicker(props) {
  const {
    label,
    selectedDate,
    rootStyle,
    dateBlocker,
    dateBlockermax,
    placeholder,
  } = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const labelVal =
    typeof label === 'object' ? moment(label).format('YYYY-MM-DD') : label;
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setOpen(true)}>
      <View style={[styles.datePickerWrapper, styles.row, rootStyle]}>
        <Text style={{color: '#000', fontSize: 20}}>{labelVal}</Text>
        <View style={{padding: 2}}>{/* <Calender2 /> */}</View>
      </View>
      {/* <DatePicker
        minimumDate={new Date()}
        maximumDate={dateBlockermax ? new Date() : null}
        modal
        rightAddOn
        rightAddOnIcon
        minuteInterval={60}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          selectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        textColor="#000"
      /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    padding: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerWrapper: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 7,
  },
  datePickerLabel: {
    color: 'gray',
  },
});
