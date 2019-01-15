
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground } from 'react-native';
import { CSButton } from '../../components/CSButton';

export default class AdminHome extends Component<Props> {
  render() {
    console.disableYellowBox = true;
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 25, }}>

          <View style={{ alignItems: 'center' }}>
            <View style={{ paddingTop: 85 }} />
            <Text style={styles.top}> Admin Screen </Text>
          </View>

          <View style={{ paddingTop: 55 }} />

          <CSButton
            title="Orders Received"
            color="#DAA520"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Orders')}
            bWidth={1}

          />
          <View style={{ paddingTop: 55 }} />

          {/* <Button
            title="Update Designs"
            color="#DAA520"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UpdateDesigns')}

          /> */}
          <View style={{ paddingTop: 55 }} />
          <CSButton
            title="My Account"
            color="#DAA520"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('AdminAccount')}
          bWidth={1}
          />
          <View style={{ paddingTop: 55 }} />
          <CSButton
            title="Sign out"
            color="#DAA520"
            onPress={() => this.props.navigation.navigate('Login')}

          />
          <View style={{ paddingTop: 55 }} />
          <CSButton
            title="Upload Images"
            color="#DAA520"
            onPress={() => this.props.navigation.navigate('Images')}
            bWidth={1}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    color: 'yellow',
    fontSize: 50,


  }
});
