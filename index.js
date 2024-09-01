 /*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// Import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// Parse the imported data
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the data
    for (let game of games) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // Add the class game-card to the list
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
        `;

        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Calculate the total number of individual contributions (backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// Update the contributionsCard element with the total number of contributions
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount of money pledged across all games
const totalAmountRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Update the raisedCard element with the total amount pledged, formatted with a dollar sign
raisedCard.innerHTML = `$${totalAmountRaised.toLocaleString()}`;

// Grab the number of games card
const gamesCard = document.getElementById("num-games");

// Display the total number of games
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
 */

// Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Step 1: Count the number of unfunded games using filter
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Step 2: Calculate the total amount of money raised across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Step 2: Construct a template string that includes the total money raised, number of games, and unfunded games
const totalGames = GAMES_JSON.length;
const fundedGames = totalGames - unfundedGamesCount;

const descriptionString = `A total of $${totalRaised.toLocaleString()} has been raised for ${fundedGames} ${
    fundedGames === 1 ? "game" : "games"
}. Currently, ${unfundedGamesCount} ${
    unfundedGamesCount === 1 ? "game remains" : "games remain"
} unfunded. We need your support to help fund more innovative games!`;

// Step 3: Create a new paragraph element containing the template string
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionString;

// Append the paragraph to the descriptionContainer
descriptionContainer.appendChild(descriptionElement);

/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Grab the containers for the top games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by pledged amount in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Debugging: Log sorted games to check
console.log('Sorted Games:', sortedGames);

// Use destructuring and the spread operator to grab the first and second games
const [topGame, secondTopGame] = sortedGames;

// Debugging: Log top games to check
console.log('Top Game:', topGame);
console.log('Second Top Game:', secondTopGame);

// Create a new element to hold the name of the top-funded game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.innerHTML = `${topGame.name} - $${topGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(topGameElement);

// Create a new element to hold the name of the second top-funded game, then append it to the correct element
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondTopGame.name} - $${secondTopGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);
