import './App.css';
import { HolidayAPI } from 'holidayapi';
import axios from 'axios';

const currDate = new Date();

function addToHtml(add){
  document.getElementById("todaysHd").innerHTML = "<h2>Today's Holiday :</h2>"+add;
}

function fetchHoliday(month,date)
{
 axios.get("https://holidayapi.com/v1/holidays?pretty&key=7cfe185c-1544-4371-9b97-5d4babd3d097&country=IN&month="+month+"&day="+date+"&year=2019").then(function (response) {
    // handle success
    // console.log(response.data);
    if(response.data.holidays.length !== 0)
    {
      var hdlist = response.data.holidays;
      addToHtml(hdlist[0].name);
    }
    else{
      addToHtml("Sorry, No holiday today :( ");
    }
});
}

function fetchThisMonthHd(month)
{
  var html="";
  axios.get("https://holidayapi.com/v1/holidays?pretty&key=7cfe185c-1544-4371-9b97-5d4babd3d097&country=IN&month="+month+"&year=2019").then(function (response) {
    // handle success
    // console.log(response.data);
    var hdlist = response.data.holidays;
    
    hdlist.forEach(function (hd){
      html += '<li class=" list-group-item d-flex justify-content-between align-items-center">'+hd.name+ '<span class="badge badge-danger badge-pill">' +hd.date +' </span></li>';
      
    });
    document.getElementById("holidays").innerHTML = html;
  });
}

function fetchGreetings(hd){
  var html="";
  axios.get("/api/v1/"+"christmas").then(function(response){
    var greeting = response.data.greetings;
    html+='<button onClick="window.location.reload();" class="btn btn-danger" >Get Different Greetings</button>'
     html += '<h2 class="share" >Share Greetings with your friends and family</h2>';
    greeting.forEach(function(g){
        html+='<li>'+g+'</li><br><br>';
    });
  document.getElementById("greetings").innerHTML = html;
  });
}

function fetchEcards(hd){
  var html="";
  axios.get("/api/v1/"+hd).then(function(response){
    var images = response.data.cardUrls;
    html+='<button onClick="window.location.reload();" class="btn btn-danger" >Get Different Ecards</button>'
    
    html += '<h2 class="share" >Share Ecards with your friends and family</h2>';
    images.forEach(function (i) {
      
        html+='<li><img src="'+i+'" width="200" height="200"></li><br><br>';
    });
  document.getElementById("image").innerHTML = html;
  });
}

function fetchRecipe(hd){
  var html="";
  axios.get("https://api.edamam.com/search?app_id=88173303&app_key=5ca8f53bc027a3581bfa4d44343ecbc9&q="+hd+"&from=0&to=3").then(function (response) {
    // handle success
    // console.log(response.data);
    var recipes = response.data.hits;
    
    // console.log(recipes);
    recipes.forEach(function (recipe){

      html+='<h4>'+recipe.recipe.label+'</h4><div class="recipe"><img className="recipeImg" src='+recipe.recipe.image+' width="200" height="200"><a class="btn btn-danger recipeLink" target="_blank" href="'+recipe.recipe.shareAs+'">Recipe</a></div>';
    });
    // console.log(html);
    document.getElementById("food").innerHTML = html;
  });
}

const Today = () => {
  fetchHoliday(currDate.getMonth()+1,currDate.getDate()+1);  
  return(
    <section className="today">
      
      <div id="todaysHd">
           
      </div>

    </section>
  );
}

const ThisMonth = () =>{
  fetchThisMonthHd(currDate.getMonth()+1);
  return (
    <div >
      <h1 className="upcomhol">Upcoming holidays</h1>
    <section id="holidays" className="list-group-flush">
      </section>
      </div>
  )
}

const Recipe = () =>{
  fetchRecipe("Christmas");
  return (
    <div>
      <h1 className="upcomhol">Holiday Recipe's  <i class="fas fa-utensils"></i></h1>
      <section id="food">
    </section>
    </div>
  );
}

const Heading = () =>{
  return (
    <section className="header">
      <h1><i class="fas fa-snowman"></i> Here for the holidays  <i class="fas fa-candy-cane"></i> </h1>
    </section>
  );
}

const Greetings = () =>{
  fetchGreetings("christmas");
  return (
    <div>
      <h1 className="upcomhol">Greetings  <i class="fas fa-handshake"></i></h1>
    <section className="greetings" id="greetings">

    </section>
    </div>
  );
}

const Ecards = () =>{
  fetchEcards("christmas");
  return (
    <div>
      <h1 className="upcomhol">Ecards <i class="fad fa-gift-card"></i></h1>
    <section className="ecards" id="image">
               
    </section>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div class="snowflakes" aria-hidden="true">
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    </div>  
      <Heading></Heading>
      <Today></Today>
      <div className="grid2">
        <Greetings></Greetings>
        <Ecards></Ecards>
      </div>
      <div className="grid">
        <Recipe></Recipe>
        <ThisMonth></ThisMonth>
      </div>
    </div>
  );
}

export default App;
