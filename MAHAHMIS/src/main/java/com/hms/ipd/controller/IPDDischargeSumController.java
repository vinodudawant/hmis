package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Produces;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Assessment;
import com.hms.dto.DischargeSummery;
import com.hms.dto.Order_master;
import com.hms.dto.RouteDTO;
import com.hms.ipd.service.IPDDischargeSumService;
import com.hms.model.DocBean;

@Controller
@RequestMapping(value = "/ipdDischargeSumController")
public class IPDDischargeSumController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired IPDDischargeSumService ipdDischargeSumService;
	
	@ResponseBody
	@RequestMapping(value = "/fetchAllMedicationMasterList", method = RequestMethod.GET)
	public RouteDTO fetchAllMedicationMasterList(@RequestParam("pageType") String pageType, @RequestParam("searhFlag") String searhFlag,
			@RequestParam("searchText") String searchText) {
		
		LOGGER.info("IPDDischargeSumController called method fetchAllMedicationMasterList.");
		List<RouteDTO> list = new ArrayList<RouteDTO>();
		list = ipdDischargeSumService.fetchAllMedicationMasterList(pageType,searhFlag,searchText);
		RouteDTO obj = new RouteDTO();
		obj.setRouteList(list);
		return obj;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchAssessment", method = RequestMethod.GET)
	public Assessment fetchAssessment(@RequestParam("treatmentId") String treatmentId){
		LOGGER.info("IPDDischargeSumController called method fetchAssessment");
		List<Assessment> arrAssessments = ipdDischargeSumService.fetchAssessment(treatmentId);
		Assessment objAssessment = new Assessment();
		objAssessment.setAssessmentList(arrAssessments);
		return objAssessment;
	}
	
	@ResponseBody
	@RequestMapping(value = "/featchOrderFormByDate", method = RequestMethod.GET)
	public Order_master featchOrderFormByDate(@RequestParam("tid") String tid, @RequestParam("date") String date,@RequestParam("type") String type ){
		LOGGER.info("IPDDischargeSumController called method featchOrderFormByDate");
		List<Order_master> orderMasterli= ipdDischargeSumService.featchOrderFormByDate(tid,date,type);
		Order_master objOrder_master = new Order_master();
		objOrder_master.setOrder_masterList(orderMasterli);
		return objOrder_master;
	}
	
	@ResponseBody
	@RequestMapping(value = "/featchTreatmentAtDischarge", method = RequestMethod.GET)
	public Order_master featchTreatmentAtDischarge(@RequestParam("tid") String tid, @RequestParam("date") String date,@RequestParam("type") String type ){
		LOGGER.info("IPDDischargeSumController called method featchTreatmentAtDischarge");
		List<Order_master> orderMasterli= ipdDischargeSumService.featchTreatmentAtDischarge(tid,date,type);
		Order_master objOrder_master = new Order_master();
		objOrder_master.setOrder_masterList(orderMasterli);
		return objOrder_master;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDischargeAutoSummary", method = RequestMethod.GET)
	public DischargeSummery fetchDischargeAutoSummary(@RequestParam("patID") String patID, @RequestParam("treatID") String treatID){
		LOGGER.info("IPDDischargeSumController called method fetchDischargeAutoSummary");
		List<DischargeSummery> dsList= ipdDischargeSumService.fetchDischargeAutoSummary(patID,treatID);
		DischargeSummery objDischargeSummery= new DischargeSummery();
		objDischargeSummery.setDsList(dsList);
		return objDischargeSummery;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchDocuments", method = RequestMethod.GET)
	public List<DocBean> fetchDocuments(@RequestParam("tid") String tid, @RequestParam("patId") String patId){
		LOGGER.info("IPDDischargeSumController called method fetchDischargeAutoSummary");
		List<DocBean> listDetails= ipdDischargeSumService.fetchDocuments(tid,patId);
		return listDetails;
	}
	
	@ResponseBody
	@RequestMapping(value = "/EditAssessment", method = RequestMethod.GET)
	public Assessment EditAssessment(@RequestParam("diagno_slave_id") int id){
		LOGGER.info("IPDDischargeSumController called method fetchAssessment");
		List<Assessment> arrAssessments = ipdDischargeSumService.EditAssessment(id);
		Assessment objAssessment = new Assessment();
		objAssessment.setAssessmentList(arrAssessments);
		return objAssessment;
	}
	
}
