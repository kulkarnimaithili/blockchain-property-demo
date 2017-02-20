$(document).ready(function() {
	var blocks = JSON.parse($("#hidden-data").text());
    blocks.sort(function(a, b){
        //console.log(a.nonHashData.localLedgerCommitTimestamp.seconds+"******"+b.nonHashData.localLedgerCommitTimestamp.seconds);
        return a.nonHashData.localLedgerCommitTimestamp.seconds - b.nonHashData.localLedgerCommitTimestamp.seconds;
    });
    //blocks.nonHashData.localLedgerCommitTimestamp
	var row = document.createElement("div");
    row.className = "row";                                      // Chain
    var i;
    for(i = 0; i < blocks.length; i++) {
        var block = document.createElement("div");              // Block
        block.className = "col-md-1 ttip";
        var x = i + 1;
        var blocktext = document.createTextNode("B"+ x);
        block.appendChild(blocktext);
        var code = document.createElement("div");               // BlockDetails
        code.className = "ttiptext";
        if(blocks[i].transactions) {                            // transactions not null
            var d = new Date(blocks[i].transactions[0].timestamp.seconds * 1000);   // Convert Unix timestamp to JS Date
            var transdate = code.appendChild(document.createElement("p"));
            var transtype = code.appendChild(document.createElement("p"));
            var ccid = code.appendChild(document.createElement("p"));
            var payload = code.appendChild(document.createElement("p"));
            transdate.appendChild(document.createTextNode("Created:\t" + d.toString() +""));
            transtype.appendChild(document.createTextNode("Type:\t" + blocks[i].transactions[0].type));
            ccid.appendChild(document.createTextNode("CCID:\t" + blocks[i].transactions[0].chaincodeID));
            payload.appendChild(document.createTextNode("Payload:\t" + blocks[i].transactions[0].payload));
        } else {
            var d = new Date(blocks[i].nonHashData.localLedgerCommitTimestamp.seconds * 1000);      // Date in non transactional block
            var transdate = code.appendChild(document.createElement("p"));
            transdate.appendChild(document.createTextNode("Created:\t" + d.toString() +""));
        }
        block.appendChild(code);
        row.appendChild(block);
    }
    document.getElementById("blockview").appendChild(row);
    $(".ttip").click(function() {
        $(this).find(".ttiptext").toggleClass("show");
    });
});
