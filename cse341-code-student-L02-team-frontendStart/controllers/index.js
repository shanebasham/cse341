const path = require('path');

const getFrontend = (req, res, next) => {
    res.json('Test');
    // res.sendFile('/frontend/index.html');
    // req.get(index.html)
    // const filePath = path.join(__dirname, '../frontend/index.html');
    // res.sendFile(filePath);
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
}

const getProfessional = (req, res, next) => {
    res.json('Test');
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
}

module.exports = { getFrontend, getProfessional };

