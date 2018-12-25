/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, FlatList, Dimensions, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');


export default class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: {},
      visible: props.navigation.state.params ? (props.navigation.state.params.order || false) : false,
      order: props.navigation.state.params ? (props.navigation.state.params.order || {}) : { measurements: {} }
    }

  }
  componentDidMount() {
    firebase.database().ref("/orders").on("value", (snap) => {
      let data = snap.val();
      if (data) {
        console.log(data)
        this.setState({ orders: data })
      }
      else {
        this.setState({ orders: {} })
      }
    })

  }

  sendNotificationToUser = (type) => {
    fetch("https://us-central1-cands-71015.cloudfunctions.net/userNotification", {
      method: "POST",
      body: JSON.stringify({
        title: "Order Update",
        message: `Your order has been ${type} by the admin.`,
        token: this.state.order.user && this.state.order.user.notificationToken,
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then((res) => {
      // this.props.navigation.goBack()

    }).catch((err) => {
    })
  }
  render() {

    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={styles.container}>
        <Modal onRequestClose={() => {
          this.setState({
            visible: false,
            order: {}
          })
        }} visible={this.state.visible} >
          <ScrollView  >
            <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1, justifyContent: "space-around" }}>
              <View style={{ height: width / 2, width }} >
                <Image
                  source={{ uri: this.state.order.photo }}
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                />
              </View>
              {this.state.order.user && <View style={{ flexDirection: "column" }} >
                <Text style={{ color: "white", paddingLeft: 5, fontSize: 18 }} >Buyer Detail</Text>
                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.name}</Text>
                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.email}</Text>
                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.number}</Text>
              </View>}

              <Text style={{ color: "white", paddingLeft: 5, fontSize: 18, marginTop: 10 }} >Measurements</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", height: width / 2.2 }}  >
                {
                  Object.values(this.state.order.measurements || {}).map((measurement, index) => {
                    let property = Object.keys(this.state.order.measurements || {})[index]
                    return (
                      <View style={{ width: 150, marginTop: 5 }} >
                        <Text style={{ color: "white" }} >{property}: {measurement}</Text>
                      </View>
                    )
                  })
                }
        
              </View>
              <View style={{ marginBottom: 10, padding: 10 }} >
                <Text style={{ color: "white", fontSize: 18 }} >Info</Text>
                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.info}</Text>
                {/* <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.orderId}</Text> */}
              </View>
              <View style={{ marginBottom: 10, padding: 10 }} >
                <Text style={{ color: "white", fontSize: 18 }} >Order Id: {this.state.order.orderId}</Text>
                <Text style={{ color: "white", fontSize: 18 }} >Amount: {this.state.order.price}</Text>

              </View>
              <View style={{ height: width / 2, marginBottom: 10, padding: 10 }} >
                <Text style={{ color: "white", fontSize: 18 }} >Feedback</Text>
                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.feedBack}</Text>
                {/* <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.orderId}</Text> */}
              </View>

            </ImageBackground>
          </ScrollView>
          {!(this.state.order && this.state.order.accepted) && !(this.state.order && this.state.order.rejected) ?
            <View style={{ position: "absolute", bottom: 0, flexDirection: "row", width, height: height / 13 }} >
              <TouchableOpacity
                onPress={() => {
                  firebase.database().ref(`orders/${this.state.order.key}/`).update({ accepted: true })
                  this.setState({
                    order: { ...this.state.order, accepted: true }
                  })
                  if (this.state.order.user)
                    firebase.database().ref(`users/${this.state.order.user.id}/myorders/${this.state.order.key}`).update({ accepted: true })

                  this.sendNotificationToUser("accepted")
                }}
                style={{ backgroundColor: "green", flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} >
                <Text style={{ color: "white" }} >Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  firebase.database().ref(`orders/${this.state.order.key}/`).update({ rejected: true })
                  if (this.state.order.user)
                    firebase.database().ref(`users/${this.state.order.user.id}/myorders/${this.state.order.key}`).update({ rejected: true })

                  this.setState({
                    order: { ...this.state.order, rejected: true }
                  })
                  this.sendNotificationToUser("rejected")
                }}
                style={{ backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} >
                <Text style={{ color: "white" }} >Reject</Text>

              </TouchableOpacity>
            </View> : <View style={{ position: "absolute", bottom: 0, flexDirection: "row", width, height: height / 13 }} >
              {this.state.order && this.state.order.accepted ? <TouchableOpacity
                onPress={() => {
                  firebase.database().ref(`orders/${this.state.order.key}/`).update({ completed: true })
                  if (this.state.order.user)
                    firebase.database().ref(`users/${this.state.order.user.id}/myorders/${this.state.order.key}`).update({ completed: true })

                  this.setState({
                    order: { ...this.state.order, completed: true }
                  })

                  this.sendNotificationToUser("marked as completed")
                }}
                style={{ backgroundColor: "green", flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} >
                <Text style={{ color: "white" }} >Complete</Text>
              </TouchableOpacity> : <View />}
              {this.state.order && this.state.order.rejected ? <View
                style={{ backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} >
                <Text style={{ color: "white" }} >Rejected</Text>
              </View> : <View />}

            </View>
          }
        </Modal>
        <Text style={{ color: "white", fontSize: 25, marginVertical: 30, }} >Orders Recieved</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Object.values(this.state.orders)}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => {
            // console.log(item)
            return (
              <TouchableOpacity onPress={() => {
                this.setState({
                  visible: true,
                  order: item
                })
              }} style={{ width: width / 1.1, height: height / 14, backgroundColor: "white", marginBottom: 15, justifyContent: "center", padding: 10 }} >
                <Text>Order By: {item.orderBy}</Text>
              </TouchableOpacity>
            )
          }}
        />
        {/* <View style={{height:height/3}} /> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
