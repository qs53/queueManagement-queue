var firebaseRef = firebase.database().ref();
let tokenData = {};
let tokenProperties = [];
let displayData = "";
let synth = window.speechSynthesis;
let voices = synth.getVoices();

firebaseRef.on("value", function (snapshot) {
    counters = snapshot.toJSON().counters;
    tokens = snapshot.toJSON().tokens;
    counterDetails = Object.keys(counters);
    document.querySelector("ul.tokensList").innerHTML = "";
    for (let i = 0; i < counterDetails.length; i++) {
        if (counters[counterDetails[i]].token && snapshot.toJSON().tokens) {
            tokenNo = counters[counterDetails[i]].token;
            token = snapshot.toJSON().tokens[tokenNo];
            if (token && token.pending === true && token.accepted === false) {
                displayData += "<li><ul class='p-3 bg-warning text-white'>";
                displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token <strong class='tokenNum blink'>" + counters[counterDetails[i]].token + "</strong></li>";
                playVoice("Token number " + counters[counterDetails[i]].token + ", please proceed to " + counters[counterDetails[i]].name + " Counter " + counters[counterDetails[i]].number);
            } else if (token && token.pending === false && token.accepted === true) {
                displayData += "<li><ul class='p-3 bg-success text-white'>";
                displayData += "<li class='tokenStatus'>" + counters[counterDetails[i]].name + " Counter <strong class='counterNum'>" + counters[counterDetails[i]].number + "</strong> - Token <strong class='tokenNum'>" + counters[counterDetails[i]].token + "</strong></li>";
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
