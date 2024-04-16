<input type="hidden" id="callFromVal" value=<%=request.getParameter("callFromVal")%> >

<script type="text/javascript">
	$(function() {
		$("#ehat_module_4").addClass("menuActive");
		
	});

	function viewBedWardIPD() {    //added by sagar

		//var ajaxResponse = $("#divPatId").html();
		/* var myArray = JSON.parse(ajaxResponse);
		var myObj = myArray;
		// var trid = myObj.trid;
		myObj = JSON.stringify(myObj);
 */	
 		//var deptid = $("#deptid").val();
		//var patientId = $("#pid").val();
 
		var treatmentId = $("#tr_Id").val();
		/* var bedAllocated = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		var pageIncludeType = 'IPD';
		var callFor = $("#callFor").val();
		var drid = $("#drid").val(); */

		//alert("patientId==>" + patientId + "  treatmentId==>" + treatmentId + "  bedAllocated==>" + bedAllocated +"  ht==>" + ht + "  pattype==>"+pattype);

		 window.location.href = "IPD_BedWard.jsp?"  
				+ "treatmentId=" + treatmentId /* + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType +"&drid=" + drid+ "&callFor=" + callFor */;  
		
				/* var patientId = $("#pid").val();
				var treatmentId = $("#tid").val();
						
				
		 window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
			+ "&treatmentId=" + treatmentId ;
				 */
				
	};

	function viewNursingStation() {

		// ajaxResponse = $("#divPatId").html();
		/* var myArray = JSON.parse(ajaxResponse);
		var myObj = myArray;
		var treStart = myObj.objTreat.treStart;
		var trid = myObj.trid;
		myObj = JSON.stringify(myObj); */

		//var patientId = $("#pid").val();
		var treatmentId = $("#tr_Id").val();
		var prevtr =$("#prevtr").val();
		/* var bedAllocated = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		var pageIncludeType = 'IPD';
		var callFor = $("#callFor").val();
		var type = $("#callfromipd").val();
		var drid = $("#drid").val(); */

		var callFromVal =$("#callFromVal").val();

		//alert("patientId==>" + patientId + "  treatmentId==>" + treatmentId + "  bedAllocated==>" + bedAllocated +"  ht==>" + ht + "  pattype==>"+pattype);
        
		window.location.href = "IPD_NursingStation.jsp?"    + "treatmentId="
				+ treatmentId + "&callFromVal=" + callFromVal /* + "&bedallocated=" + bedAllocated + "&ht=" + ht
				+ "&pattype=" + pattype + "&pageIncludeType=" + pageIncludeType
				+ "&type=" + type + "&drid=" + drid + "&callFor=" + callFor */; 
				
				
		/* var patientId = $("#pid").val();
		var treatmentId = $("#tid").val();	
				
		window.location.href = "IPD_NursingStation.jsp?" + "patientId=" + patientId + "&treatmentId="
		+ treatmentId;
				 */
				
				
				

	};

	function viewBedShift(treatment_id,patientId) {

		//ajaxResponse = $("#divPatId").html();
		/* var myArray = JSON.parse(ajaxResponse);
		var myObj = myArray;
		var treStart = myObj.objTreat.treStart;
		var trid = myObj.trid;
		myObj = JSON.stringify(myObj); */

		var phyDisFlag = $("#phyDisFlag").val();

		if(phyDisFlag=="Y"){
			return false;
		}

		//var patientId = $("#pid").val();
		var treatmentId = $("#treatId").val();
		var patientId = $("#pt_Id").val();
		/*  
		var bedAllocated = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		var pageIncludeType = 'IPD';
		var callFor = $("#callFor").val();
		var type = $("#callfromipd").val();
		var drid = $("#drid").val();
		var deptid = $("#deptid").val(); */
 
		window.location.href = "ipd_bed_allocation.jsp?"  + "treatId="
				+ treatmentId +"&callFrom='shiftBed'" ;
				//+ treatmentId +"&callfrom=shiftBed="+patientId ;

		/* window.location.href ="ipd_bed_allocation.jsp?"  + "treatId="
		+ treatment_id +"&callfrom='shiftBed'="+patientId ; */
		/* + "&bedallocated=" + bedAllocated + "&ht=" + ht
				+ "&pattype=" + pattype + "&pageIncludeType=" + pageIncludeType
				+ "&type=" + type +"&drid="+drid+"&callFor=" + callFor */
				
		
				/* 
				var patientId = $("#pid").val();
				var treatmentId = $("#tid").val();
				
				
		window.location.href = "IPD_CoverSheet.jsp?" +"patientId=" + patientId + "&treatmentId="
		+ treatmentId ;		
				
				
				 */
				
				

	};

	function viewCoverSheetIPD() {

		//ajaxResponse = $("#divPatId").html();
		/* var myArray = JSON.parse(ajaxResponse);
		var myObj = myArray;
		var treStart = myObj.objTreat.treStart;
		var trid = myObj.trid;
		myObj = JSON.stringify(myObj); */

		//var patientId = $("#pid").val();
		var treatmentId = $("#tr_Id").val();
		var patientId = $("#pt_Id").val();
		/*  
		var bedAllocated = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		var pageIncludeType = 'IPD';
		var callFor = $("#callFor").val();
		var type = $("#callfromipd").val();
		var drid = $("#drid").val();
		var deptid = $("#deptid").val(); */
 
		window.location.href = "IPD_CoverSheet2.jsp?"  + "tid="
				+ treatmentId +"&callfrom=IPDID&pid="+patientId ;/* + "&bedallocated=" + bedAllocated + "&ht=" + ht
				+ "&pattype=" + pattype + "&pageIncludeType=" + pageIncludeType
				+ "&type=" + type +"&drid="+drid+"&callFor=" + callFor */
				
		
				/* 
				var patientId = $("#pid").val();
				var treatmentId = $("#tid").val();
				
				
		window.location.href = "IPD_CoverSheet.jsp?" +"patientId=" + patientId + "&treatmentId="
		+ treatmentId ;		
				
				
				 */
				
				

	};
	
	 
	
	function viewDashboardNursingStation() { //Added by Sagar

		// ajaxResponse = $("#divPatId").html();
		/* var myArray = JSON.parse(ajaxResponse);
		var myObj = myArray;
		var treStart = myObj.objTreat.treStart;
		var trid = myObj.trid;
		myObj = JSON.stringify(myObj); */

		//var patientId = $("#pid").val();
		var treatmentId = $("#tr_Id").val();
		/* var bedAllocated = $("#bedAllocated").val();
		var ht = $("#ht").val();
		var pattype = $("#pattype").val();
		var pageIncludeType = 'IPD';
		var callFor = $("#callFor").val();
		var type = $("#callfromipd").val();
		var drid = $("#drid").val(); */

		//alert("patientId==>" + patientId + "  treatmentId==>" + treatmentId + "  bedAllocated==>" + bedAllocated +"  ht==>" + ht + "  pattype==>"+pattype);

		window.location.href = "dashboard_NursingStation.jsp?"    + "&treatmentId="+treatmentId;
				/* + treatmentId + "&bedallocated=" + bedAllocated + "&ht=" + ht
				+ "&pattype=" + pattype + "&pageIncludeType=" + pageIncludeType
				+"&type=" + type +"&drid=" + drid +"&callFor=" + callFor */
 
 
/*  var patientId = $("#pid").val();								
var treatmentId = $("#treatmentId").val();
 
		window.location.href = "dashboard_NursingStation.jsp?" + "patientId=" + patientId + "&treatmentId="
		+ treatmentId ;
  */
 
	};

	function viewDischargePlanIPD(){
		var treatmentId = $("#tr_Id").val();
		window.location.href = "ipdDischarge_Plan.jsp?"  + "&treatmentId=" + treatmentId ;

		
	}

	function viewDischargeProcessIPD(){

		var treatmentId = $("#tr_Id").val();
		window.location.href = "ipdDischarge_Process.jsp?"  + "&treatmentId=" + treatmentId ;
		
	}

	function viewDischargeNoteIPD(){

		var treatmentId = $("#tr_Id").val();
		window.location.href = "IPD_DischargeNote.jsp?"  + "&treatmentId=" + treatmentId ;
	}

	function viewDischargeSummaryIPD(){

		var treatmentId = $("#tr_Id").val();
		window.location.href = "IPD_DischargeAutoSummary2.jsp?"  + "&treatmentId=" + treatmentId ;
		
	}
	
	function viewDRRIPD(){
		var treatmentId = $("#tr_Id").val();
		var pid= $("#pt_Id").val(); 
		window.location.href = "IPD_DoctorStation2.jsp?"  + "&tid=" + treatmentId +"&callfrom=IPDID&pid="+pid ;
		
	}

	function viewNewConsentForm(){

		var treatmentId = $("#tr_Id").val();
		var pid = $("#pt_Id").val();
		window.location.href = "databaseForConsentFormIPD.jsp?"  + "&treatmentId=" + treatmentId +"&callfrom=IPDID&pid="+pid;
		
	}

	function viewPreviousConsentForm(){

		var treatmentId = $("#tr_Id").val();
		var pid = $("#pt_Id").val();
		window.location.href = "prev_databaseForConsentFormIPD.jsp?"  + "&treatmentId=" + treatmentId +"&callfrom=IPDID&pid="+pid;
		
	}

	function hideBedLeftMenu() {

		var leftBed = $("#callFromVal").val();
		if(leftBed == "previousPatient"){
			
			$("#leftBed").hide();
		}else{

			$("#leftBed").show(); 
		}
	}

	jQuery(document).ready(function() {
		hideBedLeftMenu();
	});
	
