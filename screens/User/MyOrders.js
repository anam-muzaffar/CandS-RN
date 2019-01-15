/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, FlatList, Dimensions, TouchableOpacity, Modal, Image, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { CSButton } from '../../components/CSButton';
const { width, height } = Dimensions.get('window');


export default class MyOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: {},
            visible: props.navigation.state.params ? (props.navigation.state.params.order || false) : false,
            order: props.navigation.state.params ? (props.navigation.state.params.order || {}) : { measurements: {} }
        }

    }
    componentDidMount() {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/myorders`).on("value", (snap) => {
            let data = snap.val();
            if (data) {
                // console.log(data)
                this.setState({ orders: data })
            }
            else {
                this.setState({ orders: {} })
            }
        })

    }

    sendFeedback = () => {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/myorders/${this.state.order.key}`).update({
            feedBack: this.state.feedBack
        })
        firebase.database().ref(`orders/${this.state.order.key}`).update({
            feedBack: this.state.feedBack
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
                    <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1, justifyContent: "space-around" }}>
                        <View style={{ height: width / 2.5, width }} >
                            <Image
                                source={{ uri: this.state.order.photo }}
                                style={{ height: "100%", width: "100%" }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width }} >

                            {this.state.order.user && <View style={{ flexDirection: "column" }} >
                                <Text style={{ color: "white", paddingLeft: 5, fontSize: 18 }} >Your Detail</Text>
                                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.name}</Text>
                                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.email}</Text>
                                <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.user.number}</Text>
                            </View>}
                            <View>
                                <Text style={{ color: "white", fontSize: 18 }} >Status: {this.state.order.rejected ? "Rejected" : (this.state.order.completed) ?
                                    "Completed" : this.state.order.accepted ? "Accepted" : "Pending"
                                }</Text>
                                <Text style={{ color: "white", fontSize: 18 }} >Amount: {this.state.order.price}
                                </Text>
                            </View>
                        </View>
                        <Text style={{ color: "white", paddingLeft: 5, fontSize: 18, }} >Measurements</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", height: width / 2.3 }}  >
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
                        <View style={{ height: width / 3.5, padding: 10 }} >
                            <Text style={{ color: "white", fontSize: 18 }} >Info</Text>
                            <Text style={{ color: "white", paddingLeft: 10, }} >{this.state.order.info}</Text>
                        </View>
                        {(!this.state.order.feedBack) && this.state.order.completed && <View style={{ marginBottom: 10 }} >
                            <TextInput style={styles.messagebox}
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor="#DAA520"
                                placeholder="Feed Back"
                                onChangeText={(feedBack) => this.setState({ feedBack })}
                            />
                            <CSButton
                                title="Send Feedback"
                                color="#DAA520"
                                onPress={() => this.sendFeedback()}
                            />
                        </View>}
                    </ImageBackground>
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
                                <Text>Your order: {item.orderId}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
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
    messagebox: {
        width,
        height: 70,
        borderWidth: 2,
        borderColor: 'grey',
        color: "#c4c633",
        fontSize: 18,
        marginBottom: 5
    }
});
