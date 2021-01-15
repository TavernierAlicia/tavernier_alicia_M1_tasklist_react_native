import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


export default class AddBtn extends React.Component {
    constructor(props) {
        super(props)
        if (!this.props.addfn) this.props.addfn = _ => { }
    }

    render() {
        const styles = StyleSheet.create({
            addbtn: {
                borderRadius: 30,
                height: 60,
                width: 60,
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: "#CEE741",
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
            },
            addbtntxt: {
                fontSize: 50,
                lineHeight: 60,
                color: "#fff",
            },

        })

        return (
            <TouchableOpacity style={styles.addbtn} onPress={this.props.addfn}>
                <Text style={styles.addbtntxt}>+</Text>
            </TouchableOpacity>
        )
    }
}