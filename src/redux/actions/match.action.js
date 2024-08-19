import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from '../types';

export const addMatch = match => async dispatch => {
  try {
    // Save match to AsyncStorage
    await AsyncStorage.setItem('match_' + match.id, JSON.stringify(match));
    dispatch({type: types.ADD_MATCH, payload: match});
  } catch (error) {
    console.error('Error adding match:', error);
  }
};

export const updateMatch = match => async dispatch => {
  try {
    // Update match in AsyncStorage
    await AsyncStorage.setItem('match_' + match.id, JSON.stringify(match));
    dispatch({type: types.UPDATE_MATCH, payload: match});
  } catch (error) {
    console.error('Error updating match:', error);
  }
};

export const deleteMatch = matchId => async dispatch => {
  console.log('Deleting match id==', matchId);
  try {
    // Remove match from AsyncStorage
    await AsyncStorage.removeItem('match_' + matchId);
    dispatch({type: types.DELETE_MATCH, payload: matchId});
  } catch (error) {
    console.error('Error deleting match:', error);
  }
};

export const viewMatches = () => async dispatch => {
  try {
    // Retrieve all matches from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    const matches = await AsyncStorage.multiGet(
      keys.filter(key => key.startsWith('match_')),
      // await AsyncStorage.removeItem('match_' + keys),
    );
    dispatch({
      type: types.VIEW_MATCHES,
      payload: matches.map(item => JSON.parse(item[1])),
    });
  } catch (error) {
    console.error('Error viewing matches:', error);
  }
};
