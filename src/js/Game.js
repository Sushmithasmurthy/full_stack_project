import React, { Component } from 'react';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.min.css';
import '../css/game_play_nine.css';
import 'bootstrap-css-only/css/bootstrap.css';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};
const Stars = (props) =>{
//
	return(
  	<div className="col-5">
    {_.range(props.noOfStars).map( (x,i) => <i  key={i} className="fa fa-star" 	/>)}
    </div>
  );
};

const Button = (props) =>{
	let button;
  switch(props.answerIsCorrect){
    case true:
      button= <button  disabled={props.slctdNumbers.length === 0}
       className="btn btn-success" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i></button>;
      break;

    case false:
      button= <button  disabled={props.slctdNumbers.length === 0}
     className="btn btn-danger">i
      <i className="fa fa-times"></i></button>;
      break;

    default:
    button= <button  disabled={props.slctdNumbers.length === 0}
      onClick={props.checkAnswer} className="btn btn-info">=</button>;
      break;
  }


	return(
  	<div className="col-2 text-center">
   	{button}
    <br />
    <br />
     <button className="btn btn-warning btn-sm" onClick={props.refreshData}  disabled={props.retryCount===0} >
       <i className="fa fa-sync">{props.retryCount}</i>
     </button>
    </div>
  );
};

const Answer = (props)=>{
	return(
  	<div className="col-5">
    	{props.slctdNumbers.map(
      (number,i) => <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span> )}
    </div>
  );
};

const Number = (props) =>{

  const numberClassName =(number) =>{
  		if(props.usedNumbers.indexOf(number) >=0){
    	return 'used';
    }
  	if(props.slctdNumbers.indexOf(number) >=0){
    	return 'selected';
    }
  }

  return(
  	<div className="card text-center">
    	<div>
        {Number.list.map( (number,i) =>
        <span key={i} className={numberClassName(number)}
        			onClick={()=>props.currentSelectedNumber(number)}>{number}</span>)}
      </div>
    </div>
  );
};
Number.list = _.range(1,10);

const DoneFrame = (props)=>{
return(
	<div className="card text-center">
  	<h2>{props.doneStatus}</h2>
    <button className="btn btn-primary" onClick={props.resetGame}> Play Again </button>
  </div>
  );
};

class Game extends React.Component{
    static randomNumber = () => 1 + Math.floor(Math.random() *9);
    static initialState = () => ({
  	selectedNumbers:[],
    noOfStars: Game.randomNumber(),
    answerIsCorrect:null,
    usedNumbers:[],
    retryCount:5,
    doneStatus:null
    });
    state = Game.initialState();

    constructor(props){
        super(props);
        this.state= {
                      	selectedNumbers:[],
                        noOfStars: Game.randomNumber(),
                        answerIsCorrect:null,
                        usedNumbers:[],
                        retryCount:5,
                        doneStatus:null
                        };
    }

  resetGame = () => this.setState(Game.initialState());

  selectNumber = (clickedNumber) => {
  	if(!(this.state.selectedNumbers.indexOf(clickedNumber)>=0)){
      this.setState( (prevState) =>({
      			answerIsCorrect:null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    }
  };
  unSelectNumber = (clickedNumber)=>{
  	this.setState( (prevState) =>({
    		answerIsCorrect:null,
    		selectedNumbers: prevState.selectedNumbers
        .filter( num => num !=clickedNumber)
    }));
  };
	checkAnswer = ()=>{
  	this.setState( (prevState) => ({
    	 answerIsCorrect: prevState.noOfStars ===
       (prevState.selectedNumbers.reduce((acc,n) => acc+n ,0))
    }));
 };
  acceptAnswer = () =>{
  	this.setState( (prevState)=> ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers:[],
      noOfStars: Game.randomNumber(),
    	answerIsCorrect:null
    }), this.updateDoneStatus
    );
  };
  refreshData =() =>{

      this.setState((prevState) =>({
        selectedNumbers:[],
        noOfStars: Game.randomNumber(),
        answerIsCorrect:null,
        retryCount: prevState.retryCount-1
      }),
      this.updateDoneStatus);

  };
  possibleOutcomes = ({noOfStars,usedNumbers}) =>{
  	const posibleNumbers = _.range(1,10).filter( (x) => usedNumbers.indexOf(x) === -1);

    return possibleCombinationSum(posibleNumbers,noOfStars);
  };

  updateDoneStatus = () =>{

   return(
   this.setState(
   (prevState)=>{
   	 if( prevState.usedNumbers.length === 9 ){
    		return {doneStatus: "You Won.."};
      }
      if( prevState.retryCount === 0
      && !this.possibleOutcomes(prevState)
    	){

      	return {doneStatus: "Game Over"};
       }
    })
   );
  };

	render(){
  const {selectedNumbers,noOfStars,answerIsCorrect,usedNumbers,retryCount,doneStatus} = this.state;
  	return(
      <div className="container">
        <h5>Game - Play Nine</h5>
        <hr />
        <div className="row">
          <Stars noOfStars={noOfStars}/>
          <Button  slctdNumbers={selectedNumbers}
          	checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            refreshData={this.refreshData}
            retryCount= {retryCount}
            usedNumbers={usedNumbers}
            />
          <Answer slctdNumbers={selectedNumbers}
          	unSelectNumber={this.unSelectNumber}
            />
        </div>
        	<br />

            <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />
              <Number slctdNumbers={selectedNumbers}
          				currentSelectedNumber={this.selectNumber}
                  usedNumbers={usedNumbers}/>


      </div>
    );
  }
}


 export default Game;