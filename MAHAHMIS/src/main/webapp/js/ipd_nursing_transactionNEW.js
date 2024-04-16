function savePrePostChecklistnew()
{
	
	var pId1 = $("#pid").val();
	var tId = $("#tr_Id").val();
	var idForop1 = $("#idForop1").val();
	var diagnosis = $("#diagnosisId").val();
	var planedSurgery = $("#surgeryId").val();
	var prosthesis = $("#ProsId").val();
	var implants = $("#ImplId").val();
	var preTime = $("#preTimeId").val();
	var postTime = $("#postTimeId").val();
	
	var preOT2 = $('input[name=bandNameRadio]:checked').val();
	if(preOT2==undefined)
	{
		preOT2 = "0";
	}
	var afterOT2 = $('input[name=IdentificationName]:checked').val();
	if(afterOT2==undefined)
	{
		afterOT2 = "0";
	}
	var preOT3 = $('input[name=htNameRadio]:checked').val();
	if(preOT3==undefined)
	{
		preOT3 = "0";
	}
	var afterOT3 = $('input[name=wtNameRadio]:checked').val();
	if(afterOT3==undefined)
	{
		afterOT3 = "0";
	}
	var preOT4 = $('input[name=preOpNameRadio]:checked').val();
	if(afterOT4==undefined)
	{
		afterOT4 = "0";
	}
	var afterOT4 = $('input[name=preOperationNameRadio]:checked').val();
	if(afterOT4==undefined)
	{
		afterOT4 = "0";
	}
	var preOT5 = $('input[name=postNameRadio]:checked').val();
	if(preOT5==undefined)
	{
		preOT5 = "0";
	}
	var afterOT5 = $('input[name=icuNameRadio1]:checked').val();
	if(afterOT5==undefined)
	{
		afterOT5 = "0";
	}
	var preOT6 = $('input[name=surgeryNameRadio]:checked').val();
	if(preOT6==undefined)
	{
		preOT6 = "0";
	}
	var afterOT6 = $('input[name=surgicalNameRadio]:checked').val();
	if(afterOT6==undefined)
	{
		afterOT6 = "0";
	}
	var preOT7 = $('input[name=specificNameRadio]:checked').val();
	if(preOT7==undefined)
	{
		preOT7 = "0";
	}
	var afterOT7 = $('input[name=specificCkNameRadio]:checked').val();
	if(afterOT7==undefined)
	{
		afterOT7 = "0";
	}
	var preOT8 = $('input[name=wardCkNameRadio]:checked').val();
	if(afterOT8==undefined)
	{
		afterOT8 = "0";
	}
	var afterOT8 = $('input[name=consentNameRadio]:checked').val();
	if(afterOT8==undefined)
	{
		afterOT8 = "0";
	}
	var preOT9= $('input[name=anesthesiaNameRadio]:checked').val();
	if(preOT9==undefined)
	{
		preOT9 = "0";
	}
	var afterOT9 = $('input[name=anesthesiaRecNameRadio]:checked').val();
	if(afterOT9==undefined)
	{
		afterOT9 = "0";
	}
	var preOT10 = $('input[name=testIdckNameRadio]:checked').val();
	if(preOT10==undefined)
	{
		preOT10 = "0";
	}
	var afterOT10 = $('input[name=testIdNameRadio]:checked').val();
	if(afterOT10==undefined)
	{
		afterOT10 = "0";
	}
	var preOT11 = $('input[name=RBSLNameRadio]:checked').val();
	if(preOT11==undefined)
	{
		preOT11 = "0";
	}
	var afterOT11 = $('input[name=RBSLckNameRadio]:checked').val();
	if(afterOT11==undefined)
	{
		afterOT11 = "0";
	}
	var preOT12 = $('input[name=pathologyNameRadio]:checked').val();
	if(preOT12==undefined)
	{
		preOT12 = "0";
	}
	var afterOT12 = $('input[name=pathologyckNameRadio]:checked').val();
	if(afterOT12==undefined)
	{
		afterOT12 = "0";
	}
	var preOT13 = $('input[name=labNameRadio]:checked').val();
	if(preOT13==undefined)
	{
		preOT13 = "0";
	}
	var afterOT13 = $('input[name=labckNameRadio]:checked').val();
	if(afterOT13==undefined)
	{
		afterOT13 = "0";
	}
	var preOT14 = $('input[name=multipraNameRadio]:checked').val();
	if(preOT14==undefined)
	{
		preOT14 = "0";
	}
	var afterOT14 = $('input[name=multiprackNameRadio]:checked').val();
	if(afterOT14==undefined)
	{
		afterOT14 = "0";
	}
	var preOT15 = $('input[name=solidsNameRadio]:checked').val();
	if(preOT15==undefined)
	{
		preOT15 = "0";
	}
	var afterOT15 = $('input[name=NBMNameRadio]:checked').val();
	if(afterOT15==undefined)
	{
		afterOT15 = "0";
	}
	var preOT16 = $('input[name=pre-OpNameRadio]:checked').val();
	if(preOT16==undefined)
	{
		preOT16 = "0";
	}
	var afterOT16 = $('input[name=icuNameRadio111]:checked').val();
	if(afterOT16==undefined)
	{
		afterOT16 = "0";
	}
	var preOT17 = $('input[name=medicationsNameRadio]:checked').val();
	if(preOT17==undefined)
	{
		preOT17 = "0";
	}
	var afterOT17 = $('input[name=medicationNameRadio]:checked').val();
	if(afterOT17==undefined)
	{
		afterOT17 = "0";
	}
	var preOT18 = $('input[name=antibioticsIdNameRadio]:checked').val();
	if(preOT18==undefined)
	{
		preOT18 = "0";
	}
	var afterOT18 = $('input[name=antibioticsCkNameRadio]:checked').val();
	if(afterOT18==undefined)
	{
		afterOT18 = "0";
	}
	var preOT19 = $('input[name=skinNameRadio]:checked').val();
	if(preOT19==undefined)
	{
		preOT19 = "0";
	}
	var afterOT19 = $('input[name=icuNameRadio13]:checked').val();
	if(afterOT19==undefined)
	{
		afterOT19 = "0";
	}
	var preOT20 = $('input[name=radioNameRadio]:checked').val();
	if(preOT20==undefined)
	{
		preOT20 = "0";
	}
	var afterOT20 = $('input[name=checkNameRadio]:checked').val();
	if(afterOT20==undefined)
	{
		afterOT20 = "0";
	}
	var preOT21 = $('input[name=bloodArrangedNameRadio]:checked').val();
	if(preOT21==undefined)
	{
		preOT21 = "0";
	}
	var afterOT21 = $('input[name=bloodArrangedCheckNameRadio]:checked').val();
	if(afterOT21==undefined)
	{
		afterOT21 = "0";
	}
	var preOT22 = $('input[name=BloodTransfusionNameRadio]:checked').val();
	if(preOT22==undefined)
	{
		preOT22 = "0";
	}
	var afterOT22 = $('input[name=BloodNameRadio]:checked').val();
	if(afterOT22==undefined)
	{
		afterOT22 = "0";
	}
	var preOT23 = $('input[name=TransfusedNameRadio]:checked').val();
	if(preOT23==undefined)
	{
		preOT23 = "0";
	}
	var afterOT23 = $('input[name=TransfusedCheckNameRadio]:checked').val();
	if(afterOT23==undefined)
	{
		afterOT23 = "0";
	}
	var preOT24 = $('input[name=prosthesisNameRadio]:checked').val();
	if(preOT24==undefined)
	{
		preOT24 = "0";
	}
	var afterOT24 = $('input[name=prosthesisCheckNameRadio]:checked').val();
	if(afterOT24==undefined)
	{
		afterOT24 = "0";
	}
	var preOT25 = $('input[name=dentureNameRadio1]:checked').val();
	if(preOT25==undefined)
	{
		preOT25 = "0";
	}
	var afterOT25 = $('input[name=ImplantsNameRadio]:checked').val();
	if(afterOT25==undefined)
	{
		afterOT25 = "0";
	}
	var preOT26 = $('input[name=dentureNameRadio]:checked').val();
	if(preOT26==undefined)
	{
		preOT26 = "0";
	}
	var afterOT26 = $('input[name=spectaclesNameRadio]:checked').val();
	if(afterOT26==undefined)
	{
		afterOT26 = "0";
	}
	var preOT27 = $('input[name=jewlryNameRadio]:checked').val();
	if(preOT27==undefined)
	{
		preOT27 = "0";
	}
	var afterOT27 = $('input[name=wigNameRadio]:checked').val();
	if(afterOT27==undefined)
	{
		afterOT27 = "0";
	}
	
	var preOT28 = $('input[name=diagnosticNameRadio]:checked').val();
	if(preOT28==undefined)
	{
		preOT28 = "0";
	}
	var afterOT28 = $('input[name=X-rayNameRadio]:checked').val();
	if(afterOT28==undefined)
	{
		afterOT28 = "0";
	}
	var drugAllergies = $('input:checkbox[id=drugAllergiesId]');
	if(drugAllergies.is(':checked') == true){ 
		drugAllergies = 1;   
		}else{
			drugAllergies = 0;   
	   }     
	var allergies = $('input:checkbox[id=allergiesId]');
	if(allergies.is(':checked') == true){ 
		allergies = 1;   
		}else{
			allergies = 0;   
	   }
	var ht = $("#htId").val();
	var wt = $("#wtId").val();
	var preOpHr = $("#hrId").val();
	var preOpRr = $("#prId").val();
	var preOpSpo2 = $("#spo2Id").val();
	var preOpTemp = $("#tempId").val();
	var preOpBp = $("#bpId").val();
	var preOpBpprefix = $("#bpId3").val();
	var postOpHr = $("#postHrId").val();
	var postOpRr = $("#postId").val();
	var postOpSpo2 = $("#postSo2Id").val();
	var postOpTemp = $("#postTempid").val();
	var postOpBp = $("#postBpId").val();
	var postOpBpPrefix = $("#postBpId1").val();
	var preOxygen = $("#oxygenId1").val();
	var postOxygen = $("#oxygenId12").val();
	
	var HivTest = $('input[name=HivTest]:checked').val();
	if(HivTest==undefined)
	{
		HivTest = "0";
	}
	var HBsAgTest = $('input[name=HBsAgTest]:checked').val();
	if(HBsAgTest==undefined)
	{
		HBsAgTest = "0";
	}
	var HCVTest = $('input[name=HCVTest]:checked').val();
	if(HCVTest==undefined)
	{
		HCVTest = "0";
	}
	var VDRLTest = $('input[name=VDRLTest]:checked').val();
	if(VDRLTest==undefined)
	{
		VDRLTest = "0";
	}
	var MRSATest = $('input[name=MRSATest]:checked').val();
	if(MRSATest==undefined)
	{
		MRSATest = "0";
	}
	var preRBSL = $("#RBSLsId").val();
	var preRBSLAt = $("#RBSLAtId").val();
	var postRBSLs = $("#RBSLs1Id").val();
	var postRBSLAt = $("#RBSLAt1Id").val();
	var noSolidAfter = $("#icuId1").val();
	var noClearLiquidAfter = $("#icuId2").val();
	var NBM = $("#icuId3").val();
	var AB_Time = $("#AB_Time").val();
	var Enema_time = $("#Enema_Time").val();
	var componentType = $("#componentType").val();
	var componentUnit = $("#componentUnit").val();
	var transfusedUnit = $("#transfusedUnit").val();
	var preYes = $('input:checkbox[id=yesCheckId]');
	if(preYes.is(':checked') == true){ 
		preYes = 1;   
		}else{
			preYes = 0;   
	   }     
	var postyes = $('input:checkbox[id=yesCheckId1]');
	if(postyes.is(':checked') == true){ 
		postyes = 1;   
		}else{
			postyes = 0;   
	   }
	var Xray = $('input:checkbox[id=XrayId]');
	if(Xray.is(':checked') == true){ 
		Xray = 1;   
		}else{
			Xray = 0;   
	   }     
	var USG = $('input:checkbox[id=USGId]');
	if(USG.is(':checked') == true){ 
		USG = 1;   
		}else{
			USG = 0;   
	   }
	var ct = $('input:checkbox[id=ctId]');
	if(ct.is(':checked') == true){ 
		ct = 1;   
		}else{
			ct = 0;   
	   }     
	var pet_ct = $('input:checkbox[id=petId]');
	if(pet_ct.is(':checked') == true){ 
		pet_ct = 1;   
		}else{
			pet_ct = 0;   
	   }	
	var mri = $('input:checkbox[id=mriId]');
	if(mri.is(':checked') == true){ 
		mri = 1;   
		}else{
			mri	= 0;   
	   }     
	var mammo = $('input:checkbox[id=mammoId]');
	if(mammo.is(':checked') == true){ 
		mammo = 1;   
		}else{
			mammo = 0;   
	   }
	var ecg = $('input:checkbox[id=ecgId]');
	if(ecg.is(':checked') == true){ 
		ecg = 1;   
		}else{
			ecg = 0;   
	   }     
	var echo = $('input:checkbox[id=echoId]');
	if(echo.is(':checked') == true){ 
		echo = 1;   
		}else{
			echo = 0;   
	   } 
	var dentures = $('input:checkbox[id=dentId]');
	if(dentures.is(':checked') == true){ 
		dentures = 1;   
		}else{
			dentures = 0;   
	   }     
	var bridge = $('input:checkbox[id=bridgeId]');
	if(bridge.is(':checked') == true){ 
		bridge = 1;   
		}else{
			bridge = 0;   
	   }
	var spectacle = $('input:checkbox[id=spectId]');
	if(spectacle.is(':checked') == true){ 
		spectacle = 1;   
		}else{
			spectacle = 0;   
	   }     
	var contactLense = $('input:checkbox[id=contactlenseId]');
	if(contactLense.is(':checked') == true){ 
		contactLense = 1;   
		}else{
			contactLense = 0;   
	   }
	var hearingAid = $('input:checkbox[id=harId]');
	if(hearingAid.is(':checked') == true){ 
		hearingAid = 1;   
		}else{
			hearingAid = 0;   
	   }
	var jewelry = $('input:checkbox[id=jewId]');
	if(jewelry.is(':checked') == true){ 
		jewelry = 1;   
		}else{
			jewelry = 0;   
	   }	
	var hairpins = $('input:checkbox[id=haringId]');
	if(hairpins.is(':checked') == true){ 
		hairpins = 1;   
		}else{
			hairpins = 0;   
	   }     
	var wig = $('input:checkbox[id=wId]');
	if(wig.is(':checked') == true){ 
		wig = 1;   
		}else{
			wig = 0;   
	   }
	
	var PrePostDetails = {
			nursinAssesmentList : []
        };
	PrePostDetails.nursinAssesmentList.push({
    	pId:pId1,
    	tId : tId,
    	idpre_post_checklist : idForop1,
    	diagnosis: diagnosis,
    	planedSurgery: planedSurgery,
    	preOT2: preOT2,
    	afterOT2: afterOT2,
    	preOT3: preOT3,
    	afterOT3: afterOT3,
    	preOT4: preOT4,
    	afterOT4: afterOT4,
    	preOT5: preOT5,
    	afterOT5: afterOT5,
    	preOT6: preOT6,
    	afterOT6: afterOT6,
    	preOT7: preOT7,
    	afterOT7: afterOT7,
    	preOT8: preOT8,
    	afterOT8: afterOT8,
    	preOT9: preOT9,
    	afterOT9: afterOT9,
    	preOT10: preOT10,
    	afterOT10: afterOT10,
    	preOT11: preOT11,
    	afterOT11: afterOT11,
    	preOT12: preOT12,
    	afterOT12: afterOT12,
    	preOT13: preOT13,
    	afterOT13: afterOT13,
    	preOT14: preOT14,
    	afterOT14: afterOT14,
    	preOT15: preOT15,
    	afterOT15: afterOT15,
    	preOT16: preOT16,
    	afterOT16: afterOT16,
    	preOT17: preOT17,
    	afterOT17: afterOT17,
    	preOT18: preOT18,
    	afterOT18: afterOT18,
    	preOT19: preOT19,
    	afterOT19: afterOT19,
    	preOT20: preOT20,
    	afterOT20: afterOT20,
    	preOT21: preOT21,
    	afterOT21: afterOT21,
    	preOT22: preOT22,
    	afterOT22: afterOT22,
    	preOT23: preOT23,
    	afterOT23: afterOT23,
    	preOT24: preOT24,
    	afterOT24: afterOT24,
    	preOT25: preOT25,
    	afterOT25: afterOT25,
    	preOT26: preOT26,
    	afterOT26: afterOT26,
    	preOT27: preOT27,
    	afterOT27: afterOT27,
    	preOT28: preOT28,
    	afterOT28: afterOT28,
    	height: ht,
    	weight: wt,
    	preOpHr: preOpHr,
    	preOpRr: preOpRr,
    	preOpSpo2: preOpSpo2,
    	preOpTemp: preOpTemp,
    	preOpBp: preOpBp,
    	preOpBpprefix: preOpBpprefix,
    	postOpHr: postOpHr,
    	postOpRr: postOpRr,
    	postOpSpo2: postOpSpo2,
    	postOpTemp: postOpTemp,
    	postOpBp: postOpBp,
    	postOpBpPrefix: postOpBpPrefix,
    	preOxygen: preOxygen,
    	postOxygen: postOxygen,
    	hivTest: HivTest,
    	hBsAgTest: HBsAgTest,
    	hCVTest: HCVTest,
    	vDRLTest: VDRLTest,
    	mRSATest: MRSATest,
    	preRBSL: preRBSL,
    	preRBSLAt: preRBSLAt,
    	postRBSLs: postRBSLs,
    	postRBSLAt: postRBSLAt,
    	noSolidAfter: noSolidAfter,
    	noClearLiquidAfter: noClearLiquidAfter,
    	nBM: NBM,
    	aB_Time: AB_Time,
    	enema_time: Enema_time,
    	componentType: componentType,
    	componentUnit: componentUnit,
    	transfusedUnit: transfusedUnit,
    	preYes: preYes,
    	postyes: postyes,
    	xray: Xray,
    	uSG: USG,
    	ct: ct,
    	pet_ct: pet_ct,
    	mri: mri,
    	mammo: mammo,
    	ecg: ecg,
    	echo: echo,
    	drugAllergies: drugAllergies,
    	allergies: allergies,
    	dentures: dentures,
    	bridge: bridge,
    	spectacle: spectacle,
    	contactLense: contactLense,
    	hearingAid: hearingAid,
    	jewelry: jewelry,
    	hairpins: hairpins,
    	prosthesis: prosthesis,
    	implants: implants,
    	wig: wig,
    	preTime: preTime,
    	postTime: postTime
    });

	
	
	PrePostDetails = JSON.stringify(PrePostDetails);
    var inputs = [];
    inputs.push('PrePostDetails=' + PrePostDetails);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/nursingtransaction/SavePrePostChecklist",
		
		
				success : function(r) {
					ajaxResponse = r;
					alert(r);
					fetchPrePostChecklistnew();
				}
			});
}


