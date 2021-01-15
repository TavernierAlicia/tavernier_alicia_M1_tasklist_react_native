import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import days from '../data'


export default class Today extends React.Component {
    constructor(props) {
        super(props);
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
        });


        const Task = (name, sty, key) => (
            <Text style={sty} key={key}> • {name}</Text>
        )

        const Tasks = [];
        var i = 0
        var more = false
        var id = 0

        days.map(d => {
            if (d.date == this.props.today) {
                id = d.id
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
            }
        })

        return (
            <TouchableOpacity onPress={_ => this.props.switchPage("Taskslist", id)}>
                <Card>
                    <Card.Title>Today {this.props.today}</Card.Title>
                    <Card.Divider />
                    <Text style={styles.taskslist}> {i ? "Tasks ("+i+")" : "No tasks for today."}</Text>
                    {Tasks}
                </Card>
            </TouchableOpacity>
        )
    }
}