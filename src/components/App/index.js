import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import LoginPage from "../LoginPage"
import SendMessage from "../SendMessage"
import { getPageAccessTokens } from "../../facebook-api/pageInsights"

const _ = console.log

export default class App extends PureComponent {
  state = {
    pageAccessTokens: null
  }

  componentDidMount() {}

  cbUserAccessToken = async token => {
    const { pageAccessTokens } = await getPageAccessTokens(token)
    _("[pageAccessTokens]", pageAccessTokens)
    this.setState({ pageAccessTokens })
  }

  render() {
    const { pageAccessTokens } = this.state
    const loginPage = !pageAccessTokens
    const hasPages = pageAccessTokens && pageAccessTokens.length > 0
    const sendMsgDiv = hasPages ? { ...s.sendMsgDiv, ...s.sendMsgDivHasData } : s.sendMsgDiv

    return (
      <div style={sendMsgDiv}>
        {loginPage && <LoginPage cbToken={this.cbUserAccessToken} />}
        {!loginPage && !hasPages && "Dont have page to send message."}
        {hasPages && <div style={s.title}>Your Pages</div>}
        {hasPages && (
          <Fragment>
            {pageAccessTokens.map(page => {
              const { id: pageId } = page
              return <SendMessage key={pageId} page={page} />
            })}
          </Fragment>
        )}
      </div>
    )
  }
}
