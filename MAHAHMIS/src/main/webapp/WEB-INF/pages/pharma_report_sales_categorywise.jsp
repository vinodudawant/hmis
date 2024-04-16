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
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">


<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>
	
	
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">
	
<link rel="stylesheet" href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.energyblue.css"/>" type="text/css" />

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
	
</head>
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
	z-index: 10000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

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
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	});

	function loadPopUp() {
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {

			jQuery.ajax({
				async : true,
				type : "POST",
				url : "../report/getAllCategoryWiseSale",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#category_pop_up").show();
					setCategoryGridData(r);

				}
			});
			return true;
		}
		else
		{
			alertify.error('Please Fill All the Details');
		}	

	}
	
	function setCategoryGridData(result)
	{
		var data = result;
	    // prepare the data
	    var source =
	    {
	        datatype: "json",
	        datafields: [
	            { name: 'catId', type: 'string'},
	            { name: 'catName', type: 'string'},
	         ],
	        localdata: data
	    };
	    
	   /*  var columnrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
	    	 calculateTotalAmount(value);
	         $("#totalAmount").val(total.toFixed(2));
	    }; */
	    
	    
		
	    var dataAdapter = new $.jqx.dataAdapter(source, {
	        downloadComplete: function (data, status, xhr) { },
	        loadComplete: function (data) { },
	        loadError: function (xhr, status, error) { }
	    });
	    $("#categoryData").jqxGrid(
	    {
	        width: 250,
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
                var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>");
                var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
                var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
                var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
                
                container.append(reloadButton);
                container.append(searchButton);
                statusbar.append(container);
                addButton.jqxButton({  width: 60, height: 20 });
                deleteButton.jqxButton({  width: 65, height: 20 });
                reloadButton.jqxButton({  width: 65, height: 20 });
                searchButton.jqxButton({  width: 50, height: 20 });
                // add new row.
                addButton.click(function (event) {
                    var datarow = generatedata(1);
                    $("#jqxgrid").jqxGrid('addrow', null, datarow[0]);
                });
                // delete selected row.
                deleteButton.click(function (event) {
                    var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
                    var rowscount = $("#categoryData").jqxGrid('getdatainformation').rowscount;
                    var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
                    $("#jqxgrid").jqxGrid('deleterow', id);
                });
                // reload grid data.
                reloadButton.click(function (event) {
                    $("#categoryData").jqxGrid({ source: dataAdapter });
                });
                // search for a record.
                searchButton.click(function (event) {
                    var offset = $("#categoryData").offset();
                    $("#jqxwindow").jqxWindow('open');
                    $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 30);
                });
            },
	        columns: [
	            { text: 'Category Id', datafield: 'catId', hidden: true},
	            { text: 'Category Name', datafield: 'catName',width: 250},
	        ],
	        
	    });
	    $("#categoryData").bind('rowselect', function (event) {
	        var row = event.args.rowindex;
	        var datarow = $("#categoryData").jqxGrid('getrowdata', row);
	        
	        getSaleDataByCatId(datarow['catId']);
	    });
	    
	    $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
        // create find and clear buttons.
        $("#findButton").jqxButton({ width: 70});
        $("#clearButton").jqxButton({ width: 70});
        // create dropdownlist.
        $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
            source: [
                'Category Name'
            ]
        });
        if (theme != "") {
            $("#inputField").addClass('jqx-input-' + theme);
        }
        // clear filters.
        $("#clearButton").click(function () {
            $("#categoryData").jqxGrid('clearfilters');
        });
        // find records that match a criteria.
        $("#findButton").click(function () {
            $("#categoryData").jqxGrid('clearfilters');
            var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
            var datafield = "";
            switch (searchColumnIndex) {
                case 0:
                    datafield = "catName";
                    break;
                case 1:
                    datafield = "catName";
                    break;
                case 2:
                    datafield = "catName";
                    break;
                case 3:
                    datafield = "quantity";
                    break;
                case 4:
                    datafield = "price";
                    break;
            }
            var searchText = $("#inputField").val();
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 1;
            var filtervalue = searchText;
            var filtercondition = 'contains';
            var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
            $("#categoryData").jqxGrid('addfilter', datafield, filtergroup);
            // apply the filters.
            $("#categoryData").jqxGrid('applyfilters');
        });
    }
	
	
	function getSaleDataByCatId(value)
	{
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		var catId = value;

		/* var indentId = indentId; */
		if (catId != '') {
			var inputs = [];
			inputs.push('catId=' + catId);
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/report/getCategoryWiseSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setPartyWiseSaleResult(r);
				}
			});
			return true;
		}
	}

	function setPartyResult(result) {
		var r = result;
		var divContent = "";

		divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1><tr><th>Select</th><th>Vendor Name</th></tr>";
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent
					+ "<tr><td><input type='radio' value='" + r[i].catId + "' name='row'></td><td id=vendorName"+r[i].catId+">"
					+ r[i].catName + "</td></tr>";
					
		}
		divContent = divContent
				+ "</table>"

				+ "<button style='margin-left:5%;' onclick='getProductSaleDataByBatchId()' id='getIndentData' type='button' class='btn btn-xs btn-success'>Get Data</button></div>";

		$("#partyData").html(divContent);
	}

	function getProductSaleDataByBatchId() {
		/*var indentId = $('#selectIndentId').val();*/
		
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		var vendorId = $("input[name=row]:checked").val();

		/* var indentId = indentId; */
		if (vendorId != '' && vendorId.length > 0) {
			var inputs = [];
			inputs.push('vendorId=' + vendorId);
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/report/getPartyWiseProductSaleList",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {

					setPartyWiseSaleResult(r);

				}
			});
			return true;
		}
	}

	function getCategoryWiseSaleData() {
		/*var indentId = $('#selectIndentId').val();*/
		
		var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
		
		var datarow = $("#categoryData").jqxGrid('getrowdata', selectedrowindex);
		
		var catId = datarow['catId'];
		var catName = datarow['catName'];

		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var totalAmount = $("#totalAmount").val();

		/* var indentId = indentId; */
		
			var inputs = [];
		
			inputs.push('catId=' + catId);
			inputs.push('catName=' + catName);
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('totalAmount=' + totalAmount);

			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getCategoryWiseSaleReport",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							alert("report generated succesfully");
							setResult(r);

						}
					});
			return true;
		
	}

	function setResult(result) {
		var splitResult = result.split('$');
		$('#setButtons')
				.html(
						"<button onclick='getCategoryWiseSaleData()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hidePopUp()' data-dismiss='modal'>Close</button>");
	}

	function setPartyWiseSaleResult(result) {
		var r = result;
		var divContent = "";
		
		total=0;

		if (r.length > 0) {
			divContent = divContent + "";
			for ( var i = 0; i < r.length; i++) {
				divContent = divContent + "<tr><td>" + r[i].vouNo + "</td><td>"
						+ r[i].type + "</td>"
						+ "<td>" + r[i].patientName
						+ "</td><td>"+r[i].productName+"</td> <td>"+r[i].qty+"</td><td>"+r[i].rate+"</td> <td>"+r[i].amount+"</td></tr>";
						
				calculateTotalAmount(r[i].amount);
			}
			divContent = divContent + "";
		} else {
			divContent = divContent + "<b><center>No Record Found</center></b>";
		}
		$("#totalAmount").val(total.toFixed(2));
		$("#batchWiseProductData").html(divContent);
	}
	
	function calculateTotalAmount(amount) {

		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			total = total + parseFloat(amount);
		}
	}

	function setValuesToAutocomplete(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#txtProductName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				alert('error' + error);
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].productName + '_' + r[i].productId
							+ '-' + r[i].productUnit + '-'
							+ r[i].packingMaster.packType + '-'
							+ r[i].companyMaster.compName + '-'
							+ r[i].shelfMaster.shelfName;
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$(".typeahead1").html(template);
				$(".typeahead1").show();

				setTimeout(function() {
					$('#txtProductName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#txtProductName").data('typeahead').source = resultData;
				}, 500);
			}
		});
	}
	
	function hidePopUp()
	{
		$('#category_pop_up').hide();
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);

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

			<%@include file="Pharma_left_menu_reports.jsp"%>
			<%@include file="pharma_report_sales_category_pop_up.jsp"%>

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
											<li>CategoryWise Sale Report</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <li class="pull-right" id="template">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getPharmacyCompanyWiseProductReport()">Get
													Product Report</button> <button class="btn btn-xs btn-danger">Discard</button>
											</li> -->
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>

							
							<div class="divide-20"></div>
							<div class="col-md-12-1">


								<div class="col-md-12-1">


									<div id="companyReport" class="col-md-5-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">CategoryWise Sale Report</h4>
										</div>

										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<!-- <input type="text" class="form-control input-SmallText"
													placeholder="From Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3"> -->
												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-6-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div style="margin-top: 9px;" class="col-md-4-1">
												<B></B>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<button class="btn btn-xs btn-success" type="button"
													id="getIndentData" onclick="loadPopUp()"
													style="margin-left: 5%;">Get Data</button>
											</div>

										</div>
									</div>

									<div class="col-md-1-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

									<div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>CategoryWise Sale Report	</h4>
												<div class="tools">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
													<a href="javascript:;" class="collapse"> <i
														class="fa fa-chevron-up"></i>
													</a> <a href="javascript:;" class="remove"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body " id='well'
												style="height: 350px; overflow-y: Scroll; width: 100%;">

												<div class="col-md-12-1"
													style="border: 2px solid;" id="reportList">
													<div class="col-md-12-1 center"
														style="margin-bottom: 10px;">
														
													</div>
													<div class="col-md-12-1"
														style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
														<table border='1'
															class="table table-striped table-bordered header-fixed cf "
															style="Width: 100%; margin-top: 5px;">
															<thead class="cf" style="background: white;">
																<tr>
																	<th>File Id</th>
																	<th>File Name</th>
																	<th>Date</th>
																</tr>
															</thead>
															<tbody>
																<%
																	File folder = new File(
																			request.getRealPath("/ehat_Reports/Pharmacy/Sales/categorysale/"));
																	File[] listOfFiles = folder.listFiles();

																	if (listOfFiles != null) {
																		for (int i = 0; i < listOfFiles.length; i++) {
																%>
																<tr>
																	<td><%=i + 1%></td>
																	<td>
																		<%
																			if (listOfFiles[i].isFile()) {
																		%> <a
																		href='/EhatEnterprise/ehat_Reports/Pharmacy/Sales/categorysale/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
																	</td>
																	<td>
																		<%
																			SimpleDateFormat sdf = new SimpleDateFormat(
																								"dd/MM/yyyy HH:mm:ss");

																						/* System.out.println("After Format : " + sdf.format(listOfFiles[i].lastModified())); */
																		%> <%=sdf.format(listOfFiles[i].lastModified())%>
																	</td>
																</tr>
																<%
																	}
																		}
																	}
																%>
															</tbody>
														</table>
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
