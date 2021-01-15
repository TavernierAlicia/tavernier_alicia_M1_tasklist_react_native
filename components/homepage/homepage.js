import React from 'react'
import {View, Text} from 'react-native'
import Today from './today'
import Alldays from './alldays'
import AddBtn from '../addbtn'

export default function Homepage(props) {

  const styles = {
    container: {
      width: "100%",
      flex: 1,
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
      <Today switchPage={props.switchPage} today={props.today}></Today>
      <Alldays switchPage={props.switchPage} today={props.today}></Alldays>
      <AddBtn></AddBtn>
    </View>
  );
}
