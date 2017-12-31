import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import DeviceFrame from "../DeviceFrame"
import { getFakeSmsSteps } from "./steps"
import RaisedButton from "material-ui/RaisedButton"
import ReactJson from "react-json-view"
import { encrypt as callEncrypt, submitSmsMsg as callSubmitSmsMsg } from "../../api/index"

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

  delay = (time = 750) => {
    this.setState({ refresh: new Date() })
    return new Promise(rslv => setTimeout(rslv, time))
  }

  fakeReceiveSMS = smsStep => async () => {
    // Mark smsStep as clicked
    smsStep.clicked = true
    smsStep.btnDisabled = true
    const { smses: currSmses } = this.state
    const { reqBody } = smsStep

    if (reqBody) {
      const { payload } = reqBody
      let msg = payload.msg
      const needTranId = msg.includes("{{transactionId}}")
      if (needTranId) {
        const { fcmData } = this.props
        const id = fcmData.transaction.id
        msg = msg.replace(/{{transactionId}}/g, id)
        payload.msg = msg
      }

      const type = this.getTypeFromNUmber(payload.senderNumber)
      const newSms = { msg, type }
      const smses = [...currSmses, newSms]
      this.setState({ smses })

      const payloadToken = await callEncrypt(reqBody)
      if (!payloadToken) return

      // Encrypt payload
      smsStep.btnLabel = "Encrypting..."
      await this.delay()

      // Submit sms msg
      smsStep.btnLabel = "Submitting..."
      smsStep.reqBody = { type: "SMS_MSG", payloadToken }
      await this.delay()

      const received = await callSubmitSmsMsg(smsStep.reqBody)
      if (!received) return
    }

    // Reset for next run
    smsStep.btnDisabled = false
    smsStep.btnLabel = null
    const { smsStepIndex: curr } = this.state
    const smsStepIndex = curr + 1
    this.setState({ smsStepIndex })
  }

  scrollToBottom = () => {
    // Get a reference to the div you want to auto-scroll.
    // Create an observer and pass it a callback.
    // Tell it to look for new children that will change the height.
    const someElement = document.querySelector("div.screen")
    const observer = new MutationObserver(function() {
      someElement.scrollTop = someElement.scrollHeight
    })
    const config = { childList: true }
    observer.observe(someElement, config)
  }

  componentDidMount() {
    const smsSteps = getFakeSmsSteps()
    this.setState({ smsSteps })
    this.scrollToBottom()
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

    const fakeBtnLabel = (smsStep && smsStep.btnLabel) || "Fake received SMS"
    const disabledFakeBtn = (smsStep && smsStep.btnDisabled) || false

    const { fcmData } = this.props
    const exchangeDone = fcmData && fcmData.status === "DONE_TRANSFER_TO_SELLER"

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
          <div style={s.debugSendSmsConDiv}>
            {exchangeDone && <div>Giao dich hoàn tất</div>}
            {smsStep && (
              <Fragment>
                <div style={s.debugSendDiv}>
                  <div>
                    {smsStepOrder}. {smsStep.title}
                  </div>
                  <RaisedButton
                    label={fakeBtnLabel}
                    primary={true}
                    disabled={disabledFakeBtn}
                    onClick={this.fakeReceiveSMS(smsStep)}
                    style={s.nextBtn}
                  />
                </div>
                <div style={s.payloadDiv}>
                  <div>Payload</div>
                  {smsStep.clicked &&
                    smsStep.reqBody && (
                      <ReactJson src={smsStep.reqBody} theme="monokai" name={"Payload"} iconStyle={"circle"} />
                    )}
                </div>
              </Fragment>
            )}
            <div style={s.payloadDiv}>
              <div>Transaction</div>
              {fcmData && (
                <ReactJson
                  src={fcmData}
                  theme="monokai"
                  name={"Transaction"}
                  iconStyle={"circle"}
                  collapseStringsAfterLength={25}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
