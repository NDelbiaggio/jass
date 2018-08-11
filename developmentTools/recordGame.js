const fs = require('fs');

const filePrint = "test.txt";

function printPlay(play, players, callback){
    fs.appendFile(filePrint, `let play = new Play({
        plies: [
            ${printPlies(play.plies)}
        ],
        atout: types.${play.atout}
    })

    ${printPlayers(players)}
    `, 'utf8', callback);
}

function printPlies(plies){
    let result = ``;
    plies.forEach(plie => {
        result += `new Plie({
                number: ${plie.number},
                highestCardIndex: "${plie.highestCardIndex}",
                leadingPlayer: "${plie.leadingPlayer}",
                lastPlayer: "${plie.lastPlayer}",
                cards: [
                    ${printCards(plie.cards)}
                ]
            }),
        `
    });
    return result;
}

function printCards(cards){
    let result = ``;
    cards.forEach(c =>{
        result += `getCopyCard(types.${c.type}, ${c.power}),
                    `
    })
    return result;
}

function printPlayers(players){
    let result = `let teamA = new Team({
        players: [
            new Player({id: "${players[0].id}"}),
            new Player({id: "${players[2].id}"})
        ]
    });
    
    let teamB = new Team({
        players: [
            new Player({id: "${players[1].id}"}),
            new Player({id: "${players[3].id}"})
        ]
    });

    const resultA = play.calculatePointsTeam(teamA);
    const resultB = play.calculatePointsTeam(teamB);
    `

    return result;
}

function printPlayersWithHands(players){
    let result = ``;
    players.forEach(player =>{
        result += `new Player({
            id: "${player.id}",
            cards: [
                ${printCards(player.cards)}
            ]
        }),`
    });
    return result;
}

function writePlayersWithHands(players, callback){
    let print = printPlayersWithHands(players);
    fs.appendFile(filePrint, print, 'utf8', callback);
}

exports.printPlay = printPlay;
exports.writePlayersWithHands = writePlayersWithHands;