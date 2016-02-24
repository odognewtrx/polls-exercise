
setPromQuest( getQuestionID() );
setPromAnswers( promQuest );

// Add modal dialog. Must be done outside of callback.
// When panel is clicked, vote info will be attached to the modal text and
// the button. When "Vote!" button is clicked, a handler will use data to
// submit vote.
$("body").append( 
    $("<div>").addClass("reveal-modal tiny")
              .attr({ "id" : "myModal",
		      "data-reveal": "" }) 
              .append( $("<h4>").addClass("subheader")
			        .text("Confirm Vote for:")  )
              .append( $("<h3>").attr({ "id" : "mmchoice"})  )
              .append( $("<button>").addClass("button small")
				    .attr({"type" : "button",
					   "id"   : "m-submit" })
			            .append( $("<b>").html("Vote!"))
		                 )
              .append( $("<a>").addClass("close-reveal-modal").html("x")  )
);

setupPage();


$.when( promAnswers ).done( function(question, answer_list) {
      var qid = question.id;

      // Set header text
      $("#page-header").append( getQuestionHeader( question, answer_list.length ) );

      if ( answer_list.length > 0 ) {
	  $("#explain-page").append( getExplain(1, "(Click to Vote for answer.)") );
      } else {
	  $("#explain-page").append( getExplain(1, "Sorry, no answers for this question yet.") );
      }

      // Create the panels
      for (var i in answer_list) {

	  var answer = answer_list[i];
	  var apanel = getCenteredPanel(10);
	  var plur = "s";
	  var lst;

          // list panel contents
	  if (answer.votes == 1) plur = "";
          lst = $("<div>").append( $("<h4>").addClass("left").html(answer.choice_text) )
                          .append( $("<h5>").addClass("right")
			                    .html( answer.votes + " vote" + plur)
				 );

          apanel.panel.append( lst );

	  // Make panel be clickable and store info for the modal
	  apanel.panel.css({ "cursor" : "pointer" });
	  apanel.panel.data( "a_id", answer.id );
	  apanel.panel.data( "text", answer.choice_text );
	  apanel.panel.click( function () {

	      // Put this vote info in button data
	      $("#m-submit").data( "a_id", $(this).data("a_id") );

	      // Put this answer text in the modal
	      $("#mmchoice").html( $(this).data("text") );

	      // Trigger the modal
	      $("#mmtrig").click();
	  });

          $("#list-panels").append( apanel.topdiv );
      }

      // Create the modal trigger
      if ( answer_list.length > 0 ) {

	  // Add modal trigger
          $("body").append( $("<a>").attr({ "id" : "mmtrig",
			                    "data-reveal-id": "myModal" })
			  );
      }

      // Create the buttons and the hidden form
      cButAdd( {buttonText:"Add a New Answer", buttonIcon:"plus", list_length: answer_list.length} );
      formAdd( {valName:"answer", placeHolder:"New answer here."} );

      // Create a submit handler for the add answer form
      $("#f-add").jSubmit( { url: getAnswersURL(qid),
	                      valName: "answer",          // form field name
	                      valJSON: "choice_text",     // JSON field name
	                      jdata : { }                 // extra required fields
			   });

      // Create a click handler for the Vote! button
      $("#m-submit").bClick({ name: "vote-plugin",
	                      url : getVoteURL(),
                              q_id: qid
                            });

});


