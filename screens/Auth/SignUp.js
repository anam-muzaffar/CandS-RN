import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  signup = () => {
    let { email, password, confirmPassword } = this.state;
    if (email && password && confirmPassword) {
      if (password == confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
          firebase.database().ref(`/users/${user.user.uid}/`).set({
            email,
            accountType:"user"
          }).then(() => {
            this.props.navigation.navigate('User')

          })
        })
      }
      else {
        alert("Passwords do not match");
      }
    }
    else {
      alert("Fill all fields")
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
            onChangeText={(email) => this.setState({ email })}
          />

          <View style={{ paddingTop: 20 }} />

          <TextInput style={styles.inputbox}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(password) => this.setState({ password })}
          />

          <View style={{ paddingTop: 20 }} />

          <TextInput style={styles.inputbox}
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />

          <View style={{ paddingTop: 50 }} />

          <Button
            title="Sign Up"
            color="#DAA520"
            onPress={() => this.signup()}
          />

          <View style={{ paddingTop: 150 }} />

          <Button
            title="Back to Home"
            color="#DAA520"
            onPress={() => this.props.navigation.goBack()} />

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputbox: {
    width: 350,
    height: 35,
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
