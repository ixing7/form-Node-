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
    console.log('cookie,---/---',req.headers.cookie);
    const index = fs.readFileSync('./public/123.html')
    res.send(index.toString())
})
fs.mkdir('./public/tmp',e=>{})
fs.mkdir('./public/img',e=>{})
app.post('/img',multipart({uploadDir:'./public/tmp'}),(req,res)=>{   //设定图片上传临时目录
    // console.log(req.files);  // 上传的文件信息
    console.log(req.body);
    console.log(req.files.user);
    const userImg = req.files.user
    // res.send('欢迎来到postImg')

    //----------------------------------------------------方法1:
    // fs.readFile(userImg.path,(e,d)=>{
    //     fs.writeFile(`./public/img/${'user.png'}`,d,e=>{
    //         e?console.log(e):console.log('图片保存成功');
    //     })
    //     fs.unlink(userImg.path,e=>{
    //        e?console.log(e):console.log('源文件删除成功');
    //     })
    // }) //读取完再删除
    //----------------------------------------------------方法2:

//http://nodejs.cn/api/fs.html#fs_fs_copyfile_src_dest_flags_callback //拷贝操作
    fs.copyFile(userImg.path,`./public/img/${'user.png'}`,e=>{
                e?console.log(e):console.log('图片复制成功');
            fs.unlink(userImg.path,e=>{
                //成功后删除原文件
                   e?console.log(e):console.log('源文件删除成功');
                })
    })
//----------------------------------------------------end----

    res.send('欢迎来到postImg')
})
app.get('/img',(req,res)=>{
    console.log('cookie,---/img---',req.headers.cookie);
    // console.log(req);
    res.set({
        'Content-Type':"text/html;charset=UTF-8"
    })
    res.send('欢迎来到getImg')
})
app.post('/resource_detail/some/get_zone',()=>{
    console.log('/resource_detail/some/get_zone ,请求了post');
})
app.post('*',()=>{
    console.log('*,请求了post');
})
app.listen(3001,e=>{
    if(e){
        console.log(e);
    }else{
        console.log('3001服务器启动成功');
    }
})
