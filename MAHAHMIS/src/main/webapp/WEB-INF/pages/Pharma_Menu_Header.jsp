<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<link rel="stylesheet" type="text/css" href="<c:url value="../.././pharma-resources/css/default.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>" />
<script src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="../.././pharma-resources/js/jQuery-Cookie/jquery.cookie.min.js"/>"></script>

<script>
	<c:if test="${sessionScope.userType == null}">
		var origin   = window.location.origin; 
		origin += "/MAHAHMIS/index.jsp";
		window.location.replace(origin);
	</c:if>	

	document.body.addEventListener('click', fn, true); 

	function fn(){

		jQuery.ajax({
			
			async	: false,
			type	: "GET",
			url		: "../../ehat/checkSessionAndRedirect/checkSession",
			success : function(r) {

				if(r == "null"){

	            	var origin = window.location.origin;	
	    			origin += "/MAHAHMIS/index.jsp";
	    			window.location.replace(origin);
		        }						
			}
		});	
	}

</script>
<%--  <%
	String userName="";
	
		session = request.getSession();
		if(session.getAttribute("userName")==null)
		{	
			response.sendRedirect("/MAHAHMIS/");
		}
		else
		{	
			String user_name = (String) session.getAttribute("userName");
			String user[] = user_name.split(" ");
			userName = user[0] + " " + user[1];
		}	
		

	
%>  --%>

