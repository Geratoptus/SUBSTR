let Hash = require("./hash");

class RabinKarpHash extends Hash {
	
	static hash(string) {
		let hash = 0;
		for (let i = 0; i < string.length; i++){
			hash += string.charCodeAt(i) * Math.pow(2, string.length - i - 1);
		}
		return hash;
	}
	
	static recurent_hash(last_hash, last_str, new_str){
		return 2 * (last_hash - Math.pow(2, last_str.length - 1) * last_str.charCodeAt(0)) + new_str.charCodeAt(new_str.length - 1);
	}
	
}

module.exports = RabinKarpHash;
