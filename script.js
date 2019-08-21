  var firebaseRef = firebase.database().ref();
  let tokenData = {};
  let tokenProperties = [];
  let displayData = "";

  firebaseRef.on('value', function(snapshot) {
    if (snapshot.val()) {
      document.querySelector("h3.noTokens").style.display = "none";
      tokenData = snapshot.toJSON().tokens;
      tokenProperties = Object.keys(tokenData);
      for (var i = 0; i < tokenProperties.length; i++) {
        displayData += "<li><ul class='p-3 " + (tokenData[tokenProperties[i]].pending ? 'bg-danger' : 'bg-success') + " text-white'>";
        if (tokenData[tokenProperties[i]].pending) {
          displayData += "<li class='tokenStatus'>Token number <strong class='tokenNum'>" + tokenData[tokenProperties[i]].token + "</strong> pending.</li>"
        } else {
          displayData += "<li class='tokenStatus'>Token number <strong class='tokenNum'>" + tokenData[tokenProperties[i]].token + "</strong> allocated. Please proceed to counter <strong class='counterNum'>" + tokenData[tokenProperties[i]].counter + "</strong>.</li>"
        }
        displayData += "</ul></li><br>";
      }
      document.querySelector("ul.tokensList").innerHTML = displayData;

      tokenData = {};
      tokenProperties = [];
      displayData = "";

    } else {
      document.querySelector("ul.tokensList").innerHTML = null;
      document.querySelector("h3.noTokens").style.display = "block";
    }
  });

  function deleteCompletedTokens(isPending, tokenToDelete) {
    if (isPending === false) {
      setTimeout(() => {
        firebase.database().ref("tokens/" + tokenToDelete).remove();
      }, 3000);
    }
  }
