
    var blocks = document.getElementById("hidden-data");
    
    var obj = JSON.parse(blocks.innerHTML);

      var i = 0, howManyTimes = 10;
      var q = document.createElement("div");
      q.className="row";
      function displayBlocks() 
      {   
         var w = document.createElement("div");
         w.className="col s6 m2";
         q.appendChild(w);
         var e = document.createElement("div");
         e.className="card blue-grey darken-1";
         w.appendChild(e);
         var r = document.createElement("div");
         r.className="card-content white-text";
         e.appendChild(r);
         var para = document.createElement("p");
         var content = document.createTextNode(obj[i].stateHash);
         r.appendChild(para);
         para.appendChild(content);
         document.getElementById("mypara").appendChild(q);
         
         i++;
          if( i < howManyTimes ){
               setTimeout( displayBlocks, 500 );
          }
      }
