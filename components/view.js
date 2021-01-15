import React from 'react'
import { StyleSheet, View } from 'react-native'
import Days from './data'
import Taskslist from './daypage/taskslist'
import Homepage from './homepage/homepage'

class AppView extends React.Component {

    constructor() {
        super()
        this.state = { page: "Homepage", currentTL: null }
        this.switchPage = this.switchPage.bind(this)
        this.days = new Days()
        this.days.loadData().then(_ => this.forceUpdate())
    }

    switchPage(s, tl = null) {
        this.setState({ page: s, currentTL: tl })
        this.forceUpdate()
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
            },
        })


        if (this.state.page == "Homepage") {
            return (
                <View style={styles.container}>
                    <Homepage today={this.date} switchPage={this.switchPage} days={this.days}></Homepage>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Taskslist switchPage={this.switchPage} tl={this.state.currentTL} days={this.days}></Taskslist>
                </View>
            )
        }
    }
}

export default AppView

