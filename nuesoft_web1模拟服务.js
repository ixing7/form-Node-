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

app.get('/getcookie',(req,res)=>{
    // console.log(req);
    res.cookie('haha', 'name1=value1&name2=value2', {
        maxAge:1000*1000, path:'/', httpOnly:true
    });
    res.send('您已经获得cookie请保存')
})


app.get('/',(req,res)=>{
    const index = fs.readFileSync('./public/123.html')
    res.send(index.toString())
})
fs.mkdir('./public/tmp',e=>{})
fs.mkdir('./public/img',e=>{})
app.post('/img',multipart({uploadDir:'./public/tmp'}),(req,res)=>{   //设定图片上传临时目录
    // console.log(req.files);  // 上传的文件信息
    console.log(req);
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
    fs.copyFile(userImg.path,`./public/img/${Date.now()+'_'+userImg.name+
    `.`+userImg.type.split('/')[1]
    }`,e=>{
                e?console.log(e):console.log('图片复制成功');
            fs.unlink(userImg.path,e=>{
                //成功后删除原文件
                   e?console.log(e):console.log('源文件删除成功');
                })
    })
//----------------------------------------------------end----

    res.send('欢迎来到postImg, '+`[${userImg.name}]文件上传成功`)
})
app.get('/img',(req,res)=>{
    // console.log(req);
    res.set({
        'Content-Type':"text/html;charset=UTF-8"
    })
    res.send('欢迎来到getImg')
})
app.post('/resource_detail/some/get_zone',()=>{
    console.log('/resource_detail/some/get_zone ,请求了post');
})
app.post('/resource_detail/some/get_switch',()=>{
    console.log('/resource_detail/some/get_switch ,请求了post');
})
//获取分数
app.post('/synthesize_info/analysis/getScores',(req,res)=>{
    console.log(req.url);
    const data = {
        "后台评分1":{"cpu":2.1, "memory":5, "diskio":7},
        "hostid2":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid3":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid4":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid5":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid6":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid72":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid82":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid92":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid102":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid11":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid12":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid13":{"cpu":2.12, "memory":52, "diskio":72},
        "hostid14":{"cpu":2.12, "memory":52, "diskio":72},
        "standard_score":{"cpu":5, "memory":6, "diskio":7}}
    res.send({item:data})
    // console.log('/resource_detail/some/get_switch ,请求了post');
})
//报警信息
app.post('/synthesize_info/alarm/getAlarmInfo',(req,res)=>{
    console.log(req.url);
    const data = {"item":[
            {"softname":"我的后台1",
                "curtime":"2018-08-09 00:10:09",
                "hostid":"fw1",
                "alarmtype":1,
                "setval":52,
                "realval":43.89},
            {"softname":"sof2",
                "curtime":"2018-08-09 00:10:09",
                "hostid":"fw2",
                "alarmtype":2,
                "setval":52,
                "realval":43.89},
            {"softname":"sof2",
                "curtime":"2018-08-09 00:10:09",
                "hostid":"fw3",
                "alarmtype":3,
                "setval":52,
                "realval":43.89},
            {"softname":"sof2",
                "curtime":"2018-08-09 00:10:09",
                "hostid":"fw4",
                "alarmtype":4,
                "setval":52,
                "realval":43.89},
        ],
        "summary":'kwargs'}
    res.send(data)
    // console.log('/resource_detail/some/get_switch ,请求了post');
})
//分析主机数据:
app.post('/synthesize_info/analysis/analyseHostData',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data = {"item":{
            "hostid":[{
                "hostid":'我的后台主机1',
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
        },
        "summary":'kwargs'}
    res.send(data)
    // console.log('/resource_detail/some/get_switch ,请求了post');
})
//4.分析客户端软件:
app.post('/synthesize_info/analysis/analyseClientData',(req,res)=>{
    console.log(req.url);
    const data = {"item":{
            "软件1":[{
                "hostid":'hostida',
                softname:"4软件1",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"软件1",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
            '软件2':[{
                "hostid":'hostida',
                softname:"软件2",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"软件2",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
        },
        "summary":'kwargs'}
    res.send(data)
})
//5.分析服务器端基础软件::
app.post('/synthesize_info/analysis/analyseServeBasicDBData',(req,res)=>{
    console.log(req.url);
    const data = {"item":{
            "后台测试软件1":[{
                "hostid":'hostida',
                softname:"软件1",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"后台测试软件1",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
            '软件2':[{
                "hostid":'hostida',
                 softname:"软件2",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"软件2",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
        },
        "summary":'kwargs'}
    res.send(data)
})

//6.分析服务器端中间件:
app.post('/synthesize_info/analysis/analyseServeBasicMidData',(req,res)=>{
    console.log(req.url);
    const data = {"item":{
            "软件1":[{
                "hostid":'hostida',
                softname:"6.分析服务",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"软件1",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
            '软件2':[{
                "hostid":'hostida',
                softname:"软件2",
                "curtime":'2018-08-09 05:10:09',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },{
                "hostid":'hostida',
                softname:"软件2",
                "curtime":'2018-08-09 05:10:02',
                "memory":'23',
                "disk":'34',
                "cpu":'21',
                weight:32
            },
            ],
        },
        "summary":'kwargs'}
    res.send(data)
})

//7.主机名:
app.post('/synthesize_info/analysis/getAllHostIDs',(req,res)=>{
    console.log(req.url);
    const data = {item:['lin1','linux2']}
    res.send(data)
})
//8.分析服务器端中间件:
app.post('/synthesize_info/analysis/getHostBaseInfoByID',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data = {"host1":{
        "cputype":'我的后台类型cpu1',
        "cpumodel":'模式cpu1',
        "cpunum":'数量cpu1',
        "memory":'内存1',
        "osversion":'操作系统1'}
}

    res.send({item:data})
})
//9.获取实时监控主机信息:
app.post('/synthesize_info/analysis/getHostSysInfoByID',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"host1":[
            {"curtime":'curtime后台1',
            "memory":'memory1',
            "disk":'disk1',
            "cpu":'cpu1 '},
            {"curtime":'curtime2后台1',
            "memory":'memory1',
            "disk":'disk1',
            "cpu":'cpu1 '},
        ],"host2":[
            {"curtime":'curtime后台2',
                "memory":'memory2',
                "disk":'disk2',
                "cpu":'cpu2'}
        ]}
    res.send(data)
})
//10.获取实时监控网络信息:
app.post('/synthesize_info/analysis/getHostNetInfoByID',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"host1":[
            {"curtime":'curtime后台1',
            revspeed:'接收速度1',
            "sendspeed":'发送速度:sendspeed '},
            {"curtime":'curtime后台1-2',
                revspeed:'接收速度1-2',
            "sendspeed":'发送速度:sendspeed1-2'},

        ],"host2":[
              {"curtime":'curtime后台2-1',
                revspeed:'接收速度2-2',
                "sendspeed":'发送速度:sendspeed2-2'},
        ]}
    res.send(data)
})
//11.公文系统:
app.post('/synthesize_info/analysis/customerDocSystemSave',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"host1":'这是公文系统,看到这条信息,表示请求成功'}
    res.send(data)
})

//1.alarmSet 报警配置读取
app.post('/synthesize_info/alarm/alarmGet',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data = {
        system: { cpu: '后台返回1', diskio: 80, memory: 76 },
        client: { cpu: 52, disk: 80, memory: 76 },
        server_basic: { cpu: 52, disk: 80, memory: 76 }
    };
    res.send(data)
})
//2.alarmSet 报警配置
app.post('/synthesize_info/alarm/alarmSet',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"host1":'这是公文系统,看到这条信息,表示请求成功'}
    res.send(data)
})
//3.评分读取
app.post('/synthesize_info/analysis/scoreStandardGet',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data = {
      system: { cpu: '后台评分读取', diskio: 80, memory: 76 },
      client: { cpu: 52, disk: 80, memory: 76 },
      server_basic: { cpu: 52, disk: 80, memory: 76 }
};
    res.send(data)
})
//4.评分设置
app.post('/synthesize_info/analysis/scoreStandardSet',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"host1":'这是公文系统,看到这条信息,表示请求成功'}
    res.send({resource:data})
})

