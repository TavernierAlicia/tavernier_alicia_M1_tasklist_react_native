import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default class Alldays extends React.Component {
    constructor(props) {
        super(props)
        this.days = props.days
    }

    render() {
        const styles = StyleSheet.create({
            list: {
                flex: 1,
            },
            element: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: "rgba(228, 230, 232, .7)",
                borderBottomWidth: 1.5,
                marginBottom: 3,
            },
            text: {
                margin: 5,
                fontWeight: "bold",
                fontSize: 20,
            },
            textBlack: {
                color: "black"
            },
            textRed: {
                color: "red"
            }
        })

        const Day = (d, color) => (
            <TouchableOpacity onPress={_ => this.props.switchPage("Taskslist", d.id)} key={d.id}>
                <View style={styles.element}>
                    <Text style={[styles.text, color]}>{d.date} ({d.tasks.filter(t => t.status).length}/{d.tasks.length})</Text>
                </View>
            </TouchableOpacity>
        )

        const Days = []

        this.days.data.sort((a, b) => a.date.localeCompare(b.date)).map(d => {
            var oldTasks = false
            if (d.date.localeCompare(this.days.today) <= 0) oldTasks = true
            if (d.date != this.days.today && d.tasks.length && (!oldTasks || d.tasks.filter(t => !t.status).length)) {
                Days.push(Day(
                    d,
                    oldTasks ? styles.textRed : styles.textBlack
                ))
            }
        })

        return (

            <ScrollView style={styles.container}>
                <View style={styles.list}>
                    {Days}
                </View>
            </ScrollView>
        )
    }
}