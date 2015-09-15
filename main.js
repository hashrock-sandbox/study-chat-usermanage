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
	}, function(){
		console.log("done");
	})
}

var users = [];


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
			users.push(user);
			self.users = users;
		});
		
		setInterval(function(){
			users = users.filter(function(item){
				return (new Date().getTime() - item.updated) < 1000; 
			});
		}, 1000)
		

		
	}
})


