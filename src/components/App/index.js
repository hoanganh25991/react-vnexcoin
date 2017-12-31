import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import * as firebase from "firebase"
import dotenv from "dotenv"
import fbLogo from "../../img/fb-logo.png"

dotenv.config()
const {
  REACT_APP_AUTH_DOMAIN: authDomain,
  REACT_APP_CLIENT_KEY: apiKey,
  REACT_APP_DATABASE_URL: databaseURL
} = process.env
const _ = console.log
const FB_MAIN_BRANCH = "tmp"
const VNEXCOIN_TOPIC = "vnexcoin"

export default class App extends PureComponent {
  state = {
    fcmData: null,
    canPushNotification: null
  }

  askNotificationPermission = () => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications")
      return
    }

    if (Notification.permission === "granted") {
      this.setState({ canPushNotification: true })
      return
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission(permission => {
        const granted = permission === "granted"
        if (!granted) return
        this.setState({ canPushNotification: true })
      })
    }
  }

  notifyMe = payload => {
    const { canPushNotification } = this.state
    if (!canPushNotification) return
    const title = "FCM Push sent"
    const body = payload.msg || JSON.stringify(payload)
    const icon = fbLogo
    new Notification(title, { body, icon })
  }

  componentDidMount() {
    _("[ apiKey, authDomain, databaseURL]", apiKey, authDomain, databaseURL)
    const fbApp = firebase.initializeApp({ apiKey, authDomain, databaseURL })
    this.setState({ fbApp })

    const db = fbApp.database()
    const refToVnexcoin = db.ref(`${FB_MAIN_BRANCH}/${VNEXCOIN_TOPIC}`)

    refToVnexcoin.on("value", snapshot => {
      const fcmDataStr = snapshot.val()
      _(`[fbApp][vnexcoin] snapshot`, fcmDataStr)
      const fcmData = JSON.parse(fcmDataStr)
      this.setState({ fcmData })
      this.notifyMe(fcmData)
    })

    this.askNotificationPermission()
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
    return <div style={s.rootDiv} />
  }
}
