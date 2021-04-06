### 页面性能指标:

1. dns 查询,一般 500ms(使用 dns 缓存,20ms 以内)协商缓存(last-modified,etag)
2. tcp 链接和 ssl(https 特殊的数据传输过程) 大概 200ms
3. 请求响应,内容传输
4. dom 解析(600ms 左右)
5. 资源加载(http1.1 同一个域名下最大 6 个并发,合理分配 cdn 分发域名,使用 http2.0)

### 解决方案:

1. 减少重定向(减少 1,2,3 时间)
2. web 语意话标签,减少节点数,合理使用 script 放底部,能使用 async 就使用,合理的流式布局,减少重排和重绘(这些主要减少 dom 解析)
3. 使用 dns 缓存
4. 服务端启用 gzip,减少文件传输大小
5. 图片懒加载(首屏图像不要太高,最好最多一屏大小)
6. tailwindcss 针对大项目减少 css 体积

### js 设计模式

1. 观察者模式 比如 vue 框架;事件 Event
2. 单列模式 比如平时 dev-server database
3. 构造函数 Object.create new
4. 原型模式
5. 工厂模式

### 缓存

1. 浏览器缓存分为 内存缓存(from_cache:快,js,image 缓存其中),硬盘缓存(from_disk:慢,css 缓存其中)
2. 如果有缓存,第一次打开页面是硬盘缓存,再次刷新页面是内存缓存
3. 协商缓存:强缓存失效后;cache-control=no-cache
4. cache-control=no-store 不缓存 (默认值是强缓存)
5. dns 缓存 :本地 hosts 文件=>浏览器缓存=》 路由器缓存=》运营商 dns 缓存=》根域名服务器=》顶级域名服务器=》主域名服务器

### http https

1. https 协议需要到 ca 申请证书，一般免费证书较少，因而需要一定费用。
2. http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
3. http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
4. http 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。

### 链表反转思路

1. 找到 head,让 head.next=null
2. while 循环遍历,head 存在,找到下一个 next = head.next
3. 让下一个的 next = 前一个 next.next = head
4. 指针前移:即 head = next

### 回流&重绘

1. 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility)
2. [回流具体](https://juejin.cn/post/6844903569087266823)

### [浏览器工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)

1. dns;2.tcp;3.dsl;4.发起 http 请求;5.服务器响应,tcp 慢启动 14kb;6. dom 解析;7.cssom 解析;8.脚步解析;9.渲染;10.页面可交互

### [babel 深度好文](https://my.oschina.net/u/4088983/blog/4545928)

### [https 深度好文](https://juejin.cn/post/6844903892765900814)

### webpack loader 和 plugin 区别

### **输入地址到页面渲染出来过程**(重要)

### eventloop 事件循环

### 常见的一些代码题 见 src/\*.js 文件
