import React from 'react';
import ReactDOM from 'react-dom';

var app = app || {};
app.allView = 'all'
app.activeView = 'active';
app.completedView = 'completed';
app.count = 0;
app.trueCount = 0;
app.allChecked = false;

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props,
    };
  }
  handleCheck(e) {
    e.checked = true;
  }
  render() {
    return (
      <li>
        <input type='checkbox' onClick={(e) => this.handleCheck(e)} />
        <label for='checkBox' className='checkBoxLabel' />
        <label className='listItemLabel'>
          {this.state.value}
        </label>
        <button className='buttonItem' onClick={this.props.onClick} />
      </li>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: []
    };
  }
  handleKeyPress(e) {
    if (e.key === "Enter") {
      if (validate()) {
        e.preventDefault();
        let newLines = this.state.lines.slice();
        newLines= [...this.state.lines, e.target.value];
        this.setState({
          lines: newLines
        });
        e.target.value = ''
      }
    }
  };

  render() {
    return (
      <section className="mvctodo">
        <header id="mainHeader">
          <h1>todos</h1>
          <input id="add" className="add" type="text" placeholder="What needs to be done?" onKeyDown={(e) => this.handleKeyPress(e)} autoFocus />
          <label id="selectAll"></label>
        </header>
        <section>
          <ul id="todoList">
            {this.state.lines}
          </ul>
        </section>
        <footer className="mvcFooter" id="mvcFooter" style={{ display: 'none' }}>
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

function validate() {
  let text = document.getElementById("add");
  let validationText = text.value.trim();
  if (validationText.length === 0) {
    return false;
  }
  else {
    return true;
  }
}