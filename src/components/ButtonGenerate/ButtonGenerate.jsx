import React, { Component } from "react";
import { StyleButton } from "../../helperStyle/customStyles";
import { countTime } from "../../reducers/countTime";

class ButtonGenerate extends Component {

  onClick = () => {
    localStorage.clear();
    let copy = [];
    let name = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      name += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let i = 0; i < 10; i++) {
      let time, timer;
      let rand = 600 + Math.random() * (2200 + 1 - 600);

      timer = countTime(rand);
      time = Math.floor(rand);

      copy.push({
        name: name,
        timeStart: timer.date,
        timeEnd: timer.timeEnd,
        timeSpend: timer.countTime
      });

    }
    localStorage.setItem("tasksdata",JSON.stringify(copy))
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