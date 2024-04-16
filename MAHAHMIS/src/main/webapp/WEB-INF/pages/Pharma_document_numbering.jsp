<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Hat | Pharmacy</title>

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

<link
	href="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">


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
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>

<!-- app_js -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_document_numbering.js"/>"></script>

</head>
<body style="background: white ! important;">
	<section id="page">

		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_masters.jsp"%>

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
											<li>Date : 11 Aug 2014</li>
											<li><i class="fa fa-home"></i> <a href="">Home</a></li>
											<li><a href="#">Pharmacy</a></li>
											<li>Document Numbering</li>
											<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li>
											<li class="pull-right">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="$('#frmDocumentNumbering').submit()">Save</button>
												<button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div id="documentSettingContent"
								style="width: 40%; height: 42%; margin-top: 4%; padding-left: 20px; text-align: left; float: left; border: 1px solid #436a9d;">
								<form:form action="/EhatEnterprise/pharmacy/documentNum/save"
									commandName="documentNumbering" method="post"
									id="frmDocumentNumbering">
									<div class='col-md-12-1 center'>
										<h4>Document Numbering Master</h4>
									</div>
									<div class='divide-20'></div>

									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>
										<div class='col-md-4-1' style='padding-top: 2%;'>Document</div>
										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:select style="width: 79%;" id="listDocument"
												path="documentMaster.docId">

												<option value="0">-Select-</option>
												<c:forEach items="${ltDocumentMaster }" var="row"
													varStatus="count">
													<option value="${row.docId }">${row.docName }</option>
												</c:forEach>
											</form:select>
										</div>
									</div>
									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>
										<div class='col-md-4-1' style='padding-top: 2%;'>Doc
											Series</div>
										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:input id='txtDocSeries' type='text' name='txtDocSeries'
												path="docSeries" maxlength="4" />
												<form:hidden path="docNumId" id="txtDocNumId"/>
										</div>
									</div>
									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>
										<div class='col-md-4-1' style='padding-top: 2%;'>Document
											No</div>
										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:input id='txtDocNo' type='text' name='txtDocNo'
												path="docNo" maxlength="5" onblur="isNumber('txtDocNo',1,5)" />
										</div>
									</div>
									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>
										<div class='col-md-4-1' style='padding-top: 2%;'>Prefix</div>
										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:input id='txtPrefix' type='text' name='txtPrefix'
												path="docPrefix" maxlength="3" />
										</div>
									</div>
									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>
										<div class='col-md-4-1' style='padding-top: 2%;'>Sufix</div>
										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:input id='txtSufix' type='text' name='txtSufix'
												path="docSuffix" maxlength="3" />
										</div>
									</div>


									<div class='form-group Remove-Padding col-md-12-1'>
										<div class='divide-20'></div>

										<div class='col-md-4-1' style='padding-top: 2%;'>Financial
											Year</div>

										<div class='col-md-5-1 center'
											style='padding-top: 2%; color: red;'>
											<form:select style="width: 79%;" id="listFinancialYear"
												path="yearMaster.yearId">
												<option value="0">-Select-</option>
												<c:forEach items="${ltYearMaster }" var="row"
													varStatus="count">
													<option value="${row.yearId }">${row.yearFinancial
														}</option>
												</c:forEach>
											</form:select>
										</div>
									</div>

								</form:form>
							</div>
							<div
								style="width: 55%; margin-left: 3%; float: left; height: 100%;">
								<!-- <div id="SearchHospital" style="width: 100%; padding: 2%;"></div>	 -->
								<div class='divide-20'></div>
								<div class='divide-20'></div>


								<div id="SearchContent" class="col-md-12-1">
									<div class='col-md-3-1'>Search By:</div>
									<div class='col-md-3-1'>Document Name</div>
									<div class='col-md-5-1'>
										<input type="text" id='searchBox' name='searchBox'
											placeholder="Document Name Here"
											class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
											onblur="splitContent($('#searchBox').val())" /> <input
											type="hidden" id="hiddenId" />

									</div>
									<div class='col-md-2-1'>
										<input id='' type='button' value='Search' class='edit'
											onclick='searchDocNum($("#hiddenId").val())' />

										<script type="text/javascript">
											$("#searchBox")
													.autocomplete(
															{
																source : function(
																		request,
																		response) {

																	var findingName = $(
																			"#searchBox")
																			.val();
																	var inputs = [];
																	inputs
																			.push('letter='
																					+ findingName);
																	var str = inputs
																			.join('&');

																	jQuery
																			.ajax({
																				async : true,
																				type : "GET",
																				data : str
																						+ "&reqType=AJAX",
																				url : "/EhatEnterprise/pharmacy/document/autoSuggestionDocumentNames",
																				timeout : 1000 * 60 * 5,
																				catche : false,
																				error : function() {
																					alert('error');
																				},
																				success : function(
																						r) {
																					var availableTags = [];
																					for ( var i = 0; i < r.length; i++) {
																						availableTags[i] = r[i].docName
																								+ "-"
																								+ r[i].docId;
																					}
																					response(availableTags);
																				}
																			});
																}
															});
										</script>
									</div>
								</div>

								<div
									style="width: 100%; overflow-y: scroll; height: 445px; max-height: auto; margin-left: 2%;">

									<table
										class="table table-striped table-bordered header-fixed cf "
										style="Width: 100%; margin-top: 5px;">
										<thead class="cf" style="background: white;">
											<tr>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Document</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Document
														Number</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Financial
														Year</div></th>

												<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
												<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
											</tr>
										</thead>
										<tbody id='documentNumList'>
											<c:forEach items="${ltDocumentNumberingMasters }" var="row"
												varStatus="count">
												<tr>
													<td style='height: 21.5px;' class='numeric'>${count.index+1
														} <input type="hidden" value="${row.docNumId}"
														id="docNumId${row.docNumId}">
													</td>
													<td style='height: 21.5px;' class=''>${row.documentMaster.docName
														}<input type="hidden" value="${row.documentMaster.docId}"
														id="docName${row.docNumId}">
													</td>
													<td style='height: 21.5px;' class=''>${row.docSuffix}${row.docSeries}</td>
													<td style='height: 21.5px;' class=''>${row.yearMaster.yearFinancial
														}<input type="hidden" id="yearFinancial${row.docNumId}"
														value="${row.yearMaster.yearId}">
													</td>
													<td style="text-align: center;"><input type="hidden"
														value="${row.docSeries}" id="docSeries${row.docNumId}">
														<input type="hidden" value="${row.docNo}"
														id="docNo${row.docNumId}"> <input type="hidden"
														value="${row.docPrefix}" id="docPrefix${row.docNumId}">
														<input type="hidden" value="${row.docSuffix}"
														id="docSuffix${row.docNumId}">
														<button style='height: 21.5px; text-align: center;'
															value='EDIT' id='btnEdit${row.docNumId}'
															onclick='edit(${row.docNumId})'>
															<i class='fa fa-edit' class='edit'></i>
														</button></td>
													<td style='height: 21.5px; text-align: center;'>
														<button style='height: 21.5px;' value='DELETE'
															id='btnDelete${row.docNumId}'
															onclick='deleteDocNum(${row.docNumId})'>
															<i class='fa fa-trash-o' class='edit'></i>
														</button>
													</td>
												</tr>
											</c:forEach>
										</tbody>
									</table>

								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="documentListDiv" style="display: none;"></div>


			<%@include file="Pharma_Footer.jsp"%>
		</div>
		

	</section>
</body>
</html>