import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, TextInput, Button, Linking, Alert, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: { width, height },
            images: [],
            summerArray: [],
            winterArray: [],
            springArray: [],
            autumnArray: []
        };
        firebase.database().ref("/images").on('value', (snap) => {
            let data = snap.val();
            if (data) {
                let summerArray = data.filter((image) => image.category == 'summer')
                let winterArray = data.filter((image) => image.category == 'winter')
                let springArray = data.filter((image) => image.category == 'spring')
                let autumnArray = data.filter((image) => image.category == 'autumn')

                this.setState({
                    summerArray,
                    winterArray,
                    springArray,
                    autumnArray,
                })
            }
            else {
                this.setState({
                    summerArray: [],
                    winterArray: [],
                    springArray: [],
                    autumnArray: [],
                })
            }
        })
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }
    render() {
        return (
            <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>
                <View style={{ paddingTop: 15 }} />

                <View style={{ flex: 2 }} onLayout={this._onLayoutDidChange}>
                    <Text style={{ color: 'yellow', textAlign: 'center', fontSize: 20 }}>Summer Season</Text>
                    <Carousel
                        //delay={3500}
                        style={this.state.size}
                    //autoplay
                    //pageInfo
                    >
                        {this.state.summerArray.length ? this.state.summerArray.map((image, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.state.params && this.props.navigation.state.params.selectDesign(image.uri);
                                    this.props.navigation.goBack()
                                }} >
                                    <Image
                                        style={this.state.size}
                                        source={{ uri: image.uri }}
                                    />
                                    <Text>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        }) : <View />}
                        {/* <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/1.jpg')}
                            />
                            <Text>Seasons Top Selling</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/2.jpg')}
                            />
                            <Text>2</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/3.jpg')}
                            />
                            <Text>3</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/4.jpg')}
                            />
                            <Text>4</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/5.jpg')}
                            />
                            <Text>5</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/6.jpeg')}
                            />
                            <Text>6</Text>
                        </View> */}

                    </Carousel>
                </View>

                <View style={{ paddingTop: 30 }} />
                <View style={{ flex: 2 }} onLayout={this._onLayoutDidChange}>
                    <Text style={{ color: 'yellow', textAlign: 'center', fontSize: 20 }}>Winter Season</Text>

                    <Carousel
                        //delay={3500}
                        style={this.state.size}
                    //autoplay
                    //pageInfo
                    >
                        {this.state.winterArray.length ? this.state.winterArray.map((image, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.state.params && this.props.navigation.state.params.selectDesign(image.uri);
                                    this.props.navigation.goBack()
                                }} >
                                    <Image
                                        style={this.state.size}
                                        source={{ uri: image.uri }}
                                    />
                                    <Text>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        }) : <View />}
                        {/* <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/1.jpg')}
                            />
                            <Text>Seasons Top Selling</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/2.jpg')}
                            />
                            <Text>2</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/3.jpg')}
                            />
                            <Text>3</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/4.jpg')}
                            />
                            <Text>4</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/5.jpg')}
                            />
                            <Text>5</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/6.jpeg')}
                            />
                            <Text>6</Text>
                        </View> */}

                    </Carousel>
                </View>

                <View style={{ paddingTop: 30 }} />
                <View style={{ flex: 2 }} onLayout={this._onLayoutDidChange}>
                    <Text style={{ color: 'yellow', textAlign: 'center', fontSize: 20 }}>Spring Season</Text>

                    <Carousel
                        //delay={3500}
                        style={this.state.size}
                    //autoplay
                    //pageInfo
                    >
                        {this.state.springArray.length ? this.state.springArray.map((image, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.state.params && this.props.navigation.state.params.selectDesign(image.uri);
                                    this.props.navigation.goBack()
                                }} >
                                    <Image
                                        style={this.state.size}
                                        source={{ uri: image.uri }}
                                    />
                                    <Text>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        }) : <View />}
                        {/* <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/1.jpg')}
                            />
                            <Text>Seasons Top Selling</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/2.jpg')}
                            />
                            <Text>2</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/3.jpg')}
                            />
                            <Text>3</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/4.jpg')}
                            />
                            <Text>4</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/5.jpg')}
                            />
                            <Text>5</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/6.jpeg')}
                            />
                            <Text>6</Text>
                        </View> */}

                    </Carousel>
                </View>


                <View style={{ paddingTop: 30 }} />
                <View style={{ flex: 2 }} onLayout={this._onLayoutDidChange}>
                    <Text style={{ color: 'yellow', textAlign: 'center', fontSize: 20 }}>Autumn Season</Text>

                    <Carousel
                        //delay={3500}
                        style={this.state.size}
                    //autoplay
                    //pageInfo
                    >
                        {this.state.autumnArray.length ? this.state.autumnArray.map((image, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.state.params && this.props.navigation.state.params.selectDesign(image.uri);
                                    this.props.navigation.goBack()
                                }} >
                                    <Image
                                        style={this.state.size}
                                        source={{ uri: image.uri }}
                                    />
                                    <Text>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        }) : <View />}

                        {/* <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/1.jpg')}
                            />
                            <Text>Seasons Top Selling</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/2.jpg')}
                            />
                            <Text>2</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/3.jpg')}
                            />
                            <Text>3</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/4.jpg')}
                            />
                            <Text>4</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/5.jpg')}
                            />
                            <Text>5</Text>
                        </View>

                        <View>
                            <Image
                                style={this.state.size}
                                source={require('../../assets/6.jpeg')}
                            />
                            <Text>6</Text>
                        </View> */}

                    </Carousel>
                </View>
                <Button
                    title="Go Back"
                    color="#DAA520"
                    onPress={() => this.props.navigation.goBack()}
                />

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebox: {
        flex: 1,
        marginHorizontal: 3
    }
});
