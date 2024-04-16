package com.hms.ipd.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dto.DischargeSummaryListDTO;
import com.hms.ipd.dto.OTTypeDTO;
import com.hms.ipd.dto.OperatianSummaryListDTO;
import com.hms.ipd.service.IPDManagementService;


@Controller
@RequestMapping(value = "/ipd")
public class IPDManagementController {

	private static final Logger LOG=Logger.getLogger(IPDManagementController.class.getName());
	static {
		System.out.println("IPDManagementController is Loaded...!");
	}
	
	@Autowired
	private IPDManagementService ipdManagementService;
	//By Badrinath Wagh
	@ResponseBody
	@RequestMapping(value = "/getAvailableBed", method = RequestMethod.GET)
	public ChargesMasterSlave getAvailableBed(@RequestParam("action") String action, @RequestParam("hallID") String hallId ){
		LOG.info("IPDManagementController method getAvailableBed called");
		List<ChargesMasterSlave> list= ipdManagementService.getAvailableBed(action,hallId);
		ChargesMasterSlave dto = new ChargesMasterSlave();
		dto.setLstChargesSlave(list);
		return dto;
	}
	//By Badrinath Wagh
	@ResponseBody
	@RequestMapping(value = "/dischargeSummaryList", method = RequestMethod.GET)
	public List<DischargeSummaryListDTO> dischargeSummaryList(@RequestParam("action") String action) {
		LOG.info("IPDManagementController method dischargeSummaryList called");
		return ipdManagementService.dischargeSummaryList(action);
	}
	//By Badrinath Wagh
	@ResponseBody
	@RequestMapping(value = "/operatianSummaryList", method = RequestMethod.GET)
	public List<OperatianSummaryListDTO> operatianSummaryList(@RequestParam("action") String action) {
		LOG.info("IPDManagementController method operatianSummaryList called");
		return ipdManagementService.operatianSummaryList(action);
	}
	//By Badrinath Wagh
	@ResponseBody
	@RequestMapping(value = "/fetchOTName", method = RequestMethod.GET)
	public OTTypeDTO fetchOTName(@RequestParam("action") String action) {
		LOG.info("IPDManagementController method operatianSummaryList called");
		List<OTTypeDTO> list = ipdManagementService.fetchOTName(action);
		OTTypeDTO dto = new OTTypeDTO();
		dto.setOtNameList(list);
		return dto;
	}
	//Added By Annapurna for bedststics development
	@ResponseBody
	@RequestMapping(value = "/getBedStacticsData", method = RequestMethod.GET)
	public ChargesMasterSlave getBedStacticsData(@RequestParam("action") String action, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		
		List<ChargesMasterSlave> list= ipdManagementService.getBedStacticsData(action, unitId);
		ChargesMasterSlave dto = new ChargesMasterSlave();
		dto.setLstChargesSlave(list);
		return dto;
		
	}
	
	//Added By Annapurna fetchildwise data on dashboard
		@ResponseBody
		@RequestMapping(value = "/getAvailableBedOnDashboard", method = RequestMethod.GET)
		public ChargesMasterSlave getAvailableBedOnDashboard(@RequestParam("action") String action, HttpServletRequest request) {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session			
			List<ChargesMasterSlave> list= ipdManagementService.getBedStacticsData(action, unitId);
			ChargesMasterSlave dto = new ChargesMasterSlave();
			dto.setLstChargesSlave(list);
			return dto;
			
		}
	
}
