import React, {Component} from 'react';
import SimpleElement from './simpleElement';
import HoverSpace from './hoverSpace';
class testSpace extends Component{

  render(){
    return(
        <div>
          <HoverSpace>
            <SimpleElement/>
            <SimpleElement/>
            <SimpleElement/>
            <SimpleElement/>
            <SimpleElement/>
            <SimpleElement/>
            <SimpleElement/>
          </HoverSpace>
        </div>
    );
  }
}

export default testSpace;