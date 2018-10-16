var request = require('request');
var fs = require('fs');
var apiKey = "7075fa8fcd15a2f950df1755f0850222";
var token = "efe8e903ccef36b80f277483bd76dfa30817ef232a93134db04b47efec4d6faa";
var jsonToBeParsed = {};
var masterList = [];
var memberList = [];
var foundList = [];
var foundIDs = [];
var listOfColumnNames = [];

function setUpCardGet(arrayOfLists) {
    for (list in arrayOfLists) {
        listOfColumnNames.push(arrayOfLists[list].name);
        var name = arrayOfLists[list].name;
        var options = {
            method: 'GET',
            url: 'https://api.trello.com/1/lists/' + arrayOfLists[list].id + '/cards?key=' + apiKey + "&token=" + token
        };
        getCards(options, name);
    }
}

function getCards(options, name) {
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        cards = JSON.parse(body);
        processCards(cards, name);
    });
}

function getLists() {
    var options = {
        method: 'GET',
        url: 'https://api.trello.com/1/boards/0lDVWvKj/lists?key=' + apiKey + "&token=" + token
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        lists = JSON.parse(body);
        setUpCardGet(lists);
    });
}

function processCards(cards, listName) {
    for (card in cards) {
        try {
            var color = cards[card].labels[0].color;
        } catch (e) {
            var color = "";
        }
        for (mem in cards[card].idMembers) {
            if (memberList.indexOf(cards[card].idMembers[mem]) < 0) {
                memberList.push(cards[card].idMembers[mem]);
            }
        }
        masterList.push({
            "Status": cards[card].closed,
            "List": listName,
            "Member_IDs": cards[card].idMembers,
            "Name": cards[card].name,
            "Description": cards[card].desc,
            "Date_Last_Active": cards[card].dateLastActivity,
            "Color": color
        });
    }
    fs.writeFileSync('trello.json', JSON.stringify(masterList));
    updateMembers();
}

function updateMembers() {
    for (mid in memberList) {
        var mem_id = memberList[mid];
        if (foundIDs.indexOf(mem_id) < 0) {
            getMemberName(mem_id);
        }
    }
    setTimeout(function () {
        var dedupedList = dedup(foundList);
        fs.writeFileSync('members.json', JSON.stringify(dedupedList))
    }, 500);
}

function dedup(listOfMembers) {
    var newArray = [];
    var used = [];
    for (mem in listOfMembers) {
        if (used.indexOf(listOfMembers[mem].ID.toString()) < 0) {
            newArray.push(listOfMembers[mem]);
            used.push(listOfMembers[mem].ID.toString());
        }
    }
    return newArray;
}

function getMemberName(mem_id) {
    var options = {
        method: 'GET',
        url: 'https://api.trello.com/1/members/' + mem_id + '/username?key=' + apiKey + "&token=" + token
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        foundList.push({
            "ID": mem_id,
            "Name": JSON.parse(body)._value
        });
        foundIDs.push(mem_id);
    });
}

