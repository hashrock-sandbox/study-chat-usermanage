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