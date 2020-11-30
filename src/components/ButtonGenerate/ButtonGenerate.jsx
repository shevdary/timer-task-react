import React, { Component } from "react";
import { StyleButton } from "../../helperStyle/customStyles";
import { countTime } from "../../reducers/countTime";

class ButtonGenerate extends Component {

  onClick = () => {

  };
  render() {
    return (
      <div>
        <StyleButton onClick={this.onClick}>generate</StyleButton>
      </div>
    );
  }
}



export default ButtonGenerate;