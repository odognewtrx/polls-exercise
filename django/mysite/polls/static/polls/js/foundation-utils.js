
function getWidths() {

    var lft;
    var mid;
    var rit;

    var args = arguments[0];

    if (args.length == 1) {
	mid = args[0];
	lft = (12 - mid)/2;
	rit = 12 - mid - lft;
    } else if (args.length == 2) {
	lft = args[0];
	mid = args[1];
	rit = 12 - mid - lft;
    } else if (args.length == 3) {
	lft = args[0];
	mid = args[1];
	rit = args[2];
    } else {
	lft = rit = 1;
	mid = 10;
    }
    return {lft:lft, mid:mid, rit:rit};
}

function getExplain() {

    var indent;
    var content;
    var expl = $("<div>");
    var pclass = "lead";  // add emphasis
    var wid;

    if ( arguments.length > 1) {
	indent = arguments[0];
	content = arguments[1];
    } else if ( arguments.length == 1) {
	indent = 2;
	content = arguments[0];
    } else {
	indent = 2;
	content = "";
    }
    
    wid = 12 - indent;
    
    expl.addClass("row")
	.css({ "margin-left" : 0 })
	.append(
                 $("<div>").addClass("medium-" + indent + " columns").append( $("<p>") )
	       )
	.append(
                 $("<div>").addClass("medium-" + wid + " columns")
		           .append( $("<p>").addClass( pclass )
					    .html(content)
				  )
	       );

    return expl;
}

function showExplain( tag )   { $( "#explain-" + tag ).show(); }

function clearExplain( tag )  { $( "#explain-" + tag ).hide(); }

function getCenteredPanel() {

    var div;
    var href;
    var w;
    var content;
    var dfltpanel;

    if ( arguments.length > 0 ) {
	if ( (typeof arguments[0]) == "string" ) {
		href = arguments[0];
		for (var i=0;i<arguments.length;i++) arguments[i]=arguments[i+1];
		arguments.length -= 1;
	}
    }

    // panel to append content
    dfltpanel = $("<div>").addClass("panel radius dfltpanel")
                         .css({ "overflow-x" : "auto" });
    if (href) {
        content = $("<a>").attr({ "href" : href })
		          .append( dfltpanel );
    } else {
        content = dfltpanel;
    }

    w = getWidths(arguments);

    div = $("<div>");
    div.addClass("row")
       .css({ "margin-left" : 0 });

    if (w.lft > 0) {
       div.append(
           $("<div>").addClass("medium-" + w.lft + " columns").append( $("<p>") )
       );
    }
	       
    div.append(
        $("<div>").addClass("medium-" + w.mid + " columns").append( content )
    );

    if (w.rit > 0) {
       div.append(
           $("<div>").addClass("medium-" + w.rit + " columns").append( $("<p>") )
       );
    }

    return { topdiv: div, content: content, panel: dfltpanel};
}


