import React from 'react';
import { View } from 'react-native';
import ButtonComponent, { Constants as ButtonConstants } from '@Neurogine/ui-kit-button';
import GeneralText, { Constants as TextConstants } from '@Neurogine/ui-kit-general-text';
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
      <GeneralText variant={TextConstants.VARIANT.HEADLINE3}>
        {title}
      </GeneralText>
      <View style={{ paddingHorizontal: 20 }}>

        <ButtonComponent variant={ButtonConstants.VARIANT.DANGER} size={ButtonConstants.SIZE.MEDIUM} onPress={onGoBack} title='Go Back' style={{ width: '50%' }}/>
      </View>
    </View>);
};
export default DetailScreenComponent;
