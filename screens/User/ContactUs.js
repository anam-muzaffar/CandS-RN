
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,ImageBackground,Button,Dimensions} from 'react-native';
import { CSButton } from '../../components/CSButton';
const {height,width} = Dimensions.get("window")



export default class ContactUs extends Component<Props> {
  render() {
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{flex:1}}>
       <View style={styles.page}>
        <Text style={styles.Contact}> CONTACT US </Text>

        <Text style= {styles.line}>We are happy to answer any questions you have. Just send us a message in the box below</Text>

        <View style={{paddingTop:15}}/>

        <Text style={styles.subject}> Subject </Text>
         <TextInput style = {styles.inputbox}

         />
        <View style={{paddingTop:15}}/>

        <Text style={styles.Message}> Message </Text>

        <TextInput style = {styles.messagebox}
         multiline = {true}
         numberOfLines = {7}
         />

       <View style={{paddingTop:15}}/>

        <CSButton
    title="Send"
    color="#DAA520"
    textAlign= "center"
  />


      <View style={{paddingTop:20}}/>


  <Text style= {styles.line}>Our Email: admin@cands.com</Text>
<Text style= {styles.line}>Phone: 042746574</Text>
 <Text style= {styles.line}>On Web: facebook|Twitter</Text>
      </View>
     </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputbox:{
  width: width/1.05,
  height: 35,
  borderWidth: 2,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
},
  Contact: {
    fontSize: 30,
  //  fontWeight: 'bold',
    color: 'yellow'
  },
subject: {
  fontSize:20,
  //fontWeight: 'bold',
  color:'yellow'
},
page:{
  flex: 1,
  paddingTop:50
},
line: {
  fontSize:15,
  color: '#c4c633',
  margin : 2
},
Message:{
  fontSize:20,
  //fontWeight: 'bold',
  color:'yellow'
},
messagebox: {
   width: width/1.05,
  height: 150,
  borderWidth: 2,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
}
});
