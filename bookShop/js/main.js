$(function () {
////把数据传进tree中////
    ///tree第一级菜单///
    for (var key in Books) {
        var span = $('<span>', { "class": "span1" }).text(key);
        var list = $("<li><img class='img' src='css/images/add.jpg' /></li>");
        list.append(span);
        $(".tree").append(list);
        ///tree的第二级菜单///
        var ul = $("<ul>", { "class": "secondF" });
        list.append("<br>").append(ul);
        var books = Books[key];
        for (var key2 in books) {
            var list2 = $('<li>').text(key2);
            ul.append(list2);
            var book = books[key2];
            setCenter(book);//设置center内容
        }
    }
    drag();
////遍历tree，为click做准备///
    $(".tree>li").each(function () {

        ////选中+、-的图片展开、收起菜单效果///
        var close = false;//记录状态
        $(this).find("img").click(function () {
            close = !close;
            if (close) {
                $(this).parent().find(".secondF").css("display", "inline-block");
                $(this).attr("src", "css/images/minus.jpg");
            } else {
                $(this).parent().find(".secondF").css("display", "none");
                $(this).attr("src", "css/images/add.jpg");
            }

        });

       ///点击一级菜单span，显示center内容///
        $(this).find(".span1").click(function () {
            a1Click($(this));
        });
        ///遍历所有选中li下的子类，对子类添加点击事件///
        //事件：设置导航.nav和center内容//
        $(this).find(".secondF>li").each(function () {
            $(this).click(function () {
                $(".centerDiv").empty();
                $(".nav").empty();
                var text1 = $(this).parents("li").children("span").text();
                var text2 = $(this).text();
                var a1 = $("<a>", { "class": "a1" }).text(text1); //a1
                var a2 = $("<a>", { "class": "a2" }).text(text2); //a2
                $(".nav").append(a1).append('>').append(a2);
                for (var key in Books) {
                    var books = Books[key];
                    var book = books[text2];
                    setCenter(book);//设置center内容
                }
                drag();
                $(".a1").click(function () {
                    a1Click($(this));//点击导航触发方法
                });
            });
        });

    });

});

///点击导航或者第一级菜单触发相同方法//
//方法：设置导航.nav和center内容，触发拖拽//
function a1Click(target) {
    $(".centerDiv").empty();
    $(".nav").empty();
    var text = target.text();
    var a1 = $("<a>", { "class": "a1" }).text(text); //a1
    $(".nav").append(a1);
    var books = Books[text];
    for (var key2 in books) {
        var book = books[key2];
        setCenter(book);//设置center内容
    }
    drag();//触发拖拽
}

///设置center内容///
function setCenter(book) {
    for (var i in book) {
        var bookDiv = $("<div>", { "class": "book" });
        var img = $("<img>").attr("class", "exhibit").attr("src", "images/" + i + ".jpg");
        var p1 = $("<p>", { "class": "p1" }).text(book[i].name);
        var p2 = $("<p>", { "class": "p2" }).text("$" + book[i].price);
        bookDiv.append(img).append(p1).append(p2);
        $(".centerDiv").append(bookDiv);
        bookDiv.attr("number", i);
    }
}

///拖拽///
function drag() {
    var move = false; //移动标记 
    var _x, _y; //鼠标离控件左上角的相对位置 
    $(".book").each(function () {
        var target = $(this);
        target.mousedown(function (e) {
            var patch = parseInt(target.css("height")) / 5;//鼠标相对于对象son的位置
        /*    if(e.preventDafault){
                e.preventDafault();//FF
            }else{
                e.returnvalue = false;//IE
            }*/
            //点击效果//
            var son = $("<div>", { "class": "son" });
            var srcSon = target.find('.exhibit').attr("src");
            var p1Son = target.find('.p1').text();
            var p2Son = target.find('.p2').text();
            var img = $("<div>").attr("class", "exhibitSon").css({ "background": "url(" + srcSon + ")", "background-repeat": "no-repeat", "background-size": "100% 100%", "-moz-background-size": "100% 100%", "-o-background-size": "100% 100%", "-webkit-background-size": "100% 100%" });
            var p1 = $("<p>").text(p1Son);
            var p2 = $("<p>").text(p2Son);
            son.append(img).append(p1).append(p2);
            $("#center").append(son);
            //拖拽移动效果//
            $(document).mousemove(function (event) {
                ///取消默认拖拽
               /* var e = window.event?window.event:event;
                if(e){
                    e.preventDafault();//FF
                }else{
                    e.returnvalue = false;//IE
                }*/
                //记录位置//
                var ox = event.pageX; //鼠标位置
                var oy = event.pageY;
                var t = oy - patch;
                var l = ox - patch;
                var w = $(window).width() - target.width();
                var h = $(window).height() - target.height();
                if (t < 0) {
                    t = 0;
                }
                else if (t > h) {
                    t = h;
                }
                if (l < 0) {
                    l = 0;
                }
                else if (l > w) {
                    l = w;
                }
                son.css({ top: t, left: l });
                

            }).mouseup(function () {//放松鼠标效果//加入购物车
                $(document).off("mousemove");
                $(document).off("mouseup");
                son.remove();
                var left = parseInt($("#right").css("left"));
                var r = 120 + parseInt(son.css("left"));
                if (r > left) {
                    insetCart(target);//加入购物车方法
                }
            });

        });
    });

}


///加入购物车 ///
function insetCart(target) {
    var exit = true;
    $(".bookCart").each(function () {
        if (target.attr("number") == $(this).attr("number")) {
            exit = false;
            target2 = $(this);
        }
    });
    //如果购物车不存在就加上数据进购物车
    if (exit) {
        var cart = $("<div>", { "class": "bookCart" });
        var srcCart = target.find('.exhibit').attr("src");
        var p1Cart = target.find('.p1').text();
        var p2Cart = target.find('.p2').text();
        var img = $("<div>").attr("class", "exhibitSon").css({ "background": "url(" + srcCart + ")", "background-repeat": "no-repeat", "background-size": "100% 100%", "-moz-background-size": "100% 100%", "-o-background-size": "100% 100%", "-webkit-background-size": "100% 100%" });
        var p1 = $("<p>", { "class": "p1" }).text(p1Cart);
        var p2 = $("<p>", { "class": "p2" }).text(p2Cart);
        var change1 = $("<div>", { "class": "numChange" });
        change1.append(p1).append(p2);
        var change2 = $("<div class='numChange2'><input class='num' value=1 /><button class='up'>▲</button><button class='down'>▼</button></div>");
        cart.append(img).append(change1).append(change2);
        $(".booksCart").append(cart);
        var i = target.attr("number");
        cart.attr("number", i);
    }
    //如果购物车里已存在就让number数据+1
    else {
        var num = parseInt(target2.find(".num").val());
        target2.find(".num").val(num + 1);
    }
    cartNum();
}


