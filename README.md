# yelp-camp-x
A Node.js-powered Campground Web App with dynamic features that allows users to view, add, edit/delete and comment campgrounds. 

![screenshot](./views/img/background.png)

### Add full screen background image slider for the landing page. link -> [background-slider by Ian](https://github.com/nax3t/background-slider)

----

Node.js项目转TypeScipt实战：

1. 根目录下`cnpm i -D @types/node @types/body-parser @types/connect-flash @types/ejs @types/express @types/express-flash @types/mongoose @types/nodemailer @types/passport @types/passport-local typescript`
2. 根目录下`touch tsconfig.json`，学习[tsconfig.json][tsconfig.json - link]文件，根据[完整的编译器选项][compiler-options - link]进行完整配置
3. 根目录下`cnpm i -S`必要依赖项
4. 根目录下跑`tsc`，此时`src`下只有一个`app.ts`文件，发现报错，原因是没有配置`"moduleResolution": "node",`

> 刚开始参考：[TS+Nodejs+Express构建用于前端调试的WEB服务器](https://juejin.im/post/6844903636418428936)

[tsconfig.json - link]: https://www.tslang.cn/docs/handbook/tsconfig-json.html
[compiler-options - link]: https://www.tslang.cn/docs/handbook/compiler-options.html