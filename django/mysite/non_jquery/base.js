
function getConfigURL(page) { return '/' + page + '/gcfg.json' ; }
function getCSRFToken() { $.cookie('csrftoken'); }

function getConfig( page, jCallback ) {
    // Ajax intelligent get()
    $.get( getConfigURL(page), function(result){
        var i;
        var jsonFLDS = {};
        for (i in result) {
            var cobj = result[i];
            jsonFLDS[cobj.field_name] = cobj.field_text;
        }
        jCallback(result, jsonFLDS) ;
    });
}

function setupNav() {

    getConfig( 'site', function(results, fields) {

        var els = fields.nav_names.split(",");
        for (var i in els) {
	    var el = els[i];
	    var nav = document.getElementById( 'nav-' + el );
            if ( nav ) {
                var navi = document.createElement("i");
                var navt = document.createTextNode( " " + fields['nav' + el] );
                navi.setAttribute("class", fields['nav' + el + '_icon'] );
                nav.appendChild(navi);
                nav.appendChild(navt);
            }
        }
    });
}

function setTitle(page) {

    getConfig( page, function(results, fields) {
	var bel = document.getElementById( 'page-branding' );

	// Set the branding only if the id still exists and only with value 
	// specific to page, otherwise use title
	if (bel) {
	    var branding;
            for (i in results) {
                var cobj = results[i];
                if (cobj.field_name == 'branding') {
                    branding = (cobj.page_name == page) ? cobj.field_text : fields.title;
	        }
            }
            bel.innerHTML = branding;
	}

	document.getElementById( 'page-title' ).innerHTML = fields.title;
    });
}

function listPanel( context ) {

   /* context :  {numID:"", href:"", leftText:"", rightText:"" }  */

   // row with 3 columns, panel in middle column
   var divr = document.getElementById( "list-panel-" + context.numID );
     var divc1 = document.createElement("div");
     var divc2 = document.createElement("div");
       var aurl = document.createElement("a");
         var divp = document.createElement("div");
           var hleft = document.createElement("h4");
           var hrite = document.createElement("h5");
     var divc3 = document.createElement("div");

    divr.setAttribute("class", "row");
    divr.setAttribute("style", "margin-left: 0");

    divc1.setAttribute("class", "medium-1 columns");
    divc2.setAttribute("class", "medium-10 columns");
    divc3.setAttribute("class", "medium-1 columns");

    aurl.setAttribute("id", "butt-id-" + context.numID);     // used for detail page (voting)
    aurl.setAttribute("href", context.href);   // used for index page

    divp.setAttribute("class", "panel radius clearfix");
    divp.setAttribute("style", "background-color:rgba(179, 217, 255, 0.3);");

    hleft.setAttribute("class", "left");
    hleft.innerHTML = context.leftText;

    hrite.setAttribute("class", "right");
    hrite.innerHTML = context.rightText;

    divr.appendChild(divc1);
      divc1.appendChild(document.createElement("p")); // required to generate spacer
    divr.appendChild(divc2);
      divc2.appendChild(aurl);
        aurl.appendChild(divp);
          divp.appendChild(hleft);
          divp.appendChild(hrite);
    divr.appendChild(divc3);
      divc3.appendChild(document.createElement("p"));
}

function addExplain( context ) {

   /* context :  {tag:"", text:"", pad:"", optClasses:"", optShow:"" }  */

    var div0 = document.getElementById( "explain-" + context.tag );
      var divleft = document.createElement("div");
      var divrite = document.createElement("div");
        var p = document.createElement("p");

    var rpad = 12 - context.pad;

    var pclass = "lead";  // add emphasis

    div0.style.display = "none";
    div0.style.marginLeft = 0;

    div0.setAttribute("class", "row");

    divleft.setAttribute("class", "medium-" + context.pad + " columns");
    div0.appendChild(divleft);

    divrite.setAttribute("class", "medium-" + rpad + " columns");
    div0.appendChild(divrite);

    if ('optClasses' in context) { pclass += " " + context.optClasses; }
    p.setAttribute("class", pclass );
    p.innerHTML = context.text;
    divrite.appendChild(p);

    if ( 'optShow' in context ) { div0.style.display = "inline"; }
}

function showExplain( tag )  {
    var el = document.getElementById( "explain-" + tag );
    el.style.display = "inline";
}

function clearExplain( tag )  {
    var el = document.getElementById( "explain-" + tag );
    el.style.display = "none";
}

function cButAdd() {

   var context = cButContext();

    /* initial control button hierarchy: a horizontal button group with one entry */
    var div0 = document.getElementById( context.tag + "-cbut");
      var div1 = document.createElement("div");
        var ul = document.createElement("ul");
	  var li = document.createElement("li");
	    var a = document.createElement("a");
	      var i = document.createElement("i");
	      var sp = document.createTextNode(" ");
	      var t = document.createTextNode( context.buttonText );

    div0.setAttribute("class", "row");
    div0.setAttribute("style", "margin-left: 0");

    div1.setAttribute("class", "medium-12 columns");
    div0.appendChild(div1);

    ul.setAttribute("class", "button-group");
    ul.setAttribute("id", context.tag + "-bg");
    div1.appendChild(ul);

    ul.appendChild(li);

    a.setAttribute("type", "button");
    a.setAttribute("id", context.tag + "-b");
    a.setAttribute("class", "button radius success");
    a.setAttribute("onclick", "newEntry()" );
    i.setAttribute("class", "fi-" + context.buttonIcon );
    i.setAttribute("id", context.tag + "-b-icon" );
    // t.setAttribute("id", context.tag + "-b-text" );
    li.appendChild(a);
    a.appendChild(i);
    a.appendChild(sp);
    a.appendChild(t);

}

