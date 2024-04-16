package com.hms.ivf.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ivf.dto.EmbryoTransferMasterDTO;
import com.hms.ivf.dto.FollicularStudyBasicInfoDTO;
import com.hms.ivf.dto.IVFCalenderInfoDTO;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.OvamPickMasterDTO;
import com.hms.ivf.dto.OvamPickUpSlaveDTO;
import com.hms.ivf.service.ShelfSponsorPayAlertService;

@Controller
@RequestMapping(value = "/shelfsponser")
public class ShelfSponserPayAlertController {
	@Autowired
	ShelfSponsorPayAlertService spService;
	
	@RequestMapping(value = "/getSumAssueredAmountByTreatmentId", method = RequestMethod.GET)
	@ResponseBody	
	public Double getSumAssueredAmountByTreatmentId(@RequestParam("treatmentId") Integer treatmentId) {
		
		Double sumAssuredAmt = spService.getSumAssueredAmountByTreatmentId(treatmentId);
		return sumAssuredAmt;
	}
	
	@RequestMapping(value = "/getTotalBillInfoByTreatmentId", method = RequestMethod.GET)
	@ResponseBody	
	public BillMasterDto getTotalBillInfoByTreatmentId(@RequestParam("treatmentId") Integer treatmentId) {
		
		BillMasterDto obj = spService.getTotalBillInfoByTreatmentId(treatmentId);
		return obj;
	}
	
	@RequestMapping(value = "/updateShelfSponserFlagByTreatmentId", method = RequestMethod.POST)
	@ResponseBody	
	public String updateShelfSponserFlagByTreatmentId(@RequestParam("call") String call,@RequestParam("treatmentId") Integer treatmentId) {
		
		String msg = spService.updateShelfSponserFlagByTreatmentId(call, treatmentId);
		return msg;
	}
	
	
	@RequestMapping(value = "/getBasicStudyDataForFollucularStudy", method = RequestMethod.GET)
	@ResponseBody	
	public IVFFollicularStudy getBasicStudyDataForFollucularStudy(@RequestParam("masterFollicularStudyId") Integer masterFollicularStudyId) {
		
		IVFFollicularStudy obj = spService.getBasicStudyDataForFollucularStudy(masterFollicularStudyId);
				
				return obj;
	}
	
	@RequestMapping(value = "/saveFollicualrStudyBasicInfo", method = RequestMethod.GET)
	@ResponseBody	
	public int saveFollicualrStudyBasicInfo(@RequestParam("follicularBasicinfoDetails") String follicularBasicinfoDetails) {
		
		int  res = spService.saveFollicualrStudyBasicInfo(follicularBasicinfoDetails);
				
				return res;
	}
	
	@RequestMapping(value = "/getListForFollicularStudy", method = RequestMethod.GET)
	@ResponseBody	
	public FollicularStudyBasicInfoDTO getListForFollicularStudy(@RequestParam("masterFollicularStudyId") Integer masterFollicularStudyId) {
		
		FollicularStudyBasicInfoDTO obj =new FollicularStudyBasicInfoDTO();
		
		List<FollicularStudyBasicInfoDTO> list = spService.getListForFollicularStudy(masterFollicularStudyId);
				
		obj.setGetListForFollicularStudy(list);
				return obj;
	}
	
	@RequestMapping(value = "/deleteFollicularBasicInfo", method = RequestMethod.POST)
	@ResponseBody	
	public String deleteFollicularBasicInfo(@RequestParam("studyidRF") Integer studyidRF,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deleteFollicularBasicInfo(studyidRF, userId);
		return msg;
	}
	
	
	@RequestMapping(value = "/fetchFollicularStudyInfoForIVF", method = RequestMethod.POST)
	@ResponseBody	
	public IVFFollicularStudy fetchFollicularStudyInfoForIVF(@RequestParam("patId") Integer patId) {
		
		IVFFollicularStudy obj =new IVFFollicularStudy();
		
		List<IVFFollicularStudy> list = spService.fetchFollicularStudyInfoForIVF(patId);
				
		obj.setStudyList(list);
				return obj;
	}
	
