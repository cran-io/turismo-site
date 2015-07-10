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

<script>
    !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
        if(!d.getElementById(id)){
            js=d.createElement(s);js.id=id;
            js.src=p+'://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document, 'script', 'twitter-wjs');
</script>

<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>



