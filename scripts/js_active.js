const arrayActive = []; 

// week of year, first game
var week = 1;

var xFile;

CBBApi.fetchWeekGames(week)
	.then(function (json) {
	xFile = json;
	for (var key in xFile) {
		for (var i = 0; i < xFile[key].length; i++) {
			var gameId = xFile[key][i].gameId;
			var active = xFile[key][i].active;
			// set home team values
			if (active) {
				arrayActive.push(gameId);
			}
		}
	}
}).catch(function (err) {
	if (typeof CBBLogger !== 'undefined') {
		CBBLogger.error('js_active load failed', err);
	}
});