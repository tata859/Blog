const express=require("express")
    ,mongoose=require("mongoose")
    ,path=require("path")
    ,session=require("express-session")
    ,mongooseSession=require("connect-mongo")(session);
    //连接数据库
mongoose.connect(
    "mongodb://localhost:27017/logon",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
})
    .then(()=>{
        console.log("数据库连接成功");
    })
    .catch(()=>{
        console.log("数据库连接失败");
    })
//创建实例
let app=express();
//监听
app.listen(7000)
//设置ejs模板引擎
app.set("view engine","ejs")
//处理form表单的数据
app.use(express.json());
//处理ajax发送的数据
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));
//设置session参数
app.use(session({
    name:"cookie",
    secret:"blogs"//密钥
    ,rolling:true// 用户跟后台有交互，刷新存储时间
    ,resave:false//是否每次请求都存储session数据
    ,saveUninitialized:false//是否设置初始值
    ,cookie:{maxAge:1000*60*60}//设置session过期时间
    ,store:new mongooseSession({
        url:"mongodb://localhost:270node17/logon"
    })//不设置store则在服务器存储session的数据，可以通过store设置session数据存储在数据库中
    }))
//主页路由
/*app.get("/",(req,res)=>{
    res.render("page")
})*/
//首页路由
app.get("/",require("./router/page"))
app.post("/",require("./router/page"))
//主页路由
app.get("/homepage",require("./router/homepage"))
//信息修改路由
app.post("/update",require("./router/update"))
//密码修改路由
app.post("/updatePwd",require("./router/updatePwd"))
//注册路由
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",require("./router/register"))
//登陆路由
app.get("/logon",(req,res)=>{
    res.render("logon")
})
app.post("/logon",require("./router/logon"))
//登出路由
app.get("/logonout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})
//文章发表
//app.post("/article",require("./router/article"))
//文章与子路由
app.use("/article",require("./router/article"))
//文章查找
app.post("/search",require("./router/search"))
//评论与删除
app.use("/comment",require("./router/comment"))
//文章删除
app.post("/delete",require("./router/delete"))
//图标路由
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/image/wall.jpg"))
})