import React, {Component} from 'react';
import ToggleSelect from './toggleSelect';
import ReactDOM from 'react-dom';
import Area from './area';

const styleSpace = {
  margin: "30px",
  height: "500px",
  width: "200px",
  padding: "20px",
  background: "skyblue"
}
class HoverSpace extends Component{
  constructor(props) {
    super(props);

    this.state = { 
      childrenComponents: React.Children.toArray(props.children),
      childrenData: [],
      spaceBound: {}
    };
    
  }
  componentDidMount = () => {
    const containerChildren = ReactDOM.findDOMNode(this._allChildrenRef);
    
    let childrenData = [].slice.call(containerChildren.children).map((el) => {
      return {
        childBound: el.getBoundingClientRect(),
        selected: false
      }
    });

    const hoverSpaceContainer = ReactDOM.findDOMNode(this._hoverSpaceRef);
    this.setState({ 
      spaceBound: hoverSpaceContainer.getBoundingClientRect(),
      childrenData: childrenData
    });
  }
  
  onSelectReset = (ev) => {
    let newChildrenData = this.state.childrenData.map((el) => {
      return {
        childBound: el.childBound,
        selected: false
      }
    });

    this.setState({ 
      childrenData: newChildrenData
    });

    ev.preventDefault();
  }

  onSelectMove = (startPoint, endPoint) => {
    let changeHappened = false;

    let {childrenData} = this.state;

    let newChildrenState = childrenData.slice();
    childrenData.forEach((childData, currentIndex) => {
      let childBound = childData.childBound;

      let enclosingSquareTop = Math.min(
        endPoint.y, startPoint.y, 
        childBound.top, childBound.bottom
      );
      let enclosingSquareBottom = Math.max(
        endPoint.y, startPoint.y,
        childBound.top, childBound.bottom
      );
      let enclosingSquareLeft = Math.min(
        endPoint.x, startPoint.x,
        childBound.left, childBound.right
      );
      let enclosingSquareRight = Math.max(
        endPoint.x, startPoint.x, 
        childBound.left, childBound.right
      );
      
      let heightSelectedArea = Math.abs(endPoint.y - startPoint.y);
      let widthSelectedArea = Math.abs(endPoint.x - startPoint.x);
      
      let heigthEnclosingSquare = enclosingSquareBottom - enclosingSquareTop;
      let widthEnclosingSquare = enclosingSquareRight - enclosingSquareLeft;
      
      if((heigthEnclosingSquare - heightSelectedArea - childBound.height) < 0 && (widthEnclosingSquare - widthSelectedArea - childBound.width) < 0){
        if(!childData.selected) {
          newChildrenState[currentIndex].selected = true;
          changeHappened = true;
        }
      } else {
        if(childData.selected) {
          changeHappened = true;
          newChildrenState[currentIndex].selected = false;
        }
      } 
    });

    if(changeHappened) {
      console.log("setstatemove");
      this.setState({
        childrenData: newChildrenState
       });
    }
  }

  cons(){
    console.log("hoverSpace");
  }
  render(){
    this.cons();
    let {childrenData, childrenComponents, spaceBound} = this.state;

    const childrenWithSelect = React.Children.map(childrenComponents, (child, index) => {
      let defaultSelect = !childrenData.length ? false : childrenData[index].selected;
      return <ToggleSelect defaultSelect = { defaultSelect }> { child } </ToggleSelect>
    });
    
    return(
        <div style = {styleSpace} onDoubleClick={this.onSelectReset} className="hoverSpace" ref = {(node) => {this._hoverSpaceRef = node}}>
          <div ref = {(node) => {this._allChildrenRef = node}}>
            {childrenWithSelect}
          </div>
          <Area spaceBound = {spaceBound} sendСoords = {this.onSelectMove}/>
        </div>
    );
  }
}
export default HoverSpace;