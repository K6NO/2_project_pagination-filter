/***
 * Pagination and content filter
 * Problem: site displays all users, only 10 should be displayed at once. No search functionality.
 * Solution: limit the number of students displayed at once to 10 and add pagination links below the list. Add search.
 */

// set variables
var totalNumberOfStudents = $('.student-item').length;
var allStudents = [];
//var searchedStudent = [];


//create No results message
var noStudentsMessage = $('<p class="no-result">No results for your search.</p>').insertAfter($('.student-list'));


// save all students to a list
$('.student-item').children('.student-details').each(function () {
    allStudents.push(this);
})


// hide all students, show the first ten

$('.student-item').hide().slice(0, 10).show();

// hide No Results message

noStudentsMessage.hide();


// create pagination links
var paginationContainer = $('<div class="pagination"><ul></ul></div>');
$('.page').append(paginationContainer);

for (var i=1; i<= Math.ceil(totalNumberOfStudents/10); i++) {
    $('.pagination ul').append($('<li><a href="#">' + i + '</a></li>'));
}

//set active class to first element by default
$('.pagination ul li a:first').addClass('active');

// add active class to clicked link
$('.pagination ul a').on('click', function() {
    $('li a').removeClass('active');
    $(this).addClass('active');
})

// show the students when pagination buttons are clicked

$('.pagination li').on('click', function() {
    $('.student-item').hide().slice(
        $(this).index() * 10,
        $(this).index() * 10 + 10)
        .show();
    noStudentsMessage.hide();
})

//add search functionality
var searchElement = $('<div class="student-search"><input value= "" placeholder="Search for students..."><button>Search</button></div>');
$('.page-header').append(searchElement);

// when search button is clicked...
$('.student-search button').on('click', function() {

    noStudentsMessage.hide();

    var searchedStudent = [];

    var searchTerm = $('.student-search input').val();
    console.log("searchTerm " + searchTerm);


    for (var i = 0; i < allStudents.length; i++) {
        var studentName = allStudents[i].innerText;
        //console.log(studentName);

        if (studentName.indexOf(searchTerm) !== -1) {

            console.log("Student found.");

            //hide all students
            $('.student-list li').css('display', 'none');

            // add students to the show list, display them
            searchedStudent.push(allStudents[i]);

            // clear input field
            $('.student-search input').val('');
        }
    }

    $(searchedStudent).parent().show();

    if (searchedStudent.length === 0) {
        //hide all students
        $('.student-list li').css('display', 'none');
        console.log("No results");
        $('.student-search input').val('');

        noStudentsMessage.show();
    }

    if (searchTerm === '') {
        $('.student-item').hide().slice(0, 10).show();
        noStudentsMessage.hide();

    }
})



