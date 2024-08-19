import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as Actions from '../redux/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const {height: DEVICE_WINDOW_HEIGHT, width: DEVICE_WINDOW_WIDTH} =
  Dimensions.get('window');

const AddTeam = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [matchDetails, setMatchDetails] = useState(null);
  const PlayerList = [
    {name: 'KL Rahul', id: 1},
    {name: 'Arshdeep Singh', id: 2},
    {name: 'Yuzvendra Chahal', id: 3},
    {name: 'Rohit Sharma', id: 4},
    {name: 'Wriddhiman Shaha', id: 5},
    {name: 'Sanju Samson', id: 6},
    {name: 'MS Dhoni', id: 7},
    {name: 'Virat Kohli', id: 8},
    {name: 'Washington Sundar', id: 9},
    {name: 'Sachin Tendulkar', id: 10},
    {name: 'Jasprit Bumrah', id: 11},
    {name: 'Ravichandran Ashwin', id: 12},
    {name: 'Ravindra Jadeja', id: 13},
    {name: 'Rishabh Pant', id: 14},
  ];

  // Match Details Data
  useEffect(() => {
    if (props?.route?.params?.matchDetails) {
      setMatchDetails(props?.route?.params?.matchDetails);
      if (props?.route?.params?.matchDetails?.teamDetail) {
        setSelectedPlayers(props?.route?.params?.matchDetails?.teamDetail);
      }
    }
  }, [props?.route?.params]);

  const PlayerFn = data => {
    if (selectedPlayers.length < 11) {
      let playerLists = selectedPlayers;
      let checkInList = selectedPlayers.some(item => item.id == data.id);
      if (!checkInList) {
        playerLists.push(data);
      }
      if (checkInList) {
        Alert.alert('This Player already selected');
      }
      setSelectedPlayers(playerLists);
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const deleteFn = useCallback(
    data => {
      let array = [];
      for (let item = 0; item < selectedPlayers.length; item++) {
        if (selectedPlayers[item].id == data.id) {
          continue;
        } else {
          array.push(selectedPlayers[item]);
        }
      }
      setSelectedPlayers(array);
    },
    [selectedPlayers],
  );

  const onSubmit = () => {
    if (selectedPlayers?.length != 11) {
      return Alert.alert('Please select 11 players');
    }
    const match = {
      id: matchDetails?.id,
      date: matchDetails?.date,
      time: matchDetails?.time,
      teamDetail: selectedPlayers,
    };
    dispatch(Actions.updateMatch(match));
    Alert.alert('Players Added');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.textStyle}>AddTeam</Text>
        <TouchableOpacity onPress={() => onSubmit()}>
          <Text style={{color: 'blue'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      {!show ? (
        selectedPlayers.length < 11 && (
          <TouchableOpacity onPress={() => setShow(true)} style={styles.card}>
            <Text style={{color: '#000'}}>Select Team Member</Text>
          </TouchableOpacity>
        )
      ) : (
        <View style={[styles.card, {height: 200}]}>
          <FlatList
            data={PlayerList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    PlayerFn(item);
                  }}
                  key={index}
                  style={{paddingVertical: 5}}>
                  <Text style={{color: '#000'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <View
        style={[
          styles.row,
          {
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: DEVICE_WINDOW_WIDTH - 40,
          },
        ]}>
        {selectedPlayers.length > 0 &&
          selectedPlayers?.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    deleteFn(item);
                  }}>
                  <View style={styles.deleteView}>
                    <Text style={styles.deleteText}>x</Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.card, {margin: 5}]}>
                  <Text style={{color: '#000'}}>{item?.name}</Text>
                </View>
              </View>
            );
          })}
      </View>
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
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: '#aaa',
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  deleteView: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#000',
  },
  deleteText: {
    fontSize: 18,
    color: '#000',
    marginTop: -5,
  },
});

export default AddTeam;
