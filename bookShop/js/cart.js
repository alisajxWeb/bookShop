function cartNum() {
    total = 0;//total price（总价）
    $(".numChange2").each(function () {
        //bind the click event of up and down 
        $(this).find(".up")[0].onclick = function () { upClick($(this)) };
        $(this).find(".down")[0].onclick = function () { downClick($(this)) };
        totalCal($(this).find(".num")[0]);
    });
}



// function of calculating the total price（计算总价函数）
function totalCal(tar) {
    var element = tar;
    if (element.value) {
        var price = parseFloat($(element).parents(".numChange2").siblings(".numChange").find(".p2").text().substring(1));
        var number = parseInt(element.value);
        var tt = price * number;
        total += tt;
        total = Math.floor(total * 100) / 100;
        $(".ttPrice>span").text(total);
    }
}

upClick = function (target) {
    //up result（up效果）
    var num = parseInt(target.siblings(".num").val());
    target.siblings(".num").val(num + 1);
    //calculating the total price(计算总价)
    var price = parseFloat(target.parents(".numChange2").siblings(".numChange").find(".p2").text().substring(1));
    total += price;
    total = Math.floor(total * 100) / 100;
    $(".ttPrice>span").text(total);
};
downClick = function (target) {
    //down result（down效果）
    var num = parseInt(target.siblings(".num").val());
    target.siblings(".num").val(num - 1);
    if (num <= 0) {
        target.parents(".bookCart").remove();
    }
    //calculating the total price(计算总价)
    var price = parseFloat(target.parents(".numChange2").siblings(".numChange").find(".p2").text().substring(1));
    total -= price;
    total = Math.floor(total * 100) / 100;
    $(".ttPrice>span").text(total);
};


/*
////可以用绑定事件来计算总价，时间关系只写个绑定事件，
////没有计算！只是绑定，注意有html在里面
//// I also can use the change event on input.num to calculating the total price
//// but the time problem just write this cold to show-how approximately

	$(function(){
        var tar = $(".num")[0];
        addOninput(tar);
    });
        
        function addOninput(tar) {
            var element = tar;
            onChangeN = function () {
                if (element.value) {
                    $("span").text(element.value);
                }
            };
            if ("\v" == "v") {//IE is true
                element.onprpertychange = onChangeN;
            } else {
                element.addEventListener("input", onChangeN, false);
            }
        }
	</script>
</head>

<body>
    <div class="numChange2">
        <input class="num"  /><span>1</span>
    </div>
</body>
 */