import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Line(props){
  return (
    <li class='' id=''>
      <input type='checkbox' id='checkBox' onClick={props.onClick}/>
      <label for='checkBox' class='checkBoxLabel'/>
      <label class='listItemLabel' id='listLabel'>
        {props.value}
      </label>
      <button class='buttonItem' id='buttonItem'/>
    </li>
  )
}

class View extends React.Component{
  constructor(props){
    super(props);
    this.state={
      toDoList:[{
        lines: []
      }],
      count: 0,
      checked: false,
    };
  }
  renderLine(i) {
    return (
        <Line
            value={this.props.lines[i]}
            onClick={() => this.props.onClick(i)}
        />
    );
}
  render(){
    return true;
  }
}

class Todo extends React.Component{
  render(){
    return true;
  }
};

//==========================================
ReactDOM.render(
    <Todo />,
    document.getElementById('root')
  );