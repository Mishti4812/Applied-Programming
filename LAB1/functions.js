// onload method for body of index - initial behavior is to load all courses
function mainload(){
    loadCourses('');
    //set logged in user
    document.getElementById('plainspan').innerText = "Logged in as:  James Jameson";
}

// main side nav toggle collapse (set width to 0 or shows)
function sideNavToggle() {
    if (document.getElementById('sideNav').style.width == "200px"){
        document.getElementById('subNav').style.transition = "0.0s";
        document.getElementById('sideNav').style.transition = "0.0s";
        document.getElementById('subNav').style.width = "0";
        document.getElementById('sideNav').style.width = "0";
         // Enable below to have nav push body content instead of overlap
        //document.getElementById('mainContent').style.marginLeft = "10%";
        
    }
    else{
        document.getElementById('subNav').style.transition = "0.2s";
        document.getElementById('sideNav').style.transition = "0.0s";;
        document.getElementById('sideNav').style.width = "200px";
         // Enable below to have nav push body content instead of overlap
        //document.getElementById('mainContent').style.marginLeft = "12%";
    }
}
//sub nav for course categories toggle (sets width to 0 or shows)
function subNavShow() {
        if(document.getElementById('subNav').style.width== "200px"){
            document.getElementById('subNav').style.width = "0";
            document.getElementById('courseMenuOption').style.color = '#FFFFFF';
            // Enable below to have nav push body content instead of overlap
            //document.getElementById('mainContent').style.marginLeft = "12%";
        }
        else{
            document.getElementById('courseMenuOption').style.color = '#ADD8E6'; 
            document.getElementById('subNav').style.width = "0";
            document.getElementById('subNav').style.width = "200px";
             // Enable below to have nav push body content instead of overlap
            //document.getElementById('mainContent').style.marginLeft = "22%";
        }
}

// hides any open navs, used when page outside of nav is clicked
function clearNav(){
    document.getElementById('subNav').style.transition = "0.0s";
    document.getElementById('sideNav').style.transition = "0.1s";
    document.getElementById('sideNav').style.width = "0";
    document.getElementById('subNav').style.width = "0";

}
//converts number of stars count (rating for course) to respective number of star symbols
function numToRating(i){
   return `&#8902;`.repeat(i);
}

// loads courses by category
function loadCourses(category){
    var HTMLstring = "";
    // for each item in the 'DB' (array of objects)
    for (i=0;i<CourseDB.length;i++){
        // each item is appended to the end of the existing HTML
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
// set main content  div to render above results
document.getElementById('mainContent').innerHTML = HTMLstring;
        }
        
    }

// search courses based on input text in search box (textevent is textchanged)
function searchCourses(textevent){
    var HTMLstring = "";
    var str = textevent.value.toString().toLowerCase();
    if (str == ""){
        loadCourses("");
        return;
        //if empty it loads all courses, e.g search bar is backspaced out all the way - an empty list  doesnt feel right
    }
    if (str.length > 1){
        // for each course in the array
        for (i=0;i<CourseDB.length;i++){
            //if the courses name or category match the search text, append it the HTML
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
            // set main content  div to render above results
            document.getElementById('mainContent').innerHTML = HTMLstring;
        }
    }
}

// similar to searchCourses() but since javasctipt doesnt support overloading, it was easiest to make a new method for a raw string (instead of text event)
function searchCoursesByString(str){
    var HTMLstring = "";
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
             // set main content  div to render above results
            document.getElementById('mainContent').innerHTML = HTMLstring;
        }
    }
}
// username and password can not be blank
//redirect user to homepage otherwise
function login(){

if (document.getElementById('username').value == ""|| document.getElementById('password').value == ""){
    alert("Username or Password incorrect!");
}
else{
    window.location.href ='index.html';
}
}

//render the account view into the main content div
// data is partially dummied here
function loadAccount() {
var user = AccountDB[0];
HTMLstring = `
<div class="accountCard">
    <h1 style="text-align:center;">Account Details</h1>
    <img class="accountcardimg" style="padding-top:10px;padding-left:10px;" src="img/accountpic.png">
    <h2 style="text-align:center;">${user.fullname}</h2>
    <p style="text-align:center;"> ${user.birthday}</p>
    <p style="text-align:center;">${user.email}</p>
    <p style="text-align:center;"> ${user.phone}</p> 
    <h2>Enrolled courses</h2>
    <ul class="enrolledcourselist">
        <li><a href="javascript:searchCoursesByString('intro to data')">Intro to Data Structures</a></li>
        <li><a href="javascript:searchCoursesByString('big data using')">Big Data Using Python</a></li>
        <li><a href="javascript:searchCoursesByString('video game design')">Video Game Design - Unreal Engine 4</a></li>
    </ul>
</div>`
 // set main content  div to render above HTML
document.getElementById('mainContent').innerHTML = HTMLstring;
}

//render the order history view into the main content div, also dummy data (not pulling from the data.js file)
function loadOrders() {
HTMLstring = ` 
<div class="accountCard noround">                                       
<div class="ordercard">
    <div style="text-align:center;"><img style="margin-top:10px;width:45%;height:45%;" src="img/python.png"/>                                                
        <h3>Order #123234</h3>
        <p>2/2/2019</p>
        <p>Big Data Using Python</p>
        <p>Status: Complete</p></div>
    </div>     
</div>
<div class="accountCard noround">                                       
<div class="ordercard">
    <div style="text-align:center;"><img style="margin-top:10px;width:45%;height:45%;" src="img/data.png"/>                                                
        <h3>Order #1678671</h3>
        <p>1/10/2019</p>
        <p>Intro to Data Structures</p>
        <p>Status: Complete</p></div>
    </div>     
</div>
<div class="accountCard noround">                                       
<div class="ordercard">
    <div style="text-align:center;"><img style="margin-top:10px;width:45%;height:45%;" src="img/vgdesign.png"/>                                                
        <h3>Order #0123627</h3>
        <p>11/15/2018</p>
        <p>Video Game Design - Unreal Engine 4</p>
        <p>Status: Complete</p></div>
    </div>     
</div> `
 // set main content  div to render above results
document.getElementById('mainContent').innerHTML = HTMLstring;
}