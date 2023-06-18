$(document).ready(function () {
  // localStorage.clear();

  // Create a new div element to hold the toast notification
  var toast = $("<div>");

  // Add classes to the toast element
  toast.addClass("toast");
  toast.addClass("auto-save");

  // Set the text of the toast element
  toast.text("Your tasks are auto-saved");

  // Add the toast element to the page
  $("body").append(toast);

  // Fade in the toast element
  toast.fadeIn(200);

  // Wait 3 seconds and then fade out the toast element
  setTimeout(function () {
    toast.fadeOut(500, function () {
      $(this).remove(); // Remove the toast element from the page
    });
  }, 3000);

  // retrieve tasks from local storage
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // render tasks from local storage
  $.each(tasks, function (index, value) {
    var checked = value.checked ? "checked" : "";
    $(".task-list").append(
      "<li class='" +
        checked +
        "' data-id='" +
        index +
        "'>" +
        value.text +
        '<i class="fas fa-check"> </i> <i class="fas fa-trash"></i> </li>'
    );
  });

  $("#input").change(function () {
    var input = $(this).val();
    $(".task-list").append(
      "<li data-id='" +
        tasks.length +
        "'>" +
        input +
        '<i class="fas fa-check"> </i> <i class="fas fa-trash"></i> </li>'
    );
    $(this).val("");

    // add task to local storage
    tasks.push({
      text: input,
      checked: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  $(".task-list").on("click", ".fa-trash", function () {
    var taskId = $(this).parent("li").data("id");
    $(this)
      .parent("li")
      .fadeOut(200, function () {
        // remove task from local storage
        tasks.splice(taskId, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
  });

  $(".task-list").on("click", ".fa-check", function () {
    var taskId = $(this).parent("li").data("id");
    $(this).parent("li").toggleClass("checked");

    // update task in local storage
    var checked = $(this).parent("li").hasClass("checked");
    tasks[taskId].checked = checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
});
