import './App.css';
import { HolidayAPI } from 'holidayapi';
import axios from 'axios';


const currDate = new Date();
// const holidaykey = '';
const recipeAppId = '';
const recipeAppKey= '';
function addToHtml(add){
  document.getElementById("todaysHd").innerHTML = add;
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
    console.log(response.data);
    var hdlist=response.data.holidays;
    hdlist.forEach(function (hd){
      html+='<li>'+hd.name+'    '+hd.date+'</li>';
    });
    document.getElementById("holidays").innerHTML += html;
  });
}


function fetchGifts(){
  var html="";
  var list = ["For the brunch addict: Dash Mini Waffle Maker",
              "For the pet owner: Pooch Selfie",
              " For the couple: A custom portrait",
              "For the person who's always cold: The Comfy(Half Blanket, Half Hoodie)",
              "For the true crime junkie: Hunt A Killer",
              "For the bookworm: 100 Books Scratch-Off Poster",
              "For the adventurer: National Parks Pass",
              "For the one who's still working remotely: A work from home survival kit",
              "For the person who's always on their phone: PhoneSoap Phone Sanitizer ",
              "For the one who loves game night: What Do You Meme?",
              "For the eco-conscious one: FinalStraw",
              "For the homeowner: Monogram nails",
              "For the person who needs a massage: Shiatsu Back and Neck Massager",
              "For the aspiring plant parent: A live plant from The Sill",
              "For the person who likes their beauty sleep: Slip Silk Pillowcase",
              "For the one who enjoys a hot cuppa: Manatea Tea Infuser",
              "For the dog-obsessed: Anthropologie Dog Dessert Plates",
              "For the one who needs coffee 24/7: Ember Temperature Control Smart Mug",

              //Office
              "For the one with perfect makeup: Mario Badescu Facial Spray",
              "For the one with who loves hot coffee: Zojirushi Stainless Steel Mug",
              "For the one who goes through a lot of tissues: Como Trash Bin",
              "For the one who is way too into candles: Diptyque Feu de Bois Candle",
              "For the one who's always up for happy hour: Corkcicle Insulated Wine Tumbler",
              "For the one who always gets caught in the rain: Davek Solo Umbrella",
              "For the one who invites you to lunch: Smoko Dumpling Light",
              "For the one who remembers to pack lunch: Monbento Original Bento Box",
              "For the one complaining about dry skin: Airomé Serenity Medium Diffuser",
              "For the one with too much stuff to carry: Baggu Standard Reusable Shopping Bag",
              "For the one who's always cold: DII Rustic Farmhouse Cotton Chevron Blanket Throw",
              "For the one with a major sweet tooth: Cheryl's Happy Holidays Gift Tin"
            ];
            console.log(list[0]);
  for(var i=0;i<3;i++)
  {
    var x = Math.random()*list.length;
    console.log(x);
    html+='<li>'+list[Math.floor(x)]+'</li>';
  }
  console.log(html); 
  document.write(html);
}

function fetchRecipe(hd){
  var html="";
  axios.get("https://api.edamam.com/search?app_id=538072c6&app_key=322124791ed2485a3848caa340c429c2&q="+hd+"&from=0&to=3").then(function (response) {
    // handle success
    console.log(response.data);
    var recipes=response.data.hits;
    console.log(recipes);
    recipes.forEach(function (recipe){
      html+='<div className="recipe"><div className="recipeLabel">'+recipe.recipe.label+'</div><div className="recipeLink"><a src="'+recipe.recipe.shareAs+'">Recipe</a></div></div>';
    });
    console.log(html);
    document.getElementById("food").innerHTML += html;
  });
}

const Gift = () =>{
  fetchGifts();
  return(
    <section id="gifts">
      {fetchGifts()}
    </section>
  );
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
  return(
    <section id="holidays">
    </section>
  )
}

const Recipe = () =>{
  // fetchRecipe(hdlist[0].name);
  fetchRecipe("Christmas");
  return (
    <section id="food">

    </section>
  );
}

const Heading = () =>{
  return (
    <section className="header">
      <h1>Here for the holidays</h1>
    </section>
  );
}

function App() {
  return (
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

      <div className="App">
        
      <Heading></Heading>
      <Today></Today>
      <ThisMonth></ThisMonth>
      <Gift></Gift>
      <Recipe></Recipe>
      </div>
      </div>
  );
}

export default App;