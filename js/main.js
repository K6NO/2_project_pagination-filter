/***
 * Project 02 - Pagination and content filter
 * Problem: site displays all users, only 10 should be displayed at once. No search functionality.
 * Solution: limit the number of students displayed at once to 10 and add pagination links below the list. Add search.
 */

//Selecting DOM elements
const pageDiv = document.getElementsByClassName('page')[0];
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
const paginationUL = document.createElement('ul');
paginationUL.className = 'pagination-list';
paginationDiv.appendChild(paginationUL);
pageDiv.appendChild(paginationDiv);

//List of student-item elements and setting up a list of indexes
const studentList = document.getElementsByClassName('student-item');
let indexOfStudensToDisplay = [];
for (let i = 0; i < studentList.length; i++) {
    indexOfStudensToDisplay.push(i);
}

/**
 * Creates pagination links. Active page is used by the event listener
 * @param numberOfStudentsToDisplay
 * @param activePage
 */
const createPaginationLI = function (numberOfStudentsToDisplay, activePage) {
    let numberOfLinks = Math.ceil(numberOfStudentsToDisplay / 10);
    if (numberOfLinks !== 1) {
        for (var i = 0; i < numberOfLinks; i++) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.setAttribute('href', '#');
            link.textContent = i + 1;

            //adding click listener to the links
            link.addEventListener('click', limitStudentsDisplay);
            if (i === activePage-1) {
                link.className = 'active';
            }
            li.appendChild(link);
            paginationUL.appendChild(li);
        }
    }
}

/**
 * Creates the search component
 */
var createSearchFunctionality = function (){
    var searchContainer = document.createElement('div');
    var searchField = document.createElement('input');
    var searchButton = document.createElement('button');

    searchField.type = 'text';
    searchField.placeholder = 'Search for students...';
    searchContainer.className = 'student-search';

    searchButton.innerText = 'Search';
    searchButton.addEventListener('click', limitStudentsToDisplayWithSearch);

    searchContainer.appendChild(searchField);
    searchContainer.appendChild(searchButton);

    // append element
    var studentsTitle = document.querySelector('.page-header h2');
    var parentDiv = studentsTitle.parentNode;

    parentDiv.insertBefore(searchContainer, studentsTitle);
}

/**
 * Creates the 'No result' message
 */
const createNoResultsMessage = function () {
    let message = document.createElement('p');
    message.className = 'no-results';
    message.innerText = "No results. Hit 'Reset' for new search!";
    document.querySelector('.student-list').appendChild(message);
}


/**
 * Event handler for the search component
 */
const limitStudentsToDisplayWithSearch = function () {
    //switches button text back to normal
    document.querySelector('button').innerText = 'Search';


    //removes pagination links
    let paginationUL = document.getElementsByClassName('pagination-list')[0];
    while (paginationUL.firstChild) {
        paginationUL.removeChild(paginationUL.firstChild);
    }

    let searchFieldValue = document.querySelector('input[type=text]').value.toLowerCase();

    //If the search field was empty clear indexOfStudensToDisplay, add all students and...
    if (searchFieldValue === '') {
        let activePage = 1;
        indexOfStudensToDisplay.splice(0, indexOfStudensToDisplay.length);
        for (let i = 0; i < studentList.length; i++) {
            indexOfStudensToDisplay.push(i);
        }

        //...display the first 10
        for (let i = 0; i < indexOfStudensToDisplay.length; i++) {
            let index = indexOfStudensToDisplay[i];
            if (i >= 0 && i < 10){
                studentList[index].style.display = '';
            } else {
                studentList[index].style.display = 'none';
            }
        }

        document.querySelector('input[type=text]').value = '';
        hideNoResultsMessage();

    // otherwise display students with matching name and set pagination accordingly
    } else {
        indexOfStudensToDisplay.splice(0, indexOfStudensToDisplay.length);
        for (let i = 0; i < studentList.length; i++) {
               studentList[i].style.display = 'none';
        }
        for (let i = 0; i < studentList.length; i++) {
            var h3 = studentList[i].getElementsByTagName('h3')[0];
            if (h3.innerHTML.indexOf(searchFieldValue) !== -1) {
                studentList[i].style.display = '';
                indexOfStudensToDisplay.push(i);
            }
        }
        document.querySelector('input[type=text]').value = '';
    }


    //display the first 10 students from the searched group
    for (let i = 0; i < indexOfStudensToDisplay.length; i++) {
        let index = indexOfStudensToDisplay[i];
        if (i >= 0 && i < 10){
            studentList[index].style.display = '';
        } else {
            studentList[index].style.display = 'none';
        }
    }
    //reset the No results message
    if (indexOfStudensToDisplay.length === 0) {
        showNoResultsMessage();
        document.querySelector('button').innerText = 'Reset';
    } else {
        hideNoResultsMessage();
    }

    // clear search field

    //recreate the right number of pagination links
    createPaginationLI(indexOfStudensToDisplay.length, 1);
}


/**
 * Event handler for pagination links
 */
const limitStudentsDisplay = function () {
    let activePage = this.innerText;

    //set active page
    let lis = document.getElementsByClassName('pagination-list')[0].children;
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].children[0].textContent === activePage) {
            lis[i].children[0].className = 'active';
        } else {
            lis[i].children[0].className = '';
        }
    }

    //hide all students
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }

    //limit the number of students to display
    for (let i = 0; i < indexOfStudensToDisplay.length; i++) {
        let index = indexOfStudensToDisplay[i];
        if (i >= (activePage-1) * 10 && i < activePage * 10){
            studentList[index].style.display = '';
        }
    }

    // hide no results message
    hideNoResultsMessage();
}

/**
 *  Displays 'No results' message
 */
const showNoResultsMessage = function () {
    let message = document.querySelector('.no-results');
    message.style.display = '';
}

/**
 * Hides 'No results' message
 */
const hideNoResultsMessage = function () {
    let message = document.querySelector('.no-results');
    message.style.display = 'none';
}


// Initial setup: show the first ten students, then create pagination, search component, message (and hide it)
for (let i = 0; i < studentList.length; i++) {
    if (i >= 0 && i < 10){
        studentList[i].style.display = '';
    } else {
        studentList[i].style.display = 'none';
    }
}
createPaginationLI(indexOfStudensToDisplay.length, 1);
createSearchFunctionality();
createNoResultsMessage();
hideNoResultsMessage();
