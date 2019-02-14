// Globals //
username = '';
//
function mainload(){
    loadCourses('');
    document.getElementById('loggedInUser').value = username;
}

function sideNavToggle() {
    if (document.getElementById('sideNav').style.width == "200px"){
        document.getElementById('subNav').style.transition = "0.0s";
        document.getElementById('sideNav').style.transition = "0.0s";
        document.getElementById('subNav').style.width = "0";
        document.getElementById('sideNav').style.width = "0";
        //document.getElementById('mainContent').style.marginLeft = "10%";
        
    }
    else{
        document.getElementById('subNav').style.transition = "0.2s";
        document.getElementById('sideNav').style.transition = "0.0s";;
        document.getElementById('sideNav').style.width = "200px";
        //document.getElementById('mainContent').style.marginLeft = "12%";
    }
}
function subNavShow() {
        if(document.getElementById('subNav').style.width== "200px"){
            document.getElementById('subNav').style.width = "0";
            document.getElementById('courseMenuOption').style.color = '#FFFFFF';
            //document.getElementById('mainContent').style.marginLeft = "12%";
        }
        else{
            document.getElementById('courseMenuOption').style.color = '#ADD8E6'; 
            document.getElementById('subNav').style.width = "0";
            document.getElementById('subNav').style.width = "200px";
            //document.getElementById('mainContent').style.marginLeft = "22%";
        }
}

function clearNav(){
    document.getElementById('subNav').style.transition = "0.0s";
    document.getElementById('sideNav').style.transition = "0.1s";
    document.getElementById('sideNav').style.width = "0";
    document.getElementById('subNav').style.width = "0";

}
function numToRating(i){
   return `&#8902;`.repeat(i);
}
function loadCourses(category){
    var HTMLstring = "";
    for (i=0;i<CourseDB.length;i++){
        if (CourseDB[i].Category == category || category ==""){
            HTMLstring = `<div class='cardcontainer'>
            <div class='leftcard'>
                    <img src='img/${CourseDB[i].pic}'>
            </div>
            <div class = 'middlecard'>
                <div class='flexcolumn'>
                    <h2>${CourseDB[i].name}</h2>
                    <div class='flexrow'>
                        <div class='middlecard'>
                            <p><strong>Created:</strong> ${CourseDB[i].date}</p>
                            <p><strong>Instructor:</strong> ${CourseDB[i].instructor}</p>
                            <p>${CourseDB[i].hours} Hours / ${CourseDB[i].lectures} Lectures </p>
                        </div> 
                        <div class='rightcard'>
                        <p><button class='addtocart'>Enroll</button></p>
                            <p class='ratingstars'>${numToRating(CourseDB[i].Rating)}</p>
                            
                            
                        </div>
                    </div>
                </div>
        </div></div>` + HTMLstring
}
document.getElementById('mainContent').innerHTML = HTMLstring;
        }
        
    }
function searchCourses(textevent){
    var HTMLstring = "";
    var str = textevent.value.toString().toLowerCase();
    if (str == ""){
        loadCourses("");
        return;
    }
    if (str.length > 1){
        for (i=0;i<CourseDB.length;i++){
            if (CourseDB[i].name.toLowerCase().indexOf(str) >=0 ||CourseDB[i].Category.toLowerCase().indexOf(str) >= 0 ){
                HTMLstring = `<div class='cardcontainer'>
                <div class='leftcard'>
                        <img src='img/${CourseDB[i].pic}'>
                </div>
                <div class = 'middlecard'>
                    <div class='flexcolumn'>
                        <h2>${CourseDB[i].name}</h2>
                        <div class='flexrow'>
                            <div class='middlecard'>
                                <p>Created: ${CourseDB[i].date}</p>
                                <p>Instructor: ${CourseDB[i].instructor}</p>
                                <p>${CourseDB[i].hours} Hours / ${CourseDB[i].lectures} Lectures </p>
                            </div> 
                            <div class='rightcard'>
                            <p><button class='addtocart'>Enroll</button></p>
                                <p class='ratingstars'>${numToRating(CourseDB[i].Rating)}</p>
                               
                                
                            </div>
                        </div>
                    </div>
            </div></div>` + HTMLstring
            }
            document.getElementById('mainContent').innerHTML = HTMLstring;
        }
    }
}

function login(){

if (document.getElementById('username').value == ""|| document.getElementById('password').value == ""){
    alert("Username or Password incorrect!");
}
else{
    username = "test";
    window.location.href ='index.html';
}
}