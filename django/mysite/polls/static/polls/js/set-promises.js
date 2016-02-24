/*
   Promises are used to launch ajax requests for data and execute callbacks when
   results are available using $.when( promXxx ).done( function(args) {}).

   Default calback arg is the ajax result but in some cases extra data is added
   to be available in additional callback args.

   Promises allow independent when/done callbacks to depend on the same access without
   making multiple ajax calls.

   The protocol for using a promise defined here is to execute the setPromXxx()
   function first to initialize the global and then use $.when( promXxx ).done().
*/

promConfig = null;	// Configuration data JSON
promQL = null;          // Question list JSON
promQuest = null;       // Single question JSON
promAnswers = null;     // Single answer list JSON
promCounts = null;      // answer count for each question

function setPromConfig() {
   // Nest ajax access inside outer promise so that a simpler field name to value
   // mapping object can be created and supplied to the resolve().
   if ( promConfig == null ) {
        var dfd = $.Deferred();
        promConfig = dfd.promise();

        $.ajax({  url: getConfigURL(),
	          dfd: dfd,
		  success: function (result) {
			      var jsonFLDS = {};
                              for (var i in result) {
                                  var cobj = result[i];
                                  jsonFLDS[cobj.field_name] = cobj.field_text;
                              }
		              this.dfd.resolve(result, jsonFLDS);
			   },
		  error: function (result) {
		              this.dfd.resolve(result, {}); // should communicate error to browser
		           }
		       });
   }
}

// Full question list, resolve with simple result
function setPromQL() {
   if ( promQL == null ) promQL = $.get( getIndexURL() );
}

// Question for id, resolve with simple result
function setPromQuest(id) {
   if ( promQuest == null ) promQuest = $.get( getQuestionURL(id) );
}

// Answer list for single question
function setPromAnswers(pq) {  // arg is single question promise
	
    // Nest ajax access inside outer promise so that the question object can be
    // added to the resolve().
    if ( promAnswers == null ) {
        var dfd = $.Deferred();
        promAnswers = dfd.promise();

        $.when(pq).done( function(quest) {
                $.ajax({  url: getAnswersURL(quest.id),
			  question: quest,
			  dfd: dfd,
		          success: function (result) {
		                      this.dfd.resolve(this.question, result);
				   },
		          error: function () {
		                      this.dfd.resolve(this.question, []);
				   }

		       });
        });
    }
}

// Answer count for each question.
function setPromCounts() {
	
    // Nest ajax access inside outer promise so that a simple mapping of
    // question id to answer count can be added to the resolve().
    if ( promCounts == null ) {
        var dfd = $.Deferred();
        promCounts = dfd.promise();
        $.ajax({  url: getAnswerCountsURL(),
		  dfd: dfd,
		  success: function (result) {
			       var countmap = {};
			       for (var i in result) {
				   var qres = result[i];
				   countmap[qres.question_id] = qres.answer_count;
			       }
		               this.dfd.resolve(result, countmap);
		           },
		          error: function () {
		               this.dfd.resolve(result, { error: "Get failed" });
		           }

		});

    }
}

promAL = null;          // Array of answer list JSON promises, key is question ID
readyAL = null;         // promise to wait for promAL to be initialized

// Answer lists for all questions (was used at first then replaced by promCount access).
function setPromAL( pql ) {  // arg is question list promise
    if ( readyAL == null ) {
        var rdfd = $.Deferred();
        readyAL = rdfd.promise();

        promAL = {};
        $.when(pql).done( function(quest_list) {

	    // Load an array with promises that resolve when answer
	    // lists are received. Add the question to the done callback.
            for (var j in quest_list ) {
		var quest = quest_list[j];
		var qid = quest_list[j].id;
		var dfd = $.Deferred();

                promAL[qid] = dfd.promise();

                $.ajax({  url: getAnswersURL(qid),
			  question: quest,
			  dfd: dfd,
		          success: function (result) {
		                      this.dfd.resolve(this.question, result);
				   },
		          error: function () {
		                      this.dfd.resolve(this.question, []);
				   }

		       });
            }
	    rdfd.resolve();
        });
    }
}

