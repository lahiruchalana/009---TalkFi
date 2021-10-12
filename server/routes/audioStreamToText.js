var express = require('express');
var router = express.Router();
var { getTextOfSpeech } = require('../controllers/testAudioStreamToText.js')
var { speechToText } = require('../controllers/speechToText.js')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send(speechToText);
// });

router.route('/')
    .get(speechToText)

// router.route('/')
//     .get(getTextOfSpeech)

module.exports = router;