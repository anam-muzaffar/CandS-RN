import React, {Component} from 'react';
import { Text, View, StyleSheet,TextInput,ImageBackground,Button } from 'react-native';


export default class Login extends React.Component {
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

    <View style={{paddingTop:10}} />

    <TextInput style={styles.inputbox}
    placeholder="Password"
    secureTextEntry={true}
    autoCapitalize="none"
    autoCorrect={false}
  />
    <View style={{paddingTop:15}} />

    <Button
    title="Login"
    color="#DAA520"
    textAlign= "center"
    onPress={() => this.props.navigation.navigate('User')}


  />
  <View style={{paddingTop:45}} />


  <Button
  title="Admin Sgin in"
  color="#DAA520"
  textAlign= "center"
  onPress={() => this.props.navigation.navigate('LoginAdmin')}

/>

    <View style={{paddingTop:180}} />

    <View style={styles.grid}>
      <View style={styles.sidebox}>
      <Button
        title="Sign Up"
        color="#DAA520"
        onPress={() => this.props.navigation.navigate('SignUp')}

      />
      </View>
      <View style={styles.sidebox}>
      <Button
        title="Forgot Password?"
        color="#DAA520"
        onPress={() => this.props.navigation.navigate('ForgotPassword')}

      />
      </View>
    </View>
</View>
</ImageBackground>
);
}
}

const styles = StyleSheet.create({


page:{
  alignItems:"center",
  flex: 1,
},

title: {
  paddingTop:50,
  color: "yellow",
  fontSize:70,
  textAlign:"center",
},

subheading: {
  color: "yellow",
  fontSize:15,
  textAlign:"center",
},

inputbox:{
  width: 350,
  height: 35,
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
},

sidebox: {
  flex: 1,
}



});
