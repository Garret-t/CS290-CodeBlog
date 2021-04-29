/*
 * Add your JavaScript to this file to complete the assignment.  Don't forget
 * to add your name and @oregonstate email address below.
 *
 * Name: Garrett Scott
 * Email: scottga@oregonstate.edu
 */
//Event handler function to unhide modals by removing .hidden class
function unhideModals()
{
    modals = document.querySelectorAll('.hidden')

    for(var i=0; i < modals.length; i++)
    {
        modals[i].classList.remove('hidden')
    }

}
//Event handler function to hide modals by removing .hidden class
function hideModals()
{
    //Hide the models by adding 'hidden' class
    modal1 = document.getElementById('modal-backdrop')
    modal2 = document.getElementById('create-twit-modal')

    modal1.classList.add('hidden')
    modal2.classList.add('hidden')
    
    //Clear text fields
    twitText = document.getElementById('twit-text-input')
    twitAuthor = document.getElementById('twit-attribution-input')
    
    twitText.value=''
    twitAuthor.value=''
}

//Function to create all the HTML elements and add them to DOM
//There has to be an easier way....
function addTwitToDom(text, author)
{
    twitContainer = document.querySelector('.twit-container')
    
    //<article class="twit">
    var newArticle = document.createElement('article')
    newArticle.classList.add('twit')
    
    //<div class="twit-icon">
    var newIconDiv = document.createElement('div')
    newIconDiv.classList.add('twit-icon')

    //<i class="fa fa-bullhorn"></i>
    var newI = document.createElement('i')
    newI.classList.add('fa', 'fa-bullhorn')
    newIconDiv.appendChild(newI)

    //<div class="twit-content">
    var newContentDiv = document.createElement('div')
    newContentDiv.classList.add('twit-content')
    
    //<p class="twit-text">
    var newPContent = document.createElement('p')
    newPContent.classList.add('twit-text')
    var newPText = document.createTextNode(text)
    newPContent.appendChild(newPText)
    
    //<p class="twit-author">
    var newPAuthor = document.createElement('p')
    newPAuthor.classList.add('twit-author')
    var newPAuthorText = document.createTextNode(author)
    newPAuthor.appendChild(newPAuthorText)

    newContentDiv.appendChild(newPContent)
    newContentDiv.appendChild(newPAuthor)

    newArticle.appendChild(newIconDiv)
    newArticle.appendChild(newContentDiv)

    //Finally add the new Twit
    twitContainer.appendChild(newArticle)
}
//Event handler function to create new twits
function createTwit()
{
    twitText = document.getElementById('twit-text-input')
    twitAuthor = document.getElementById('twit-attribution-input')
    
    if(twitText.value === '' || twitAuthor.value === '')
    {
        alert('Twit is missing text or author!')
    }
    else
    {
        addTwitToDom(twitText.value, twitAuthor.value)
        hideModals()
    }
}
//Event handler function to search for twits
var tweetSearch = function()
{
    //Use closure to keep copy of all the twits
    allTwitsContainer = document.querySelector('.twit-container')
    allTwits = Array.from(allTwitsContainer.querySelectorAll('.twit'))

    return function()
    {        

        searchInput = document.getElementById('navbar-search-input').value.toLowerCase()

        twitContainer = document.querySelector('.twit-container')
        currTwits = twitContainer.querySelectorAll('.twit')
        //Remove current twits if not there
        for(var i = 0; i < currTwits.length; i++)
        {
            //Add new twits to array if not there.
            if(allTwits.indexOf(currTwits[i]) === -1)
            {
                allTwits.push(currTwits[i])
            }
            if(currTwits[i].textContent.toLowerCase().indexOf(searchInput) === -1)
            {
                twitContainer.removeChild(currTwits[i])
            }
        }
        //Check original twits, add if match
        for(var i = 0; i < allTwits.length; i++)
        {
            if(allTwits[i].textContent.toLowerCase().indexOf(searchInput) !== -1)
            {
                twitContainer.appendChild(allTwits[i])
            }
        }
    }
}

//Uses closure
var searchTwits = tweetSearch()

createButton = document.getElementById('create-twit-button')
createButton.addEventListener('click', unhideModals)

cancelButton = document.querySelector('.modal-close-button')
closeButton = document.querySelector('.modal-cancel-button')

cancelButton.addEventListener('click', hideModals)
closeButton.addEventListener('click', hideModals)

acceptButton = document.querySelector('.modal-accept-button')
acceptButton.addEventListener('click', createTwit)

searchButton = document.getElementById('navbar-search-button')
searchButton.addEventListener('click', searchTwits)

searchInput = document.getElementById('navbar-search-input')
searchInput.addEventListener('input', searchTwits)