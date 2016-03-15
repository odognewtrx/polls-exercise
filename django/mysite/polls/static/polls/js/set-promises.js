/*
   Promises are used to launch ajax requests for data and execute callbacks when
   results are available.
   
   Functions defined here return a promise so execute callback like this:
   promXxx().done( function(args) {}).

   Some promise functions require question id as an argument.

   Default calback arg is the ajax result but in some cases extra data is added
   to be available in additional callback args.

   Promises allow independent done callbacks to depend on the same access without
   making multiple ajax calls.
*/

_promConfig = null;	// Configuration data JSON
_promQL = null;         // Question list JSON
_promQuest = null;      // Single question JSON
_id = null;             // remember current id for the promise
_promAnswers = null;    // Single answer list JSON
_promCounts = null;     // answer count for each question

// Get page configuration info that is stored in database object
function promConfig() {
    if ( _promConfig ) return _promConfig;

    // Nest ajax access inside outer promise so that a simpler field name to value
    // mapping object can be created and supplied to the resolve().
    var dfd = $.Deferred();
    _promConfig = dfd.promise();

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
    return _promConfig;
}

// Full question list, resolve with simple result
function promQL() {
   if ( _promQL == null ) _promQL = $.get( getIndexURL() );
   return _promQL;
}

// Question for id, resolve with simple result
function promQuest(id) {
   if ( (_promQuest == null) || (_id != id) ) _promQuest = $.get( getQuestionURL(id) );
   _id = id;
   return _promQuest;
}

// Answer list for single question
function promAnswers(id) {  // arg is single question promise
    if ( _promAnswers ) return _promAnswers;
	
    // Nest ajax access inside outer promise so that the question object can be
    // added to the resolve().
    var dfd = $.Deferred();
    _promAnswers = dfd.promise();

    $.ajax({  url: getAnswersURL(id),
	      dfd: dfd,
              success: function (result) {
		            this.dfd.resolve(result);
	               },
              error: function () {
		            this.dfd.resolve([]);
		       }
    });

    return _promAnswers;
}

// Answer count for each question.
function promCounts() {
    if ( _promCounts ) return _promCounts;

    var dfd = $.Deferred();
    _promCounts = dfd.promise();
    $.ajax({  url: getAnswerCountsURL(),
              dfd: dfd,
	      success: function (result) {
		           this.dfd.resolve(result, {});
		       },
              error: function () {
		           this.dfd.resolve(result, { error: "Get failed" });
		       }

    });

    return _promCounts;
}

