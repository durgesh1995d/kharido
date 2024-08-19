import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {persistors} from '../redux/store';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/actions';

const initialCheckoutData = {
  cartItems: [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 59.99,
      currency: 'USD',
      quantity: 2,
      image: 'https://example.com/images/headphones.jpg',
    },
  ],
  total: 119.98,
  currency: 'USD',
  shippingAddress: {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
  },
  paymentMethod: 'Credit Card',
};

const CheckoutScreen = ({navigation}) => {
  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);
  const dispatch = useDispatch();
  const handleInputChange = (field, value) => {
    setCheckoutData({
      ...checkoutData,
      shippingAddress: {
        ...checkoutData.shippingAddress,
        [field]: value,
      },
    });
  };

  const handlePaymentMethodChange = method => {
    setCheckoutData({
      ...checkoutData,
      paymentMethod: method,
    });
  };

  const handlePlaceOrder = () => {
    if (validateCheckoutData()) {
      Alert.alert('Order Placed', 'Your order has been placed successfully!', [
        {
          // type: 'success',
          message: 'Okay',

          onPress: () => navigation.navigate('Home'),
        },
      ]);
      dispatch(clearCart());
    } else {
      Alert.alert('Error', 'Please fill in all fields correctly.');
    }
  };

  const validateCheckoutData = () => {
    const {name, address, city, state, zip} = checkoutData.shippingAddress;
    return name && address && city && state && zip;
  };

  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>
          {item.currency} ${item.price.toFixed(2)} x {item.quantity}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <TextInput
        placeholder="Full Name"
        placeholderTextColor={'#555'}
        style={styles.input}
        onChangeText={value => handleInputChange('name', value)}
        value={checkoutData.shippingAddress.name}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        placeholderTextColor={'#555'}
        onChangeText={value => handleInputChange('address', value)}
        value={checkoutData.shippingAddress.address}
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        placeholderTextColor={'#555'}
        onChangeText={value => handleInputChange('city', value)}
        value={checkoutData.shippingAddress.city}
      />
      <TextInput
        placeholder="State"
        style={styles.input}
        placeholderTextColor={'#555'}
        onChangeText={value => handleInputChange('state', value)}
        value={checkoutData.shippingAddress.state}
      />
      <TextInput
        placeholder="ZIP Code"
        placeholderTextColor={'#555'}
        style={styles.input}
        onChangeText={value => handleInputChange('zip', value)}
        value={checkoutData.shippingAddress.zip}
      />

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            checkoutData.paymentMethod === 'Credit Card' &&
              styles.selectedPaymentMethod,
          ]}
          onPress={() => handlePaymentMethodChange('Credit Card')}>
          <Text style={styles.paymentMethodText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethodButton,
            checkoutData.paymentMethod === 'PayPal' &&
              styles.selectedPaymentMethod,
          ]}
          onPress={() => handlePaymentMethodChange('PayPal')}>
          <Text style={styles.paymentMethodText}>PayPal</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      <FlatList
        data={checkoutData.cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
      />

      <Text style={styles.totalAmount}>
        Total: {checkoutData.currency} ${checkoutData.total.toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethodButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPaymentMethod: {
    backgroundColor: '#ff6347',
  },
  paymentMethodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  cartItemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'right',
    color: '#555',
  },
  placeOrderButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
