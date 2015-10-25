//var request = require('request');
//var cheerio = require('cheerio');
//var noodle = require('noodlejs');
var Xray = require('x-ray');
var _ = require('underscore');
var fs = require('fs');

var x = new Xray();

// request('https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_acceptedeventrelation.htm', function(error, response, html) {
// 	if(!error && response.statusCode === 200) {
		
// 		var $ = cheerio.load(html);

// 		$('.topic-content').each(function(i, element) {
// 			var content = $(this);
// 			var title = $(this).find('span#topic-title').text();
// 			var body = $(this).children('.body');
// 			var description = $(body).children('div.shortdesc').text();

// 			console.log(title);
// 			console.log(description);
// 		});
// 	}
// });

// noodle.query({
//   "url": "https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_acceptedeventrelation.htm",
//   "type": "html",
//   "selector": ".topic-content span#topic-title",
//   "extract": "html",
// }).then(function(results) {
// 	console.log(results);
// });

x('https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_list.htm', {
	items: x('tbody tr', [{
		title: 'td.entry',
		href: 'td.entry a@href'
	}])
})(function(err, response) {
	var max = 20;
	var pages = [];
	fs.writeFile('links.json', JSON.stringify(response.items), function(err) {
		console.log(err);
	});
	_.each(response.items, function(item, itx) {
		if(itx < max) {
			console.log(item.href);
			x(item.href, {
				title: 'span#topic-title',
				summary: '#summary',
				//fields: 'tbody@html'
				fields: x('tbody tr', [{
					title: 'td:first-child',
					descrip: 'td:last-child'
				}])
			})(function(err, page) {
				console.log('adding page');
				pages.push(page);
				if(itx === max-1) {
					console.log('writing pages file');
					fs.writeFile('pages.json', JSON.stringify(pages));
				}
			});
		}
	});	
	
});