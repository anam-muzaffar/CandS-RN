import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ImageBackground, Button, Image, ScrollView,Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { CSButton } from '../../components/CSButton';
const {height,width} = Dimensions.get("window")

const options = {
  title: 'Select Image',
  storageOptions: {
    path: 'images',
    quality: 0.1
  },
};

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      info: "",
      measurements: {},
      user: {},
      orders: [],
      price: "",
      address: ""
    }

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).once('value', (snap) => {
      let data = snap.val();
      if (data) {
        this.setState({ user: { ...data, id: firebase.auth().currentUser.uid } });
        if (data.measurements) {
          this.setState({ measurements: data.measurements })
        }
      }
    })
    firebase.database().ref(`/orders/`).once('value', (snap) => {
      let data = snap.val();
      if (data)
        this.setState({ orders: Object.values(data) });
    })
  }
  selectDesign = (image, price) => {
    if (image) {
      // alert(image)
      this.setState({ photo: image, price: price || 500 })
    }
    else {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response)
          this.setState({ photo: response.uri, price: 500 })
        }
      });
    }
  }
  measurements = (userMeasurements) => {
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).update({ measurements: userMeasurements })
    this.setState({ measurements: userMeasurements })
  }
  checkImage = (image) => {
    if (image.indexOf("firebasestorage") != -1) {
      this.uploadDataAndSendNotification(image)
    }
    else {
      let date = new Date().getTime();
      firebase.storage().ref(`/images/CandS${date}`).putFile(image).then(() => {
        firebase.storage().ref(`/images/CandS${date}`).getDownloadURL().then((url) => {
          this.uploadDataAndSendNotification(url)
        }).catch((aa) => { })
      }).catch((a) => { })
    }
  }
  uploadDataAndSendNotification = (image) => {
    // let { info, measurements } = this.state;
    let { photo, info, measurements, price, address } = this.state;

    firebase.database().ref("/orders").push({
      info,
      photo: image,
      measurements,
      orderBy: firebase.auth().currentUser.email,
      accepted: false,
      rejected: false,
      user: this.state.user,
      orderId: `candsorder#${this.state.orders.length}`,
      price,
      address

    }).then((response) => {
      // alert(response)
      // console.log(response.key)
      firebase.database().ref(`/orders/${response.key}/`).update({ key: response.key })
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/myorders/${response.key}`).set({
        info,
        photo: image,
        measurements,
        orderBy: firebase.auth().currentUser.email,
        accepted: false,
        rejected: false,
        user: this.state.user,
        orderId: `candsorder#${this.state.orders.length}`,
        key: response.key,
        price,
        address
      })
      let tokens = []
      firebase.database().ref('/users').once("value", (snap) => {
        let data = snap.val();
        let users = Object.values(data);
        users.filter((user) => user.accountType == 'admin').map((admin) => {
          tokens.push(admin.notificationToken);
        })
      }).then(() => {
        fetch("https://us-central1-cands-71015.cloudfunctions.net/sendNotification", {
          method: "POST",
          body: JSON.stringify({
            title: "New Order",
            message: `You have recieved a new order from ${firebase.auth().currentUser.email}`,
            token: tokens,
            order: {
              info,
              photo: image,
              measurements: JSON.stringify(measurements),
              orderBy: firebase.auth().currentUser.email,
              accepted: "false",
              rejected: "false",
              key: response.key,
              price
            },
            user: this.state.user
          }),
          headers: {
            "Content-Type": "application/json"
          }

        }).then((res) => {
          this.props.navigation.goBack()

        }).catch((err) => {
        })
      }).catch((err) => {
      })
    })
  }
  render() {
    return (
      <ScrollView>
        <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>
          <View style={styles.page}>
            <Text style={styles.Contact}> ORDER HERE </Text>
            <View style={{ paddingTop: 25 }} />

            <CSButton
              title={`Select Designs   ${this.state.photo ? "" : "(Required)"}`}
              color="#DAA520"
              textAlign="center"
            bWidth={1.1}
              onPress={() => this.props.navigation.navigate('Design', { selectDesign: this.selectDesign })}
            />

            <View style={{ paddingTop: 40 }} />

            <CSButton
              title={ `Fulfill Measurements   ${Object.keys(this.state.measurements).length == 12 ? "" : "(Required)"}`}
              color="#DAA520"
              textAlign="center"
            bWidth={1.1}

              onPress={() => this.props.navigation.navigate('Measurement', { measurements: this.measurements, userMeasurements: this.state.measurements })}
            />

            <View style={{ paddingTop: 40 }} />

            <Text style={styles.Message}> Additional Note </Text>

            <TextInput style={styles.messagebox}
              multiline={true}
              numberOfLines={7}
              onChangeText={(info) => this.setState({ info })}
            />
            <View style={{ paddingTop: 40 }} />

            <Text style={styles.Message}> Address </Text>

            <TextInput style={styles.messagebox}
              multiline={true}
              numberOfLines={4}
              onChangeText={(address) => this.setState({ address })}
            />
            <View style={{ paddingTop: 10 }} />

            <Image
              source={{ uri: this.state.photo }}
              style={{ height: 50, width: 50 }}
            />
            <View style={{ paddingTop: 30 }} />
            <Text style={{ color: "white", fontSize: 18 }} >Total:{this.state.price}</Text>
            <View style={{ paddingTop: 10 }} />
            <CSButton
              title="Submit Order"
              color= "#DAA520"
              bWidth={1.1}

              textAlign="center"
              disabled={!(this.state.photo
                && (Object.keys(this.state.measurements).length == 12) && this.state.address.length>10
              )
              }
              onPress={() => {
                this.checkImage(this.state.photo)
              }}
            />


            <View style={{ paddingTop: 30 }} />
            <CSButton
              title="Custom Image"
              color="#DAA520"
              textAlign="center"
              onPress={() => this.selectDesign()}
            bWidth={1.1}

            />
            <View style={{ paddingTop: 30 }} />

            <CSButton
              title="Cancel"
              color="#DAA520"
              textAlign="center"
              onPress={() => this.props.navigation.goBack()}
            bWidth={1.1}
              
            />

          </View>

        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  inputbox: {
    width: width/1.05,
    height: 35,
    borderWidth: 2,
    borderColor: 'grey',
    color: "#c4c633",
    fontSize: 18,
  },
  Contact: {
    fontSize: 30,
    //  fontWeight: 'Bold',
    color: 'yellow'
  },
  subject: {
    fontSize: 20,
    //  fontWeight: 'Bold',
    color: 'yellow'
  },
  page: {
    flex: 1,
    paddingTop: 5,
    alignItems:"center",
    paddingBottom:5
  },
  line: {
    fontSize: 15,
    color: '#c4c633',
    margin: 2
  },
  Message: {
    fontSize: 20,
    //  fontWeight: 'Bold',
    color: 'yellow'
  },
  messagebox: {
    width:width/1.05 ,
    height: 150,
    borderWidth: 2,
    borderColor: 'grey',
    color: "#c4c633",
    fontSize: 18
  }
});