<!-- HEADER -->
<div class="container" style="width: 99%;">
	<div class="navbar-brand">
		<!-- COMPANY LOGO -->
		<a id="ehatMod0" href="../../Dashboard.jsp"> <img id="logo111"	src="<c:url value="../../images/Hospital/logo.png"/>"
			width="107" height="37px"
			style="margin-left: -10px; margin: -3px 0px 0px -16px;">
		</a>
		<!-- <a href="index.html"> <img src="img/logo/logo.png"
			alt="Cloud Admin Logo" class="img-responsive" height="30" width="120">
		</a> -->
		<!-- /COMPANY LOGO -->
		<!-- TEAM STATUS FOR MOBILE -->
		<div class="visible-xs">
			<a href="#" class="team-status-toggle switcher btn dropdown-toggle">
				<i class="fa fa-th"></i>
			</a>
		</div>
		<!-- /TEAM STATUS FOR MOBILE -->
		<!-- SIDEBAR COLLAPSE -->
		<div id="sidebar-collapse" class="sidebar-collapse btn"
			style="margin-left: -6px; margin-top: -3px;">
			<i class="fa fa-bars" data-icon1="fa fa-bars" data-icon2="fa fa-bars"></i>
		</div>
		<!-- /SIDEBAR COLLAPSE -->
	</div>
	<!-- NAVBAR LEFT -->
	<ul class="nav navbar-nav pull-left hidden-xs" id="navbar-left">
		<li class="dropdown"><a href="#"
			class="team-status-toggle dropdown-toggle tip-bottom"
			data-toggle="tooltip"> <i class="fa fa-th"></i> <span
				class="name">Menu</span> <i class="fa fa-angle-down"></i>
		</a></li>
		<!-- <li class="dropdown"><a href="#" class="dropdown-toggle"
			data-toggle="dropdown"> <i class="fa fa-cog"></i> <span
				class="name">Skins</span> <i class="fa fa-angle-down"></i>
		</a>
			<ul class="dropdown-menu skins">
				<li class="dropdown-title"><span><i class="fa fa-leaf"></i>
						Theme Skins</span></li>
				<li><a href="#" data-skin="default">Subtle (default)</a></li>
				<li><a href="#" data-skin="night">Night</a></li>
				<li><a href="#" data-skin="earth">Earth</a></li>
				<li><a href="#" data-skin="utopia">Utopia</a></li>
				<li><a href="#" data-skin="nature">Nature</a></li>
				<li><a href="#" data-skin="graphite">Graphite</a></li>
			</ul></li> -->
	</ul>
	
	<!-- /NAVBAR LEFT -->
	<!-- BEGIN TOP NAVIGATION MENU -->
	<ul class="nav navbar-nav pull-right">
		<!-- BEGIN NOTIFICATION DROPDOWN -->
		<li class="dropdown" id="header-notification"><a href="#"
			class="dropdown-toggle" data-toggle="dropdown"> <i
				class="fa fa-bell"></i> <span class="badge">7</span>
		</a>
			<ul class="dropdown-menu notification">
				<li class="dropdown-title"><span><i class="fa fa-bell"></i>
						7 Notifications</span></li>
				<li><a href="#"> <span class="label label-success"><i
							class="fa fa-user"></i></span> <span class="body"> <span
							class="message">5 users online. </span> <span class="time">
								<i class="fa fa-clock-o"></i> <span>Just now</span>
						</span>
					</span>
				</a></li>
				<li><a href="#"> <span class="label label-primary"><i
							class="fa fa-comment"></i></span> <span class="body"> <span
							class="message">Martin commented.</span> <span class="time">
								<i class="fa fa-clock-o"></i> <span>19 mins</span>
						</span>
					</span>
				</a></li>
				<li><a href="#"> <span class="label label-warning"><i
							class="fa fa-lock"></i></span> <span class="body"> <span
							class="message">DW1 server locked.</span> <span class="time">
								<i class="fa fa-clock-o"></i> <span>32 mins</span>
						</span>
					</span>
				</a></li>
				<li><a href="#"> <span class="label label-info"><i
							class="fa fa-twitter"></i></span> <span class="body"> <span
							class="message">Twitter connected.</span> <span class="time">
								<i class="fa fa-clock-o"></i> <span>55 mins</span>
						</span>
					</span>
				</a></li>
				<li><a href="#"> <span class="label label-danger"><i
							class="fa fa-heart"></i></span> <span class="body"> <span
							class="message">Jane liked. </span> <span class="time"> <i
								class="fa fa-clock-o"></i> <span>2 hrs</span>
						</span>
					</span>
				</a></li>
				<li><a href="#"> <span class="label label-warning"><i
							class="fa fa-exclamation-triangle"></i></span> <span class="body">
							<span class="message">Database overload.</span> <span
							class="time"> <i class="fa fa-clock-o"></i> <span>6
									hrs</span>
						</span>
					</span>
				</a></li>
				<li class="footer"><a href="#">See all notifications <i
						class="fa fa-arrow-circle-right"></i></a></li>
			</ul></li>
		<!-- END NOTIFICATION DROPDOWN -->
		<!-- BEGIN INBOX DROPDOWN -->
		<!-- <li class="dropdown" id="header-message">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="fa fa-envelope"></i>
						<span class="badge">3</span>
						</a>
						<ul class="dropdown-menu inbox">
							<li class="dropdown-title">
								<span><i class="fa fa-envelope-o"></i> 3 Messages</span>
								<span class="compose pull-right tip-right" title="Compose message"><i class="fa fa-pencil-square-o"></i></span>
							</li>
							<li>
								<a href="#">
									<img src="img/avatars/avatar2.jpg" alt="" />
									<span class="body">
										<span class="from">Jane Doe</span>
										<span class="message">
										Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse mole ...
										</span> 
										<span class="time">
											<i class="fa fa-clock-o"></i>
											<span>Just Now</span>
										</span>
									</span>
									 
								</a>
							</li>
							<li>
								<a href="#">
									<img src="img/avatars/avatar1.jpg" alt="" />
									<span class="body">
										<span class="from">Vince Pelt</span>
										<span class="message">
										Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse mole ...
										</span> 
										<span class="time">
											<i class="fa fa-clock-o"></i>
											<span>15 min ago</span>
										</span>
									</span>
									 
								</a>
							</li>
							<li>
								<a href="#">
									<img src="img/avatars/avatar8.jpg" alt="" />
									<span class="body">
										<span class="from">Debby Doe</span>
										<span class="message">
										Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse mole ...
										</span> 
										<span class="time">
											<i class="fa fa-clock-o"></i>
											<span>2 hours ago</span>
										</span>
									</span>
									 
								</a>
							</li>
							<li class="footer">
								<a href="#">See all messages <i class="fa fa-arrow-circle-right"></i></a>
							</li>
						</ul>
					</li> -->
		<!-- END INBOX DROPDOWN -->
		<!-- BEGIN TODO DROPDOWN -->
		<!-- <li class="dropdown" id="header-tasks">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="fa fa-tasks"></i>
						<span class="badge">3</span>
						</a>
						<ul class="dropdown-menu tasks">
							<li class="dropdown-title">
								<span><i class="fa fa-check"></i> 6 tasks in progress</span>
							</li>
							<li>
								<a href="#">
									<span class="header clearfix">
										<span class="pull-left">Software Update</span>
										<span class="pull-right">60%</span>
									</span>
									<div class="progress">
									  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
										<span class="sr-only">60% Complete</span>
									  </div>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<span class="header clearfix">
										<span class="pull-left">Software Update</span>
										<span class="pull-right">25%</span>
									</span>
									<div class="progress">
									  <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
										<span class="sr-only">25% Complete</span>
									  </div>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<span class="header clearfix">
										<span class="pull-left">Software Update</span>
										<span class="pull-right">40%</span>
									</span>
									<div class="progress progress-striped">
									  <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">
										<span class="sr-only">40% Complete</span>
									  </div>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<span class="header clearfix">
										<span class="pull-left">Software Update</span>
										<span class="pull-right">70%</span>
									</span>
									<div class="progress progress-striped active">
									  <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 70%;">
										<span class="sr-only">70% Complete</span>
									  </div>
									</div>
								</a>
							</li>
							<li>
								<a href="#">
									<span class="header clearfix">
										<span class="pull-left">Software Update</span>
										<span class="pull-right">65%</span>
									</span>
									<div class="progress">
									  <div class="progress-bar progress-bar-success" style="width: 35%">
										<span class="sr-only">35% Complete (success)</span>
									  </div>
									  <div class="progress-bar progress-bar-warning" style="width: 20%">
										<span class="sr-only">20% Complete (warning)</span>
									  </div>
									  <div class="progress-bar progress-bar-danger" style="width: 10%">
										<span class="sr-only">10% Complete (danger)</span>
									  </div>
									</div>
								</a>
							</li>
							<li class="footer">
								<a href="#">See all tasks <i class="fa fa-arrow-circle-right"></i></a>
							</li>
						</ul>
					</li> -->
		<!-- END TODO DROPDOWN -->
		<!-- BEGIN USER LOGIN DROPDOWN -->

		<%-- <li class="dropdown user" id="header-user"><a href="#"
			class="dropdown-toggle" data-toggle="dropdown"
			style="padding-bottom: 6.5px !important;"> <!-- <img src=""
						alt=""> --> <span class="username"><%=userName%></span> <i
				class="fa fa-angle-down"></i>
		</a>
			<ul class="dropdown-menu">
				<li><a href="/EhatEnterprise/UserPassword.jsp"><i
						class="fa fa-user"></i> My Profile</a></li>
				<li><a href="/EhatEnterprise/LeaveManagement.jsp"><i
						class="fa fa-cog"></i> Manage Leaves</a></li>
				<li><a href="/EhatEnterprise/UserServlet?Action=logOut"><i
						class="fa fa-power-off"></i> Log Out</a></li>
			</ul></li> --%>
			
			<li class="dropdown user" id="header-user"><a href="#"
			class="dropdown-toggle" data-toggle="dropdown"> <img alt=""
				src="images/user.png" /> <%-- <span class="username"><%=userName%></span>  --%><i class="fa fa-angle-down"></i>
		</a>
			<ul class="dropdown-menu">
				<li><a href="UserPassword.jsp"><i class="fa fa-user"></i>
						My Profile</a></li>
				<li><a href="LeaveManagement.jsp"><i class="fa fa-cog"></i>
						Manage Leaves</a></li>
				<li><a onclick="logoutCurrentUser()"><i
						class="fa fa-power-off"></i> Log Out</a></li>
			</ul></li>

		<!-- <li class="dropdown user" id="header-user"><a href="#"
			class="dropdown-toggle" data-toggle="dropdown"> <img alt=""
				src="img/avatars/avatar3.jpg" /> <span class="username">John
					Doe</span> <i class="fa fa-angle-down"></i>
		</a>
			<ul class="dropdown-menu">
				<li><a href="#"><i class="fa fa-user"></i> My Profile</a></li>
				<li><a href="#"><i class="fa fa-cog"></i> Account Settings</a></li>
				<li><a href="#"><i class="fa fa-eye"></i> Privacy Settings</a></li>
				<li><a href="login.html"><i class="fa fa-power-off"></i>
						Log Out</a></li>
			</ul></li> -->
		<!-- END USER LOGIN DROPDOWN -->
	</ul>
	<!-- END TOP NAVIGATION MENU -->
