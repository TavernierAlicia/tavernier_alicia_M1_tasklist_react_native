import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import uuid from 'uuid-random'


export default class Days {
    constructor() {
        this.today = this.formatDay(new Date())
        this.data = [{ id: uuid(), date: this.today, tasks: [] }]

        this.storage = new Storage({
            size: 1,
            storageBackend: AsyncStorage,
        })
    }

    formatDay = d => {
        var day = d.getDate()
        if (day < 10) {
            day = "0" + day
        }
        var month = d.getMonth() + 1
        if (month < 10) {
            month = "0" + month
        }
        var year = d.getFullYear()
        return year + "-" + month + "-" + day
    }

    getDataByDay = dayId => {
        return this.data.find(day => day.id == dayId)
    }

    getDataByDate = date => {
        return this.data.find(day => day.date == date)
    }

    addDay = date => {
        const formattedDate = this.formatDay(date)
        var day = this.getDataByDate(formattedDate)
        if (!day) {
            day = { id: uuid(), date: formattedDate, tasks: [] }
            this.data.push(day)
        }
        this.storeData()
        return day.id
    }

    removeDay = dayId => {
        this.data = this.data.filter(d => d.id != dayId)
        this.storeData()
    }

    addTask = (dayId, name) => {
        for (let d of this.data) {
            if (d.id == dayId) {
                d.tasks.push({ id: uuid(), status: false, name: name })
                break
            }
        }
        this.storeData()
    }

    removeTask = (dayId, taskId) => {
        for (let d of this.data) {
            if (d.id == dayId) {
                d.tasks = d.tasks.filter(t => t.id != taskId)
                break
            }
        }
        this.storeData()
    }

    checkTask = (dayId, taskId) => {
        for (let d of this.data) {
            if (d.id == dayId) {
                for (let t of d.tasks) {
                    if (t.id == taskId) {
                        t.status = !t.status
                        break
                    }
                }
                break
            }
        }
        this.storeData()
    }

    loadData = _ => {
        return this.storage.load({ key: 'taskliststorage' }).then(res => this.data = res ? res : this.data).catch(e => this.data = this.data)
    }

    cleanData = _ => {
        this.data = this.data
        return this.data
    }

    storeData = _ => {
        const data = this.cleanData
        this.storage.save({
            key: 'taskliststorage',
            data: data
        })
    }

}