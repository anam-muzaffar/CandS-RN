import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, TextInput, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      number: ""
    }
  }

  signup = () => {
    let { email, password, confirmPassword, name, number } = this.state;
    if (email && password && confirmPassword && name, number) {
      if (password == confirmPassword) {

        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
          firebase.messaging().hasPermission().then((permission) => {
            if (permission) {
              firebase.messaging().getToken().then((token) => {
                firebase.database().ref(`/users/${user.user.uid}/`).set({
                  email,
                  accountType: "user",
                  name,
                  number,
                  notificationToken: token
                }).then(() => {
                  this.props.navigation.navigate('User')
                }).catch((err) => {
                  alert(err)
                })

              }).catch((err) => {
                alert(err)
              })
            }
          }).catch((err) => {
            alert(err)
          })

        }).catch((err) => {
          alert(err)
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
        <ScrollView>


          <View style={styles.page}>


            <Text style={styles.title}>CandS</Text>
            <Text style={styles.subheading}> Crafting and Stitching</Text>

            <View style={{ paddingTop: 50 }} />
            <TextInput style={styles.inputbox}
              placeholder="Full Name"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c4c633"
              onChangeText={(name) => this.setState({ name })}
            />

            <View style={{ paddingTop: 20 }} />
            <TextInput style={styles.inputbox}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c4c633"
              onChangeText={(email) => this.setState({ email })}
            />

            <View style={{ paddingTop: 20 }} />
            <TextInput style={styles.inputbox}
              placeholder="Phone Number"
              keyboardType="number-pad"
              placeholderTextColor="#c4c633"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(number) => this.setState({ number })}
            />

            <View style={{ paddingTop: 20 }} />

            <TextInput style={styles.inputbox}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c4c633"
              onChangeText={(password) => this.setState({ password })}
            />

            <View style={{ paddingTop: 20 }} />

            <TextInput style={styles.inputbox}
              placeholder="Confirm Password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c4c633"
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
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputbox: {
    width: 350,
    height: 40,
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
