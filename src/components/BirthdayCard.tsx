import React from "react";
import "./BirthdayCard.css";

const BirthdayCard: React.FC = () => {
  return (
    <div className="birthdayCard">
      <div className="cardFront">
        <h3 className="happy">ぺリーさんへ</h3>
        <div className="balloons">
          <div className="balloonOne" />
          <div className="balloonTwo" />
          <div className="balloonThree" />
          <div className="balloonFour" />
        </div>
      </div>
      <div className="cardInside">
        <p>Dear Perry,</p>
        <p className="message">
          I know it’s a bit late in the day, but I didn’t want it to pass without wishing you a very Happy Birthday 🎂
I really wanted to celebrate with you, even from afar — in my own little way.
I hope your day had moments that made you smile, and that the year ahead brings even more reasons to. 

        </p>
      </div>
    </div>
  );
};

export default BirthdayCard;
