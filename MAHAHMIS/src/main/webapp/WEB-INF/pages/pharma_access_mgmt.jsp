<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>


<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.energyblue.css"/>"
	type="text/css" />

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>



<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
	
	
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 199000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/MAHAHMIS/pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}


.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}







</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
/* .ajaxmodal {
	display: none;
	position: fixed;
	z-index: 199000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
	
		url('/MAHAHMIS/pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
} */

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		getUserList();
		getUserModules();
	});

	jQuery(document).ajaxStart(function() {
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
	});

	var total = 0;

	function getCounterSaleData(result) {
     	   data=result;
		   var url = "../../pharmacy/company/companyList";
           var source =
           {
               datafields: [
                   { name: 'f_name' },
                   { name: 'user_Type' },
                   { name: 'user_ID' }
               ],
               id: 'user_ID',
               datatype: "json",
               localdata : data,
               async: false,
               type: 'GET'
           };
           var employeesAdapter = new $.jqx.dataAdapter(source);
           var orderdetailsurl = "../../pharmacy/access/getUserAccessModuleList";
           var ordersSource =
           {
               datafields: [
				   { name: 'userId' , type: 'string' },
                   { name: 'moduleName', type: 'string' },
                   { name: 'deleteFlag', type: 'string' },
                   { name: 'userAccessId', type: 'string' }
                   
               ],
               datatype: "json",
               url: orderdetailsurl,
               async: false,
               type: 'GET'
           };
           var ordersDataAdapter = new $.jqx.dataAdapter(ordersSource, { autoBind: true });
           orders = ordersDataAdapter.records;
           var nestedGrids = new Array();
           // create nested grid.
           var initrowdetails = function (index, parentElement, gridElement, record) {
               var id = record.uid.toString();
               var grid = $($(parentElement).children()[0]);
               nestedGrids[index] = grid;
               var filtergroup = new $.jqx.filter();
               var filter_or_operator = 1;
               var filtervalue = id;
               var filtercondition = 'equal';
               var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
               // fill the orders depending on the id.
               var ordersbyid = [];
               for (var m = 0; m < orders.length; m++) {
                   var result = filter.evaluate(orders[m]["userId"]);
                   if (result)
                       ordersbyid.push(orders[m]);
               }
               var orderssource = { datafields: [
                   { name: 'userId', type: 'string' },
                   { name: 'moduleName', type: 'string' },
                   { name: 'deleteFlag', type: 'string' },
                   { name: 'userAccessId', type: 'string' }
               ],
                   id: 'userId',
                   localdata: ordersbyid
               }
               var nestedGridAdapter = new $.jqx.dataAdapter(orderssource);
               if (grid != null) {
            	   
            	   var setStatus= function (row, column, value) {
            		   if(value==0)
            			{
            			   return 'Active';
            			} 
            		   else
            			 {
            			   return 'Deactive';
            			 }  
                  }
            	   
            	   var changeInnerStatus= function (row, column, value) {
               		return '<a onclick="editAccessModule('+value+')" style="margin-top:2px;margin-left:10px;" class="btn btn-xs btn-success center" id="btnPrint"><i class="fa fa-edit"></i> </a>';
                  }
            	   
                  var changeModuleName= function (row, column, value) {
                	  
                	  if(value=='mrn/view-frm')
                 		return 'mrn';
                	  else if (value=='mrn/view.htm')
                		  return 'Issue Mrn';
                	  else if (value=='po')
                		  return 'daywisePo';
                	  else
                		  return value;
                    }
                  
                   grid.jqxGrid({
                       source: nestedGridAdapter, width: 350, height: 200,theme: 'energyblue',
                       columns: [
                         { text: 'User Id', datafield: 'userId', width: 50 },
                         { text: 'Module Name', datafield: 'moduleName', width: 200,cellsrenderer: changeModuleName },
                         { text: 'Active/Deactive', datafield: 'deleteFlag', width: 100 , cellsrenderer: setStatus},
                         {text: 'Active', datafield: 'userAccessId', width: 50 , cellsrenderer: changeInnerStatus},
                      ]
                   });
                   
                  
               }
               grid.on("rowclick", function (event) {
                  /*  var args = event.args;
                   var rowindex = args.rowindex; */
               });
           }
           var renderer = function (row, column, value) {
               return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
           }
           
           var deleterenderer= function (row, column, value) {
        		return '<a onclick="editAccessModule('+value+')" style="margin-top:10px;margin-left:10px;" class="btn btn-xs btn-danger center" id="btnPrint"><i class="fa fa-edit"></i> </a>';
           }

           // creage jqxgrid
           $("#jqxgrid").jqxGrid(
           {
               width: 500,
               height: 365,
               source: source,
               rowdetails: true,
               rowsheight: 35,
               theme: 'energyblue',
               showstatusbar : true,
               initrowdetails: initrowdetails,
               rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true },
               renderstatusbar : function(statusbar) {
       			// appends buttons to the status bar.
       			var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
       			var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>");
       			var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
       			var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
       			var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
       			container.append(addButton);
       			container.append(deleteButton);
       			container.append(reloadButton);
       			container.append(searchButton);
       			statusbar.append(container);
       			addButton.jqxButton({
       				width : 60,
       				height : 20
       			});
       			deleteButton.jqxButton({
       				width : 65,
       				height : 20
       			});
       			reloadButton.jqxButton({
       				width : 65,
       				height : 20
       			});
       			searchButton.jqxButton({
       				width : 50,
       				height : 20
       			});
       			// add new row.
       			addButton.click(function(event) {
       				var datarow = generatedata(1);
       				$("#jqxgrid").jqxGrid('addrow', null,
       						datarow[0]);
       			});
       			// delete selected row.
       			deleteButton.click(function(event) {
       				var selectedrowindex = $("#jqxgrid")
       						.jqxGrid('getselectedrowindex');
       				var rowscount = $("#jqxgrid").jqxGrid(
       						'getdatainformation').rowscount;
       				var id = $("#jqxgrid").jqxGrid('getrowid',
       						selectedrowindex);
       				$("#jqxgrid").jqxGrid('deleterow', id);
       			});
       			// reload grid data.
       			reloadButton.click(function(event) {
       				$("#jqxgrid").jqxGrid({
       					source : dataAdapter
       				});
       			});
       			// search for a record.
       			searchButton.click(function(event) {
       				var offset = $("#jqxgrid").offset();
       				$("#jqxwindow").jqxWindow('open');
       				$("#jqxwindow").jqxWindow('move',
       						offset.left + 30, offset.top + 30);
       			});
       		},
               columns: [
                     { text: 'User Name', datafield: 'f_name', width: 200, cellsrenderer: renderer },
                     { text: 'User Type', datafield: 'user_Type', width: 150, cellsrenderer: renderer },
                     { text: 'Edit', datafield: 'user_ID', width: 150, cellsrenderer: deleterenderer },
                 ]
           });
           
           $("#jqxwindow").jqxWindow({
       		resizable : false,
       		autoOpen : false,
       		width : 210,
       		height : 180
       	});
       	// create find and clear buttons.
       	$("#findButton").jqxButton({
       		width : 70
       	});
       	$("#clearButton").jqxButton({
       		width : 70
       	});
       	$("#dropdownlist").jqxDropDownList({
    		autoDropDownHeight : true,
    		selectedIndex : 0,
    		width : 200,
    		height : 23,
    		source : [ 'User Name' ]
    	});
       	
       	if (theme != "") {
    		$("#inputField").addClass('jqx-input-' + theme);
    	}
    	// clear filters.
    	$("#clearButton").click(function() {
    		$("#jqxgrid").jqxGrid('clearfilters');
    	});
    	// find records that match a criteria.
    	$("#findButton").click(
    			function() {
    				$("#jqxgrid").jqxGrid('clearfilters');
    				var searchColumnIndex = $("#dropdownlist").jqxDropDownList(
    						'selectedIndex');
    				var datafield = "";
    				switch (searchColumnIndex) {
    				case 0:
    					datafield = "f_name";
    					break;
    				}
    				var searchText = $("#inputField").val();
    				var filtergroup = new $.jqx.filter();
    				var filter_or_operator = 1;
    				var filtervalue = searchText;
    				var filtercondition = 'contains';
    				var filter = filtergroup.createfilter('stringfilter',
    						filtervalue, filtercondition);
    				filtergroup.addfilter(filter_or_operator, filter);
    				$("#jqxgrid").jqxGrid('addfilter', datafield,
    						filtergroup);
    				// apply the filters.
    				$("#jqxgrid").jqxGrid('applyfilters');
    			});
	}
	
	function editAccessModule(value)
	{
		getUserModules();
		$('#users').attr('disabled', true);
		var userId=value;
		var inputs = [];
		
		$("#users").val(value);

		inputs.push('userId=' + userId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/access/getUserAccessDetailsById",
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				/* deSelectOptions('selectUserModule'); */
				setEditAccessDetails(r);
			}
		});
	}
	
	function setEditAccessDetails(r)
	{
		alertify.success("Editing Access!");
		var n = 1;
		
		var jsonData=jQuery.parseJSON(r);
		
		setTimeout(function() {
			for(var i=0;i<jsonData.length;i++)
			{
					$("#selectUserModule option[value='" + jsonData[i].moduleId + "']").attr({
						"selected" : "selected"
					});
			}
		}, 100);
		
		
	}
	
	/* function deSelectOptions(selectBox) {
		var elements = document.getElementById(selectBox).options;
		for ( var i = 0; i < elements.length; i++) {
			elements[i].selected = false;
		}
	} */
	
	function saveUserAccessData()
	{
		var result=$("#selectUserModule").val();
		var userId=$("#users").val();
		
		var inputs = [];

		inputs.push('userId=' + userId);
		inputs.push('userModules=' + result);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/access/saveModules",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				 alert("Record Saved Successfully!");
				//location.reload(true);
			}
		});
	}
	
	
	function getUserModules()
	
	{
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/access/getUserModules",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				var divContent="<select id='selectUserModule' multiple style='width:100%' size='8'>";
				for(var i=0;i<r.length;i++)
				{
					if(r[i].moduleName=='po')
					{
						divContent=divContent+'<option value='+r[i].moduleId+'>daywisePo</option>';
					}
					else if(r[i].moduleName=='mrn/view-frm')
					{
						divContent=divContent+'<option value='+r[i].moduleId+'>mrn</option>';
					}
					else if(r[i].moduleName=='mrn/view.htm')
					{
						divContent=divContent+'<option value='+r[i].moduleId+'>Issue Mrn</option>';
					}
					else
					{
						divContent=divContent+'<option value='+r[i].moduleId+'>'+r[i].moduleName+'</option>';
					}	
					
				}	
				
				divContent=divContent+"</select>";
				
				
				$("#userModules").html(divContent);

			}
		});
	}

	function getUserList() {
		//var inputs = [];
		//inputs.push('action=fetchUser');
	//inputs.push('callFrom=' + "UserManagement");
	   var inputs = [];
	  // inputs.push('startIndex=' + 1);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					//data : str + "&reqType=AJAX",
				    //url : "../../ehat/users/getUsersList",
					url : "../../ehat/users/getUsersListpharmacy",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						//var result = jQuery.parseJSON(r);

						var divContent = "";
						divContent = divContent
								+ "<select id='users' name='users' class='col-md-12-1' >";
						for ( var i = 0; i < r.length; i++) {
							divContent = divContent
									+ "<option value='"+r[i].user_ID+"'>"
									+ r[i].f_name + " "
									+ r[i].m_name + " "
									+ r[i].l_name + "</option>";
						}
						divContent = divContent + "</select>";
						$("#userData").html(divContent);
						$("#userData").show('show');
						
						getCounterSaleData(r);
					}
				});

	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>

