const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called '' and set it to version 1
const request = indexedDB.open("budget", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("pending",
        { autoIncrement: true });
    };

    request.onsuccess = function(event) {
        // when db is successfully created with its object store
   db = event.target.result;
    

    //check if the app is online 
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    console.log("Error!" + event.target.errorCode);
};

//This function will be executed if no internet connection
function saveRecord(record) {
    //open a new transaction with the database with read and write permissions
    const transaction = db.transaction(["pending"], "readwrite");

    //access the object store for "pending"
    const store = transaction.createObjectStore("pending");

    //add record to your store with add method
    store.add(record);
}

function checkDatabase() {
    //open a transaction in db
    const transaction = db.transaction(["pending"], "readwrite");

    //access your object store 
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    //upon a successful .getAll execution, run this function
    getAll.onsuccess = function() {
        //if there was data in indexedDb's store, send it to the api server
        if(getAll.result.length > 0) {
            fetch("api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
              if (serverResponse.message) {
                throw new Error(serverResponse);
              }
              const transaction = db.transaction(["pending"], "readwrite");
              const store = transaction.objectStore("pending");
              store.clear();
        
              //.then(() => {
                  //delete t
              });
        }
    };
}

window.addEventListener("online", checkDatabase);






  //<script src="./js/idb.js"></script>