</script>

<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">

		<div class="sidebar-menu nav-collapse">

			<ul>

				<!-- <li id="bedState"><a href="IpdBedState.jsp">Bed State </a></li> -->

				<li id="viedat" class="TextFont ehatSubModule ehat_subModule_" ><a
					href="ipd_patient.jsp">
					<span class="fa-stack fa-fw">
  					<i class="fa fa-heart-o fa-stack-1x"></i>
  					<i class="fa fa-rub fa-stack-1x"></i></span>
  					<span class="menu-text">IPD Patient</span>
					
					</a></li>


				<li id="coversheet" class="TextFont ehatSubModule ehat_subModule_" ><a href="#"
					onclick="viewCoverSheetIPD()"><i class="fa fa-table fa-fw"></i>
						<span class="menu-text">Cover Sheet</span> </a></li>

				<!-- 	<li id="bed" class="TextFont ehatSubModule ehat_subModule_224" style="display:none;"><a href="#" onclick="viewBedWardIPD()">
				<i class="fa fa-fw"><img alt="" height="10px;" width="17px;" src="images/bedOcc.png"></i>
				<span class="menu-text">Bed</span></a></li>
				 -->
				 
				 <li id="leftBed" class="TextFont ehatSubModule" style="display: none;"><a href="#"
					onclick="viewBedShift()"><i class="fa fa-table fa-fw"></i>
						<span class="menu-text">Bed</span> </a></li>

				<li id="DoctorStation" class="TextFont ehatSubModule ehat_subModule_" ><a href="#"
					onclick="viewDRRIPD()">
					<i class="fa fa-stethoscope fa-fw"></i>
						<span class="menu-text">Doctor Station</span></a></li>
						
						

				<!-- 
			<li id="" class="TextFont has-sub"><a href="#"><span
					class="menu-text">Nursing Station</span><span class="arrow"></span></a>
				<ul class="sub">
					<li id="nurcha" class="TextFont"><a class="" href="#"
						onclick="viewDIC()"><span class="sub-menu-text" id="nurcha1">Nursing
								Chart</span></a></li>
					<li id="matuse" class="TextFont"><a class="" href="#"
						onclick="viewMaterial()"><span class="sub-menu-text">Material
								Used</span></a></li>
				</ul></li> -->


				<!-- <li id="IPD_NursingStation" class="TextFont"><a href="#"
					onclick="viewNursingStation()">
				<i class="fa fa-fw"><img alt="" height="17px;" width="19px;" src="images/Nurse.jpg"></i>
				<span class="menu-text">Nursing Station</span>
					</a></li> -->
					
					
				<!-- __________@author : Touheed Khan @date  : 30-May-2016 @reason : Nursing Tab with Two Option_________ -->
					<li id="" class="TextFont has-sub ehat_subModule_" ><a href="#">
				<i class="fa fa-fw"><img alt="" height="17px;" width="19px;" src="images/Nurse.jpg"></i>
				<span
						class="menu-text">Nursing Station</span><span class="arrow"></span></a>
					<ul class="sub">
						<li id="displan" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewDashboardNursingStation()"><span class="sub-menu-text">Dashboard</span></a></li>
				<li id="dissum" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewNursingStation()"><span class="sub-menu-text">Transaction</span></a></li> 
							<li id="disinv" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="inv_subinventory.jsp"
							><span class="sub-menu-text">Subinventory</span></a></li>
					</ul></li>
		
				<!--  __________@author : Touheed Khan @date  : 30-May-2016 @reason : Nursing Tab with Two Option (End)_________  -->
				
				
				

				<!-- <li id="bedwar"><a href="IPD_BedWardDashboard.jsp">Bed/Ward Management</a></li> -->

				<!-- <li id="ordfor"><a href="OrderForm.jsp">Order Form</a></li> -->


				<!-- <li id="tesinv"><a href="IpdInvestigationDashboard.jsp">Test Investigation Chart</a></li> -->

				<!-- <li id="dairou" class="TextFont"><a href="#"
					onclick="viewDRR()"
					style="width: 96%; color: black; background-color: #F0E68C;"
					id="dairou1">Daily Round Report</a></li> -->

				<!-- <li id="ipdservices" class="TextFont"><a href="#"
					onclick="viewServices()"
					style="width: 96%; color: black; background-color: #F0E68C"
					id="ipdservices1">IPD Services</a></li> -->

				<!-- <li id="daiinv"><a style="" href="IPD_DICChart_Dashboard.jsp">Daily Investigation Chart</a></li> -->

				<!-- <li id="ipdreg"><a href="IPD_Register_Dashboard.jsp">IPD Register</a></li> -->

				<!-- <li id="casreg"><a href="IPD_CaseRegister_Dashboard.jsp">EMR</a></li> -->

				<li id="" class="TextFont has-sub ehat_subModule_" ><a href="#">
				<i class="fa fa-heart fa-fw"></i>
				<span
						class="menu-text">Discharge</span><span class="arrow"></span></a>
					<ul class="sub">
						<li id="displan" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewDischargePlanIPD()"><span class="sub-menu-text">Plan</span></a></li>
							<!-- Jitendra 21March2019 -->
						<li id="disprocess" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewDischargeProcessIPD()"><span class="sub-menu-text">Process</span></a></li>
						<li id="tempdissum" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewDischargeNoteIPD()"><span class="sub-menu-text">Template Wise Summary</span></a></li>
						 <li id="autodissum" class="TextFont ehatSubModule ehat_subModule_" ><a class="" href="#"
							onclick="viewDischargeSummaryIPD()"><span class="sub-menu-text">Auto Summary</span></a></li> 
					</ul></li>
				<!-- 				


