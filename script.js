$(function () {
    var currentDate = dayjs().format("MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  
    for (var i = 9; i <= 17; i++) {
      var timeBlockId = "hour-" + i;
      var displayHour = i > 12 ? i - 12 + "PM" : i + "AM";
  
      var timeBlock = $("<div>").attr("id", timeBlockId).addClass("row time-block");
      var hour = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(displayHour);
      var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
      var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
      var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
      saveBtn.append(saveIcon);
  
      timeBlock.append(hour, textarea, saveBtn);
      $("#timeBlocks").append(timeBlock);
    }
  
    $(".saveBtn").on("click", function () {
      var timeBlockId = $(this).parent().attr("id");
      var userInput = $(this).siblings(".description").val();
      localStorage.setItem(timeBlockId, userInput);
    });
  
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var userInput = localStorage.getItem(timeBlockId);
      $(this).find(".description").val(userInput);
    });
  
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);
  
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  });
  