function fetchPrePostChecklistnew(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
  
    var inputs = [];
	    inputs.push('pId=' + pId1);
	    inputs.push('tId=' + tId);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingtransaction/fetchprepostChecklist",
		
				success : function(response) {
					$("#idForop1").val(response.nursinAssesmentList[0].idpre_post_checklist);
					$("#diagnosisId").val(response.nursinAssesmentList[0].diagnosis);
					$("#surgeryId").val(response.nursinAssesmentList[0].planedSurgery);
					$("#htId").val(response.nursinAssesmentList[0].height);
					$("#wtId").val(response.nursinAssesmentList[0].weight);
					$("#hrId").val(response.nursinAssesmentList[0].preOpHr);
					$("#prId").val(response.nursinAssesmentList[0].preOpRr);
					$("#spo2Id").val(response.nursinAssesmentList[0].preOpSpo2);
					$("#tempId").val(response.nursinAssesmentList[0].preOpTemp);
					$("#bpId").val(response.nursinAssesmentList[0].preOpBp);
					$("#bpId3").val(response.nursinAssesmentList[0].preOpBpprefix);
					$("#postHrId").val(response.nursinAssesmentList[0].postOpHr);
					$("#postId").val(response.nursinAssesmentList[0].postOpRr);
					$("#postSo2Id").val(response.nursinAssesmentList[0].postOpSpo2);
					$("#postTempid").val(response.nursinAssesmentList[0].postOpTemp);
					$("#postBpId").val(response.nursinAssesmentList[0].postOpBp);
					$("#postBpId1").val(response.nursinAssesmentList[0].postOpBpPrefix);
					$("#oxygenId1").val(response.nursinAssesmentList[0].preOxygen);
					$("#oxygenId12").val(response.nursinAssesmentList[0].postOxygen);
					$("#RBSLsId").val(response.nursinAssesmentList[0].preRBSL);
					$("#RBSLAtId").val(response.nursinAssesmentList[0].preRBSLAt);
					$("#RBSLs1Id").val(response.nursinAssesmentList[0].postRBSLs);
					$("#RBSLAt1Id").val(response.nursinAssesmentList[0].postRBSLAt);
					$("#icuId1").val(response.nursinAssesmentList[0].noSolidAfter);
					$("#icuId3").val(response.nursinAssesmentList[0].nBM);
					$("#icuId2").val(response.nursinAssesmentList[0].noClearLiquidAfter);
					$("#AB_Time").val(response.nursinAssesmentList[0].aB_Time);
					$("#Enema_Time").val(response.nursinAssesmentList[0].enema_time);
					$("#componentType").val(response.nursinAssesmentList[0].componentType);
					$("#componentUnit").val(response.nursinAssesmentList[0].componentUnit);
					$("#transfusedUnit").val(response.nursinAssesmentList[0].transfusedUnit);
					
					$("#ProsId").val(response.nursinAssesmentList[0].prosthesis);
					$("#ImplId").val(response.nursinAssesmentList[0].implants);
					$("#preTimeId").val(response.nursinAssesmentList[0].preTime);
					$("#postTimeId").val(response.nursinAssesmentList[0].postTime);
					
					 if(response.nursinAssesmentList[0].drugAllergies==1){
		                    $("#drugAllergiesId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].allergies==1){
		                    $("#allergiesId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].xray==1){
	                    $("#XrayId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].uSG==1){
		                    $("#USGId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].ct==1){
		                    $("#ctId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].pet_ct==1){
	                    $("#petId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].mri==1){
		                    $("#mriId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].mammo==1){
		                    $("#mammoId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].ecg==1){
	                    $("#ecgId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].echo==1){
		                    $("#echoId").prop("checked", "checked");
		               }
					if(response.nursinAssesmentList[0].preYes==1){
		                    $("#yesCheckId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].postyes==1){
	                    $("#yesCheckId1").prop("checked", "checked");
	                  }

					if(response.nursinAssesmentList[0].preOT2=="Y"){
	                    $("#bandId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT2=="N"){
	                    $("#bandId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT2=="NA"){
	                    $("#bandId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT3=="Y"){
	                    $("#htId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT3=="N"){
	                    $("#htId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT3=="NA"){
	                    $("#htId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT4=="Y"){
	                    $("#preOpId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT4=="N"){
	                    $("#preOpId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT4=="NA"){
	                    $("#preOpId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT5=="Y"){
	                    $("#postId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT5=="N"){
	                    $("#postId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT5=="NA"){
	                    $("#postId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT6=="Y"){
	                    $("#surgeryId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT6=="N"){
	                    $("#surgeryId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT6=="NA"){
	                    $("#surgeryId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT7=="Y"){
	                    $("#specificId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT7=="N"){
	                    $("#specificId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT7=="NA"){
	                    $("#specificId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT8=="Y"){
	                    $("#consentId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT8=="N"){
	                    $("#consentId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT8=="NA"){
	                    $("#consentId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT9=="Y"){
	                    $("#anesthesiaId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT9=="N"){
	                    $("#anesthesiaId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT9=="NA"){
	                    $("#anesthesiaId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT10=="Y"){
	                    $("#testId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT10=="N"){
	                    $("#testId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT10=="NA"){
	                    $("#testId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT11=="Y"){
	                    $("#RBSLId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT11=="N"){
	                    $("#RBSLId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT11=="NA"){
	                    $("#RBSLId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT12=="Y"){
	                    $("#pathologyId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT12=="N"){
	                    $("#pathologyId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT12=="NA"){
	                    $("#pathologyId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT13=="Y"){
	                    $("#labId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT13=="N"){
	                    $("#labId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT13=="NA"){
	                    $("#labId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT14=="Y"){
	                    $("#multipraId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT14=="N"){
	                    $("#multipraId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT14=="NA"){
	                    $("#multipraId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT28=="Y"){
	                    $("#diagnosticId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT28=="N"){
	                    $("#diagnosticIdId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT28=="NA"){
	                    $("#diagnosticIdId3").prop("checked", "checked");
	                }
					
					if(response.nursinAssesmentList[0].preOT15=="Y"){
	                    $("#solidsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT15=="N"){
	                    $("#solidsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT15=="NA"){
	                    $("#solidsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT16=="Y"){
	                    $("#pre-OpId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT16=="N"){
	                    $("#pre-OpId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT16=="NA"){
	                    $("#pre-OpId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT17=="Y"){
	                    $("#medicationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT17=="N"){
	                    $("#medicationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT17=="NA"){
	                    $("#medicationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT18=="Y"){
	                    $("#antibioticsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT18=="N"){
	                    $("#antibioticsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT18=="NA"){
	                    $("#antibioticsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT19=="Y"){
	                    $("#skinId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT19=="N"){
	                    $("#skinId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT19=="NA"){
	                    $("#skinId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT20=="Y"){
	                    $("#radioId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT20=="N"){
	                    $("#radioId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT20=="NA"){
	                    $("#radioId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT21=="Y"){
	                    $("#bloodArrangedId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT21=="N"){
	                    $("#bloodArrangedId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT21=="NA"){
	                    $("#bloodArrangedId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT22=="Y"){
	                    $("#BloodTransfusionId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT22=="N"){
	                    $("#BloodTransfusionId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT22=="NA"){
	                    $("#BloodTransfusionId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT23=="Y"){
	                    $("#TransfusedId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT23=="N"){
	                    $("#TransfusedId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT23=="NA"){
	                    $("#TransfusedIdId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT24=="Y"){
	                    $("#prosthesisId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT24=="N"){
	                    $("#prosthesisId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT24=="NA"){
	                    $("#prosthesisId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT25=="Y"){
	                    $("#dentureId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT25=="N"){
	                    $("#dentureId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT25=="NA"){
	                    $("#dentureId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT26=="Y"){
	                    $("#dentureId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT26=="N"){
	                    $("#dentureId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT26=="NA"){
	                    $("#dentureId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].preOT27=="Y"){
	                    $("#jewlryId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT27=="N"){
	                    $("#jewlryId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].preOT27=="NA"){
	                    $("#jewlryId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT2=="Y"){
	                    $("#IdentificationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT2=="N"){
	                    $("#IdentificationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT2=="NA"){
	                    $("#IdentificationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT3=="Y"){
	                    $("#wtId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT3=="N"){
	                    $("#wtId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT3=="NA"){
	                    $("#wtId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT4=="Y"){
	                    $("#preOperationId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT4=="N"){
	                    $("#preOperationId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT4=="NA"){
	                    $("#preOperationId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT5=="Y"){
	                    $("#icuId101").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT5=="N"){
	                    $("#icuId102").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT5=="NA"){
	                    $("#icuId103").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT6=="Y"){
	                    $("#surgicalID1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT6=="N"){
	                    $("#surgicalID2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT6=="NA"){
	                    $("#surgicalID3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT7=="Y"){
	                    $("#specificId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT7=="N"){
	                    $("#specificId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT7=="NA"){
	                    $("#specificId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT8=="Y"){
	                    $("#consentId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT8=="N"){
	                    $("#consentId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT8=="NA"){
	                    $("#consentId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT9=="Y"){
	                    $("#anesthesiaRecId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT9=="N"){
	                    $("#anesthesiaRecId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT9=="NA"){
	                    $("#anesthesiaRecId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT10=="Y"){
	                    $("#testId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT10=="N"){
	                    $("#testId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT10=="NA"){
	                    $("#testId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT11=="Y"){
	                    $("#RBSLId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT11=="N"){
	                    $("#RBSLId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT11=="NA"){
	                    $("#RBSLId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT12=="Y"){
	                    $("#pathologyId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT12=="N"){
	                    $("#pathologyId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT12=="NA"){
	                    $("#pathologyId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT13=="Y"){
	                    $("#labId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT13=="N"){
	                    $("#labId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT13=="NA"){
	                    $("#labId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT28=="Y"){
	                    $("#X-rayId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT28=="N"){
	                    $("#X-rayId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT28=="NA"){
	                    $("#X-rayId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT14=="Y"){
	                    $("#multiprackId11").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT14=="N"){
	                    $("#multiprackId12").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT14=="NA"){
	                    $("#multiprackId13").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT15=="Y"){
	                    $("#NBMId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT15=="N"){
	                    $("#NBMId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT15=="NA"){
	                    $("#NBMId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT16=="NA"){
	                    $("#pre-OprId").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT17=="Y"){
	                    $("#medicationId10").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT17=="N"){
	                    $("#medicationId20").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT17=="NA"){
	                    $("#medicationId31").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT18=="Y"){
	                    $("#antibioticsckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT18=="N"){
	                    $("#antibioticsckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT18=="NA"){
	                    $("#antibioticsckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT19=="NA"){
	                    $("#skinckId1").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT20=="Y"){
	                    $("#checkId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT20=="N"){
	                    $("#checkId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT20=="NA"){
	                    $("#checkId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT21=="Y"){
	                    $("#bloodArrangedCheckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT21=="N"){
	                    $("#bloodArrangedCheckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT21=="NA"){
	                    $("#bloodArrangedCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterO22=="Y"){
	                    $("#BloodTransfusionId31").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT22=="N"){
	                    $("#BloodTransfusionId32").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT22=="NA"){
	                    $("#BloodTransfusionId33").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT23=="Y"){
	                    $("#TransfusedCheckId").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT23=="N"){
	                    $("#TransfusedCheck2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT23=="NA"){
	                    $("#TransfusedCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT24=="Y"){
	                    $("#prosthesisCheckId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT24=="N"){
	                    $("#prosthesisCheckId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT24=="NA"){
	                    $("#prosthesisCheckId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT25=="Y"){
	                    $("#ImplantsId1").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT25=="N"){
	                    $("#ImplantsId2").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].afterOT25=="NA"){
	                    $("#ImplantsId3").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT26=="NA"){
	                    $("#spectacleId").prop("checked", "checked");
	                }
					if(response.nursinAssesmentList[0].afterOT27=="NA"){
	                    $("#wigId").prop("checked", "checked");
	                }
					
					if(response.nursinAssesmentList[0].hivTest=="positive"){
						$("#HivTestP").prop("checked", "checked");
					}else if(response.nursinAssesmentList[0].hivTest=="nonReactive"){
						$("#HivTestNR").prop("checked", "checked");
					}else if(response.nursinAssesmentList[0].hivTest=="notDone"){
						$("#HivTestND").prop("checked", "checked");
					}
					if(response.nursinAssesmentList[0].hCVTest=="positive"){
	                    $("#HCVTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hCVTest=="nonReactive"){
	                    $("#HCVTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hCVTest=="notDone"){
	                    $("#HCVTestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].vDRLTest=="positive"){
	                    $("#VDRLTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].vDRLTest=="nonReactive"){
	                    $("#VDRLTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].vDRLTest=="notDone"){
	                    $("#VDRLTestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].mRSATest=="positive"){
	                    $("#MRSATestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].mRSATest=="nonReactive"){
	                    $("#MRSATestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].mRSATest=="notDone"){
	                    $("#MRSATestND").prop("checked", "checked");
	                }if(response.nursinAssesmentList[0].hBsAgTest=="positive"){
	                    $("#HBsAgTestP").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hBsAgTest=="nonReactive"){
	                    $("#HBsAgTestNR").prop("checked", "checked");
	                }else if(response.nursinAssesmentList[0].hBsAgTest=="notDone"){
	                    $("#HBsAgTestND").prop("checked", "checked");
	                }
					 if(response.nursinAssesmentList[0].dentures==1){
		                    $("#dentId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].bridge==1){
		                    $("#bridgeId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].spectacle==1){
	                    $("#spectId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].contactLense==1){
		                    $("#contactlenseId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].hearingAid==1){
		                    $("#harId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].jewelry==1){
	                    $("#jewId").prop("checked", "checked");
	                  }
					 if(response.nursinAssesmentList[0].hairpins==1){
		                    $("#haringId").prop("checked", "checked");
		              }
					if(response.nursinAssesmentList[0].wig==1){
		                    $("#wId").prop("checked", "checked");
		              }
					

				}
			});
	}


function saveNursingAssesmentnew(){

	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var idForintialass1 = $("#idForintialass1").val();
    
	var bandOn = $('input:checkbox[id=idBandYes]');
	if(bandOn.is(':checked') == true){
		bandOn = 1;
	}else{
		bandOn = 0;
	}
	var call = $('input:checkbox[id=idCallYes]');
	if(call.is(':checked') == true){
		call = 1;
	}else{
		call = 0;
	}
	var ht = $("#idHt").val();
	var wt = $("#idWt").val();
	var ambulatory = $('input:checkbox[id=idAmbulatory]');
	if(ambulatory.is(':checked') == true){
		ambulatory = 1;
	}else{
		ambulatory = 0;
	}
	var strecher = $('input:checkbox[id=idStrecher]');
	if(strecher.is(':checked') == true){
		strecher = 1;
	}else{
		strecher = 0;
	}
	var wheelchair = $('input:checkbox[id=idWheelchair]');
	if(wheelchair.is(':checked') == true){
		wheelchair = 1;
	}else{
		wheelchair = 0;
	}
	var admissionEmergency = $('input:checkbox[id=idEmer]');
	if(admissionEmergency.is(':checked') == true){
		admissionEmergency = 1;
	}else{
		admissionEmergency = 0;
	}
	var admissionRegular = $('input:checkbox[id=idReg]');
	if(admissionRegular.is(':checked') == true){
		admissionRegular = 1;
	}else{
		admissionRegular = 0;
	}
	// alert(bandOn+"="+call+"="+ht+"="+wt+"="+ambulatory+"="+strecher+"="+wheelchair+"="+admissionEmergency+"="+admissionRegular);
	var infoPat = $('input:checkbox[id=idInfoPat]');
	if(infoPat.is(':checked') == true){
		infoPat = 1;
	}else{
		infoPat = 0;
	}
	var infoFam = $('input:checkbox[id=idInfoFam]');
	if(infoFam.is(':checked') == true){
		infoFam = 1;
	}else{
		infoFam = 0;
	}
	var infoOld = $('input:checkbox[id=idInfoOld]');
	if(infoOld.is(':checked') == true){
		infoOld = 1;
	}else{
		infoOld = 0;
	}
	var infoOther = $('input:checkbox[id=idInfoOther]');
	if(infoOther.is(':checked') == true){
		infoOther = 1;
	}else{
		infoOther = 0;
	}
	var infoConsent = $('input:checkbox[id=idInfoConsent]');
	if(infoConsent.is(':checked') == true){
		infoConsent = 1;
	}else{
		infoConsent = 0;
	}
	var infoRelative = $("#idRalation").val();
	// alert(infoPat+"="+infoFam+"="+infoOld+"="+infoOther+"="+infoConsent+"="+infoRelative);
	var vitalT = $("#idT").val();
	var vitalP = $("#idP").val();
	var vitalR = $("#idR").val();
	var vitalBp1 = $("#idBP1").val();
	var vitalBp2 = $("#idBP2").val();
	var vitalSp = $("#idSP").val();
	
	var admittingDiagnosis = $("#idAdmitDia").val();
	var allergyDrug = $('input:checkbox[id=idAlDrug]');
	if(allergyDrug.is(':checked') == true){
		allergyDrug = 1;
	}else{
		allergyDrug = 0;
	}
	var allergyFood = $('input:checkbox[id=idAlFood]');
	if(allergyFood.is(':checked') == true){
		allergyFood = 1;
	}else{
		allergyFood = 0;
	}
	var allergyOther = $('input:checkbox[id=idAlOther]');
	if(allergyOther.is(':checked') == true){
		allergyOther = 1;
	}else{
		allergyOther = 0;
	}
	var admittingComplaint = $("#idComplaint").val();
	// alert(vitalT+"="+vitalP+"="+vitalR+"="+vitalBp1+"="+vitalBp2+"="+vitalSp);
	// alert(admittingDiagnosis+"="+allergyDrug+"="+allergyFood+"="+allergyOther+"="+admittingComplaint);
	var patHD = $('input:checkbox[id=idPHD]');
	if(patHD.is(':checked') == true){
		patHD = 1;
	}else{
		patHD = 0;
	}
	var patHyp = $('input:checkbox[id=idPHyp]');
	if(patHyp.is(':checked') == true){
		patHyp = 1;
	}else{
		patHyp = 0;
	}
	var patAst = $('input:checkbox[id=idPAst]');
	if(patAst.is(':checked') == true){
		patAst = 1;
	}else{
		patAst = 0;
	}
	var patTB = $('input:checkbox[id=idPTB]');
	if(patTB.is(':checked') == true){
		patTB = 1;
	}else{
		patTB = 0;
	}
	var patCan = $('input:checkbox[id=idPCan]');
	if(patCan.is(':checked') == true){
		patCan = 1;
	}else{
		patCan = 0;
	}
	var patAI = $('input:checkbox[id=idPAI]');
	if(patAI.is(':checked') == true){
		patAI = 1;
	}else{
		patAI = 0;
	}
	var patDia = $('input:checkbox[id=idPDia]');
	if(patDia.is(':checked') == true){
		patDia = 1;
	}else{
		patDia = 0;
	}
	var patKid = $('input:checkbox[id=idPKid]');
	if(patKid.is(':checked') == true){
		patKid = 1;
	}else{
		patKid = 0;
	}
	var patStroke = $('input:checkbox[id=idPStroke]');
	if(patStroke.is(':checked') == true){
		patStroke = 1;
	}else{
		patStroke = 0;
	}
	var patUL = $('input:checkbox[id=idPUL]');
	if(patUL.is(':checked') == true){
		patUL = 1;
	}else{
		patUL = 0;
	}
	var patEP = $('input:checkbox[id=idPEP]');
	if(patEP.is(':checked') == true){
		patEP = 1;
	}else{
		patEP = 0;
	}
	var patLung = $('input:checkbox[id=idPLung]');
	if(patLung.is(':checked') == true){
		patLung = 1;
	}else{
		patLung = 0;
	}
	var patSeizures = $('input:checkbox[id="idPSeizures"]');
	if(patSeizures.is(':checked') == true){
		patSeizures = 1;
	}else{
		patSeizures = 0;
	}
	var patHepa = $('input:checkbox[id="idPHepa"]');
	if(patHepa.is(':checked') == true){
		patHepa = 1;
	}else{
		patHepa = 0;
	}
	var patTU = $('input:checkbox[id="idPTU"]');
	if(patTU.is(':checked') == true){
		patTU = 1;
	}else{
		patTU = 0;
	}
	var patOther = $("#idPOther").val();
	var patSurgery = $("#idPSurgery").val();
	// alert(patHD+"="+patHyp+"="+patAst+"="+patTB+"="+patCan+"="+patAI+"="+patDia+"="+patKid+"="+patStroke+"="+patUL);
	// alert(patEP+"="+patLung+"="+patSeizures+"="+patHepa+"="+patTU+"="+patOther+"="+patSurgery);
	var famHD = $('input:checkbox[id=idFHD]');
	if(famHD.is(':checked') == true){
		famHD = 1;
	}else{
		famHD = 0;
	}
	var famHyp = $('input:checkbox[id=idFHyp]');
	if(famHyp.is(':checked') == true){
		famHyp = 1;
	}else{
		famHyp = 0;
	}
	var famAst = $('input:checkbox[id=idFAst]');
	if(famAst.is(':checked') == true){
		famAst = 1;
	}else{
		famAst = 0;
	}
	var famTB = $('input:checkbox[id=idFTB]');
	if(famTB.is(':checked') == true){
		famTB = 1;
	}else{
		famTB = 0;
	}
	var famCan = $('input:checkbox[id=idFCan]');
	if(famCan.is(':checked') == true){
		famCan = 1;
	}else{
		famCan = 0;
	}
	var famAI = $('input:checkbox[id=idFAI]');
	if(famAI.is(':checked') == true){
		famAI = 1;
	}else{
		famAI = 0;
	}
	var famDia = $('input:checkbox[id=idFDia]');
	if(famDia.is(':checked') == true){
		famDia = 1;
	}else{
		famDia = 0;
	}
	var famKid = $('input:checkbox[id=idFKid]');
	if(famKid.is(':checked') == true){
		famKid = 1;
	}else{
		famKid = 0;
	}
	var famStroke = $('input:checkbox[id=idFStroke]');
	if(famStroke.is(':checked') == true){
		famStroke = 1;
	}else{
		famStroke = 0;
	}
	var famUL = $('input:checkbox[id=idFUL]');
	if(famUL.is(':checked') == true){
		famUL = 1;
	}else{
		famUL = 0;
	}
	var famEP = $('input:checkbox[id=idFEP]');
	if(famEP.is(':checked') == true){
		famEP = 1;
	}else{
		famEP = 0;
	}
	var famLung = $('input:checkbox[id=idFLung]');
	if(famLung.is(':checked') == true){
		famLung = 1;
	}else{
		famLung = 0;
	}
	var famSeizures = $('input:checkbox[id="idFSeizures"]');
	if(famSeizures.is(':checked') == true){
		famSeizures = 1;
	}else{
		famSeizures = 0;
	}
	var famHepa = $('input:checkbox[id="idFHepa"]');
	if(famHepa.is(':checked') == true){
		famHepa = 1;
	}else{
		famHepa = 0;
	}
	var famTU = $('input:checkbox[id="idFTU"]');
	if(famTU.is(':checked') == true){
		famTU = 1;
	}else{
		famTU = 0;
	}
	var famOther = $("#idFOther").val();
	var famSurgery = $("#idFSurgery").val();
	var maritialStatus = $("input:radio[name='maritialStatus']:checked").val();
	if(maritialStatus==undefined)
	{
		maritialStatus = "0";
	}
	var livesWith = $("input:radio[name='livesWith']:checked").val();
	if(livesWith==undefined)
	{
		livesWith = "0";
	}
	var occupation = $("input:radio[name='occupation']:checked").val();
	if(occupation==undefined)
	{
		occupation = "0";
	}
	var activity = $("input:radio[name='activity']:checked").val();
	if(activity==undefined)
	{
		activity = "0";
	}
	var emoStatus = $("input:radio[name='emoStatus']:checked").val();
	if(emoStatus==undefined)
	{
		emoStatus = "0";
	}
	var usualFeeding = $("#idFeeding").val();
	var usualBathing = $("#idBathing").val();
	var usualToileting = $("#idToileting").val();
	var usualGeneral = $("#idGeneral").val();
	var usualDressing = $("#idDressing").val();
	var admsFeeding = $("#idAdmFeeding").val();
	var admsBathing = $("#idAdmBathing").val();
	var admsToileting = $("#idAdmToileting").val();
	var admsGeneral = $("#idAdmGeneral").val();
	var admsDressing = $("#idAdmDressing").val();
	
	// alert(usualFeeding+"="+usualBathing+"="+usualToileting+"="+usualGeneral+"="+usualDressing);
	// alert(admsFeeding+"="+admsBathing+"="+admsToileting+"="+admsGeneral+"="+admsDressing);
	  var Nursingobj01 = {
			  nursinglist : []
	        };
	  Nursingobj01.nursinglist.push({
	    	pId:pId1,
	    	tId : tId,
	    	idNursingInitialAssessment: idForintialass1,
	    	bandOn: bandOn,
			call: call,
			ht: ht,
			wt: wt,
			ambulatory: ambulatory,
			strecher: strecher,
			wheelchair: wheelchair,
			admissionEmergency: admissionEmergency,
			admissionRegular: admissionRegular,
			infoPat: infoPat,
			infoFam: infoFam,
			infoOld: infoOld,
			infoOther: infoOther,
			infoConsent: infoConsent,
			infoRelative: infoRelative,
			vitalT: vitalT,
			vitalP: vitalP,
			vitalR: vitalR,
			vitalBp1: vitalBp1,
			vitalBp2: vitalBp2,
			vitalSp: vitalSp,
			admittingDiagnosis: admittingDiagnosis,
			allergyDrug: allergyDrug,
			allergyFood: allergyFood,
			allergyOther: allergyOther,
			admittingComplaint: admittingComplaint,
			patHD: patHD,
			patHyp: patHyp,
			patAst: patAst,
			patTB: patTB,
			patCan: patCan,
			patAI: patAI,
			patDia: patDia,
			patKid: patKid,
			patStroke: patStroke,
			patUL: patUL,
			patEP: patEP,
			patLung: patLung,
			patSeizures: patSeizures,
			patHepa: patHepa,
			patTU: patTU,
			patOther: patOther,
			patSurgery: patSurgery,
			famHD: famHD,
			famHyp: famHyp,
			famAst: famAst,
			famTB: famTB,
			famCan: famCan,
			famAI: famAI,
			famDia: famDia,
			famKid: famKid,
			famStroke: famStroke,
			famUL: famUL,
			famEP: famEP,
			famLung: famLung,
			famSeizures: famSeizures,
			famHepa: famHepa,
			famTU: famTU,
			famOther: famOther,
			famSurgery: famSurgery,
			maritialStatus: maritialStatus,
			livesWith: livesWith,
			occupation: occupation,
			activity: activity,
			emoStatus: emoStatus,
			usualFeeding: usualFeeding,
			usualBathing: usualBathing,
			usualToileting: usualToileting,
			usualGeneral: usualGeneral,
			usualDressing: usualDressing,
			admsFeeding: admsFeeding,
			admsBathing: admsBathing,
			admsToileting: admsToileting,
			admsGeneral: admsGeneral,
			admsDressing: admsDressing
			});
	    
	  Nursingobj01 = JSON.stringify(Nursingobj01);
	    var inputs = [];
	    inputs.push('Nursingobj01=' + Nursingobj01);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingstation/saveNursingAssessment01",
		
			success : function(response) {
				alert(response);
				//fetchNursingAssesmentpage1();
				fetchNursingAssesmentnew1();
			}
		});
}


function fetchNursingAssesmentnew1(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingtransaction/fetchNursingAssesment1",
			
			success : function(response) {
				
				$("#idForintialass1").val(response.nursinglist[0].idNursingInitialAssessment);
			
			if(response.nursinglist[0].bandOn==1){
				$("#idBandYes").prop("checked", "checked");
			}else{
				$("#idBandNo").prop("checked", "checked");
			}
			if(response.nursinglist[0].call==1){
				$("#idCallYes").prop("checked", "checked");
			}else{
				$("#idCallNo").prop("checked", "checked");
			}
			$("#idHt").val(response.nursinglist[0].ht);
			$("#idWt").val(response.nursinglist[0].wt);
			if(response.nursinglist[0].ambulatory==1){
				$("#idAmbulatory").prop("checked", "checked");
			}
			if(response.nursinglist[0].strecher==1){
				$("#idStrecher").prop("checked", "checked");
			}
			if(response.nursinglist[0].wheelchair==1){
				$("#idWheelchair").prop("checked", "checked");
			}
			if(response.nursinglist[0].admissionEmergency==1){
				$("#idEmer").prop("checked", "checked");
			}
			if(response.nursinglist[0].admissionRegular==1){
				$("#idReg").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoPat==1){
				$("#idInfoPat").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoFam==1){
				$("#idInfoFam").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoOld==1){
				$("#idInfoOld").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoOther==1){
				$("#idInfoOther").prop("checked", "checked");
			}
			if(response.nursinglist[0].infoConsent==1){
				$("#idInfoConsent").prop("checked", "checked");
			}
			$("#idRalation").val(response.nursinglist[0].infoRelative);
			$("#idT").val(response.nursinglist[0].vitalT);
			$("#idP").val(response.nursinglist[0].vitalP);
			$("#idR").val(response.nursinglist[0].vitalR);
			$("#idBP1").val(response.nursinglist[0].vitalBp1);
			$("#idBP2").val(response.nursinglist[0].vitalBp2);
			$("#idSP").val(response.nursinglist[0].vitalSp);
			$("#idAdmitDia").val(response.nursinglist[0].admittingDiagnosis);
			if(response.nursinglist[0].allergyDrug==1){
				$("#idAlDrug").prop("checked", "checked");
			}
			if(response.nursinglist[0].allergyFood==1){
				$("#idAlFood").prop("checked", "checked");
			}
			if(response.nursinglist[0].allergyOther==1){
				$("#idAlOther").prop("checked", "checked");
			}
			$("#idComplaint").val(response.nursinglist[0].admittingComplaint);
			if(response.nursinglist[0].patHD==1){
				$("#idPHD").prop("checked", "checked");
			}
			if(response.nursinglist[0].patHyp==1){
				$("#idPHyp").prop("checked", "checked");
			}
			if(response.nursinglist[0].patAst==1){
				$("#idPAst").prop("checked", "checked");
			}
			if(response.nursinglist[0].patTB==1){
				$("#idPTB").prop("checked", "checked");
			}
			if(response.nursinglist[0].patCan==1){
				$("#idPCan").prop("checked", "checked");
			}
			if(response.nursinglist[0].patAI==1){
				$("#idPAI").prop("checked", "checked");
			}
			if(response.nursinglist[0].patDia==1){
				$("#idPDia").prop("checked", "checked");
			}
			if(response.nursinglist[0].patKid==1){
				$("#idPKid").prop("checked", "checked");
			}
			if(response.nursinglist[0].patStroke==1){
				$("#idPStroke").prop("checked", "checked");
			}
			if(response.nursinglist[0].patUL==1){
				$("#idPUL").prop("checked", "checked");
			}
			if(response.nursinglist[0].patEP==1){
				$("#idPEP").prop("checked", "checked");
			}
			if(response.nursinglist[0].patLung==1){
				$("#idPLung").prop("checked", "checked");
			}
			if(response.nursinglist[0].patSeizures==1){
				$("#idPSeizures").prop("checked", "checked");
			}
			if(response.nursinglist[0].patHepa==1){
				$("#idPHepa").prop("checked", "checked");
			}
			if(response.nursinglist[0].patTU==1){
				$("#idPTU").prop("checked", "checked");
			}
			$("#idPOther").val(response.nursinglist[0].patOther);
			$("#idPSurgery").val(response.nursinglist[0].patSurgery);
			if(response.nursinglist[0].famHD==1){
				$("#idFHD").prop("checked", "checked");
			}
			if(response.nursinglist[0].famHyp==1){
				$("#idFHyp").prop("checked", "checked");
			}
			if(response.nursinglist[0].famAst==1){
				$("#idFAst").prop("checked", "checked");
			}
			if(response.nursinglist[0].famTB==1){
				$("#idFTB").prop("checked", "checked");
			}
			if(response.nursinglist[0].famCan==1){
				$("#idFCan").prop("checked", "checked");
			}
			if(response.nursinglist[0].famAI==1){
				$("#idFAI").prop("checked", "checked");
			}
			if(response.nursinglist[0].famDia==1){
				$("#idFDia").prop("checked", "checked");
			}
			if(response.nursinglist[0].famKid==1){
				$("#idFKid").prop("checked", "checked");
			}
			if(response.nursinglist[0].famStroke==1){
				$("#idFStroke").prop("checked", "checked");
			}
			if(response.nursinglist[0].famUL==1){
				$("#idFUL").prop("checked", "checked");
			}
			if(response.nursinglist[0].famEP==1){
				$("#idFEP").prop("checked", "checked");
			}
			if(response.nursinglist[0].famLung==1){
				$("#idFLung").prop("checked", "checked");
			}
			if(response.nursinglist[0].famSeizures==1){
				$("#idFSeizures").prop("checked", "checked");
			}
			if(response.nursinglist[0].famHepa==1){
				$("#idFHepa").prop("checked", "checked");
			}
			if(response.nursinglist[0].famTU==1){
				$("#idFTU").prop("checked", "checked");
			}
			$("#idFOther").val(response.nursinglist[0].famOther);
			$("#idFSurgery").val(response.nursinglist[0].famSurgery);
			if(response.nursinglist[0].maritialStatus=="married"){
				$("#idMarried").prop("checked", "checked");
			}else if(response.nursinglist[0].maritialStatus=="widowed"){
				$("#idWidowed").prop("checked", "checked");
			}else if(response.nursinglist[0].maritialStatus=="single"){
				$("#idSingle").prop("checked", "checked");
			}
			if(response.nursinglist[0].livesWith=="family"){
				$("#idLivesWith").prop("checked", "checked");
			}else if(response.nursinglist[0].livesWith=="alone"){
				$("#idLivesALone").prop("checked", "checked");
			}
			if(response.nursinglist[0].occupation=="full"){
				$("#idOccuFull").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="part"){
				$("#idOccuPart").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="retired"){
				$("#idOccuRetaired").prop("checked", "checked");
			}else if(response.nursinglist[0].occupation=="other"){
				$("#idOccuOthr").prop("checked", "checked");
			}
			if(response.nursinglist[0].activity=="ambulatory"){
				$("#ActivityAmb").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="cane"){
				$("#idActivityCane").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="crutches"){
				$("#idActivityCru").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="walker"){
				$("#idActivityWal").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="weelchair"){
				$("#idActivityWheel").prop("checked", "checked");
			}else if(response.nursinglist[0].activity=="bedrest"){
				$("#idActivityBed").prop("checked", "checked");
			}
			if(response.nursinglist[0].emoStatus=="cooperative"){
				$("#idStatusCoop").prop("checked", "checked");
			}else if(response.nursinglist[0].emoStatus=="anxious"){
				$("#idStatusAnx").prop("checked", "checked");
			}else if(response.nursinglist[0].emoStatus=="depressed"){
				$("#idStatusDep").prop("checked", "checked");
			}
			$("#idFeeding").val(response.nursinglist[0].usualFeeding);
			$("#idBathing").val(response.nursinglist[0].usualBathing);
			$("#idToileting").val(response.nursinglist[0].usualToileting);
			$("#idGeneral").val(response.nursinglist[0].usualGeneral);
			$("#idDressing").val(response.nursinglist[0].usualDressing);
			$("#idAdmFeeding").val(response.nursinglist[0].admsFeeding);
			$("#idAdmBathing").val(response.nursinglist[0].admsBathing);
			$("#idAdmToileting").val(response.nursinglist[0].admsToileting);
			$("#idAdmGeneral").val(response.nursinglist[0].admsGeneral);
			$("#idAdmDressing").val(response.nursinglist[0].admsDressing);
		}
		});
}

function saveNursingAssesmentnew2()
{
	var pId1 = $("#pid").val();
	var tId = $("#tr_Id").val();
	var idForintialass2 = $("#idForintialass2").val();
	var Burns = $('input:checkbox[id="idBurns"]');
	var bur="";
	if(Burns.is(':checked') == true){
		bur = 1;
	}else{
		bur = 0;
	}
	var Scar = $('input:checkbox[id=idScar]');
	if(Scar.is(':checked') == true){
		Scar = 1;
	}else{
		Scar = 0;
	}
	var Ulcer = $('input:checkbox[id=idUlcer]');
	if(Ulcer.is(':checked') == true){
		Ulcer = 1;
	}else{
		Ulcer = 0;
	}
	var Laceration = $('input:checkbox[id=idLaceration]');
	if(Laceration.is(':checked') == true){
		Laceration = 1;
	}else{
		Laceration = 0;
	}
	var Rash = $('input:checkbox[id=idRash]');
	if(Rash.is(':checked') == true){
		Rash = 1;
	}else{
		Rash = 0;
	}
	
	var Vulnerability1 = $('input[name=cat1Val]:checked').val();
	if(Vulnerability1==undefined)
	{
		Vulnerability1 = "0";
	}
	var Vulnerability2 = $('input[name=cat2Val]:checked').val();
	if(Vulnerability2==undefined)
	{
		Vulnerability2 = "0";
	}
	var Vulnerability3 = $('input[name=cat3Val]:checked').val();
	if(Vulnerability3==undefined)
	{
		Vulnerability3 = "0";
	}
	var Vulnerability4 = $('input[name=cat4Val]:checked').val();
	if(Vulnerability4==undefined)
	{
		Vulnerability4 = "0";
	}
	var Vulnerability5 = $('input[name=cat5Val]:checked').val();
	if(Vulnerability5==undefined)
	{
		Vulnerability5 = "0";
	}
	var Vulnerability6 = $('input[name=cat6Val]:checked').val();
	if(Vulnerability6==undefined)
	{
		Vulnerability6 = "0";
	}
	var Vulnerability7 = $('input[name=cat7Val]:checked').val();
	if(Vulnerability7==undefined)
	{
		Vulnerability7 = "0";
	}
	var Vulnerability8 = $('input[name=cat8Val]:checked').val();
	if(Vulnerability8==undefined)
	{
		Vulnerability8 = "0";
	}
	var Vulnerability9 = $('input[name=cat9Val]:checked').val();
	if(Vulnerability9==undefined)
	{
		Vulnerability9 = "0";
	}
	var Vulnerability10 = $('input[name=cat10Val]:checked').val();
	if(Vulnerability10==undefined)
	{
		Vulnerability10 = "0";
	}
	var care1 = $('input[name=care1Val]:checked').val();
	if(care1==undefined)
	{
		care1 = "0";
	}
	var care2 = $('input[name=care2Val]:checked').val();
	if(care2==undefined)
	{
		care2 = "0";
	}
	var care3 = $('input[name=care3Val]:checked').val();
	if(care3==undefined)
	{
		care3 = "0";
	}
	var care4 = $('input[name=care4Val]:checked').val();
	if(care4==undefined)
	{
		care4 = "0";
	}
	var care5 = $('input[name=care5Val]:checked').val();
	if(care5==undefined)
	{
		care5 = "0";
	}
	var care6 = $('input[name=care6Val]:checked').val();
	if(care6==undefined)
	{
		care6 = "0";
	}
	var care7 = $('input[name=care7Val]:checked').val();
	if(care7==undefined)
	{
		care7 = "0";
	}
	var care8 = $('input[name=care8Val]:checked').val();
	if(care8==undefined)
	{
		care8 = "0";
	}
	var care9 = $('input[name=care9Val]:checked').val();
	if(care9==undefined)
	{
		care9 = "0";
	}
	var care10 = $('input[name=care10Y]:checked').val();
	if(care10==undefined)
	{
		care10 = "0";
	}
	var tCat = $("#totalCat").val();
	var tCare = $("#totalCare").val();
	var tYes = $("#totalYes").val();
	
	var HighVulnerability = $('input:checkbox[id=idHighVulnerability]');
	if(HighVulnerability.is(':checked') == true){
		HighVulnerability = "1";
	}else{
		HighVulnerability = "0";
	}
	var LowVulnerability = $('input:checkbox[id=idLowVulnerability]');
	if(LowVulnerability.is(':checked') == true){
		LowVulnerability = "1";
	}else{
		LowVulnerability = "0";
	}
	var Lesion = $('input:checkbox[id=idLesion]');
	if(Lesion.is(':checked') == true){
		Lesion = "1";
	}else{
		Lesion = "0";
	}
	var Dental = $('input:checkbox[id=idDental]');
	if(Dental.is(':checked') == true){
		Dental = "1";
	}else{
		Dental = "0";
	}
	var Bleeding = $('input:checkbox[id=idBleeding]');
	if(Bleeding.is(':checked') == true){
		Bleeding = "1";
	}else{
		Bleeding = "0";
	}
	var Taking = $('input:checkbox[id=idTaking]');
	if(Taking.is(':checked') == true){
		Taking = "1";
	}else{
		Taking = "0";
	}
	var MouthSense = $('input:checkbox[id=idMouthSense]');
	if(MouthSense.is(':checked') == true){
		MouthSense = 1;
	}else{
		MouthSense = 0;
	}
	var Dentures = $('input:checkbox[id=idDentures]');
	if(Dentures.is(':checked') == true){
		Dentures = 1;
	}else{
		Dentures = 0;
	}
	var Blurred = $('input:checkbox[id=idBlurred]');
	if(Blurred.is(':checked') == true){
		Blurred = 1;
	}else{
		Blurred = 0;
	}
	var Double = $('input:checkbox[id=idDouble]');
	if(Double.is(':checked') == true){
		Double = 1;
	}else{
		Double = 0;
	}
	var Inflammation = $('input:checkbox[id=idInflammation]');
	if(Inflammation.is(':checked') == true){
		Inflammation = 1;
	}else{
		Inflammation = 0;
	}
	var EyeColour = $('input:checkbox[id="idEyeColour"]');
	if(EyeColour.is(':checked') == true){
		EyeColour = 1;
	}else{
		EyeColour = 0;
	}
	var Itching = $('input:checkbox[id="idItching"]');
	if(Itching.is(':checked') == true){
		Itching = 1;
	}else{
		Itching = 0;
	}
	var Redness = $('input:checkbox[id="idRedness"]');
	if(Redness.is(':checked') == true){
		Redness = 1;
	}else{
		Redness = 0;
	}
	
	var EyePain = $('input[name=idEyePain]:checked').val();
	if(EyePain==undefined)
	{
		EyePain = "0";
	}
	var Pupils = $('input[name=idPupils]:checked').val();
	if(Pupils==undefined)
	{
		Pupils = "0";
	}
	var Deaf = $('input[name=idDeaf]:checked').val();
	if(Deaf==undefined)
	{
		Deaf = "0";
	}
	var Tinnitus = $('input[name=idTinnitus]:checked').val();
	if(Tinnitus==undefined)
	{
		Tinnitus = "0";
	}
	var Dizziness = $('input[name=idDizziness]:checked').val();
	if(Dizziness==undefined)
	{
		Dizziness = "0";
	}
	var EarPain = $('input[name=idEarPain]:checked').val();
	if(EarPain==undefined)
	{
		EarPain = "0";
	}
	var EarSense = $('input[name=idEarSense]:checked').val();
	if(EarSense==undefined)
	{
		EarSense = "0";
	}
	var Drainage = $('input[name=idDrainage]:checked').val();
	if(Drainage==undefined)
	{
		Drainage = "0";
	}
	var NoseBleed = $('input[name=idNoseBleed]:checked').val();
	if(NoseBleed==undefined)
	{
		NoseBleed = "0";
	}
	var NoseCongestion = $('input[name=idNoseCongestion]:checked').val();
	if(NoseCongestion==undefined)
	{
		NoseCongestion = "0";
	}
	
	var NosePain = $('input:checkbox[id=idNosePain]');
	if(NosePain.is(':checked') == true){
		NosePain = 1;
	}else{
		NosePain = 0;
	}
	var NoseSinus = $('input:checkbox[id=idNoseSinus]');
	if(NoseSinus.is(':checked') == true){
		NoseSinus = 1;
	}else{
		NoseSinus = 0;
	}
	var NoseDrainage = $('input:checkbox[id=idNoseDrainage]');
	if(NoseDrainage.is(':checked') == true){
		NoseDrainage = 1;
	}else{
		NoseDrainage = 0;
	}
	var ThroatSore = $('input:checkbox[id=idThroatSore]');
	if(ThroatSore.is(':checked') == true){
		ThroatSore = 1;
	}else{
		ThroatSore = 0;
	}
	var ThroatHoarseness = $('input:checkbox[id=idThroatHoarseness]');
	if(ThroatHoarseness.is(':checked') == true){
		ThroatHoarseness = 1;
	}else{
		ThroatHoarseness = 0;
	}
	var ThroatLumps = $('input:checkbox[id=idThroatLumps]');
	if(ThroatLumps.is(':checked') == true){
		ThroatLumps = 1;
	}else{
		ThroatLumps = 0;
	}
	var ThroatSwollen = $('input:checkbox[id=idThroatSwollen]');
	if(ThroatSwollen.is(':checked') == true){
		ThroatSwollen = 1;
	}else{
		ThroatSwollen = 0;
	}
	var ThroatStiffness = $('input:checkbox[id=idThroatStiffness]');
	if(ThroatStiffness.is(':checked') == true){
		ThroatStiffness = 1;
	}else{
		ThroatStiffness = 0;
	}
	var ThroatPain = $('input:checkbox[id=idThroatPain]');
	if(ThroatPain.is(':checked') == true){
		ThroatPain = 1;
	}else{
		ThroatPain = 0;
	}
	var ThroatDysphagia = $('input:checkbox[id=idThroatDysphagia]');
	if(ThroatDysphagia.is(':checked') == true){
		ThroatDysphagia = 1;
	}else{
		ThroatDysphagia = 0;
	}
	var BowelDiarrhoea = $('input:checkbox[id=idBowelDiarrhoea]');
	if(BowelDiarrhoea.is(':checked') == true){
		BowelDiarrhoea = 1;
	}else{
		BowelDiarrhoea = 0;
	}
	var BowelConstipation = $('input:checkbox[id=idBowelConstipation]');
	if(BowelConstipation.is(':checked') == true){
		BowelConstipation = 1;
	}else{
		BowelConstipation = 0;
	}
	var BowelIncontinence = $('input:checkbox[id="idBowelIncontinence"]');
	if(BowelIncontinence.is(':checked') == true){
		BowelIncontinence = 1;
	}else{
		BowelIncontinence = 0;
	}
	var BowelBlood = $('input:checkbox[id="idBowelBlood"]');
	if(BowelBlood.is(':checked') == true){
		BowelBlood = 1;
	}else{
		BowelBlood = 0;
	}
	
	var BowelNone = $('input:checkbox[id=idBowelNone]');
	if(BowelNone.is(':checked') == true){
		BowelNone = 1;
	}else{
		BowelNone = 0;
	}
	var BowelPain = $('input:checkbox[id="idBowelPain"]');
	if(BowelPain.is(':checked') == true){
		BowelPain = 1;
	}else{
		BowelPain = 0;
	}
	var BowelHemorrhoids = $('input:checkbox[id="idBowelHemorrhoids"]');
	if(BowelHemorrhoids.is(':checked') == true){
		BowelHemorrhoids = 1;
	}else{
		BowelHemorrhoids = 0;
	}
	
	var BowelInterNone = $('input:checkbox[id="idBowelInterNone"]');
	if(BowelInterNone.is(':checked') == true){
		BowelInterNone = 1;
	}else{
		BowelInterNone = 0;
	}
	var BowelLaxatives = $('input:checkbox[id="idBowelLaxatives"]');
	if(BowelLaxatives.is(':checked') == true){
		BowelLaxatives = 1;
	}else{
		BowelLaxatives = 0;
	}
	
	var Injuries = $("#idInjuries").val();
	var MouthOther = $("#idMouthOther").val();
	var EyeOther = $("#idEyeOther").val();
	var EarColour = $("#idEarColour").val();
	var EarOther = $("#idEarOther").val();
	var NoseColour = $("#idNoseColour").val();
	var NoseOther = $("#idNoseOther").val();
	var ThroatOther = $("#idThroatOther").val();
	var BowelFrequency = $("#idBowelFrequency").val();
	var BowelInterType = $("#idBowelInterType").val();
	var BowelInterFrequency = $("#idBowelInterFrequency").val();
	
	
	var Nursingobj02 = {
			  nursinglist02 : []
	        };
	  Nursingobj02.nursinglist02.push({
	    	pId:pId1,
	    	tId :tId ,
	    	idNursingSecondAssessment: idForintialass2,
	    	Burns: bur,
	    	Scar: Scar,
	    	Ulcer: Ulcer,
	    	Laceration: Laceration,
	    	Rash: Rash,
	    	Vulnerability1: Vulnerability1,
	    	Vulnerability2: Vulnerability2,
	    	Vulnerability3: Vulnerability3,
	    	Vulnerability4: Vulnerability4,
	    	Vulnerability5: Vulnerability5,
	    	Vulnerability6: Vulnerability6,
	    	Vulnerability7: Vulnerability7,
	    	Vulnerability8: Vulnerability8,
	    	Vulnerability9: Vulnerability9,
	    	Vulnerability10: Vulnerability10,
	    	care1: care1,
	    	care2: care2,
	    	care3: care3,
	    	care4: care4,
	    	care5: care5,
	    	care6: care6,
	    	care7: care7,
	    	care8: care8,
	    	care9: care9,
	    	care10: care10,
	    	tCat: tCat,
	    	tCare: tCare,
	    	tYes: tYes,
	    	HighVulnerability: HighVulnerability,
	    	LowVulnerability: LowVulnerability,
	    	Lesion: Lesion,
	    	Dental: Dental,
	    	Bleeding: Bleeding,
	    	Taking: Taking,
	    	MouthSense: MouthSense,
	    	Dentures: Dentures,
	    	Blurred: Blurred,
	    	Double1: Double,
	    	Inflammation: Inflammation,
	    	EyeColour: EyeColour,
	    	Itching: Itching,
	    	Redness: Redness,
	    	EyePain: EyePain,
	    	Pupils: Pupils,
	    	Deaf: Deaf,
	    	Tinnitus: Tinnitus,
	    	Dizziness: Dizziness,
	    	EarPain: EarPain,
	    	EarSense: EarSense,
	    	Drainage: Drainage,
	    	NoseBleed: NoseBleed,
	    	NoseCongestion: NoseCongestion,
	    	NosePain: NosePain,
	    	NoseSinus: NoseSinus,
	    	NoseDrainage: NoseDrainage,
	    	ThroatSore: ThroatSore,
	    	ThroatHoarseness: ThroatHoarseness,
	    	ThroatLumps: ThroatLumps,
	    	ThroatSwollen: ThroatSwollen,
	    	ThroatStiffness: ThroatStiffness,
	    	ThroatPain: ThroatPain,
	    	ThroatDysphagia: ThroatDysphagia,
	    	BowelDiarrhoea: BowelDiarrhoea,
	    	BowelConstipation: BowelConstipation,
	    	BowelIncontinence: BowelIncontinence,
	    	BowelBlood: BowelBlood,
	    	BowelNone: BowelNone,
	    	BowelPain: BowelPain,
	    	BowelHemorrhoids: BowelHemorrhoids,
	    	BowelInterNone: BowelInterNone,
	    	BowelLaxatives: BowelLaxatives,
	    	
	    	Injuries: Injuries,
	    	MouthOther: MouthOther,
	    	EyeOther: EyeOther,
	    	EarColour: EarColour,
	    	EarOther : EarOther,
	    	NoseColour: NoseColour,
	    	NoseOther: NoseOther,
	    	ThroatOther: ThroatOther,
	    	BowelFrequency: BowelFrequency,
	    	BowelInterType: BowelInterType,
	    	BowelInterFrequency: BowelInterFrequency,
	    	
		});
	    //	}
	    
	  Nursingobj02 = JSON.stringify(Nursingobj02);
	    var inputs = [];
	    inputs.push('Nursingobj02=' + Nursingobj02);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			//dataType	: 'json',
			//contentType	: 'application/json',
			data : str + "&reqType=AJAX",
			//data : Nursingobj02,
			url : "ehat/nursingtransaction/saveNursingAssessment02",
		
			success : function(response) {
				alert(response);
				fetchNursingAssesmentnew2();
			}
		});
	
}


function fetchNursingAssesmentnew2(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingtransaction/fetchNursingAssesment2",
			
			success : function(response) {
				
				$("#idForintialass2").val(response.nursinglist02[0].idNursingSecondAssessment);
				
				
				var cntCat = 0;
				var catCare = 0;
				
				if(response.nursinglist02[0].burns==1){
					$("#idBurns").prop("checked", "checked");
				}
				if(response.nursinglist02[0].scar==1){
					$("#idScar").prop("checked", "checked");
				}
				if(response.nursinglist02[0].ulcer==1){
					$("#idUlcer").prop("checked", "checked");
				}
				if(response.nursinglist02[0].laceration==1){
					$("#idLaceration").prop("checked", "checked");
				}
				if(response.nursinglist02[0].rash==1){
					$("#idRash").prop("checked", "checked");
				}
				
				/*if(response.nursinglist02[0].vulnerability1=="yes"){
                    $("#cat1Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability1=="no"){
                    $("#cat1N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability2=="yes"){
                    $("#cat2Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability2=="no"){
                    $("#cat2N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability3=="yes"){
                    $("#cat3Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability3=="no"){
                    $("#cat3N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability4=="yes"){
                    $("#cat4Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability4=="no"){
                    $("#cat4N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability5=="yes"){
                    $("#cat5Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability5=="no"){
                    $("#cat5N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability6=="yes"){
                    $("#cat6Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability6=="no"){
                    $("#cat6N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability7=="yes"){
                    $("#cat7Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability7=="no"){
                    $("#cat7N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability8=="yes"){
                    $("#cat8Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability8=="no"){
                    $("#cat8N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability9=="yes"){
                    $("#cat9Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability9=="no"){
                    $("#cat9N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability10=="yes"){
                    $("#cat10Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].vulnerability10=="no"){
                    $("#cat10N").prop("checked", "checked");
                }*/
				
				if(response.nursinglist02[0].vulnerability1=="yes"){
                    $("#cat1Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat1N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability2=="yes"){
                    $("#cat2Y").prop("checked", "checked");
                    cntCat++;
                }else{
                    $("#cat2N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability3=="yes"){
                    $("#cat3Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat3N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability4=="yes"){
                    $("#cat4Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat4N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability5=="yes"){
                    $("#cat5Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat5N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability6=="yes"){
                    $("#cat6Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat6N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability7=="yes"){
                    $("#cat7Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat7N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability8=="yes"){
                    $("#cat8Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat8N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability9=="yes"){
                    $("#cat9Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat9N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].vulnerability10=="yes"){
                    $("#cat10Y").prop("checked", "checked");
                    cntCat++;
                }else {
                    $("#cat10N").prop("checked", "checked");
                }
				
				
				
				/*if(response.nursinglist02[0].care1=="yes"){
                    $("#care1Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care1=="no"){
                    $("#care1N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care2=="yes"){
                    $("#care2Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care2=="no"){
                    $("#care2N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care3=="yes"){
                    $("#care3Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care3=="no"){
                    $("#care3N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care4=="yes"){
                    $("#care4Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care4=="no"){
                    $("#care4N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care5=="yes"){
                    $("#care5Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care5=="no"){
                    $("#care5N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care6=="yes"){
                    $("#care6Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care6=="no"){
                    $("#care6N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care7=="yes"){
                    $("#care7Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care7=="no"){
                    $("#care7N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care8=="yes"){
                    $("#care8Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care8=="no"){
                    $("#care8N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care9=="yes"){
                    $("#care9Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care9=="no"){
                    $("#care9N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care10=="yes"){
                    $("#care10Y").prop("checked", "checked");
                }else if(response.nursinglist02[0].care10=="no"){
                    $("#care10N").prop("checked", "checked");
                }*/
				
				if(response.nursinglist02[0].care1=="yes"){
                    $("#care1Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care1N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care2=="yes"){
                    $("#care2Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care2N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care3=="yes"){
                    $("#care3Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care3N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care4=="yes"){
                    $("#care4Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care4N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care5=="yes"){
                    $("#care5Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care5N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care6=="yes"){
                    $("#care6Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care6N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care7=="yes"){
                    $("#care7Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care7N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care8=="yes"){
                    $("#care8Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care8N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care9=="yes"){
                    $("#care9Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care9N").prop("checked", "checked");
                }
				if(response.nursinglist02[0].care10=="yes"){
                    $("#care10Y").prop("checked", "checked");
                    catCare++;
                }else {
                    $("#care10N").prop("checked", "checked");
                }
				
				if(response.nursinglist02[0].HighVulnerability==1){
                    $("#idHighVulnerability").prop("checked", "checked");
              }
				if(response.nursinglist02[0].LowVulnerability==1){
                    $("#idLowVulnerability").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Lesion==1){
                    $("#idLesion").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Dental==1){
                    $("#idDental").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Bleeding==1){
                    $("#idBleeding").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Taking==1){
                    $("#idTaking").prop("checked", "checked");
              }
				if(response.nursinglist02[0].MouthSense==1){
                    $("#idMouthSense").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Dentures==1){
                    $("#idDentures").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Blurred==1){
                    $("#idBlurred").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Double1==1){
                    $("#idDouble").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Inflammation==1){
                    $("#idInflammation").prop("checked", "checked");
              }
				if(response.nursinglist02[0].EyeColour==1){
                    $("#idEyeColour").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Itching==1){
                    $("#idItching").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Redness==1){
                    $("#idRedness").prop("checked", "checked");
              }
				if(response.nursinglist02[0].EyePain==1){
                    $("#idEyePain").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Pupils==1){
                    $("#idPupils").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Deaf==1){
                    $("#idDeaf").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Tinnitus==1){
                    $("#idTinnitus").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Dizziness==1){
                    $("#idDizziness").prop("checked", "checked");
              }
				if(response.nursinglist02[0].EarPain==1){
                    $("#idEarPain").prop("checked", "checked");
              }
				if(response.nursinglist02[0].EarSense==1){
                    $("#idEarSense").prop("checked", "checked");
              }
				if(response.nursinglist02[0].Drainage==1){
                    $("#idDrainage").prop("checked", "checked");
              }
				if(response.nursinglist02[0].NoseBleed==1){
                    $("#idNoseBleed").prop("checked", "checked");
              }
				if(response.nursinglist02[0].NoseCongestion==1){
                    $("#idNoseCongestion").prop("checked", "checked");
              }
				if(response.nursinglist02[0].NosePain==1){
                    $("#idNosePain").prop("checked", "checked");
              }
				if(response.nursinglist02[0].NoseSinus==1){
                    $("#idNoseSinus").prop("checked", "checked");
              }
				if(response.nursinglist02[0].NoseDrainage==1){
                    $("#idNoseDrainage").prop("checked", "checked");
              }if(response.nursinglist02[0].ThroatSore==1){
                    $("#idThroatSore").prop("checked", "checked");
              }
              if(response.nursinglist02[0].ThroatHoarseness==1){
                  $("#idThroatHoarseness").prop("checked", "checked");
            }
              if(response.nursinglist02[0].ThroatLumps==1){
                  $("#idThroatLumps").prop("checked", "checked");
            }
              if(response.nursinglist02[0].ThroatSwollen==1){
                  $("#idThroatSwollen").prop("checked", "checked");
            }
              if(response.nursinglist02[0].ThroatStiffness==1){
                  $("#idThroatStiffness").prop("checked", "checked");
            }
              if(response.nursinglist02[0].ThroatPain==1){
                $("#idThroatPain").prop("checked", "checked");
            }
              
              if(response.nursinglist02[0].ThroatDysphagia==1){
                  $("#idThroatDysphagia").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelDiarrhoea==1){
                  $("#idBowelDiarrhoea").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelConstipation==1){
                  $("#idBowelConstipation").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelIncontinence==1){
                  $("#idBowelIncontinence").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelBlood==1){
                  $("#idBowelBlood").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelNone==1){
                  $("#idBowelNone").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelPain==1){
                  $("#idBowelPain").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelHemorrhoids==1){
                  $("#idBowelHemorrhoids").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelInterNone==1){
                  $("#idBowelInterNone").prop("checked", "checked");
              }
              if(response.nursinglist02[0].BowelLaxatives==1){
                  $("#idBowelLaxatives").prop("checked", "checked");
              }
              
           // $("#totalCat").val(response.nursinglist02[0].tCat);
    	   //$("#totalCare").val(response.nursinglist02[0].tCare);
           //   $("#totalYes").val(response.nursinglist02[0].tYes);
            $("#totalCat").val(cntCat);
            $("#totalCare").val(catCare);
    		$("#totalYes").val(catCare);
    			
            $("#idInjuries").val(response.nursinglist02[0].injuries);
  			$("#idMouthOther").val(response.nursinglist02[0].mouthOther);
  			$("#idEyeOther").val(response.nursinglist02[0].eyeOther);
  			$("#idEarColour").val(response.nursinglist02[0].earColour);
  			$("#idEarOther").val(response.nursinglist02[0].earOther);
  			$("#idNoseColour").val(response.nursinglist02[0].noseColour);
  			$("#idNoseOther").val(response.nursinglist02[0].noseOther);
  			$("#idThroatOther").val(response.nursinglist02[0].throatOther);
  			$("#idBowelFrequency").val(response.nursinglist02[0].bowelFrequency);
  			$("#idBowelInterType").val(response.nursinglist02[0].bowelInterType);
  			$("#idBowelInterFrequency").val(response.nursinglist02[0].bowelInterFrequency);
             				
				}
		});
}


function saveNursingAssesment3()
{
	var pId1 = $("#pid").val();
	var tId = $("#tr_Id").val();
	var idForintialass3 = $("#idForintialass3").val();
	var GasAppetite = $('input:checkbox[id="idGasAppetite"]');
	if(GasAppetite.is(':checked') == true){
		GasAppetite = 1;
	}else{
		GasAppetite = 0;
	}
	var GasNausea = $('input:checkbox[id=idGasNausea]');
	if(GasNausea.is(':checked') == true){
		GasNausea = 1;
	}else{
		GasNausea = 0;
	}
	var GasVomiting = $('input:checkbox[id=idGasVomiting]');
	if(GasVomiting.is(':checked') == true){
		GasVomiting = 1;
	}else{
		GasVomiting = 0;
	}
	var GasDistension = $('input:checkbox[id=idGasDistension]');
	if(GasDistension.is(':checked') == true){
		GasDistension = 1;
	}else{
		GasDistension = 0;
	}
	var GasHeart = $('input:checkbox[id=idGasHeart]');
	if(GasHeart.is(':checked') == true){
		GasHeart = 1;
	}else{
		GasHeart = 0;
	}
	var GasFlatus = $('input:checkbox[id="idGasFlatus"]');
	if(GasFlatus.is(':checked') == true){
		GasFlatus = 1;
	}else{
		GasFlatus = 0;
	}
	var GasPain = $('input:checkbox[id=idGasPain]');
	if(GasPain.is(':checked') == true){
		GasPain = 1;
	}else{
		GasPain = 0;
	}
	var GasRectal = $('input:checkbox[id=idGasRectal]');
	if(GasRectal.is(':checked') == true){
		GasRectal = 1;
	}else{
		GasRectal = 0;
	}
	var GasColostomy = $('input:checkbox[id=idGasColostomy]');
	if(GasColostomy.is(':checked') == true){
		GasColostomy = 1;
	}else{
		GasColostomy = 0;
	}
	var GasIlleostomy = $('input:checkbox[id=idGasIlleostomy]');
	if(GasIlleostomy.is(':checked') == true){
		GasIlleostomy = 1;
	}else{
		GasIlleostomy = 0;
	}
	var UrinePain = $('input:checkbox[id="idUrinePain"]');
	if(UrinePain.is(':checked') == true){
		UrinePain = 1;
	}else{
		UrinePain = 0;
	}
	var UrineBurning = $('input:checkbox[id=idUrineBurning]');
	if(UrineBurning.is(':checked') == true){
		UrineBurning = 1;
	}else{
		UrineBurning = 0;
	}
	var UrineItching = $('input:checkbox[id=idUrineItching]');
	if(UrineItching.is(':checked') == true){
		UrineItching = 1;
	}else{
		UrineItching = 0;
	}
	var UrineUrgency = $('input:checkbox[id=idUrineUrgency]');
	if(UrineUrgency.is(':checked') == true){
		UrineUrgency = 1;
	}else{
		UrineUrgency = 0;
	}
	var UrineIncontinence = $('input:checkbox[id=idUrineIncontinence]');
	if(UrineIncontinence.is(':checked') == true){
		UrineIncontinence = 1;
	}else{
		UrineIncontinence = 0;
	}
	var UrineNocturia = $('input:checkbox[id="idUrineNocturia"]');
	if(UrineNocturia.is(':checked') == true){
		UrineNocturia = 1;
	}else{
		UrineNocturia = 0;
	}
	var UrineUrostomy = $('input:checkbox[id=idUrineUrostomy]');
	if(UrineUrostomy.is(':checked') == true){
		UrineUrostomy = 1;
	}else{
		UrineUrostomy = 0;
	}
	var UrineHistory = $('input:checkbox[id=idUrineHistory]');
	if(UrineHistory.is(':checked') == true){
		UrineHistory = 1;
	}else{
		UrineHistory = 0;
	}
	var UrineHistoryUTI = $('input:checkbox[id=idUrineHistoryUTI]');
	if(UrineHistoryUTI.is(':checked') == true){
		UrineHistoryUTI = 1;
	}else{
		UrineHistoryUTI = 0;
	}
	var UrineFoley = $('input:checkbox[id=idUrineFoley]');
	if(UrineFoley.is(':checked') == true){
		UrineFoley = 1;
	}else{
		UrineFoley = 0;
	}
	
	var MusTingling = $('input:checkbox[id="idMusTingling"]');
	if(MusTingling.is(':checked') == true){
		MusTingling = 1;
	}else{
		MusTingling = 0;
	}
	var MusWeakness = $('input:checkbox[id=idMusWeakness]');
	if(MusWeakness.is(':checked') == true){
		MusWeakness = 1;
	}else{
		MusWeakness = 0;
	}
	var MusDeformity = $('input:checkbox[id=idMusDeformity]');
	if(MusDeformity.is(':checked') == true){
		MusDeformity = 1;
	}else{
		MusDeformity = 0;
	}
	var MusPain = $('input:checkbox[id=idMusPain]');
	if(MusPain.is(':checked') == true){
		MusPain = 1;
	}else{
		MusPain = 0;
	}
	var MusStiffness = $('input:checkbox[id=idMusStiffness]');
	if(MusStiffness.is(':checked') == true){
		MusStiffness = 1;
	}else{
		MusStiffness = 0;
	}
	
	var ReproMeno = $('input:checkbox[id="idReproMeno"]');
	if(ReproMeno.is(':checked') == true){
		ReproMeno = 1;
	}else{
		ReproMeno = 0;
	}
	var ReproDysme = $('input:checkbox[id=idReproDysme]');
	if(ReproDysme.is(':checked') == true){
		ReproDysme = 1;
	}else{
		ReproDysme = 0;
	}
	var ReproAmeno = $('input:checkbox[id=idReproAmeno]');
	if(ReproAmeno.is(':checked') == true){
		ReproAmeno = 1;
	}else{
		ReproAmeno = 0;
	}
	var ReproVaginal = $('input:checkbox[id=idReproVaginal]');
	if(ReproVaginal.is(':checked') == true){
		ReproVaginal = 1;
	}else{
		ReproVaginal = 0;
	}
	var ReproItching = $('input:checkbox[id=idReproItching]');
	if(ReproItching.is(':checked') == true){
		ReproItching = 1;
	}else{
		ReproItching = 0;
	}
	
	var CVSDiscomfort = $('input:checkbox[id=idCVSDiscomfort]');
	if(CVSDiscomfort.is(':checked') == true){
		CVSDiscomfort = 1;
	}else{
		CVSDiscomfort = 0;
	}
	var CVSOedema = $('input:checkbox[id=idCVSOedema]');
	if(CVSOedema.is(':checked') == true){
		CVSOedema = 1;
	}else{
		CVSOedema = 0;
	}
	var BreastFeeding = $('input:checkbox[id=idBreastFeeding]');
	if(BreastFeeding.is(':checked') == true){
		BreastFeeding = 1;
	}else{
		BreastFeeding = 0;
	}
	var BreastLumps = $('input:checkbox[id=idBreastLumps]');
	if(BreastLumps.is(':checked') == true){
		BreastLumps = 1;
	}else{
		BreastLumps = 0;
	}
	var PainAssvar = $('input:checkbox[id=idPainAssvar]');
	if(PainAssvar.is(':checked') == true){
		PainAssvar = 1;
	}else{
		PainAssvar = 0;
	}
	
	var MusValSkin = $('input[name=MusValSkin]:checked').val();
	if(MusValSkin==undefined)
	{
		MusValSkin = "0";
	}
	var MusValUses = $('input[name=MusValUses]:checked').val();
	if(MusValUses==undefined)
	{
		MusValUses = "0";
	}
	var neurologiocal = $('input[name=neurologiocal]:checked').val();
	if(neurologiocal==undefined)
	{
		neurologiocal = "0";
	}
	var neurologiocalPsy = $('input[name=neurologiocalPsy]:checked').val();
	if(neurologiocalPsy==undefined)
	{
		neurologiocalPsy = "0";
	}
	var neurologiocalPupils = $('input[name=neurologiocalPupils]:checked').val();
	if(neurologiocalPupils==undefined)
	{
		neurologiocalPupils = "0";
	}
	var neuAlert = $('input[name=neuAlert]:checked').val();
	if(neuAlert==undefined)
	{
		neuAlert = "0";
	}
	var neuSpeech = $('input[name=neuSpeech]:checked').val();
	if(neuSpeech==undefined)
	{
		neuSpeech = "0";
	}
	var painAssessment = $('input[name=painAssessment]:checked').val();
	if(painAssessment==undefined)
	{
		painAssessment = "0";
	}
	var painRelivering = $('input[name=painRelivering]:checked').val();
	if(painRelivering==undefined)
	{
		painRelivering = "0";
	}
	var dailyRoutine = $('input[name=dailyRoutine]:checked').val();
	if(dailyRoutine==undefined)
	{
		dailyRoutine = "0";
	}
	var sleep = $('input[name=sleep]:checked').val();
	if(sleep==undefined)
	{
		sleep = "0";
	}
	
	var UrineColour = $("#idUrineColour").val();
	var UrineFrequency = $("#idUrineFrequency").val();
	var UrineInsertion = $("#idUrineInsertion").val();
	var MusColour = $("#idMusColour").val();
	var ReproLMP = $("#idReproLMP").val();
	var ReproMenoDura = $("#idReproMenoDura").val();
	var ReproAmenoDura = $("#idReproAmenoDura").val();
	var ReproOther = $("#idReproOther").val();
	var MusOther = $("#idMusOther").val();
	var CVSOedemaLoca = $("#idCVSOedemaLoca").val();
	var CVSOther = $("#idCVSOther").val();
	var BreastOther = $("#idBreastOther").val();
	var NeuPsych = $("#idNeuPsych").val();
	var NeuPupils = $("#idNeuPupils").val();
	
	var NeuDeviation = $("#idNeuDeviation").val();
	var NeuLOCOther = $("#idNeuLOCOther").val();
	var NeuGrips = $("#idNeuGrips").val();
	var NeuFoot = $("#idNeuFoot").val();
	var NeuGag = $("#idNeuGag").val();
	var NeuOther = $("#idNeuOther").val();
	var PainAssLocation = $("#idPainAssLocation").val();
	var PainAssDuration = $("#idPainAssDuration").val();
	var ExaFactor = $("#idExaFactor").val();
	var PainCauses = $("#idPainCauses").val();
	var PainScale = $("#idPainScale").val();
	var Plans = $("#idPlans").val();
	
	var Nursingobj03 = {
			  nursinglist03 : []
	        };
	  Nursingobj03.nursinglist03.push({
	    	pId:pId1,
	    	tId :tId ,
	    	idNursingThreeAssessment: idForintialass3,
	    	GasAppetite: GasAppetite,
	    	GasNausea: GasNausea,
	    	GasVomiting: GasVomiting,
	    	GasDistension: GasDistension,
	    	GasHeart: GasHeart,
	    	GasFlatus: GasFlatus,
	    	GasPain: GasPain,
	    	GasRectal: GasRectal,
	    	GasColostomy: GasColostomy,
	    	UrinePain: UrinePain,
	    	UrineBurning: UrineBurning,
	    	UrineItching: UrineItching,
	    	UrineUrgency: UrineUrgency,
	    	UrineIncontinence: UrineIncontinence,
	    	UrineNocturia: UrineNocturia,
	    	UrineUrostomy: UrineUrostomy,
	    	UrineHistory: UrineHistory,
	    	UrineHistoryUTI: UrineHistoryUTI,
	    	UrineFoley: UrineFoley,
	    	MusTingling: MusTingling,
	    	MusWeakness: MusWeakness,
	    	MusDeformity: MusDeformity,
	    	MusPain: MusPain,
	    	MusStiffness: MusStiffness,
	    	ReproMeno: ReproMeno,
	    	ReproDysme: ReproDysme,
	    	ReproAmeno: ReproAmeno,
	    	ReproVaginal: ReproVaginal,
	    	ReproItching: ReproItching,
	    	CVSDiscomfort: CVSDiscomfort,
	    	CVSOedema: CVSOedema,
	    	BreastFeeding: BreastFeeding,
	    	BreastLumps: BreastLumps,
	    	PainAssvar: PainAssvar,
	    	MusValSkin: MusValSkin,
	    	MusValUses: MusValUses,
	    	neurologiocal: neurologiocal,
	    	neurologiocalPsy: neurologiocalPsy,
	    	neurologiocalPupils: neurologiocalPupils,
	    	neuAlert: neuAlert,
	    	neuSpeech: neuSpeech,
	    	painAssessment: painAssessment,
	    	painRelivering: painRelivering,
	    	dailyRoutine: dailyRoutine,
	    	sleep: sleep,
	    	UrineColour: UrineColour,
	    	UrineFrequency: UrineFrequency,
	    	UrineInsertion: UrineInsertion,
	    	MusColour: MusColour,
	    	ReproLMP: ReproLMP,
	    	ReproMenoDura: ReproMenoDura,
	    	ReproAmenoDura: ReproAmenoDura,
	    	ReproOther: ReproOther,
	    	MusOther: MusOther,
	    	CVSOedemaLoca: CVSOedemaLoca,
	    	CVSOther: CVSOther,
	    	BreastOther: BreastOther,
	    	NeuPsych: NeuPsych,
	    	NeuPupils: NeuPupils,
	    	NeuDeviation: NeuDeviation,
	    	NeuLOCOther: NeuLOCOther,
	    	NeuGrips: NeuGrips,
	    	NeuFoot: NeuFoot,
	    	NeuGag: NeuGag,
	    	NeuOther: NeuOther,
	    	PainAssLocation: PainAssLocation,
	    	PainAssDuration: PainAssDuration,
	    	ExaFactor: ExaFactor,
	    	PainCauses: PainCauses,
	    	PainScale: PainScale,
	    	Plans: Plans
	    	
		});
	    
	  Nursingobj03 = JSON.stringify(Nursingobj03);
	    var inputs = [];
	    inputs.push('Nursingobj03=' + Nursingobj03);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/nursingtransaction/saveNursingAssessment03",
		
			success : function(response) {
				alert(response);
				fetchNursingAssesment3();
			}
		});
	
}

function fetchNursingAssesment3(){
	
	var pId1 = $("#pid").val();
    var tId = $("#tr_Id").val();
    var inputs = [];
		inputs.push('pId=' + pId1);
		inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/nursingtransaction/fetchNursingAssesment3",
			
			success : function(response) {
				
				$("#idForintialass3").val(response.nursinglist03[0].idNursingThreeAssessment);
				
				
				
				if(response.nursinglist03[0].GasAppetite==1){
					$("#idGasAppetite").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasNausea==1){
					$("#idGasNausea").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasVomiting==1){
					$("#idGasVomiting").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasDistension==1){
					$("#idGasDistension").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasHeart==1){
					$("#idGasHeart").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasFlatus==1){
					$("#idGasFlatus").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasPain==1){
					$("#idGasPain").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasRectal==1){
					$("#idGasRectal").prop("checked", "checked");
				}
				if(response.nursinglist03[0].GasColostomy==1){
					$("#idGasColostomy").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrinePain==1){
					$("#idUrinePain").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineBurning==1){
					$("#idUrineBurning").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineItching==1){
					$("#idUrineItching").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineUrgency==1){
					$("#idUrineUrgency").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineIncontinence==1){
					$("#idUrineIncontinence").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineNocturia==1){
					$("#idUrineNocturia").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineUrostomy==1){
					$("#idUrineUrostomy").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineHistory==1){
					$("#idUrineHistory").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineHistoryUTI==1){
					$("#idUrineHistoryUTI").prop("checked", "checked");
				}
				if(response.nursinglist03[0].UrineFoley==1){
					$("#idUrineFoley").prop("checked", "checked");
				}
				if(response.nursinglist03[0].MusTingling==1){
					$("#idMusTingling").prop("checked", "checked");
				}
				if(response.nursinglist03[0].MusWeakness==1){
					$("#idMusWeakness").prop("checked", "checked");
				}
				if(response.nursinglist03[0].MusDeformity==1){
					$("#idMusDeformity").prop("checked", "checked");
				}
				if(response.nursinglist03[0].MusPain==1){
					$("#idMusPain").prop("checked", "checked");
				}
				if(response.nursinglist03[0].MusStiffness==1){
					$("#idMusStiffness").prop("checked", "checked");
				}
				if(response.nursinglist03[0].ReproMeno==1){
					$("#idReproMeno").prop("checked", "checked");
				}
				if(response.nursinglist03[0].ReproDysme==1){
					$("#idReproDysme").prop("checked", "checked");
				}
				if(response.nursinglist03[0].ReproAmeno==1){
					$("#idReproAmeno").prop("checked", "checked");
				}
				if(response.nursinglist03[0].ReproVaginal==1){
					$("#idReproVaginal").prop("checked", "checked");
				}
				if(response.nursinglist03[0].ReproItching==1){
					$("#idReproItching").prop("checked", "checked");
				}
				if(response.nursinglist03[0].CVSDiscomfort==1){
					$("#idCVSDiscomfort").prop("checked", "checked");
				}
				if(response.nursinglist03[0].CVSOedema==1){
					$("#idCVSOedema").prop("checked", "checked");
				}
				if(response.nursinglist03[0].BreastFeeding==1){
					$("#idBreastFeeding").prop("checked", "checked");
				}
				if(response.nursinglist03[0].BreastLumps==1){
					$("#idBreastLumps").prop("checked", "checked");
				}
				if(response.nursinglist03[0].PainAssvar==1){
					$("#idPainAssvar").prop("checked", "checked");
				}
				
				if(response.nursinglist03[0].MusValSkin=="warm"){
                    $("#idMusWarm").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValSkin=="cool"){
                    $("#idMusWarm").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValSkin=="dry"){
                    $("#idMusWarm").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValSkin=="firm"){
                    $("#idMusWarm").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValSkin=="flaccid"){
                    $("#idMusWarm").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].MusValUses=="walker"){
                    $("#idMusWalker").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValUses=="weelchair"){
                    $("#idMusWheelChair").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValUses=="cane"){
                    $("#idMusCane").prop("checked", "checked");
                }else if(response.nursinglist03[0].MusValUses=="none"){
                    $("#idMusNone").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].neurologiocal=="cooperative"){
                    $("#idNeuCoop").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="memoryChanges"){
                    $("#idNeuMemory").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="dizzing"){
                    $("#idNeuDizzing").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="synocope"){
                    $("#idNeuSynocope").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="seizure"){
                    $("#idNeuSeizure").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="paralysis"){
                    $("#idNeuPara").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="headache"){
                    $("#idNeuHead").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="anxity"){
                    $("#idNeuAnxity").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="depression"){
                    $("#idNeuDepre").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocal=="suicidalAttempt"){
                    $("#idNeuSuicide").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].neurologiocalPsy=="person"){
                    $("#idNeuOriPer").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocalPsy=="time"){
                    $("#idNeuOriTime").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocalPsy=="place"){
                    $("#idNeuOriPlace").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].neurologiocalPupils=="brisk"){
                    $("#idNeuOriBrisk").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocalPupils=="sluggish"){
                    $("#idNeuOriSluggish").prop("checked", "checked");
                }else if(response.nursinglist03[0].neurologiocalPupils=="noResponce"){
                    $("#idNeuOriNoResp").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].neuAlert=="alert"){
                    $("#idNeuLOCAlert").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuAlert=="confused"){
                    $("#idNeuLOCConfused").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuAlert=="sedated"){
                    $("#idNeuLOCSedated").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuAlert=="somnolent"){
                    $("#idNeuLOCSomnolent").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuAlert=="comatose"){
                    $("#idNeuLOCComatose").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuAlert=="agitated"){
                    $("#idNeuLOCAgitated").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].neuSpeech=="clear"){
                    $("#idNeuSpeechClear").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuSpeech=="sturred"){
                    $("#idNeuLOCSturred").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuSpeech=="aphasic"){
                    $("#idNeuLOCAphasic").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuSpeech=="dysphasia"){
                    $("#idNeuLOCDysphasia").prop("checked", "checked");
                }else if(response.nursinglist03[0].neuSpeech=="none"){
                    $("#idNeuLOCNone").prop("checked", "checked");
                }
				
				if(response.nursinglist03[0].painAssessment=="quality"){
                    $("#idPainAssQlty").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="constant"){
                    $("#idPainAssConst").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="intermittent"){
                    $("#idPainAssInter").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="character"){
                    $("#idPainAssChara").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="lacerating"){
                    $("#idPainAssLacer").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="burning"){
                    $("#idPainAssBurn").prop("checked", "checked");
                }else if(response.nursinglist03[0].painAssessment=="rediating"){
                    $("#idPainAssRedi").prop("checked", "checked");
                }
				
				
				if(response.nursinglist03[0].painRelivering=="rest"){
                    $("#idReliveringFactor").prop("checked", "checked");
                }else if(response.nursinglist03[0].painRelivering=="medication"){
                    $("#idReliveringMedication").prop("checked", "checked");
                }else if(response.nursinglist03[0].painRelivering=="other"){
                    $("#idReliveringOther").prop("checked", "checked");
                }
                
				if(response.nursinglist03[0].dailyRoutine=="yes"){
                    $("#idRoutineYes").prop("checked", "checked");
                }else if(response.nursinglist03[0].dailyRoutine=="no"){
                    $("#idRoutineNo").prop("checked", "checked");
                }
				if(response.nursinglist03[0].sleep=="yes"){
                    $("#idSleepYes").prop("checked", "checked");
                }else if(response.nursinglist03[0].sleep=="no"){
                    $("#idSleepNo").prop("checked", "checked");
                }
				
				
              
            $("#idUrineColour").val(response.nursinglist03[0].UrineColour);
    		$("#idUrineFrequency").val(response.nursinglist03[0].UrineFrequency);
    		$("#idUrineInsertion").val(response.nursinglist03[0].UrineInsertion);
    		$("#idMusColour").val(response.nursinglist03[0].MusColour);
  			$("#idReproLMP").val(response.nursinglist03[0].ReproLMP);
  			$("#idReproMenoDura").val(response.nursinglist03[0].ReproMenoDura);
  			$("#idReproAmenoDura").val(response.nursinglist03[0].ReproAmenoDura);
  			$("#idReproOther").val(response.nursinglist03[0].ReproOther);
  			$("#idMusOther").val(response.nursinglist03[0].MusOther);
  			$("#idCVSOedemaLoca").val(response.nursinglist03[0].CVSOedemaLoca);
  			$("#idCVSOther").val(response.nursinglist03[0].CVSOther);
  			$("#idBreastOther").val(response.nursinglist03[0].BreastOther);
  			$("#idNeuPsych").val(response.nursinglist03[0].NeuPsych);
  			$("#idNeuPupils").val(response.nursinglist03[0].NeuPupils);
  			$("#idNeuDeviation").val(response.nursinglist03[0].NeuDeviation);
  			$("#idNeuLOCOther").val(response.nursinglist03[0].NeuLOCOther);
  			$("#idNeuGrips").val(response.nursinglist03[0].NeuGrips);
  			$("#idNeuFoot").val(response.nursinglist03[0].NeuFoot);
  			$("#idNeuGag").val(response.nursinglist03[0].NeuGag);
  			$("#idNeuOther").val(response.nursinglist03[0].NeuOther);
  			$("#idPainAssLocation").val(response.nursinglist03[0].PainAssLocation);
  			$("#idPainAssDuration").val(response.nursinglist03[0].PainAssDuration);
  			$("#idExaFactor").val(response.nursinglist03[0].ExaFactor);
  			$("#idPainCauses").val(response.nursinglist03[0].PainCauses);
  			$("#idPlans").val(response.nursinglist03[0].Plans);
  			$("#idPainScale").val(response.nursinglist03[0].PainScale);
  			
             				
				}
		});
}

