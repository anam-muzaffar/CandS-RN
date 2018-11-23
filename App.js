import React, { Component } from 'react';
import {View,} from 'react-native';
import { Router } from './router';

export default class App extends Component<{}> {

render() {
  console.disableYellowBox = true;

return (
<View style={{flex: 1, backgroundColor: 'white'}}>
<Router/>
</View>
);
}
}
