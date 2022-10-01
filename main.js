const tableMovie = document.getElementsByClassName("table-movie");
const movieElements = tableMovie[0].getElementsByTagName("tr");

var movies = new Array();

for (let i = 0; i < movieElements.length; i++) {
    const movieInfo = movieElements[i].getElementsByTagName("td");
    if (!movieInfo[1]) continue;
    movies.push({
        "og-info": movieElements[i].innerHTML,
        "name": movieInfo[0].getElementsByTagName("a")[0].innerHTML,
        "jump-count": movieInfo[3].innerHTML,
        "jump-rating": movieInfo[4].innerHTML,
    });
}

function compareName(x, y) {
    if (x_new == y_new) return 0;
    return (Number(x_new > y_new) - 0.5) * 2;
}

function compareNumber(x,y) {
    return -(Number(x["jump-count"]) - Number(y["jump-count"])) / Math.abs(Number(x["jump-count"]) - Number(y["jump-count"])) | 0;
}

function compareRating(x,y) {
    return -(Number(x["jump-rating"]) - Number(y["jump-rating"])) / Math.abs(Number(x["jump-rating"]) - Number(y["jump-rating"])) | 0;
}

function sortTable() {
    const currentSortby = document.getElementById("sortby");
    if (currentSortby.value == "n") movies.sort(compareName);
    else if (currentSortby.value == "j") movies.sort(compareNumber);
    else if (currentSortby.value == "r") movies.sort(compareRating);

    console.log(movies);

    for (let i = 0, j = 0; i < movieElements.length; i++) {
        const movieInfo = movieElements[i].getElementsByTagName("td");
        if (!movieInfo[1]) continue;
        movieElements[i].innerHTML = movies[j]["og-info"];
        j++;
    }
}

const sortDiv = document.createElement("div");

const sortby = document.createElement("select");
sortby.id = "sortby";
sortby.setAttribute("onchange", "sortTable();");

const sortname = document.createElement("option");
sortname.innerHTML = "Name";
sortname.value = "n";

const sortjump = document.createElement("option");
sortjump.innerHTML = "Number of jumpscares";
sortjump.value = "j";

const sortrating = document.createElement("option");
sortrating.innerHTML = "Jumpscare rating";
sortrating.value = "r";

//const sortbutton = document.createElement("button");
//sortbutton.type = "button";
//sortbutton.innerHTML = "Sort";
//sortbutton.classList.add("menu-item", "menu-item-type-post_type", "menu-item-object-page");

sortby.append(sortname);
sortby.append(sortjump);
sortby.append(sortrating);

sortDiv.append(sortby);
//sortDiv.append(sortbutton);

const entry = document.getElementsByClassName("entry-content")[0];
entry.children[0].innerHTML = "<h2>Sort by </h2>" + sortDiv.outerHTML;