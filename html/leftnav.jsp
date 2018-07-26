<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="ctx" value="${pageContext.request.contextPath}">
</c:set>

<script>
	var ctx = "${ctx}";
</script>



<html>





<%-- <link href="${ctx}/jqGrid/css/jquery-ui-1.8.16.custom.css">
<link href="${ctx}/jqGrid/css/ui.jqgrid.css" rel="stylesheet">
<link href="${ctx}/jqGrid/css/bootstrap-datepicker3.min.css">
<link href="${ctx}/jqGrid/css/ace.min.css" rel="stylesheet">
<link href="${ctx}/jqGrid/fonts/4.5.0/css/font-awesome.css" rel="stylesheet">
<link href="${ctx}/jqGrid/fonts/4.5.0/css/font-awesome.min.css" rel="stylesheet">
<link href="${ctx}/jqGrid/css/easyui.css" rel="stylesheet">
<link href="${ctx}/jqGrid/css/icon.css" rel="stylesheet">



<script src="${ctx}/jqGrid/js/jquery-2.1.4.min.js"></script>
<script src="${ctx}/jqGrid/js/jquery.jqGrid.src.js"></script>
<script src="${ctx}/jqGrid/js/jquery.jqGrid.min.js"></script>
<script src="${ctx}/jqGrid/js/grid.locale-en.js"></script>
<script src="${ctx}/js/a.js"></script>  --%>


<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/bootstrap.min.css" />
<script src="${ctx}/js/jquery-1.3.2.js"></script>

<script type="text/javascript">
	$(function() {
		console.log(window.location.pathname)
		if (window.location.pathname == '/lectureManagement/leader/noaudit'
				|| window.location.pathname == '/lectureManagement/leader/waitaudit'
				|| window.location.pathname == '/lectureManagement/leader/audited') {
			$('.subNav').eq(1).addClass('currentDd currentDt')
			$('.navContent').eq(0).css('display', 'block').siblings(
					'.navContent').css('display', 'none')
			if (window.location.pathname == '/lectureManagement/leader/noaudit') {
				/* $('.navContent').eq(0).css

				navContent li a:hover */
			}

		} else if (window.location.pathname == '/lectureManagement/leader/publishlucture'
				|| window.location.pathname == '/lectureManagement/leader/lucturepictureupload') {
			console.log($('.navContent').eq(1))
			$('.subNav').eq(2).addClass('currentDd currentDt')
			$('.navContent').eq(1).css('display', 'block').siblings(
					'.navContent').css('display', 'none')
		} else {
		}

		$(".subNav").click(
				function() {
					console.log($(this))
					$(this).toggleClass("currentDd").siblings(".subNav")
							.removeClass("currentDd")
					$(this).toggleClass("currentDt").siblings(".subNav")
							.removeClass("currentDt")

					// 修改数字控制速度， slideUp(500)控制卷起速度
					$(this).next(".navContent").slideToggle(500).siblings(
							".navContent").slideUp(500);

				})
	})
</script>


<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/jquery-ui-1.8.16.custom.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/bootstrap-datepicker3.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/css/ace.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/font-awesome/4.5.0/css/font-awesome.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/assets/font-awesome/4.5.0/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/user/easy-ui/themes/gray/easyui.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx}/user/easy-ui/themes/icon.css" />

<script src="${ctx}/assets/js/jquery-2.1.4.min.js"></script>
<script src="${ctx}/assets/js/jquery.jqGrid.src.js"></script>
<script src="${ctx}/assets/js/jquery.jqGrid.min.js"></script>
<script src="${ctx}/assets/js/grid.locale-en.js"></script>
<script src="${ctx}/assets/js/bootstrap.min.js"></script>
<script src="${ctx}/js/noaudit.js"></script>
<script src="${ctx}/js/publishlucture.js"></script>
<script src="${ctx}/js/lucturepictureupload.js"></script>
<script src="${ctx}/js/updatapassword.js"></script>
<link href="${ctx}/css/leader.css" rel="stylesheet">
<link href="${ctx}/css/leftnav.css" rel="stylesheet">



<style type="text/css">
.modal-backdrop {
	z-index: -1
}

* {
	margin: 0;
	padding: 0;
}

.left {
	float: left;
	width: 210px;
	height: 84%;
	background-color: whitesmoke;
}

.left-shuxian {
	position: relative;
	left: 195px;
	top: -80px;
	width: 1.5px;
	height: 97%;
	/* background-color: darkgray; */
}

.content {
	margin: 20px 40px 160px 80px;
	margin-left: 240px;
}

  .conbgbtm a:active{color:red;}


</style>


</head>
<body>
	<!--左侧菜单栏  -->
	<div class="conbgbtm">
		<div class="left">
			<div class="subNavBox">
				<a href="${ctx}/leader/home"><div class="subNav"
						style="background: url();">首页</div></a>

				<div class="subNav">审核</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/noaudit">未审核</a></li>
					<li><a href="${ctx}/leader/waitaudit">审核中</a></li>
					<li><a href="${ctx}/leader/audited">已审核</a></li>
				</ul>

				<div class="subNav">讲座</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/publishlucture">讲座发布</a></li>
					<li><a href="${ctx}/leader/lucturepictureupload">已发布讲座</a></li>
				</ul>
				<div class="subNav">费用</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/costgive">费用发放</a></li>
					<li><a href="${ctx}/leader/costcheck">费用查看</a></li>
					<li><a href="${ctx}/leader/coststatistics">费用统计</a></li>
				</ul>
				<div class="subNav">参会</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/jioninformation">学生信息</a></li>
				</ul>
				<div class="subNav">资料</div>
				<ul class="navContent">
					<li><a href="#">资料归档</a></li>
					<li><a href="#">历史归档</a></li>
				</ul>
				<div class="subNav">工具</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/updatapassword">设置申请码</a></li>
				</ul>

				<div class="subNav">账号</div>
				<ul class="navContent">
					<li><a href="${ctx}/leader/updatapassword">密码修改</a></li>

				</ul>
			</div>
		</div>
	</div>



	<div class="content">

		<sitemesh:write property='body'>

		</sitemesh:write>
	</div>

	</div>
</body>

</html>
