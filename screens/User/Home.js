import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, TextInput, Button, Linking, Alert, ImageBackground, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get('window');
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
      images: []
    };
    firebase.database().ref("/images").on('value', (snap) => {
      let data = snap.val();
      if (data) {

        this.setState({ images: data.filter((image) => image.category == 'trending') })
      }
      else {
        this.setState({ images: data })
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
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: 30, flex: 2 }} onLayout={this._onLayoutDidChange}>
            <Carousel
              delay={3500}
              style={this.state.size}
              autoplay
              pageInfo
            >
              {this.state.images.length ? this.state.images.map((image, index) => {
                return (
                  <View>
                    <Image
                      style={this.state.size}
                      source={{ uri: image.uri }}
                    />
                    <Text>{index + 1}</Text>
                  </View>
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
          <View style={{ flex: 2 }}>
            <View style={{ paddingTop: 30 }} />


            <View style={{ paddingTop: 30 }} />
            <Button
              title="Place an Order"
              color="#DAA520"
              onPress={() => this.props.navigation.navigate('PlaceOrder')}

            />
            <View style={{ paddingTop: 45 }} />

            <View style={styles.grid}>
              <View style={styles.sidebox}>
                <Button
                  title="My Account"
                  color="#DAA520"
                  onPress={() => this.props.navigation.navigate('MyAccount')}

                />
              </View>
              <View style={styles.sidebox}>
                <Button
                  title="Contact Us"
                  color="#DAA520"
                  onPress={() => this.props.navigation.navigate('ContactUs')}

                />
              </View>
            </View>
            <View style={{ paddingTop: 55 }} />
            <Button
              title="Sign out"
              onPress={() => this.props.navigation.navigate('Login')}
              color="#DAA520"
            />
          </View>
        </View>
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
