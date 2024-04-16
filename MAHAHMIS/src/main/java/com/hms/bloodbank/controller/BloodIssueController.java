
package com.hms.bloodbank.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.BloodRequestSlave;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.CrossMatch;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.SampleDispatch;
import com.hms.bloodbank.dto.SampleTesting;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TransfusionReaction;
import com.hms.bloodbank.service.BloodIssueService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganCollectionDto;

@RestController
@RequestMapping(value="/blood_issue")
public class BloodIssueController {
	
static Logger log=Logger.getLogger(BloodIssueController.class.getName());
	
	@Autowired
	BloodIssueService bloodIssueService;

	private Object purchaseSevice;
	
	static {
		System.out.println("BloodIssueController Loaded...!");
	}

	
	@RequestMapping(value = "/searchpatientDetails", method = RequestMethod.POST)
	public List<RegistrationDto> searchpatientDetails(@RequestParam("searchParam") String searchParam,HttpServletRequest request) {
		List<RegistrationDto> list=new ArrayList<RegistrationDto>();
		list = bloodIssueService.searchpatientDetails(searchParam);
		return  list;
	}

	
	@RequestMapping(value = "/getPatientDetailsById", method = RequestMethod.POST)
	public RegistrationDto getPatientDetailsById(@RequestParam("id") int id,HttpServletRequest request) {
		RegistrationDto patientDetails =bloodIssueService.getPatientDetailsById(id,request);
		return  patientDetails;
	}
	
