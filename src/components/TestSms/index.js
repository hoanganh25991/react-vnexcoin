import React, { PureComponent } from "react"
import { style as s } from "./style"
import DeviceFrame from "../DeviceFrame"

export default class TestSms extends PureComponent {
  render() {
    const buyerSquareS = { ...s.squareDiv, background: "#4CAF50" }
    const sellerSquareS = { ...s.squareDiv, background: "#03A9F4" }
    const vcbSquareS = { ...s.squareDiv, background: "#E0E0E0" }

    const buyerNumber = "01256654629"
    const sellerNumber = "0909333143"

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
              <DeviceFrame deviceName={"nexus5"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
