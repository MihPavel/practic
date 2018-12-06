import React, {Component} from 'react';

const styleSelectSpace = {
  position: "absolute",
  border: "1px solid green",
  background: "yellow",
  opacity: "0.5",
  left: "0px",
  top: "0px"
}

class Area extends Component{
  constructor(props) {
    super(props);

    document.body.addEventListener("mousemove" , this.onSelectMove);
    document.body.addEventListener("mousedown" , this.onSelectStart);
    document.body.addEventListener("mouseup" , this.onSelectEnd);
    
    this.state = {
      onSelect: false,
      startPoint: {},
      endPoint: {}
    };
  }
  
  onSelectStart = (ev) => {

    if(!ev.target.classList.contains("hoverSpace")) return;
    
    this.setState({
      onSelect: true,
      startPoint: {
        x: ev.pageX,
        y: ev.pageY
      }
    });
    ev.preventDefault();
  }
  onSelectMove = (ev) => {
    
    let {onSelect, startPoint} = this.state;
    if(!onSelect) return;
    
    let endPoint = { 
      x: ev.pageX, 
      y: ev.pageY 
    }
    this.props.sendСoords(startPoint, endPoint);
    this.setState({ endPoint });
    ev.preventDefault();
  }
  onSelectEnd = (ev) => {
    this.setState({
      onSelect: false,
      startPoint: {},
      endPoint: {}
    });
  }
  calculateStylesSelectSpace(){
    let parentSpace = this.props.spaceBound;

    let {endPoint, startPoint} = this.state;

    if(!this.state.onSelect) return styleSelectSpace;
    
    let left = Math.min(endPoint.x, startPoint.x);
    let top = Math.min(endPoint.y, startPoint.y);
    let width = Math.abs(endPoint.x - startPoint.x);
    let height = Math.abs(endPoint.y - startPoint.y);

    if(left < parentSpace.left){
      left = parentSpace.left;
      width -= parentSpace.left - endPoint.x;
    } 
    if(top < parentSpace.top){
      top = parentSpace.top;
      height -= parentSpace.top - endPoint.y;
    } 
    if(left + width > parentSpace.right){
      width -= endPoint.x - parentSpace.right;
    } 
    if(top + height > parentSpace.bottom){
      height -= endPoint.y - parentSpace.bottom;
    } 
    return Object.assign({}, styleSelectSpace, { left, top, height, width })
  }
  render(){
    let styles = this.calculateStylesSelectSpace(); 

    return <div style={styles}></div>
  }
}

export default Area;