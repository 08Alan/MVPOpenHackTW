import React from 'react';
import { connect } from 'react-redux';
import { navigateActions } from 'core/navigate';

import CountDown from 'ant-design-pro/lib/CountDown';
import { Tag } from 'antd';
import { Progress } from 'antd';

const targetTime = new Date().getTime() + 3900000;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeLayoutCollapsed({collapsed: true})
  }

  render() {
    return (
      <div>
        <p>hello, it's work!!</p>
        <div>
          <p>here is ant design's components</p>
          <Tag color="pink">pink</Tag>
          <Tag color="red">red</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="purple">purple</Tag>
        </div>
        <div>
          <p>here is ant design pro's component</p>
          <CountDown style={{ fontSize: 20 }} target={targetTime} />
        </div>
        <div>
          <Progress type="circle" percent={this.props.navigateReducer.process} width={80} />
        </div>
      </div>

    )
  }
}

const mapStateToProps = store => (
  {
    navigateReducer: store.navigateReducer,
  }
);

export default connect(mapStateToProps, navigateActions)(HomePage)