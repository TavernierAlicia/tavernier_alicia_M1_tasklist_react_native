import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler'
import days from '../data'
import uuid from 'uuid-random';
import AddBtn from '../addbtn'


export default class Taskslist extends React.Component {
    constructor(props) {
        super(props)
        this.checkTask = this.checkTask.bind(this)
    }

    checkTask(id) {
        days.find(day => day.id == this.props.tl).tasks.find(task => task.id == id).status = !days.find(day => day.id == this.props.tl).tasks.find(task => task.id == id).status
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
            taskBox: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: 10,
                borderTopColor: "rgba(228, 230, 232, .7)",
                borderTopWidth: 1.5,
                paddingTop: 10,
                justifyContent: "space-between",
            },
            trash: {
                height: 25,
                width: 25,
                opacity: 0.5
            },
            task: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            },
            view: {
                flex: 1,
            },

        });

        const Task = (name, key, status) => (
            <View style={styles.taskBox} key={key}>
                <View style={styles.task}>
                    <CheckBox value={status} onValueChange={_ => this.checkTask(key)} />
                    <TouchableOpacity onPress={_ => this.checkTask(key)} >
                        <Text >{name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Image style={styles.trash} source={require('../../assets/baseline_delete_black.png')} />
                </TouchableOpacity>
            </View>
        )

        const Tasks = [];
        var i = 0
        var f = 0
        var t = days.find(day => day.id == this.props.tl) || { id: uuid(), date: this.props.today, tasks: [] }
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
        // Add day + task
        // Remove day + task
        // Save array in phone memory
        // Remove old days

        return (

            <View style={styles.view}>
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
                <AddBtn></AddBtn>
            </View>

        )
    }
}