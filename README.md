# Jass
Server side of the typicall Swiss game that is played with cards.

#### Rules of the game
The jass requires 4 players. Two teams of two players are made. The goal is collect as many points as possible. When one team reach 1000 points, the team wins. There are 36 cards, these cards goes from 6 to ace. There are 4 kinds (clubs, spades, hearts, diamonds). Each player receives 9 cards. The player who has the 7 of diamonds when the game starts will decide the atout (trump). Each player plays a card at a time, in anticlockwise. When each players played a card there are 4 cards on the board. This is called a plie, the winner of the plie will take it, and will play first a new card. When players don't have cards anymore, each team collect his plies and count the points. The next player by turning in anticlockwise has to choose atout. 

[Jass Rules](https://en.wikipedia.org/wiki/Jass) - Explanation of the game and the rules - wikipedia

## Getting started
After having forked the project, you can follow the following instructions to run the app on your local machine for development and testing purposes.

### Installing
To run the project you need first of all create your node_modules with:
```
npm install
```
Then, the project can be run with: 
```
nodemon index.js
```

## Running the tests
To run the automated tests you need to run the following command
````
npm test