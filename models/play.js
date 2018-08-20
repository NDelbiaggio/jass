const {Trick} = require('./trick');
const {isTrumpValid} = require('../db/deck');

const nbTricks = 9;
const matchBonus = 100;

exports.Play = class Play {

    constructor(tricks = [], trump ="", trumpChosenBy="", chibre="" ){
        this.tricks = tricks;
        this.trump = trump;
        this.trumpChosenBy = trumpChosenBy;
        this.chibre = chibre;
        if(!isTrumpValid(trump) && trump != '') throw new Error('Trump invalid');
    }

    setTrump(trump, trumpChosenBy){
        this.trump = trump;
        this.trumpChosenBy = trumpChosenBy;
    }

    /**
     * Returns the points of the play
     * @param {[Object]} tricks
     * @returns {number} points
     */
    calculatePlayPoints(tricks=this.tricks){
        let points = 0;
        tricks.forEach(trick => {
            points += trick.calculateTrickPoints(this.trump);
        });

        return (tricks.length == nbTricks)? points + matchBonus: points;
    };

    /**
     * Returns the number of points made by the received team
     * @param {Object} team 
     * @returns {number} points
     */
    calculatePointsTeam(team){
        let trickTeam = [];
        this.tricks.forEach(trick =>{
            let indPlayer = team.players.findIndex(p => p._id == trick.leadingPlayer); 
            
            if(indPlayer != -1){
                trickTeam.push(trick);
            } 
        });

        return this.calculatePlayPoints(trickTeam);
    }

    /**
     * Add a trick to the tricks
     * @param {Object} trick 
     */
    addTrick(trick){
        this.tricks.push(trick);
    };

    /**
     * Create a new trick with the number following the previous ones
     * @returns {Object} trick
     */
    createNewTrick(){
        if(this.tricks.length == 9) return;
        const trickNumber = this.tricks.length == 0? 1: this.getLastTrick().number + 1;
        let trick = new Trick(trickNumber, this.trump);
        this.tricks.push(trick);
        return trick;
    }

    /**
     * Returns the last trick
     * @returns {Object} trick
     */
    getLastTrick(){
        if(this.tricks.length == 0) return this.createNewTrick();
        return this.tricks[this.tricks.length - 1];
    }

    /**
     * Returns the previous trick, if there is only one trick the first one is returned
     * @returns {Object} trick
     */
    getPreviousTrick(){
        const prevTrickInd = this.tricks.length <= 1? 0: this.tricks.length -2;
        return this.tricks[prevTrickInd];
    }

    clearTricks(){
        this.tricks = [];
        this.chibre = "";
        this.trump = "";
    }

    isTrumpSet(){
        return this.trump != "";
    }


}