var firebaseRef = firebase.database().ref();
let tokenData = {};
let tokenProperties = [];
let displayData = "";

firebaseRef.once("value", function (snapshot) {
    counters = snapshot.toJSON().counters;
    counterDetails = Object.keys(counters);
    for (let i = 0; i < counterDetails.length; i++) {
        displayData += "<li><ul class='p-3 " + (counters[counterDetails[i]].token ? "bg-success":"bg-danger") + " text-white'>";
        displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter " + counters[counterDetails[i]].number + " - Token " + (counters[counterDetails[i]].token ? counters[counterDetails[i]].token : "Pending")+ "</li>";
        displayData += "</ul></li><br>";
    }
    document.querySelector("ul.tokensList").innerHTML = displayData;
    tokenData = {};
    tokenProperties = [];
    displayData = "";
});

// firebaseRef.on('value', function (snapshot) {
//     if (snapshot.toJSON().tokens) {
//         document.querySelector("h3.noTokens").style.display = "none";
//         tokenData = snapshot.toJSON().tokens;
//         tokenProperties = Object.keys(tokenData);
//         for (var i = 0; i < tokenProperties.length; i++) {
//             displayData += "<li><ul class='p-3 " + (tokenData[tokenProperties[i]].pending ? 'bg-danger' : 'bg-success') + " text-white'>";
//             if (tokenData[tokenProperties[i]].pending) {
//                 displayData += "<li class='tokenStatus'>Token number <strong class='tokenNum'>" + tokenData[tokenProperties[i]].token + "</strong> pending.</li>"
//             } else {
//                 displayData += "<li class='tokenStatus'>Token number <strong class='tokenNum'>" + tokenData[tokenProperties[i]].token + "</strong> allocated. Please proceed to counter <strong class='counterNum'>" + tokenData[tokenProperties[i]].counter + "</strong>.</li>"
//             }
//             displayData += "</ul></li><br>";
//         }
//         document.querySelector("ul.tokensList").innerHTML = displayData;
//
//         tokenData = {};
//         tokenProperties = [];
//         displayData = "";
//     } else {
//         document.querySelector("ul.tokensList").innerHTML = null;
//         document.querySelector("h3.noTokens").style.display = "block";
//     }
// });
