package com.hms.ipd.nurshing.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ipd.nurshing.dto.ChartInfoDTO;
import com.hms.ipd.nurshing.dto.ChartReportDTO;
import com.hms.ipd.nurshing.dto.NurshingCarePlanDTO;
import com.hms.ipd.nurshing.dto.NurshingDrugAdministartionDTO;
import com.hms.ipd.nurshing.dto.NurshingPainScaleDTO;
import com.hms.ipd.nurshing.dto.TreatmentNurshingDTO;
import com.hms.ipd.nurshing.service.TreatmentNurshingService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/nurshingchart")
@Slf4j
public class TreatmentNurshingController {

	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
		@Autowired
		TreatmentNurshingService service;
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveNurshingChartDetails
		 * *****/
		@RequestMapping(value = "/saveNurshingChartDetails", method = RequestMethod.POST)
		@ResponseBody	
		public int saveNurshingChartDetails(TreatmentNurshingDTO obj, @RequestParam("password") String password,   HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveNurshingChartDetails");
			int response = service.saveNurshingChartDetails(obj,password);
			logger.debug("response saveNurshingChartDetails...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getNurchingChartDetails
		 * *****/
		@RequestMapping(value = "/getNurchingChartDetails", method = RequestMethod.POST)
		@ResponseBody	
		public List<TreatmentNurshingDTO> getNurchingChartDetails(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId, 
				@RequestParam("date")String date  ) {
			logger.info("inside getNurchingChartDetails");
			List<TreatmentNurshingDTO>  list = service.getNurchingChartDetails(treatmentId, unitId, date);
			logger.debug("response getNurchingChartDetails...."+list);
			return list;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteNusrshingDetails
		 * *****/
		@RequestMapping(value = "/deleteNusrshingDetails", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteNusrshingDetails(@RequestParam("ids") String ids,@RequestParam("userId") int userId) {
			
			logger.info("inside saveNurshingChartDetails");
			int response = service.deleteNusrshingDetails(ids, userId);
			logger.debug("response deleteNusrshingDetails...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveInputOutputNurshingChart
		 * *****/
		@RequestMapping(value = "/saveInputOutputNurshingChart", method = RequestMethod.POST)
		@ResponseBody	
		public int saveInputOutputNurshingChart(ChartInfoDTO obj, HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveInputOutputNurshingChart");
			int response = service.saveInputOutputNurshingChart(obj);
			logger.debug("response saveInputOutputNurshingChart...."+response);
			return response;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getListOfInputOutputDetails
		 * *****/
		@RequestMapping(value = "/getListOfInputOutputDetails", method = RequestMethod.GET)
		@ResponseBody	
		public ChartInfoDTO getListOfInputOutputDetails(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,
				@RequestParam("cType") int cType,@RequestParam("vitalDate") String vitalDate) {
			ChartInfoDTO obj=new ChartInfoDTO();
			logger.info("inside getListOfInputOutputDetails");
			List<ChartInfoDTO>  list = service.getListOfInputOutputDetails(treatmentId, unitId, cType,vitalDate);
			logger.debug("response getListOfInputOutputDetails...."+list);
			obj.setLstChartInfo(list);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used editChartInfo
		 * *****/
		@RequestMapping(value = "/editChartInfo", method = RequestMethod.GET)
		@ResponseBody	
		public ChartInfoDTO editChartInfo(@RequestParam("id") int id) {
			ChartInfoDTO obj=new ChartInfoDTO();
			logger.info("inside editChartInfo");
			 obj = service.editChartInfo(id);
			logger.debug("response editChartInfo...."+obj);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteInputOutputDetails
		 * *****/
		@RequestMapping(value = "/deleteInputOutputDetails", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteInputOutputDetails(@RequestParam("id") int id,@RequestParam("userId") int userId) {
			
			logger.info("inside deleteInputOutputDetails");
			int response = service.deleteInputOutputDetails(id, userId);
			logger.debug("response deleteInputOutputDetails...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveIpdVitals
		 * *****/
		@RequestMapping(value = "/saveIpdVitals", method = RequestMethod.POST)
		@ResponseBody	
		public int saveIpdVitals( @RequestParam("vitalList") String vitalList,   HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveIpdVitals");
			int response = service.saveIpdVitals(vitalList);
			logger.debug("response saveIpdVitals...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getIpdVitalList
		 * *****/
		@RequestMapping(value = "/getIpdVitalList", method = RequestMethod.GET)
		@ResponseBody	
		public ChartReportDTO getIpdVitalList(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,@RequestParam("todayDate") String todayDate) {
			ChartReportDTO obj=new ChartReportDTO();
			logger.info("inside getIpdVitalList");
			List<ChartReportDTO>  list = service.getIpdVitalList(treatmentId, unitId,todayDate);
			logger.debug("response getIpdVitalList...."+list);
			obj.setLstChartReport(list);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for savePostIntensvisit
		 * *****/
		@RequestMapping(value = "/savePostIntensvisit", method = RequestMethod.POST)
		@ResponseBody	
		public int savePostIntensvisit( ChartReportDTO obj,   HttpServletRequest request) {
			String msg = "";
			logger.info("inside savePostIntensvisit");
			int response = service.savePostIntensvisit(obj);
			logger.debug("response savePostIntensvisit...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getPostIntensvisit
		 * *****/
		@RequestMapping(value = "/getPostIntensvisit", method = RequestMethod.GET)
		@ResponseBody	
		public ChartReportDTO getPostIntensvisit(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,@RequestParam("todayDate") String todayDate,@RequestParam("chartType") int chartType) {
			ChartReportDTO obj=new ChartReportDTO();
			logger.info("inside getIpdVitalList");
			List<ChartReportDTO>  list = service.getPostIntensvisit(treatmentId, unitId, todayDate, chartType);
			logger.debug("response getIpdVitalList...."+list);
			obj.setLstChartReport(list);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveNurshingCarePlan
		 * *****/
		@RequestMapping(value = "/saveNurshingCarePlan", method = RequestMethod.POST)
		@ResponseBody	
		public int saveNurshingCarePlan( NurshingCarePlanDTO obj,   HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveNurshingCarePlan");
			int response = service.saveNurshingCarePlan(obj);
			logger.debug("response saveNurshingCarePlan...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getNurshingCarePlan
		 * *****/
		@RequestMapping(value = "/getNurshingCarePlan", method = RequestMethod.GET)
		@ResponseBody	
		public NurshingCarePlanDTO getNurshingCarePlan(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId) {
			NurshingCarePlanDTO obj=new NurshingCarePlanDTO();
			logger.info("inside getNurshingCarePlan");
			obj = service.getNurshingCarePlan(treatmentId, unitId);
			logger.debug("response getNurshingCarePlan...."+obj);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for saveNurshingPainScale
		 * *****/
		@RequestMapping(value = "/saveNurshingPainScale", method = RequestMethod.POST)
		@ResponseBody	
		public int saveNurshingPainScale( NurshingPainScaleDTO obj,   HttpServletRequest request) {
			String msg = "";
			logger.info("inside saveNurshingPainScale");
			int response = service.saveNurshingPainScale(obj);
			logger.debug("response saveNurshingPainScale...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getNurshingPainScale
		 * *****/
		@RequestMapping(value = "/getNurshingPainScale", method = RequestMethod.GET)
		@ResponseBody	
		public NurshingPainScaleDTO getNurshingPainScale(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,@RequestParam("todayDate") String todayDate) {
			NurshingPainScaleDTO obj=new NurshingPainScaleDTO();
			logger.info("inside getNurshingPainScale");
			obj = service.getNurshingPainScale(treatmentId, unitId, todayDate);
			logger.debug("response getNurshingPainScale...."+obj);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getNurshingPainScaleForPrint
		 * *****/
		@RequestMapping(value = "/getNurshingPainScaleForPrint", method = RequestMethod.GET)
		@ResponseBody	
		public NurshingPainScaleDTO getNurshingPainScaleForPrint(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate) {
			NurshingPainScaleDTO obj=new NurshingPainScaleDTO();
			logger.info("inside getNurshingPainScaleForPrint");
			obj = service.getNurshingPainScaleForPrint(treatmentId, unitId, fromDate, toDate);
			logger.debug("response getNurshingPainScaleForPrint...."+obj);
			return obj;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used updateChemoDetailsOnNurshing
		 * *****/
		@RequestMapping(value = "/updateChemoDetailsOnNurshing", method = RequestMethod.GET)
		@ResponseBody	
		public int updateChemoDetailsOnNurshing(@RequestParam("id") int id,@RequestParam("startTime") String  startTime,@RequestParam("stopTime") String stopTime,@RequestParam("sign") String sign,@RequestParam("remark") String remark) {
			logger.info("inside updateChemoDetailsOnNurshing");
			int res = service.updateChemoDetailsOnNurshing(id, startTime, stopTime, sign, remark);
			logger.debug("response updateChemoDetailsOnNurshing...."+res);
			return res;
		}
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used saveNurshingDrugAdministration
		 * *****/
		@RequestMapping(value = "/saveNurshingDrugAdministration", method = RequestMethod.POST)
		@ResponseBody	
		public int saveNurshingDrugAdministration(NurshingDrugAdministartionDTO obj,@RequestParam("password") String password) {
			logger.info("inside saveNurshingDrugAdministration");
			int res = service.saveNurshingDrugAdministration(obj,password);
			logger.debug("response saveNurshingDrugAdministration...."+res);
			return res;
		}
		
		
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getNurshingDrugAdministartionlist
		 * *****/
		@RequestMapping(value = "/getNurshingDrugAdministartionlist", method = RequestMethod.GET)
		@ResponseBody	
		public NurshingDrugAdministartionDTO getNurshingDrugAdministartionlist(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId,@RequestParam("dateDrug") String dateDrug) {
			NurshingDrugAdministartionDTO obj=new NurshingDrugAdministartionDTO();
			logger.info("inside getNurshingDrugAdministartionlist");
			List<NurshingDrugAdministartionDTO> list= service.getNurshingDrugAdministartionlist(treatmentId, unitId,dateDrug);
			logger.debug("response getNurshingDrugAdministartionlist...."+list);
			obj.setLstNurshingDrugs(list);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteNusrshingDrugDetails
		 * *****/
		@RequestMapping(value = "/deleteNusrshingDrugDetails", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteNusrshingDrugDetails(@RequestParam("ids") String ids,@RequestParam("userId") int userId) {
			
			logger.info("inside deleteNusrshingDrugDetails");
			int response = service.deleteNusrshingDrugDetails(ids, userId);
			logger.debug("response deleteNusrshingDrugDetails...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteNusrshingDrugDetails
		 * *****/
		@RequestMapping(value = "/getServiceDetailsOnNurshing", method = RequestMethod.POST)
		@ResponseBody	
		public AutosugeestionDto getServiceDetailsOnNurshing(@RequestParam("serviceId") int serviceId,@RequestParam("findName") String findName,@RequestParam("unitId") int unitId) {
			AutosugeestionDto obj=new AutosugeestionDto();
			logger.info("inside getServiceDetailsOnNurshing");
			List<AutosugeestionDto>  list= service.getServiceDetailsOnNurshing(serviceId, findName, unitId);
			logger.debug("response getServiceDetailsOnNurshing...."+list);
			obj.setLstService(list);
			return obj;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used for deleteIpdServiceDetailsOnNusrshing
		 * *****/
		@RequestMapping(value = "/deleteIpdServiceDetailsOnNusrshing", method = RequestMethod.POST)
		@ResponseBody	
		public int deleteIpdServiceDetailsOnNusrshing(@RequestParam("ids") String ids,@RequestParam("userId") int userId) {
			
			logger.info("inside deleteIpdServiceDetailsOnNusrshing");
			int response = service.deleteIpdServiceDetailsOnNusrshing(ids, userId);
			logger.debug("response deleteIpdServiceDetailsOnNusrshing...."+response);
			return response;
		}
		
		/******
		 * @author   :HM00054
		 * @Code     :this method used getListOfChemoDetails
		 * *****/
		@RequestMapping(value = "/getListOfChemoDetails", method = RequestMethod.GET)
		@ResponseBody	
		public OPDChemoTheropyDTO getListOfChemoDetails(@RequestParam("treatmentId") int treatmentId,@RequestParam("unitId") int unitId) {
			OPDChemoTheropyDTO obj=new OPDChemoTheropyDTO();
			logger.info("inside getListOfChemoDetails");
			List<OPDChemoTheropyDTO>  list = service.getListOfChemoDetails(treatmentId, unitId);
			logger.debug("response getListOfChemoDetails...."+list);
			obj.setGetListOfOPDChemoTheropyDTO(list);
			return obj;
		}
		
}
