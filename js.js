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
        $("#searchsult").html(Content);
        updat();
    });
}

function findbyname(name1) {
    var getUrl = "http://118.178.125.139:8080/findOrder?recipient=" + name1;
    $.get(getUrl, function (data, status) {
        var Content = "";
        var list = data.extended.List[0].expressOrders;
        var Pdata = [];
        Pdata[6] = data.extended.List[0].id;//
        Pdata[7] = data.extended.List[0].adr;//
        Pdata[8] = data.extended.List[0].phone;//
        Pdata[9] = data.extended.List[0].recipient;//
        for (x in list) {
            Pdata[0] = list[x].id;
            Pdata[1] = list[x].sender;
            Pdata[2] = list[x].sender_phone;
            Pdata[3] = list[x].goods_name;
            Pdata[4] = list[x].goods_type;
            Pdata[5] = list[x].send_time;
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
        $("#searchsult").html(Content);
        updat();
    });
}

function showall() {
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
            Pdata[7] = list[x].adress.adr;
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
                    Adata[2] + "\" disabled><div class=\"input-group-append\"><button data-toggle=\"modal\" data-target=\"#myModal\" chaddr=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-primary fR fa fa-pencil\"></button><button deladdr=\"" + Adata[0] + "\" type=\"button\" class=\"btn btn-sm btn-danger fR fa fa-times\"></button></div></div><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"" +
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
    $("[chaddr]").unbind();
    $("[chaddr]").click(function () {
        $("#mtk-head").html("<div class=\"fa fa-address-card\"> 地址修改 AddressID-" + $(this).attr("chaddr") + "</div>");
        var getUrl = "http://118.178.125.139:8080/findByAdressID?id=" + $(this).attr("chaddr");
        $.get(getUrl, function (data, status) {
            $("#mtk-body").html("<div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"收件姓名\" id=\"chaddr-name\"/><input type=\"text\" class=\"form-control\" placeholder=\'收件电话\' id=\'chaddr-tell\'/></div> <div class=\'input-group\'><input type=\'text\' class=\'form-control\' placeholder=\'收件地址\' id=\'chaddr-addr\'/></div>");
            $("#chaddr-name").val(data.extended.Adress.recipient);
            $("#chaddr-addr").val(data.extended.Adress.adr);
            $("#chaddr-tell").val(data.extended.Adress.phone);
            $("#okokok").unbind();
            $("#okokok").click(function () {
                var temp = "http://118.178.125.139:8080/updateAdress?adr=" + $("#chaddr-addr").val() + "&id=" + data.extended.Adress.id +
                    "&phone=" + $("#chaddr-tell").val() + "&recipient=" + $("#chaddr-name").val();
                $.post(temp, function () {
                        showAddr();
                    }
                )
            });
        });
    });
}

function lisenPg() {
    $("[delpgid]").unbind();
    $("[delpgid]").click(function () {
        var temp1 = JSON.parse(localStorage.myPackagesid);
        var temp2 = temp1.indexOf($(this).attr("delpgid"));
        temp1.splice(temp2, 1);
        localStorage.myPackagesid = JSON.stringify(temp1);
        showmyPg();
    });
    $("[chpg]").unbind();
    $("[chpg]").click(function () {
        $("#mtk-head").html("<div class=\"fa fa-archive\"> 修改快递 ID-" + $(this).attr("chpg") + "</div>");
        var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + $(this).attr("chpg");
        $.get(getUrl, function (data, status) {
            $("#mtk-body").html("<div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">AddressID</span></div><input type=\"text\" class=\"form-control\" placeholder=\"AddressID\" id=\"chpg-addrid\"></div><div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">寄件人</span></div><input type=\"text\" class=\"form-control\" placeholder=\"姓名\" id=\"chpg-sender-name\"><input type=\"text\" class=\"form-control\" placeholder=\"电话\" id=\"chpg-sender-tell\"></div><div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">快递类型</span></div><input type=\"text\" class=\"form-control\" placeholder=\"快递类型\" id=\"chpg-kind\"></div><div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">快递内容</span></div><input type=\"text\" class=\"form-control\" placeholder=\"快递内容\" id=\"chpg-content\"></div>");
            $("#okokok").unbind();
            $("#okokok").click(function () {
                var temp = "http://118.178.125.139:8080/updateExpressOrder?aid=" + $("#chpg-addrid").val() + "&goods_name=" + $("#chpg-content").val() + "&goods_type=" + $("#chpg-kind").val() + "&id=" + data.extended.ExpressOrder.id + "&sender=" + $("#chpg-sender-name").val() + "&sender_phone=" + $("#chpg-sender-tell").val();
                alert(temp);
                $.post(temp, function () {
                        showmyPg();
                    }
                );
            });
            $("#chpg-addrid").val(data.extended.ExpressOrder.adress.id);
            $("#chpg-sender-name").val(data.extended.ExpressOrder.sender);
            $("#chpg-sender-tell").val(data.extended.ExpressOrder.sender_phone);
            $("#chpg-kind").val(data.extended.ExpressOrder.goods_type);
            $("#chpg-content").val(data.extended.ExpressOrder.goods_name);
        });
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
        var namelist = {};
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
                    Pdata[2] + "\"><h2 class=\'senders\'>" +
                    Pdata[1] + "</h2></span>" +
                    "<span data-toggle=\"tooltip\" title=\"" +
                    Pdata[8] + "\" class=\"fR\"><h2 class=\'recname\'>" +
                    Pdata[9] + "</h2></span>" +
                    "<br><br><div class=\"card-body\">快递类型：" +
                    Pdata[4] + "<br>快递内容：" +
                    Pdata[3] + "<br>收件地址：<span data-toggle=\"tooltip\" title=\"地址编号：" +
                    Pdata[6] + "\">" +
                    Pdata[7] + "</span></div></div><div class=\"card-footer\">" +
                    Pdata[5] + "<div class=\"btn-group-sm fR\"><button chpg=\'" + Pdata[0] + "\' type=\"button\" class=\"btn btn-sm btn-primary fa fa-pencil\" data-toggle=\"modal\" data-target=\"#myModal\"></button><button type=\"button\" class=\"btn btn-sm btn-danger fa fa-times\" delpgid=\'" + Pdata[0] + "\' data-toggle=\"tooltip\" title=\"仅清除本地\"></button></div></div></div></div>";
                $("#histsult").append(Content);
                if (namelist[Pdata[9]] == undefined) {
                    namelist[Pdata[9]] = 1;
                } else {
                    namelist[Pdata[9]] += 1;
                }
                localStorage.recnamelist = JSON.stringify(namelist);
                updat();
                lisenPg();
                showecharts();
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

function showecharts() {
    var list = JSON.parse(localStorage.recnamelist);
    var data1 = [];
    for (x in list) {
        var temp = {};
        temp.value = list[x];
        temp.name = x;
        data1.unshift(temp);
    }
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        series: [
            {
                name: '收件统计',
                type: 'pie',
                radius: '90%',
                data: data1
            }
        ],
        tooltip: {}
    })
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
        $("#searchsult").html("");
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
        if (isNaN($("#searchcontent").val())) {
            findbyname($("#searchcontent").val());
        } else {
            findByID($("#searchcontent").val());
        }
    });
    updat();//挂载控件
    if (localStorage.myPackagesid == undefined) {//localStorage预加载
        localStorage.myPackagesid = "[]";
    }
    if (localStorage.addrid == undefined) {//localStorage预加载
        localStorage.addrid = "[]";
    }
});

