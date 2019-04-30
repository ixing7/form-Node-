### 说明
    1.打开后直接运行app.js
        打开浏览器,会生成canvas,然后canvas.toBlob()读取为二进制数据
    2.然后运用这个 将数据放到form表单
       var formdata = new FormData();
      formdata.append('user', blob);
      用post发送此表单
    3.然后看node接收,是文件的读写删操作,处理图片
      
      
      
