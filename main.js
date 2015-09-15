var milkcocoa = new MilkCocoa("oniek5oj87.mlkcca.com");
var ds_user = milkcocoa.dataStore("users");

var id = ""+ new Date().getTime();

function rand(n){
	return Math.floor(Math.random() * n); 
}

function move(){
	ds_user.send({
		id: id,
		x: rand(16),
		y: rand(16)
	})
}

function UserManager(){
	this.users = {};
}
UserManager.prototype.getUsers = function(){
	var self = this;
	
	Object.keys(this.users).forEach(function (key) {
		var item = self.users[key];
		if((new Date().getTime() - item.updated) > 2000){
			delete self.users[key];
		}
	});
	var usersAry = [];
	
	Object.keys(this.users).forEach(function (key) {
		var item = self.users[key];
		usersAry.push(item);
	});
	return usersAry;
}
UserManager.prototype.update = function(user){
	this.users[user.id] = user;
}

var userManager = new UserManager();


new Vue({
	el: ".container",
	data: {
		id: id,
		users: [
		]
	},
	ready: function(){
		var self = this;
		setInterval(function(){
			move();
		}, 1000);
		
		ds_user.on("send", function(data){
			var user = {
				id: data.value.id,
				x: data.value.x,
				y: data.value.y,
				updated: new Date().getTime()
			};
			userManager.update(user);
			self.users = userManager.getUsers();
		});
		
	}
})


