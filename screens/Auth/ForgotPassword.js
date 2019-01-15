import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, TextInput, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { CSButton } from '../../components/CSButton';


export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    }
  }
  sendEmail = () => {
    if (this.state.email) {
      firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
        ToastAndroid.show("Email Sent", ToastAndroid.SHORT);
        this.props.navigation.goBack()
      }).catch((err) => {
        alert(err)
      })

    }
    else {
      ToastAndroid.show("Enter Email", ToastAndroid.SHORT);

    }
  }
  render() {
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>
        <View style={styles.page}>


          <Text style={styles.title}>CandS</Text>
          <Text style={styles.subheading}> Crafting and Stitching</Text>

          <View style={{ paddingTop: 50 }} />

          <TextInput style={styles.inputbox}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#DAA520"
            onChangeText={(email) => this.setState({ email })}
          />

          <View style={{ paddingTop: 50 }} />

          <CSButton
            title="Reset Password"
            color="#DAA520"
            onPress={() => this.sendEmail()}
            bHeight={18}
            bWidth={2.1}
          />

          <View style={{ paddingTop: 200 }} />

          <CSButton
            title="Back to Home"
            color="#DAA520"
            onPress={() => this.props.navigation.goBack()}
            bHeight={18}
            bWidth={2.1} />

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputbox: {
    width: 350,
    height: 45,
    borderWidth: 2,
    borderColor: 'grey',
    color: "#c4c633",
    fontSize: 18
  },

  title: {
    paddingTop: 50,
    color: "yellow",
    fontSize: 70,
    textAlign: "center",
  },

  page: {
    alignItems: "center",
    flex: 1,
  },

  subheading: {
    color: "yellow",
    fontSize: 15,
    textAlign: "center",
  },

});
