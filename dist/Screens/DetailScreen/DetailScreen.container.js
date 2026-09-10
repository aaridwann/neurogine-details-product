import React from 'react';
import get from 'lodash/get';
import { View, Text, Button } from 'react-native';
import styles from './DetailsScreen.styles';
export const DetailsScreen = ({ route, navigation }) => {
    const itemId = get(route, 'params.itemId');
    const title = get(route, 'params.title');
    return (<View>
      <Text style={styles.text}>Detail Screen Module</Text>
      {itemId && <Text>Item ID: {itemId}</Text>}
      {title && <Text>Title: {title}</Text>}
      <Button title="Go Back" onPress={() => navigation.goBack()}/>
    </View>);
};
