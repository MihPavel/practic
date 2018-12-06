import React, {Component} from 'react'

const styleSelect = {
  background: "white",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};
const styleDefault = { 
  border: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};

export default class ToggleOpen extends Component{
  state = {
    isSelect: false
  }
  
  componentWillReceiveProps = (props) => {
    
    this.setState({
      isSelect: props.defaultSelect
    });
  }
  toggleSelect = () => {
    this.setState({
      isSelect: !this.state.isSelect
    });
  }
  cons(){
    console.log("toggleSelect");
  }
  render(){
    this.cons();
    let style = this.state.isSelect ? styleSelect : styleDefault;
    return(
      <span style = {style} onClick = {this.toggleSelect}>
        {this.props.children}
      </span>
    )
  }
}