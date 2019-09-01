import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        { id: 1, isBot: true, content: 'hello from bot' },
        { id: 2, isBot: false, content: 'hello from human' },
      ],
      newMessage: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      newMessage: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let list = this.state.messages;
    list.push({
      id: this.state.messages[this.state.messages.length - 1].id + 1,
      isBot: [true, false][Math.floor(Math.random() * 2)],
      content: this.state.newMessage
    })

    this.setState({
      messages: list
    })
  }

  render() {
    return (
      <div>
        <div className="mainChat">
          {this.state.messages.map((chat) => {
            return <div
              key={chat.id}
              className={`message ${chat.isBot ? 'botChat' : 'humanChat'} `}>
              {chat.content}</div>
          })}

        </div>
        <div className="input">
          <input type="text" value={this.state.newMessage} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat;