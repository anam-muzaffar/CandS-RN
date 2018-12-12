import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Image',
    storageOptions: {
        path: 'images',
        quality: 0.1
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
            index: null,
            showModal: false,
            category: ''
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
    selectCategory = (category) => {
        this.setState({ category, showModal: false }, () => {
            this.uploadImage()
        })
    }
    deleteImage = (imageUrl, index) => {
        let imageName = imageUrl.split("images%2F")[1].split("?")[0]
        firebase.storage().ref(`/images/${imageName}`).delete().then(() => {
            let oldArray = this.state.images.slice(0, -1);
            // if (oldArray.length) {
            oldArray.splice(index, 1)
            // }
            // else {
            //     // oldArray = [{ uri: url, category: this.state.category }]
            // }
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
        })

    }

    uploadImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({
                    index: null,
                });
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({
                    index: null,
                });
            } else {
                let index = this.state.index
                let date = new Date().getTime();
                firebase.storage().ref(`/images/CandS${date}`).putFile(response.uri).then(() => {
                    firebase.storage().ref(`/images/CandS${date}`).getDownloadURL().then((url) => {
                        let oldArray = this.state.images.slice(0, -1);
                        if (oldArray.length) {
                            oldArray.splice(index, 1, { uri: url, category: this.state.category })
                        }
                        else {
                            oldArray = [{ uri: url, category: this.state.category }]
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
                <Modal transparent visible={this.state.showModal} onRequestClose={() => this.setState({ showModal: false, index: null })} >
                    <TouchableOpacity onPress={() => this.setState({ showModal: false, index: null })} style={{ height, width, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ height: height / 2, width: width / 1.1, justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }} >
                            <Text style={{ color: "black", fontSize: 17 }} >Choose a category</Text>
                            <TouchableOpacity style={{ width: "100%", paddingLeft: 10, height: height / 14, justifyContent: "center", borderBottomColor: "lightgray", borderBottomWidth: 1 }} onPress={() => this.selectCategory('summer')} >
                                <Text>Summer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "100%", paddingLeft: 10, height: height / 14, justifyContent: "center", borderBottomColor: "lightgray", borderBottomWidth: 1 }} onPress={() => this.selectCategory('winter')} >
                                <Text>Winter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "100%", paddingLeft: 10, height: height / 14, justifyContent: "center", borderBottomColor: "lightgray", borderBottomWidth: 1 }} onPress={() => this.selectCategory('spring')} >
                                <Text>Spring</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "100%", paddingLeft: 10, height: height / 14, justifyContent: "center", borderBottomColor: "lightgray", borderBottomWidth: 1 }} onPress={() => this.selectCategory('autumn')} >
                                <Text>Autumn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "100%", paddingLeft: 10, height: height / 14, justifyContent: "center", borderBottomColor: "lightgray", borderBottomWidth: 1 }} onPress={() => this.selectCategory('trending')} >
                                <Text>Trending</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.images}
                    contentContainerStyle={{ justifyContent: "space-around", flexWrap: "wrap", width, flexDirection: "row" }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.setState({ showModal: true, index })} style={{ height: width / 2.5, width: width / 2.5, justifyContent: "space-between", alignItems: "center", margin: 10 }} >
                                {index !== this.state.images.length - 1 ? <View style={{ position: "absolute", alignSelf: "flex-end", zIndex: 100, top: -15 }} >
                                    <TouchableOpacity onPress={() => {
                                        this.deleteImage(item.uri, index)
                                    }} style={{ height: width / 8, width: width / 8, }} >
                                        <Image
                                            source={require("../../assets/closeIcon.png")}
                                            style={{ height: "100%", width: "100%" }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View> : <View />}
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