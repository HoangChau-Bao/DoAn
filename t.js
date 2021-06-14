    //test local storage
    var testObject = { 'one': 1, 'two': 2, 'three': 3 };
    var testObject2 = { 'one': 4, 'two': 5, 'three': 6 };
    var arrayOject = JSON.parse(localStorage.getItem('arrayOject'));
    if(arrayOject == null)
        arrayOject = [];
    arrayOject.push(testObject);
    arrayOject.push(testObject2);

    // Put the object into storage
    localStorage.setItem('arrayOject', JSON.stringify(arrayOject));

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('arrayOject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));