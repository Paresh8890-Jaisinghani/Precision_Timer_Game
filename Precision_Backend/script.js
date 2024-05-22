let startTime;
let timerInterval;
let start = 0;
var testResults = []; // Array to store differences for each main test
document.getElementById("stopButton").disabled = true;
document.getElementById('next').style.display = 'none';
// const audio1 = new Audio('sound1.mp3')


function startTimer() {
  // audio1.play();
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
  document.getElementById('results').innerHTML += `Test Result: ${difference.toFixed(3)}s<br>`;
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
    document.getElementById('next').innerHTML += 'Click here for next test';
     document.getElementById("startSound").muted = true;
     document.getElementById("stopSound").muted = true;

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