<li id="patEntry" class="TextFont"><a href="#"
					onclick="viewPatientAssignTests('IPD')">Pathology Assign Test </a></li>

				<li id="cardiologyTest" class="TextFont"><a href="#"
					onclick="editPatientcardioAssignTests('IPD')">Investigation
						Test </a> 	<ul>
					 <li><a href="#"
						onclick="viewCardiologyPatientAssignTests('IPD')">Assign Tests
					</a></li> 
					<li><a href="#" onclick="editPatientcardioAssignTests('IPD')">Test
							Routine </a></li>
				</ul></li>

				<li id="radiologyTest" class="TextFont"><a href="#"
					onclick="editPatientRadioligyAssignTests('IPD')">Physiotherapy
						Test </a> 	<ul>

					 <li><a href="#"
						onclick="viewRadiologyPatientAssignTests('IPD')">Assign Tests
					</a></li> 
					<li><a href="#"
						onclick="editPatientRadioligyAssignTests('IPD')">Test Routine
					</a></li>
				</ul></li>

				<li id="CasualityServ" class="TextFont"><a href="#"
					onclick="editCasualtyServAssignPat('IPD')">Casualty Services</a> 
					
					
					<ul>

					 <li><a href="#"
						onclick="viewCasualityServicePatAssignTests('IPD')">Assign
							Services</a></li>
					<li><a href="#" onclick="editCasualtyServAssignPat('IPD')">Edit
							Services</a></li>

				</ul></li> 
				
				-->

				<!-- <li id="consentform" class="TextFont ehatSubModule s" style="display:none;"><a href="#"
					onclick="viewConsentForm('IPD')"><i class="fa fa-file-text-o fa-fw"></i>
				<span class="menu-text">Consent Forms</span></a> <ul>
					<li><a href="#">New</a></li>
					<li><a href="prev_databaseForConsentForm.jsp">Previous</a></li>
				</ul></li> -->
				<li id="" class="TextFont has-sub ehat_subModule_" style=""><a href="#">
				<i class="fa fa-hospital-o fa-fw"></i>
				<span
						class="menu-text">Consent Forms</span><span class="arrow"></span></a>
					<ul class="sub">
						<li id="displan" class="TextFont ehatSubModule ehat_subModule_" style=""><a class="" href="#"
							onclick="viewNewConsentForm()"><i class="fa fa-link fa-fw"></i><span class="sub-menu-text">New</span></a></li>
							<!-- Jitendra 21March2019 -->
						<li id="disprocess" class="TextFont ehatSubModule ehat_subModule_" style=""><a class="" href="#"
							onclick="viewPreviousConsentForm()"><i class="fa fa-link fa-fw"></i><span class="sub-menu-text">Previous</span></a></li>
						
					</ul></li>
				
				
				<li id="pharmacyConsumption" class="TextFont ehatSubModule ehat_subModule_235" style="display:none;"><a href="#"
					onclick="viewWardConsumptionForm('IPD')" style="display:none;"><i class="fa fa-file-text-o fa-fw"></i>
				<span class="menu-text" style="display:none;">Pharmacy Consumption</span></a> </li>
				
				<li id="pharmacyConsumptionIndent" class="TextFont ehatSubModule ehat_subModule_"><a href="#"
					onclick="viewIndentTemplateForm('IPD')"><i class="fa fa-file-text-o fa-fw"></i>
				<span class="menu-text">Indent Template Master</span></a> </li>
				
				<!-- <li id="consentform" class="TextFont ehatSubModule ehat_subModule_237" style=""><a href="#">
				<i class="fa fa-hospital-o fa-fw"></i>
				<span
						class="menu-text">Consent Forms</span><span class="arrow"></span></a>
					<ul class="sub">
						<li  class="TextFont ehatSubModule ehat_subModule_238" style=""><a class="" href="#"
							onclick="viewNewConsentForm()"><span class="sub-menu-text">New</span></a></li>
							
						<li  class="TextFont ehatSubModule ehat_subModule_239" style=""><a class="" href="#"
							onclick="viewPreviousConsentForm()"><span class="sub-menu-text">Previous</span></a></li>
						
				</ul></li> -->
				
			<!-- 	<li id="" class="TextFont  " ><a href="IpdTemplateHistory.jsp"
					><i class="fa fa-file-text-o fa-fw"></i>
				<span class="menu-text">IPD History Template</span></a> </li> -->
			</ul>
		</div>
		<!-- <div id="patobject" style="display: none;"></div> -->
	</div>
<!-- /SIDEBAR -->
<script type="text/javascript">
//handleSidebar();
jQuery('.sidebar-menu .has-sub > a').click(function () {
    var last = jQuery('.has-sub.open', $('.sidebar-menu'));
    last.removeClass("open");
    jQuery('.arrow', last).removeClass("open");
    jQuery('.sub', last).slideUp(200);
    
    var thisElement = $(this);
    var slideOffeset = -200;
    var slideSpeed = 200;
    
    var sub = jQuery(this).next();
    if (sub.is(":visible")) {
        jQuery('.arrow', jQuery(this)).removeClass("open");
        jQuery(this).parent().removeClass("open");
        sub.slideUp(slideSpeed, function () {
            if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                App.scrollTo(thisElement, slideOffeset);
            }
            //handleSidebarAndContentHeight();
        });
    } else {
        jQuery('.arrow', jQuery(this)).addClass("open");
        jQuery(this).parent().addClass("open");
        sub.slideDown(slideSpeed, function () {
            if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                App.scrollTo(thisElement, slideOffeset);
            }
            //handleSidebarAndContentHeight();
        });
    }
});

</script>
<%
	session.setAttribute("moduleName", "ipd");
%>