</div>
<!-- TEAM STATUS -->
<div class="container team-status" id="team-status">
	<div id="scrollbar">
		<div class="handle"></div>
	</div>
	<div id="teamslider">
		<ul class="team-list">


			<li id="a"><a href="../../pharmacy/pharmacy/masters">Masters</a></li>
			<li id="b"><a
				href="../../pharmacy/pharmacy/transaction">Transaction</a></li>
			<li id="pharmaReportModule"><a
				href="../../pharmacy/report/report">Report</a></li>	

			<%-- <li id="ehatMod1"><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
			<li id="ehatMod2"><a href="OPD_Appointment.jsp">Scheduler</a></li>
			<li id="ehatMod3"><c:if test="${sessionScope.userType != 'rmo' }">
					<a href="OPDDoctorsDeskDashboard.jsp">Doctors Desk</a>
				</c:if> <c:if test="${sessionScope.userType == 'rmo' }">
					<a href="OPD_RMO_Dashboard.jsp">RMO</a>
				</c:if></li>
			<li id="ehatMod4"><a href="IPD_Dashboard.jsp">IPD</a></li>

			<li id="ehatMod5"><a href="OTScheduler.jsp">OT</a></li>

			<li id="ehatMod6"><a href="BillingDashboardForIPD.jsp">Billing</a></li>
			<li id="ehatMod7"><a href="inventory_Dashboard.jsp">Inventory</a></li>
			<li id="ehatMod9"><a href="MachineTableView.jsp">Maintenance
			</a></li>
			<li id="ehatMod12"><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
			<!-- <li id="ehatMod13" style="width: 6%;" ><a
					href="pharmacyBillDashboard.jsp">Pharmacy</a></li> -->
			<li id="ehatMod10"><a href="UserManagement.jsp">Administrator
			</a></li>
			<li id="ehatMod11"><a href="HRManagement.jsp">HR</a></li>
			<li id="ehatMod8"><a href="ReportDashboard.jsp">Reports</a></li> --%>


			<!-- <li class="current"><a href="javascript:void(0);"> <span
					class="image"> <img src="img/avatars/avatar3.jpg" alt="" />
				</span> <span class="title"> You </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 35%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 20%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 10%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">6</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">3</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">1</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar1.jpg" alt="" />
				</span> <span class="title"> Max Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 15%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 40%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 20%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">2</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">8</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">4</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar2.jpg" alt="" />
				</span> <span class="title"> Jane Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 65%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 10%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 15%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">10</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">3</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">4</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar4.jpg" alt="" />
				</span> <span class="title"> Ellie Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 5%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 48%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 27%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">1</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">6</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">2</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar5.jpg" alt="" />
				</span> <span class="title"> Lisa Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 21%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 20%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 40%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">4</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">5</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">9</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar6.jpg" alt="" />
				</span> <span class="title"> Kelly Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 45%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 21%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 10%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">6</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">3</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">1</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar7.jpg" alt="" />
				</span> <span class="title"> Jessy Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 7%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 30%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 10%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">1</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">6</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">2</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li>
			<li><a href="javascript:void(0);"> <span class="image">
						<img src="img/avatars/avatar8.jpg" alt="" />
				</span> <span class="title"> Debby Doe </span>
					<div class="progress">
						<div class="progress-bar progress-bar-success" style="width: 70%">
							<span class="sr-only">35% Complete (success)</span>
						</div>
						<div class="progress-bar progress-bar-warning" style="width: 20%">
							<span class="sr-only">20% Complete (warning)</span>
						</div>
						<div class="progress-bar progress-bar-danger" style="width: 5%">
							<span class="sr-only">10% Complete (danger)</span>
						</div>
					</div> <span class="status">
						<div class="field">
							<span class="badge badge-green">13</span> completed <span
								class="pull-right fa fa-check"></span>
						</div>
						<div class="field">
							<span class="badge badge-orange">7</span> in-progress <span
								class="pull-right fa fa-adjust"></span>
						</div>
						<div class="field">
							<span class="badge badge-red">1</span> pending <span
								class="pull-right fa fa-list-ul"></span>
						</div>
				</span>
			</a></li> -->
		</ul>
	</div>
