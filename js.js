function findByID(pID) {
    var getUrl = "http://118.178.125.139:8080/findByExpressOrderID?id=" + pID;
    $.get(getUrl, function (data, status) {
        var Content = "";
        for (x in data.extended.List) {
            Content += "<div class=\"card\">" + "<div class=\"card-body\">" + data.extended.List[x].id + " | " + data.extended.List[x].sender + "</div></div><br>";
        }
        $("#AllExs").html(Content);
    });
}


$(function () {
    // $.get("http://118.178.125.139:8080/findAllExpressOrder", function (data, status) {
    //     var Content = "";
    //     for (x in data.extended.List) {
    //         Content += "<div class=\"card\">" + "<div class=\"card-body\">" + data.extended.List[x].id + " | " + data.extended.List[x].sender + "</div></div><br>";
    //     }
    //     $("#AllExs").html(Content);
    // });
    $('[data-toggle="tooltip"]').tooltip();//信息弹出
    $("#addr-btn").click(function () {//搜索弹出
        $("#addr-notes").slideToggle("fast");
    });
});