function addExplainRot ( tag ) {
    addExplain( {tag:tag, text:"Rotate vertical to see virtual keyboard on small device.", pad:"1",
                  optClasses:"show-for-medium-only show-for-touch" } );
}

function newEntry() {

    var context = cButContext();

    /* form explanation */
    var expl = document.createElement("div");

    showExplain( context.tag + "-rot" );

    /* form hierarchy: (this forced placement does not work) */
    var div0_0 = document.getElementById( context.tag + "-d");
      var div1_0 = document.createElement("div");
        var div2_1 = document.createElement("div");
        var div2_2 = document.createElement("div");
          var div3_1 = document.createElement("div");
            var form4_1 = document.createElement("form");
              var inp5_1 = document.createElement("input");
              var ta5_2 = document.createElement("textarea");
        var div2_3 = document.createElement("div");

    /* submit button */
    var sb = document.getElementById( context.tag + "-b");
      var i = document.getElementById( context.tag + "-b-icon");
      var sp = document.createTextNode(" ");
      var t = document.createTextNode( "Submit" );

    /* cancel button */
    var bg = document.getElementById( context.tag + "-bg");
      var cbli = document.createElement("li");
        var cba = document.createElement("a");
          var cbi = document.createElement("i");
          var cbsp = document.createTextNode(" ");
          var cbt = document.createTextNode( "Cancel" );

    /* Explain form */

    /* Populate the submission form */
    div1_0.setAttribute("id", context.tag + "-r");
    div1_0.setAttribute("class", "row");
    div1_0.setAttribute("style", "margin-left: 0");
    div0_0.appendChild(div1_0);

    /* Note, this column placement scheme does not work yet */
    div2_1.setAttribute("class", "medium-1 columns");
    div1_0.appendChild(div2_1);

    div2_2.setAttribute("class", "medium-10 columns");
    div1_0.appendChild(div2_2);

    div2_3.setAttribute("class", "medium-1 columns");
    div1_0.appendChild(div2_3);

    div3_1.setAttribute("class", "panel radius formpanel");
    div3_1.setAttribute("style", "background-color: rgba(179, 217, 255, 0.3);");
    div2_2.appendChild(div3_1);

    form4_1.setAttribute("name", context.tag + "-fname");
    form4_1.setAttribute("id", context.tag + "-f");
    form4_1.setAttribute("method", "post");
    form4_1.setAttribute("action", context.formActionURL );
    div3_1.appendChild(form4_1);

    inp5_1.setAttribute("type", "hidden");
    inp5_1.setAttribute("name", "csrfmiddlewaretoken");
    inp5_1.setAttribute("value", getCSRFToken() );
    form4_1.appendChild(inp5_1);

    ta5_2.setAttribute("name", context.valName );
    ta5_2.setAttribute("rows", "4");
    ta5_2.setAttribute("placeholder", context.placeHolder );
    ta5_2.setAttribute("id", context.tag + "-t");
    form4_1.appendChild(ta5_2);

    /* Modify label for the submit button */
    sb.class = "button radius success";
    i.setAttribute("class", "fi-check" );
    sb.removeChild( sb.lastChild );
    sb.appendChild( t );
    sb.setAttribute("onclick", "cButSub()" );

    /* Populate the cancel button */
    bg.appendChild(cbli);

    cba.setAttribute("type", "button");
    cba.setAttribute("class", "button radius alert");
    cba.setAttribute("onclick", "cButCanc()" );
    cbi.setAttribute("class", "fi-x");
    cba.appendChild(cbi);
    cba.appendChild(cbsp);
    cba.appendChild(cbt);
    cbli.appendChild(cba);

}

function cButRestore() {

    var context = cButContext();

    var sb = document.getElementById( context.tag + "-b");
    var i = document.getElementById( context.tag + "-b-icon");
    var t = document.createTextNode( context.buttonText );

    clearExplain( context.tag + "-rot" );

    document.getElementById( context.tag + "-d").removeChild( document.getElementById( context.tag + "-r") );

    document.getElementById( context.tag + "-bg").removeChild( document.getElementById( context.tag + "-bg").lastChild );

    sb.setAttribute("onclick", "newEntry()" );
    i.setAttribute("class", "fi-" + context.buttonIcon );
    sb.removeChild( sb.lastChild );
    sb.appendChild( t );

}

function cButSub() {
    var context = cButContext();
    var x = document.forms[context.tag + "-fname"][context.valName].value;

    if (x == null || x == "") {
        alert("Form must be filled out");
        return false;
    } else {
      document.getElementById( context.tag + "-f").submit()
      cButRestore()
    }
}

function cButCanc() {
    cButRestore()
}

