import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import days from '../data'

export default class Alldays extends React.Component {
    constructor(props) {
        super(props);
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
            }
        });

        const Day = (date, id) => (
            <TouchableOpacity onPress={_ => this.props.switchPage("Taskslist", id)} key={id}>
                <View style={styles.element}>
                    <Text style={styles.text}>{date}</Text>
                </View>
            </TouchableOpacity>
        )

        const Days = [];

        days.sort((a, b) => a.date.localeCompare(b.date)).map(d => {
            if (d.date != this.props.today) {
                Days.push(Day(d.date, d.id))
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