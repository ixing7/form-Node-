const  express = require('express')
const fs = require('fs')
const  bodyParser  = require('body-parser')
const multipart = require('connect-multiparty');
var multer  = require('multer');



const app = express()
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ dest: '/tmp/'}).array('user'));

// app.use(multipart());

app.get('/',(req,res)=>{
    const index = fs.readFileSync('./public/123.html')

    res.send(index.toString())
})


app.post('/img',(req,res)=>{
    console.log(req.files[0]);  // 上传的文件信息
    console.log(req.body);  // 上传的文件信息

    // res.send('欢迎来到postImg')
    res.send('欢迎来到postImg')
})
app.get('/img',(req,res)=>{
    // console.log(req);
    res.set({
        'Content-Type':"text/html;charset=UTF-8"
    })
    res.send('欢迎来到getImg')
})


app.listen(3001,e=>{
    if(e){
        console.log(e);
    }else{
        console.log('3001服务器启动成功');
    }
})
