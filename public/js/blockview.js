var blocks = document.getElementById("hidden-data");
var obj = JSON.parse(blocks.innerHTML);
console.log(obj[0].stateHash)
var i = 0, howManyTimes = 10;
var q = document.createElement("div");
q.className="row";
function loadCards() 
{     
  var w = document.createElement("div");
  w.className="col s6 m2 l3";
  q.appendChild(w);
  var e = document.createElement("div");
  e.className="card blue-grey darken-1";
  w.appendChild(e);
  var r = document.createElement("div");
  r.className="card-content white-text";
  e.appendChild(r);
  var para = document.createElement("code");
  para.className = "show_details";
  var content = document.createTextNode("Block"+ (i+1));
  r.appendChild(para);
  para.appendChild(content);
  document.getElementById("mypara").appendChild(q);
  var hoverDetails = document.createElement("code");
  r.appendChild(hoverDetails);
  hoverDetails.id = i;
  hoverDetails.className = "hidden-details";
  var contentx = document.createTextNode(JSON.stringify(obj[i], null, "\t"));
  console.log(JSON.stringify(obj[i], null, "\t"));
  hoverDetails.appendChild(contentx);

  i++;
    if( i < howManyTimes ){
        setTimeout( loadCards, 100 );
    }
}