</div>
<!-- /TEAM STATUS -->
<!--/HEADER -->



<%-- <div id="top18" class="navbar-fixed-top">
	<div id="outerMenu"
		style="height: 38px; background-color: #0072c6; width: 100%;">
		
		<div class="navbar clearfix" id="header">
			<ul class="nav navbar-nav" style="height: 38px; width: 91%">
				<li
					style="width: 12%; padding-left: 0%; padding-right: 0%; padding-top: 0px;"><a
					style="padding-left: 0%; padding-right: 0%; padding-top: 0px; padding-bottom: 2px !important;"
					href="Dashboard.jsp"> <img
						src="<c:url value="/pharmacy/resources/images/logo.png"/>"
						width="107" height="37px">
				</a></li>
				<li id="a" style="width: 7%;"><a
					href="/EhatEnterprise/pharmacy/pharmacy/masters">Masters</a></li>
				<li id="b" style="width: 7%;"><a
					href="/EhatEnterprise/pharmacy/pharmacy/transaction">Transaction</a></li>

				<li id="ehatMod3" style="width: 7%;"><a
					href="/EhatEnterprise/pharmacy/pharmacy/reports">Reports</a></li>
				<!-- <li id="ehatMod5" style="width: 9%;"><a href="OTSchedule.jsp">OT
						Managment</a></li> -->
				<li id="ehatMod4" style="width: 7%;"><a
					href="/EhatEnterprise/pharmacy/pharmacy/others">Others</a></li>

				<li id="ehatMod5" style="width: 7%;"><a
					href="/EhatEnterprise/pharmacy/pharmacy/utilities">Utilities</a></li>

				<li style="width: 7%;" class="pull-right"><img
					src="<c:url value="/pharmacy/resources/images/userManage.png"/>"
					width="85" height="38" alt="Image"
					style="margin-top: 2px ! important;" /></li>
			</ul>
			<ul id="ehatMod0" class="nav navbar-nav"
				style="width: 9%; background-color: #0072c6; height: 38px;">
				<li id="header-user" class="dropdown user"><a
					data-toggle="dropdown" class="dropdown-toggle"
					style="padding-bottom: 6.5px !important;" href="#"> <img
						src="<c:url value="/pharmacy/resources/img/avatars/avatar3.jpg"/>"
						alt=""> <span class="username">Admin</span> <i
						class="fa fa-angle-down"></i>
				</a>
					<ul class="dropdown-menu">
						<li><a href="#"><i class="fa fa-user"></i> My Profile</a></li>
						<li><a href="#"><i class="fa fa-cog"></i> Account
								Settings</a></li>
						<li><a href="#"><i class="fa fa-eye"></i> Privacy
								Settings</a></li>
						<li><a href="UserServlet?Action=logOut"><i
								class="fa fa-power-off"></i> Log Out</a></li>
					</ul></li>
			</ul>
		</div>
	</div>
