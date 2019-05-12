class MatchPredictor{
  constructor(){

  }

  predict(callback){
    console.log("prediction!!");
    callback();
  }
}

module.exports {
  MatchPredictor: MatchPredictor;
}
