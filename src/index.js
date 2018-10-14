import React from 'react';
import ReactDOM from 'react-dom';

var currentView = 'all'
var allChecked = false;

var count = 0;
var totalCount = 0;
var uniqueID = 0;

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  removeLine(key) {
    totalCount--;
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
      text: '',
      view: currentView
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRemoveLine = this.handleRemoveLine.bind(this);
    this.handleLineCheck = this.handleLineCheck.bind(this);
    this.showHideFooter = this.showHideFooter.bind(this);
    this.updateItemCount = this.updateItemCount.bind(this);
    this.showHideClearButton = this.showHideClearButton.bind(this);
    this.showView = this.showView.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
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
          lines: [...this.state.lines, { key: uniqueID, value: this.state.text, checked: false }],
          text: ''
        });
        count++;
        uniqueID++;
        totalCount++;
      }
    }
  };

  handleRemoveLine(key) {
    let singleLine = this.state.lines.find((lineItem) => {
      return lineItem.key === key;
    });

    if (singleLine.checked === false) {
      count--;
    }

    let filteredLines = this.state.lines.filter(function (line) {
      return (line.key !== key);
    });

    this.setState({
      lines: filteredLines
    });
  }

  handleLineCheck = ({ key, value, checked }) => {
    if (checked === false) {
      count--;
    }
    else {
      count++;
    }
    let newLines = this.state.lines.map(line => line.key === key ? { key, value, checked: !checked } : line)
    this.setState({
      lines: newLines
    });
  }

  showHideFooter() {
    let show = false;
    if (totalCount === 0) {
      show = false;
    }
    else {
      show = true;
    }
    return {
      display: show ? 'block' : 'none',
    };
  }

  updateItemCount() {
    if (count === 0 || count > 1) {
      return count + ' items left';
    }
    else {
      return count + ' item left';
    }
  }

  showHideClearButton(){
    let show = false;
    if(totalCount > 0){
      if(totalCount === count){
        show = false;
      }
      else{
        show = true;
      }
    }
    return {
      display: show ? 'inline' : 'none'
    }
  }

  showView(viewState){
    if(viewState === 'all'){
      this.state.view = 'all'
    }
    else if(viewState === 'active'){
      this.state.view = 'active'
    }
    else if(viewState === 'completed'){
      this.state.view = 'completed'
    }
  }

  //placeholder, currently does not work
  showHighlight(selected){
    if(this.state.view === 'all' && selected === 'all'){
      return 'rgba(240, 205, 9, 0.5)'
    }
    else if(this.state.view === 'active' && selected === 'active'){
      return 'rgba(240, 205, 9, 0.5)'
    }
    else if(this.state.view === 'completed' && selected === 'completed'){
      return 'rgba(240, 205, 9, 0.5)'
    }
    else{
      if(selected === 'all'){
        return 'none'
       
      }
      else if(selected === 'active'){
        return 'none'
        
      }
      else if(selected === 'completed'){
        return 'none'
        
      }
    }
  }

  render() {
    return (
      <section className="mvctodo">
        <header id="mainHeader">
          <h1>todos</h1>
          <label id="selectAll"></label>
          <input id="add" className="add" type="text" placeholder="What needs to be done?" value={this.state.text} onChange={this.handleOnChange} onKeyDown={(e) => this.handleKeyPress(e)} autoFocus />
        </header>
        <section>
          <List
            lineList={this.state.lines}
            removeLine={this.handleRemoveLine}
            checkLine={this.handleLineCheck} />
        </section>
        <footer className="mvcFooter" id="mvcFooter" style={this.showHideFooter()}>
          <label id="divLabel"> {this.updateItemCount()} </label>
          <ul className="selectFilter">
            <li>
              <a href="#/all" style={{borderColor: this.showHighlight('all')}} className="allSelected" onClick={(e) => this.showView('all')}>All</a>
            </li>
            <li>
              <a href="#/active" style={{borderColor: this.showHighlight('active')}} className="allActive" onClick={(e) =>this.showView('active')}>Active</a>
            </li>
            <li>
              <a href="#/completed" style={{borderColor: this.showHighlight('completed')}} className="allCompleted" onClick={(e) =>this.showView('completed')}>Completed</a>
            </li>
            <li className="clearAllCompleteLi" id="clearAllCompleteLi">
              <button className="clearAllComplete" id="clearAllComplete" style={this.showHideClearButton()}>Clear completed</button>
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