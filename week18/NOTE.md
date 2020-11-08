## 同机部署


##


publish-tool 发送请求

## 流
有的流只能读，有的流只能写，有的则是一边读一边写。


## 端口说明

http://localhost:3000/ 本地 server 的服务  
  
  
部署发布系统  

本地访问 8083 端口映射到 虚拟主机的 3000 端口，访问的是虚拟主机的 server 项目  


### 端口 8023 是连接是「虚拟服务器」的 22 端口，上传文件使用；
也就是说 -r -P 8023 ./* 上传文件的时候走的是 8023 - 22 。  

### 端口 8085 是本地 publish-server 端口;
publish-server 会上传到虚拟主机，所以，虚拟主机上跑的是 8085 端口。  
  
### 端口 8885 是本地 publish-tool 的端口；
通过端口映射到虚拟主机的 8085 上。  

## 压缩
pipe 把可读的流导入可写的流  

## 单文件场景
fs.stat 单文件场景  

## 多文件场景

## github 用户鉴权
先获取用户信息 https://github.com/login/oauth/authorize?client_id=Iv1.a9b17443047b1ec8 传入 client_id ，会跳转到预留的 localhost:8085 端口

端口 8086 是 github 调起本地服务所用端口。