<body style="background: white ! important;">
	<section id="page">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_masters.jsp"%>
			<%@include file="pharma_report_sales_userwise_daily_sale_pop_up.jsp"%>


			<!-- 			content -->

			<input type="hidden" id="userID" />
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Acces MGMT</li>
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>

							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="divide-20"></div>
							<div class="col-md-12-1">


								<div class="col-md-12-1">


									<div id="companyReport" class="col-md-5-1" style="">

										<!-- Modal Code  -->

										<div class="box border gray">
											<div class="box-title">
												<h4>
													<i class="fa fa-user"></i>Acces MGMT
												</h4>
												<div class="tools">
													<a class="config" data-toggle="modal" href="#box-config">
														<i class="fa fa-cog"></i>
													</a> <a class="reload" href="javascript:;"> <i
														class="fa fa-refresh"></i>
													</a> <a class="collapse" href="javascript:;"> <i
														class="fa fa-chevron-up"></i>
													</a> <a class="remove" href="javascript:;"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body">
												<div class="alert alert-block alert-info fade in">

													<div class='row'>

														<div class="col-md-4-1" style="margin-top: 9px;"></div>
														<div class="col-md-6-1" style="margin-top: 9px;">
															<img src='../../images/patientPhoto.jpg'
																class="img-responsive">
														</div>


													</div>

													<div class="row">
														<div class="col-md-4" style="margin-top: 9px;">
															<b>User:</b>
														</div>
														<div class="col-md-6-1" style="margin-top: 9px;"
															id="userData"></div>
													</div>

													<div class="row"
														style="margin-top: 0px; margin-bottom: 10px">

														<div class="col-md-4" style="margin-top: 9px;">
															<b>Modules:</b>
														</div>
														<div class="col-md-6-1" style="margin-top: 9px;"
															id='userModules'></div>
													</div>

													<div class="row"
														style="margin-top: 0px; margin-bottom: 10px">
														<div style="margin-top: 9px;" class="col-md-4-1">
															<B></B>
														</div>
														<div style="margin-top: 9px;" class="col-md-6-1">
															<button class="btn btn-xs btn-success" type="button"
																id="getIndentData" onclick="saveUserAccessData()"
																style="margin-left: 5%;">Save</button>
														</div>

													</div>
												</div>

											</div>
										</div>
									</div>

									<div class="col-md-7-1"
										style="padding-left: 1%; padding-right: 0%;">
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
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>
