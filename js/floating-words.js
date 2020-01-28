function floatingWordsJS(domId, phrases) {

	var words = {};
	var words_attr = [];
	phrases_handle(phrases);
	var end = false;

	var canvas = document.getElementById(domId);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let animInterval;

	if (canvas.getContext) {
		var c = canvas.getContext('2d'),
			w = canvas.width,
			h = canvas.height;

		c.strokeStyle = 'red';
		c.fillStyle = 'white';
		c.lineWidth = 5;
		c.textBaseline = 'middle';
  		// c.textAlign = "center";

		// constructor
		Word = function(key) {
			this.text = key;
			this.x = Math.random() * (w + 200) - 200;
			this.y = Math.random() * h;
			// this.font = words[key] * 10 + 'px "Gotham Narrow", sans-serif';
			this.font = Math.random() * (40 - 10) + 10 + 'px "Gotham Narrow", sans-serif';
			this.speed = Math.random() * (3) + 1;
			this.animate = true;
		}
		for (key in words) {
			let word = new Word(key);
			words_attr.push(word);
		};

		function animation() {
			for (var i = 0; i < words_attr.length; i++) {
				c.font = words_attr[i].font;
				c.fillText(words_attr[i].text, words_attr[i].x, words_attr[i].y);
				words_attr[i].width = c.measureText(words_attr[i].text).width;
				c.stroke();
			}
			move();
		}

		function move() {
			let ended = true;
			for (var i = 0; i < words_attr.length; i++) {
				if (words_attr[i].animate) {
					if (words_attr[i].y < 0 && !end) {
						words_attr[i].y = h + 100;
						words_attr[i].x = Math.random() * (w + 200) - 200;
						words_attr[i].font = Math.random() * (40 - 10) + 10 + 'px "Gotham Narrow", sans-serif';
						words_attr[i].speed = Math.random() * (3) + 1;
					} else {
						words_attr[i].y -= words_attr[i].speed;
						if (words_attr[i].y > 0 || !end) {
							ended = false;
						}
					}
				}
			}
			if (end && ended) {
				clearInterval(animInterval);
				end();
			}
		}

		animInterval = setInterval(function() {
			c.clearRect(0,0,w,h);
			animation();
		}, 24);

		return {
			phrases: words_attr,
			animInterval: animInterval,
			c: c,
			end: callback => end = callback,
			resume: () => {
				end = false;
				clearInterval(animInterval);
				animInterval = setInterval(function() {
					c.clearRect(0,0,w,h);
					animation();
				}, 24);
			}
		}

	}

	function phrases_handle(phrases) {
		var word_array = [];
		var word_count = [];
		for (var i = 0; i < phrases.length; i++) {
			check = true;
			for (var j = 0; j <= word_array.length; j++) {
				if (phrases[i] == word_array[j]) {
					word_count[j]++;
					check = false;
					break;
				}
			}
			if (check) {
				word_array.push(phrases[i]);
				word_count.push(1);
			}
		}
		for (var i = 0; i < word_array.length; i++) {
			words[word_array[i]] = word_count[i];
		}
		return words;
	}

}