	@RequestMapping(value = "/getCoupleId", method = RequestMethod.GET)
	@ResponseBody	
	public Integer getCoupleId(@RequestParam("patId") Integer patId) {
		
		Integer coupleId = spService.getCoupleId(patId);
		return coupleId;
	}
	
	
	@RequestMapping(value = "/saveCalenderInfoIVF", method = RequestMethod.GET)
	@ResponseBody	
	public int saveCalenderInfoIVF(@RequestParam("ivfCalenderBasicInfoDetails") String ivfCalenderBasicInfoDetails) {
		
		int  res = spService.saveCalenderInfoIVF(ivfCalenderBasicInfoDetails);
				
				return res;
	}
	
	@RequestMapping(value = "/getIvfCalenderInfo", method = RequestMethod.GET)
	@ResponseBody	
	public IVFCalenderInfoDTO getIvfCalenderInfo(@RequestParam("masterFollicularStudyId") Integer masterFollicularStudyId) {
		
		IVFCalenderInfoDTO obj =new IVFCalenderInfoDTO();
		
		List<IVFCalenderInfoDTO> list = spService.getIvfCalenderInfo(masterFollicularStudyId);
				
		obj.setGetListOfIvfCalenderInfo(list);
				return obj;
	}
	
	@RequestMapping(value = "/deleteIvfCalenderBasicInfo", method = RequestMethod.POST)
	@ResponseBody	
	public String deleteIvfCalenderBasicInfo(@RequestParam("studyidIvF") Integer studyidIvF,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deleteIvfCalenderBasicInfo(studyidIvF, userId);
		return msg;
	}
	
	@RequestMapping(value = "/cancelStudyRecordForIVF", method = RequestMethod.POST)
	@ResponseBody	
	public String cancelStudyRecordForIVF(@RequestParam("masterFollicularStudyId") Integer masterFollicularStudyId,@RequestParam("userId") Integer userId,@RequestParam("narration") String narration,@RequestParam("enddate") String enddate) {
		
		String msg = spService.cancelStudyRecordForIVF(masterFollicularStudyId, userId, narration,enddate);
		return msg;
	}
	
	
	@RequestMapping(value = "/getStudyCommitByReportId", method = RequestMethod.GET)
	@ResponseBody	
	public String getStudyCommitByReportId(@RequestParam("follicularstudyReportId") Integer follicularstudyReportId) {
		
		String msg = spService.getStudyCommitByReportId(follicularstudyReportId);
		return msg;
	}
	
	
	@RequestMapping(value = "/deleteBasicInfoIVFCalender", method = RequestMethod.GET)
	@ResponseBody	
	public String deleteBasicInfoIVFCalender(@RequestParam("ivfcalenderIds") String ivfcalenderIds,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deleteBasicInfoIVFCalender(ivfcalenderIds,userId);
		return msg;
	}
	
	@RequestMapping(value = "/deleteBasicInfoOfFollicular", method = RequestMethod.GET)
	@ResponseBody	
	public String deleteBasicInfoOfFollicular(@RequestParam("fmIds") String fmIds,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deleteBasicFollicularInfo(fmIds,userId);
		return msg;
	}
	
	@RequestMapping(value = "/getHusbandNameForOvamPickup", method = RequestMethod.GET)
	@ResponseBody	
	public String getHusbandNameForOvamPickup(@RequestParam("patId") Integer patId) {
		
		String msg = spService.getHusbandNameForOvamPickup(patId);
		return msg;
	}
	
	@RequestMapping(value = "/getDoctorListForOvamPickUp", method = RequestMethod.GET,produces="application/json")
	@ResponseBody	
	public Doctor getDoctorListForOvamPickUp() {
		List<Doctor> listDoctorDetails=new ArrayList<Doctor>();
		 listDoctorDetails = spService.getDoctorListForOvamPickUp();
		Doctor obj=new Doctor();
		//obj.setListDoctorDetails(listDoctorDetails);
		obj.setListDoctor(listDoctorDetails);
		
		
		return obj;
	}
	
