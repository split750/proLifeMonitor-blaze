Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
  
  this.render('home');
});

Router.route('/todo', function () {
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
  
  this.render('taskList');
});