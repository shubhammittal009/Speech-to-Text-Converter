var r = document.getElementById("result");

function startConverting() {
  if ("windowSpeechRecognition" in window) {
    var speechRecognizer = webkitSpeechRecognition();
    speechRecognizer.continous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = "en-IN";
    speechRecognizer.start();

    var finalTransscripts = "";

    speechRecognizer.onresult = function(event) {
      var interimTranscripts = "";
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if (event.results[i].isFinal) {
          finalTransscripts += transcript;
        } else {
          interimTranscripts += transcript;
        }
      }
      r.innerHTML =
        finalTransscripts +
        '<span style="color:#999"' +
        interimTranscripts +
        "</span>";
    };
    speechRecognizer.onerror = function(event) {};
  } else {
    r.innerHTML =
      "Your browser is not supported, Get latest version of Google Chrome";
  }
}
