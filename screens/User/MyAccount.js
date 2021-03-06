import React, {Component} from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert } from 'react-native';

//picture,name,email,contact,address1, address 2,change password
export default class MyAccount extends React.Component {
  render() {
    return (
<ImageBackground source={require("../../assets/bckgrnd.png")} style={{flex:1}}>

      <ScrollView style={{flex: 1, flexDirection: "column"}}>

<Text style ={styles.title}>Account Details </Text>

<View style={{paddingTop:30}} />
<View style={styles.grid}>
<View style={styles.sidebox}>
<Text style={styles.sidetext}> Place Holder </Text>
</View>
<View style={styles.sidebox}>
<Button
title = 'Upload Image'
color="#DAA520"/>
</View>
</View>
<View style={{paddingTop:65}} />

<View style={styles.grid}>
  <View style={styles.sidebox}>
  <Text style={styles.sidetext}> Name</Text>
  </View>
  <View style={styles.sidebox}>
  <TextInput style={styles.inputbox}
  placeholder="Joey"
  autoCapitalize="none"
  autoCorrect={false}
  />
  </View>
</View>
<View style ={{paddingTop: 15}} />

<View style={styles.grid}>
<View style={styles.sidebox}>
<Text style={styles.sidetext}> Email</Text>
</View>
<View style={styles.sidebox}>
<TextInput style={styles.inputbox}
placeholder="example@cands.com"
keyboardType="email-address"
autoCapitalize="none"
autoCorrect={false}
/>
</View>
</View>
<View style ={{paddingTop: 15}} />

<View style={styles.grid}>
<View style={styles.sidebox}>
<Text style={styles.sidetext}> Address 1</Text>
</View>
<View style={styles.sidebox}>
<TextInput style={styles.inputbox}
placeholder="House, St"
autoCorrect={false}
/>
</View>
</View>
<View style ={{paddingTop: 15}} />

<View style={styles.grid}>
<View style={styles.sidebox}>
<Text style={styles.sidetext}> Address 2</Text>
</View>
<View style={styles.sidebox}>
<TextInput style={styles.inputbox}
placeholder="City"
/>
</View>
</View>

<View style ={{paddingTop: 35}} />

<View style={styles.grid}>
<View style={styles.sidebox}>
<Text style={styles.sidetext}> Change </Text>
<Text style={styles.sidetext}> Password </Text>
</View>
<View style={styles.sidebox}>
<TextInput style={styles.passchange}
placeholder="Current"
autoCapitalize="none"
secureTextEntry={true}
/>

</View>
</View>

<View style={styles.grid}>
<View style={styles.sidebox}>
<Button
title="Update"
color="#DAA520"
onPress={() => this.props.navigation.goBack()}
/>
</View>
<View style={styles.sidebox}>
<TextInput style={styles.passchange}
placeholder="New"
autoCapitalize="none"
secureTextEntry={true}
/>
</View>
</View>
<View style ={{paddingTop: 25}} />


<Button
title="Sign out"
onPress={this.onSignoutPress}
color="#DAA520"
onPress={() => this.props.navigation.navigate('Login')}
/>

</ScrollView>
</ImageBackground>
);
}
}

const styles = StyleSheet.create({

sidetext:{
  fontSize: 20,
  color:'#fff'
 },

page:{
  alignItems:"center",
  flex: 1,
},

title: {
  paddingTop:30,
  color: "yellow",
  fontSize:40,
  textAlign:"center",
},

subheading: {
  color: "yellow",
  fontSize:15,
  textAlign:"center",
},

inputbox:{
  width: 150,
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
  marginHorizontal: 2
},

sidebox: {
  flex: 1,
  marginHorizontal: 2
},

passchange: {
  marginVertical: 5,
  width: 150,
  height: 35,
  borderWidth: 1,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
},


});
