// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called '' and set it to version 1
const request = indexedDB.open('budget', 1);

// event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
//request.onupgradeneeded = function(event) {
     // save a reference to the database
    request.onupgradeneeded = ({ target }) => {
        let db = target.result;
        db.createObjectStore("pending",
        { autoIncrement: true });
    };
  // successful request
    request.onsuccess = function(event) {
        // when db is successfully created with its object store
   db = event.target.result;
    }
    //const db = event.target.result;
    // create an object store (table) called '

    //check if the app is online 
    if (navigator.onLine) {
        checkDatabase();
    }
};




  <script src="./js/idb.js"></script>