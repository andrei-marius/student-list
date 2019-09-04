const template = document.querySelector("template").content;
const main = document.querySelector("main");
const studentList = "http://petlatkea.dk/2019/students1991.json";

/* fetches the data from the link*/
function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data));
}

let ravenClass = [];

/* shows the fetched data */
function show(data) {
    // console.log(data);
    data.forEach(element => {
        let clone = template.cloneNode(true);
        clone.querySelector("#name").textContent = "Name: " + element.fullname;
        clone.querySelector("#house").textContent = "House: " + element.house;
        main.appendChild(clone);

        /*let btn = clone.querySelector("#myBtn");
        let modal = clone.querySelector("#myModal");

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
        }*/

    });

    /* filtering functions */
    const allStudents = data.filter(function (showAll) {
        return showAll.house == `Ravenclaw`, `Hufflepuff`, `Gryffindor`, `Slytherin`;
    });

    const ravenclawStudents = data.filter(function (byRavenclaw) {
        return byRavenclaw.house == `Ravenclaw`;
    });

    const hufflepuffStudents = data.filter(function (byHufflepuff) {
        return byHufflepuff.house == `Hufflepuff`;
    });

    const gryffindorStudents = data.filter(function (byGryffindor) {
        return byGryffindor.house == `Gryffindor`;
    });

    const slytherinStudents = data.filter(function (bySlytherin) {
        return bySlytherin.house == `Slytherin`;
    });

    // console.log(ravenclawStudents);
    // console.log(hufflepuffStudents);
    // console.log(gryffindorStudents);
    // console.log(slytherinStudents);
    // console.log(allStudents);


    /* sorting functions */
    function sortByName(a, b) {
        const fullnameA = a.fullname.toUpperCase();
        const fullnameB = b.fullname.toUpperCase();

        let sorting = 0;
        if (fullnameA > fullnameB) {
            sorting = 1;
        } else if (fullnameA < fullnameB) {
            sorting = -1;
        }
        return sorting;
    }

    data.sort(sortByName);


    function sortByHouse(a, b) {
        const houseA = a.house.toUpperCase();
        const houseB = b.house.toUpperCase();

        let sorting = 0;
        if (houseA > houseB) {
            sorting = 1;
        } else if (houseA < houseB) {
            sorting = -1;
        }
        return sorting;
    }

    data.sort(sortByHouse);

}
loadData(studentList);


function showMore() {
    /* missing info for the modal */
}
