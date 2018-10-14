import React from 'react';
import ReactDOM from 'react-dom';

var allView = 'all'
var activeView = 'active';
var completedView = 'completed';
var trueCount = 0;
var allChecked = false;

var count = 0;
var totalCount = 0;

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  removeLine(key) {
    totalCount --;
    this.props.removeLine(key);
  }

  checkLine(key) {
    this.props.checkLine(key);
  }

  checkboxStyle(checked) {
    return {
      textDecoration: checked ? 'line-through' : 'none',
    };
  }

  render() {
    return (
      <ul id="todoList">
        {this.props.lineList.map((line) =>
          <li className='listItem' key={line.key} id={'listItem' + line.key}>
            <input type='checkbox' checked={line.checked} id={'checkBox' + line.key} onChange={() => this.checkLine(line)} />
            <label htmlFor={'checkBox' + line.key} className='checkBoxLabel' />
            <label className='listItemLabel' style={this.checkboxStyle(line.checked)}>
              {line.value}
            </label>
            <button className='buttonItem' onClick={() => this.removeLine(line.key)} />
          </li>)}
      </ul>
    )
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      text: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRemoveLine = this.handleRemoveLine.bind(this);
    this.handleLineCheck = this.handleLineCheck.bind(this);
    this.showHideFooter = this.showHideFooter.bind(this);
  }

  handleOnChange = event => {
    this.setState({ text: event.target.value });
  }

  validate() {
    let validationText = this.state.text.trim();
    if (validationText.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      if (this.validate()) {
        e.preventDefault();
        this.setState({
          lines: [...this.state.lines, { key: count, value: this.state.text, checked: false }],
          text: ''
        });
        count++;
        totalCount++;
      }
    }
  };

  handleRemoveLine(key) {
    let filteredLines = this.state.lines.filter(function (line) {
      return (line.key !== key);
    });

    this.setState({
      lines: filteredLines
    });
  }

  handleLineCheck = ({ key, value, checked }) => {
    let newLines = this.state.lines.map(line => line.key === key ? { key, value, checked: !checked } : line)
    this.setState({
      lines: newLines
    });
  }

  showHideFooter() {
    let show = false;
    if (totalCount == 0) {
      show = false;
    }
    else {
      show = true;
    }
    return {
      display: show ? 'block' : 'none',
    };
  }

  render() {
    return (
      <section className="mvctodo">
        <header id="mainHeader">
          <h1>todos</h1>
          <input id="add" className="add" type="text" placeholder="What needs to be done?" value={this.state.text} onChange={this.handleOnChange} onKeyDown={(e) => this.handleKeyPress(e)} autoFocus />
          <label id="selectAll"></label>
        </header>
        <section>
          <List
            lineList={this.state.lines}
            removeLine={this.handleRemoveLine}
            checkLine={this.handleLineCheck} />
        </section>
        <footer className="mvcFooter" id="mvcFooter" style={this.showHideFooter()}>
          <label id="divLabel"></label>
          <ul className="selectFilter">
            <li>
              <a href="#/all" className="allSelected" id="allSelected">All</a>
            </li>
            <li>
              <a href="#/active" className="allActive" id="allActive">Active</a>
            </li>
            <li>
              <a href="#/completed" className="allCompleted" id="allCompleted">Completed</a>
            </li>
          </ul>
        </footer>
      </section>
    );
  };
};

//==========================================
ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);