import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { text: "Add Image", uri: "" },
            ],
        }

        firebase.database().ref("/images").on('value', (snap) => {
            let data = snap.val();
            if (data) {
                this.setState({ images: [Object.values(data), ...this.state.images] })
            }
        })
    }
    uploadImage = () => {

    }
    render() {
        return (
            <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ height }}>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.images}
                    contentContainerStyle={{ justifyContent: "space-around", flexWrap: "wrap", width, flexDirection: "row" }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ height: width / 4, width: width / 4, borderWidth: 1, borderColor: "white", justifyContent: "center", alignItems: "center", margin: 10 }} >
                                <View style={{ height: "90%", width: "90%", }} >
                                    <Image source={{ uri: item.uri }}
                                        style={{ height: "100%", width: "100%" }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={{color:"white"}} >{item.text}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ImageBackground>

        )
    }

}