import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import DeviceFrame from "../DeviceFrame"

const _ = console.log

export default class TestSms extends PureComponent {
  state = {
    smses: [
      {
        msg: "Hello"
      }
    ]
  }

  getBackground = sms => {
    const { type } = sms

    if (type === "buyer") return "#4CAF50"

    if (type === "seller") return "#03A9F4"

    return "#E0E0E0"
  }

  render() {
    const buyerSquareS = { ...s.squareDiv, background: "#4CAF50" }
    const sellerSquareS = { ...s.squareDiv, background: "#03A9F4" }
    const vcbSquareS = { ...s.squareDiv, background: "#E0E0E0" }

    const buyerNumber = "01256654629"
    const sellerNumber = "0909333143"

    const { smses } = this.state

    return (
      <div>
        <div>
          <div style={s.noteDiv}>
            <div style={buyerSquareS} />
            <div>Người Mua, phone: {buyerNumber}</div>
          </div>
          <div style={s.noteDiv}>
            <div style={sellerSquareS} />
            <div>Người Bán, phone: {sellerNumber}</div>
          </div>
          <div style={s.noteDiv}>
            <div style={vcbSquareS} />
            <div>VCB</div>
          </div>
        </div>
        <div style={s.mainDiv}>
          <div style={s.main1ConDiv}>
            <div style={s.phoneDemoDiv}>
              <DeviceFrame deviceName={"nexus5"}>
                <div style={s.deviceScreen}>
                  {smses.map((sms, index) => {
                    const background = this.getBackground(sms)
                    const smsS = { ...s.smsDiv, background }
                    return (
                      <div key={index} style={smsS}>
                        {sms.msg}
                      </div>
                    )
                  })}
                </div>
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
