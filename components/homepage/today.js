import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'



export default class Today extends React.Component {
    constructor(props) {
        super(props)
        this.days = props.days
    }


    render() {

        const styles = StyleSheet.create({
            today: {

            },
            taskslist: {
                fontWeight: "bold",
            },
            task: {

            },
            done_task: {
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
                textDecorationColor: "black",
            },
        })


        const Task = (name, sty, key) => (
            <Text style={sty} key={key}> • {name}</Text>
        )

        const Tasks = []
        var i = 0
        var more = false
        var id = 0

        var d = this.days.data.find(d => d.date == this.days.today)


        d.tasks.map(t => {
            i++
            if (i < 5) {
                var sty = ""
                if (t.status == true) {
                    sty = styles.done_task
                } else {
                    sty = styles.task
                }
                Tasks.push(Task(t.name, sty, t.id))
            } else {
                if (!more) {
                    Tasks.push(Task("[...]", styles.task, 0))
                }
                more = true
            }
        })


        return (
            <TouchableOpacity onPress={_ => this.props.switchPage("Taskslist", d.id)}>
                <Card>
                    <Card.Title>Today {this.days.today}</Card.Title>
                    <Card.Divider />
                    <Text style={styles.taskslist}> {i ? "Tasks (" + d.tasks.filter(d => d.status).length + "/" + d.tasks.length + ")" : "No tasks for today."}</Text>
                    {Tasks}
                </Card>
            </TouchableOpacity>
        )
    }
}