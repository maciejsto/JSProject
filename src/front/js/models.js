/**
 * New node file
 */

$(document).ready(function(){
	
	$.get( "/users", function( data ) {
		$( ".result" ).html( data );
		alert( "Load was performed." );
	});
	
});


