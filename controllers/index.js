const function1 = (req, res, next) => {
    res.json('Shane Basham');
}

const function2 = (req, res, next) => {
    res.json('Canberra Basham');
}

module.exports = { function1, function2 };