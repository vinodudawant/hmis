<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<html lang="en">

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>IVF Master</title>

<!--Color Picker CSS-->
<link rel="stylesheet" type="text/css"
	href="js/colorpicker/css/colorpicker.min.css">
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css"
	media="screen">
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css">

<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- FULL CALENDAR -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>

<link rel="stylesheet" type="text/css" href="js/select2/select2.min.css" />
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--Small Cal-->
<link rel="stylesheet" type="text/css" charset="utf-8"  href="css/scal.css">


<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>
<!-- <script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/appointment.js"></script> -->
<script type="text/javascript" src="js/select2/select2.min.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<!-- <script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/registration.js"></script> -->


<!-- New Js Files -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->



<link href="appointment/myTheme.css" rel="stylesheet" media="screen" />
<link href="appointment/defaultTheme.css" rel="stylesheet"
	media="screen" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>

<link href="appointment/960.css" rel="stylesheet" media="screen" />
<script src="appointment/jquery.fixedheadertable.js"></script>

<!-- <link rel="stylesheet"
	href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<script
	src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->


<link rel="stylesheet" type="text/css"	href="css/bootstrap-toggle.min.css" />

<script src="js/bootstrap-toggle.min.js"></script>
<!-- JAVASCRIPTS -->
<!-- Placed at the end of the document so the pages load faster -->

<!--Color Picker-->
<script type="text/javascript"
	src="js/colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>

<!-- UNIFORM -->
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- DATA TABLES -->
<script type="text/javascript"
	src="js/datatables/media/js/jquery.dataTables.min.js"></script>

<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript"
	src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>

<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>

<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script src="auto/bootstrap-typeahead2.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script src="js/ehat_ivf.js"></script>

<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
	

<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("calendar"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

	});
</script>

<script type="text/javascript">
	onload = function() {
		fetchIVFCoupleList('Active');
		//autoSuggestionforMalePatient("txtPatientName", "onload");
	}
	$(function() {
		$("#ehat_module_44").addClass("menuActive");

	});
</script>

<!-- /JAVASCRIPTS -->
<style>
.fixed-panel {
 height: 103px;
  overflow-y: scroll;
}
</style>

<!--Added for toggle   -->
<style>
        
/*  Toggle Switch  */

.toggleSwitch span span {
  display: none;
}

@media only screen {
  .toggleSwitch {
    display: inline-block;
    height: 17px;
    position: relative;
    overflow: visible;
    padding: 0;
    margin-left: 50px;
    cursor: pointer;
    width: 70px;
      user-select: none;
  }
  .toggleSwitch * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .toggleSwitch label,
  .toggleSwitch > span {
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .toggleSwitch input:focus ~ a,
  .toggleSwitch input:focus + label {
    outline: none;
  }
  .toggleSwitch label {
    position: relative;
    z-index: 3;
    display: block;
    width: 100%;
  }
  .toggleSwitch input {
    position: absolute;
    opacity: 0;
    z-index: 5;
  }
  .toggleSwitch > span {
    position: absolute;
    left: -50px;
    width: 100%;
    margin: 0;
    padding-right: 50px;
    text-align: left;
    white-space: nowrap;
  }
  .toggleSwitch > span span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 50%;
    margin-left: 50px;
    text-align: left;
    font-size: 0.9em;
    width: 100%;
    left: 15%;
    top: -1px;
    opacity: 0;
  }
  .toggleSwitch a {
    position: absolute;
    right: 50%;
    z-index: 4;
    display: block;
    height: 100%;
    padding: 0;
    left: 2px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #CCC;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .toggleSwitch > span span:first-of-type {
    color: #ccc;
    opacity: 1;
    left: 45%;
  }
  .toggleSwitch > span:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50px;
    top: -2px;
    background-color: red;
    border: 1px solid #ccc;
    border-radius: 30px;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
  }
  .toggleSwitch input:checked ~ a {
    border-color: #fff;
    left: 100%;
    margin-left: -8px;
  }
  .toggleSwitch input:checked ~ span:before {
    border-color: green;
    box-shadow: inset 0 0 0 30px green;
  }
  .toggleSwitch input:checked ~ span span:first-of-type {
    opacity: 0;
  }
  .toggleSwitch input:checked ~ span span:last-of-type {
    opacity: 1;
    color: #fff;
  }
}
</style>


<!--  End Toggle-->
</head>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date1 = formatter1.format(currentDate.getTime());
	
