import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import * as firebase from "firebase"
import dotenv from "dotenv"

dotenv.config()
const { REACT_APP_PROJECT_ID: projectId, REACT_APP_CLIENT_KEY: apiKey } = process.env
const _ = console.log

export default class App extends PureComponent {
  state = {}

  componentDidMount() {
    const authDomain = `${projectId}.firebaseapp.com`
    const databaseURL = `https://${projectId}.firebaseio.com`
    const fbApp = firebase.initializeApp({ apiKey, authDomain, databaseURL })
    this.setState({ fbApp })
    const db = fbApp.database()
    const nodeRcRef = db.ref("nodeRemoteCentral")
    const waitFetchData = new Promise(resolve => nodeRcRef.once("value", snapshot => resolve(snapshot.val())))
    waitFetchData.then(({ categories, commands }) => {
      const categoriesArr = Object.values(categories)
      const commandsArr = Object.values(commands)
      this.setState({ currCates: categoriesArr, categories: categoriesArr, commands: commandsArr })
    })
  }

  componentWillUnmount() {
    const { fbApp } = this.state
    if (!fbApp) return
    fbApp
      .delete()
      .then(() => _("[fbApp] deleted"))
      .catch(err => {
        _("[fbApp] Fail to delete app", err)
      })
  }

  render() {
    return <div style={sendMsgDiv} />
  }
}
