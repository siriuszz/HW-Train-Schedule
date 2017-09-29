
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWluCBtoUSTZ1pZT47oqCw03RsswejZwQ",
    authDomain: "hw-train-schedule.firebaseapp.com",
    databaseURL: "https://hw-train-schedule.firebaseio.com",
    projectId: "hw-train-schedule",
    storageBucket: "",
    messagingSenderId: "424475851089"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var frequency = 0;
var firstTime = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var remainder = "";
var minAway = 0;
var nextArrival = "";
var arrivalTime = "";

// On click of the Submit button for a new train
$("#add-train").on("click", function(event) {
    event.preventDefault();

    // Collect values from text boxes
    name = $("#input-name").val().trim();
    destination = $("#input-dest").val().trim();
    firstTime = $("#input-first").val().trim();
    frequency = $("#input-freq").val().trim();

    // Push values to the db
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader
database.ref().on("child_added", function(childSnapshot) {

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// Firebase watcher + initial loader + order/limit
database.ref().orderByChild("dateAdded").limitToLast(3).on("child_added", function(snapshot) {

    // Calculations
    firstTimeConverted = moment(snapshot.val().firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFF IN TIME: " + diffTime);

    remainder = diffTime % snapshot.val().frequency;
    console.log(remainder);

    minAway = snapshot.val().frequency - remainder;
    console.log("MIN UNTIL: " + minAway);

    nextArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    arrivalTime = nextArrival.format("hh:mm A");

    // Change the table to reflect train data
    $("#train-info").append("<tr><td>" + snapshot.val().name +
        "</td><td>" + snapshot.val().destination +
        "</td><td>" + snapshot.val().frequency +
        "</td><td>" + arrivalTime +
        "</td><td>" + minAway + "</td>");



   // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
