<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>B2B Charges Configuration</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>

<script type="text/javascript" src="js/admin_b2b_charges_master.js"></script>
      <script type="text/javascript">
         onload = function() {		
         	fetchAllService();
			getAllUnitDropdown();
			fetchAllCustomerTypes();
         };
      </script>
	
<style>
.tdColorWarning{
	color:#e1890c;
	font-weight: bold;
}
.tdColorRed{
	color:red;
	font-weight: bold;
}
.tdColorGreen{
	color:green;
	font-weight: bold;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->
		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="left_menu_admin.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
				
				Date date = new Date();
				java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
				String formattedDate = sdf.format(date);					
			%>
			<div id="main-content">
				<div class="container">
                     <div class="row">
                        <div id="content" class="col-lg-12">
                           <!-- PAGE HEADER-->
                           <div class="row">
                              <div class="col-sm-12">
                                 <div class="page-header">
                                    <ul class="breadcrumb col-md-12">
                                       <li>Date : <%=todays_date%></li>
                                       <li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
                                       <li><a href="hospital_info.jsp">Administrator</a></li>
                                       <li><a href="admin_b2b_charges_master.jsp">B2B Charges Configuration </a></li>
                                       <div class="pull-right">											
                                          <button class="btn btn-xs btn-success editSubService" id="saveBtn" value="Save Now" data-toggle="tooltip"
                                             data-placement="left" title="Save Master" onclick="saveConfigurationService()">
                                          <i class="fa fa-save"></i>
                                          </button>
                                          <button class="btn btn-xs btn-danger" data-toggle="tooltip"	data-placement="left" title="Refresh" onclick="reload()">
                                          <i class="fa fa-refresh"></i>
                                          </button>
                                          <input type="button" class="btn btn-xs btn-success" data-toggle="modal" data-target="#myModal" value="EDIT"
                                             onclick="fetchConfigurationChargesList()">
                                          <input type="button" id="apply"	class="btn btn-xs btn-success" style="font-size: 12px;"
                                             onclick="apply()" value="APPLY">							
                                       </div>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                           <!-- /Common -->
                           <!-- <div class="divide-20"></div> -->
                           <div class="panel panel-default">
                              <div class="panel-body">
                                 <div class="col-md-12">
                                    <!-- configuration id -->
                                    <div class='form-group Remove-Padding col-md-12-1'
                                       style='padding-right: 8px; margin-top: 9px; display: none;'>
                                       <div class='divide-20'></div>
                                       <label class='TextFont col-md-4-1'>Config Id</label> <input
                                          id='configId' type='text' placeholder='Slave ID'
                                          style='background-color: #ddd'
                                          class='form-control input-SmallText col-md-7-1'
                                          readonly='readonly' style='margin-left:0%;' value='0' />
                                    </div>
                                    <div id="divLine1" class="box border col-md-12" style="padding: 10px">
                                       <form class="form-horizontal col-md-12">
                                         <!--  <div class="form-group col-md-4 hide">
                                             <label class="col-md-5" for="group">Customer Type<b style="color: red;">*</b></label> 
                                             <select class="col-md-7" name="custTypeForRegPage" id="custTypeForRegPage" onchange="getAllCustomers(this.id,'custNameRegPage')">
                                             </select> 
                                          </div>
                                          <div class="form-group col-md-4 hide">
                                             <label class="col-md-5" for="group">Customer Name<b style="color: red;">*</b></label> 
                                             <select onchange="getCustomerId()" id="custNameRegPage"	class="col-md-7">
                                                <option value="0">--Select Customer--</option>
                                             </select>
                                          </div>
 -->
													<!--  new by manish -->
													<!-- <div class="col-md-2 ">
														<div class="form-group col-md-2">
															<label for="status" class="control-labe">Type</label> <select
																onchange="labDropdown()" style="width: 150px"
																id="lookupDetIdLay">

															</select>
														</div>
													</div>
													<div class="col-md-2 ">
														<div class="form-group col-md-2">
															<label for="status">Name</label> <select
																style="width: 150px" id="nameId">
																<option value="0">--Select Name--</option>
															</select>
														</div>
													</div>

													<div class="col-md-2 " style="margin-left: 4%;">
														<div class="form-group col-md-2">
															<label for="status">Unit</label> <select
																style="width: 150px" id="unitList" 
															onchange=" fetchSubServiceCategoryListBasedOnUnit(unitId)">
																<option value="0">--Select Unit--</option>
															</select>
														</div>
													</div>
 -->													<!--  new by manish  end-->


                                                   <div class="col-md-2 " >
														<div class="form-group col-md-2">
															<label for="status">Unit</label> <select
																style="width: 150px" id="unitList" 
															onchange="fetchSubServiceCategoryListBasedOnUnit(unitId); fetchCustomerNameByUnitId(unitId);"
															>
																<option value="0">--Select Unit--</option>
															</select>
														</div>
													</div>
                                                  
                                                   <div class="col-md-2 " style="margin-left: 4%;">
														<div class="form-group col-md-2">
															<label for="status" class="control-label">Type</label> <select
																 style="width: 150px" id="custTypeForRegPage" onchange="fetchCustomerTypeByUnitId(this.id,'custNameRegPage')">
																 <option value='0'>--Select Type--</option>
															</select>
														</div>
													</div>
                                                  
                                                  <div class="col-md-2 " style="margin-left: 4%;">
														<div class="form-group col-md-2">
															<label for="status">Name</label> <select
																style="width: 150px" id="custNameRegPage" onchange="fetchCustomerTypeByName()">
 																<option value="0">--Select Name--</option> 
															</select>
														</div>
													</div>
													
												</form>
                                    </div>
                                    <!-- masters of masters -->
                                    <div id="divLine2" class="box border col-md-12">
                                       <form class="form-horizontal col-md-12" id="myform">
                                          <div class="col-md-1">
                                             <div class="row">
                                                <label class="TextFont">Number </label> <input
                                                   id="number" type="text" placeholder="Number"
                                                   class="form-control input-SmallText" type="number"
                                                   value="0" maxlength="5"
                                                   onkeypress=" return validateNumbers(event)" onkeyup="validationsonkeyup()" />
                                             </div>
                                             <div class="divide-20"></div>
                                          </div>
                                          <div class="col-md-1" style="margin-left: 4%;">
                                             <div class="row">
                                                <label class="TextFont"> Operator </label> 
                                                <select id="operator" title="Select one of these options" class="form-control input-SmallText col-md-11-1 TextFont margin-1">
                                                   <option value="0">-SELECT-</option>
                                                   <option value="+">+</option>
                                                   <option value="-">-</option>
                                                   <option value="%">%</option>
                                                </select>
                                             </div>
                                             <div class="divide-20"></div>
                                          </div>
                                          <div class="col-md-2" style="margin-left: 2%;">
                                             <div class="" style="margin-top: 11px;">
                                                <label class="TextFont"></label> <label
                                                   class="checkbox input-SmallText col-md-3"> <input
                                                   type="radio" id="increase" value="+" name="incdecType">
                                                Increase
                                                </label> <label
                                                   class="checkbox input-SmallText col-md-offset-4 col-md-3">
                                                <input type="radio" id="decrease" value="-" name="incdecType"> Decrease
                                                </label>
                                             </div>
                                             <div class="divide-20"></div>
                                          </div>
                                          <div class="col-md-1" style="margin-left: 4%;">
                                             <div class="row">
                                                <label class="TextFont"> Distribute </label> <input
                                                   id="distribute" class="form-control input-SmallText"
                                                   type="text" placeholder="Distribute" onkeyup="validationsonkeyup()">
                                             </div>
                                             <div class="divide-20"></div>
                                          </div>
                                          <div class="col-md-4" style="margin-left: 10%">
                                             <div class="row">
                                                <!-- ---------Touheed Plugin Multi select Plugin-------------- -->
                                                <label class="TextFont" style="margin-bottom: -1px;">Select Combination
                                                Services </label>
                                                <div id="" class="form-group Remove-Padding col-md-12-1"
                                                   style="margin-left: -10%; height: 80px; width: 98%;">
                                                   <div class="divide-10"></div>
                                                   <div class="form-group">
                                                      <div class="col-md-8">
                                                         <select name="listmstrcom" id="listmstr_select_combination"
                                                            style="width: 200px"
                                                            onclick="setDyanamicDivcom('dynamicItemcom',this.id)">
                                                            <option id="firstElmtcom" value="0">--- Select Services
                                                               ---
                                                            </option>
                                                         </select>
                                                      </div>
                                                   </div>
                                                   <div
                                                      class="col-md-12 select2-container select2-container-multi "
                                                      style="margin-top: -1%;">
                                                      <ul id="dynamicItemcom" class="select2-choices"
                                                         style="overflow-y: scroll;">
                                                      </ul>
                                                   </div>
                                                </div>
                                                <!-- 	---------Touheed Plugin Multi select Plugin-------------- -->
                                             </div>
                                             <div class="divide-20"></div>
                                          </div>
                                          <!-- <div class="col-md-2" style="margin-left: 4%;">
                                             <div class="row">
                                             	<label class="TextFont"> HallCharges </label>
                                             	<input id="hallCharges" class="form-control input-SmallText"
                                             		type="text" value="0" maxlength="5"	onkeypress=" return validateNumbers(event)" >
                                             </div>
                                             <div class="divide-20"></div>
                                             </div>
                                             
                                             <div class="col-md-2" style="margin-left: 4%;">
                                             <div class="row">
                                             	<label class="TextFont"> MedicalTeamCharges </label> 
                                             	<input id="medicalCharges" class="form-control input-SmallText"
                                             		type="text"	value="0" maxlength="5" onkeypress=" return validateNumbers(event)" >
                                             </div>
                                             <div class="divide-20"></div>
                                             </div> -->
                                       </form>
                                    </div>
                                    <div id="divLine10" class=" box border col-md-12" style="padding: 10px">
                                       <form class="form-horizontal col-md-12" id="myform">
                                          <div class="col-md-3">
                                             <label class="TextFont">Select Department</label>
                                             <div class="form-group Remove-Padding col-md-12">
                                                <div class="form-group">
                                                   <div class="col-md-8">
                                                      <select name="listmstr" id="listmstr_select" style="width: 200px"
                                                         onchange="setDyanamicDiv('dynamicItem',this.id)">
                                                         <option id="firstElmt" value="0">--- Select DepartM	---</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="col-md-3" style="margin-top:15px">
                                             <div class="col-md-12 select2-container select2-container-multi">
                                                <ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;height:37px"></ul>
                                             </div>
                                          </div>
                                          <div class="col-md-2">
                                             <div class="row">
                                                <label class="TextFont">From Date</label> 
                                                <input
                                                   id="fromDate" class="form-control input-SmallText"
                                                   type="text" 
                                                   onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
                                                   onchange="getDataWithDate(this.id)"
                                                   name="date" placeholder="From Date" value=""> <%-- <%=todays_date%> --%>
                                                <input type="hidden" id="jvfromDate" value="">
                                             </div>
                                          </div>
                                          <div class="col-md-1"></div>
                                          <div class="col-md-2">
                                             <div class="row">
                                                <label class="TextFont">To Date </label> <input
                                                   id="toDate" class="form-control input-SmallText"
                                                   type="text" 
                                                   onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
                                                   onchange ="getDataWithDate(this.id)"
                                                   name="date" placeholder="To Date" value="">
                                                <input type="hidden" id="jvtoDate" value="">
                                             </div>
                                          </div>
                                       </form>
                                    </div>
                                    <div id="divLine3" class="col-md-12">
                                       <div class="col-md-6">
                                          <div class="box border primary">
                                             <div class="box-title">
                                                <h4 id="">
                                                   <i class="fa fa-table"></i>Services
                                                </h4>
                                             </div>
                                             <div class="box-body" style="height: 330px">
                                                <div class='col-sm-12'>
                                                   <!-- search configuration -->
                                                   <div style="" class="col-md-3">
                                                      <label class="TextFont">Search By:</label>
                                                   </div>
                                                   <div class="col-md-6 TextFont" id="divbyName">
                                                      <input class="col-md-8" name="byName" type="text"
                                                         onkeyup="setAutoCompleteForConfiguration(this.id,'search')"
                                                         class="typeahead form-control input-SmallText "
                                                         id="byName"/>
                                                   </div>
                                                   <div class="col-md-3" style="text-align: center;">
                                                      <input type="button" value="show"
                                                         class="btn btn-xs btn-primary" id="showdata"
                                                         onclick="showData()" />
                                                   </div>
                                                </div>
                                                <div class='col-sm-12'>
                                                   <table class='table table-bordered' style='width: 100%;'>
                                                      <thead class='cf'>
                                                         <tr>
                                                            <th class='col-md-5 center'
                                                               style='height: 21.5px;'>
                                                               <div
                                                                  class='TextFont'>Service Name</div>
                                                            </th>
                                                            <th class='col-md-4 center'
                                                               style='height: 21.5px;'>
                                                               <div
                                                                  class='TextFont'>Unit Name</div>
                                                            </th>
                                                            <th class='col-md-5 center'
                                                               style='height: 21.5px;'>
                                                               <div
                                                                  class='TextFont'>Charges</div>
                                                            </th>
                                                            <th class='col-md-2 center'
                                                               style='height: 21.5px;'><input
                                                               type='button' value='>>'
                                                               onclick='addAllTrFromBackend()'></th>
                                                         </tr>
                                                      </thead>
                                                   </table>
                                                </div>
                                                <div class='col-sm-12'
                                                   style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd;'>
                                                   <table
                                                      class='table table-striped table-condensed cf'>
                                                      <tbody id="leftDiv">
                                                      </tbody>
                                                   </table>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="col-md-6">
                                          <div class="row">
                                             <div class="form-group col-md-12">
                                                <div class="box border primary">
                                                   <div class="box-title">
                                                      <h4 id="">
                                                         <i class="fa fa-table"></i>Charges Configuration
                                                      </h4>
                                                      <div class="pull-right"></div>
                                                   </div>
                                                   <div class="box-body"  style="height: 330px">
                                                      <div class='col-sm-12'>
                                                         <div class="col-md-11 center">
                                                            <label>Total Charges</label> 
                                                            <input id="totalcharges" type="text" maxlength="200" name="toatalCharges"
                                                            style="width: 43%; value="0" readonly="readonly">
                                                         </div>
                                                         <table class='table table-bordered'
                                                            style='width: 100%;'>
                                                            <thead class='cf'>
                                                               <tr>
                                                                  <th class='col-md-2 center'
                                                                     style='height: 21.5px;'>
                                                                     <div
                                                                        class='TextFont'>Service Name</div>
                                                                  </th>
                                                                  <th class='col-md-2 center'
                                                                     style='height: 21.5px;'>
                                                                     <div
                                                                        class='TextFont'>Unit Name</div>
                                                                  </th>
                                                                  <th class='col-md-2 center'
                                                                     style='height: 21.5px;'>
                                                                     <div
                                                                        class='TextFont'>Charges</div>
                                                                  </th>
                                                                  <!-- <th class='col-md-2 center'
                                                                     style='height: 21.5px;'><div
                                                                     	class='TextFont'>CGHS Code</div></th> -->
                                                                  <th class='col-md-2 center'
                                                                     style='height: 21.5px;'>
                                                                     <input class="form-control input-sm" id="byName4" 
                                                                        onkeyup="searchservicesonui()" 
                                                                        type="text" placeholder="Search">
                                                                  </th>
                                                               </tr>
                                                            </thead>
                                                         </table>
                                                      </div>
                                                      <div class='col-sm-12'
                                                         style='height: 224px; overflow-y: scroll; border: 1px solid #ddd;'>
                                                         <table class='table table-striped table-condensed cf'>
                                                            <tbody id="rightDiv" class="rightDivClass">
                                                            </tbody>
                                                         </table>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <input id="chargesId" class="hidden">
                                    <div class="divide-20"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
			</div>
			
			<!-- Modal popu for edit -->
            <div class="modal fade" id="myModal" role="dialog" class="popup">
               <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                     <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>							
                        <h4 class="modal-title">Customer Charges Configuration List</h4>
                     </div>
                      <div class="modal-body">
                      
                       <!-- ======================================================== -->
                      <!-- Added by ROHIT on 10 Oct 2022 for TIcket ID DB_0026 -->
                       <!-- ======================================================== -->
                      <div class="col-md-12" style = "padding: 0 0 7px; margin: 0 0 15px; border-bottom: 1px solid #CCC;">
                       	  
                       	  <!-- <div class="col-md-2">
                             <label class="TextFont" style="font:bold; font-size:10px; margin-top:5px; margin-left:15px; margin-bottom:10px;"> Search </label>
                           </div>
                           <div>
                            <input class="col-md-9" name="searchCust" type="text"
                                                         onkeyup="fetchConfigurationChargesList('search')"
                                                         class="typeahead form-control input-SmallText "
                                                         id="searchCust"/>
                        
                            </div> -->
                            
                             <div class="row">
                           <div class="col-md-2">
                             <label class="TextFont" style="font:bold; font-size:10px; margin-top:5px; margin-left:15px; margin-bottom:10px;"> Search Customers: </label>
                           </div>
                           <div class="form-group col-md-4" style="margin: 5px 0 0">
                            	<input name="searchCust" type="text"
                                       onkeyup="searchLabs('searchCust')"
                                       class="typeahead form-control input-SmallText "
                                       id="searchCust" style="mar"/>
                           </div>
                           
                           <div class="col-md-2">
                             <label class="TextFont" style="font:bold; font-size:10px; margin-top:5px; margin-left:15px; margin-bottom:10px;"> Search Packages: </label>
                           </div>
                           <div class="form-group col-md-4" style="margin: 5px 0 0">
                            	<input name="searchPackage" type="text"
                                       onkeyup="searchLabs('searchPackage')"
                                       class="typeahead form-control input-SmallText "
                                       id="searchPackage" style="mar"/>
                           </div>
                         </div>
                       </div>
                       <!-- ======================================================== -->

                        <div class="row">
                           <div class="form-group col-md-12">
                              <div class="box-body" style="height: 320px;">
                                 <div class='col-sm-12' style='height: 298px; overflow-y: scroll; border: 0px solid #ddd;'>
                                    <table  id="popupDiv" class="datatable table table-bordered " >
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-default"
                           data-dismiss="modal">Close</button> -->
                     </div>
                  </div>
               </div>
            </div>
			
		
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px" src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<!-- /JAVASCRIPTS -->
		
            <div id="showSubModulesPopup" class="modal fade in">
               <!--End #showSubModulesPopup Popup -->
               <input id="objUserAccess" type="hidden" value="" /> <input
                  id="ChargesIdHidden" type="hidden" value="0" /> <input
                  id="ChargesSlaveIdHidden" type="hidden" value="0" />
            </div>
            <div id="subIDs" style="display: none;"></div>
            <input type="hidden" id="queryType" value="insert">
            <div id="configIdsFor" style="display: none;"></div>
            <input type="hidden" id="servicesInfo" value="demoConfiInfo">
            <input type="hidden" id="iscombination" value="N">
            <input type="hidden" id="callfrom" value="all">
            <input type="hidden" id="selfId" value="-1">
            <input type="hidden" id="iscatHall" value="-">
            <input type="hidden" id="fromYear" value="N">
            <input type="hidden" id="countDates" value="0">
	        <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	        <input type="hidden" id="businessType" value="1">
	        
	         <script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		      <!-- SLIMSCROLL -->
		      <script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		      <script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
		      <!-- BLOCK UI -->
		      <script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
		      <script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
		      <script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
		      <!-- TYPEHEAD -->
		      <script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
		      <!-- UNIFORM -->
		      <script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
		      <!-- DATA TABLES -->
		      <script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		      <script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		      <script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		      <script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
		      <!-- COOKIE -->
		      <script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
		      <!-- CUSTOM SCRIPT -->
		      <script src="ehat-design/js/script.js"></script>
		      <script src="auto/jquery.mockjax.js"></script>
		      <script src="auto/bootstrap-typeahead.js"></script>
		
		<script>
         $(document).ready(function() {
         	App.setPage("wizards_validations"); 
         	App.init(); 
         	$("#custNameRegPage").select2();
         	$("#custTypeForRegPage").select2();

         	fetchAllServicecom();
         });
		</script>
		
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_reporting.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
</body>
</html>

