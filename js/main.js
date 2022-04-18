$(document).ready(function() {
	let stats 	= 	{
						win: 0,
						lose: 0
					}

	let dataPackage;
	let subQueryIdx = 5;
	let dataSender = Math.floor(Math.random() * 11);
	let difficult = 350;

	let subQuery = $('<div>').addClass(['subquery', 'subquery-js']);
		subQuery.append($('<img>').attr('src', './img/subquery.jpeg'));
	let subQueryData = $('<div>').addClass('data');
		subQueryData.append($('<div>').addClass('item').attr('idx', '1'))
		subQueryData.append($('<div>').addClass('item').attr('idx', '2'))
		subQueryData.append($('<div>').addClass('item').attr('idx', '3'))
		subQuery.append(subQueryData);

	$('.data-row-js[idx=' + subQueryIdx + '] .data-cell-js[idx=5]').append(subQuery);

	function generateData(length) {
		let result           = '';
		let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * 
			charactersLength));
		}

		return result;
	}

	function getDapp() {
		let dapp = Math.floor(Math.random() * 11);

		if (dapp == 0) {
			return getDapp();
		}
		else {
			return dapp;
		}
	}

	function getSender() {
		let sender = Math.floor(Math.random() * 11);

		if (sender == 0) {
			return getSender();
		}
		else {
			return sender;
		}
	}

	function createDataPackage() {
		let dapp = getDapp();

		dataPackage = $('<div>').addClass(['data-pack', 'data-pack-js']).attr('dapp', dapp);
		dataPackage.append($('<div>').addClass('information').text(generateData(4)));
		dataPackage.append($('<div>').addClass('destination').text('Dapp #' + dapp));
	}

	function sendData(start) {
		let intervalData;
		let i = start;
		let j = 1;

		intervalData = setInterval(function() {
			if (i != 5) {
				$('.data-row-js[idx=' + dataSender + '] .data-cell-js[idx=' + i + ']').append(dataPackage);
			}
			else {
				if ($('.data-row-js[idx=' + dataSender + '] .data-cell-js[idx=5] .subquery-js').length) {
					dataPackage.hide();
					clearInterval(intervalData);

					intervalPackage= setInterval(function() {
						$('.subquery-js .data .item[idx]').removeClass('package');
						$('.subquery-js .data .item[idx=' + j + ']').addClass('package');
						j++;

						if (j == 4) {
							clearInterval(intervalPackage);

							//setTimeout(function() {
								$('.subquery-js .data .item[idx]').removeClass('package');
								$('.data-row-js[idx=' + subQueryIdx + '] .data-cell-js[idx=' + 6 + ']').append(dataPackage);
								dataSender = subQueryIdx;
								dataPackage.show();

								sendData(6)
							//}, difficult)
						}
					}, difficult)
				}
				else {
					updateStats(false, 0)
					clearInterval(intervalData);
				}
			}

			i++;

			if (i == 11) {
				dataPackageIdx = dataPackage.closest('.data-row-js').attr('idx');
				dataPackageDapp = dataPackage.attr('dapp')
				if (dataPackageIdx == dataPackageDapp) {
					updateStats(true, dataPackageIdx)
				}
				else {
					updateStats(false, dataPackageIdx)
				}

				clearInterval(intervalData);
			}
		}, difficult);
	}

	function startGame() {
		dataSender = getSender();
		createDataPackage();
		sendData(1);
	}

	function checkStats() {
		let lose = 0;
		let win = 0;

		$('.dapp-js').each(function(idx, item) {
			if ($(item).attr('result') == 'win') {
				win++;
			}

			if ($(item).attr('result') == 'lose') {
				lose++;
			}
		})

		if (win == 10) {
			$('.stats-js').text('Congratulations! Now you are SubQuery Master!')

			return true;
		}
		else {
			return false;
		}
	}
 
	function updateStats(win = true, dataPackageIdx) {
		if (win) { 
			stats.win++;

			if ($('.dapp-js[idx=' + dataPackageIdx + ']').attr('result') != 'lose') {
				$('.dapp-js[idx=' + dataPackageIdx + ']').css('background', '#3fd83f').attr('result', 'win');
			}
		}
		else {
			stats.lose++;

			$('.dapp-js[idx=' + dataPackageIdx + ']').css('background', '#ff3964').attr('result', 'lose');
		}

		$('.win-count-js').text(stats.win);
		$('.lose-count-js').text(stats.lose);

		dataPackage.remove();

		if (!checkStats()) {
			startGame();
		}
	}

	// Control buttons
	$(document).keydown(function(e) {
		if (e.which == 38) {
			if (subQueryIdx -1 != -1) {
				subQueryIdx--;
				$('.data-row-js[idx=' + subQueryIdx + '] .data-cell-js[idx=5]').append(subQuery);
			}
		}

		if (e.which == 40) {
			if (subQueryIdx +1 != 11) {
				subQueryIdx++;
				$('.data-row-js[idx=' + subQueryIdx + '] .data-cell-js[idx=5]').append(subQuery);
			}
		}
	});

	startGame();
})