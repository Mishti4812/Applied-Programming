s

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
function numToRating(i){
   return `&#8902;`.repeat(i);
}
function loadCourses(){
    var HTMLstring = "";
    var template = "";
    for (i=0;i<CourseDB.length;i++){
        HTMLstring = `<div class='cardcontainer'>
                                <div class='leftcard'>
                                        <img src='img/${CourseDB[i].pic}'>
                                </div>
                                <div class = 'middlecard'>
                                    <div class='flexcolumn'>
                                        <h2>${CourseDB[i].name}</h2>
                                        <div class='flexrow'>
                                            <div class='middlecard'>
                                                <p>${CourseDB[i].date}</p>
                                                <p>${CourseDB[i].instructor}</p>
                                                <p>${CourseDB[i].hours} Hours / ${CourseDB[i].lectures} Lectures </p>
                                            </div> 
                                            <div class='rightcard'>
                                                <h2>${CourseDB[i].price}</h2>
                                                <p class='ratingstars'>${numToRating(CourseDB[i].Rating)}</p>
                                                <p><button class='addtocart'>Enroll</button></p>
                                                
                                            </div>
                                        </div>
                                    </div>
                            </div></div>` + HTMLstring
    }
    document.getElementById('mainContent').innerHTML = HTMLstring;
    }
    
