
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
var frequency = "";
var firstTime = "";

// -------------var dateFormat = "MM/DD/YYYY";
// -------------var convertedDate = moment(startDate, dateFormat);

// Capture Button Click
$("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#input-name").val().trim();
    role = $("#input-dest").val().trim();
    startDate = $("#input-first").val().trim();
    rate = $("#input-freq").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTime);

// full list of items to the well
    $("#train-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        " </span><span id='list-role'> " + childSnapshot.val().role +
        " </span><span id='list-dest'> " + childSnapshot.val().date +
        " </span><span id='list-freq'> " + childSnapshot.val().rate + " </span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild(dateAdded).limitToLast(3).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().firstTime);

    console.log(moment().diff(frequency, "minutes"));


    // Change the HTML to reflect
    $("#list-name").append("<div>" + snapshot.val().name + "</div>");
    $("#list-dest").append("<div>" + snapshot.val().role + "</div>");
    $("#list-freq").append("<div>" + snapshot.val().startDate + "</div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