function formatBySE() {
    var aliases = JSON.parse(fs.readFileSync("members.json", "utf-8"));
    //console.log(aliases);
    var toReturn = [];
    for (member in aliases) {
        var memberList = {
            "Username": aliases[member].Name,
            "Cards": findCards(aliases[member].ID)
        }
        toReturn.push(memberList);
    }
    fs.writeFileSync('./public/management/trello-cards.json', JSON.stringify(toReturn, "utf-8"))
}
summaryGenerator();
function summaryGenerator() {
    var cards = JSON.parse(fs.readFileSync("public/management/trello-cards.json", "utf-8"));
    var summary = [];
    for (people in cards) {
        //console.log(cards[people]["Cards"].length);
            //console.log("c" + c)
            var pipelineCnt = [0, 0, 0, 0];
            var prepareCnt = [0, 0, 0, 0];
            var sourcingCnt = [0, 0, 0, 0];
            var insuranceCnt = [0, 0, 0, 0];
            var legalCnt = [0, 0, 0, 0];
            var responseCnt = [0, 0, 0, 0];
            var finalizeCnt = [0, 0, 0, 0];
            var completeCnt = [0, 0, 0, 0];
            var maintainCnt = [0, 0, 0, 0];
            var changeCnt = [0, 0, 0, 0];
            var cpoCnt = [0, 0, 0, 0];
            for (card in cards[people]["Cards"]) {
                //console.log(cards[people]["Cards"][card])
                switch (JSON.parse(cards[people]["Cards"][card]).List) {
                    case "PIPELINE":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                pipelineCnt[0]++;
                                break;
                            case "yellow":
                                pipelineCnt[1]++;
                                break;
                            case "green":
                                pipelineCnt[2]++;
                                break;

                            case "grey":
                                pipelineCnt[3]++;
                                break;

                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "1. PREPARE RFP":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                prepareCnt[0]++;
                                break;
                            case "yellow":
                                prepareCnt[1]++;
                                break;
                            case "green":
                                prepareCnt[2]++;
                                break;
                            case "grey":
                                prepareCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "2. SOURCING ACTIVITIES":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                sourcingCnt[0]++;
                                break;
                            case "yellow":
                                sourcingCnt[1]++;
                                break;
                            case "green":
                                sourcingCnt[2]++;
                                break;
                            case "grey":
                                sourcingCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "For Insurance":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                insuranceCnt[0]++;
                                break;
                            case "yellow":
                                insuranceCnt[1]++;
                                break;
                            case "green":
                                insuranceCnt[2]++;
                                break;
                            case "grey":
                                insuranceCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "FOR LEGAL":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                legalCnt[0]++;
                                break;
                            case "yellow":
                                legalCnt[1]++;
                                break;
                            case "green":
                                legalCnt[2]++;
                                break;
                            case "grey":
                                legalCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "3. EVALUATE RESPONSE":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                responseCnt[0]++;
                                break;
                            case "yellow":
                                responseCnt[1]++;
                                break;
                            case "green":
                                responseCnt[2]++;
                                break;
                            case "grey":
                                responseCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "4. FINALIZE CONTRACT":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                finalizeCnt[0]++;
                                break;
                            case "yellow":
                                finalizeCnt[1]++;
                                break;
                            case "green":
                                finalizeCnt[2]++;
                                break;
                            case "grey":
                                finalizeCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "Complete for the week":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                completeCnt[0]++;
                                break;
                            case "yellow":
                                completeCnt[1]++;
                                break;
                            case "green":
                                completeCnt[2]++;
                                break;
                            case "grey":
                                completeCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "MAINTAIN CONTRACT":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                maintainCnt[0]++;
                                break;
                            case "yellow":
                                maintainCnt[1]++;
                                break;
                            case "green":
                                maintainCnt[2]++;
                                break;
                            case "grey":
                                maintainCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "Change Orders":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                changeCnt[0]++;
                                break;
                            case "yellow":
                                changeCnt[1]++;
                                break;
                            case "green":
                                changeCnt[2]++;
                                break;
                            case "grey":
                                changeCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    case "FOR CPO REVIEW":
                        switch (JSON.parse(cards[people]["Cards"][card]).Color) {
                            case "red":
                                cpoCnt[0]++;
                                break;
                            case "yellow":
                                cpoCnt[1]++;
                                break;
                            case "green":
                                cpoCnt[2]++;
                                break;
                            case "grey":
                                cpoCnt[3]++;
                                break;
                            default:
                                console.log("uh-oh");
                        }
                        break;
                    default:
                        console.log(JSON.parse(cards[people]["Cards"][card]));
                }
            }
            summary.push({
                "Username": cards[people].Username,
                "Pipeline_R": pipelineCnt[0],
                "Pipeline_Y": pipelineCnt[1],
                "Pipeline_G": pipelineCnt[2],
                "Pipeline_E": pipelineCnt[3],

                "Preparation_R": prepareCnt[0],
                "Preparation_Y": prepareCnt[1],
                "Preparation_G": prepareCnt[2],
                "Preparation_E": prepareCnt[3],

                "Sourcing_R": sourcingCnt[0],
                "Sourcing_Y": sourcingCnt[1],
                "Sourcing_G": sourcingCnt[2],
                "Sourcing_E": sourcingCnt[3],

                "Insurance_R": insuranceCnt[0],
                "Insurance_Y": insuranceCnt[1],
                "Insurance_G": insuranceCnt[2],
                "Insurance_E": insuranceCnt[3],

                "Legal_R": legalCnt[0],
                "Legal_Y": legalCnt[1],
                "Legal_G": legalCnt[2],
                "Legal_E": legalCnt[3],

                "Response_R": responseCnt[0],
                "Response_Y": responseCnt[1],
                "Response_G": responseCnt[2],
                "Response_E": responseCnt[3],

                "Finalize_R": finalizeCnt[0],
                "Finalize_Y": finalizeCnt[1],
                "Finalize_G": finalizeCnt[2],
                "Finalize_E": finalizeCnt[3],

                "Complete_R": completeCnt[0],
                "Complete_Y": completeCnt[1],
                "Complete_G": completeCnt[2],
                "Complete_E": completeCnt[3],

                "Maintain_R": maintainCnt[0],
                "Maintain_Y": maintainCnt[1],
                "Maintain_G": maintainCnt[2],
                "Maintain_E": maintainCnt[3],

                "Change_R": changeCnt[0],
                "Change_Y": changeCnt[1],
                "Change_G": changeCnt[2],
                "Change_E": changeCnt[3],

                "CPO_R": cpoCnt[0],
                "CPO_Y": cpoCnt[1],
                "CPO_G": cpoCnt[2],
                "CPO_E": cpoCnt[3]

            });
    }
    fs.writeFileSync('./public/management/trello-cards-summary.json', JSON.stringify(summary, "utf-8"))
}

function colorBucketer() {
    switch (cards[people][card].Color) {
        case "red":
            responseCnt[0]++;
        case "yellow":
            pipelineCnt[1]++;
        case "green":
            pipelineCnt[2]++;
        case "grey":
            pipelineCnt[3]++;
        default:
            console.log("uh-oh");
    }
}

function findCards(memberId) {
    var cards = JSON.parse(fs.readFileSync("trello.json", "utf-8"));
    cards = addRandomColors(cards);
    var returnArray = [];
    for (card in cards) {
        if (cards[card].Member_IDs.indexOf(memberId) > -1) {
            returnArray.push(JSON.stringify(cards[card]));
        }
    }
    var aliases = JSON.parse(fs.readFileSync("members.json", "utf-8"));

    return returnArray;
}


function addRandomColors(listOfCards) {
    for (card in listOfCards) {
        rNum = Math.floor((Math.random() * 4) + 1);
        switch (rNum) {
            case 1:
                listOfCards[card].Color = "green";
                break;
            case 2:
                listOfCards[card].Color = "yellow";
                break;
            case 3:
                listOfCards[card].Color = "red";
                break;
            default:
                listOfCards[card].Color = "grey";
        }
    }
    console.log("done")
    return listOfCards;
}

//formatBySE();
//getLists();
//summaryGenerator();