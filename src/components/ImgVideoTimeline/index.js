import React, { PureComponent, Fragment } from "react"
import { style as s } from "./style"
import { Timeline, TimelineEvent as OEvent } from "react-event-timeline"
import defaultJpg from "./default.jpg"

const _ = console.log

const withBubleStyle = WrappedComponent => {
  return class extends React.Component {
    render() {
      return <WrappedComponent bubbleStyle={{ left: 2 }} {...this.props} />
    }
  }
}

const TimelineEvent = withBubleStyle(OEvent)
const Icon = ({ iconName }) => {
  return <i className={"material-icons md-18"}>{iconName}</i>
}

export default class ImgVideoTimeLine extends PureComponent {
  state = {
    pageAccessTokens: null
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Timeline>
          <TimelineEvent
            title="John Doe sent a SMS"
            createdAt="2016-09-12 10:06 PM"
            icon={<i className="material-icons md-18">textsms</i>}
            iconColor="#6fba1c"
          >
            I received the payment for $543. Should be shipping the item within a couple of hours. Thanks for the order!
          </TimelineEvent>
          <TimelineEvent
            title="You sent an email to John Doe"
            createdAt="2016-09-11 09:06 AM"
            icon={<i />}
            iconColor="#03a9f4"
          >
            <p>Subject: Any updates?</p>
            <p>
              Like we talked, you said that you would share the shipment details? This is an urgent order and so I am
              losing patience. Can you expedite the process and pls do share the details asap. Consider this a gentle
              reminder if you are on track already!
            </p>
            <p>- Maya</p>
          </TimelineEvent>
          <TimelineEvent
            title="John Doe sent a SMS"
            createdAt="2016-09-12 10:06 PM"
            icon={<Icon iconName={"image"} />}
            iconColor="#6fba1c"
          >
            <p>Please check if this image is good for printing</p>
            <img src={defaultJpg} />
          </TimelineEvent>
        </Timeline>
      </div>
    )
  }
}
