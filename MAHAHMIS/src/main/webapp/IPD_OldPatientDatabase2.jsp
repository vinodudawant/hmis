<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>IPD_PatientDatabase</title>

<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/Ipdblock.css">

<!-- ----for search  autosuggation  complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for search  autosuggation  complete-------------- -->

<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" media="screen">

<!-- STYLESHEETS -->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/IpdBlockWise.js"></script>
<script type="text/javascript" src="js/bed.js"></script>
<script type="text/javascript" src="js/ehat_physical_discharge.js"></script>
<!-- <script type="text/javascript" src="js/ipdmanagament.js"></script> -->

<!-- Auto-Suggestion 1/1/2015 -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">
<link rel="stylesheet" type="text/css"
	href="js/ExtraJs/jqx-widgets/jqx_customTheme.css" />


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>



<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_OPD_Database"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>
<script type="text/javascript">
	onload = function() {
		//fetchHospitalDetailsPrint();
		//display1('IPD_OldPatientDatabase');
		//getPatientInfoByTreatIdIPD();
		
		//displayDischargedPat('PhysicallyDiscahrgePat'); 
		$("#viedat").addClass("anchorActive");
		//setAutoPatientName("byName", "onload", "IPD_OldPatientDatabase");
		
		//getAllPatientRecords2();   //Added by sagar
		//getIpdBillPatients2("ipd");
				/* bed view */
		getBedAvailable('allHallBed');   // to show beds statistics
		//getIpdBillPatientsBlock();
		getBedAva2('allBed');
		getallHallType('dummyParam');
		getIpdBillPatientsBlockBeds('onload');
		setPatientSearchType();
			
	}

		//setAutoPatientNameDischargedPat("byNamePHYDIS", "onload", "IPDPhysicallyDischarged");
		
		function display1(page_name) {
			var input = [];
			input.push('action=DisplayTopPat');
			input.push('page_name=' + encodeURIComponent(page_name));

			var str = input.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					//patientBean = eval('(' + ajaxResponse + ')');
					$("#patobject").html(ajaxResponse);
					// setPurchaseGridDataACTIVE(patientBean.pl);
					//setPurchaseGridDataDISCHARGED(patientBean.pl);

				}
			});
		}

	/* 	};
		
	} */
	 
	/**************ipd active patients*************/
	/* function setPurchaseGridDataACTIVE(result)
	{
		var data = result;
	    // prepare the data
	    var source =
	    {
	        datatype: "json",
	        datafields: [
	            { name: 'pi', type: 'string'},
	            { name: 'tit', type: 'string'},
	            { name: 'fn', type: 'string'},
	            { name: 'mn', type: 'string'},
	            { name: 'ln', type: 'string'},
	            { name: 'trCount',map:'objTreat>trCount', type: 'string'},
	            { name: 'htnm',map:'objHall>htnm', type: 'string'},
	            { name: 'hn',map:'objHall>hn', type: 'string'},
	            { name: 'bdnm',map:'oBed>bdnm', type: 'string'},
	            { name: 'sponsredName',map:'liSponser>0>sponsredName', type: 'string'},
	            { name: 'sx', type: 'string'},
	            { name: 'trid', type: 'string'},
	            { name: 'ht',map:'objHall>ht', type: 'string'},
	            { name: 'a4', type: 'string'},
	            { name: 'a6', type: 'string'}
	           ],
	        localdata: data
	    };
	     var columnrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
	    	 
		        var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
		        var title=datarow['tit'];
		        var fName=datarow['fn'];
		        var mName=datarow['mn'];
		        var lName=datarow['ln'];
		      return title+" "+fName +" " +mName +" " +lName;
	    }; 
	    var sponserenderer= function (row, column, value) {
	    	if(value!="")
	    	{
	    		return value;
	    	}
	    	else
	    	{
	    		return 'Self';
	    	}	
	        
    		
       }
	    var printrenderer= function (row, column, value) {
	    	var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	        var piId=datarow['pi'];
	        
    		return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-success" onclick=printIPDFormJsp('+piId+');><i class="fa fa-print"></i></button></div>';
       }
	    var bedrenderer= function (row, column, value) {
	    	var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	    	 var trId=datarow['trid'];
		     var piId=datarow['pi'];
		     var ht=datarow['ht'];
	        
    		return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-success" onclick=viewBedWard('+piId+','+trId+',"Y",'+ht+',"R","IPD")><i class="fa fa-eye View"></i></button></div>';
       }
	    
	    var viewrenderer= function (row, column, value) {
	    	var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
	        var trId=datarow['trid'];
	        var piId=datarow['pi'];
	        var ht=datarow['ht'];
	        
    		return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-success" onclick=viewBedWard('+piId+','+trId+',"Y",'+ht+',"P","IPD")><i class="fa fa-eye View"></i></button></div>';
       }
	    var dataAdapter = new $.jqx.dataAdapter(source, {
	        downloadComplete: function (data, status, xhr) { },
	        loadComplete: function (data) { },
	        loadError: function (xhr, status, error) { }
	    });
	    $("#jqxgrid").jqxGrid(
	    {
	        width: 1150,
	        source: dataAdapter,
	        columnsresize: true,
	        pageable: true,
	        showstatusbar: true,
	        autoheight: true,
	        sortable: true,
	        altrows: true,
	        enabletooltips: true,
	        theme: 'energyblue',
	        renderstatusbar: function (statusbar) {
                // appends buttons to the status bar.
                var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
                container.append(searchButton);
                statusbar.append(container);
                searchButton.jqxButton({  width: 50, height: 20 });
                // search for a record.
                searchButton.click(function (event) {
                    var offset = $("#jqxgrid").offset();
                    $("#jqxwindow").jqxWindow('open');
                    $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 30);
                }); 
            },
	        columns: [
				{
				    text: 'Srl No', sortable: false, filterable: false, editable: false,
				    groupable: false, draggable: false, resizable: false,
				    datafield: '', columntype: 'number', width: 50,
				    cellsrenderer: function (row, column, value) {
				        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
				    }
				},
				{ text: 'Patient Id', datafield: 'pi',width: 70},
	            { text: 'Patient First Name', datafield: 'fn',width: 1,hidden : true},
	            { text: 'Patient Title', datafield: 'tit',width: 50,hidden : true},
	            { text: 'Patient Medium Name', datafield: 'mn',width: 1,hidden : true},
	            { text: 'Patient Name', datafield: 'ln',width:250,cellsrenderer:columnrenderer},
	            { text: 'Admission No', datafield: 'trCount',width: 140},
	            { text: 'Ward Type', datafield: 'htnm',width: 120},
	            { text: 'Ward Name', datafield: 'hn',width: 120},
	            { text: 'Bed No', datafield: 'bdnm',width: 55},
	            { text: 'Patient Type', datafield: 'sponsredName',width: 115,cellsrenderer:sponserenderer},
	            { text: 'View', datafield: 'sx',width: 46,cellsrenderer:viewrenderer,enabletooltips: false},
	            { text: 'Hall Id', datafield: 'ht',width: 1,hidden : true},
	            { text: 'Tre Id', datafield: 'trid',width: 1,hidden : true},
	            { text: 'Print', datafield: 'a4',width: 42,cellsrenderer:printrenderer,enabletooltips: false},
	            { text: 'Relative Bed', datafield: 'a6',width: 135,cellsrenderer:bedrenderer,enabletooltips: false}	           
	        ],
	    });
	    $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
        // create find and clear buttons.
        $("#findButton").jqxButton({ width: 70});
        $("#clearButton").jqxButton({ width: 70});
        // create dropdownlist.
        $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
            source: [
                'Ward Type',
                'Ward Name'              
            ]
        });
        if (theme != "") {
            $("#inputField").addClass('jqx-input-' + theme);
        }
        // clear filters.
        $("#clearButton").click(function () {
            $("#jqxgrid").jqxGrid('clearfilters');
        });
        // find records that match a criteria.
        $("#findButton").click(function () {
            $("#jqxgrid").jqxGrid('clearfilters');
            var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
            var datafield = "";
            switch (searchColumnIndex) {
                case 0:
                    datafield = "htnm";
                    break;
                    
                case 1:
                    datafield = "hn";
                    break;
              }
            var searchText = $("#inputField").val();
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 1;
            var filtervalue = searchText;
            var filtercondition = 'contains';
            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
            // apply the filters.
            $("#jqxgrid").jqxGrid('applyfilters');
        });
	}  */
