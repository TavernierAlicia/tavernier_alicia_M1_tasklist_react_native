import React from 'react'
import { StyleSheet, View } from 'react-native'
import Taskslist from './daypage/taskslist';
import Homepage from './homepage/homepage'

class AppView extends React.Component {

    constructor() {
        super()
        this.state = { page: "Homepage", currentTL: null}
        this.switchPage = this.switchPage.bind(this)
        var day = new Date().getDate()
        if (day < 10) {
            day = "0" + day
        }
        var month = new Date().getMonth() + 1
        if (month < 10) {
            month = "0" + month
        }
        var year = new Date().getFullYear()
      
        this.date = year + "-" + month + "-" + day 
    }

    switchPage(s, tl = null) {
        this.setState({ page: s, currentTL: tl })
        console.log(tl)
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
                    <Homepage  today={this.date} switchPage={this.switchPage}></Homepage>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Taskslist today={this.date}  switchPage={this.switchPage} tl={this.state.currentTL}></Taskslist>
                </View>
            )
        }
    }
}

export default AppView

