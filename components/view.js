import React from 'react'
import { StyleSheet, View } from 'react-native'
import Taskslist from './daypage/taskslist';
import Homepage from './homepage/homepage'

class AppView extends React.Component {

    constructor() {
        super()
        this.state = { page: "Homepage", currentTL: null}
        this.switchPage = this.switchPage.bind(this)
    }

    switchPage(s, tl = null) {
        this.setState({ page: s, currentTL: tl })
        console.log("hhhhhhhhh")
        this.forceUpdate()
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
            },
        });


        if (this.state.page == "Homepage") {
            return (
                <View style={styles.container}>
                    <Homepage switchPage={this.switchPage}></Homepage>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Taskslist switchPage={this.switchPage} tl={this.state.currentTL}></Taskslist>
                </View>
            )
        }
    }
}

export default AppView

