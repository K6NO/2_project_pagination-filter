/***
 * Pagination and content filter
 * Problem: site displays all users, only 10 should be displayed at once. No search functionality.
 * Solution: limit the number of students displayed at once to 10 and add pagination links below the list. Add search.
 */


// Setting variables, selecting DOM elements
var activePage = 1; // set activePage to 1 as a default, when page loads first
var pageDiv = document.getElementsByClassName('page')[0]; // selecting the page-level parent element
var studentList = document.querySelectorAll('.student-item'); // list of all student entries
var totalNumberOfStudents = studentList.length;
var numberOfUsersInPool = totalNumberOfStudents;// all students in the list
//var totalNumberOfPages = Math.floor(totalNumberOfStudents / 10) + 1; // Total pages needed to display all students

console.log(studentList);

/*
    P A G I N A T I O N
 */

/**
 * Calculates first and last student to display based on activePage, sets the 'display' property of
 * studentList elements accordingly
 * @param activePage
 */

var setStudentsToDisplayOnPage = function (activePage) {
    let firstStudentToDisplay = (activePage-1)*10;
    let lastStudentToDisplay = activePage*10;

    for (var i = 0; i < studentList.length; i++ ) {
        if (i >= firstStudentToDisplay  && i < lastStudentToDisplay) {
            studentList[i].style.display = 'block';
        } else {
            studentList[i].style.display = 'none';
        }
    }
}

/**
 * Creates pagination links totalNumberOfPages times, sets attributes, appends new elements to the DOM
 * @param totalNumberOfPages
 * @param activePage
 */
var createPaginationLinks = function (numberOfUsersInPool, activePage){

    var totalNumberOfPages = Math.floor(numberOfUsersInPool / 10) + 1; // Nr of pages needed to display all students
    console.log(totalNumberOfPages);
    //selecting parent element, creating new elements
    var paginationContainer = document.createElement('div');
    var ul = document.createElement('ul');

    paginationContainer.className = 'pagination';

    //creating <li> and <a> elements
    for (var i = 1; i <= totalNumberOfPages; i++) {
        var listItem = document.createElement('li');
        var linkItem = document.createElement('a');
        linkItem.innerText = i;
        linkItem.setAttribute('href', '#');

        //adding click listener to the links
        linkItem.addEventListener('click', resetStudentsToDisplay);
        if (i === activePage) {
            linkItem.className = 'active';
        }
        listItem.appendChild(linkItem);
        ul.appendChild(listItem);
    }
    paginationContainer.appendChild(ul);
    pageDiv.appendChild(paginationContainer);
}

/**
 * Helper function to reset the 'active' class. Removes 'active' class from previous link, attaches to the clicked one.
 * @param activePage
 */
var resetActiveClassOfPaginationElements = function(activePage) {

    var oldActivePageLink = document.querySelector('a.active');
    oldActivePageLink.classList.remove('active');
    var newActivePageLink = document.querySelectorAll('.pagination ul li a')[activePage - 1];
    newActivePageLink.className = 'active';
}

/**
 *  Event handler triggered when pagination link is clicked. Resets students to display, resets active pagination link.
 */
var resetStudentsToDisplay = function (){
    activePage = this.innerText;
    var studentsToDisplay = [];
    console.log(Array.isArray(studentList));

    console.log(studentsToDisplay);

    setStudentsToDisplayOnPage(activePage);
    resetActiveClassOfPaginationElements(activePage);
    checkIfNoResultsPresentOnPage();
}


/*
    S E A R C H
*/

/**
 * Creates page elements for search component
 */
var createSearchFunctionality = function (){
    var searchContainer = document.createElement('div');
    var searchField = document.createElement('input');
    var searchButton = document.createElement('button');

    searchField.type = 'text';
    searchField.placeholder = 'Search for students...';
    searchContainer.className = 'student-search';

    searchButton.innerText = 'Search';
    searchButton.addEventListener('click', searchStudents);

    searchContainer.appendChild(searchField);
    searchContainer.appendChild(searchButton);

    // append element
    var studentsTitle = document.querySelector('.page-header h2');
    var parentDiv = studentsTitle.parentNode;

    parentDiv.insertBefore(searchContainer, studentsTitle);
}


/**
 * Event handler triggered when search button is clicked
 */
var searchStudents = function () {
    var searchFieldValue = document.querySelector('input[type=text]').value.toLowerCase();
    var studentsDisplayed = [];

    checkIfNoResultsPresentOnPage();

    // match searchFieldValue with students, set display accordingly
    if (searchFieldValue === '') {
        setStudentsToDisplayOnPage(1);
    } else {
        for (var i = 0; i < studentList.length; i++) {
            var h3 = studentList[i].getElementsByTagName('h3')[0];
            if (h3.innerHTML.indexOf(searchFieldValue) !== -1) {
                studentList[i].style.display = 'block';
                studentsDisplayed.push(studentList[i]);
            } else {
                studentList[i].style.display = 'none';
            }
        }
        // display 'No results'
        displayNoResults(studentsDisplayed, searchFieldValue);
    }
    console.log(numberOfUsersInPool);

    // deleting search term
    document.querySelector('input[type=text]').value = '';
}

/**
 *  Removes 'No results' message if already present on the page
 */
var checkIfNoResultsPresentOnPage = function() {
    if(document.querySelector('.no-results')) {
        document.querySelector('.no-results').parentNode.removeChild(document.querySelector('.no-results'));
    }
}

/**
 *  Displays 'No results' message
 */
var displayNoResults = function (studentsDisplayed, searchFieldValue) {
    if(studentsDisplayed.length < 1) {
        var message = document.createElement('p');
        message.className = 'no-results';
        message.innerText = "No results for '" + searchFieldValue + "'";
        document.querySelector('.student-list').appendChild(message);
    }
}


    setStudentsToDisplayOnPage(activePage);
    createPaginationLinks(numberOfUsersInPool, activePage);
    createSearchFunctionality();