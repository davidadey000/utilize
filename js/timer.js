var initialHours, initialMinutes, initialSeconds;
      var hours, minutes, seconds;
      var timer;
      var running = false;
      
      $("#hours").on("input", function () {
        let hours = parseInt($(this).val());
        if (isNaN(hours)) {
          hours = 0;
        }
        console.log(hours);
        $("#hours").val(hours > 23 ? 00 : hours);
        $("#hours-display").text(hours < 10 ? "0" + hours : hours > 23 ? 00 : hours);
      });
      
      $("#minutes").on("input", function () {
        let minutes = parseInt($(this).val());
        if (isNaN(minutes)) {
          minutes = 0;
        }
        $("#minutes").val((minutes = 0 || minutes > 59 ? 00 : minutes));
        $("#minutes-display").text(
          minutes < 10 ? "0" + minutes : minutes > 59 ? 00 : minutes
        );
      });
      
      $("#seconds").on("input", function () {
        let seconds = parseInt($(this).val());
        if (isNaN(seconds)) {
          seconds = 0;
        }
        $("#seconds").val((seconds = 0 || seconds > 59 ? 00 : seconds));
        $("#seconds-display").text(
          seconds < 10 ? "0" + seconds : seconds > 59 ? 00 : seconds
        );
      });
      
      $(document).ready(function () {
        var hoursInput = $("#hours");
        var minutesInput = $("#minutes");
        var secondsInput = $("#seconds");
        var hoursDisplay = $("#hours-display");
        var minutesDisplay = $("#minutes-display");
        var secondsDisplay = $("#seconds-display");
        var startButton = $("#start");
        var pauseButton = $("#pause");
        var resumeButton = $("#resume");
        var paused = false;
      
        function removePausePlayButtons() {
          pauseButton.hide();
          resumeButton.hide();
        }
      
        function showPauseButton() {
          pauseButton.show();
          resumeButton.hide();
        }
      
        function showResumeButton() {
          pauseButton.hide();
          resumeButton.show();
        }
      
        startButton.click(function () {
          if (!running && !paused) {
            initialHours = parseInt(hoursInput.val());
            initialMinutes = parseInt(minutesInput.val());
            initialSeconds = parseInt(secondsInput.val());
      
            if (initialHours + initialMinutes + initialSeconds == 0) {
              return;
            }
      
            hours = initialHours;
            minutes = initialMinutes;
            seconds = initialSeconds;
      
            timer = setInterval(function () {
              if (seconds == 0) {
                if (minutes == 0) {
                  if (hours == 0) {
                    clearInterval(timer);
                    running = false;
                    startButton.text("Start");
                    removePausePlayButtons();
                    return;
                  } else {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                  }
                } else {
                  minutes--;
                  seconds = 59;
                }
              } else {
                seconds--;
              }
      
              hoursDisplay.text(hours < 10 ? "0" + hours : hours);
              minutesDisplay.text(minutes < 10 ? "0" + minutes : minutes);
              secondsDisplay.text(seconds < 10 ? "0" + seconds : seconds);
      
              $("#hours-display").addClass("pulse");
              $("#minutes-display").addClass("pulse");
              $("#seconds-display").addClass("pulse");
            }, 1000);
            running = true;
            startButton.text("Stop");
            showPauseButton();
          } else if (paused || running) {
            clearInterval(timer);
            running = false;
            paused = false;
            startButton.text("Start");
            $("#hours-display").removeClass("pulse");
            $("#minutes-display").removeClass("pulse");
            $("#seconds-display").removeClass("pulse");
      
            $("#hours-display").text("00");
            $("#minutes-display").text("00");
            $("#seconds-display").text("00");
      
            removePausePlayButtons();
          }
        });
      
        pauseButton.click(function () {
          clearInterval(timer);
          running = false;
          paused = true;
          showResumeButton();
        });
      
        resumeButton.click(function () {
          if (!running) {
            timer = setInterval(function () {
              if (seconds == 0) {
                if (minutes == 0) {
                  if (hours == 0) {
                    clearInterval(timer);
                    running = false;
                    paused = false;
                    startButton.text("Start");
                    removePausePlayButtons();
                    return;
                  } else {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                  }
                } else {
                  minutes--;
                  seconds = 59;
                }
              } else {
                seconds--;
              }
      
              hoursDisplay.text(hours < 10 ? "0" + hours : hours);
              minutesDisplay.text(minutes < 10 ? "0" + minutes : minutes);
              secondsDisplay.text(seconds < 10 ? "0" + seconds : seconds);
      
              $("#hours-display").addClass("pulse");
              $("#minutes-display").addClass("pulse");
              $("#seconds-display").addClass("pulse");
            }, 1000);
      
            running = true;
            showPauseButton();
          }
        });
      });
     