<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html
	xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>IPD Consent Form</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">


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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>

<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- <script type="text/javascript" src="RichTextBox/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript" src="RichTextBox/tinymce/themes/modern/theme.min.js"></script> -->

<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("ipd_ConsentForm"); //Set current page
		App.init(); //Initialise plugins and elements

		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<style type="text/css">
#already-set ul li a {
	font: normal 11px Arial;
	display: block;
	text-decoration: none;
	line-height: 17px;
}

a.icf {
	background-color: #85a7d4;
	color: white;
	font-weight: bold;
}
</style>

<!-- <script type="text/javascript">
	tinymce
			.init({
				selector : "textarea#editor1",
				theme : "modern",
				width : 920,
				height : 385,
				plugins : [
						"advlist autolink lists charmap print preview hr anchor pagebreak spellchecker",
						"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
						"table contextmenu directionality emoticons template textcolor paste fullpage textcolor" ],

				toolbar1 : "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | searchreplace | bullist numlist | outdent indent blockquote | undo redo | print preview fullscreen  | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons inserttime | ltr rtl | visualchars visualblocks nonbreaking pagebreak restoredraft",

				//	menubar : false,
				menu : {
					file : {
						title : 'File',
						items : 'newdocument | print | fullscreen'
					},
					edit : {
						title : 'Edit',
						items : 'undo redo  | selectall | searchreplace'
					},
					insert : {
						title : 'Insert',
						items : 'charmap'
					},
					format : {
						title : 'Format',
						items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'
					},
					table : {
						title : 'Table',
						items : 'inserttable tableprops deletetable | cell row column'
					}
				},

				toolbar_items_size : 'small',

				style_formats : [ {
					title : 'Bold text',
					inline : 'b'
				}, {
					title : 'Red text',
					inline : 'span',
					styles : {
						color : '#ff0000'
					}
				} ],

				templates : [ {
					title : 'Test template 1',
					content : 'Test 1'
				}, {
					title : 'Test template 2',
					content : 'Test 2'
				} ]
			});
</script> -->

<script type="text/javascript">
	onload = function() {
		var type = $("#callfromipd").val();
		if(type == "PDP"){
			$("#bed").hide();
			
		}
		
		 getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); //Added by sagar 
		 getConsultantDrName(<%=request.getParameter("treatmentId")%>);
		//Added By Pooja
		 getPatientBedHall(<%=request.getParameter("treatmentId")%>);
		 setTimeout(function() {
				//getDoctornameForCommonTemp();   //Added by sagar

				var callFor = ($("#callFor").val()).trim();
				if (callFor === "previousTreatmentIPD") {
					$("#ipdConsentFormJSPHeadDiv *").prop("disabled", true);
					$("#btnSave").prop("disabled", true);

					$("#allConcentFormDiv").prop("disabled", false);
				}
			}, 1000);
			 
		$("#consentform").addClass("anchorActive");
		//fetchTemplateListOt();
		
		//added by vishant
		fetchTemplateListOtByDeptID(<%=request.getParameter("deptId")%>);
		featchAllConsentFormForTreatment();
		
		setCommonPatInfo('ICF');
		fetchHospitalDetailsPrint();
		

		var preTreat = $("#preTreat").val();
		if(preTreat=="Y"){
			$('#tempdissum').removeAttr("class");
            $("#tempdissum").css('display','none');
			$('#bed').removeAttr("class");
            $("#bed").css('display','none');
            $('#autodissum').removeAttr("class");
            $("#autodissum").css('display','none');
            $('#disinv').removeAttr("class");
            $("#disinv").css('display','none');
            $('#ipdDoctorStationJSPHeadDiv').find('input, button, select').attr('disabled', 'disabled');
            $('#date-pick').removeAttr("disabled");
            $('#autodissum').removeAttr("class");
            $("#autodissum").css('display','none');
            $('#pharmacyConsumptionIndent').removeAttr("class");
            $("#pharmacyConsumptionIndent").css('display','none');
     		//$("#ipdDoctorStationJSPHeadDiv *").prop('disabled',true);
     		$('#btnSave').removeAttr("class");
     	   $("#btnSave").css('display','none');
	}

	}
