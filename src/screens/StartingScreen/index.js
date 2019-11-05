import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import Styles from './styles';
import Storage from '../../utils/deviceStorage';

export default props => {
  const {navigation} = props;

  const [firstLaunch, _] = useState(null);

  useEffect(() => {
    Storage.getUserData('Token').then(token => {

      if(token){
        navigation.replace('Welcome');
      }
      else {
        navigation.replace('Onboarding');
      }
    });
  });

  if(firstLaunch === null){
      return (
        <View style={Styles.container}>
          <ActivityIndicator color = "#ddd"/>
        </View>
      );
    }
};
