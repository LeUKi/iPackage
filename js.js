function findByID(pID, innerwhere) {//插入结果
    var Content = "";
    var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + pID;
    $.get(getUrl, function (data, status) {
        if (data.extended.ExpressOrder != null) {
            var Pdata = [];
            Pdata[0] = data.extended.ExpressOrder.id;
            Pdata[1] = data.extended.ExpressOrder.sender;
            Pdata[2] = data.extended.ExpressOrder.sender_phone;
            Pdata[3] = data.extended.ExpressOrder.goods_name;
            Pdata[4] = data.extended.ExpressOrder.goods_type;
            Pdata[5] = data.extended.ExpressOrder.send_time;
            Pdata[6] = data.extended.ExpressOrder.adress.id;
            Pdata[7] = data.extended.ExpressOrder.adress.adr;
            Pdata[8] = data.extended.ExpressOrder.adress.phone;
            Pdata[9] = data.extended.ExpressOrder.adress.recipient;
            Content += "<br><div class=\"card\"><div class=\"card-header\"><div class='fa fa-archive'> ID-</div>" +
                Pdata[0] + " <button type=\"button\" class=\"btn btn-sm fR disP-btn\">展开/收缩</button></div><div class=\"disP\"><div class=\"card-body\">" +
                "<div style=\"position: absolute;left: 40%;\">寄件人<div class=\"fa fa-arrow-right\"> 收件人</div></div>" +
                "<span data-toggle=\"tooltip\" style='float: left' title=\"" +
                Pdata[2] + "\"><h2>" +
                Pdata[1] + "</h2></span>" +
                "<span data-toggle=\"tooltip\" title=\"" +
                Pdata[8] + "\" class=\"fR\"><h2>" +
                Pdata[9] + "</h2></span>" +
                "<br><br><div class=\"card-body\">快递类型：" +
                Pdata[4] + "<br>快递内容：" +
                Pdata[3] + "<br>收件地址：<span data-toggle=\"tooltip\" title=\"地址编号：" +
                Pdata[6] + "\">" +
                Pdata[7] + "</span></div></div><div class=\"card-footer\">" +
                Pdata[5] + "<div class=\"btn-group-sm fR\"><button onclick=\"addPg(" + Pdata[0] + ',' + Pdata[6] + ")\" type=\"button\" class=\"btn btn-sm btn-success fa fa-archive\"> 添加到我的快递</button></div></div></div></div>";
        }
        innerwhere.html(Content);
        updat();
    });
}

function showall() {
    var Content = "";
    var getUrl = "http://118.178.125.139:8080/findAllExpressOrder";
    $.get(getUrl, function (data, status) {
        var Content = "";
        var list = data.extended.List;
        for (x in list) {
            var Pdata = [];
            Pdata[0] = list[x].id;
            Pdata[1] = list[x].sender;
            Pdata[2] = list[x].sender_phone;
            Pdata[3] = list[x].goods_name;
            Pdata[4] = list[x].goods_type;
            Pdata[5] = list[x].send_time;
            Pdata[6] = list[x].adress.id;
            Pdata[7] = list[x].adress.adr
            Pdata[8] = list[x].adress.phone;
            Pdata[9] = list[x].adress.recipient;
            Content += "<br><div class=\"card\"><div class=\"card-header\"><div class='fa fa-archive'> ID-</div>" +
                Pdata[0] + " <button type=\"button\" class=\"btn btn-sm fR disP-btn\">展开/收缩</button></div><div style=\'display: none\' class=\"disP\"><div class=\"card-body\">" +
                "<div style=\"position: absolute;left: 40%;\">寄件人<div class=\"fa fa-arrow-right\"> 收件人</div></div>" +
                "<span data-toggle=\"tooltip\" style='float: left' title=\"" +
                Pdata[2] + "\"><h2>" +
                Pdata[1] + "</h2></span>" +
                "<span data-toggle=\"tooltip\" title=\"" +
                Pdata[8] + "\" class=\"fR\"><h2>" +
                Pdata[9] + "</h2></span>" +
                "<br><br><div class=\"card-body\">快递类型：" +
                Pdata[4] + "<br>快递内容：" +
                Pdata[3] + "<br>收件地址：<span data-toggle=\"tooltip\" title=\"地址编号：" +
                Pdata[6] + "\">" +
                Pdata[7] + "</span></div></div><div class=\"card-footer\">" +
                Pdata[5] + "<div class=\"btn-group-sm fR\"><button onclick=\"addPg(" + Pdata[0] + ',' + Pdata[6] + ")\" type=\"button\" class=\"btn btn-sm btn-success fa fa-archive\"> 添加到我的快递</button></div></div></div></div>";
        }
        $("#searchsult").html(Content);
        updat();
    });
}

