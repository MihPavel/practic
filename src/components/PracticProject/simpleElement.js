import React, {Component} from 'react';
const style = {
  margin: "0px",
  display: "inline-block",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  marginTop: "20px"
}
class SimpleElement extends Component{
  cons(){
    console.log("simpleElement");
  }
  render(){
    this.cons();
    return(
      <p style={style}>Элемент</p>
    );
  }
}

export default SimpleElement;