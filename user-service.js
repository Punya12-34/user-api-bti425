const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String, unique: true },
    password: String,
    favourites: [String]
});

// Connect and return User model every time
async function getUser() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URL);
    }
    return mongoose.models.users || mongoose.model("users", userSchema);
}

module.exports.connect = function () {
    return new Promise(async function (resolve, reject) {
        try {
            await mongoose.connect(process.env.MONGO_URL);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.registerUser = function (userData) {
    return new Promise(async function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
            return;
        }
        try {
            const User = await getUser();
            const hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            let newUser = new User(userData);
            await newUser.save();
            resolve("User " + userData.userName + " successfully registered");
        } catch (err) {
            if (err.code == 11000) {
                reject("User Name already taken");
            } else {
                reject("There was an error creating the user: " + err);
            }
        }
    });
};

module.exports.checkUser = function (userData) {
    return new Promise(async function (resolve, reject) {
        try {
            const User = await getUser();
            const user = await User.findOne({ userName: userData.userName });
            if (!user) return reject("Unable to find user " + userData.userName);
            const res = await bcrypt.compare(userData.password, user.password);
            if (res === true) {
                resolve(user);
            } else {
                reject("Incorrect password for user " + userData.userName);
            }
        } catch (err) {
            reject("Unable to find user " + userData.userName);
        }
    });
};

module.exports.getFavourites = function (id) {
    return new Promise(async function (resolve, reject) {
        try {
            const User = await getUser();
            const user = await User.findById(id);
            resolve(user.favourites);
        } catch (err) {
            reject(`Unable to get favourites for user with id: ${id}`);
        }
    });
};

module.exports.addFavourite = function (id, favId) {
    return new Promise(async function (resolve, reject) {
        try {
            const User = await getUser();
            const user = await User.findById(id);
            if (user.favourites.length < 50) {
                const updated = await User.findByIdAndUpdate(
                    id,
                    { $addToSet: { favourites: favId } },
                    { new: true }
                );
                resolve(updated.favourites);
            } else {
                reject(`Unable to update favourites for user with id: ${id}`);
            }
        } catch (err) {
            reject(`Unable to update favourites for user with id: ${id}`);
        }
    });
};

module.exports.removeFavourite = function (id, favId) {
    return new Promise(async function (resolve, reject) {
        try {
            const User = await getUser();
            const updated = await User.findByIdAndUpdate(
                id,
                { $pull: { favourites: favId } },
                { new: true }
            );
            resolve(updated.favourites);
        } catch (err) {
            reject(`Unable to update favourites for user with id: ${id}`);
        }
    });
};