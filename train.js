// Initialize Firebase
var config = {
    apiKey: "AIzaSyBskQjuCoRzJnJz-3Ebq2Ld2Kf3WsGN8r8",
    authDomain: "trains-b7b6c.firebaseapp.com",
    databaseURL: "https://trains-b7b6c.firebaseio.com",
    projectId: "trains-b7b6c",
    storageBucket: "trains-b7b6c.appspot.com",
    messagingSenderId: "143343390521"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

let minutesTill = function(currentTime, firstTrain, frequency){  
    let differenceFromFirstTrain = parseInt(currentTime.diff(firstTrain, 'minutes'));
    let remainder = differenceFromFirstTrain % frequency;
    let  nextTrain = frequency-remainder;
    console.log(nextTrain);
   }
   minutesTill(moment('2013-02-08 03:16 '),moment('2013-02-08 03:00'), 7);
   let train ={
       today : moment(),
       trainName : "",
       trainDestination: "",
        firstTrainTime : moment().startOf('day'),
       trainFrequency: 10,
       nextTrain: minutesTill(moment(),this.firstTrainTime, this.frequency),
   }
   console.log(train.nextTrain)
   database.ref().push({
    today: train.today,
    trainName: train.trainName,
    trainDestination: train.trainDestination,
    firstTrainTime: train.firstTrainTime,
    nextTrain: train.nextTrain,
   })
   //change firstTrainTime by adding form attributes
   $("button").on("click", function(){
    console.log('buttonTest')
    train.trainName = $('trainName');
    train.trainDestination = $("firstTrain");
    train.firstTrainTime = $('destination');
    train.nextTrain = $("frequency");
    database.ref().push({
        today: train.today,
        trainName: train.trainName,
        trainDestination: train.trainDestination,
        firstTrainTime: train.firstTrainTime,
        nextTrain: train.nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
       })
   })
   database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDestination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().nextTrain);
   })