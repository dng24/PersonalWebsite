//Shows the pop up box with the information for each piece
function showModal(modalName) {
  //cannot set video height while display is none bc the width is "60%", so
  //not a real number yet that can be multiplied and divided
  document.getElementById(modalName).style.display = "inline-block";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

//Hides the pop up box with the information for each piece and stops any videos that areplaying
function hideModal(modalName){
  document.getElementById(modalName).style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "scroll";
}

var numRecon = 0;
var visited = [];
var currentModal = "";

function performRecon(modalName) {
  // TODO: perform recon and inc
  currentModal = modalName;
  if (!visited.includes(modalName)) {
    numRecon++;
    visited.push(modalName);
  }
  hideModal(modalName);
  if (numRecon == 8) {
    var imgs = ["bank", "corporation", "pipeline", "waterplant", "electricgrid", "hospital", "isp", "nuclearplant"];
    imgs.forEach(function (img) {
      document.getElementById(img + "Icon").onclick = function() {showModal(img + "AttackModal");};
    });
    //turn gui into attack interface
  }
  if (modalName.includes("hospitalRecon")) {
    setTimeout(() => {
      openFullscreen();
    }, 4500);
  }
  showSpinner(modalName);
}

function performAttack(modalName) {
  currentModal = modalName;
  hideModal(modalName);
  showSpinner(modalName);
}

function showSpinner(modalName) {
  console.log(modalName);
  if (modalName.includes("Attack")) {
    document.getElementById('loadingModalP').innerHTML = "Attacking..."
  }
  showModal("loadingModal");
  var spinnerObj = document.getElementById('spinner');
  spinnerObj.style.display = "block";
  document.getElementById('loadingModalButton').style.display = "none";
  spinnerObj.innerHTML = ". . . . . .";
  var numIterations = modalName.includes("hospitalRecon") ? 10 : Math.floor(Math.random() * 6) + 4;
  var i = 0;
  var spinner = setInterval(function() {
    if (i % 2 == 1) {
      spinnerObj.innerHTML = ". . . . . .";
    } else {
      spinnerObj.innerHTML = "&nbsp;. . . . . .";
    }
    i++;
    if (i >= numIterations) {
      clearInterval(spinner);
      spinnerObj.style.display = "none";
      if (modalName.includes("Recon")) {
        var imgId = modalName.slice(0, -10);
        document.getElementById(imgId + "Img").src = imgId + "_bugged.svg";
      } else if (modalName.includes("Attack")) {
        var imgId = modalName.slice(0, -11);
        document.getElementById(imgId + "Img").src = imgId + "_green.svg";
      }
      document.getElementById('loadingModalButton').style.display = "block";
      if (modalName.includes("hospitalRecon")) {
        hideModal("loadingModal");
        //openFullscreen();
      }
    }
  }, 500);
}

function closeLoadingModal() {
  hideModal('loadingModal');
  if (currentModal.includes("Attack")) {
    showModal(currentModal.slice(0, -11) + "SuccessModal");
  }
}

var x = null;

function openFullscreen() {
  elem = document.getElementById('rware');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

  document.getElementById('priceRaiseTimeLeft').innerHTML = "7d 0h 0m 0s";
  document.getElementById('timeLeft').innerHTML = "7d 0h 0m 0s";

  elem.style.display = "block";

  // countdown from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown
  // Set the date we're counting down to
  var currentDate = new Date();
  var priceRaiseDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),
    currentDate.getDate() + 3, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds() + 1);
  document.getElementById('priceRaiseDate').innerHTML = priceRaiseDate.toLocaleString('en-US');
  var priceRaiseTime = priceRaiseDate.getTime();

  var countDownDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),
    currentDate.getDate() + 7, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds() + 1);
  document.getElementById('expireDate').innerHTML = countDownDate.toLocaleString('en-US');
  var countDownTime = countDownDate.getTime();

  // Update the count down every 1 second
  x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = priceRaiseTime - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("priceRaiseTimeLeft").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("priceRaiseTimeLeft").innerHTML = "EXPIRED";
    }

    var distance = countDownTime - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timeLeft").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timeLeft").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function exitFullScreen() {
  var rware = document.getElementById('rware');
  rware.style.display = "none";
  clearInterval(x);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
