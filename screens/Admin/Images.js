import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Image',
    storageOptions: {
        path: 'images',
    },
};
const { width, height } = Dimensions.get('window');
export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { text: "Add Image", uri: "" },
            ],
            index: null
        }

        firebase.database().ref("/images").on('value', (snap) => {
            let data = snap.val();
            if (data) {
                this.setState({ images: [...data, { text: "Add Image", uri: "" }] })
            }
            else {
                this.setState({ images: [{ text: "Add Image", uri: "" }] })
            }
        })
    }
    uploadImage = (index) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    index,
                });

                let date = new Date().getTime();
                firebase.storage().ref(`/images/CandS${date}`).putFile(response.uri).then(() => {
                    firebase.storage().ref(`/images/CandS${date}`).getDownloadURL().then((url) => {
                        let oldArray = this.state.images.slice(0, -1);
                        if (oldArray.length) {
                            oldArray.splice(index, 1, { uri: url })
                        }
                        else {
                            oldArray = [{ uri: url }]
                        }
                        firebase.database().ref('/images').set(
                            oldArray
                        ).then(() => {
                            this.setState({
                                index: null,
                            });
                        }).catch(() => {
                            this.setState({
                                index: null
                            })
                        })
                    }).catch(() => {
                        this.setState({
                            index: null
                        })
                    })
                }).catch(() => {
                    this.setState({
                        index: null
                    })
                })
            }
        });
    }
    render() {
        return (
            <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ height }}>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.images}
                    contentContainerStyle={{ justifyContent: "space-around", flexWrap: "wrap", width, flexDirection: "row" }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.uploadImage(index)} style={{ height: width / 2.5, width: width / 2.5, justifyContent: "space-between", alignItems: "center", margin: 10 }} >
                                <View style={{ height: width / 3, width: width / 3, borderWidth: 2, borderColor: "white", justifyContent: "center", alignItems: "center", }} >

                                    {(this.state.index == index) ? <ActivityIndicator color="#DAA520" size="small" /> :
                                        <Image source={{ uri: item.uri }}
                                            style={{ height: "100%", width: "100%" }}
                                            resizeMode="contain"
                                        />
                                    }
                                </View>
                                <Text style={{ color: "white", }} >{item.text}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ImageBackground>

        )
    }

}