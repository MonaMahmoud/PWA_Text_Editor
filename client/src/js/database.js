import { openDB } from 'idb';

const initdb = async() =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async(content) => {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });



    console.info('after line 18');
    const tx = jateDb.transaction('jate', 'readwrite');
    //console.info('after line 20');

    const store = tx.objectStore('jate');
    // console.info('after line 24');

    const request = store.put({ id: 1, jate: content });
    ////console.info('after line 26');

    const result = await request;
    //console.info('after line 29');

    console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async() => {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();