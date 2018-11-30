import React, {Component} from 'react';
import { Text, View, StyleSheet,ImageBackground,Button,TextInput} from 'react-native';


export default class SignUp extends React.Component {
  render() {
    return (
<ImageBackground source={require("../../assets/bckgrnd.png")} style={{flex:1}}>
  <View style={styles.page}>


  <Text style ={styles.title}>CandS</Text>
  <Text style = {styles.subheading}> Crafting and Stitching</Text>

  <View style={{paddingTop:50}} />

  <TextInput style={styles.inputbox}
    placeholder="Email"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
  />

  <View style={{paddingTop:20}} />

  <TextInput style={styles.inputbox}
    placeholder="Password"
    autoCapitalize="none"
    autoCorrect={false}
  />

  <View style={{paddingTop:20}} />

  <TextInput style={styles.inputbox}
    placeholder="Confirm Password"
    autoCapitalize="none"
    autoCorrect={false}
  />

  <View style={{paddingTop:50}} />

  <Button
    title="Sign Up"
    color="#DAA520"
    onPress={() => this.props.navigation.goBack()}
/>

  <View style={{paddingTop:150}} />

  <Button
    title="Back to Home"
    color="#DAA520"
    onPress={() => this.props.navigation.goBack()} />

  </View>
</ImageBackground>
  );
}
}

const styles = StyleSheet.create({
inputbox:{
  width: 350,
  height: 35,
  borderWidth: 2,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
},

title: {
  paddingTop:50,
  color: "yellow",
  fontSize:70,
  textAlign:"center",
},

page:{
  alignItems:"center",
  flex: 1,
},

subheading: {
  color: "yellow",
  fontSize:15,
  textAlign:"center",
},

});
