var express = require('express');
var router = express.Router();


const multer  = require('multer')

var data = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage})


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:lamnhph18826@cluster0.tdhtc06.mongodb.net/test').then((error)=>{
  if (error!=null) console.log("ket noi thanh cong")
});

const { Schema } = mongoose;

const Wallpaper = new Schema({
  id : String ,
  link : String,
  day : String,
  messeger : String,
  title : String
});

const Wall = mongoose.model('wallpaper',Wallpaper);

Wall.find(function (error,result) {
  if (result!=null){

    for (var i in result) {
      var _ID = result[i]._id.toString();
      var id = result[i].id;
      var title = result[i].title;
      var day = result[i].day;
      var messeger = result[i].messeger;
      var link = result[i].link;
      data.push({_ID,id,title,day,messeger,link});
      //console.log(id);
    };
    console.log(data);
  }else{
    console.log("khong co giu lieu");
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' ,data:data});
});

router.post('/send', function(req, res, next) {


});


router.post('/upfile',upload.single('linkImg') ,function(req, res, next) {
  res.send(req.file.length);
  var id = req.body.id;
  var title = req.body.title;
  var day = req.body.day;
  var linkImg = req.file.path;
  var messeger = req.body.messeger;

  const wpp =new Wall({
      id:id,
      title:title,
      day:day,
      link:linkImg,
      messeger:messeger
    })
  wpp.save().then(data=>{
    if (data!=null){
      console.log('them anh thanh cong')
    }else{
      console.log('them anh khong thanh cong')
    }
  });
  });

router.post('/delete',function (req,res,next){
  var id = req.body.index;
  Wall.deleteOne({_id:id}).then(data=>{
    if (data!=null){
      console.log('xoa anh thanh cong')
      res.send("xoa anh thanh cong")
    }else{
      console.log('xoa anh khong thanh cong')
      res.send("xoa anh khong thanh cong")
    }
  })
  console.log(id);
})

router.post('/edit',upload.single('imgEdit'),function (req,res,next) {
  var _id = req.body.ID;
  var id = req.body.id;
  var title = req.body.title;
  var messeger = req.body.messeger;
  var day = req.body.day;
  var link = req.file.path;

Wall.updateOne({_id:_id},{
  id:id,
  title:title,
  messeger :messeger,
  day:day,
  link:link
}).then(data=>{
  if (data!=null){
    res.send("cap nhat anh thanh cong");
  }else{
    res.send("cap nhat anh khong thanh cong");
  }
})


})


module.exports = router;
