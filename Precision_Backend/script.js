let startTime;
let timerInterval;
let start = 0;
var testResults = []; // Array to store differences for each main test
document.getElementById("stopButton").disabled = true;
document.getElementById('next').style.display = 'none';
const audio1 = new Audio('../Precision_Fronted/sound1.mp3')
const loginform  = document.getElementById("loginform");
const number = document.getElementById("otp");
const mainMenu = document.getElementById("main_Menu");
const sec = document.querySelector(".sec");


let otp

loginform.addEventListener("submit", async function(event){
  event.preventDefault();
  const temp = number.value;
  otp = temp.toString();
  console.log(otp);

  try {
      const response = await fetch('http://localhost:3004/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            PrecisionScore1 : 0,
            PrecisionScore2 : 0,
            PrecisionScore3 : 0,
            otpcode: otp
          })
      });

      if (response.status === 404) {
          alert("Wrong code Entered, Please try again.");
          location.reload();
          return;
      }

      sec.style.display = "none";
      mainMenu.style.display = "flex";
      alert("You are logged in successfully.");
  } catch (err) {
      console.error('Error logging in:', err.message);
      alert("An error occurred. Please try again.");
  }
});


async function getotpFromUser() {
  return otp;
}

async function final(){
  try {
    const otp = await getotpFromUser();
    const response = await fetch('http://localhost:3004/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PrecisionScore1 : parseFloat(testResults[0]) + "/" + "10sec",
            PrecisionScore2 : parseFloat(testResults[1]) + "/" + "10sec",
            PrecisionScore3 : parseFloat(testResults[2]) + "/" + "10sec",
            otpcode : otp
        })
    });
        console.log('Score saved successfully');
} catch (err) {
    console.error('Error saving score:', err.message);
}
}


function startTimer() {
  startTime = Date.now();
  document.getElementById('timer').style.display = 'block';
  timerInterval = setInterval(updateTimer, 100);
  document.getElementById("startButton").disabled = true;
  const visibleTime = 5; // Timer will be visible for 5 seconds
  setTimeout(() => {
    document.getElementById('timer').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById("stopButton").disabled = false;
  }, visibleTime * 1000);
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const seconds = (elapsedTime / 1000).toFixed(1);
  document.getElementById('timer').textContent = seconds + 's';
}

function stopTimer() {
  document.getElementById('startButton').style.display = 'initial';
  clearInterval(timerInterval);
  const targetTime = 10; // Change this to your desired target time in seconds
  const elapsedTime = Date.now() - startTime;
  const seconds = (elapsedTime / 1000).toFixed(3);
  const difference = (seconds - targetTime);
  testResults.push(difference.toFixed(3));
  if(difference.toFixed(3) < 0){
    document.getElementById('results').innerHTML += `Early : ${difference.toFixed(3)}s<br>`;
  }
  else{
    document.getElementById('results').innerHTML += `Late  : ${difference.toFixed(3)}s<br>`;
  }
  document.getElementById("startButton").disabled = false;
  document.getElementById("stopButton").disabled = true;
  start++;



  if(start == 3){
    // audio1.pause();
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = true;
    var avg = (parseFloat(testResults[0])+parseFloat(testResults[1])+parseFloat(testResults[2]))/3;
    // document.getElementById('results').innerHTML += `<br>Test Result Average: ${avg.toFixed(3)}s</br>`;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'none';
    document.getElementById('next').style.display = 'block';
    document.getElementById('time').innerHTML = '"Hey Great, you have completed the test"'
    document.getElementById('next').innerHTML += 'Next';
    document.getElementById("startSound").muted = true;
    document.getElementById("stopSound").muted = true;
    final();
  }
}



window.onload = function() {
  const visibleTime = 5; // Timer will be visible for 5 seconds
  document.getElementById('timer').textContent = visibleTime + 's';
  if(start){
    setTimeout(() => {
      document.getElementById('timer').style.display = 'none';
    }, visibleTime * 1000);
  }
};