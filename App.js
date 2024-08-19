import {useState} from 'react';
// import CodePush from 'react-native-code-push';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistors} from './src/redux/store';
import AppStart from './src/navigation/AppStart';

export default function App() {
  // const [OTAupdate, setOTAupdate] = useState(false);
  // function update() {
  //   CodePush.checkForUpdate()
  //     .then(remotePackage => {
  //       if (!remotePackage) {
  //         throw new Error('No Update available');
  //       }
  //       setOTAupdate(true);
  //       return remotePackage.download();
  //     })
  //     .then(localPackage => {
  //       return localPackage.install(CodePush.InstallMode.IMMEDIATE);
  //     })
  //     .then(response => {
  //       setOTAupdate(false);
  //       CodePush.notifyAppReady();
  //       CodePush.restartApp();
  //     })
  //     .catch(error => {
  //       setOTAupdate(false);
  //       console.log('Error while updating upackage: ', err);
  //     });
  // }
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistors}>
          <NavigationContainer>
            <AppStart />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
