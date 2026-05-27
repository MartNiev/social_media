let width = 1600;
let height = 1200;

function calculateGCD(a, b) {
	while (b !== 0) {
		[a, b] = [b, a % b];
	}

	return a;
}

function getAspectRatio(height, width) {
	let gcd = calculateGCD(height, width);

	return [height / gcd, width / gcd];
}

// let arr = getAspectRatio(height, width);

function convertAspectRatio(height, width) {
	let resArray = [
		{ height: 4000, width: 3000 },
		{ height: 2880, width: 2160 },
		{ height: 2048, width: 1536 },
		{ height: 1920, width: 1440 },
		{ height: 1600, width: 1200 },
		{ height: 1440, width: 1080 },
		{ height: 1280, width: 960 },
		{ height: 1200, width: 900 },
		{ height: 1024, width: 768 },
		{ height: 800, width: 600 },
		{ height: 640, width: 480 },
		{ height: 480, width: 360 },
		{ height: 320, width: 240 },
	];

	for (const res of resArray) {
		let heightDiff = height - res.height;

		if (heightDiff === Math.abs(heightDiff)) {
			let widthDiff = width - res.width;
			if (widthDiff !== Math.abs(widthDiff)) continue;

			let top = heightDiff / 2;
			let left = widthDiff;
			return { left: left, top: top, height: res.height, width: res.width };
		}
	}
}

// console.log(convertAspectRatio(2040, 1114));

let arrObj = [
	{ hash: 964, username: "manv" },
	{ hash: 755, username: "nanv" },
	{ hash: 417, username: "wen92" },
	{ hash: 866, username: "man" },
	{ hash: 576, username: "ama25" },
	{ hash: 711, username: "ert" },
	{ hash: 365, username: "dfg" },
	{ hash: 810, username: "ama1992" },
	{ hash: 731, username: "man1992" },
	{ hash: 532, username: "ama1" },
];

arrObj.sort((obj1, obj2) => obj1.hash - obj2.hash);

let count = 1;

function getHash(string) {
	let hash = 0;

	for (let i = 0; i < string.length; i++) {
		let asc = string.charCodeAt(i);

		hash = (hash << 5) - hash + asc;

		hash = hash | 0;
	}

	return Math.abs(hash) % 1000;
}
function searchAlgorithm(hash, sortedArray, startIdx, endingIdx) {
	let divArray = sortedArray.slice(startIdx, endingIdx);
	if (divArray.length === 1) return;

	let divIdx = Math.floor(divArray.length / 2);

	if (hash === divArray[divIdx].hash) {
		console.log("Found username: ", divArray[divIdx].username);
		return;
	}

	if (hash <= divArray[divIdx].hash) {
		searchAlgorithm(hash, divArray, 0, divIdx);
	}
	if (hash > divArray[divIdx].hash) {
		// console.log(sortedArray.length - 1);
		searchAlgorithm(hash, divArray, divIdx, sortedArray.length);
	}
}

let searchWord = "ama1";
let hash = getHash(searchWord);
searchAlgorithm(hash, arrObj, 0, arrObj.length);
