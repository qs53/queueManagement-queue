var firebaseRef = firebase.database().ref();
let tokenData = {};
let tokenProperties = [];
let displayData = "";

firebaseRef.on("value", function (snapshot) {
    let counters = snapshot.toJSON().counters;
    let counterDetails = Object.keys(counters);
    let counterDetailsWithNumbers = [];

    counterDetails.forEach((counter) => {
        counterDetailsWithNumbers.push(Number(counter.slice(7, 9)))
    });
    counterDetailsWithNumbers.sort(sortNumber);
    counterDetails = [];
    counterDetailsWithNumbers.forEach((counterNum) => {
        counterDetails.push("counter" + counterNum);
    });

    document.querySelector("ul.tokensList").innerHTML = "";
    for (let i = 0; i < counterDetails.length; i++) {
        i % 2 === 0 ? displayData += "<div class='row'>" : displayData += "";
        if (counters[counterDetails[i]].token && snapshot.toJSON().tokens) {
            let tokenNo = counters[counterDetails[i]].token;
            let token = snapshot.toJSON().tokens[tokenNo];
            if (token && token.pending === true && token.accepted === false) {
                displayData += "<div class='col'>";
                displayData += "<li class='p-3 bg-warning text-white tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Calling Token <strong class='tokenNum blink'>" + counters[counterDetails[i]].token + "</strong></li>";
            } else if (token && token.pending === false && token.accepted === true) {
                displayData += "<div class='col'>";
                displayData += "<li class='p-3 bg-success text-white tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Attending To Token <strong class='tokenNum'>" + counters[counterDetails[i]].token + "</strong></li>";
            }
            displayData += "</div><br>";
        } else {
            displayData += "<div class='col'>";
            displayData += "<li class='p-3 bg-info text-white tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token Allocation Pending</li>";
            displayData += "</div><br>";
        }
        if ((counterDetails.length % 2 === 1) && (i === counterDetails.length - 1)) {
            displayData += "<div class='col'></div>"
        }
        i % 2 === 1 ? displayData += "</div>" : displayData += "";
    }

    document.querySelector("ul.tokensList").innerHTML = displayData;
    tokenData = {};
    tokenProperties = [];
    displayData = "";
});

function sortNumber(a, b) {
    return a - b;
}