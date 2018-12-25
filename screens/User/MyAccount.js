import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';

//picture,name,email,contact,address1, address 2,change password
export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPass: "",
      email: firebase.auth().currentUser.email,
      name: "",
      number: ""

    }
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).once("value", (snap) => {
      let data = snap.val();
      if (data) {
        this.setState({
          name: data.name,
          number: data.number
        })
      }

    })
  }

  updatePass = () => {
    if (this.state.newPass) {
      firebase.auth().currentUser.updatePassword(this.state.newPass).then(() => {
        ToastAndroid.show("Password Updated", ToastAndroid.SHORT);
      })
    }
    if (this.state.number && this.state.name) {
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).update({
        name: this.state.name,
        number: this.state.number,
      }).then(() => {
        this.props.navigation.goBack();
        ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
      })
    }
    else {
      ToastAndroid.show("Fill all fields", ToastAndroid.SHORT);

    }
  }
  render() {
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>

        <ScrollView style={{ flex: 1, flexDirection: "column" }}>

          <Text style={styles.title}>Account Details </Text>

          <View style={{ paddingTop: 30 }} />
          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Place Holder </Text>
            </View>
            <View style={styles.sidebox}>
              <Button
                title='Upload Image'
                color="#DAA520" />
            </View>
          </View>
          <View style={{ paddingTop: 65 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Name</Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.inputbox}
                placeholder="Name"
                autoCapitalize="none"
                value={this.state.name}
                autoCorrect={false}
                onChangeText={(name) => this.setState({ name })}
              />
            </View>
          </View>

          <View style={{ paddingTop: 15 }} />
          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Number</Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.inputbox}
                placeholder="Number"
                autoCapitalize="none"
                keyboardType="number-pad"
                value={this.state.number}
                autoCorrect={false}
                onChangeText={(number) => this.setState({ number })}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />
          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Email</Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.inputbox}
                placeholder="example@cands.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={this.state.email}
                editable={false}
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Address 1</Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.inputbox}
                placeholder="House, St"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Address 2</Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.inputbox}
                placeholder="City"
              />
            </View>
          </View>

          <View style={{ paddingTop: 35 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Change </Text>
              <Text style={styles.sidetext}> Password </Text>
            </View>
            <View style={styles.sidebox}>
              <TextInput style={styles.passchange}
                placeholder="Enter New Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(newPass) => this.setState({ newPass })}
              />

            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Button
                title="Update"
                color="#DAA520"
                onPress={() => this.updatePass()}
              />
            </View>
            {/* <View style={styles.sidebox}>
              <TextInput style={styles.passchange}
                placeholder="New"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View> */}
          </View>
          <View style={{ paddingTop: 25 }} />


          <Button
            title="Cancel"
            // onPress={this.onSignoutPress}
            color="#DAA520"
            onPress={() => this.props.navigation.goBack()}
          />

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  sidetext: {
    fontSize: 20,
    color: '#fff'
  },

  page: {
    alignItems: "center",
    flex: 1,
  },

  title: {
    paddingTop: 30,
    color: "yellow",
    fontSize: 40,
    textAlign: "center",
  },

  subheading: {
    color: "yellow",
    fontSize: 15,
    textAlign: "center",
  },

  inputbox: {
    width: 150,
    height: 45,
    borderWidth: 2,
    borderColor: 'grey',
    color: "#c4c633",
    fontSize: 18
  },

  grid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  },

  sidebox: {
    flex: 1,
    marginHorizontal: 2
  },

  passchange: {
    marginVertical: 5,
    width: 150,
    height: 35,
    borderWidth: 1,
    borderColor: 'grey',
    color: "#c4c633",
    fontSize: 18
  },


});
