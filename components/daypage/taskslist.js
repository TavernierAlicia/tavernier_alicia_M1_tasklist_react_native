import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler'
import days from '../data'

export default class Taskslist extends React.Component {
    constructor(props) {
        super(props)
        this.checkTask = this.checkTask.bind(this)
    }

    checkTask(id) {
        days.find(day => day.id == this.props.tl).tasks.find(task => task.id==id).status = !days.find(day => day.id == this.props.tl).tasks.find(task => task.id==id).status
        this.forceUpdate()
    }

    render() {

        const styles = StyleSheet.create({
            header: {
                backgroundColor: "#CEE741",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 80,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: 10,
              },
              title: {
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
              },
              back: {
                height: 30,
                width: 30,
              },
              checkbox: {

              },
              taskName: {

              },
        });


        const Task = (name, key, status) => (
            <TouchableOpacity onPress={_ => this.checkTask(key)} key={key}>
                  <CheckBox value={status} disabled={true} />
                <Text >{name}</Text>
            </TouchableOpacity>
        )

        const Tasks = [];
        var i = 0
        var f = 0
        var t = days.find(day => day.id = this.props.tl)
        console.log(this.props.tl)
        t.tasks.map(task => {
            i++
            var sty = ""
            if (task.status == true) {
                sty = styles.done_task
                f++

            } else {
                sty = styles.task
            }
            Tasks.push(Task(task.name, task.id, task.status))
        })

        // TODO:
        // Repair page change
        // Add day + task
        // Remove day + task
        // Save array in phone memory
        // Remove old days
        // Checkboxes management

        return (

            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={_ => this.props.switchPage("Homepage")}>
                        <Image style={styles.back} source={require('../../assets/baseline_arrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Tasks for {t.date}</Text>
                    <TouchableOpacity>
                        <Image style={styles.back} source={require('../../assets/outline_delete.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.taskslist}>Tasks ({f}/{i}) </Text>
                <ScrollView>
                    {Tasks}
                </ScrollView>
            </View>

        )
    }
}