var default_content="";
$(document).ready(function(){	//executed after the page has loaded
    checkURL();	//check if the URL has a reference to a page and load it
    $('ul li a').click(function (e){//Find links by traversing DOM, this may need editing 
            checkURL(this.hash); //assign links to their destination 
    });

    setInterval("checkURL()",250);	//check for a change in the URL every 250 ms to detect if the history buttons have been used

});
//This will preserve the last visited page, so the back button will actually work 
var lasturl="";	//here we store the current URL hash

function checkURL(hash)
{
    if(!hash) hash=window.location.hash;
    if(hash != lasturl)	// if the hash value has changed
    {
        lasturl=hash;	//update the current hash
        loadPage(hash);	// and load the new page
    }
}

function loadPage(url)	//the function that loads pages via AJAX
{
    // $url is the page name, ie contact, catering etc 

    $.ajax({	//create an ajax request to load_page.php
        type: "POST",
        url: "load_page.php",
        data: 'page='+url,	//with the page name as a parameter
        dataType: "html",	//expect html to be returned
        success: function(msg){

            if(parseInt(msg)!=0)	//if no errors
            {
                $('#pageContent').html(msg);	//load the returned html into pageContet
            }
        }

    });

}
