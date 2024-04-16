package com.hms.ipd.nurshing.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.dto.VitalSing;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.ipd.nurshing.dto.AnaesthesiaApprovalDto;
import com.hms.ipd.nurshing.dto.IntraOpNotesDto;
import com.hms.ipd.nurshing.dto.PreopDto;
import com.hms.ipd.nurshing.service.AnaesthesiaApprovalService;
import com.hms.ot.dto.ConductAnaesthesia;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/approval")
public class AnaesthesiaApprovalController {

	@Autowired
	AnaesthesiaApprovalService ANService;
	
	
	
	@RequestMapping(value = "/saveAnaesthesiaApproval", method = RequestMethod.POST)
	@ResponseBody	
	public int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		System.err.println(obj.getApprovalId());
		int response = ANService.saveAnaesthesiaApproval(obj, patientId, treatmentId);
		return response;
	}
	
	
	  @RequestMapping(value = "/savePreOp", method = RequestMethod.POST)  
	  @ResponseBody public int savePreOp(PreopDto
	  obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId")
	  Integer treatmentId, HttpServletRequest request) {
		  System.err.println(obj.getPreOpId());
	  int response = ANService.saveAnaesthesiaPreOp(obj, patientId,
	  treatmentId); return response; }
	 
	  @RequestMapping(value = "/getAnaesthesiaPreOp" , method = RequestMethod.POST)
	  @ResponseBody public PreopDto getAnaesthesiaPreOp(@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId")
			  Integer treatmentId)
	  
	  {
		  PreopDto PreopDto = new PreopDto();
			PreopDto = ANService.getAnaesthesiaPreOp(patientId, treatmentId);
			return PreopDto;
		
		  
	  }
	  
	  @RequestMapping(value = "/saveIntraOperation", method = RequestMethod.POST)
		@ResponseBody	
		public int saveIntraOperation(IntraOpNotesDto obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
			
		//	System.err.println(obj.getApprovalId());
			int response = ANService.saveIntraOperation(obj, patientId, treatmentId);
			return response;
		}
	  
	  @RequestMapping(value = "/getIntraOperation" , method = RequestMethod.POST)
	  @ResponseBody
	  public IntraOpNotesDto getIntraOperation(@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId)
	  {
		  IntraOpNotesDto IntraOpobj = new IntraOpNotesDto();
		  IntraOpobj =  ANService.getIntraOperation( patientId, treatmentId);
		  return IntraOpobj;
		  
	  }
	  
	  //added by sandip for fetch anesthesia
	  @RequestMapping(value = "/fetchAnaesthesiaApproval" , method = RequestMethod.POST)
	  @ResponseBody
	  public AnaesthesiaApprovalDto fetchAnaesthesiaApproval(@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId)
	  {
		  AnaesthesiaApprovalDto anaesthesiaobj = new AnaesthesiaApprovalDto();
		  anaesthesiaobj =  ANService.fetchAnaesthesiaApproval( patientId, treatmentId);
		  return anaesthesiaobj;
		  
	  }
	  
	  @RequestMapping(value = "/saveConductAnaesthesia" , method = RequestMethod.POST)
	  @ResponseBody
	  public void saveConductAnaesthesia(@RequestParam("queryType") String queryType,@RequestParam("tretID") String tretID,@RequestParam("txtInduction") String txtInduction,
			  @RequestParam("txtRelax") String txtRelax,@RequestParam("txtOPPulse") String txtOPPulse,@RequestParam("txtOPBp") String txtOPBp,@RequestParam("txtOPRr") String txtOPRr,
			  @RequestParam("txtOPColor") String txtOPColor,@RequestParam("txtReversal") String txtReversal,@RequestParam("date") String date,@RequestParam("strchk1") String strchk1,
			  @RequestParam("strchk2") String strchk2,@RequestParam("listconductAnaesObj") String listconductAnaesObj,HttpServletRequest request,HttpServletResponse response)
	  {

		    int isInserted = 0;
			String[] listconductAnaesObjNew = request.getParameterValues("listconductAnaesObj");
			VitalSing objVitalSing = new VitalSing();
			String str = listconductAnaesObjNew[0].substring(0, listconductAnaesObjNew[0].length());
			
			if (!listconductAnaesObj.equals("null")) {
				for (int i = 0; i < listconductAnaesObjNew.length; i++) {
					objVitalSing = (VitalSing) ConfigUIJSONUtility
							.getObjectFromJSON(str, VitalSing.class);
				}
			} else {
				listconductAnaesObjNew = null;
			}
			
			int inttretID = 0;
			if (tretID != null && !tretID.equals("")) {
				inttretID = Integer.parseInt(tretID);
			}
			ConductAnaesthesia objConductAnaesthesia = new ConductAnaesthesia();
			objConductAnaesthesia.setTreatment_ID(inttretID);
			objConductAnaesthesia.setInduction(txtInduction);
			objConductAnaesthesia.setRelaxant(txtRelax);
			objConductAnaesthesia.setPostOPpulse(txtOPPulse);
			objConductAnaesthesia.setPostOPbp(txtOPBp);
			objConductAnaesthesia.setPostOPrr(txtOPRr);
			objConductAnaesthesia.setPostOPcolor(txtOPColor);
			objConductAnaesthesia.setChk_anesthesia(strchk1);
			objConductAnaesthesia.setChkpostoperative(strchk2);
			objConductAnaesthesia.setDate(date);
			objConductAnaesthesia.setReversal(txtReversal);
			
			isInserted = ANService.saveConductAnaesthesia(objConductAnaesthesia,objVitalSing,queryType);

			if (isInserted == 1) {

				try {
					if(queryType.equals("insert"))
					{
					response.getWriter().write(
							"Conduct Anaesthesia History is Saved");
					}
					else
					{
						response.getWriter().write(
							"Conduct Anaesthesia History is Updated");
						
					}
				} catch (IOException e) {

					e.printStackTrace();
				}

			} else if (isInserted == 0) {
				try {
					response.getWriter()
							.write("Oops some problem occured while saving Conduct Anaesthesia History");
				} catch (IOException e) {

					e.printStackTrace();
				}
			}
			
	  }
}
