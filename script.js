"use strict";

const template = document.querySelector("template").content;
const main = document.querySelector(".students");
const studentsLink = "http://petlatkea.dk/2019/hogwartsdata/students.json";
const familiesLink = "http://petlatkea.dk/2019/hogwartsdata/families.json";
let studentList = [];
let familiesList = {};
let deleted = 0;

let inquisitorialSquad = [];

let slytherinPrefects = 2;
let gryffindorPrefects = 2;
let ravenclawPrefects = 2;
let hufflepuffPrefects = 2;

/* fetches the data from the link */
function loadData(link) {
    fetch(familiesLink).then(e => e.json()).then(families => familiesList = families);
    fetch(link).then(e => e.json()).then(data => show(data));
}

/* shows the fetched data */
function show(data) {

    data.forEach(function (student) {
        let clone = template.cloneNode(true);
        let newStudent = {};
        let studentName = student.fullname.toLowerCase();
        studentName = studentName.trim();
        let index = studentName.lastIndexOf(' ');
        let lastName = studentName.substring(index + 1, studentName.length).replace(/\b\w/g, l => l.toUpperCase());
        let firstName = studentName.substring(0, index).replace(/\b\w/g, l => l.toUpperCase());
        let house = student.house.replace(/\s/g, '');
        house = house.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

        if (lastName === `Leanne`) {
            clone.querySelector(".img").src = "images/leanne_l.png";
            newStudent.image = "images/leanne_l.png"
        } else
        if (firstName === 'Justin') {
            clone.querySelector(".img").src = "images/fletchley_j.png";
            newStudent.image = "images/fletchley_j.png";
        } else
        if (firstName === `Padma`) {
            clone.querySelector(".img").src = "images/patil_padme.png";
            newStudent.image = "images/patil_padme.png";
        } else
        if (firstName === `Parvati`) {
            clone.querySelector(".img").src = "images/patil_parvati.png";
            newStudent.image = "images/patil_parvati.png";
        } else {
            clone.querySelector(".img").src = "images/" + lastName.toLowerCase() + "_" + firstName.substring(0, 1).toLowerCase() + ".png";
            newStudent.image = "images/" + lastName.toLowerCase() + "_" + firstName.substring(0, 1).toLowerCase() + ".png";
        }
        if (firstName.length != 0) {
            clone.querySelector(".firstName").textContent = "First name: " + firstName;
            clone.querySelector(".lastName").textContent = "Last name: " + lastName;

            newStudent.firstName = firstName;
            newStudent.lastName = lastName;
        } else {
            firstName = lastName;
            newStudent.firstName = firstName;
            newStudent.lastName = lastName;
            clone.querySelector(".firstName").textContent = "First name: " + firstName;
            clone.querySelector(".lastName").textContent = "Last name: " + lastName;
        }

        clone.querySelector(".house").textContent = "House: " + house;

        newStudent.house = house;


        if (!familiesList.pure.includes(lastName) && !familiesList.half.includes(lastName)) {
            newStudent.blood = 'Plain muggle';
        }

        if (!familiesList.pure.includes(lastName) && familiesList.half.includes(lastName)) {
            newStudent.blood = 'Plain muggle';
        }

        if (familiesList.pure.includes(lastName) && !familiesList.half.includes(lastName)) {
            newStudent.blood = 'Pure wizard';
            clone.querySelector(".myInquisitorial").style.display = "inline-block";
        }

        if (familiesList.pure.includes(lastName) && familiesList.half.includes(lastName)) {
            newStudent.blood = 'Half wizard';
        }

        studentList.push(newStudent);

        let btn = clone.querySelector(".myBtn");
        let modal = clone.querySelector(".modal");

        btn.onclick = (event) => {
            modal.style.display = "block";
            showMore(newStudent, modal);
        }

        let span = clone.querySelector(".close");

        span.onclick = () => {
            modal.style.display = "none";
        }

        modal.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        main.appendChild(clone);
    });

    let cloneMe = template.cloneNode(true);

    const me = {
        firstName: "Andrei-Marius",
        lastName: "Hutupas-Antoniu",
        house: "Slytherin",
    }

    cloneMe.querySelector(".firstName").textContent = "First name: " + me.firstName;
    cloneMe.querySelector(".lastName").textContent = "Last name: " + me.lastName;
    cloneMe.querySelector(".house").textContent = "House: " + me.house;

    if (me.firstName === `Andrei-Marius`) {
        cloneMe.querySelector(".img").src = "images/voldemort.png";
    }


    let btn = cloneMe.querySelector(".myBtn");
    let modal = cloneMe.querySelector(".modal");

    btn.onclick = (event) => {
        modal.style.display = "block";
        showMore(me, modal);
    }

    let span = cloneMe.querySelector(".close");

    span.onclick = () => {
        modal.style.display = "none";
    }

    modal.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    studentList.push(me);

    document.querySelector(`.allStudents`).textContent = `Students: ` + studentList.length;

    main.appendChild(cloneMe);
}
loadData(studentsLink);