</script>

<%	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String risingFlow = resourceBundleEha.getObject("rising").toString();
%>

</head>

<body style="background: white ! important;">

	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>

		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%
					String moduleName = request.getParameter("moduleName");

						if (moduleName != null && moduleName.equals("doctorDesk")) {
				%>
				<%@include file="menu_DoctorDesk.jsp"%>
				<%
					} else {
				%>
				<%@include file="left_menu_IPDMain.jsp"%>
				<%
					}
				%>
				<!--End Left Menu -->

				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
					
						<div class="row">
						

							<!-- Start Tab UI -->
							<div class="col-md-12" style="margin-top: 5px; margin-left: 0px;">
								<!-- Start BOX -->
								<div class="box border col-md-12">
									<!-- <div class="divide-10"></div> -->
									<div class="tabbable col-md-12">
									<!-- 	<h1>hiiii</h1> --><br>
									<br><br>
						<!-- Statr of bedTable --></div>
						 <div class="tabbable col-md-12-1" id="bedTable" style="display:none">
										<div class="col-md-12-1" >
									<div class="col-md-3-1">
										<table class="table table-striped col-md-12-1"
											style="margin-top: -1px;">
											<tbody>
												<tr id="">
												<td class="col-md-2-1 text-center">	<span id="bedName"><p style="width:100px;height:21px;text-align: left;">
								                Hall Names  </p></span></td>
													<!-- <td class="col-md-3-1 text-center"
														style="height: 20px; padding-bottom: 29px;"><div
															style="padding-top: 16% !important; font-family: Courier New;">
															Hall Name</div></td> -->
												</tr>
												<tr id="" style="background: #dddddd;" >
													<td class="col-md-3-1">Total Beds</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3-1">Occupied Beds</td>
												</tr>
												<tr id="" style="background: #dddddd;">
													<td class="col-md-3-1">Vacant but unavailable</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3-1">Total Unavailable</td>
												</tr>
												<tr id="" style="background: #dddddd; color: green;"><!-- #85D6FF  -->
													<td class="col-md-3-1">Available With Waiting</td>
												</tr>
												<tr id="" style="color: green;">
													<td class="col-md-3-1">Total Available Beds</td>
												</tr>
												<tr id="" style="background: #dddddd; height: 11px;">
													<td class="col-md-3-1"></td>
												</tr>
											</tbody>
										</table>
									</div>

									<div class="col-md-9-1" style="overflow-x: auto;">

										<table class="table table-striped "
											style="margin-bottom: 0px;">
											<tbody>
												<tr id="bedAccupiedPer">
													<td style="vertical-align: middle; text-align: center;"
														height="310"><img alt=""
														src="images/ajax_loader_blue_64.gif"></td>
												</tr>
												<tr id="bedTotals" style="background: #dddddd;">
												</tr>
												<tr id="bedOccuppieds" style="color: red;">
												</tr>
												<tr id="bedVacBtUnavl" style="background: #dddddd;">
												</tr>
												<tr id="bedTotUnAvl" style="color: red;">
												</tr>
												<tr id="bedAvlWait"
													style="background: #dddddd; color: green;">
												</tr>
												<tr id="bedTotAvl" style="color: green;">
												</tr>
											</tbody>
										</table>
									</div>
								</div>
						</div> 
						<!-- End of Bed TAbles  -->

										<ul class="nav nav-tabs">


											<li id="blockWisePat" class="active"><a data-toggle="tab" href="#IPDBlock"
												onclick="getIpdBillPatientsBlockBeds('onload')"><i
													class="fa fa-user"></i><span class="hidden-inline-mobile">IPD
														Block Wise</span></a></li>

											<li id="ipdactive" ><a data-toggle="tab" href="#IPD"
												onclick="getIpdBillPatients2('onload')"><i class="fa fa-user"></i><span
													class="hidden-inline-mobile">IPD Active Patient</span></a></li>
											<!--<span
													class="badge badge-blue font-11" style="margin-left: 4px"><font
														color="black" id="unitCount"></font></span>  -->
											<li id="ipdPhyDisc" onclick="getPhysicalDischargedPatient('IPDDischarge')">
												<a data-toggle="tab" href="#IPD"><i
													class="fa fa-user"></i> <span class="hidden-inline-mobile">Physical
														Discharged Patients</span></a>
											</li>
											
															<div class=" col-md-12">
											<!-- <div class="pull-right col-md-6" id="searchIpd">
											 <div style="font-weight: bold; margin: 0px;"
													class="col-md-2">Search By:</div> 


												<div class="col-md-3 TextFont"
													style="margin: 0px; display: none;">
													<input name="byMrnoIPD" type="text" id="byMrnoIPD"
														class="typeahead form-control input-SmallText"
														placeholder="MR No." />
												</div>
                                                             <div class="col-md-2">
																<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
																	<option value="1">UHID Id</option>
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																	<option value="4">Patient AddharNo</option>
																</select>
															</div>
												<div class="col-md-5 TextFont" style="margin: 0px;">
													<input name="FnameIPD" type="text" id="byName"
														class="typeahead form-control input-SmallText"
														placeholder="First name./ Patient Id./ MR No."
														onkeyup="searchIPDPatients(this.id,'callFrom')" />
												</div>
															

												<div class="col-md-3 TextFont"
													style="margin: 0px; display: none;">
													<input name="DOBIPD" type="text" id="DOBIPD"
														class="typeahead form-control input-SmallText"
														placeholder="DOB." />
												</div>

												<div class="form-group col-md-1-1">
													<input type="button" class="btn btn-xs btn-primary"
														value="search" id="btnforlist"
														onclick="searchIPDPatientsbtn()" />

												</div>
												
												
												
												<div class="form-group col-md-1">
													<input type="button" id="wardShow" class="btn btn-xs btn-primary"
														value="show beds statistics"
														onclick="showHideWard()" />

												</div>
											</div> -->
											
											<div class="pull-right col-md-6" id="searchIpd">
												<div class="form-group col-md-1">
													<input type="button" id="wardShow" class="btn btn-xs btn-primary"
														value="show beds statistics"
														onclick="showHideWard()" />

												</div>
											</div>
											
										</div>
										</ul>

						
										<input type="hidden" id="depdoctordesk" value="1">
										<div class="divide-10"></div>
										<div class="tab-content">
										
										
											<!-- for ward and ward type filter  -->
											<br>
									<div class="divide-20">
									<div class="row">
									<div class="col-md-12">
									
									<div class="col-md-1-1" style="text-align: right">
										<label>Ward Type:</label>
									</div>
									
									<div class="col-md-2-1" id="wt">
										<div id="" class="form-group">
											<select id='wardType1'
												class='form-control input-SmallText'
												onchange='if (this.selectedIndex) setHallNamesList(this.value),filterIpdPatients(this.id)'>
											
											</select>
										</div>
									</div>
									
									<div class="col-md-1-1" style="text-align: right">
										<label>Ward:</label>
									</div>

									<div class="col-md-2-1" id="wn">
										<div class="form-group">
											<select id='hallTypeSelectID'
												class='form-control input-SmallText'
												onchange='filterIpdPatients(this.id);'>
													<option value="0">select</option>
											</select>
										</div>
									</div>
									
									<div class="col-md-1-1" id="wt" style="text-align: right">
										<label>Search By:</label>
									</div>
									
									<div class="col-md-2-1">
										<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
											<option value="1">UHID Id</option>
											<option value="2">Patient Name</option>
											<option value="3">Patient Mobile</option>
											<option value="4">Patient AddharNo</option>
										</select>
									</div>
								
									<div class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
											onkeyup="setAutoPatientNameBlock(this.id,'prevIpd',event)" />
									</div>
									</div>
									</div>
									</div>
									
									<div class="divide-20">
									<div class="row" style="padding: 10px 0 0">
									<div class="col-md-12">
									
									<div id="allBedsBlockWise" style="font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;
										">
										
										<div class="col-md-2">
											<label style="padding: 0 0 0 27px">Total Beds: <span id="totalbedscount"></span></label>
										</div>
										
										<div class="col-md-2">
											<label style="padding: 0 0 0 27px">Occupied Beds: <span id="ba3"></span></label>
										</div>
										
										<div class="col-md-2">
											<label style="padding: 0 0 0 27px">Available Beds: <span id="ba4"></span></label>
										</div>
										
										<div class="col-md-2">
											<label style="padding: 0 0 0 27px">Cleaning Beds: <span id="bclean2"></span></label>
										</div>
										
									</div>
									
									<!-- <div class="col-md-5-1"	id="allBedsBlockWise">
										<div style="font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;"
										class="col-md-12-1">
													<div id="bclean2" style="float: right;">&nbsp;Bed
														Cleaning:&nbsp;</div>
													<div id="ba2" style="float: right; margin-right: 2%;"></div>
													<div style="float: right;" id="ba3">Total Beds:
														&nbsp;&nbsp;&nbsp; Available Beds:&nbsp;</div>
														
											<div id="bclean2"> </div>
											<div  > &nbsp;&nbsp;&nbsp;Cleaning Beds:&nbsp;</div>
														
											<div id="ba4"> </div>
											<div > &nbsp;&nbsp;&nbsp;Available Beds:&nbsp;</div>
														
											<div id="ba3"> </div>
											<div > &nbsp;&nbsp;&nbsp;Occupied Beds:&nbsp;</div>
														
											<div id="totalbedscount" > </div>
											<div  > &nbsp;Total Beds:&nbsp;</div>
									</div>
									</div> -->
									
										</div>
										</div>
										</div>
											<!-- End for ward and ward type filter  -->

											<div id="IPDBlock" class="tab-pane fade in active "
												style="margin-top: 0px;">


												<div class="panel panel-default">
													<div class="panel-body" id="ipdBillPatientsblock"
														style="margin-top: 20px; overflow: auto;"></div>

												</div>
											</div>
											<div id="IPD" class="tab-pane fade in active "
												style="margin-top: 0px;">


												<div class="panel panel-default">
													<div class="panel-body" id="ipdBillPatients"
														style="margin-top: 15px;overflow: auto;"></div>

												</div>
											</div>


						<!-- 					<div id="IPD_PHYSICAL_DISCHARGED_PATIENT"
												class="tab-pane fade in">
												<div class="divide-20"></div>
												Page Search Header
												<div class="form-group Remove-Padding col-md-10-1"
													style="padding-left: 10px;">
													Page Search Header
													<div style="font-weight: bold;" class="col-md-1-1">Search
														By:</div>
													<div style="font-weight: bold;" class="col-md-1-1">Patient
														Name</div>
													<div class="form-group col-md-2-1" id="divbyNamePHYDIS">
												<input name="byNamePHYDIS" type="text" id="byNamePHYDIS"
													class="typeahead form-control input-SmallText "
													onkeypress="return validatealphabetic(event)" />
											</div>
													onkeyup="setAutoPatientNameDischargedPat('byNamePHYDIS','onchange')"
													<div class="form-group col-md-2-1" id="divbyNamePHYDIS">
														<input type="text" id="byNamePHYDIS"
															class="typeahead form-control input-SmallText"
															maxlength="40" name="byNamePHYDIS">
													</div>

													<div style="font-weight: bold;" class="col-md-1-1">OR</div>
													<div style="font-weight: bold;" class="col-md-1-1">Patient
														ID</div>
													<div class="form-group col-md-2-1">
														<input id="byIdPHYDIS"
															class="form-group form-control input-SmallText"
															name="byIdPHYDIS" type="text"
															onkeypress="return validateNumbers(event)" />
													</div>
													<div class="form-group col-md-2-1">
														<button class="btn btn-xs btn-primary"
															data-toggle="tooltip" data-placement="right"
															title="Search "
															onclick="SearchIPDDischargedPatients('IPD_Physically_Discharged_Patient')">
															<i class="fa fa-search"></i>
														</button>
													</div>

													<div class="divide-20"></div>
													<div id="container_PHYDIS" class="col-md-12-1"
														style="border: 1px solid #ddd;"></div>

													<div class="col-md-12-1"
														style="padding-left: 0%; padding-right: 0%;">
														<div id='jqxWidget_PHYDIS'>
															<div id="jqxgrid_PHYDIS"></div>
															<div id="jqxwindow_PHYDIS">
																<div>Find Record</div>
																<div style="overflow: hidden;">
																	<div>Find what:</div>
																	<div style='margin-top: 5px;'>
																		<input id='inputField_PHYDIS' type="text"
																			class="jqx-input" style="width: 200px; height: 23px;" />
																	</div>
																	<div style="margin-top: 7px; clear: both;">Look
																		in:</div>
																	<div style='margin-top: 5px;'>
																		<div id='dropdownlist_PHYDIS'
																			style="background: #a4bed4"></div>
																	</div>
																	<div>
																		<input type="button"
																			style='margin-top: 15px; margin-left: 50px; float: left;'
																			value="Find" id="findButton_PHYDIS" /> <input
																			type="button"
																			style='margin-left: 5px; margin-top: 15px; float: left;'
																			value="Clear" id="clearButton_PHYDIS" />
																	</div>
																</div>
															</div>

														</div>
													</div>
												</div>
											</div> -->
											<!-- End Code for #IPD_PHYSICAL_DISCHARGED_PATIENT GUI -->
											
												<!--Billable bed popup -->
											<div id="ChangeAppointment" class="popup modal fade in"
												tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
												aria-hidden="true">
												<div class="modal-dialog col-md-6-1"
													style="margin-top: 13%; margin-left: 23%">
													<div class="modal-content">

														<div class="modal-header"
															style="padding-bottom: 0px; padding-top: 7px;">
															<div class="box-title">
																<h4>Billable Bed Tariff</h4>
															</div>
															<div
																style="float: right; padding-right: 6px; margin-top: -3%;">
																<button type="button" class="btn btn-xs btn-danger exit"
																	data-dismiss="modal">
																	<i class="fa fa-arrows"></i> Close
																</button>
																<input id="bedIDPop" type="hidden"> <input
																	id="htPop" type="hidden"> <input
																	id="patientTypePop" type="hidden">
															</div>
														</div>

														<div class="modal-body" style="height: 125px;">
															<div class="col-md-12">
																<form class="form-horizontal col-md-12-1"
																	style="margin: 0px;">
																	<!--Panel Body-->
																	<div class="form-group col-md-6-1" style="margin: 0px;">
																		<label class="checkbox-inline input-SmallText"
																			style="padding-left: 20px;"> <input
																			onclick="setBillableBed2()" name="radBillableBed"
																			type="radio" id="radBillableBed1" value="sameBed">
																			Selected Bed
																		</label>
																	</div>
																	<div class="form-group col-md-6-1" style="margin: 0px;">
																		<label class="checkbox-inline input-SmallText"
																			style="padding-left: 20px;"> <input
																			onclick="setBillableBed2()" name="radBillableBed"
																			type="radio" id="radBillableBed2"
																			value="differentBed"> Select Bed Type
																		</label>
																	</div>
																	<div id="divWardType" class="form-group col-md-12-1"
																		style="float: right; margin-top: 3%; margin-bottom: 0%; display: none;">
																		<div class="col-md-12-1"
																			style="margin-left: 0px; margin-top: 10px;">
																			<div class="form-group col-md-2-1">
																				<label class='TextFont'>Ward Type</label>
																			</div>
																			<div id="wardTypeSelectIDBB"
																				class="form-group col-md-4-1"
																				style="padding: 0px 5px;"></div>

																			<div class="col-md-4-1" style="padding-top: 9px;">
																				<div class="form-group col-md-3-1">
																					<label class='TextFont'>Hall</label>
																				</div>
																				<div class="form-group col-md-9-1">
																					<select id="hallTypeSelectIDBB"
																						class="form-control input-SmallText">
																					</select>
																				</div>
																			</div>
																		
																		<button type="button" class="btn btn-primary"
																				onclick="updateBillableBed12()"
																				style="line-height: 0.6">
																				<i class="fa fa-save"></i> Save
																			</button>

																		</div>

																	
																</div>
																</form>
															</div>
															<!-- /BOX-->
														</div>
														<!-- /BODY-->
													</div>
												</div>
											</div>
											<!--/Billable bed popup -->


										</div>
									</div>
								</div>
							</div>










							<%-- 		<div id="content" class="col-lg-12">
								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>IPD Patient</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
								<div class="tabbable col-md-12-1" style="margin-top: -25px;">
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#IPD_ACTIVE_PATIENT"><i class="fa fa-user"></i> <span
													class="hidden-inline-mobile">IPD Active Patients</span></a></li>
										 	   <li onclick="displayDischargedPat('PhysicallyDiscahrgePat')"><a data-toggle="tab" href="#IPD_PHYSICAL_DISCHARGED_PATIENT"><i
													class="fa fa-user"></i> 
													<span class="hidden-inline-mobile">Physical Discharged Patients</span></a>
													</li>    
										</ul>
											
									<div class="divide-10"></div>
									<div id="IPDOLDPATDIV" class="tab-content">
									<!-- Start Code for #IPD_ACTIVE_PATIENT GUI -->
									<div id="IPD_ACTIVE_PATIENT" class="tab-pane fade in active">
										<div class="divide-20"></div>
										<!-- Page Search Header -->
										<div class="form-group Remove-Padding col-md-10-1"
											style="padding-left: 10px;">
										<!-- Page Search Header -->
											<div style="font-weight: bold;" class="col-md-1-1">Search
												By:</div>			
											<div style="font-weight: bold;" class="col-md-1-1">Patient
												Name</div>			
											<div class="form-group col-md-2-1" id="divbyName">
												<input name="byName" type="text" id="byName"
													class="typeahead form-control input-SmallText "
													onkeypress="return validatealphabetic(event)" />
											</div>			
											<div style="font-weight: bold;" class="col-md-1-1">OR</div>
											<div style="font-weight: bold;" class="col-md-1-1">Patient
												ID</div>			
											<div class="form-group col-md-2-1">
												<input id="byId"
													class="form-group form-control input-SmallText" name="byId"
													type="text" onkeypress="return validateNumbers(event)" />
											</div>
											<div class="form-group col-md-2-1">
											<button class="btn btn-xs btn-primary"
											data-toggle="tooltip" data-placement="right" title="Search "
												onclick="dispIPDDICpatientSearch('IPD_OldPatientDatabase')">
												<i class = "fa fa-search"></i>
												</button>
											</div>

										<div class="divide-20"></div>
			                               <div id="container" class="col-md-12-1"
											style="border: 1px solid #ddd;"></div> 
		
		 									<div class="col-md-12-1"
												style="padding-left:0%; padding-right: 0%;">
												<div id='jqxWidget'>
													<div id="jqxgrid"></div>
														<div id="jqxwindow">
															<div>Find Record</div>
															<div style="overflow: hidden;">
																<div>Find what:</div>
																<div style='margin-top: 5px;'>
																	<input id='inputField' type="text" class="jqx-input"
																		style="width: 200px; height: 23px;" />
																</div>
																<div style="margin-top: 7px; clear: both;">Look in:</div>
																<div style='margin-top: 5px;'>
																	<div id='dropdownlist' style="background: #a4bed4"></div>
																</div>
																<div>
																	<input type="button"
																		style='margin-top: 15px; margin-left: 50px; float: left;'
																		value="Find" id="findButton" /> <input type="button"
																		style='margin-left: 5px; margin-top: 15px; float: left;'
																		value="Clear" id="clearButton" />
																</div>
															</div>
														</div>
													
												</div>
											</div>
									</div>
								</div>
								<!-- End Code for #IPD_ACTIVE_PATIENT GUI -->
								<!-- Start Code for #IPD_PHYSICAL_DISCHARGED_PATIENT GUI -->
									<div id="IPD_PHYSICAL_DISCHARGED_PATIENT" class="tab-pane fade in">
										<div class="divide-20"></div>
										<!-- Page Search Header -->
										<div class="form-group Remove-Padding col-md-10-1"
											style="padding-left: 10px;">
										<!-- Page Search Header -->
											<div style="font-weight: bold;" class="col-md-1-1">Search
												By:</div>			
											<div style="font-weight: bold;" class="col-md-1-1">Patient
												Name</div>			
											<!-- <div class="form-group col-md-2-1" id="divbyNamePHYDIS">
												<input name="byNamePHYDIS" type="text" id="byNamePHYDIS"
													class="typeahead form-control input-SmallText "
													onkeypress="return validatealphabetic(event)" />
											</div> -->		
											<!-- onkeyup="setAutoPatientNameDischargedPat('byNamePHYDIS','onchange')" -->
											<div class="form-group col-md-2-1" id="divbyNamePHYDIS">
													<input type="text"
														id="byNamePHYDIS" class="typeahead form-control input-SmallText"
														maxlength="40" name="byNamePHYDIS">
											</div>
													
											<div style="font-weight: bold;" class="col-md-1-1">OR</div>
											<div style="font-weight: bold;" class="col-md-1-1">Patient
												ID</div>			
											<div class="form-group col-md-2-1">
												<input id="byIdPHYDIS"
													class="form-group form-control input-SmallText" name="byIdPHYDIS"
													type="text" onkeypress="return validateNumbers(event)" />
											</div>
											<div class="form-group col-md-2-1">
											<button class="btn btn-xs btn-primary"
											data-toggle="tooltip" data-placement="right" title="Search "
												onclick="SearchIPDDischargedPatients('IPD_Physically_Discharged_Patient')">
												<i class = "fa fa-search"></i>
												</button>
											</div>

										<div class="divide-20"></div>
			                               <div id="container_PHYDIS" class="col-md-12-1"
											style="border: 1px solid #ddd;"></div> 
		
		 									<div class="col-md-12-1"
												style="padding-left:0%; padding-right: 0%;">
												<div id='jqxWidget_PHYDIS'>
													<div id="jqxgrid_PHYDIS"></div>
														<div id="jqxwindow_PHYDIS">
															<div>Find Record</div>
															<div style="overflow: hidden;">
																<div>Find what:</div>
																<div style='margin-top: 5px;'>
																	<input id='inputField_PHYDIS' type="text" class="jqx-input"
																		style="width: 200px; height: 23px;" />
																</div>
																<div style="margin-top: 7px; clear: both;">Look in:</div>
																<div style='margin-top: 5px;'>
																	<div id='dropdownlist_PHYDIS' style="background: #a4bed4"></div>
																</div>
																<div>
																	<input type="button"
																		style='margin-top: 15px; margin-left: 50px; float: left;'
																		value="Find" id="findButton_PHYDIS" /> <input type="button"
																		style='margin-left: 5px; margin-top: 15px; float: left;'
																		value="Clear" id="clearButton_PHYDIS" />
																</div>
															</div>
														</div>
													
												</div>
											</div>
									</div>
								</div>
								<!-- End Code for #IPD_PHYSICAL_DISCHARGED_PATIENT GUI -->               



							</div>
							<!-- End id="content" -->
						</div> --%>
							<!-- End class="row" -->
						</div>
						<!-- class="container" -->
					</div>
					<!-- id="main-content" -->
				</div>
				<!-- id="outer" -->
				<input type="hidden" id="callfrom" value="block">
				<input type="hidden" id="callfrom1" value="">
				<input id="allBedObj" type="hidden" value="">
				<input id="hallDetailDiv" type="hidden" value="">
				<input id="wardType" type="hidden"  value="wardwise"/>
				
                <div id="divPatId2" style="display: none;"></div>
                <input id="bedIDPop" type="hidden">
                <input type="hidden" id="BedAllocStatus" value="new"
				style="display: none;" />
				<input type="hidden" id="DallocBedId" value="0"
				style="display: none;" />
				<input id="tId" type="hidden">
				
				<div><%@include file="Footer.jsp"%></div>


				<div id="OPDPatientList" style="display: none;"></div>
				<div id="patobject" style="display: none;"></div>
				<div id="patobjectPDP" style="display: none;"></div>
				<div id="hospDetails" style="display: none;"></div>
				<input type="hidden" id="risingFlow" value="<%=risingFlow%>">
		</c:if>
	</section>
</body>
</html>