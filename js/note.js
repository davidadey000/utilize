// get notes from local storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// display notes on page load
displayNotes();

// add event listener for "Add Note" button
$("#add-note-btn").on("click", function () {
  // create note-writing section and append it to the notepad div
  let noteWritingSection = `
            <div id="note-writing" class="sticky__new-note">
              <div class="sticky__header">
                <h3>New Note</h3>
                <div>
                  <button id="back-btn" class="sticky__add-note"><i class="fas fa-save"></i></button>
                  <button id="cancel-note-btn" class="sticky__add-note"><i class="fas fa-times"></i></button>
                </div>
              </div>
              <textarea id="note-text" class="sticky__note-text"></textarea>
            </div>
          `;
  $("#notepad").append(noteWritingSection);

  // hide note-list and show note-writing section
  $("#note-list").hide();
  // $("#note-writing").show();
});

// add event listener for "Back" button
$("#notepad").on("click", "#back-btn", function () {
  let noteText = $("#note-text").val();
  if (noteText !== "") {
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    $("#note-text").val("");
    displayNotes();
  }
  $("#note-list").show();
  $("#note-writing").remove();
});

// add event listener for "Cancel" button
$("#notepad").on("click", "#cancel-note-btn", function () {
  $("#note-text").val("");
  $("#note-list").show();
  $("#note-writing").hide();
  // remove note-writing section from notepad div
  $("#note-writing").remove();
});

// add event listener for "Save Note" button
$("#notepad").on("click", "#save-note-btn", function () {
  let noteText = $("#note-text").val();
  if (noteText !== "") {
    let noteIndex = $(this).data("note-index");
    if (noteIndex !== undefined) {
      // if noteIndex is defined, this is an edited note
      notes[noteIndex] = noteText;
    } else {
      // otherwise, this is a new note
      notes.push(noteText);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    $("#note-text").val("");
    displayNotes();
    $("#note-list").show();
    $("#note-writing").hide();
    // remove note-writing section from notepad div
    $("#note-writing").remove();
  }
});

// add event listener for note list item
$("#note-list ul").on("click", "li", function () {
  let noteIndex = $(this).index();
  $("#note-text").val(notes[noteIndex]);
  // create note-writing section and append it to the notepad div
  let noteWritingSection = `
            <div id="note-writing" class="sticky__edit-note">
              <div class="sticky__header">
                <h3>Edit Note</h3>
                <div class="sticky__header-btns">
                  <button id="save-note-btn" class="sticky__add-note" data-note-index="${noteIndex}"><i class="fas fa-save"></i></button>
                  <button id="cancel-note-btn" class="sticky__add-note"><i class="fas fa-times"></i></button>
                </div>
              </div>
              <textarea class="sticky__note-text" id="note-text">${notes[noteIndex]}</textarea>
        
            </div>
          `;
  $("#notepad").append(noteWritingSection);
  // hide note-list and show note-writing section
  $("#note-list").hide();
  $("#note-writing").show();
});

function displayNotes() {
  let noteList = $("#note-list ul");
  noteList.empty();
  for (let i = 0; i < notes.length; i++) {
    let noteText = notes[i];
    let noteItem = $('<li class="sticky__note-item">').text(noteText);
    let deleteButton = $(
      '<button class="sticky__delete-note-btn"><i class="fas fa-trash"></i></button>'
    );
    deleteButton.click(function () {
      let noteIndex = $(this).parent().index();
      // to remove the note
      notes.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    });
    noteItem.append(deleteButton);
    noteList.append(noteItem);
  }
}
