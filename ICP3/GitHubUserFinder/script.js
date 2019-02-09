function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    const url = "https://api.github.com/users";
    const connection = `${url}/${user}`;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.status == 404) {
            noSuchUser(user);
        } else if (xhr.status == 200 && xhr.readyState == 4) {
            showUser(xhr.response);
        }
    };

    xhr.open("GET", connection, true);
    xhr.send();
}
function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var profile = JSON.parse(user);

    const avatar = document.getElementById('avatar').innerHTML =
        `<img src=${profile.avatar_url}>`;

    const info_div = document.getElementById('information').innerHTML =
      `<p> Name: ${profile.name} </p>
      <p> ID: ${profile.id} </p>
      <p> Link: ${profile.url} </p>`;
}

function noSuchUser(user) {
    //3. set the elements such that a suitable message is displayed
    const error = document.getElementById('information').innerHTML = `<h1>${user} not found</h1>`;
    const avatar = document.getElementById('avatar').innerHTML = `<img src='crying.gif'>`;
}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            user = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(user);
        }
    })
});
