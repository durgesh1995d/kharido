import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCart, updateCart} from '../redux/actions';

const CartScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (isFocused) {
      updateCarts();
    }
  }, [cart?.cartItems]);

  const incrementQuantity = item => {
    const updatedCartItems = cart.cartItems.map(cartItem =>
      cartItem.id === item.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    );
    dispatch(updateCart(updatedCartItems));
  };

  const decrementQuantity = item => {
    const updatedCartItems = cart.cartItems.map(cartItem =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem,
    );
    if (item?.quantity > 1) {
      dispatch(updateCart(updatedCartItems));
    }
  };

  const removeItem = item => {
    dispatch(deleteCart(item?.id));
  };

  const updateCarts = () => {
    const newTotal = cart?.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal({
      total: newTotal,
      currency: 'USD',
    });
  };

  console.log(total);

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>
          {item.currency} ${item?.price?.toFixed(2)}
        </Text>
        <View style={styles.cartItemActions}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        }
      />

      <View style={styles.cartSummary}>
        <Text style={styles.cartTotalText}>
          Total: {total?.currency} ${total?.total && total?.total?.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          disabled={total?.total <= 0 ? true : false}
          onPress={() =>
            navigation.navigate('CheckoutScreen', {detail: total})
          }>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#ff6347',
    fontWeight: 'bold',
  },
  cartSummary: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default CartScreen;
