let fs = require("fs");

let BruteForceHash = require("./bruteforcehash");
let SumHash = require("./sumhash");
let SquareSumHash = require("./squaresumhash");
let RabinKarpHash = require("./rabinkarphash");

let [,,hash_code, str_file, substr_file] = [...process.argv];	
let string = fs.readFileSync(str_file, "utf-8");
let sub_string = fs.readFileSync(substr_file, "utf-8");
if (hash_code == "bruteforcehash"){
	hash_code = BruteForceHash;
}
if (hash_code == "sumhash"){
	hash_code = SumHash;
}
if (hash_code == "squaresumhash"){
	hash_code = SquareSumHash;
}
if (hash_code == "rabinkarphash"){
	hash_code = RabinKarpHash;
}

let collisions = 0;
let str_hash;
let substr_hash = hash_code.hash(sub_string);

let start_time = new Date().getTime();

for (let i = 0; i < string.length - sub_string.length + 1; i++){
	if (str_hash){
		str_hash = hash_code.recurent_hash(str_hash, string.substr(i - 1, sub_string.length), string.substr(i, sub_string.length));
	}
	else{
		str_hash = hash_code.hash(string.substr(i, sub_string.length));
	}
	if (str_hash == substr_hash){
		for (let j = 0; j < sub_string.length; j++){
			if (string[j + i] != sub_string[j]){ 
				collisions++;
				break;
			}
			
			if (j + 1 == sub_string.length){
				
				console.log(i + 1);
			}
			
		}
	}
	
}
let end_time = new Date().getTime();
console.log(`Execute Time: ${end_time - start_time}ms`);
if (hash_code != BruteForceHash) console.log(`Collisions: ${collisions}`);