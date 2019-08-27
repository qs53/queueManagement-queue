var firebaseRef = firebase.database().ref();
let tokenData = {};
let tokenProperties = [];
let displayData = "";
let synth = window.speechSynthesis;
let voices = synth.getVoices();

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
        if (counters[counterDetails[i]].token && snapshot.toJSON().tokens) {
            let tokenNo = counters[counterDetails[i]].token;
            let token = snapshot.toJSON().tokens[tokenNo];
            if (token && token.pending === true && token.accepted === false) {
                displayData += "<li><ul class='p-3 bg-warning text-white'>";
                displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token <strong class='tokenNum blink'>" + counters[counterDetails[i]].prefix + counters[counterDetails[i]].token + "</strong></li>";
                // playVoice("Token number " + counters[counterDetails[i]].token + ", please proceed to " + counters[counterDetails[i]].name + " Counter " + counters[counterDetails[i]].number);
            } else if (token && token.pending === false && token.accepted === true) {
                displayData += "<li><ul class='p-3 bg-success text-white'>";
                displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token <strong class='tokenNum'>" + counters[counterDetails[i]].prefix + counters[counterDetails[i]].token + "</strong></li>";
            }
            displayData += "</ul></li><br>";
        } else {
            displayData += "<li><ul class='p-3 bg-danger text-white'>";
            displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token Allocation Pending</li>";
            displayData += "</ul></li><br>";
        }
    }

    document.querySelector("ul.tokensList").innerHTML = displayData;
    tokenData = {};
    tokenProperties = [];
    displayData = "";
});

function playVoice(textToSpeak) {
    populateVoices();
    if(speechSynthesis !== undefined){
        speechSynthesis.onvoiceschanged = populateVoices;
    }
    let toSpeak = new SpeechSynthesisUtterance(textToSpeak);
    toSpeak.voice = voices[0];
    window.speechSynthesis.speak(toSpeak);
}

function populateVoices(){
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
    });
}

function removeDuplicates(value, index, self) {
    return self.indexOf(value) === index;
}


function sortNumber(a, b) {
    return a - b;
}