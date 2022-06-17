const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./database/manager');
const { Op } = require('sequelize');
const Bill = require('./models/bill');
const cors = require('cors');

sequelize.sync({ alter: true });

const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

app.get('/bills/:year/:month', async (req, res) => {
    const { month, year } = req.params;
    var bills = await Bill.findAll({ 
        where: { 
            [Op.and]: [
                sequelize.fn('strftime(\'%m\', dueDate) = ', month),
                sequelize.fn('strftime(\'%Y\', dueDate) = ', year),
            ]
        }
     });
    res.send(bills);
});

app.post('/bills', async (req, res) => {
    var bill = await Bill.create(req.body);
    res.send(bill);
});

app.put('/bills/:id', async (req, res) => {
    const bill = await Bill.findByPk(req.params.id);

    if (!bill) {
        return res.status(404).send();
    }
    
    bill.description = req.body.description;
    bill.group = req.body.group;
    bill.value = req.body.value;
    bill.paymentDate = req.body.paymentDate;
    bill.dueDate = req.body.dueDate;
    bill.isFixed = req.body.isFixed;
    bill.obs = req.body.obs;
    await bill.save();
    res.send(bill);
});

app.delete('/bills/:id', async (req, res) => {
    const bill = await Bill.findByPk(req.params.id);
    await bill.destroy();
    return res.status(204).send();
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));