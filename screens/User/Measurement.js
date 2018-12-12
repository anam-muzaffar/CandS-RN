import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert } from 'react-native';

//picture,name,email,contact,address1, address 2,change password
export default class Measurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMeasurements: props.navigation. state.params&&props.navigation.state.params.userMeasurements
    }
  }
  setMeasurements = (value) => {
    this.setState({userMeasurements: {...this.state.userMeasurements, ...value} })
  }
  render() {
    return (
      <ImageBackground source={require("../../assets/bckgrnd.png")} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, flexDirection: "column" }}>

          <Text style={styles.title}>Measurements </Text>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Chest</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Ribs</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(chest) => this.setMeasurements({chest})} />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(ribs) => this.setMeasurements({ribs})} />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Waist</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Waist  to Floor</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(waist) => this.setMeasurements({waist})} />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox}  onChangeText={(waistToFloor) => this.setMeasurements({waistToFloor})} />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Hips</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Neck to Floor</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(hips) => this.setMeasurements({hips})} />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(neckToFloor) => this.setMeasurements({neckToFloor})} />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Biceps</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Shoulder to Elbow</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox}
                onChangeText={(biceps) => this.setMeasurements({biceps})}
              />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox}
                onChangeText={(shoulderToElbow) => this.setMeasurements({shoulderToElbow})}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Shoulder to Waist</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Waist to Knee</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(shoulderToWaist) => this.setMeasurements({shoulderToWaist})} />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox}
                onChangeText={(waistToKnee) => this.setMeasurements({waistToKnee})}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Armpit to Waist</Text>
            </View>
            <View style={styles.sidebox}>
              <Text style={styles.sidetext}> Backneck to Waist</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(armpitToWaist) => this.setMeasurements({armpitToWaist})} />
            </View>
            <View style={styles.sidebox}>
              <TextInput keyboardType="numeric" maxLength={3} style={styles.inputbox} onChangeText={(backneckToWaist) => this.setMeasurements({backneckToWaist})} />
            </View>
          </View>
          <View style={{ paddingTop: 15 }} />
          <Text style={styles.sidetext}>Note* All measurements are kept in inches</Text>
          <Button
            title="Submit"
            color="#DAA520"
            onPress={() => {
            this.props.navigation.state.params.measurements(this.state.userMeasurements)  
              this.props.navigation.goBack()
            }}
          />

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  sidetext: {
    fontSize: 18,
    color: '#DAA520',
    margin: 5,
  },

  title: {
    paddingTop: 25,
    color: "yellow",
    fontSize: 25,
    textAlign: "center",
  },

  inputbox: {
    width: 100,
    height: 25,
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
    marginHorizontal: 2,
    alignItems: 'center',

  },


});
