
  setupPage();

  promQuest( getQuestionID() ).done( function(question) {
      promAnswers( question.id ).done( function(ans_list) {

          $("#page-header").append( getQuestionHeader( question, ans_list.length ) );

          // generate explain
          if (ans_list.length > 0) {
              $("#explain-results").append( getExplain("(Click table to Vote.)") );
          } else {
              $("#explain-results").append( getExplain("No answers for this question yet.") );
          }

          // generate table

          var apanel = getCenteredPanel(getPageDetailURL(), 8);   // table container with link back to detail page

          // table div and row elements
          var tbl = $("<div>");
          var thead = $("<thead>");
          var tbody = $("<tbody>");
      
          // Header rows
          thead.append( $("<tr>").append( $("<th>").text("Answer") )
                                 .append( $("<th>").text("Votes")  )
	                );

          // Data rows
          for (i in ans_list) {
                ans = ans_list[i];
	        tbody.append( $("<tr>").append( $("<td>").html( ans.choice_text ) )
	                               .append( $("<td>").text( ans.votes ) )
		            );
          }

          // Add table within link back to vote page to table div
          tbl.append( $("<table>").append(thead, tbody) );

          apanel.panel.append( tbl );         // add table to container
          $("#rtable").append( apanel.topdiv );  // add container to html
      });
  });

