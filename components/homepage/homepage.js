import React from 'react'
import {View, Text} from 'react-native'
import Today from './today'
import Alldays from './alldays'

export default function Homepage(props) {

  var day = new Date().getDate()
  if (day < 10) {
      day = "0" + day
  }
  var month = new Date().getMonth() + 1
  if (month < 10) {
      month = "0" + month
  }
  var year = new Date().getFullYear()

  const date = year + "-" + month + "-" + day 

  const styles = {
    container: {
      width: "100%",
    },
    header: {
      backgroundColor: "#CEE741",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 80,
      paddingTop: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 25,
      color: "white",
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasklist</Text>
      </View>
      <Today switchPage={props.switchPage} today={date}></Today>
      <Alldays switchPage={props.switchPage} today={date}></Alldays>
    </View>
  );
}
