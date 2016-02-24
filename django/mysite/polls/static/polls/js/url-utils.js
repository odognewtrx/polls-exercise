
function getPageIndexURL() { return '/'; }
function getPageDetailURL() {
	var id;
	if ( arguments.length == 1) { id = arguments[0]; }
	else { id = getQuestionID(); }
	if ( id ) { return "/" + id + "/"; }
	return "#";
}
function getPageResultsURL() {
	var id = getQuestionID();
	if ( id ) { return "/" + id + "/results/"; }
	return "#";
}

function getConfigURL() { return '/' + getPageName() + '/gcfg.json' ; }
function getIndexURL() { return '/jindex.json'; }
function getQuestionURL(pk) { return '/' + pk + '/quest.json'; }
function getAnswersURL(quest_pk) { return '/' + quest_pk + '/answers.json'; }
function getVoteURL() { return "/jvote.json"; }
function getAnswerCountsURL() { return "/count.json"; }