</script>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header_Nobel.jsp"%>
			</header>
			<!--/HEADER -->

			<%
				String moduleName = (String) session.getAttribute("moduleName");
					if (moduleName.equals("ipd")) {
			%>
			<%@include file="left_menu_IPD.jsp"%>
			<%
				} else if (moduleName.equals("opd")) {
			%>
			<%@include file="menu_HelpDesk.jsp"%>
			<%
				} else {
			%>
			<%@include file="left_menu_otmanagement.jsp"%>
			<%
				}
			%>
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
											<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
											<li>Consent Forms/New</li>
											<div class="li pull-right">
												<button class="btn btn-xs btn-success editUserAccess"
												data-toggle="tooltip" data-placement="left" title="Save IPD ConsentForm"
													onclick="saveConsentForm()" name="btnSave" id="btnSave"
													value="Save Now" disabled="disabled">
													<i class = "fa fa-save"></i>
													</button>
													<!-- ADded by Sanjay Kumar Shah , 03-April,2018; for Header and without Header print-->
													<button id="printhfBtn" class="btn btn-xs btn-warning" title="Print with Footer and Header" onclick="ShowPopUpPrintForConsent('printHF')" style="">Print(H/F)</button>
													<button id="printrtBtn" class="btn btn-xs btn-warning" title="Print" onclick="ShowPopUpPrintForConsent('print')" style="">Print</button>

												<button class="btn btn-xs btn-danger"
												data-toggle="tooltip" data-placement="left" title="Discard "
													onclick="refreshTrue();">
													<i class = "fa fa-refresh"></i>
													</button>
											</div>
										</ul>
									</div>
								</div>

								<!-- <div id="commonPatInfo" class="col-md-12-1"
									style="margin-top: -21px;"></div> -->
									
									<div class="alert alert-block alert-info fade in" style="padding-top:3%;margin-top:3%">
						
							<div class="row">
								<div class="col-md-1" style="margin-top:-30px;">
									<img id="patImg" class="img-responsive" src="ehat-design/img/profile/avatar.jpg" alt="">
								</div>

								<div class="col-md-11" style="padding-top:0%">

									<div class="col-md-12">

										<div class="col-md-2">
											<div class="form-group">
											<input type="hidden"  id="pt_Id" value="0">
											<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatmentId")%>">
											<input type="hidden"  id="bill_Id" value="0">
												<label class="control-label lblBold" id="lblCenterPatientId">Patient Id :</label>  
												<label id="patientId" class="control-label" style="display: none;"></label> 
												<label id="centerPatientId" class="control-label"></label> 
											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label id="age" class="control-label"></label>
											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label id="patientName" class="control-label"></label>

											</div>
										</div>
									<% String  departmentId = request.getParameter("deptId");
									  if(departmentId.equalsIgnoreCase("2")){
									%>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
										</div>
									<% } %>	
									
									<% 
									  if(departmentId.equalsIgnoreCase("1")){
									%>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Opd No :</label> <label id="ipdNo" class="control-label"> IPD-D</label>

											</div>
										</div>
									<% } %>	

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">BillNo: </label>  <label id="billNo" class="control-label"></label> 

											</div>
										</div>

										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label id="sex" class="control-label">male</label>

											</div>
										</div>
												<div class="col-md-4">
													<div class="form-group">
														<label class="control-label lblBold">Corporate :</label> <label
															id="corporate" class="control-label"> </label>
													</div>
												</div>

										<div class="col-md-4" >
											<div class="form-group">
												<label class="control-label lblBold">Consulting Dr:</label> <label id="consultingDoctorr" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label> <label id="treatmentId" class="control-label"> <%=request.getParameter("treatmentId")%></label>

											</div>
										</div>
										
										<div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label id="doa" class="control-label"> DOA-D</label>

											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label id="billCategoty" class="control-label"> </label>

											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
                                                 <label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"></label>                                                      
                                             </div>
										</div>
									<% 
									  if(departmentId.equalsIgnoreCase("2")){
									%>			
										<div class="col-md-4">
                                              <div class="form-group">
                                                    <label class="control-label lblBold">Hall(HType):</label> <label id="hallName" class="control-label"></label>   
                                              </div>
                                    	</div>	
                                    	
                                    <% 
									  }
									%>	
									</div>
								</div>
							</div>
						</div>
									
							</div>
							<!-- /Common -->
							<!-- <div style="width: 100%; height: 1%; background-color: #85a7d4;"></div> -->
							<div id="ipdConsentFormJSPHeadDiv"
								style="width: 100%; height: 82%; margin-top: 20px;">
								<div style="width: 100%; margin-left: 0%;">

									<div style="width: 15%; height: 100px;">
										<div
											style="width: 98%; padding-top: 10px; color: #333; background-color: #EEEEEE; padding: 1%; height: 50px;">

											<div
												style="width: 99%; float: left; padding-top: 5px; padding-left: 0px;">
												Template List</div>
											<div style="width: 99%; float: left; padding-left: 5px;">
												<select style="width: 99%;" name="selCustomizeTemp"
													id="selCustomizeTemp" onchange="setCustomizeTemplateipd(this.id)"></select> <input type="hidden"
													id="idTempMast" value="0" name="idTempMast" />
											</div>
										</div>

										<div
											style="width: 98%; padding-top: 10px; color: #333; background-color: #EEEEEE; padding: 1%; margin-top: 10px; height: 400px;">

											<div
												style="width: 99%; float: left; padding-top: 5px; padding-left: 0px;">
												All Form:</div>
											<div id="allConcentFormDiv"
												style="width: 99%; float: left; padding-left: 5px; padding-bottom: 5px; height: 430px; overflow-y: auto;"></div>
										</div>
									</div>
									<div style="width: 85%; margin-top: -98px; margin-left: 180px;">
										<div>
											<!-- <textarea name="content" id="editor1" style="width: 100%; height: 250px;"></textarea> -->
											<textarea class="ckeditor ui-widget-content"
												name="editorSubjective" id="editor1"
												title="Rich Text Editor, editorSubjective"
												placeholder="Content"></textarea>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<%@include file="footer_nobel.jsp"%>

		<div id="allConcentFormTemp" style="display: none;">
			<ul id="already-set" style="padding-left: 10px;">
				{#foreach $T.icfli as icfli}
				<li><a href="#" id="anch{$T.icfli.idicf}"
					onmouseover="this.style.color='black'"
					onmouseout="this.style.backgroundColor='transparent';this.style.color='inherit'"
					onclick="setConsentFormbyIdICF('{$T.icfli.idicf}')">{$T.icfli.dtofin}</a></li>
				{#/for}
			</ul>
		</div>

		<input type="hidden" id="idipdConsentForm" value="0"
			style="display: none;" />
			<input id="callfromipd" type="hidden" name="callfromipd" value="<%=request.getParameter("type")%>"/>
		<div id="patientobject" style="display: none;"></div>
		<div id="hospDetails" style="display: none;"></div>
		<input type="hidden" id="queryTypeicf" value="insert"
			style="display: none;" />
		<div id="customizeTemplateDiv" style="display: none;"></div>
		<div id="allConcentForm" style="display: none;"></div>

		<input type="hidden" id="pageName" value="ipdConsentForm"
			style="display: none;" />

		<!-- For IPD_BedWard -->
		
		<input id="drid" type="hidden"
			value="0"
			style="display: none;" />
		<input id="tid" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="pid" type="hidden"
			value="0" style="display: none;" />
		<input id="treatmentId" type="hidden"
			value="<%=request.getParameter("treatmentId")%>"
			style="display: none;" />
		<input id="bedAllocated" type="hidden"
			value="<%=request.getParameter("bedallocated")%>"
			style="display: none;" />
		<input id="ht" type="hidden" value="<%=request.getParameter("ht")%>"
			style="display: none;" />
		<input id="pattype" type="hidden"
			value="<%=request.getParameter("pattype")%>" style="display: none;" />
		<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>

		<!-- callFor=previousTreatmentIPD -->
		<input id="callFor" type="hidden"
			value="<%=request.getParameter("callFor")%>" style="display: none;" />
		<!-- /callFor=previousTreatmentIPD -->
		<input type="hidden" value="<%=session.getAttribute("preTreat")%>" id="preTreat" />

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>