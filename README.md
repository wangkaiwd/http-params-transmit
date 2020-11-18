### 前后端传参实践

前后端传参是实际开发过程中特别常见的问题，这里针对`post`传参遇到的问题进行一下小结

> 参考资料：
> * [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
> * [Axios Using application/x-www-form-urlencoded format](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format)
> * [Percent-encoding](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
> * [application/x-www-form-urlencoded or multipart/form-data?](https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data) 
## 前后端传参的请求头

通过`HTML form` 表单进行传参，可以设置的请求头如下：
* application/x-www-form-urlencoded: 普通的`key,value`键值对
* multipart/form-data: 二进制数据传输，如文件上传
* text/plain

**通过`XMLHttpRequest` 发请求，请求体可以接收任何类型的参数**
* x-www-form-urlencoded  
  参数要以`key1=val1&key2=val2...` 的格式进行传递，`key` 和`value`中的非字符数字会进行[百分比编码](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
* multipart/form-data  
  每一个值作为数据块发送，用一个用户定义的分隔符(`boundary`)分离每一个部分。`key` 在每一部分的`Content-Disposition` 标头中被给予。
* application/json  
  传递`JSON`格式的字符串
* query string  
  参数通过地址查询字符串传递，并不在请求主体中，需要在请求地址中进行截取

### axios 对于请求的处理
> 这仅对自己理解的部分进行解释 

`axios`内部会对请求参数类型进行判断： 
* 如果为普通对象，并且未指定请求头，会默认设置请求头`Content-Type: application/json`
* 如果是`URLSearchParams`的实例的，并且未指定请求头，会默认设置请求头`Content-Type: application/x-www-form-urlencoded;chartset=utf-8`

项目中的错误用法为例：  
* header: Content-Type: application/x-www-form-urlencoded
* params: json 字符串

在`HTTP`中`application/x-www-form-urlencoded`要求的格式为`key1=val1&key2=val2...`，并且`key`和`value`中的非数字和字母要进行百分比编码。

此时后端最终会接收到格式不正确的请求参数字符串，导致无法解析请求参数。

