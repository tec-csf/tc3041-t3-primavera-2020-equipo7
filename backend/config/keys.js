if(process.env.NODE_ENV === "production"){
	console.log("Connected from production")
	module.exports = require('./keys_prod');
}else{
	console.log("Connected from dev");
	module.exports = require('./keys_dev');
}