	@RequestMapping(value = "/saveBloodRequest", method = RequestMethod.POST)
	public int saveBloodRequest(BloodRequest BloodRequestDetails,@RequestParam("listCompObj")String listCompObj, HttpServletRequest request) {
		int response = bloodIssueService.saveBloodRequest(BloodRequestDetails,listCompObj, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/searchPatientDetailsById", method = RequestMethod.POST)
	public List<BloodRequest> searchPatientDetailsById(@RequestParam("searchParam") String searchParam,@RequestParam("callform") String callform,HttpServletRequest request) {
		List<BloodRequest> list=new ArrayList<BloodRequest>();
		list = bloodIssueService.searchPatientDetailsById(searchParam,callform,request);
		return  list;
	}
	
	@RequestMapping(value = "/getPatientDetailsByRequestId", method = RequestMethod.POST)
	public  BloodRequest getPatientDetailsByRequestId(@RequestParam("id") int id,HttpServletRequest request) {
		BloodRequest patientDetailsById =bloodIssueService.getPatientDetailsByRequestId(id,request);
		return  patientDetailsById;
	}
	
	@RequestMapping(value = "/saveSampleDispatch", method = RequestMethod.POST)
	public int saveSampleDispatch(SampleDispatch sampleDispatchDetails, HttpServletRequest request) {
		int response = bloodIssueService.saveSampleDispatch(sampleDispatchDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<SampleDispatch> getDetails(@RequestParam("status") Integer status, @RequestParam("callform") String callform,
			@RequestParam("requestNo") Integer requestNo,HttpServletRequest request) {
	 	
		String from = request.getParameter("formDate");
		String to = request.getParameter("toDate");	
		
		String fromArray[] = from.split("-");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);
		
		String toArray[] = to.split("-");

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-"
				+ toArray[0]);

		List<SampleDispatch> sampleDispatch= bloodIssueService.getDetails(status,fromReult.toString(),toReult.toString(),callform,requestNo,request);

		return sampleDispatch;
	}
	
	@RequestMapping(value = "/savePatientSampleAcknowledge", method = RequestMethod.POST)
	public int savePatientSampleAcknowledge(@RequestParam("SampleDispatchId") int sampleDispatchId,@RequestParam("sampleStatus") int sampleStatus,@RequestParam("remarks") String remarks, HttpServletRequest request) {
		int response = bloodIssueService.savePatientSampleAcknowledge(sampleDispatchId,sampleStatus,remarks,request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/saveSampleTesting", method = RequestMethod.POST)
	public int saveSampleTesting(SampleTesting sampleTesting ,@RequestParam("listSampleObj")String listSampleObj, HttpServletRequest request) {
		int response = bloodIssueService.saveSampleTesting(sampleTesting,listSampleObj, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getRequestComponentDetailsByID", method = RequestMethod.POST)
	public @ResponseBody List<BloodRequestSlave> getRequestComponentDetailsByID(@RequestParam("id") int id,HttpServletRequest request) {
		List<BloodRequestSlave> componentDetails =bloodIssueService.getRequestComponentDetailsByID(id,request);
		return  componentDetails;
	}
	
	@RequestMapping(value = "/saveCrossMatch", method = RequestMethod.POST)
	public int saveCrossMatch(CrossMatch crossMatchDetails, HttpServletRequest request) {
		int response = bloodIssueService.saveCrossMatch(crossMatchDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getCrossMatchListByID", method = RequestMethod.GET)
	public @ResponseBody
	CrossMatch getCrossMatchListByID(@RequestParam("bloodRequestId")Integer bloodRequestId ,@RequestParam("callfrom") String callfrom,HttpServletRequest request) {
	//	System.out.println("Callform>>>"+callform);
		List<CrossMatch> lstCrossMatchMaster = new ArrayList<CrossMatch>();
		lstCrossMatchMaster = bloodIssueService.getCrossMatchListByID(bloodRequestId,callfrom,request);
		CrossMatch obj = new CrossMatch();
		obj.setLstCrossMatch(lstCrossMatchMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editCrossMatch", method = RequestMethod.GET)
	public @ResponseBody
	CrossMatch editCrossMatch(@RequestParam("crossMatchId") Integer id) {
		CrossMatch obj = new CrossMatch();
		obj = bloodIssueService.editCrossMatch(id);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteCrossMatch", method = RequestMethod.POST)
	public @ResponseBody
	String deleteCrossMatch(@RequestParam("crossMatchId") Integer id,HttpServletRequest request) {
		boolean response = bloodIssueService.deleteCrossMatch(id, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	
	
	@RequestMapping(value = "/saveBloodRequisiton", method = RequestMethod.POST)
	public int saveBloodRequisiton(@RequestParam("listbloodreq")String listbloodreq, HttpServletRequest request) {
		int response = bloodIssueService.saveBloodRequisiton(listbloodreq, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/saveBloodIssue", method = RequestMethod.POST)
	public int saveBloodIssue(@RequestParam("listbloodissue")String listbloodissue, HttpServletRequest request) {
		int response = bloodIssueService.saveBloodIssue(listbloodissue, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/addtransfusiuon", method = RequestMethod.POST)
	public int addtransfusiuon(@RequestParam("listtranfusion")String listtranfusion,HttpServletRequest request) {
		int response = bloodIssueService.addtransfusiuon(listtranfusion, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	
	@RequestMapping(value = "/getTransfusionDetails", method = RequestMethod.GET)
	public @ResponseBody
	TransfusionReaction getTransfusionDetails(@RequestParam("id") Integer id,HttpServletRequest request) {
		List<TransfusionReaction> lsttransfusion = new ArrayList<TransfusionReaction>();
		lsttransfusion = bloodIssueService.getTransfusionDetails(id,request);
		TransfusionReaction obj = new TransfusionReaction();
		obj.setLstTransfusion(lsttransfusion);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editTransfusionDetail", method = RequestMethod.GET)
	public @ResponseBody
	TransfusionReaction editTransfusionDetail(@RequestParam("transfusionId") Integer transfusionId) {
		TransfusionReaction obj = new TransfusionReaction();
		obj = bloodIssueService.editTransfusionDetail(transfusionId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteTransfusionDetail", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTransfusionDetail(@RequestParam("transfusionId") Integer transfusionId,HttpServletRequest request) {
		boolean response = bloodIssueService.deleteTransfusionDetail(transfusionId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/saveObservation", method = RequestMethod.POST)
	public int saveObservation(@RequestParam("listobservation")String listobservation, HttpServletRequest request) {
		int response = bloodIssueService.saveObservation(listobservation, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllComponentByComponentName", method = RequestMethod.GET)
	public @ResponseBody
	ComponentSeperation getAllComponentByComponentName(@RequestParam("bloodBagNumber")Integer bloodBagNumber,@RequestParam("componentId") Integer componentId,HttpServletRequest request) {
		List<ComponentSeperation> list = new ArrayList<ComponentSeperation>();
		list = bloodIssueService.getAllComponentByComponentName(bloodBagNumber,componentId,request);
		ComponentSeperation obj = new ComponentSeperation();
		obj.setLstComponentseperation(list);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getAllBagDetailsbyComponentId", method = RequestMethod.GET)
	public @ResponseBody
	ComponentSeperation getAllBagDetailsbyComponentId(@RequestParam("componentId") Integer componentId,@RequestParam ("bloodGroup")String bloodGroup,@RequestParam ("bloodRequestId")Integer bloodRequestId ,HttpServletRequest request) {
		//System.out.println(bloodGroup);
		List<ComponentSeperation> list = new ArrayList<ComponentSeperation>();
		list = bloodIssueService.getAllBagDetailsbyComponentId(componentId,bloodGroup,bloodRequestId,request);
		ComponentSeperation obj = new ComponentSeperation();
		obj.setLstComponentseperation(list);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getSampleAckDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<SampleDispatch> getSampleAckDetails(@RequestParam("callform") String callform,HttpServletRequest request) {
	 	
		String from = request.getParameter("formDate");
		String to = request.getParameter("toDate");	
		
		String fromArray[] = from.split("-");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);
		
		String toArray[] = to.split("-");

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-"
				+ toArray[0]);

		List<SampleDispatch> sampleDispatch= bloodIssueService.getSampleAckDetails(fromReult.toString(),toReult.toString(),callform);

		return sampleDispatch;
	}
	
	@RequestMapping(value = "/getAllBloodRequestList", method = RequestMethod.GET)
	public List<BloodRequest> getAllBloodRequestList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<BloodRequest> c =bloodIssueService.getAllBloodRequestList(unitId,request);
		return  c;
	}

	@RequestMapping(value = "/deleteBloodRequestetail", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodRequestetail(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = bloodIssueService.deleteBloodRequestetail(id, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/editRequestDetails", method = RequestMethod.GET)
	@ResponseBody
	public BloodRequest editRequestDetails(@RequestParam("id") Integer id,HttpServletRequest request) {
		BloodRequest obj=new BloodRequest();
		obj = bloodIssueService.editRequestDetails(id,request);
		return obj;
	}
//Added By Annapurna
	@RequestMapping(value = "/getPatientDetailsByIdBloodrequest", method = RequestMethod.POST)
	public RegistrationDto getPatientDetailsByIdBloodrequest(@RequestParam("id") int id,HttpServletRequest request) {
		RegistrationDto patientDetails =bloodIssueService.getPatientDetailsByIdBloodrequest(id,request);
		return  patientDetails;
	}
	//Added By Annapurna
	@RequestMapping(value = "/getPatientDetailsByIdBloodrequestlist", method = RequestMethod.GET)
	public  BloodRequest getPatientDetailsByIdBloodrequestlist(@RequestParam("id") int id,HttpServletRequest request) {
		BloodRequest requestdetailsbyid =bloodIssueService.getPatientDetailsByIdBloodrequestlist(id,request);
		return  requestdetailsbyid;
	}
	
	@RequestMapping(value = "/getAllBloodRequestSampleDispatchList", method = RequestMethod.GET)
	@ResponseBody
	public List<SampleDispatch> getAllBloodRequestSampleDispatchList(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
	
		List<SampleDispatch> lisSampleDispatch = new ArrayList<SampleDispatch>();
		//SampleDispatch obj = new SampleDispatch();
		lisSampleDispatch = bloodIssueService.getAllBloodRequestSampleDispatchList(request,fromDate,lastDate);
		
		System.out.println("list :  " + lisSampleDispatch);
		
		//obj.setSampleDispatchList(lisSampleDispatch);
		log.debug("Response----> " + lisSampleDispatch);
		return lisSampleDispatch;
	}
	
	@RequestMapping(value = "/searchDonorRequesterDetailsById", method = RequestMethod.POST)
	public List<BloodRequest> searchDonorRequesterDetailsById(@RequestParam("searchParam") String searchParam, @RequestParam("callfrom") String callfrom,HttpServletRequest request) {
		
		List<BloodRequest> list = bloodIssueService.searchDonorRequesterDetailsById(searchParam,callfrom,request);
		return  list;
	}
	

	
	@RequestMapping(value = "/getAllBloodRequestSampleTestingList", method = RequestMethod.GET)
	@ResponseBody
	public List<SampleTesting> getAllBloodRequestSampleTestingList(@RequestParam("unitId")Integer unitId,HttpServletRequest request) {
		List<SampleTesting>listdonorSampleTesting = bloodIssueService.getAllBloodRequestSampleTestingList(request,unitId);
		
		System.out.println("list :  " + listdonorSampleTesting);
		return listdonorSampleTesting;
	}
	@RequestMapping(value = "/getBloodRequestSampleTesingListById", method = RequestMethod.GET)
	public @ResponseBody
	SampleTesting getBloodRequestSampleTesingListById(@RequestParam("bloodRequestId") Integer bloodRequestId) {	
		log.info("In BloodIssueController getBloodRequestSampleTesingListById()");
		SampleTesting obj = new SampleTesting();
		obj = bloodIssueService.getBloodRequestSampleTesingListById(bloodRequestId);		
		log.error("Response-----> " + obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/editSampleTesting", method = RequestMethod.GET)
	public @ResponseBody
	SampleTesting editSampleTesting(@RequestParam("sampletestingid") Integer sampletestingid,HttpServletRequest request) {
	 	SampleTesting obj = new SampleTesting();
		obj = bloodIssueService.editSampleTesting(sampletestingid,request);
		
		log.error("Response-----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteSampleTesting", method = RequestMethod.POST)
	@ResponseBody
	public String deleteSampleTesting(@RequestParam("sampletestingid") Integer sampletestingid, HttpServletRequest request) {
		
		boolean response = bloodIssueService.deleteSampleTesting(sampletestingid, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	@RequestMapping(value = "/getAllCrossMatchList", method = RequestMethod.GET)
	public List<CrossMatch> getAllCrossMatchList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<CrossMatch> crossMatchList =bloodIssueService.getAllCrossMatchList(unitId,request);
		return  crossMatchList;
	}
	
	@RequestMapping(value = "/getAllBloodRequisitonList", method = RequestMethod.GET)
	public @ResponseBody
	 List<CrossMatch> getAllBloodRequisitonList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<CrossMatch> c =bloodIssueService.getAllBloodRequisitonList(unitId,request);
		return  c;
	}

	// Added By Annapurna
	@RequestMapping(value = "/editBloodRequisiton", method = RequestMethod.GET)
	@ResponseBody
	public CrossMatch editBloodRequisiton(@RequestParam("id") Integer id,HttpServletRequest request) {
		CrossMatch obj=new CrossMatch();
		obj = bloodIssueService.editBloodRequisiton(id,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBloodRequisiton", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodRequisiton(@RequestParam("id") Integer id,HttpServletRequest request) {
		boolean response = bloodIssueService.deleteBloodRequisiton(id, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	

	@RequestMapping(value = "/getBloodRequisitionById", method = RequestMethod.GET)
	public @ResponseBody
	CrossMatch getBloodRequisitionById(@RequestParam("bloodRequestId") Integer bloodRequestId) {	
		log.info("In BloodIssueController getBloodRequestSampleTesingListById()");
		CrossMatch obj = new CrossMatch();
		obj = bloodIssueService.getBloodRequisitionById(bloodRequestId);		
		log.error("Response-----> " + obj);
		return obj;
	}

	@ResponseBody
	@RequestMapping(value = "/deleteBloosIssueById", method = RequestMethod.POST)
	public int deleteBloosIssueById(@RequestParam("id") int id, HttpServletRequest request) {
		int response = bloodIssueService.deleteBloosIssueById(id,request);
		return response;
	}

	
	
	@RequestMapping(value = "/getAllBloodIssueList", method = RequestMethod.GET)
	public @ResponseBody
	 List<CrossMatch> getAllBloodIssueList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<CrossMatch> res =bloodIssueService.getAllBloodIssueList(unitId,request);
		return  res;
	}
	
	@RequestMapping(value = "/getBloodIssueById", method = RequestMethod.GET)
	public @ResponseBody
	CrossMatch getBloodIssueById(@RequestParam("bloodRequestId") Integer bloodRequestId) {	
		log.info("In BloodIssueController getBloodRequestSampleTesingListById()");
		CrossMatch obj = new CrossMatch();
		obj = bloodIssueService.getBloodIssueById(bloodRequestId);		
		log.error("Response-----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/getAllBloodTransfusionList", method = RequestMethod.GET)
	public List<TransfusionReaction> getAllBloodTransfusionList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<TransfusionReaction> Lst =bloodIssueService.getAllBloodTransfusionList(unitId,request);
		return  Lst;
	}

	@ResponseBody
	@RequestMapping(value = "/deleteBloodTransfusionById", method = RequestMethod.POST)
	public int deleteBloodTransfusionById(@RequestParam("id") int id, HttpServletRequest request) {
		int response = bloodIssueService.deleteBloodTransfusionById(id,request);
		return response;
	}

	// Added By Annapurna
	@RequestMapping(value = "/editBloodIssueDeatils", method = RequestMethod.GET)
	@ResponseBody
	public CrossMatch editBloodIssueDeatils(@RequestParam("id") Integer id,HttpServletRequest request) {
		CrossMatch obj=new CrossMatch();
		obj = bloodIssueService.editBloodIssueDeatils(id,request);
		return obj;
	}
	
	@RequestMapping(value = "/validateCrossMatchRecord", method = RequestMethod.POST)
	@ResponseBody
	public Integer validateCrossMatchRecord(@RequestParam("compName") String compName, @RequestParam("bloodBagid") Integer bloodBagid, @RequestParam("bloodrequestId") Integer bloodrequestId)
	{
		Integer result = bloodIssueService.validateCrossMatchRecord(compName, bloodBagid, bloodrequestId);
		
		return result;
	}

}