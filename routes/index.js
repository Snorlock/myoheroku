var router = require('express').Router();
var path = require('path');

router.get('/', function(req,res){
    res.format({
    	'text/html': function(){
    		res.sendFile(path.join(__dirname,'..','/views/index.html'));
    	}
    })
});

module.exports = router;