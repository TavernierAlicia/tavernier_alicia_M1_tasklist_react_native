import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import DialogInput from 'react-native-dialog-input'
import AddBtn from '../addbtn'


export default class Taskslist extends React.Component {
    constructor(props) {
        super(props)
        this.isDialogVisible = false
        this.checkTask = this.checkTask.bind(this)
        this.removeDay = this.removeDay.bind(this)
        this.toggleTaskDialog = this.toggleTaskDialog.bind(this)
        this.addNewTask = this.addNewTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.days = props.days
    }

    checkTask(id) {
        this.days.checkTask(this.props.tl, id)
        this.forceUpdate()
    }

    removeDay() {
        Alert.alert(
            "Warning",
            "Are you sure to delete this day including all his tasks?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        this.days.removeDay(this.props.tl)
                        this.props.switchPage("Homepage")
                    }
                }
            ],
            { cancelable: false }
        )
    }

    toggleTaskDialog(status) {
        this.isDialogVisible = status
        this.forceUpdate()
    }

    addNewTask(text) {
        this.days.addTask(this.props.tl, text)
        this.toggleTaskDialog(false)
    }

    removeTask(id) {
        Alert.alert(
            "Warning",
            "Are you sure to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        this.days.removeTask(this.props.tl, id)
                        this.forceUpdate()
                    }
                }
            ],
            { cancelable: false }
        )

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

        })

        const Task = (name, key, status) => (
            <View style={styles.taskBox} key={key}>
                <View style={styles.task}>
                    <CheckBox value={status} onValueChange={_ => this.checkTask(key)} />
                    <TouchableOpacity onPress={_ => this.checkTask(key)} >
                        <Text >{name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={_ => this.removeTask(key)}>
                    <Image style={styles.trash} source={require('../../assets/baseline_delete_black.png')} />
                </TouchableOpacity>
            </View>
        )

        const Tasks = []
        var i = 0
        var f = 0
        var t = this.days.getDataByDay(this.props.tl)
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


        return (

            <View style={styles.view}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={_ => this.props.switchPage("Homepage")}>
                        <Image style={styles.back} source={require('../../assets/baseline_arrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Tasks for {t.date}</Text>
                    <TouchableOpacity onPress={_ => this.removeDay()}>
                        <Image style={styles.back} source={require('../../assets/outline_delete.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.taskslist}>Tasks ({f}/{i}) </Text>
                <ScrollView>
                    {Tasks}
                </ScrollView>
                <DialogInput isDialogVisible={this.isDialogVisible}
                    title={"Add task"}
                    message={"Please type your task"}
                    hintInput={"Ex: complain about neighbours"}
                    submitInput={inputText => this.addNewTask(inputText)}
                    closeDialog={_ => this.toggleTaskDialog(false)}>
                </DialogInput>
                <AddBtn addfn={_ => this.toggleTaskDialog(true)}></AddBtn>
            </View>

        )
    }
}