%>
<body>

	<c:if test="${ sessionScope.userType != null }">
		<input type="hidden" id="todays_date" value="<%=todays_date%>" />
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<!-- <div id="outer" class="container-main" style="width: 100%;"> -->
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
 			<%@include file="Menu_Header.jsp"%> 
			<%-- <%@include file="Menu_Header_Nobel.jsp"%> --%>
		</header>
		<!--/HEADER -->

		<section id="page">

			<%@include file="left_menu_ivf.jsp"%>

			<div id="main-content">

			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header" id="headerforsave">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
									    <li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
										<li><a href="ivf_master.jsp">IVF Treatment</a></li>
                                    </ul>
								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->


						<!-- SAMPLE -->
						<div class="row">
							<div class="col-sm-12">

								<!-- <div class="col-md-12" id="getPatDiv"> -->

									<div class="box-body form">

										<form id="wizForm" action="#" class="form-horizontal">

											<div class="wizard-form" id="tabs">
												<div class="wizard-content" id="tabs">
													<ul class="nav nav-pills nav-justified steps">
													
													  <li id="accountLi"  class="active"><a href="#ActiveCouple" data-toggle="tab"
															onclick="fetchIVFCoupleList('Active');" class="wiz-step active"> <span class="step-number">
															Active Couple</span> <span class="step-name"><i
																	class="fa fa-check"></i> </span>
														</a></li>
													
														<li  ><a href="#GenerateCouple"
															onclick="getRegUi();" data-toggle="tab"
															class="wiz-step "> <i class="fa fa-bullhorn"></i>
																<span class="step-number"> Generate Couple</span> <span
																class="step-name"> <i class="fa fa-user"></i></span>
														</a></li>

														
														
														<li style="display: none"><a href="#PassiveCouple" data-toggle="tab"
															onclick="fetchIVFCoupleList('Passive');" class="wiz-step"> 
															<span class="step-number">Passive Couple</span> <span class="step-name"><i
																	class="fa fa-check"></i> </span>
														</a></li>
														<li><a href="#GenerateBatch" data-toggle="tab"
															onclick="fetchIVFCoupleList('Active','batch');" class="wiz-step"> <span
																class="step-number">Generate Batch</span> <span
																class="step-name"><i class="fa fa-user"></i> </span>
														</a></li>
														
														<li><a href="#BatchedCouple" data-toggle="tab"
															onclick="fetchIVFBatchedCoupleList('N');" class="wiz-step"> <span
																class="step-number">Batched Couple</span> <span
																class="step-name"><i class="fa fa-user"></i> </span>
														</a></li>
														
														<li><a href="#CancelBatch" data-toggle="tab"
															onclick="fetchIVFBatchedCoupleList('Y');" class="wiz-step"> <span
																class="step-number">Canceled Batch</span> <span
																class="step-name"><i class="fa fa-user"></i> </span>
														</a></li>

													</ul>
													<div class="tab-content">
														<div class="alert alert-danger display-none">
															<a class="close" aria-hidden="true" href="#"
																data-dismiss="alert">×</a> Your form has errors. Please
															correct them to proceed.
														</div>
														<div class="alert alert-success display-none">
															<a class="close" aria-hidden="true" href="#"
																data-dismiss="alert">×</a> Your form validation is
															successful!
														</div>

														<div ID="GenerateCouple" class="tab-pane ">
							<div style="font-weight: bold;" class="col-md-1-1"></div>
							<div class='divide-20'></div>
							<div class="container">
								<div class="  row">
									<div class="col-sm-2-1">
										<!-- <p style="font-size: 17px;">SHR000346346</p> -->
										<h6>Couple Details</h6>
									</div>
									<div class="col-sm-3-1">
										
									</div>
									<div class="col-sm-2">
										
									</div>
									<div class="col-sm-2-1">
										<input type="button" id="createCouple"
											style="color: white; background-color: #f0ad4e; margin-left: 850px; font-size: 12px; width: 48%"
											class="btn btn-xs" value="Create Couple" onclick="SaveCoupleDetails()">

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-6 col-sm-6 col-6">
									<!-- <div style="width:220px; margin-top:10px;"> -->

									<div class="panel panel-default">
										<div class="panel-body">
											<div class="col-md-2-1 col-sm-2-1">
												<img height="85" width="70" id="divimg"
												    src="images/male.png">
													<!-- src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFhUVFRUVEhUWFRAQFRUVFRUWFhUSFRYYHSggGBolHhUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGyslHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK//AABEIALcBFAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQACAwEGB//EADsQAAEDAwMCBAQFAgUDBQAAAAEAAhEDITEEEkEFUSJhcYETkaHwBjJCsdHB4RQjUmLxcoLSFTOSorL/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBAAUG/8QAKxEAAgICAgICAQMDBQAAAAAAAAECEQMhBBIxQRNRYRQiMiNx0QVCgZHx/9oADAMBAAIRAxEAPwDwfTWlPGtMIPp1JOG07L6fHGkfLcjJcgPe5Qko1tFaCgjEd0J3hy5sJTh+nWLtOsoJZULRSXXUkxFBd/wyzqb8ohrUiFmwJ1W0yCfpYKFwHwypo5RpIkUlKARUI0hU5OwX4Sgoogqm5aD2ZQysH0yiwoWrGaptFtJXAyjnawQlLqagpruxzphdTqV7KDqCH+CqmkusxdTtfqJNghAXTKJfSAaXdhK8xruqPefhloYWEzBzHN/a3mlTyU1ZXx8Ly/x8ez0bupsaIJk9h/PCBq9anDAPWT94SIEwfYjAgceuR9FcjPEe/wB5TU7L4cLFH1Y0pdRE3AA8j6cH7snmjcHNkGQcFeNf7CeJx/a5+qJ0esfSdLCQJbIIsZAkR9crFoDPw4yX7NM9cKasWrHp2vbWbuFj+pvY/wAIpzgmUePKMoypi/VU1XTtW9dyybZYxieqNKt0BqKaNc9YvCx7Ng2hU/TrJmmumbmqrWJbgrKFlaQH/h1EbCi3ojPkYV08JxTNkhpVdqLGtCJeCTJBt2NAVuxKqOolMaLrIiecWjUhU2rQLoCyxdmbaa0FNaNC0AXGNglSghKlEJnUKWayrC0ZBtsDqgBYiuh9VqkGK6ByRfHE2tjJ1ZdpulLBUlMdGFqdnSh1QYymtPhqxqNY0veYaBJK83rPxC9zvB4WfU8Sf4WpWxeHBkzP9vj7H7qauxi8yNW52efkiqeqIgyZ7+/Kb8P5K3/p7r+Q9LUm1vW2tJDG7otMwPbuhepdTc8bQYFwY5xny/hLGtEn6DN+J++UKhXkZx+BW8mxjU6rVeCzwAGAYD8Oukb27qrie8Sc2AE/RHlkCbG0kDgmQB5Idmmtm/3dA8fd+D0McI41UVRemSf1GCQHSSJGRJ9vZWewuG9xMnvfdEAieDdWpUwbQXEgiwJM8WH3dE0dGYHxCA0TDZuJz9bpqhQVgNsxeLz3nI72jssywx9kYv7orY0Zk/8A1+8hQayI2taMHE47zkWXOK9mnem1HscDBg54kf22p1/jSUkZqXOsJJAJt25McKDVO7nmJv7pcvwS5uMsjv2O/jSp8VLKGsBMGx44twimuSrZBPC4OmFb1QuVQ5cJRWBR1xVC+FxxWFRyFsOMbNDUUQsqIewzoENqqSsqQWu1d2MaSDtC5PtM6y81p3QnWkqpsWRZ4+xq1XCpTMhXWkLLBXBWJdC4aq4yjtcJL1JpgwnG+ULqWArRuOXVnj3MM3VC0p1qdOJlDOoJDiepHMmgCnKaaN6wFBb06UIoKgcklJCbq2tfUcQT4R+VvHqfO31QjW5NoEWnuMhE6uj43DBHGD7dx6IcWdfj9xwq0kj1sSSglEJos+UTM4Hc/wALeraw77T58yD2wu0WECTPiAMeU58ryrBnBA7zcGwiOy1yDBmstcXJzI7XEdrhasojFxbyyc3Rmn03oMC9yfQLtQ0RYkn08K7rfk6xbWIdIb8vNU0+mLzAsOT95PkmDH0uGfU/UlXpVWYayP1EguGAT3+5RNaOsr8dlMRTFyCHO5OIvxGUK6qXEzwDOLgSRPcoqppWkEh0ANLvFF5IAE2J5zOEJUi0TO2/YETEe0fNAcjEUwS2XR/qsTH+70wFkxpxtmJEYjJIn2J9lu8tFvSeZM+vr8lkTb3vf3wgabNKtpGAb+IOAjmBgzxhZ0mbnAD6kAWEm5Vw4zIJnHb9vvKq9oiOTEcER9j5JbgzSj612kcBvEXAiLfvlF6TXAw104Hi7yQB++fJDbiD4f0kuEwSMZ4OEPVNvSOfSwQSi0DOCmqZ6RrVZZdKqF9OTkHaf6H5Leo1YePNdZOLB6pQjjKKcJUbRWVYyLSMGsXUa2ioi6A/IUFOF0BcZVWwCFIFtryU2ovSVIWIartYiQuVNUO6FVGNekdCpCOZqLJhFOBvqKkJedTdTU10JTErGHCGtjOjqFeo9BMatCV1mOOzOq2Vn8JbtWzWLqN7UBCitBSQvWOrsoeEeJ+dvae5XmqnW6zjO6PIBtvSy7RZh4mTKu3hHrX6VrrkAkYNjCTdY0oaWloEzjv5wgtPq35+I647k47rWpVkhzQZbcOcZx5GxT4wrdlmHizxzvtoOpi0zeL8C0kW7WVGVGSBM+R+QicoHVV5JDTDexP2O642jA4FruOBBmQUdFpzUFxcQDEOgTwu0qBm97EfORPzVG6huWm054kcgcqzasjsCRcm98+3OFiaZo0p6Wll7uLtbP6R+aeJW3x6DY/ygQQ7mJ9T6/slleznbSYuGw4GcXsBb2UZSsRYkgGSYgAkkeuEVA+g8aiiRGz3lwKEr6cExTedmDaTMAkefGUMKB8wZVm0XcH79V3VBGzNHTGS4+8fJWdoKJ/U9ve7XAcc55Qrqzxz/BPYqprkZFpiQInlY0jg6h0emSAapg9mifbxIfVdKcBLHh45EQ4T5KzageJDoMgxiZ9PQfNZ/FIaCHXkyLy2I28eXdA0dYteODaL4M+iyrttYzYT/wBXI/umWoqh1nCTw7kR9/RCdQoBpECLAGYncPzY4SprQXsafhaoSKjZMAtMcT4pMfJNK1NAfhOl/l1HcFwA9QL/AP6TDUVYSfR4vJf9eVAVVsLlNyy1GoCHZqLoVJWGoNocNUQzKtlE3sI6MXaOrKbUSvPaV0JpT1EBJg9FebHvQyBVw8JX/ilcV0xMmeJh76yHOqKFqViuUWkrLCWJJbD2PJR1FiG0tJMqVNMRNkkl4KKryiHMQ1YLhS2VbUU1uvFKmX5OGjueEq1dctSnXat1QjsAti7dFuDi/JJX4Aa0vcXOMuJkn1XGU0dodAXkWIaRO6IBgxacheh0vTKNJpfG83ALgS2YsBa1+UfRJWez2S0KKFNrQC9p3Zi9reFpHecyRhc+GHAZmPFOMmIviD9FfUgmZAJJcdwIkmckCwyeOVzGBx68X/n3RxlaOom2LmB7gT7JT1Ku53k0YEzPmUa8Tc3i5vb7ulVcOebYCVnk3GkFFBGnEAc/05lGQTkiwtiT2HF0GOlVgPD4vIZ9pQ401bdtLXSeClKcoa6s20/Y1/xTGgEkdoEE28lo3rAi1Mk9yYtjzQ1DpQaPHaMxc+/ZH0mMaPyjb3cZ9M4Cpj8j29AugSv12oJikwR33H34Wel/EZJh1IEd25EDzsURqOtUBYUg+OSAR7FyGZrqTpLGBp9Ggqe28n7cn/AXrwNW1mPFreRt/wAoXUUb2uhH1z3KuaxmHZIBGbTgAcSIVfZAnHT/AE9BN4+a1fUDh7Q6+SCYJELlNzXWJIPeSZPby5WT6T2mYsJ8QM47xj3SpbNI8xj25EE4lVfTBFzxxxeL/fKqD5H+JU7gj9jg5n2Qs49D0Ss1tLZIJaTJ7zeR+3sg+qamEqpVyIM+v/CG6jqSfdTZ30haIv0n9Vy+zlfWKabUSUsc9E6I3XlQzuUyyWJKJ6qgZAUVdJU8IUXqJnkyuxUbLnxii6tNDildC0yxST2XoNJTCnSKz0zEfTamxjonyTM6enRVGitabVqGo0iOeRmlFsIphQ7Vu1ESyNwsKrFqwqzhK4BOjz3U6EgpTptFuM5AcWls7T+WW8L0+vYA0k8JMdTTBmCG7gTBBI8ONwN5M2TMcd2ezwZOUWFUqopCAXAbfDYXviJs2QVlX14cXNebOMjbZpdaw7JcdV/3Xu0gmwsD5fm4S3V1jj+6bOSSPQUR4xpvFhyccz7/ANlyqwu3QJayA4ziTkXvYG/ZY6JrhTbTBG50zLg2P9pnHCxDzBiQdpiDnvN+QSPQY5S3K1o0E1uoJfsAE/qGAP4ymOn0c7SWxLQQf9X+718kr0dKahcXQSDkkbpjkeo+S9V0fTt2+KkHctcYIGQTf9xOSuw3tyOk0ginpzE+QAEAgAegCU63UhriW2vkeKMYlMurVG023b4zh8mzRYxGBfC8xW1TWyXDc44ANxPJ9AmymkrYMUbarUhm1xO4kflvIMmWm3ok2t1L6v5jbgDAtC32mo4mLk4/vhHaLpb6gdsa07YmXBvewPspMkZ5lV0hiqImoN3W5481WpRIuEyq6BwO5tiJJwMZCuynuAkQSLi9jKQuL/tl59MLsK26s8/NE0dVkyflPM+2FTVaf790uMgwpcs8uF1LaCSTHWn1U2PneL3gEeYgI6hqCDP3leeo1ITWk7wyT4piJAgQTMZVfGzdkDJUF16QjczGSOR6eVkG5GMqfqFsggcE3E+X/ihNXAPkYPpPCqlJUCjJ+Pf3t/S6yic4UDpXSUh1IIW1GwSFrpnwVbWsvPdDtMLwskfiytB+Uel01fwqJXS1NlFcs6oieDY4quWQK65yqCrRSWgui5H0XJVTei6FVEmJyRHFFEBqF0rkamHnT8kAWrVRq0auFNmjVo1UaFsxq4Wzzv4q1W3ZTEEmXGfKw/qvMurTFgIEW5uTJ+aafidjn6vYM7RH/wASf5SNpRqWj6PhwUcMf7WbmqQIHBkHz+wq6WnLtzsNv6uz/dZ1nifCe+c+UonT/kzeTaDfJmfkIXXbKg0wQOHCXTIO4OAgBsZHr3ssq7STuwMAAmxgNuMzAHzV6NMNLgXAgtbdsG5uATNuQb54stqlNpgCwANyZnsPI4EI4Rt2wRbp6M1YE8GQC4gAGZA9vReu0NRtOlvedrQNxJxAMHi/aF5vpRZ8ctduu0wWhrrxABBtGb/8oP8AEfUC6KTfyMzxuPc+XYJWXL8cJNGV2lRbq3XzXf8A5YjhpMGw8u6Cp6d2SDcm+ATyB3ysum6YukiZbBECb8T2E/svXUunuDvjVSxoAlxhoZBEen2FNx1LKu+R/wCBkmo6Qt0WjmPYx3j/AJ+qat6fMkSBfnjgEodnWKNOG02uqEAx+lvtz9AtX6SvqB43tAifhtIBaMgubn5q+M16Adgut6hRpiGj4h7Aw3yl38JFQqObUL3gjeSRNgL5vkWIXqqH4bHqLeXb+6R/iWkxpFFpl1nPP5i2xhnkbzHopOVF13va8L8hQa8GWqaJ++/9kprs8SZNd4GzkAybD0CH+HulyHMvmgvsKOgZtJEQIgWNzMkz2Ecf3WzKX36LVrS09iObHy91sOOoo5swp1CDb+qvqySGm3NpGCTc/IomppdrWOkEPBiDiDBBGRxkDy5WWsmGyQYJDY7DPGJM+6KcWlVmJ2DNCjiugKpXeEaDajKGcEZXomN3dCOXh8m+7bCi7IHKKqinDHzHq8rAFWBXtqZA0a7lenWusZVJXOewetj/AEuqTOjWleUo1CnWiqYVGOdkOfDWx9SWzQh9M5GMTDzJeTrWoim1Va1cFWFgvyeP/HdGKjKgH5hBPm2Yj2K80xeu/G7S+mwjDXS73ELylAgET3EjuJuFy3I+k4MrwL8G5oNLC9rgCNoLSRucTMlo7Lu2ABe9wcW+/wBl3XuZvcabSGnEmfWFx2oLgJiwgeg4+pTdWVRsN0BLSHQDGA67ScYm+eFq57Q0zIdaA2NsZIPI4ss6VRrrtluxrWkbgdxJMlvzXHtkEx+US7zk2wLTYJsfBn9wbTf+4akkeEtHnKGdTG7c4xB3TIBBFx9UZp2l26ASG+JxEYwLepPz8kL1GiIIz6GQebe0JE4rq3VhJnX9ZcHuewh9RxJe9zWXLs2whtR1Nz3TXqPqeQIAHtj6IWtpSDj+iHNMgrycuXMvK/wMUYjb/wBcDBFGkGn/AFvIqO9hAAPzS+nrHh/xA9web7pId81hsUcxTyy5ZO2/ASSGNbquoqWdXef+4t/ZVZS+GRuyTefMWnuEFTa6fNMa2mIALjJkARcREzKr46c0507X2C/owqvvtHuUz0tEWBBDZAJgmJiR6xdLaemM/cpppqjoawnw7pAMRuMCSVdxlK25ICX4NH6duN4nxyHAtA2/lv3N7LENMTFpiYtOY+oR1cA7B4W7gSXP25EggFsw3GUudUVcgYl4gTifeSP2yPkhazrrSvU/1XMCCIjAj6IV7lNlmgkWJXG3MKjZOF0tIUmTNRr0M6lK0eSUavTxcJhpdTNiu6pqVkhHLGyeEpQlsRKIh9G6i834pFfZDCVYFZqbl6PYlo2ldDVkwrcI47AeizQj9NVhAhaByanQmas9Jo9RKc6UyvG6DUQ6CvV6GqIVEZdkeXycXVjJ5gJVrK8I2tXBC811fUGYWvSFYMfaVFNfqy5pb3BC8y2xvwm5KB1LATI90CnvZ7XGqH7SM027BB8JdmPZDUzcA2ki/Za6xkOO3HByhKpj1TMk0t/RZHY50WnkVC1wO2DFr37z2BuJWVd42nJtMiwFxfz/ALpPRrQRJgTf+UxZWyJN2xbk+6LFnU40jXFo36W9u47i6IjwgE33QIwbwqVzObkm/JsAOfuyy0LoLhkmBic9uxRApbi6IG0F1y1phvqbujgI4P8AaYylAfE3AmXN7nLcC5vOEJqtNNu2Fas4sc17Z3D5EdiihrKb7yGnlruPQ8pb6SuE/wD0LfoUEAHa6x78FdNId0yfoDVPhh3eCLfws6WnaG/lwfzDP/TH9Un9M79V9ndylGiTFpdMRBkxefot3t3HyGB65VqJLXBzHQYJJBILZkFs94P1WumbyqoQ9A2DvbBHktNOQCdzdwhwAnbBIO0+xuqO8T4BHa5ge5RJDCW7AR4Rukgy/wDURHCL2czLXOIa2ALSMAHxCSSeUtcx54TTqLdoY0ggnxXEW/SR35+SBqVfLj6pOZJt2wkYBpGV2hpi4ybBbaQy6TgfXyKK33UU+r8MXkyNaRVtAAWWVWmi5WdQIJRQhSdix4grRtebFSuEI4qWUnB6KUuyCS1RYtrqIvkj9m0w0hUhblqrCY0JsjQtAVWFAiToF7NQuF6pKrKJyMo1FRN+ndSOEka2SvTdI0LYnlOwdm9E/I6qOw5r3OCRdUaQ5eop0oS7qfTt6qnG0QYcsYy34PN1SYWI07jhejp9LGEwo6BoGFO8Dk9lT5cY+Dzel6XUcI47JlR/DbT+YJ2wtblCa7rQZgynKMYrYn9TlnKonaX4YoAXYCvOdY0AoVHGSGkj4YaJkH8wn9JA7oyp+KXG0LjNPU1AJ3EGCR8lkZxb/aVYpZIO5vR5ulULXSMGx9Cmz4IADWtLWwSCfFE3vyfJJtdp3McWPEEfdlv03qDbMcAIs1wtN5h37BZjzxjPpI9KrVoLfRJDjGBfFuAllXS8p0KAIkuveG/q8ndo4RrNG5nhqB1NrgJMA7hmw5hU5MMci2Yp0KtN0qr8L4gb4Q2945OByu0nWuAbHN88jzTH/BOaHU2VntY7uCJEZLfNL31621zCacBoa2WjdG6fD2K5LotIy2zmqqTAgAgBtgGjaMTHObrlSvtb58QsaVOAXGe8+fn81kfEcWnKxydfkJKjunFwSJEyR/qMzBRjKwDi4iANxIBIjNgcrBryAGzad2bDjClPRuqtIBtN/b/lC5dI68gykluQBqNc57tziTYASZhow0eS7p6Zef8Abz6J1pOgNbd5V+ohrW7WCAoOmSrmxT5UW+sBZXqDAEBZtesiuSp3PYaiqDRUXDUQgqKpqrvkM6Fq7kG8rWo5YkKXJK2PgqKKKQokDD0TqazLEQsXFexJI82LZXYqkLYKrkLRqZkuLjiqElLsYkXaJNl6Pp+5rRCT9O0xJkr09CjtHkq+PH2RcrIvAbp3khafDQA17WmEW/WAjKtPMlCSfgs2kuVaoaMoapqwBYhItfWe4m9kqc1Ebjwub2Ga7XTMLzuqcXFaue4mEw0vTyVHJvI6PQgo4UC6Hp85THUa00G2TClpxTEleb6/rQ8wE5r4sd+wYSeae/Ar1+rNVxLj6IEshEbV00pXmu5O5eT1YNRVFG6x4EB37FEU+t1wQTUc8C0PJdbsJuENUYB3lYwtlPLFqpP/ALGKmehd+J907qRHAh7nwOw3KUur0CTva+NpjbE74tN8LzsLrWp0ednWnszpE31Goc43PsMBNNL1rZpjQNMOm4diOZ8yl+l089sTddIEo4vJG8je2DLq/JodSXxDYjJ/hN9BXgQlDSOERRqQujmk3cmTZl3VD11eyXau6jayo9ydKdolhDqwKpTQtQo+qgqoUOVFsGYblwuXHKqjch6QVoqG8gL1+m/DTdsxleQ6XqNlQE4X1Dp1YOYCDwvV4MYShdbPO52ScGq8CAfhlnZRehe66it+OH0Q/qMn2eDLliXKKKCbPRiT4iq56iiW5MOkZNMmF6zpfTWFokKKKviJNOyXnScYqhf1R5ZUa1g5+id0q0sAK6onY/5MmzJdIirVaO8ysXNd3UURyRsJtoGfu7rlNpcYBUUUslsovVjPTaAC5TLTt7LqifGKRBObl5F34i1sNgLyDnKKKPlSfej1eJFLHo5Ks0qKKYqYQ2DlUfpmHiFFE3yLtrwZjSN8114bEQoolvXgO2/Zk5yzL1FFPKTGJF2OWzHqKJkGBJBDXq+9RRUpiWij3IWqoogkHAFeFmVFFDJbKUVXsPwr1UxsKiiq4M2slIRy4KWN2eodJuooovbPBP/Z"> -->
											</div>
											<div class="col-md-4-1 col-sm-4-1">
												<div class="panel panel-default"
													style="height: 100%; width: 100%;">
													<table>
														<tr>
															<th>Name:</th>
															<td id="p_name"></td>
														</tr>
														<tr>
															<th>DOB:</th>
															<td id="dob"></td>
														</tr>
														<tr>
															<th>Mrn No:</th>
															<td id="mrn"></td>
														</tr>
														<tr>
															<th>W/A/G:</th>
															<td id="w-a-g"></td>
														</tr>
														<tr>
															<th>Mobile:</th>
															<td id="mo"></td>
														</tr>
													</table>
												</div>
											</div>
											<div class="col-md-6 col-sm-6">
												<input id="txtPatientName"
													class="typeahead form-control input-SmallText " type="text"
													onkeypress="autoSuggestionforMalePatient(this.id, 'onchange');"
													autocomplete="off" name="txtPatientName" placeholder="Search male patient....."> 
													<input type="hidden" id="male_ivf_id">
													<input type="hidden" id="male_treat_id">
													<br /> <br /> <a href="#" id="right-icon"
													style="font-size: 34px;float:right; display: none; color: green;">
													<i class="fa fa-check-circle"></i>

												</a> <a href="#" id="warning-icon"
													style="font-size: 34px;float:right; display: none; color: red;"> <i
													class="fa fa-exclamation-triangle"></i>
												</a>
											</div>
											
											<div class="panel panel-default col-md-12-1 col-sm-12-1">

												<div class="panel-body">
													<ul class="nav nav-tabs">
														<li class="active"><a data-toggle="tab"
															href="#demographics">Demographics</a></li>

													</ul>

													<div class="tab-content">
														<div id="demographics" class="tab-pane fade in active fixed-panel">

															<div class="col-sm-4" style="margin-top: 3px;">
																<b>First Name:</b><span id="m_fname"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Middle Name:</b><span id="m_middlename"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Last Name:</b><span id="m_lname"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Mrn:</b><span id="m_mrn"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>DOB:</b><span id="dob_for_m_"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>W/A/G:</b><span id="wag_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Mobile:</b><span id="mo_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Email:</b><span id="email_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Type:</b><span id="type_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																&nbsp;</div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Address:</b><span id="address_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>City:</b><span id="city_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>State:</b><span id="state_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>District:</b><span id="district_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Country:</b><span id="country_for_m"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Payer Name:</b></div>
														</div>
														
													</div>

												</div>
											</div>
										</div>
									</div>

								</div>
								<div class="col-md-6 col-sm-6">

									<div class="panel panel-default">
										<div class="panel-body">

											
											<div class="col-md-6 col-sm-6">
												<input id="txtFemaleName"
													class="typeahead2 form-control input-SmallText "
													type="text"
													onkeypress="autoSuggestionforFemalePatient(this.id, 'onchange','female');"
													autocomplete="off" name="txtFemaleName" placeholder="Search female patient....."> <input
													type="hidden" id="female_ivf_id">
													<input type="hidden" id="female_treat_id">
													<br /> <br /> <a href="#" id="fright-icon"
													style="font-size: 34px; display: none; color: green"> <i
													class="fa fa-check-circle"></i>
												</a> <a href="#" id="fwarning-icon"
													style="font-size: 34px; display: none; color: red"> <i
													class="fa fa-exclamation-triangle"></i>
												</a>
											</div>


											<div class="col-md-4-1 col-sm-4-1">
												<div class="panel panel-default"
													style="height: 100%; width: 100%;">
													<table>
														<tr>
															<th>Name:</th>
															<td id="pf_name"></td>
														</tr>
														<tr>
															<th>DOB:</th>
															<td id="fdob"></td>
														</tr>
														<tr>
															<th>Mrn No:</th>
															<td id="fmrn"></td>
														</tr>
														<tr>
															<th>W/A/G:</th>
															<td id="f-w-a-g"></td>
														</tr>
														<tr>
															<th>Mobile:</th>
															<td id="fmo"></td>
														</tr>
													</table>
												</div>
											</div>
											<div class="col-md-2-1 col-sm-2-1">
												<img id="femaleImg" style="float: right" height="85"
													width="70"
													 src="images/female.png">
													<!-- src="data:image/jpeg;base64,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"> -->
											</div>

											<div class="panel panel-default col-md-12-1 col-sm-12-1">

												<div class="panel-body">
													<ul class="nav nav-tabs">
														<li class="active"><a data-toggle="tab"
															href="#demographicsFemale">Demographics</a></li>

													</ul>

													<div class="tab-content ">
														<div id="demographicsFemale" class="tab-pane fade in active fixed-panel">


															<div class="col-sm-4" style="margin-top: 3px;">
																<b>First Name:</b><span id="female_fname"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Middle Name:</b><span id="female_mname"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Last Name:</b><span id="female_lname"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Mrn:</b><span id="female_mrn"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>DOB:</b><span id="female_dob"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>W/A/G:</b><span id="female_wag"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Mobile:</b><span id="female_mo"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Email:</b><span id="female_email"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Type:</b><span id="female_type"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																&nbsp;</div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Address:</b><span id="female_add"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>City:</b><span id="female_city"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>State:</b><span id="female_state"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>District:</b><span id="female_district"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Country:</b><span id="female_country"></span></div>
															<div class="col-sm-4" style="margin-top: 3px;">
																<b>Payer Name:</b></div>
														</div>
														
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
                             </div>
														
														<!--Active Couple-->
														<div ID="ActiveCouple" class="tab-pane active">
                            					
																<div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 12%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	
																	<div class="col-md-3 TextFont" style="margin-left: -15% ;margin-top: 20px;" id="divbyNameActive">
																		
																		<select id="coupleSearchTypeForActive" class="form-control input-SmallText" onchange="setCoupleSearchType('active')">
																			<option value="1">Couple Id</option>
																			<option value="2">Female Name</option>
																			<option value="3">Male Name</option>
																		</select>
																		
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 20px;" id="divbyNameActive">
																		<input name="byNameActive" type="text" id="byNameActive" class="form-control input-SmallText"
																			onkeyup="setAutoCoupleName(this.id,'active')" placeholder="Couple Id,Female Patient,Male Patient"/>																		
																	</div>
																	
																	<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																	</div>

																<div class="col-md-12" style="margin-left: 687px;">

																	<div class="col-md-3" style="margin-top: -5px">
																		<div class="col-md-2">
																			<label>From</label>
																		</div>
																		<div class="col-md-10">
																			<input id="fromDate"
																				class="form-control input-SmallText" type="text"
																				onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date1%>">
																		</div>
																	</div>

																	<div class="col-md-3" style="margin-top: -5px;margin-left: -55px;">
																		<div class="col-md-2">
																			<label>To</label>
																		</div>
																		<div class="col-md-10">
																			<input id="lastDate"
																				class="form-control input-SmallText" type="text"
																				onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date1%>">
																		</div>
																	</div>

																	<div class="col-md-1" style="margin-top: -21px">
																		<input type="button" onclick="fetchIVFCoupleList('Active');"
																			class="btn btn-primary" value="Show">
																	</div>

																</div>



																<div class="col-md-12"
																	style="margin-top: 17px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																			<table class="table table-condensed cf"
																			style="Width: 100%;">
												<!-- <thead class='col-sm-12-1'> -->
												<thead class='table table-condensed cf'>
                                                      <tr>
														<th class='col-md-1-1 center' >	#</th>
														<th class='col-md-1-1 center'>Couple ID</th>
														<th class='col-md-1-1 center' >Couple No</th>
														<th class='col-md-2-1 center' >Female</th>
														<th class='col-md-2-1 center'>Male</th>
														<th class='col-md-1-1 center'>View</th>
														<th class='col-md-1-1 center'>Edit</th>
														<th class='col-md-1-1 center'>Status</th>
														<th class='col-md-1-1 center'>View Bill</th>
														<th class='col-md-2-1 center'>Female Doctor Desk</th>
														<th class='col-md-2-1 center'>Male Doctor Desk</th>
													</tr>

												</thead>
												<tbody id="IVFcontainer">
																			
																			</tbody>
																		</table>
																	</div>
																</div>


                                         <!--    Starting pagination-->
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="patientRecordPagination">
										</ul>
									</div>
									<div class="row">
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfPages">
												</ul>
											</div>
										</div>
									</div>
									<!--   Ending  pagination -->
		                        	</div>
									</div>
																	<!--Active Couple End-->
																			
														<div ID="PassiveCouple" class="tab-pane fade">
                            					
																<div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 12%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	
																	<div class="col-md-3 TextFont" style="margin-left: -15% ;margin-top: 20px;" id="divbyNamePassive">
																		
																		<select id="coupleSearchTypeForPassive" class="form-control input-SmallText" onchange="setCoupleSearchType('passive')">
																			<option value="1">Couple Id</option>
																			<option value="2">Female Patient</option>
																			<option value="3">Male Patient</option>
																		</select>
																		
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 20px;" id="divbyNamePassive">
																		<input name="byNamePassive" type="text" id="byNamePassive" class="form-control input-SmallText"
																			onkeyup="setAutoCoupleName(this.id,'passive')" placeholder="Couple Id,Female Patient,Male Patient"/>																		
																	</div>
																	
																	<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																		<!-- onkeypress="return SearchPatientNameOnEnter(event,'OPDOldPatientDatabase')" /> -->
																	</div>
																	  <div class="col-md-12"
																	style="margin-top: 17px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																			<table class="table table-condensed cf"
																			style="Width: 100%;">
												<!-- <thead class='col-sm-12-1'> -->
												<thead class='table table-condensed cf'>
                                                      <tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-2-1'
															style='height: 21.5px; padding-right: 40px;'><div
																class='TextFont'>Couple ID</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Couple No.</div></th>
														<th class='col-md-2-1 center' style='height: 21.5px;'><div
																class='TextFont'>Female</div></th>
														<th class='col-md-2-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Male</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>View</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Edit</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Passive</div></th>
											
													</tr>

												</thead>
												<tbody id="IVFPassiveContainer">
																			
																			</tbody>
																		</table>
																	</div>
																</div>


                                         <!--    Starting pagination-->
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="patientRecordPagination">
										</ul>
									</div>
									<div class="row">
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfPages">
												</ul>
											</div>
										</div>
									</div>
									<!--   Ending  pagination -->
		                        	</div>
									</div>
									
									<div ID="GenerateBatch" class="tab-pane">
                            					
																<div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 12%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	
																	<div class="col-md-3 TextFont" style="margin-left: -15% ;margin-top: 20px;" id="divbyNameActive">
																		
																		<select id="coupleSearchTypeForActive" class="form-control input-SmallText" onchange="setCoupleSearchType('active')">
																			<option value="1">Couple Id</option>
																			<option value="2">Female Name</option>
																			<option value="3">Male Name</option>
																		</select>
																		
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 20px;" id="divbyNameActive">
																		<input name="byNameActive" type="text" id="byNameActive" class="form-control input-SmallText"
																			onkeyup="setAutoCoupleName(this.id,'active')" placeholder="Couple Id,Female Patient,Male Patient"/>																		
																	</div>
																	
																	<div  id="otherDiv" class="col-md-4 TextFont" style="margin-left: -15% ;margin-top: 7px;display:none; ">
																		<input name="byName1" type="text" id="byName1"
																			class="typeahead form-control input-SmallText"
																			placeholder="Name"
																			onkeyup="autosuggesstionForOtherRecords(this.id,'auto')" />
																	</div>
																	
																	<div style="" class="col-md-3">
																		<input type="button" id="createBatch"
											                               style="margin-left: 90%; margin-top: 12%; font-size: 12px;color: white; background-color: #f0ad4e;width: 48%"
											                                   class="btn btn-xs" value="Create Batch" onclick="showGenerateBatchPopup()">
																			
																	</div>
																	<div class="col-md-12"
																	style="margin-top: 17px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																			<table class="table table-condensed cf"
																			style="Width: 100%;">
												<!-- <thead class='col-sm-12-1'> -->
												<thead class='table table-condensed cf'>
                                                      <tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-2-1'
															style='height: 21.5px; padding-right: 40px;'><div
																class='TextFont'>Couple ID</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Couple No.</div></th>
														<th class='col-md-2-1 center' style='height: 21.5px;'><div
																class='TextFont'>Female</div></th>
														<th class='col-md-2-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Male</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>CheckBox</div></th>
													
													</tr>

												</thead>
												<tbody id="BatchContainer">
																			
																			</tbody>
																		</table>
																	</div>
																</div>


                                         <!--    Starting pagination-->
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="BatchRecordPagination">
										</ul>
									</div>
									<div class="row">
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfBatchPages">
												</ul>
											</div>
										</div>
									</div>
									<!--   Ending  pagination -->
		                        	</div>
									</div>
									
									<!-- Batched Couple  -->
									
									<div ID="BatchedCouple" class="tab-pane">
                            					
																<div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 12%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	
																	<div class="col-md-3 TextFont" style="margin-left: -15% ;margin-top: 20px;" id="divbyNameBatch">
																		<select id="activeBatchSearch" class="form-control input-SmallText">
																			<option value="1">Batch Id</option>
																		</select>
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 20px;" id="divbyBatchName">
																		<input name="byBatchName" type="text" id="byBatchName" class="form-control input-SmallText"
																			onkeyup="setAutoBatchName(this.id,'activeBatch')" placeholder="Batch Id"/>																		
																	</div>
																	
																	<div class="col-md-12"
																	style="margin-top: 17px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																			<table class="table table-condensed cf"
																			style="Width: 100%;">
												<!-- <thead class='col-sm-12-1'> -->
												<thead class='table table-condensed cf'>
                                                      <tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-2-1'
															style='height: 21.5px; padding-right: 40px;'><div
																class='TextFont'>Batch ID</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Batch No.</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Pick-up Date</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>View</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Edit</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>Cancel Batch</div></th>
														
													</tr>

												</thead>
												<tbody id="IVFBatchedCoupleContainer">
																			
																			</tbody>
																		</table>
																	</div>
																</div>


                                         <!--    Starting pagination-->
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="BatchedRecordPagination">
										</ul>
									</div>
									<div class="row">
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfBatchedPages">
												</ul>
											</div>
										</div>
									</div>
									<!--   Ending  pagination -->
		                        	</div>
									</div>
		                        	
									<!-- End Batched Couple -->
									
									<!-- Cancel Batch -->
									<div ID="CancelBatch" class="tab-pane">
                            					
																<div class="col-md-12-1">
																	<div style="" class="col-md-3">
																		<label class="TextFont"
																			style="margin-left: 0%; margin-top: 12%; font-size: 11px;">Search
																			By:</label>
																	</div>
																	
																	<div class="col-md-3 TextFont" style="margin-left: -15% ;margin-top: 20px;" id="divbyNameCancelBatch">
																		<select id="cancelBatchSearch" class="form-control input-SmallText">
																			<option value="1">Batch Id</option>
																		</select>
																	</div>

																	<div class="col-md-4 TextFont" style="margin-top: 20px;" id="divbyCancelBatchName">
																		<input name="byCancelBatchName" type="text" id="byCancelBatchName" class="form-control input-SmallText"
																			onkeyup="setAutoBatchName(this.id,'cancelBatch')" placeholder="Batch Id"/>																		
																	</div>
																	
																	<div class="col-md-12"
																	style="margin-top: 17px; padding-left: 3%; width: 102.3%; margin-bottom: 16px;">
																	<div class="col-md-12-1"
																		style="overflow-y: scroll; height: 425px; maxheight: auto; border: 1px solid #b8b8b8;">

																			<table class="table table-condensed cf"
																			style="Width: 100%;">
												<!-- <thead class='col-sm-12-1'> -->
												<thead class='table table-condensed cf'>
                                                      <tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-2-1'
															style='height: 21.5px; padding-right: 40px;'><div
																class='TextFont'>Batch ID</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Batch No.</div></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>Pick-up Date</div></th>
														<th class='col-md-1-1 center'
															style='height: 21.5px; padding-right: 5px;'><div
																class='TextFont'>View</div></th>
													</tr>

												</thead>
												<tbody id="IVFCancelBatchContainer">
																			
																			</tbody>
																		</table>
																	</div>
																</div>


                                         <!--    Starting pagination-->
									<div class="pull-right">
										<ul class="pagination pagination-blue margin-bottom-10"
											id="CancelBatchRecordPagination">
										</ul>
									</div>
									<div class="row">
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfCancelBatchPages">
												</ul>
											</div>
										</div>
									</div>
									<!--   Ending  pagination -->
		                        	</div>
									</div>
		                        	
									<!-- End Cancel Batch -->
									
																
																</form>
																
															</div>
														</div>

													<!-- </div> -->
												</div>
												
											</div>
										<!-- </form> -->

									</div>
									<!-- </div> -->

								</div>
								<!-- /BOX -->
							</div>

			<!-- start pop up for camera -->
		<div id="changeStatusNarration" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 388px"
								onclick="HidePopUpNarra()">
								<i class="fa fa-times"></i>
							</button>
							<button class="btn btn-xs btn-success" title="Save"
								style="margin-top: -37px; margin-left: 360px"
								data-original-title="Save" data-toggle="tooltip"
								data-placement="left" onclick="changeStatusOfIvfCouple();">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="coupleStatusNarration" style="margin-top: -36px;">Narration:</h4>
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<textarea rows="3" cols="50" id="StatusNarration" type="textarea"
										name="txtNarration"></textarea>
								</div>

                            <input type="hidden" value="" id="coupleID" disabled="disabled" />
		                    <input type="hidden" value="" id="coupleFlag" disabled="disabled" />
		                    <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
								<div class="divide-40"></div>
							</div>
							<div class="divide-40"></div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Cancel Batch Narration  -->
			<div id="CancelBatchNarration" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 388px"
								onclick="HideBatchCancelNarra()">
								<i class="fa fa-times"></i>
							</button>
							<button class="btn btn-xs btn-success" title="Save"
								style="margin-top: -37px; margin-left: 360px"
								data-original-title="Save" data-toggle="tooltip"
								data-placement="left" onclick="CancelIVFBatch();">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="batchCancelNarration" style="margin-top: -36px;">Batch Cancel Narration:</h4>
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<textarea rows="3" cols="50" id="CancelNarration" type="textarea"
										name="txtCancelNarration"></textarea>
								</div>

                            <input type="hidden" value="" id="batchID" disabled="disabled" />
		                   <div class="divide-40"></div>
							</div>
							<div class="divide-40"></div>
						</div>
					</div>
				</div>
			</div>
			<!--End Cancel batch Narration  -->
			
			
                             <!-- View Bill Popup -->
                             
                             <div id="ViewBillPopup" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<h4 id="testHead" style="margin-top: -6px;">
								<i class="fa fa-eye"></i> View Bill:
							</h4>
						</div>

						<div class="modal-body">
							<div class="col-md-12-1">
							
								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<input id="female" type="radio" checked="checked" value="female"
										name="coupleType" onclick="ShowLangDiv()"> <b>Female Bill</b>
								</div>

								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<input id="male" type="radio" value="male"
										name="coupleType" onclick="hideLangDiv()"> <b>Male Bill</b>
								</div>
							
							<input type='button' style="margin-top: 30px; margin-left: 120px" 
							class='btn btn-xs btn-primary' value='OK' onclick='sendingToViewBill();'/>
							
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -230px;; margin-left: 360px"
								onclick="hideViewBillPopup()">
								<i class="fa fa-times"></i>
							</button>
							
							
							<div class="divide-20">
							<input type="hidden" value="" id="femaleTreatId">
		                    <input type="hidden" value="" id="maleTreatId">
		                    
		                    <input type="hidden" value="0" id="femaleDoctorId">
		                    <input type="hidden" value="0" id="maleDoctorId">
		                    
		                    <input type="hidden" value="" id="femaleDeptId">
		                    <input type="hidden" value="" id="maleDeptId">
							</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<!--End View Bill pop up  -->
                             
                            <!-- Doctor Desk Popup -->
                             
              <div id="ViewDoctorDeskPopup" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<h4 id="testHead" style="margin-top: -6px;">
								<i class="fa fa-eye"></i> View Doctor Desk:
							</h4>
						</div>

						<div class="modal-body">
							<div class="col-md-12-1">
							
								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<input id="femaleDoctorDesk" type="radio" checked="checked" value="femaleDoctorDesk"
										name="coupleType"> <b>Female Doctor Desk</b>
								</div>

								<div class="col-md-6-1" style="background-color: #ccffeb;">
									<input id="maleDoctorDesk" type="radio" value="maleDoctorDesk"
										name="coupleType"> <b>Male Doctor Desk</b>
								</div>
								
								<input type='button' style="margin-top: 30px; margin-left: 120px" 
							class='btn btn-xs btn-primary' value='OK' onclick='showCoupleDoctorDesk();'/>
							
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -230px;; margin-left: 360px"
								onclick="hideDoctorDeskPopup()">
								<i class="fa fa-times"></i>
							</button>
							
							<div class="divide-20">
							<input type="hidden" value="" id="femaleTreatId">
		                    <input type="hidden" value="" id="maleTreatId">
							</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<!--End Doctor Desk pop up  -->
			
			 <!-- Generate Batch Popup -->
			 
			 <div id="ViewGenerateBatchPopup" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-5-1"
						style="margin-top: 123px; margin-left: 350px;">
						<div class="modal-header">
							<button class="btn btn-xs btn-danger" aria-label="Close"
								data-dismiss="modal" type="button"
								style="margin-top: -5px;; margin-left: 270px"
								onclick="hideGenerateBatchPopup()">
								<i class="fa fa-times"></i>
							</button>
							<button class="btn btn-xs btn-success" title="Save"
								style="margin-top: -37px; margin-left: 240px"
								data-original-title="Generate Batch" data-toggle="tooltip"
								data-placement="left" onclick="SaveCoupleBatchDetails();">
								<i class="fa fa-save"></i>
							</button>
							<h4 id="pickUpDate" style="margin-top: -36px;">Pick-Up-Date:</h4>
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div class="col-md-8-1">
									<input style="width: 150px" id="BatchPickUpDate" class="form-control input-SmallText" type="text"													
										onclick="displayCalendar(document.getElementById('BatchPickUpDate'),'dd-mm-yyyy',this)"
										 readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
								</div>
                           </div>
						</div>
					</div>
				</div>
			</div>
			 
			<!--End Generate Batch pop up  -->
		<%@include file="Footer.jsp"%>
		
		<input type="hidden" value="insert" id="queryType" disabled="disabled" />
		<input type="hidden" value="0" id="coupleId" disabled="disabled" />
		<input type="hidden" value="0" id="ivfBatchId" disabled="disabled" />
		<input type="hidden" value="insert" id="BatchQueryType" disabled="disabled" />
		<input type="hidden" value="" id="coupleOrNot"  />
		<input type="hidden" value="" id="UpdateBatchPickUpDate" disabled="disabled" />
		
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>

</body>
</html>