	@RequestMapping(value = "/saveOvamPickUpForm", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOvamPickUpForm(OvamPickMasterDTO obj) {
		
		int  res = spService.saveOvamPickUpForm(obj);
				
				return res;
	}
	
	@RequestMapping(value = "/getOvamPickUpMasterInfo", method = RequestMethod.GET)
	@ResponseBody	
	public OvamPickMasterDTO getOvamPickUpMasterInfo(@RequestParam("patientId") Integer patientId,@RequestParam("cycleNo") String cycleNo) {
		
		OvamPickMasterDTO  obj = spService.getOvamPickUpMasterInfo(patientId, cycleNo);
				
				return obj;
	}
	
	
	@RequestMapping(value = "/deleteOvamPickUpSalveInfo", method = RequestMethod.GET)
	@ResponseBody	
	public String deleteOvamPickupSlaveInfo(@RequestParam("ovampickupslaveids") String ovampickupslaveids,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deleteOvamPickupSlaveInfo(ovampickupslaveids,userId);
		return msg;
	}
	
	@RequestMapping(value = "/saveEmbryoTransperForm", method = RequestMethod.POST)
	@ResponseBody	
	public int saveEmbryoTransperForm(EmbryoTransferMasterDTO obj,@RequestParam("freshEmbryoSlaveList") String freshEmbryoSlaveList,@RequestParam("frozenEmbryoSlaveList") String frozenEmbryoSlaveList) {
		
		int  res = spService.saveEmbryoTransperForm(obj, freshEmbryoSlaveList, frozenEmbryoSlaveList);
				
				return res;
	}
	
	@RequestMapping(value = "/getEmbryoMasterInfo", method = RequestMethod.GET)
	@ResponseBody	
	public EmbryoTransferMasterDTO getEmbryoMasterInfo(@RequestParam("patientId") Integer patientId,@RequestParam("cycleNo") String cycleNo) {
		
		EmbryoTransferMasterDTO  obj = spService.getEmbryoMasterInfo(patientId, cycleNo);
				
				return obj;
	}
	
	@RequestMapping(value = "/deletefreshEmbryoSlaveInfo", method = RequestMethod.GET)
	@ResponseBody	
	public String deletefreshEmbryoSlaveInfo(@RequestParam("freshEmbryoSlaveIds") String freshEmbryoSlaveIds,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deletefreshEmbryoSlaveInfo(freshEmbryoSlaveIds, userId);
		return msg;
	}
	
	@RequestMapping(value = "/deletefrozenEmbryoSlaveInfo", method = RequestMethod.GET)
	@ResponseBody	
	public String deletefrozenEmbryoSlaveInfo(@RequestParam("frozenEmbryoSlaveIds") String frozenEmbryoSlaveIds,@RequestParam("userId") Integer userId) {
		
		String msg = spService.deletefrozenEmbryoSlaveInfo(frozenEmbryoSlaveIds, userId);
		return msg;
	}
	
	@RequestMapping(value = "/saveOvamPickUpSlaveInfo", method = RequestMethod.POST)
	@ResponseBody	
	public int saveOvamPickUpSlaveInfo(@RequestParam("ovamPickUpSlaveList") String ovamPickUpSlaveList) {
		
		int  res = spService.saveOvamPickUpSlaveInfo(ovamPickUpSlaveList);
				
				return res;
	}
	
	
	@RequestMapping(value = "/getOvamPickUpSalveList", method = RequestMethod.GET)
	@ResponseBody	
	public OvamPickUpSlaveDTO getOvamPickUpSalveList(@RequestParam("patientId") Integer patientId,@RequestParam("cycleNo") String cycleNo) {
		
		OvamPickUpSlaveDTO  obj = spService.getOvamPickUpSalveList(patientId, cycleNo);
				
				return obj;
	}
	
	@RequestMapping(value = "/getOvamPickupDate", method = RequestMethod.GET)
	@ResponseBody	
	public String getOvamPickupDate(@RequestParam("patientId") Integer patientId,@RequestParam("cycleNo") String cycleNo) {
		
		String  res = spService.getOvamPickupDate(patientId, cycleNo);
				
				return res;
	}
	
	@RequestMapping(value = "/getEmbryoTransperDate", method = RequestMethod.GET)
	@ResponseBody	
	public String  getEmbryoTransperDate(@RequestParam("patientId") Integer patientId,@RequestParam("cycleNo") String cycleNo) {
		
		String   res = spService.getEmbryoTransperDate(patientId, cycleNo);
				
				return res;
	}
	
}
