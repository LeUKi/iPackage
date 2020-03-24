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


function addPg(id, addrid) {
    var temp1 = JSON.parse(localStorage.myPackagesid);
    if (temp1.includes(id)) {
        alert("你已经添加过这个快递啦！");
        return 0;
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
                    Adata[2] + "\" disabled><div class=\"input-group-append\"><button data-toggle=\"modal\" data-target=\"#myModal\" chaddr=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-primary fR fa fa-pencil\"></button></div></div><div class=\"input-group mb-2\"><input type=\"text\" class=\"form-control\" placeholder=\"" +
                    Adata[1] + "\" disabled><div class=\"input-group-append\"><button deladdr=\"" + Adata[0] + " type=\"button\" class=\"btn btn-sm btn-danger fR fa fa-trash-o\"></button></div></div></div></div>";
                $("#addrsult").append(addrlist);
                lisenChaddr();
            })
        }
    }
}

function lisenChaddr() {
    $("[deladdr]").unbind();
    $("[deladdr]").click(function (e) {
        var temp1 = JSON.parse(localStorage.addrid);
        var temp2 = temp1.indexOf($(this).attr("chaddr"));
        temp1.splice(temp2, 1);
        localStorage.addrid = JSON.stringify(temp1);
        showAddr();
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
    $("#histsult").html("<div class=\'card\'><div class=\"card-body\">你还没有快递哦！<br>你可以点击 <button type=\"button\" class=\"btn btn-sm bg-primary fa fa-search srch-btn\" style=\"color: white\"> 添加快递</button> 以搜索或添加你的快递。</div></divc>");
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


$(function () {
    // $.get("http://118.178.125.139:8080/findAllExpressOrder", function (data, status) {
    //     var Content = "";
    //     for (x in data.extended.List) {
    //         Content += "<div class=\"card\">" + "<div class=\"card-body\">" + data.extended.List[x].id + " | " + data.extended.List[x].sender + "</div></div><br>";
    //     }
    //     $("#AllExs").html(Content);
    // });
    $(".addr-btn").click(function () {//点击地址本
        $("#searchPage").slideUp("fast");
        $("#historyPage").slideUp("fast");
        $("#addrPage").slideDown("fast");
        // showAddr();
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

