// Date Started: 9-25-2023

class AstrologyGenerator
{
    constructor()
    {
        this._signArray = [];
    }
    addSign(sign)
    {
        this._signArray.push(sign);
    }

    get signArray()
    {
        return this._signArray;
    }

    selectRandomSignByIndex()
    {
        let randIndex = Math.floor(Math.random() * 12);
        return this._signArray[randIndex];
    }

    generateMessage()
    {
        let selectSign = this.selectRandomSignByIndex()
        let messageFlag = Math.floor(Math.random() * 3);
        let signMessage;
        if (messageFlag === 0)
        {
            signMessage = `The astrology sign ${selectSign._name} is also known as "${selectSign._gloss}".` 
        }
        else if (messageFlag === 1)
        {
            signMessage = `The symbol of the ${selectSign._name} is '${selectSign._symbol}'.`;
        }
        else
        {
            signMessage = `The sign ${selectSign._name} belongs to people born between ${selectSign._signStartDate} and ${selectSign._signEndDate}.`
        }
         
        return signMessage;
    }

    
}

class Sign
{
    constructor(name, gloss, symbol, signStartDate, signEndDate)
    {
        this._name = name;
        this._gloss = gloss;
        this._symbol = symbol;
        this._signStartDate = signStartDate;
        this._signEndDate = signEndDate;
    }
    get name()
    {
        return this._name;
    }
}

signNames =     
['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 
'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 
'Capricorn', 'Aquarius', 'Pisces'];

signGlosses = 
["The Ram", "The Bull", "The Twins", "The Crab", 
"The Lion", "The Maiden", "The Scales", "The Scorpion",     
"The Archer", "The Goat", "The Water-bearer", "The Fish"];

signSymbols = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];

signStartDates = ['March 21', 'April 21', 'May 22', 'June 22', 
'July 24', 'August 24', 'September 24', 'October 24', 
'November 23', 'December 22', 'January 21', 'February 20'];

signEndDates = ['April 20', 'May 21', 'June 21', 'July 23', 
'August 23', 'September 23', 'October 23', 'November 22', 
'December 21', 'January 20', 'February 19', 'March 20'];

astrologyGen = new AstrologyGenerator()

for (let i = 0; i < 12; i++)
{
    let sign = new Sign(signNames[i], signGlosses[i], signSymbols[i], signStartDates[i], signEndDates[i]);
    astrologyGen.addSign(sign);
}
console.log(astrologyGen.generateMessage());


