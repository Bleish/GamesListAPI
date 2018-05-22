import mongoose from 'mongoose';

export const SYSTEM = 'TestSystem';

export let badId = mongoose.Types.ObjectId();
export let testGames = [];

for (let i = 1; i < 4; i++) {
    testGames.push({
        title: `TestGame${i}`,
        system: SYSTEM,
        releaseDate: 2000 + i
    });
}

export let testGameSingle = {
    _id: mongoose.Types.ObjectId(),
    title: 'TestGameSingle',
    system: SYSTEM,
    releaseDate: 2000
};

export let testGameSingleInvalid = {
    title: 'TestGameSingle',
    system: SYSTEM,
    releaseDate: "InvalidYearFormat"
};

export let postGameSingle = {
    title: 'PostGameSingle',
    system: SYSTEM,
    releaseDate: 1999
};

export let putGameSingle = {
    title: 'PutGameSingle'
};

export let deleteGameSingle = {
    _id: mongoose.Types.ObjectId(),
    title: 'DeleteGameSingle',
    system: SYSTEM,
    releaseDate: 1998
};