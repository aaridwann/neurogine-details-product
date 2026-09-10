import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './DetailsScreen.styles';

/**
 * DetailScreenComponent is a component for the DetailScreen.
 * It is responsible for displaying the data from the Redux store.
 * @param {Object} props - The component props.
 * @param {Object} props.itemId - The item ID.
 * @param {Object} props.title - The title.
 * @param {Object} props.onGoBack - The callback function to go back.
 * @returns {React.Component} The DetailScreenComponent.
 */
const DetailScreenComponent = ({ itemId, title, onGoBack, }) => {
    return (<View>
      <Text style={styles.text}>Detail Screen Module</Text>
      {itemId && <Text>Item ID: {itemId}</Text>}
      {title && <Text>Title: {title}</Text>}
      <Button title="Go Back" onPress={onGoBack}/>
    </View>);
};
export default DetailScreenComponent;
