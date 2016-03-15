
function setupPage() {

    promConfig().done( function(result, fields) {
        setTitle(fields);
        setupNav(fields);
    });
}

function getCSRFToken() { return $.cookie('csrftoken'); }

function getPageName() { return $("#pagename").text(); }

function getQuestionID() {
	var qnum = $("#questionnum");
	if ( qnum ) { return qnum.text(); }
	return "";
}

function getAnswerSummary(count) {
    var plur = "s";

    // count = 0 + count;
    if ( count == 1 ) { plur = ""; }
    return "" + count + " answer" + plur;
}

function setTitle(flds) {
    // Set the page title
    $("#page-title").text( flds.title );
}

function setupNav(flds) {

    var els = flds.nav_names.split(",");
    for (var i in els) {
	var icon_class = flds['nav' + els[i] + '_icon'];
	var nav_text = flds['nav' + els[i]];
	$("#nav-" + els[i]).html("<i class='" + icon_class + "'> " + nav_text );
    }
}

function getHeader( ) {
    var hpanel = getCenteredPanel(12);
    hpanel.topdiv.css({ "margin-top": "2em" });
    return hpanel;
}

// Create a page header for pages with question and number of answers as the header.
function getQuestionHeader( question, alst ) {
    var hpanel = getHeader();
    var q = question;

    hpanel.panel.append( $("<h2>").html( "<small>Question:  </small>") )
                .append( $("<h2>").html( q.question_text + "  <small>" + getAnswerSummary(alst) + "</small>") );

    return hpanel.topdiv;
}

