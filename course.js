/* This is the course.js file for the javascript functions for my course page. */

/*
This function is called whenever the user types in the search bar.
It retrieves the value of the search bar and filters the courses displayed
in the grid based on whether their title contains the search query or not.
*/
function search() {
  var input, filter, grid, course, title, i, txtValue;

  // Get the input element and the filter value
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();

  // Get the grid and all the course elements
  grid = document.getElementById("myGrid");
  course = grid.getElementsByClassName("course");
  // Loop through each course element and check if its title matches the filter value
  for (i = 0; i < course.length; i++) {
    title = course[i].getElementsByClassName("course-title")[0];
    txtValue = title.textContent || title.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      course[i].style.display = "";
    } else {
      course[i].style.display = "none";
    }
  }
}

/*
This function is called whenever the user clicks on the Filter button.
It retrieves the selected option from the filter dropdown and filters 
the courses displayed in the grid based on the level of the course 
and whether the course title contains the search query or not.
*/
function filter() {
  // Get the filter option value, the grid, and all the course elements
  var select = document.getElementById("filterLevel");
  var selectedOption = select.options[select.selectedIndex].value;
  var grid = document.getElementById("myGrid");
  var courses = grid.querySelectorAll(".course");

  // Loop through each course element and check if it matches the filter criteria
  for (var i = 0; i < courses.length; i++) {
    var level = courses[i].querySelector(".course-level").textContent;
    var title = courses[i].querySelector(".course-title").textContent;
    var searchString = document.getElementById("searchBar").value.toLowerCase();
    if ((selectedOption === "" || selectedOption === level) && title.toLowerCase().indexOf(searchString) !== -1) {
      courses[i].style.display = "";
    } else {
      courses[i].style.display = "none";
    }
  }
}

/* 
This function is called whenever the user clicks on the Sort by level button.
It retrieves all courses displayed in the grid, sorts them by level in ascending 
or descending order, and displays them back in the grid with the sorted order.
*/
function sortTable() {
  // Get the grid and all the course elements
  var grid = document.getElementById("myGrid");
  var courses = Array.from(grid.querySelectorAll(".course"));
  // Check the current sort order and sort the courses accordingly
  var isAscending = grid.getAttribute("data-sort-order") === "asc";
  
  if (isAscending) {
    courses.sort(function(a, b) {
      return a.querySelector(".course-level").textContent - b.querySelector(".course-level").textContent;
    });
    grid.setAttribute("data-sort-order", "desc");
  } else {
    courses.sort(function(a, b) {
      return b.querySelector(".course-level").textContent - a.querySelector(".course-level").textContent;
    });
    grid.setAttribute("data-sort-order", "asc");
  }
  
  // Re-append the sorted course elements to the grid
  for (var i = 0; i < courses.length; i++) {
    grid.appendChild(courses[i]);
  }
}