</div> --%>
<!--Added by Laxman for hospital logo on 08-Jan-2018  -->

<script>
//Added by Laxman for header logo on 08-Jan-2017.
$(document).ready(function() {
	
	/* function fetchHospitalDetailsImg() {
		
		var sid = 0;
		var inputs = [];
		inputs.push('action=fetchHospitalDetails');
		inputs.push('corporateId=' + sid);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/AdminServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						pobj1 = eval('(' + ajaxResponse + ')');

						if (pobj1.listHosDetail.length > 0) {
							if(!(pobj1.listHosDetail[0].imgpt)==null || !(pobj1.listHosDetail[0].imgpt)=="" || !(pobj1.listHosDetail[0].imgpt)=="undefine"){
							$('#logo1').attr('src','../../pharmacy/pharmacy/readImage?url='+ pobj1.listHosDetail[0].imgpt);
							$('#logo1').attr('value',pobj1.listHosDetail[0].imgpt);
							//$('#stateIds').val(pobj1.listHosDetail[0].hs);
						}
						}
					}
				});
	}
	
	fetchHospitalDetailsImg(); */
	//$('#sidebar-collapse').click();
	
}); 

function logoutCurrentUser(){
	jQuery.ajax({
		async : false,
		type : "POST",
		data : "reqType=AJAX",
		url : "../../ehat/users/logoutCurrentUser",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {
			var origin   = window.location.origin; 

			origin += "/MAHAHMIS/"+r
			//alert("origin*** "+origin)
				
			window.location.replace(origin);						
		}
	});
}
</script>
