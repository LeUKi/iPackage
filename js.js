function findByID(pID, innerwhere) {
    var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + pID;
    $.get(getUrl, function (data, status) {
        var Content = "";
        if (data.extended.ExpressOrder != null) {
            Pdata = [];
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
            Content += "<br><div class=\"card\"><div class=\"card-header\">快递单号：" +
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
                Pdata[3] + "<br>收件地址：<a href=\"#\" data-toggle=\"tooltip\" title=\"地址编号：" +
                Pdata[6] + "\">" +
                Pdata[7] + "</a></div></div><div class=\"card-footer\">" +
                Pdata[5] + "<div class=\"btn-group-sm fR\"><button onclick='addPg(" + Pdata[0] + ")' type=\"button\" class=\"btn btn-sm btn-success fa fa-archive\"> 添加到我的快递</button></div></div></div></div>";
        }
        innerwhere.html(Content);
        updat();
    });
}

function addPg(id) {
    var temp1 = JSON.parse(localStorage.myPackagesid);
    if (temp1.includes(id)) {
        alert("你已经添加过这个快递啦！");
        return 0;
    } else {
        temp1.unshift(id);
        localStorage.myPackagesid = JSON.stringify(temp1);
    }
}

// function findByID(pID,innerwhere) {
//     var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + pID;
//     $.get(getUrl, function (data, status) {
//         var Content = "";
//         if (data.extended.ExpressOrder != null) {
//             Pdata = [];
//             Pdata[0] = data.extended.ExpressOrder.id;
//             Pdata[1] = data.extended.ExpressOrder.sender;
//             Pdata[2] = data.extended.ExpressOrder.sender_phone;
//             Pdata[3] = data.extended.ExpressOrder.goods_name;
//             Pdata[4] = data.extended.ExpressOrder.goods_type;
//             Pdata[5] = data.extended.ExpressOrder.send_time;
//             Pdata[6] = data.extended.ExpressOrder.adress.id;
//             Pdata[7] = data.extended.ExpressOrder.adress.adr;
//             Pdata[8] = data.extended.ExpressOrder.adress.phone;
//             Pdata[9] = data.extended.ExpressOrder.adress.recipient;
//             Content += "<br><div class=\"card\"><div class=\"card-header\">快递单号：" +
//                 Pdata[0] + " <button type=\"button\" class=\"btn btn-sm fR disP-btn\">展开/收缩</button></div><div class=\"disP\"><div class=\"card-body\">" +
//                 "<div style=\"position: absolute;left: 35%;\">寄件人<div class=\"fa fa-arrow-right\"> 收件人</div></div>" +
//                 "<span data-toggle=\"tooltip\" style='float: left' title=\"" +
//                 Pdata[2] + "\"><h2>" +
//                 Pdata[1] + "</h2></span>" +
//                 "<span data-toggle=\"tooltip\" title=\"" +
//                 Pdata[8] + "\" class=\"fR\"><h2>" +
//                 Pdata[9] + "</h2></span>" +
//                 "<br><br><div class=\"card-body\">快递类型：" +
//                 Pdata[4] + "<br>快递内容：" +
//                 Pdata[3] + "<br>收件地址：<a href=\"#\" data-toggle=\"tooltip\" title=\"地址编号：" +
//                 Pdata[6] + "\">" +
//                 Pdata[7] + "</a></div></div><div class=\"card-footer\">" +
//                 Pdata[5] + "<div class=\"btn-group-sm fR\"><button type=\"button\" class=\"btn btn-sm btn-info\" data-toggle=\"modal\" data-target=\"#myModal\">编辑</button><button type=\"button\" class=\"btn btn-sm btn-danger\">删除</button></div></div></div></div>";
//         }
//         innerwhere.html(Content);
//         updat();
//     });
// }

function updat() {
    $(".disP-btn").unbind();
    $(".disP-btn").click(function () {//展开收缩
        $(this).parent().next(".disP").slideToggle("fast");
    });
    $('[data-toggle="tooltip"]').tooltip();//信息弹出
}

function showmyPg() {
    var Pgidlist = JSON.parse(localStorage.myPackagesid);
    for (x in Pgidlist) {
        findByID(x, $("#"))
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
    $("#addr-btn").click(function () {//点击地址本
        $("#searchPage").slideUp("fast");
        $("#historyPage").slideUp("fast");
        $("#addrPage").slideDown("fast");
    });
    $("#hisy-btn").click(function () {//点击历史
        $("#searchPage").slideUp("fast");
        $("#historyPage").slideDown("fast");
        $("#addrPage").slideUp("fast");
    });
    $("#srch-btn").click(function () {//点击搜索
        $("#searchPage").slideDown("fast");
        $("#historyPage").slideUp("fast");
        $("#addrPage").slideUp("fast");
    });

    $("#searchcontent").keyup(function () {//搜索
        findByID($("#searchcontent").val(), $("#searchsult"));
    });
    updat();//挂载控件
    if (localStorage.myPackagesid == undefined) {//localStorage预加载
        localStorage.myPackagesid = "[]";
    }
    showmyPg();

});

