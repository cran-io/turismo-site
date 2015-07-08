$(document).ready(function(){
	$('#share_button').click(function(e){
		e.preventDefault();
		FB.ui(
		{
		method: 'feed',
		name: 'This is the content of the "name" field.',
		link: ' http://www.hyperarts.com/',
		picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
		caption: 'This is the content of the "caption" field.',
		description: 'This is the content of the "description" field, below the caption.',
		message: ''
		});
	});
});