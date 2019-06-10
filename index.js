var fs = require('fs');
var readlineSync = require('readline-sync');

function showMenu() {
    console.log(`------------------------------`);   
    console.log('1.Show All Phonebook.');
    console.log('2.Create a new Phone.');
    console.log('3.Edit a Phonebook'); 
    console.log('4.Delete a Phonebook'); 
    console.log('5.Save && Exit.'); 

    var option = readlineSync.question('Key: '); 
    console.log(`---------------------------`);
    
    switch (option) {
        case '1':
            showAllPhoneBook();
            showMenu();
            break;
        case '2':
            createANewPhonebook();
            showMenu();
            break;
        case '3':
            editAPhonebook();
            showMenu();
            break;
        case '4':
            deleteAPhonebook();
            showMenu();
            break;
        case '5':
            saveAndExit();
            break;
        default:
            console.log('Wrong otiopns');       
            break;
    }
}


//load data.json
var dataPhonebook = [];
function loadData() {
    var data = fs.readFileSync('./data.json');
    dataPhonebook = JSON.parse(data); 
}

//show all book
function showAllPhoneBook() {
    console.log(`List All Phonebook in Phone`);
    for(phonebook of dataPhonebook) {
        console.log(`------------------------------`);      
        console.log(`iD: ${phonebook.id}.Name: ${phonebook.name}, Phone: ${phonebook.phone}`);    
    } 
}

//create a new phone book
function createANewPhonebook() {
    console.log(`Input info new Phonebook:`);  
    var id = readlineSync.question('ID: '); 
    var name = readlineSync.question('Name: '); 
    var phone = readlineSync.question('Phone: '); 
    var phonebook = {
        id : id,
        name : name,
        phone: phone
    };
    dataPhonebook.push(phonebook);
    console.log(dataPhonebook);
}

//edit a phonebook
function editAPhonebook() {
    showAllPhoneBook();
    var option = readlineSync.question('Input ID Phonebook Edit:: ');
    var findPhoneById = dataPhonebook.find((phonebook) => {
        if(option == phonebook.id) { // parsseInt id use === or Object.is
            return phonebook;
        } else {
            return null;
        }
    });

    console.log(`Input Info Phonebook Edit: `);
    var name = readlineSync.question('Name Edit: '); 
    var phone = readlineSync.question('Phone Edit: '); 
    findPhoneById.name = name;
    findPhoneById.phone = phone;
}

//delete
function deleteAPhonebook() {
    showAllPhoneBook();
    console.log(`Input ID Phonebook Delete: `);
    var option = readlineSync.question('ID Delete: ');
    var findPhoneById = dataPhonebook.find((phonebook) => {
        if(option == phonebook.id) { // parsseInt id use === or Object.is
            return phonebook;
        } else {
            return null;
        }
    });
    //check findPhoneByid
    if(findPhoneById == null || findPhoneById == undefined) {
        console.log('ID does\'t exits');
    } else {     
        for(var i = 0; i < dataPhonebook.length; i++) {
            if(findPhoneById.id == dataPhonebook[i].id) {
                dataPhonebook.splice(i,1);
                console.log(dataPhonebook);      
            }
        }
    }
}

//save and exits
function saveAndExit() {
    fs.writeFileSync('./data.json', JSON.stringify(dataPhonebook), 'utf-8')
}

function Main() {
    loadData();
    showMenu();
}

Main();