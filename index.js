

$(document).ready(function(){


	function init() {
		
		document.getElementById( 'bible_o' ).value = "001Genesis";	
        document.getElementById( 'bible_n' ).value = "";	
		document.getElementById("input_chapter").value = 1;
		document.getElementById("input_sentence").value = 1;
	}
	init();


	$( "#btn_search_i" ).click(function() {
		//console.log("search");
		
        var bible_o = document.getElementById( 'bible_o' ).value;
        var bible_n = document.getElementById( 'bible_n' ).value;;		
        
        var name = "";
        var book = "";
        if (bible_o != "") {
            name = bible_o;
            book = bible_o.substring(0, 3); 
        } 
        if (bible_n != "") {
            name = bible_n;
            book = bible_n.substring(0, 3); 
        }    
        
        
//console.log("search="+name + "" + book)
        
		var chapter = document.getElementById("input_chapter").value;
		var sentence = document.getElementById("input_sentence").value;
        url = name + ".html#" + book + "-" + chapter + ":" + sentence;
        console.log("Search - " + book + "-"+ chapter + ":" + sentence); 
        window.open(url,'_blank');
		
 		
	});	

	$( "#bible_o" ).click(function() {
		console.log("bible_o");
        var val = document.getElementById( 'bible_o' ).value;
        //console.log("bible_o " + val);
        
        document.getElementById( 'bible_n' ).value = "";
        
	});	    
 	$( "#bible_n" ).click(function() {
		console.log("bible_n");
        var val = document.getElementById( 'bible_n' ).value;
        //console.log("bible_n " + val);
        
        document.getElementById( 'bible_o' ).value = "";
        
	});	     

	$('#form_c_s').submit(function(event){
		//console.log("submit form_c_s");
		event.preventDefault();
	});
	

});