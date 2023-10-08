const express = require('express');

const app = express();


const PORT = process.env.PORT || 3000;

const totalBudget = 2500;

const prepend = '/envelopes';

const envelopes = [{id: 0, budget: 60, title:'Groceries'},
{id: 1, budget: 40, title: 'Gas'},
{id: 2, budget: 80, title:'Clothing'},
{id: 3, budget: 30, title: 'Dining_Out'},
{id: 4, budget: 70, title: 'Household_Items.'},
{id: 5, budget: 300, title: 'Savings'},
{id: 6, budget: 400, title: 'Taxes'},
{id: 7, budget: 500, title: 'Insurance'}
];

function createEnvelope(query)
{
    if(query.hasOwnProperty('id') && query.hasOwnProperty('budget') && query.hasOwnProperty('title'))
    {
        let newEnvelope = {id: Number(query.id), budget: Number(query.budget), title: query.title};
        return newEnvelope;
    }
    return undefined;
}

function getIndexByID(id, array)
{
    let notFoundFlag = -1;
    for (let i = 0; i < array.length; i++)
    {
        if(i === id)
        {
            return i;
        }
    }
    return notFoundFlag;
}

function getIDByTitle(title, array)
{
    let notFoundFlag = undefined;
    for (let i = 0; i < array.length; i++)
    {
        let element = array[i];
        if(element.title === title)
        {
            return element.id;
        }
    }
    return notFoundFlag;
}

function transferFunds(sender, reciever, amount)
{

}
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`${req.method} Request Recieved.`);
    next();
})

app.get(prepend, (req, res, next) => {
    // console.log(req);
    res.send(envelopes);
  });

app.get(prepend + '/:id', (req, res, next) => {
    const envelope = envelopes[req.params.id];
    if(envelope)
    {
        res.send(envelope);
    }
    else
    {
        res.status(400).send("Envelope Not Found");
    }

});


app.post(prepend + '/', (req, res, next) => {
    let newEnvelope = createEnvelope(req.query);
    if(!newEnvelope || envelopes[req.query.id])
    {

        if(!newEnvelope)
        {
            res.send("Error: Invalid Query Entered.")
        }
        else
        {
            res.send("Error: ID already in use");
        }
    }
    else
    {
        envelopes.push(newEnvelope);
        res.status(201).send(newEnvelope);
    }
});

app.put(prepend + '/transfer/:from/:to', (req, res, next) => {
        let sendingID = getIDByTitle(req.params.from, envelopes);
        let recievingID = getIDByTitle(req.params.to, envelopes);
        let transferAmount = Number(req.query.amount);

        if(sendingID !== undefined && recievingID !== undefined && transferAmount)
        {
            if(envelopes[sendingID].budget - transferAmount >= 0)
            {
                envelopes[sendingID].budget -= transferAmount;
            }
            else
            {
                res.send("Not Enough Funds to Send");
            }

            envelopes[recievingID].budget += transferAmount;
            res.send(`The ${req.params.from} envelope transfered $${transferAmount} to the ${req.params.to}.`);
        }
        else
        {
            if(!transferAmount)
            {
                res.send("Transfer Amount Not Entered");
            }
            else
            {
                res.send("Sending/Recieving Envelope(s) Not Found");
            }
        }

});

app.put(prepend + '/:id', (req, res, next) => {
    const envelopeUpdates = req.query;
    if(envelopeUpdates)
    {
        if(envelopeUpdates.budget)
        {
            envelopes[req.params.id].budget = Number(envelopeUpdates.budget);
        }
        if(envelopeUpdates.title)
        {
            envelopes[req.params.id].title = envelopeUpdates.title;
        }
        res.send(envelopes[req.params.id]);
    }
    else
    {
        res.send("Error: No Query was entered.");
    }
});

app.delete(prepend + '/:id', (req, res, next) => {
    const envelopeIndex = getIndexByID(Number(req.params.id), envelopes);
    if(envelopeIndex !== -1)
    {
        envelopes.splice(envelopeIndex, 1);
        res.status(204).send("Deletion Sucessful.");
    }
    else
    {
        res.status(404).send("Envelope ID not found.");
    }

});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})
