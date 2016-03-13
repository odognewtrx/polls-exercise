
  setupPage();

  // Set header text
  var hpanel = getHeader();
  hpanel.panel.append( $("<h1>").html( "Questions") );
  $("#page-header").append( hpanel.topdiv );

  setPromQL();
  setPromCounts();

  var dfdStep1 = $.Deferred();
  var promStep1 = dfdStep1.promise();

  $.when(promQL).done( function(quest_list) {
      if (quest_list.length > 0) {

          $("#explain-page").append( getExplain(1, "(Click entry to see details and vote)") );

          // generate question list panels
          for (var i in quest_list) {
              var quest = quest_list[i];
              var qpanel = getCenteredPanel( getPageDetailURL(quest.id), 10);

              // list panel contents
              var lst = $("<div>").append( $("<h4>").addClass("left").html(quest.question_text) )
                                  .append( $("<h5>").addClass("right")
						    .attr({ "id" : "asum-" + quest.id })
				         );
			  
              qpanel.panel.append( lst );
              $("#list-panels").append( qpanel.topdiv );
          }
      } else {
          $("#explain-page").append( getExplain(1, "No questions are available.") );
      }
      dfdStep1.resolve();
  });

  // Fill in the answer summaries
  $.when(promStep1).done( function() {
      $.when(promCounts).done( function(result, xtra) {
          for (var key in result) {
              if ( !result.hasOwnProperty(key) ) continue;
              $("#asum-" + result[key].question_id ).html( getAnswerSummary(result[key].answer_count) );
          }
      });
  });

  $.when(promQL).done( function(quest_list) {

      // Create buttons and hidden add question form
      cButAdd( { buttonText:"Add a New Question", buttonIcon:"plus", list_length: quest_list.length} );
      formAdd( {valName:"question", placeHolder:"New question here." } );

      // Configure the form submission handler
      $("#f-add").jSubmit( { url: getQuestionURL(0),
                             valName: "question",          // form field name
                             valJSON: "question_text",     // JSON field name
                             jdata : { "pub_date" : "" }   // extra required fields
                           });
  });


