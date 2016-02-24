
function doClick(e) {
    var target = e.delegateTarget;

    e.preventDefault();
    if ( e.data.hasOwnProperty('alert_txt') ) {
	alert( e.data.alert_txt );
    }

    var data;
    switch(e.data.name) {
	case "vote-plugin":
            data = JSON.stringify( { question_id: e.data.q_id,
	                             answer_id: $(target).data("a_id")} );
	    break;
    }

    if (data) {
        // alert( data );
        var ret = $.ajax({
                    url: e.data.url,
                    method: "POST",
                    data: data,
                    contentType: "application/json",
                    processData: false,
                    headers: {'Accept': 'text/html; q=1.0, */*'},
                });
            ret.always(function(data, textStatus, jqXHR) {
                    if ( textStatus == 'error' ) alert( JSON.stringify(data.statusText) );
                    location.reload(true);
            });
    }
}

function jsonSubmit(e) {

    var form = e.target;
    var context = e.data;

    var textval = form.elements[context.valName].value;
    var subdata = context.jdata;

    e.preventDefault();

    if (textval == null || textval == "") {
        alert("Form must be filled out");
        return false;
    }

    subdata[context.valJSON] = textval;

    if ( subdata.hasOwnProperty('pub_date') ) {
	var d = new Date();
	subdata.pub_date = d.toISOString();
    }
    
    var data = JSON.stringify( subdata ); // alert( data );
    var ret = $.ajax({
        url: context.url,
        method: "POST",
        data: data,
        contentType: "application/json",
        processData: false,
        headers: {'Accept': 'text/html; q=1.0, */*'},
    });
    ret.always(function(data, textStatus, jqXHR) {

        if ( textStatus == 'error' ) alert( JSON.stringify(data.statusText) );
        cButRestore();
        location.reload(true);
    });
}

function getButAdd(context) {
    return $("<a>").addClass("button radius success")
	           .attr( { "type"    :"button",
			    "onclick" :"newEntry()"
			  })
                   .html("<i class='fi-" + context.buttonIcon + "'> " + context.buttonText );
}


function cButAdd(context) {

    var button1 = $("<li>").attr({ "id"      : "b-add" })
                           .append( getButAdd(context) );

		             
    var button2 = $("<li>").attr({ "id"      : "b-submit" })
                           .append(
                          $("<a>").addClass("button radius success")
	                          .attr( { "type"    :"button",
			                   "onclick" :"cButSub()"
			                 })
                                  .html("<i class='fi-check'> Submit" )
		                  ).hide();
		             
    var button3 = $("<li>").attr({ "id"      : "b-cancel" })
	                   .append(
	                  $("<a>").addClass("button radius alert")
	                          .attr({
			                   "type"   : "button",
			                   "onclick": "cButRestore()"
			               })
	                          .html( "<i class='fi-x'> Cancel" )
	                         ).hide();

    // Optional top list.  Foundation grid: Buttons spaced 2 columns from left
    if ( context.list_length > 3) {
        $("#b-top")
	                .addClass("row")
	                .css({ "margin-left":0 })
		        .append(
            $("<div>").addClass("medium-2 columns").append($("<p>"))   // spacer
	                       )
		      .append(
            $("<div>").addClass("medium-10 columns")
		      .append( getButAdd(context) )
        );
    }

    // Foundation grid: Buttons spaced 2 columns from left
    $("#pnl-control")
	            .addClass("row")
	            .css({ "margin-left":0 })
		    .append(
        $("<div>").addClass("medium-2 columns").append($("<p>"))   // spacer
	                   )
		  .append(
        $("<div>").addClass("medium-10 columns")
		  .append(

            $("<ul>").addClass("button-group")
	             .append( button1, button2, button3 )
        )
    );
}

function formAdd(context) {

    /* Populate the submission form */

    var form_input = $("<textarea>").attr({
                                            "id"          : "t-area",
                                            "name"        : context.valName,
                                            "rows"        : "4",
                                            "placeholder" : context.placeHolder
					  });

    var form = $("<form>").attr({
                                   "id"    : "f-add",
				}).append( form_input );

    var formdiv = $("<div>").addClass("panel radius formpanel") //div_3
		            .css({ "background-color": "rgba(179, 217, 255, 0.3)" })
		            .append( form );

    // Foundation grid: form in center 8 columns
    $("#d-add").hide().append(
        $("<div>").addClass("row")   // div_1
		  .css({ "margin-left": 0 })
		  .append(

            $("<div>").addClass("medium-2 columns").append($("<p>"))  // spacer
	).append(    // to div_1
            $("<div>").addClass("medium-8 columns") // div_2
	              .append( formdiv )
        ).append(    // to div_1
            $("<div>").addClass("medium-2 columns").append($("<p>"))  // spacer
	)
    );
}

function newEntry() {

    /* Explain form */
    showExplain( "-rot" );

    $("#b-add").hide();
    $("#b-top").hide();

    $.when(
        $("#b-submit").fadeIn(125),  // show the submit button
        $("#b-cancel").fadeIn(125),  // show the cancel button
        $("#d-add").slideDown(250)
    ).done( function() {
	       $("#d-add")[0].scrollIntoView(true); 
	       $("#t-area").focus(); 
           });
}

function cButRestore() {

    clearExplain( "-rot" );

    $("#d-add").slideUp(250);
    $("#f-add")[0].reset();

    /* hide the submit and cancel buttons */
    $("#b-submit").hide();
    $("#b-cancel").hide();

    /* Restore the add button */
    $("#b-top").fadeIn(250);
    $("#b-add").fadeIn(250);
}

function cButSub() {
    $("#f-add").submit();
}