/* shows the data inside the modal */
function showMore(modalData, modal) {
    if (modalData.firstName === 'Justin') {
        modal.querySelector(".modalImg").src = "images/fletchley_j.png";
    } else
    if (modalData.firstName === `Padma`) {
        modal.querySelector(".modalImg").src = "images/patil_padme.png";
    } else
    if (modalData.firstName === `Parvati`) {
        modal.querySelector(".modalImg").src = "images/patil_parvati.png";
    } else {
        modal.querySelector(".modalImg").src = "images/" + modalData.lastName.toLowerCase() + "_" + modalData.firstName.substring(0, 1).toLowerCase() + ".png";
    }
    if (modalData.house === `Slytherin`) {
        modal.querySelector(".modalHouse").style.color = `green`;
        modal.querySelector(".crest").src = "images/slytherin_crest.png";
    } else
    if (modalData.house === `Gryffindor`) {
        modal.querySelector(".modalHouse").style.color = `red`;
        modal.querySelector(".crest").src = "images/gryffindor_crest.png";
    } else
    if (modalData.house === `Ravenclaw`) {
        modal.querySelector(".modalHouse").style.color = `blue`;
        modal.querySelector(".crest").src = "images/ravenclaw_crest.png";
    } else
    if (modalData.house === `Hufflepuff`) {
        modal.querySelector(".modalHouse").style.color = `yellow`;
        modal.querySelector(".crest").src = "images/hufflepuff_crest.png";
        modal.querySelector(".modalHouse").style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    }

    if (modalData.firstName === `Andrei-Marius`) {
        modal.querySelector(".modalImg").src = "images/voldemort.png";
    }

    modal.querySelector(".modalFirstName").textContent = "First name: " + modalData.firstName;
    modal.querySelector(".modalLastName").textContent = "Last name: " + modalData.lastName;
    modal.querySelector(".modalHouse").textContent = "House: " + modalData.house;
    modal.querySelector(".modalBlood").textContent = "Blood status: " + modalData.blood;
}

/* for showing the data after sorting, filtering */
function showChanged(newData) {
    let myStudents = document.querySelector(".students");
    myStudents.innerHTML = '';

    newData.forEach(function (student) {
        let clone = template.cloneNode(true);

        if ('firstName' in student) {
            clone.querySelector(".firstName").textContent = "First name: " + student.firstName;
            clone.querySelector(".lastName").textContent = "Last name: " + student.lastName;
        } else {
            clone.querySelector(".firstName").textContent = "First name: " + student.fullname;
        }

        if (familiesList.pure.includes(student.lastName) && !familiesList.half.includes(student.lastName)) {
            clone.querySelector(".myInquisitorial").style.display = "inline-block";
        }

        if (inquisitorialSquad.indexOf(student) != -1) {
            clone.querySelector(".myInquisitorial").textContent = "Remove from inquisitorial squad";

        }

        clone.querySelector(".img").src = student.image;
        clone.querySelector(".house").textContent = "House: " + student.house;

        let btn = clone.querySelector(".myBtn");
        let modal = clone.querySelector(".modal");

        modal.querySelector(".modalImg").src = student.image;
        modal.querySelector(".modalFirstName").textContent = "First name: " + student.firstName;
        modal.querySelector(".modalLastName").textContent = "Last name: " + student.lastName;
        modal.querySelector(".modalHouse").textContent = "House: " + student.house;
        modal.querySelector(".modalBlood").textContent = "Blood status: " + student.blood;

        if (student.house === `Slytherin`) {
            modal.querySelector(".modalHouse").style.color = `green`;
            modal.querySelector(".crest").src = "images/slytherin_crest.png";
        } else
        if (student.house === `Gryffindor`) {
            modal.querySelector(".modalHouse").style.color = `red`;
            modal.querySelector(".crest").src = "images/gryffindor_crest.png";
        } else
        if (student.house === `Ravenclaw`) {
            modal.querySelector(".modalHouse").style.color = `blue`;
            modal.querySelector(".crest").src = "images/ravenclaw_crest.png";
        } else
        if (student.house === `Hufflepuff`) {
            modal.querySelector(".modalHouse").style.color = `yellow`;
            modal.querySelector(".crest").src = "images/hufflepuff_crest.png";
            modal.querySelector(".modalHouse").style.textShadow = `-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black`;
        }

        btn.onclick = () => {
            modal.style.display = "block";
        }

        let span = clone.querySelector(".close");

        span.onclick = () => {
            modal.style.display = "none";
        }

        modal.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        if (student.firstName === `Andrei-Marius`) {
            modal.querySelector(".modalImg").src = "images/voldemort.png";
            clone.querySelector(".img").src = "images/voldemort.png";
        }

        main.appendChild(clone);
    });
}

/* sorting functions */
function sortByLastName() {
    let newStudents = [];
    newStudents = studentList.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName);
    });
    showChanged(newStudents)
}

function sortByFirstName() {
    let newStudents = [];
    newStudents = studentList.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
    });
    showChanged(newStudents)
}

function sortByHouse() {
    let newStudents = [];
    newStudents = studentList.sort((a, b) => {
        return a.house.localeCompare(b.house);
    });
    showChanged(newStudents)
}

