import React from 'react'
import { View, Text, AppRegistry } from 'react-native'
import Today from './today'
import Alldays from './alldays'
import AddBtn from '../addbtn'
import { DatePickerDialog } from 'react-native-datepicker-dialog'

export default function Homepage(props) {

  var dialog = React.createRef()
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

  const openDOBDialog = () => {
    dialog.current.open({
      date: new Date(),
      minDate: new Date(),
    })
  }

  const onDOBDatePicked = (date) => {
    const newtl = props.days.addDay(date)
    props.switchPage("Taskslist", newtl)
  }

  AppRegistry.registerComponent('DatePickerTimePickerDialog', () => DatePickerTimePickerDialog)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasklist</Text>
      </View>
      <Today switchPage={props.switchPage} days={props.days}></Today>
      <DatePickerDialog ref={dialog} onDatePicked={onDOBDatePicked} />
      <Alldays switchPage={props.switchPage} days={props.days}></Alldays>
      <AddBtn addfn={openDOBDialog.bind(openDOBDialog)}></AddBtn>
    </View>
  )
}
