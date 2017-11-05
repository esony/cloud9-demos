const url = "https://randomuser.me/api";

// const btn = document.querySelector("button");
// btn.addEventListener("click", () => {
//     fetch(url)
//     .then((res) => {
//         console.log("CLICK")
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// });

$("#next-btn").css("cursor", "pointer");

$("#next-btn").click(() => {
    newUser();
});

function newUser() {
    $.getJSON(url)
    .done((data) => {
        console.log(data);
        let fullname = data.results[0].name.first + " " + data.results[0].name.last;
        $("#name").text(fullname);
        let nickname = data.results[0].login.username;
        $("#nick").text(nickname);
        let email = data.results[0].email;
        $("#email").text(email);
        let location = data.results[0].location.city + ", " 
            + data.results[0].location.state;
        $("#location").text(location);
        let phone = data.results[0].cell;
        $("#phone").text(phone)
        let picture = data.results[0].picture.large;
        $("#avatar-pic").attr("src", picture);
    });
}