function addPg(id, addrid) {
    var temp1 = JSON.parse(localStorage.myPackagesid);
    if (temp1.includes(id)) {
        alert("你已经添加过这个快递啦！");
    } else {
        temp1.unshift(id);
        localStorage.myPackagesid = JSON.stringify(temp1);
    }
    var temp2 = JSON.parse(localStorage.addrid);
    if (!temp2.includes(addrid)) {
        temp2.unshift(addrid);
        localStorage.addrid = JSON.stringify(temp2);
    }
}

function showAddr() {//显示‍地址簿
    $("#addrsult").html("");
    var addrid = JSON.parse(localStorage.addrid);
    if (addrid.length != 0) {
        for (x in addrid) {
            var getUrl = "http://118.178.125.139:8080/findByAdressID?id=" + addrid[x];
            $.get(getUrl, function (data, status) {
                var Adata = [];
                Adata[0] = data.extended.Adress.id;
                Adata[1] = data.extended.Adress.adr;
                Adata[2] = data.extended.Adress.phone;
                Adata[3] = data.extended.Adress.recipient;
                var addrlist = "<br><div class=\"card\" id=\"addr-notes\"><div class=\"card-body\"><div class=\"input-group \"><input type=\"text\" class=\"form-control\" placeholder=\"" +
                    Adata[3] + "\" disabled><input type=\"text\" class=\"form-control\" placeholder=\"" +
                    Adata[2] + "\" disabled><div class=\"input-group-append\"><button data-toggle=\"modal\" data-target=\"#myModal\" chaddr=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-primary fR fa fa-pencil\"> 改</button><button deladdr=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-danger fR fa fa-times\"> 删</button></div></div><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"" +
                    Adata[1] + "\" disabled><div class=\"input-group-append\"><button tonew=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-info fR fa fa-paper-plane tonew\"> 创建新快递</button></div></div></div></div>";
                $("#addrsult").append(addrlist);
                lisenaddr();
            })
        }
    }
}

function lisenaddr() {
    $("[deladdr]").unbind();
    $("[deladdr]").click(function (e) {
        var temp1 = JSON.parse(localStorage.addrid);
        var temp2 = temp1.indexOf($(this).attr("chaddr"));
        temp1.splice(temp2, 1);
        localStorage.addrid = JSON.stringify(temp1);
        showAddr();
    });
    $(".tonew").unbind();
    $(".tonew").click(function () {//点击搜索
        $("#searchPage").slideDown("fast");
        $("#addrPage").slideUp("fast");
        $("#searchsult").html("");
        var getUrl = "http://118.178.125.139:8080/findByAdressID?id=" + $(this).attr("tonew");
        $.get(getUrl, function (data, status) {
            $("#ok-addr-name").attr("addr-id", data.extended.Adress.id);
            $("#ok-addr-name").attr("placeholder", data.extended.Adress.recipient);
            $("#ok-addr-tell").attr("placeholder", data.extended.Adress.phone);
            $("#ok-addr-addr").attr("placeholder", data.extended.Adress.adr);
        })
    });
}

function newaddr() {
    var name = $("#newaddr-name").val();
    var tell = $("#newaddr-tell").val();
    var addr = $("#newaddr-addr").val();
    $.post("http://118.178.125.139:8080/addAdress?adr=" + addr + "&phone=" + tell + "&recipient=" + name, function () {
        var getUrl = "http://118.178.125.139:8080/findOrder?adr=" + addr + "&phone=" + tell + "&recipient=" + name;
        $.get(getUrl, function (data, status) {
            var temp2 = JSON.parse(localStorage.addrid);
            if (!temp2.includes(data.extended.List[0].id)) {
                temp2.unshift(data.extended.List[0].id);
                localStorage.addrid = JSON.stringify(temp2);
            }
            showAddr();
            $("#newaddr-name").val("");
            $("#newaddr-tell").val("");
            $("#newaddr-addr").val("");
        });
    });

}

function updat() {
    $(".disP-btn").unbind();
    $(".disP-btn").click(function () {//展开收缩
        $(this).parent().next(".disP").slideToggle("fast");
    });
    $('[data-toggle="tooltip"]').tooltip();//信息弹出
}

