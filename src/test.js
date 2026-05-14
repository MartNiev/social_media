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

console.log(convertAspectRatio(2040, 1114));
