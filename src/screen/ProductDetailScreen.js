import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addCart} from '../redux/actions';

const product = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  description:
    'High-quality wireless headphones with noise-cancelling features. Perfect for travel, work, or everyday use.',
  price: 59.99,
  currency: 'USD',
  images: [
    'https://placekitten.com/200/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/200/300',
  ],
  rating: 4.5,
  reviews_count: 120,
  reviews: [
    {
      username: 'JohnDoe',
      rating: 5,
      comment: 'Amazing sound quality and battery life!',
    },
    {
      username: 'JaneSmith',
      rating: 4,
      comment: 'Very comfortable but a bit pricey.',
    },
  ],
  stock: 25,
  category: 'Electronics',
  brand: 'TechBrand',
  options: {colors: ['Black', 'Blue', 'White'], warranty: '2 Years'},
};

const ProductDetailScreen = props => {
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    setDetail(props.route.params.detail);
  }, [props.route.params?.detail]);
  const navigation = useNavigation();

  const cartfn = () => {
    let index = cart.cartItems.findIndex(e => e?.id == detail?.id);
    let object = {
      id: detail?.id,
      name: detail?.name,
      price: detail?.price,
      currency: detail?.currency,
      quantity: 1,
      image: detail?.image,
    };
    if (index < 0) {
      dispatch(addCart(object));
    }
    navigation.navigate('CartScreen');
  };
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={product.images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.productImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{detail?.name}</Text>
        <Text style={styles.productPrice}>
          {detail?.currency} ${detail?.price?.toFixed(2)}
        </Text>
        <Text style={styles.productDescription}>{detail?.description}</Text>

        <View style={styles.productOptions}>
          <Text style={styles.productOptionTitle}>Available Colors:</Text>
          <View style={styles.colorOptions}>
            {product.options.colors.map((color, index) => (
              <View
                key={index}
                style={[
                  styles.colorOption,
                  {backgroundColor: color.toLowerCase()},
                ]}
              />
            ))}
          </View>
          <Text style={styles.productOptionTitle}>
            Warranty: {product.options.warranty}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => cartfn()}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Customer Reviews</Text>
          {product.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.reviewUsername}>{review.username}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: 300,
    height: 300,
    marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  productPrice: {
    fontSize: 20,
    color: '#ff6347',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  productOptions: {
    marginBottom: 20,
  },
  productOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  colorOptions: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewSection: {
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  reviewItem: {
    marginBottom: 15,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  reviewRating: {
    fontSize: 14,
    color: '#ff6347',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
  },
});

export default ProductDetailScreen;
