import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper"
import { style as s } from "./style"
import React, { PureComponent } from "react"
import RaisedButton from "material-ui/RaisedButton"

import TestSms from "../TestSms"

const _ = console.log

export default class VnexcoinExplain extends PureComponent {
  state = {
    finished: false,
    stepIndex: 0
  }

  handleNext = () => {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1
    })
  }

  handledivv = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  renderStepActions({ step, nextLabel = "Next", backLabel = "Back" }) {
    const { stepIndex } = this.state

    return (
      <div style={s.btnConDiv}>
        <RaisedButton label={nextLabel} primary={true} onClick={this.handleNext} style={s.nextBtn} />
        {step > 0 && <RaisedButton label={backLabel} disabled={stepIndex === 0} onClick={this.handledivv} />}
      </div>
    )
  }

  render() {
    const { finished, stepIndex } = this.state
    const { fcmData } = this.props

    return (
      <div style={s.debugConDiv}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>
              <div style={s.stepTitle}>vnexcoin workflow</div>
            </StepLabel>
            <StepContent>
              {this.renderStepActions({ step: 0, nextLabel: "Test" })}
              <ol>
                <li>
                  <div>NM chuyển tiền cho NTG</div>
                  <div style={s.subDiv}>
                    <div>SMS: VCB thông báo</div>
                    <div>Status: TRANSFERRING_DEPOSIT</div>
                  </div>
                </li>
                <li>
                  <div>NM chuyển tiền cho NTG lần 2</div>
                  <div style={s.subDiv}>
                    <div>Số tiền được cộng dồn</div>
                    <div>SMS: VCB thông báo</div>
                    <div>Status: TRANSFERRING_DEPOSIT</div>
                  </div>
                </li>
                <li>
                  <div>NM confirm chuyển xong</div>
                  <div style={s.subDiv}>
                    <div>SMS: CK XONG [Số điện thoại NB]</div>
                    <div>Status DONE_DEPOSIT</div>
                  </div>
                </li>
                <li>
                  <div>NB chuyển coin cho NM</div>
                  <div style={s.subDiv}>
                    <div>App do nothing</div>
                  </div>
                </li>
                <li>
                  <div>NB yêu cầu nhận tiền từ NTG</div>
                  <div style={s.subDiv}>
                    <div>SMS: DONE [Số điện thoại NM] [Số tài khoản NB]</div>
                    <div>Status: ASK_TRANSFER</div>
                  </div>
                </li>
                <li>
                  <div>NM nhận được coin từ NB</div>
                  <div style={s.subDiv}>
                    <div>SMS: DONE [Số điện thoại NB]</div>
                    <div>Status: RECEIVED_COIN</div>
                  </div>
                </li>
                <li>
                  <div>NTG chuyển tiền cho NB</div>
                  <div style={s.subDiv}>
                    <div>Bắt đầu chuyển tiền bằng crawling</div>
                    <div>Status: TRANSFERRING_TO_SELLER</div>
                  </div>
                </li>
                <li>
                  <div>NTG chuyển tiền xong cho NB</div>
                  <div style={s.subDiv}>
                    <div>SMS: VCB thông báo</div>
                    <div>Status: DONE_TRANSFER_TO_SELLER</div>
                  </div>
                </li>
              </ol>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <div style={s.stepTitle}>Test SMS</div>
            </StepLabel>
            <StepContent>
              {this.renderStepActions({ step: 1 })}
              <TestSms fcmData={fcmData} />
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{ margin: "20px 0", textAlign: "center" }}>
            <a
              href="#"
              onClick={event => {
                event.preventDefault()
                this.setState({ stepIndex: 0, finished: false })
              }}
            >
              Click here
            </a>{" "}
            to reset the example.
          </p>
        )}
      </div>
    )
  }
}
