<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/css/default.css"/>" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/css/responsive.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>" media="screen">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/font-awesome/css/font-awesome.min.css"/>" >
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>" media="screen">
<link rel="stylesheet" type="text/css" href="<c:url value="/pharma-resources/js/jqx-widgets/jqx.base.css"/>">
<!-- <link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher" > -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdraw.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxchart.core.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/pie.js"/>"></script>

<!-- JQUERY -->
<script src="<c:url value="/pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script src="<c:url value="/pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script src="<c:url value="/pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="/pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script src="<c:url value="/pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script src="<c:url value="/pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script src="<c:url value="/pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>


<script type="text/javascript"
	src="<c:url value="/pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharma-resources/jquery/jquery-jtemplates.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="/pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>
<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<link rel="stylesheet"
	href="<c:url value="/pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<script type="text/javascript" src="<c:url value="/pharma-resources/js/jQuery-Cookie/jquery.cookie.min.js"/>"></script>
<script src="<c:url value="/pharma-resources/alertify.js"/>"></script>

<!-- 	app_js -->

<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script src="<c:url value="/pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="/pharma-resources/alertify.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<link rel="stylesheet"
	href="<c:url value="/pharma-resources/js/jqx-widgets/jqx.energyblue.css"/>"
	type="text/css" />
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/demos.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/demos.js"/>"></script>
	
	<link
	href="<c:url value="/pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">


<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
	
	<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>

<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxloader.js"/>"></script>

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/timepeacker/jquery.datetimepicker.css"/>" />
<script
	src="<c:url value="/pharma-resources/timepeacker/jquery.datetimepicker.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
<!-- Development -->
 <script src="<c:url value="/pharma-resources/js/app_js/pharma_nearexpiry.js"/>"></script> 
<%--  <script type="text/javascript"
	src="<c:url value="/pharma-resources/js/app_js/pharma_product.js"/>"></script> --%>
<script
	src="<c:url value="/pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
	

</head>
</html>