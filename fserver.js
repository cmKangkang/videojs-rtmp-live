'use strict';
//本地文件服务器

var fs=require('fs');//引入fs，相当于import
var url=require('url');
var path=require('path');//路径
var http=require('http');


//获取当前目录（工作区）的根目录
var rootpath=path.resolve(process.argv[2]||'.');
//console.log('rootpath:'+rootpath);控制台输出根路径

//创建服务器
var server=http.createServer(function(request,response){//回调函数
    //获取url的path,转换为字符串。
    var pathname=url.parse(request.url).pathname;//即在浏览器输入的8080端口后的文件路径（名）

    //获取对应的本地文件路径，即将rootpath与pathname组合在一起，成为绝对路径
    var filepath=path.join(rootpath,pathname);

    //
    fs.stat(filepath, function(err,stats){
        if(!err&&stats.isFile()){
            //没有出错且文件找到
            console.log('200'+request.url);

            //发送200响应
            response.writeHead(200);

            //将文件流导向response，在浏览器显出
            fs.createReadStream(filepath).pipe(response);
        }
        else{
            //出错或文件不存在,输出信息
            console.log('404 '+request.url);
            response.end('404 not found');
        }
    })
})

//服务器监听8080端口
server.listen(8080);

console.log('server is running at http://127.0.0.1:8080')