var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});
router.post('/viewImage',function (req,res,next) {
  var _Id = req.body._id;
  var id = req.body.id;
  var title = req.body.title;
  var messeger = req.body.messeger;
  var day = req.body.day;
  var link = req.body._link;
  var arr = [{_Id,id,title,messeger,day,link}];
  console.log(_Id)
  res.render('viewImg',{title:'view image',arr:arr})
})

module.exports = router;
