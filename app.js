const  express = require('express')
const fs = require('fs')
const  bodyParser  = require('body-parser')
const multipart = require('connect-multiparty');



const app = express()
// app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
// app.use(multipart({uploadDir:'./public/tmp'}));

app.get('/',(req,res)=>{
    const index = fs.readFileSync('./public/123.html')
    res.send(index.toString())
})
app.post('/img',multipart({uploadDir:'./public/tmp'}),(req,res)=>{
    // console.log(req.files);  // 上传的文件信息
    console.log(req.files.user);
    const userImg = req.files.user
    // res.send('欢迎来到postImg')
    fs.mkdir('./public/img',e=>{})
    // fs.readFile(userImg.path,(e,d)=>{
    //     fs.writeFile(`./public/img/${'user.png'}`,d,e=>{
    //         e?console.log(e):console.log('图片保存成功');
    //     })
    //     fs.unlink(userImg.path,e=>{
    //        e?console.log(e):console.log('源文件删除成功');
    //     })
    // }) //读取完再删除
    res.send('欢迎来到postImg')
})
app.get('/img',(req,res)=>{
    // console.log(req);
    res.set({
        'Content-Type':"text/html;charset=UTF-8"
    })
    res.send('欢迎来到getImg')
})


app.listen(3000,e=>{
    if(e){
        console.log(e);
    }else{
        console.log('3000服务器启动成功');
    }
})