/* filtering functions */
function showAll() {
    showChanged(studentList)
}

function byRavenclaw() {
    let newStudents = [];
    studentList.forEach((dataStudent) => {
        if (dataStudent.house === "Ravenclaw") {
            newStudents.push(dataStudent);
        }
        document.querySelector(`.ravenclawStudents`).textContent = `Ravenclaw house: ` + newStudents.length + ` students`;
    })
    showChanged(newStudents)
}


function showSquad() {
    let newStudents = [];
    newStudents = inquisitorialSquad;
    showChanged(newStudents)
}

function addToInquisitorial(button) {
    let firstNameStudent = button.parentNode.firstChild.nextElementSibling.nextElementSibling.textContent;

    let myStudent;

    studentList.forEach((student) => {
        if (firstNameStudent.includes(student.firstName)) {
            myStudent = student;
        }
    })

    if (button.textContent == 'Add to Inquisitorial Squad') {
        button.textContent = 'Remove from inquisitorial squad';
        if (inquisitorialSquad.indexOf(myStudent) == -1) {
            inquisitorialSquad.push(myStudent);
        }
    } else {
        const index = inquisitorialSquad.indexOf(myStudent);
        inquisitorialSquad.splice(index, 1);
        button.textContent = 'Add to Inquisitorial Squad';
    }


}

function byHufflepuff() {
    let newStudents = [];
    studentList.forEach((dataStudent) => {
        if (dataStudent.house === "Hufflepuff") {
            newStudents.push(dataStudent);
        }
        document.querySelector(`.hufflepuffStudents`).textContent = `Hufflepuff house: ` + newStudents.length + ` students`;
    })
    showChanged(newStudents)
}

function byGryffindor() {
    let newStudents = [];
    studentList.forEach((dataStudent) => {
        if (dataStudent.house === "Gryffindor") {
            newStudents.push(dataStudent);
        }
        document.querySelector(`.gryffindorStudents`).textContent = `Gryffindor house: ` + newStudents.length + ` students`;
    })
    showChanged(newStudents)
}

function bySlytherin() {
    let newStudents = [];
    studentList.forEach((dataStudent) => {
        if (dataStudent.house === "Slytherin") {
            newStudents.push(dataStudent);
        }
        document.querySelector(`.slytherinStudents`).textContent = `Slytherin house: ` + newStudents.length + ` students`;
    })
    showChanged(newStudents)
}

/* for expelling students */
function deleteStudent(element) {
    let myName = element.parentNode.querySelector(".firstName");
    if (myName.textContent != "First name: Andrei-Marius") {
        element.parentNode.remove();
        deleted++;
        document.querySelector('.expelled').style.display = 'block';
        document.querySelector('.expelled').textContent = 'Expelled: ' + deleted;
    }
}

/* for adding and removing prefects */
function makePrefect(makePrefectButton) {
    // console.log(makePrefectButton.previousElementSibling);
    if (makePrefectButton.previousElementSibling.textContent == 'House: Slytherin') {
        // if (slytherinPrefects === 0) {
        //     makePrefectButton.nextElementSibling.style.display = "block";
        // } else {
        //     makePrefectButton.nextElementSibling.style.display = "none";
        // }
        if (slytherinPrefects > 0 && makePrefectButton.textContent != 'Remove this student from Prefects') {
            slytherinPrefects--;
            makePrefectButton.textContent = "Remove this student from Prefects";
        } else if (makePrefectButton.textContent == 'Remove this student from Prefects') {
            slytherinPrefects++;
            makePrefectButton.textContent = "Make this student a Prefect";
        }
    }

    if (makePrefectButton.previousElementSibling.textContent == 'House: Ravenclaw') {
        if (ravenclawPrefects > 0 && makePrefectButton.textContent != 'Remove this student from Prefects') {
            ravenclawPrefects--;
            makePrefectButton.textContent = "Remove this student from Prefects";
        } else if (makePrefectButton.textContent == 'Remove this student from Prefects') {
            ravenclawPrefects++;
            makePrefectButton.textContent = "Make this student a Prefect";
        }
    }

    if (makePrefectButton.previousElementSibling.textContent == 'House: Gryffindor') {
        if (gryffindorPrefects > 0 && makePrefectButton.textContent != 'Remove this student from Prefects') {
            gryffindorPrefects--;
            makePrefectButton.textContent = "Remove this student from Prefects";
        } else if (makePrefectButton.textContent == 'Remove this student from Prefects') {
            gryffindorPrefects++;
            makePrefectButton.textContent = "Make this student a Prefect";
        }
    }

    if (makePrefectButton.previousElementSibling.textContent == 'House: Hufflepuff') {
        if (hufflepuffPrefects > 0 && makePrefectButton.textContent != 'Remove this student from Prefects') {
            hufflepuffPrefects--;
            makePrefectButton.textContent = "Remove this student from Prefects";
        } else if (makePrefectButton.textContent == 'Remove this student from Prefects') {
            hufflepuffPrefects++;
            makePrefectButton.textContent = "Make this student a Prefect";
        }
    }


}
