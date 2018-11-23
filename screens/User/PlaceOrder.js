import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,ImageBackground,Button} from 'react-native';



export default class PlaceOrder extends Component<Props> {
  render() {
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{flex:1}}>
       <View style={styles.page}>
        <Text style={styles.Contact}> ORDER HERE </Text>
       <View style={{paddingTop:35}}/>

        <Button
    title="View Designs"
    color="#DAA520"
    textAlign= "center"
  />


      <View style={{paddingTop:40}}/>

        <Button
    title="Fulfill Measurements"
    color="#DAA520"
    textAlign= "center"
    onPress={() => this.props.navigation.navigate('Measurement')}

  />
       <View style={{paddingTop:40}}/>
       <Text style={styles.Message}> Additional Note </Text>
        <TextInput style = {styles.messagebox}
         multiline = {true}
         numberOfLines = {7}

         />

          <View style={{paddingTop:30}}/>
          <Button
    title="Submit Order"
    color="#DAA520"
    textAlign= "center"
    onPress={() => this.props.navigation.goBack()}

  />
        <View style={{paddingTop:30}}/>
          <Button
    title="Cancel"
    color="#DAA520"
    textAlign= "center"
    onPress={() => this.props.navigation.goBack()}

  />

      </View>
     </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputbox:{
  width: 355,
  height: 35,
  borderWidth: 2,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
},
  Contact: {
    fontSize: 30,
  //  fontWeight: 'Bold',
    color: 'yellow'
  },
subject: {
  fontSize:20,
//  fontWeight: 'Bold',
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
//  fontWeight: 'Bold',
  color:'yellow'
},
messagebox: {
   width: 355,
  height: 150,
  borderWidth: 2,
  borderColor: 'grey',
  color: "#c4c633",
  fontSize: 18
}
});
