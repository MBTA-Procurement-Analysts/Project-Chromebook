var request = require('request');
var apiKey = "7075fa8fcd15a2f950df1755f0850222";
var token = "efe8e903ccef36b80f277483bd76dfa30817ef232a93134db04b47efec4d6faa";
var jsonToBeParsed = {};

function getCards(arrayOfLists) {
    for (list in arrayOfLists) {
        console.log(arrayOfLists[list].name);
        var options = {
            method: 'GET',
            url: 'https://api.trello.com/1/lists/' + arrayOfLists[list].id + '/cards?key=' + apiKey + "&token=" + token
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            cards = JSON.parse(body);
            processCards(cards, arrayOfLists[list].name);
        });
    }
}

function getLists() {
    var options = {
        method: 'GET',
        url: 'https://api.trello.com/1/boards/0lDVWvKj/lists?key=' + apiKey + "&token=" + token
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        lists = JSON.parse(body);
        getCards(lists);
    });
}

function processCards(cards, listName) {
    console.log(listName);
    for (card in cards) {

    }
}

getLists();