function showmyPg() {
    var Pgidlist = JSON.parse(localStorage.myPackagesid);
    $("#histsult").html("<br><div class=\'card\'><div class=\"card-body\">你还没有快递哦！<br>你可以点击 <button type=\"button\" class=\"btn btn-sm bg-primary fa fa-search srch-btn\" style=\"color: white\"> 添加快递</button> 以搜索或添加你的快递。</div></divc>");
    if (Pgidlist.length != 0) {
        $("#histsult").html("");
        for (x in Pgidlist) {
            var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + Pgidlist[x];
            $.get(getUrl, function (data, status) {
                var Pdata = [];
                Pdata[0] = data.extended.ExpressOrder.id;
                Pdata[1] = data.extended.ExpressOrder.sender;
                Pdata[2] = data.extended.ExpressOrder.sender_phone;
                Pdata[3] = data.extended.ExpressOrder.goods_name;
                Pdata[4] = data.extended.ExpressOrder.goods_type;
                Pdata[5] = data.extended.ExpressOrder.send_time;
                Pdata[6] = data.extended.ExpressOrder.adress.id;
                Pdata[7] = data.extended.ExpressOrder.adress.adr;
                Pdata[8] = data.extended.ExpressOrder.adress.phone;
                Pdata[9] = data.extended.ExpressOrder.adress.recipient;
                var Content = "<br><div class=\"card\"><div class=\"card-header\"><div class='fa fa-archive'> ID-</div>" +
                    Pdata[0] + " <button type=\"button\" class=\"btn btn-sm fR disP-btn\">展开/收缩</button></div><div class=\"disP\" style='display: none'><div class=\"card-body\">" +
                    "<div style=\"position: absolute;left: 40%;\">寄件人<div class=\"fa fa-arrow-right\"> 收件人</div></div>" +
                    "<span data-toggle=\"tooltip\" style='float: left' title=\"" +
                    Pdata[2] + "\"><h2>" +
                    Pdata[1] + "</h2></span>" +
                    "<span data-toggle=\"tooltip\" title=\"" +
                    Pdata[8] + "\" class=\"fR\"><h2>" +
                    Pdata[9] + "</h2></span>" +
                    "<br><br><div class=\"card-body\">快递类型：" +
                    Pdata[4] + "<br>快递内容：" +
                    Pdata[3] + "<br>收件地址：<span data-toggle=\"tooltip\" title=\"地址编号：" +
                    Pdata[6] + "\">" +
                    Pdata[7] + "</span></div></div><div class=\"card-footer\">" +
                    Pdata[5] + "<div class=\"btn-group-sm fR\"><button type=\"button\" class=\"btn btn-sm btn-primary fa fa-pencil\" data-toggle=\"modal\" data-target=\"#myModal\"></button><button type=\"button\" class=\"btn btn-sm btn-danger fa fa-trash-o\" data-toggle=\"tooltip\" title=\"这将从服务器中删除\"></button></div></div></div></div>";
                $("#histsult").append(Content);
                updat()
            });

        }

    }
}

function newpg() {
    if ($("#ok-addr-name").attr("addr-id")) {
        var addr = $("#ok-addr-name").attr("addr-id");
        var name = $("#ok-sender-name").val();
        var tell = $("#ok-sender-tell").val();
        var kind = $("#ok-kind").val();
        var cont = $("#ok-content").val();
        var post = "http://118.178.125.139:8080/addExpressOrder?aid=" + addr + "&goods_name=" + cont + "&goods_type=" + kind + "&sender=" + name + "&sender_phone=" + tell;
        $.post(post, function () {
            var get = "http://118.178.125.139:8080/findByAdressID?id=" + addr;
            $.get(get, function (data) {
                var list = data.extended.Adress.expressOrders;
                for (x in list) {
                    if (list[x].sender == name && list[x].sender_phone == tell && list[x].goods_name == cont && list[x].goods_type == kind) {
                        var temp1 = JSON.parse(localStorage.myPackagesid);
                        temp1.unshift(list[x].id);
                        localStorage.myPackagesid = JSON.stringify(temp1);
                    }
                }
                $("#ok-sender-name").val("");
                $("#ok-sender-tell").val("");
                $("#ok-kind").val("");
                $("#ok-content").val("");
                $("#searchPage").slideUp("fast");
                $("#historyPage").slideDown("fast");
                showmyPg();
            });
        });
    }
}

$(function () {
    $(".addr-btn").click(function () {//点击地址本
        $("#searchPage").slideUp("fast");
        $("#historyPage").slideUp("fast");
        $("#addrPage").slideDown("fast");
        showAddr();
    });
    $(".hisy-btn").click(function () {//点击历史
        $("#searchPage").slideUp("fast");
        $("#historyPage").slideDown("fast");
        $("#addrPage").slideUp("fast");
        showmyPg();
    });
    $(".srch-btn").click(function () {//点击搜索
        $("#searchPage").slideDown("fast");
        $("#historyPage").slideUp("fast");
        $("#addrPage").slideUp("fast");
    });
    $("#newaddr-btn").click(function () {//初始化地址添加按钮
        newaddr();
    });
    $("#newpg-btn").click(function () {
        newpg();
    });

    $("#showall").click(function () {//检索服务器
        showall();
    });

    $("#searchcontent").keyup(function () {//搜索
        findByID($("#searchcontent").val(), $("#searchsult"), 1);
    });
    updat();//挂载控件
    if (localStorage.myPackagesid == undefined) {//localStorage预加载
        localStorage.myPackagesid = "[]";
    }
    if (localStorage.addrid == undefined) {//localStorage预加载
        localStorage.addrid = "[]";
    }
});

