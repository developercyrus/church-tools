

$(document).ready(function(){

	var _this_book_no = "";
	var _this_book_name = "";

	function init() {
//console.log("init");
        var chapter = 1;
        var sentence = 1;
        
        var location = window.location.href;
        console.log(location);
        var res = location.split("#");
        if (res.length > 1) {
            console.log(res[1]);
            c_s_res = res[1].split("-");
            if (c_s_res.length > 1) {
                c_s = c_s_res[1].split(":");
                if (c_s.length > 1) {
                    chapter = c_s[0];
                    sentence = c_s[1];
                }
            }
            
        } //if
        
        _this_book_name = $("#btn_search").data("name");
		_this_book_no = _this_book_name.substring(0, 3);
		
		document.getElementById( 'bible_o' ).value = _this_book_name;	
        document.getElementById( 'bible_n' ).value = _this_book_name;		
		document.getElementById("input_zoom").value = "580";  //<<<<<< default : font size
		document.getElementById("input_chapter").value = chapter;
		document.getElementById("input_sentence").value = sentence;
		
	}
	init();
	
	function zoom() {

		//content = document.getElementById( 'content_bible' );
		var zoom = document.getElementById("input_zoom").value;
		$( "#content_bible" ).css("font-size", zoom + "%");
		//content.style.fontSize = zoom + "%" ;	
		if (zoom > 0 && zoom <= 200) {
			$( "#content_bible" ).css("letter-spacing", "0");
		} else if (zoom > 200 && zoom <= 300) {
			$( "#content_bible" ).css("letter-spacing", "-2px");
		} else if (zoom > 300 && zoom <= 480) {
			$( "#content_bible" ).css("letter-spacing", "-5px");
		} else if (zoom > 480 && zoom <= 520) {
			$( "#content_bible" ).css("letter-spacing", "-8px");
		} else if (zoom > 520 && zoom <= 650) {
			$( "#content_bible" ).css("letter-spacing", "-10px");
		} else {
			$( "#content_bible" ).css("letter-spacing", "-12px");
		}		
		$( "#content_bible a" ).css("font-size", "40%");
		$( "#content_bible small" ).css("letter-spacing", "0");
	}		

	function scrollToAnchor(aid){
		var offset_v = 0; //-90;
		var aTag = $("a[name='"+ aid +"']");
		var error = $('html,body').animate({scrollTop: aTag.offset().top + offset_v},'fast');

	}
    
	function jumpToAnchor() {
        var chapter = document.getElementById("input_chapter").value;
        var sentence = document.getElementById("input_sentence").value;
        var zoom = document.getElementById("input_zoom").value;			
        var content = document.getElementById( 'content_bible' );
        content.style.fontSize = zoom + "%" ;		
        scrollToAnchor(_this_book_no + "-" + chapter + ":" + sentence);
        console.log("Jump to anchor - " + _this_book_no + "-"+ chapter + ":" + sentence);   		
	}	
	function isSameBook() {
        var bible_o = document.getElementById( 'bible_o' ).value;
        var bible_n = document.getElementById( 'bible_n' ).value;
		//console.log("bible_o="+bible_o);    
		//console.log("bible_n="+bible_n);  		
		if (_this_book_name == bible_o || _this_book_name == bible_n) {		
			return true;
		} else {
			return false;
		}	
	} //if
	
	function jumpToBook() {
		var bible_o = document.getElementById( 'bible_o' ).value;
		var bible_n = document.getElementById( 'bible_n' ).value;				
		var book_name = "";
		var book_no = "";
		if (bible_o != "") {
			book_name = bible_o;
			book_no = bible_o.substring(0, 3); 
		} else if (bible_n != "") {
			book_name = bible_n;
			book_no = bible_n.substring(0, 3); 
		}            
		//var chapter = document.getElementById("input_chapter").value;
		//var sentence = document.getElementById("input_sentence").value;
		chapter = 1;
		sentence = 1;
		//url = book_name + ".html#" + book_no + "-" + chapter + ":" + sentence;
		url = book_name + ".html";
		console.log("Search - " + url); 
		window.open(url,'_blank');       		
	} //if	
		
/*
	$( "#btn_search" ).click(function() {
		//console.log("search");
		
		//if (_this_book_name == bible_o || _this_book_name == bible_n) {
		if (isSameBook()==true) {
			jumpToAnchor();
        } else {
			jumpToBook();
    
        } //if
	});	
	
*/	
/*    
	$( "#bible_o" ).click(function() {
		console.log("bible_o");
        //document.getElementById( 'bible_n' ).value = "";
      
	});	

 	$( "#bible_n" ).click(function() {
		console.log("bible_n");
        //document.getElementById( 'bible_o' ).value = "";
	});	 
*/	
 
 	$( "#bible_o" ).change(function() {
//console.log("change-" + _this_book_name);	
		document.getElementById( 'bible_n' ).value = "";
		if (isSameBook()==false) {
			jumpToBook();
			
			document.getElementById( 'bible_n' ).value = _this_book_name;
			document.getElementById( 'bible_o' ).value = _this_book_name;
		}
		
	});	
 	$( "#bible_n" ).change(function() {
//console.log("change-" + _this_book_name);	
		document.getElementById( 'bible_o' ).value = "";
		
		if (isSameBook()==false) {
			jumpToBook();
			
			document.getElementById( 'bible_n' ).value = _this_book_name;
			document.getElementById( 'bible_o' ).value = _this_book_name;
		}
		
	});	    
	


	
	$("#input_zoom").change(function(){
		zoom();
	});
	
	$('#input_zoom').keypress(function(e) {
		//console.log("chapter");
		if (e.which == '13') {
			zoom();
		}
		
	});	
    
	
	$('#form_c_s').submit(function(event){
//console.log("submit form_c_s");
		event.preventDefault();
		jumpToAnchor();



	});	
	

	$("#input_chapter, #input_sentence").change(function(){
		if (isSameBook()==true) {
			//jumpToAnchor();
		}	
	});


	var prev_ele_index = -1;
	var curr_ele_index = 0;
	var next_ele_index = 1;

	var sentences=[];
	var $allSections = $('small');
	$allSections.each(function(index, value){
		sentences.push($(this));
	});	

	$("#prevS").click(function(){

		if (curr_ele_index <= 0) {
			prev_ele_index=0;		
		} else {
			prev_ele_index=curr_ele_index-1;		
		}	
//console.log("current=" + curr_ele_index	+ " prev=" + prev_ele_index);
		var offset_v = -30; //-90;
		var error = $('html,body').animate({scrollTop: sentences[prev_ele_index].offset().top + offset_v},'fast');		
	
		$('small').removeClass('highlight');
		sentences[curr_ele_index].addClass('highlight');  
		//$('small').removeClass('highlight_prevS');
		//$('small').removeClass('highlight_nextS');
		//sentences[prev_ele_index].addClass('highlight_prevS');  
		//sentences[next_ele_index].addClass('highlight_nextS'); 	

		curr_ele_index = prev_ele_index;			
	});

	$("#nextS").click(function(){
		
		if (curr_ele_index < (sentences.length-1)) {
			next_ele_index=curr_ele_index+1;		
		} else {
			next_ele_index=sentences.length-1;		
		}	
//console.log("current=" + curr_ele_index	+ " prev=" + next_ele_index);		
		var offset_v = -30; //-90;
		var error = $('html,body').animate({scrollTop: sentences[next_ele_index].offset().top + offset_v},'fast');		
		
		$('small').removeClass('highlight');
		sentences[curr_ele_index].addClass('highlight');  
		//$('small').removeClass('highlight_prevS');
		//$('small').removeClass('highlight_nextS');
		//sentences[prev_ele_index].addClass('highlight_prevS');  
		//sentences[next_ele_index].addClass('highlight_nextS'); 	
		
		curr_ele_index = next_ele_index;
		
	});	


	function selectTopSentence() {
		
		for (var i=0; i<sentences.length; i++) {
			//console.log(`${index}: ${this.id}`);

			if ( (sentences[i].offset().top - window.pageYOffset) > 0 && 
				 (sentences[i].offset().top - window.pageYOffset) < $(window).height()/2 ){
					curr_ele_index=i;
//console.log("found - curr=" + curr_ele_index);					
					break;
			} 			
		}	

		if (curr_ele_index <= 0) {
			prev_ele_index=0;		
		} else {
			prev_ele_index=curr_ele_index-1;		
		}
		if (curr_ele_index < (sentences.length-1)) {
			next_ele_index=curr_ele_index+1;		
		} else {
			next_ele_index=sentences.length-1;		
		}	

		$('small').removeClass('highlight');
		sentences[curr_ele_index].addClass('highlight');  
		//$('small').removeClass('highlight_prevS');
		//$('small').removeClass('highlight_nextS');
		//sentences[prev_ele_index].addClass('highlight_prevS');  
		//sentences[next_ele_index].addClass('highlight_nextS'); 			
	}	

	$(document).scroll(function(){
//console.log("scroll.....");
		selectTopSentence();
	});
	
	$('a').click(function() {
		//console.log("chapter");
//console.log("a");
		selectTopSentence();
		
	});		
	
	//selectTopSentence();

});	