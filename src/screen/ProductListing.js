import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const productList = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description:
      'High-quality wireless headphones with noise-cancelling features.',
    price: 59.99,
    currency: 'USD',
    image: 'https://placekitten.com/200/300',
    rating: 4.5,
    reviews_count: 120,
    stock: 25,
    category: 'Electronics',
    brand: 'TechBrand',
    is_featured: true,
  },
  {
    id: '2',
    name: '4K Ultra HD Smart TV',
    description:
      '55-inch smart TV with 4K resolution and built-in streaming apps.',
    price: 499.99,
    currency: 'USD',
    image: 'https://placekitten.com/200/300',
    rating: 4.8,
    reviews_count: 350,
    stock: 10,
    category: 'Electronics',
    brand: 'VisionTech',
    is_featured: true,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable and lightweight running shoes for all terrains.',
    price: 79.99,
    currency: 'USD',
    image: 'https://example.com/images/shoes.jpg',
    rating: 4.3,
    reviews_count: 95,
    stock: 40,
    category: 'Footwear',
    brand: 'Sporty',
    is_featured: false,
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description:
      'Eco-friendly water bottle that keeps your drinks cold for hours.',
    price: 19.99,
    currency: 'USD',
    image: 'https://example.com/images/waterbottle.jpg',
    rating: 4.6,
    reviews_count: 150,
    stock: 100,
    category: 'Accessories',
    brand: 'EcoLife',
    is_featured: false,
  },
  {
    id: '5',
    name: 'Smartphone with 128GB Storage',
    description:
      'Latest model smartphone with high-speed processor and ample storage.',
    price: 699.99,
    currency: 'USD',
    image: 'https://example.com/images/smartphone.jpg',
    rating: 4.7,
    reviews_count: 500,
    stock: 5,
    category: 'Electronics',
    brand: 'MobileMaster',
    is_featured: true,
  },
];

const ProductListing = () => {
  const {navigate} = useNavigation();
  const [product, setProduct] = useState(productList);
  const filterFn = value => {
    let productLists = productList;
    if (value) {
      productLists = productList.filter(e =>
        e.name.toLowerCase().match(value.toLowerCase()),
      );
    }
    setProduct(productLists);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('ProductDetail', {detail: item})}>
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productRating}>
          Rating: {item.rating} ({item.reviews_count} reviews)
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={'#aaa'}
        style={styles.input}
        onChangeText={value => filterFn(value)}
        // value={checkoutData.shippingAddress.zip}
      />
      <FlatList
        scrollEnabled
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ebfaeb',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  productRating: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default ProductListing;
