import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import DeviceFrame from "../DeviceFrame"
import { getFakeSmsSteps } from "./steps"
import RaisedButton from "material-ui/RaisedButton"
import ReactJson from "react-json-view"

const _ = console.log

const green = "#4CAF50"
const blue = "#03A9F4"
const grey = "#E0E0E0"

export default class TestSms extends PureComponent {
  state = {
    smses: [
      // {
      //   msg: "Hello",
      //   type: "default",
      // }
    ],
    smsSteps: [],
    smsStepIndex: 0
  }

  getBackground = sms => {
    const { type } = sms
    if (type === "buyer") return green
    if (type === "seller") return blue
    if (type === "vcb") return grey
    return grey
  }

  getTypeFromNUmber = number => {
    let type = "default"
    if (number === "01256654629") type = "buyer"
    if (number === "0909333143") type = "seller"
    if (number === "0909888777") type = "vcb"
    return type
  }

  fakeReceiveSMS = smsStep => () => {
    // Mark smsStep as clicked
    smsStep.clicked = true
    const { smses: currSmses } = this.state
    const { reqBody } = smsStep
    if (!reqBody) return
    const { payload } = reqBody
    const msg = payload.msg
    const type = this.getTypeFromNUmber(payload.senderNumber)
    const newSms = { msg, type }
    const smses = [...currSmses, newSms]
    this.setState({ smses })
  }

  sendFakeReceiveSMS = smsStep => () => {}

  componentDidMount() {
    const smsSteps = getFakeSmsSteps()
    this.setState({ smsSteps })
  }

  render() {
    const buyerSquareS = { ...s.squareDiv, background: green }
    const sellerSquareS = { ...s.squareDiv, background: blue }
    const vcbSquareS = { ...s.squareDiv, background: grey }

    const buyerNumber = "01256654629"
    const sellerNumber = "0909333143"

    const { smses, smsStepIndex, smsSteps } = this.state
    const smsStepOrder = smsStepIndex + 1
    const smsStep = smsSteps[smsStepIndex]
    _("smsStep", smsStep)

    return (
      <div>
        <div style={s.noteConDiv}>
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
        <div style={s.debugConDiv}>
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
          {smsStep && (
            <div style={s.debugSendSmsConDiv}>
              <div style={s.debugSendDiv}>
                <Fragment>
                  <div>
                    {smsStepOrder}. {smsStep.title}
                  </div>
                  <RaisedButton
                    label={"Fake received SMS"}
                    primary={true}
                    onClick={this.fakeReceiveSMS(smsStep)}
                    style={s.nextBtn}
                  />
                </Fragment>
              </div>
              {smsStep.clicked && (
                <Fragment>
                  <div style={s.payloadDiv}>
                    <ReactJson src={smsStep.reqBody} theme="monokai" />
                  </div>
                  <RaisedButton
                    label={"Send"}
                    primary={true}
                    onClick={this.sendFakeReceiveSMS(smsStep)}
                    style={s.nextBtn}
                  />
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}