//3.新表获取详细信息--内存
app.post('/synthesize_info/showinfo/gethost_mem',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"errormsg": "", "resource": {"item": {
        "00238126a232": [
            {"hostid": "00238126a232", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080639488.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:21:17", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a232", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080377344.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:20:45", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a232", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080066048.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:20:14", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a232", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1079451648.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:19:43", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a232", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1081393152.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:19:11", "misspage": 0, "memusagerate": 4.4}
            ],
        "00238126a233": [
            {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080328192.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:23:54", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1081098240.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:23:22", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080643584.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:22:51", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080655872.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:22:20", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080451072.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:21:48", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080639488.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:21:17", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080377344.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:20:45", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1080066048.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:20:14", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1079451648.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:19:43", "misspage": 0, "memusagerate": 4.4}, {"hostid": "00238126a233", "mempageinfo": "4096", "syscache": 0.0, "memuse": 1081393152.0, "bytereplacerate": 0.0, "pageoperatenum": 0, "curtime": "2019-05-12T15:19:11", "misspage": 0, "memusagerate": 4.4}
            ],
            },
            "total": 20},
        "result": "success"
    }
    res.send(data)
})

//3.新表获取详细信息--CPU
app.post('/synthesize_info/showinfo/gethost_cpu',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    const data =  {"errormsg": "", "resource": {
                "item": {
                    "00238126a232": [
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.98,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                5,
                                12,
                                10,
                                9,
                                4),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 140062962
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.97,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime":2,
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 140050269
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.96,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": 1,
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.3,
                            "proswitchnum": 140037661
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.8,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": 1,
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 140024773
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.78,
                            "bockpro": "None",
                            "runpro": 31,
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 140012005
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.77,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                5,
                                12,
                                10,
                                6,
                                27),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 139999435
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.76,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                5,
                                12,
                                10,
                                5,
                                56),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 139986627
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.74,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                5,
                                12,
                                10,
                                5,
                                24),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.3,
                            "proswitchnum": 139974068
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.0,
                            "wiotime": 704.72,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                5,
                                12,
                                10,
                                4,
                                53),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 139961065
                        },
                        {
                            "cpuindex": "",
                            "hostid": "00238126a232",
                            "cpuinterpersec": 493,
                            "userproper": 0.0,
                            "aveoad": 0.01,
                            "wiotime": 704.71,
                            "bockpro": "None",
                            "runpro": 339,
                            "curtime": (2019,
                                  5,
                                12,
                                10,
                                4,
                                21),
                            "softinterper": 0.0,
                            "sysproper": 0.0,
                            "createpropersec": 0.0,
                            "hardinterper": 0.0,
                            "cpuused": 0.2,
                            "proswitchnum": 139948328
                        }
                    ]
                },
                "total": 10
            },
        "result": "success"
    }
    res.send(data)
})









app.post('*',(req,res)=>{
    console.log(req.url,'*,请求了post');
    // res.send('欢迎来到* POST ')
})
















app.listen(8000,e=>{
    if(e){
        console.log(e);
    }else{
        console.log('8000服务器启动成功');
    }
})
