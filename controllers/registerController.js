const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) return res.status(400).json({ "message": 'Username and password are required.' });

    // check for duplicate usernames
    const duplicate = usersDB.users.find(person => person.name == user);

    if (duplicate) return res.sendStatus(409);

    try {
        // encrypt the password
        const hashedPassowrd = await bcrypt.hash(password, 10)
        // store the new user
        const newUser = { "username": user, "password": hashedPassowrd };
        usersDB.setUsers([...usersDB.users, newUser]);

        // write to DB

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        )

        // status
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}


module.exports = { handleNewUser }