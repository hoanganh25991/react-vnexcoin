import React, { PureComponent } from "react"
import { style as s } from "./style"

const _ = console.log

export default class DeviceFrame extends PureComponent {
  render() {
    const { deviceName, children } = this.props
    return (
      <div className={`marvel-device ${deviceName}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="screen">{children}</div>
      </div>
    )
  }
}
