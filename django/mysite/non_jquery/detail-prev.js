
/* functions for detail.html */

function voteClickEvent( context ) {

    /* context: { choiceID:"", choiceText:"", voteURL:"", csrfToken:"" } */

    document.getElementById("butt-id-" + context.choiceID ).addEventListener("click", function () {

            var form = document.createElement("form");
	      var hiddenField = document.createElement("input");
            var aaa = document.createElement("a");

            /* create form than button in modal will submit */
            form.setAttribute("id", "form-mm-id");
            form.setAttribute("method", "post");
            form.setAttribute("action", context.voteURL );

	    hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "choice");
            hiddenField.setAttribute("value", context.choiceID);
	    form.appendChild(hiddenField);

	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "csrfmiddlewaretoken");
            hiddenField.setAttribute("value", context.csrfToken);
	    form.appendChild(hiddenField);

	    document.body.appendChild(form);

	    /* insert the choice into the modal */
	    document.getElementById('mmchoice').innerHTML = context.choiceText;

            /* activate the modal (there may be a more direct way  */
            aaa.setAttribute("data-reveal-id", "myModal");
	    document.body.appendChild(aaa);
	    aaa.click();

	 });
}

function addModal() {

      /* Create modal popup for vote confirmation */

       var modal = document.getElementById( "myModal" );
       var h4 = document.createElement("h4");
       var h3 = document.createElement("h3");
       var button = document.createElement("button");
         var b = document.createElement("b");
       var a = document.createElement("a");

       modal.setAttribute("class", "reveal-modal tiny");
       modal.setAttribute("data-reveal", "");

       h4.setAttribute("class", "subheader");
       h4.innerHTML = "Confirm Vote for:";

       h3.setAttribute("id", "mmchoice");
       h3.innerHTML = "xxx";

       button.setAttribute("type", "button");
       button.setAttribute("class", "button small");
       button.setAttribute("onclick", "document.getElementById('form-mm-id').submit()");

       b.innerHTML="Vote!";

       a.setAttribute("class", "close-reveal-modal");
       a.innerHTML="x";

       modal.appendChild(h4);
       modal.appendChild(h3);
       modal.appendChild(button); button.appendChild(b);
       modal.appendChild(a);

}


