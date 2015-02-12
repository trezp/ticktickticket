Router.route('/', function(){
	this.render('layout');
});

Router.route('/log', function(){
	this.render('problemLog');
})