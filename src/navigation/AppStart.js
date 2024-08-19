import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import CreateMatch from '../screen/CreateMatch';
import ScheduleMatch from '../screen/SheduleMatch';
import AddTeam from '../screen/AddTeam';
import ProductListing from '../screen/ProductListing';
import ProductDetailScreen from '../screen/ProductDetailScreen';
import CartScreen from '../screen/CardScreen';
import CheckoutScreen from '../screen/CheckoutScreen';
import MainTabRoute from './MainTabRoute';

const Stack = createNativeStackNavigator();

const AppStart = () => {
  return (
    <Stack.Navigator name={'AppStart'}>
      <Stack.Screen name="MainTabNavigator" component={MainTabRoute} />
      <Stack.Screen name="ProductListing" component={ProductListing} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateMatch" component={CreateMatch} />
      <Stack.Screen name="ScheduleMatch" component={ScheduleMatch} />
      <Stack.Screen name="Add Team" component={AddTeam} />
    </Stack.Navigator>
  );
};
export default AppStart;
