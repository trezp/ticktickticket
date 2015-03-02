Router.route('/', function(){
	this.render('layout');
});

Router.route('/log', function(){
	this.render('problemLog');
}); 

Router.route('/waitlist', function(){
	this.render('waitListMode')
})