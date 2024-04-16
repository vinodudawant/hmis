package com.hms.ivf.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HallManagementDto;
import com.hms.dto.Hall;
import com.hms.dto.TreatmentBeds;
import com.hms.dto.district_taluka_city;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dto.IVFAdmissionNoteDTO;
import com.hms.ivf.dto.IVFBatchMaster;
import com.hms.ivf.dto.IVFBatchSlave;
import com.hms.ivf.dto.IVFBatchViewDto;
import com.hms.ivf.dto.IVFClinicalEvaluationDTO;
import com.hms.ivf.dto.IVFClinicalEvaluationForAllergyAlertDTO;
import com.hms.ivf.dto.IVFClinicalEvaluatonPregnancyDTO;
import com.hms.ivf.dto.IVFcoupleViewDto;
import com.hms.ivf.dto.IvfPatientInfo;
import com.hms.ivf.dto.IvfQueueDTO;
import com.hms.ivf.dto.IvfTreBillDto;
import com.hms.ivf.dto.SurgeryAdviceForIvfDTO;
import com.hms.ivf.service.IvfService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/ivf")
public class IvfController {

	@Autowired
	IvfService ivfService;

	@RequestMapping(value = "/autoSuggestionforMalePatient", method = RequestMethod.GET)
	public @ResponseBody RegistrationDto fetchMale(@RequestParam("patientName") String patientName,
			@RequestParam("callfrom") String callfrom, HttpServletResponse response) {
		List<RegistrationDto> listregs = new ArrayList<RegistrationDto>();
		listregs = ivfService.fetchpatientnameMale(patientName, callfrom);
		RegistrationDto obj = new RegistrationDto();
		obj.setListReg(listregs);
		return obj;
	}

	@RequestMapping(value = "/autoSuggestionforFemalePatient", method = RequestMethod.GET)
	public @ResponseBody RegistrationDto fetchFemales(@RequestParam("patientName") String patientName,
			@RequestParam("callfrom") String callfrom, HttpServletResponse response) {
		List<RegistrationDto> listregs = new ArrayList<RegistrationDto>();
		listregs = ivfService.fetchpatientnameFemale(patientName, callfrom);
		RegistrationDto obj = new RegistrationDto();
		obj.setListReg(listregs);
		return obj;
	}

	@RequestMapping(value = "/getPatientDataById", method = RequestMethod.GET)
	public @ResponseBody RegistrationDto getPatientDataById(@RequestParam("itemid") Integer patientId) {
		RegistrationDto obj = new RegistrationDto();
		obj = ivfService.getPatientDataById(patientId);
		System.out.println(obj);
		return obj;
	}

	@RequestMapping(value = "/readImage", method = RequestMethod.GET)
	public void readPhoto(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			String imageName = request.getParameter("url");
			String pathToWeb = FilePath.getBasePath();
			File f = new File(pathToWeb + File.separator + imageName);
			ImageInputStream iis = ImageIO.createImageInputStream(f);
			if (iis != null) {
				Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);
				BufferedImage bi = ImageIO.read(f);
				OutputStream out = response.getOutputStream();
				while (imageReaders.hasNext()) {
					ImageReader reader = (ImageReader) imageReaders.next();
					ImageIO.write(bi, reader.getFormatName(), out);
				}
				out.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/list_state", method = RequestMethod.GET)
	public @ResponseBody List<district_taluka_city> list(@RequestParam("patid") int id) {
		System.out.println("id" + id);
		List<district_taluka_city> l = ivfService.getAddressList(id);
		return l;

	}

	@RequestMapping(value = "/generateCoupleId", method = RequestMethod.POST)
	@ResponseBody
	public synchronized int generateCoupleId(@RequestParam("ivfCoupleDetails") String ivfCoupleDetails,
			@RequestParam("queryType") String queryType, HttpServletRequest request) {
		int coupleId = ivfService.generateCoupleId(ivfCoupleDetails, queryType, request);
		return coupleId;
	}

	@RequestMapping(value = "/getIVFCoupleList ", method = RequestMethod.POST)
	public @ResponseBody IVFcoupleViewDto getIVFCoupleList(@RequestParam("coupleFlag") String coupleFlag,@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate,
			HttpServletRequest request) {

		List<IVFcoupleViewDto> ltIVFcoupleViewDto = new ArrayList<IVFcoupleViewDto>();

		ltIVFcoupleViewDto = ivfService.getIVFCoupleList(coupleFlag,fromDate,toDate);

		String count = ivfService.getCountCoupleMaster(coupleFlag, request);

		List<String> countnubmer = new ArrayList<>();
		countnubmer.add(count);

		IVFcoupleViewDto obj = new IVFcoupleViewDto();

		obj.setLstCoupleviewDto(ltIVFcoupleViewDto);
		obj.setCountCouple(count);

		return obj;
	}

	@RequestMapping(value = "/changeStatusOfIvfCouple", method = RequestMethod.POST)
	@ResponseBody
	public int changeStatusOfIvfCouple(@RequestParam("coupleID") int coupleID,
			@RequestParam("coupleFlag") String coupleFlag, @RequestParam("narration") String narration,
			HttpServletRequest request) {
		int StatusChangeFlag = 0;
		StatusChangeFlag = ivfService.changeStatusOfIvfCouple(coupleID, coupleFlag, narration, request);
		System.err.println("StatusChangeFlag--------------" + StatusChangeFlag);
		return StatusChangeFlag;

	}

	@RequestMapping(value = "/autoSuggestionForCoupleDetails", method = RequestMethod.POST)
	@ResponseBody
	public IVFcoupleViewDto autoSuggestionForCoupleDetails(@RequestParam("findText") String findText,
			@RequestParam("coupleSearchType") String coupleSearchType, @RequestParam("callFrom") String callFrom) {

		IVFcoupleViewDto ltIVFcoupleViewDto = new IVFcoupleViewDto();
		ltIVFcoupleViewDto = ivfService.autoSuggestionForCoupleDetails(findText, Integer.parseInt(coupleSearchType),
				callFrom);
		return ltIVFcoupleViewDto;
	}

	@RequestMapping(value = "/autoSuggestionForCoupleDetails1", method = RequestMethod.POST)
	@ResponseBody
	public IVFcoupleViewDto autoSuggestionForCoupleDetails1(@RequestParam("coupleId") String coupleId,
			@RequestParam("callFrom") String callFrom) {

		IVFcoupleViewDto ltIVFcoupleViewDto = new IVFcoupleViewDto();
		ltIVFcoupleViewDto = ivfService.autoSuggestionForCoupleDetails1(Integer.parseInt(coupleId), callFrom);
		return ltIVFcoupleViewDto;
	}

	@RequestMapping(value = "/getBedAllocatedStatus", method = RequestMethod.POST)
	@ResponseBody
	public int getBedAllocatedStatus(@RequestParam("TreatmentId") int treatmentId, HttpServletRequest request) {
		int BedStatus = 0;
		BedStatus = ivfService.getBedAllocatedStatus(treatmentId, request);
		System.err.println("BedStatus--------------" + BedStatus);
		return BedStatus;
	}

	@RequestMapping(value = "/generateBatch", method = RequestMethod.POST)
	@ResponseBody
	public synchronized int generateBatch(@RequestParam("ivfBatchMasterDetails") String ivfBatchMasterDetails,
			@RequestParam("ivfBatcInsertType") String ivfBatcInsertType, HttpServletRequest request) {

		String[] ivfBatchSlaveDetails = request.getParameterValues("ivfBatchSlaveDetails");
		IVFBatchSlave ivfBatchSlaveDto = new IVFBatchSlave();
		String str = ivfBatchSlaveDetails[0].substring(0, ivfBatchSlaveDetails[0].length());

		if (!ivfBatchSlaveDetails.equals("null")) {
			for (int i = 0; i < ivfBatchSlaveDetails.length; i++) {
				ivfBatchSlaveDto = (IVFBatchSlave) ConfigUIJSONUtility.getObjectFromJSON(str, IVFBatchSlave.class);
			}
		} else {
			ivfBatchSlaveDetails = null;
		}

		int BatchId = ivfService.generateBatch(ivfBatchMasterDetails, ivfBatchSlaveDto, ivfBatcInsertType, request);
		return BatchId;
	}

	@RequestMapping(value = "/getIVFBatchedCoupleList ", method = RequestMethod.POST)
	public @ResponseBody IVFBatchMaster getIVFBatchedCoupleList(@RequestParam("ivfBatchStatus") String ivfBatchStatus,
			HttpServletRequest request) {

		List<IVFBatchMaster> ltIVFbatchViewDto = new ArrayList<IVFBatchMaster>();

		ltIVFbatchViewDto = ivfService.getIVFBatchedCoupleList(ivfBatchStatus);

		String count = ivfService.getCountBatchMaster(ivfBatchStatus, request);

		List<String> countnubmer = new ArrayList<>();
		countnubmer.add(count);

		IVFBatchMaster obj = new IVFBatchMaster();

		obj.setLtivfBatchMaster(ltIVFbatchViewDto);
		obj.setCountBatch(count);

		return obj;
	}

	@RequestMapping(value = "/getBatchedCoupleDetails", method = RequestMethod.POST)
	public @ResponseBody IVFBatchViewDto getBatchedCoupleDetails(@RequestParam("batchID") Integer batchID,
			@RequestParam("ivfCoupleStatus") String ivfCoupleStatus, HttpServletRequest request) {

		List<IVFBatchViewDto> listBatchView = new ArrayList<IVFBatchViewDto>();
		listBatchView = (List<IVFBatchViewDto>) ivfService.getBatchedCoupleDetails(batchID, ivfCoupleStatus);

		IVFBatchViewDto obj = new IVFBatchViewDto();
		obj.setLstBatchviewDto(listBatchView);

		return obj;
	}

	@RequestMapping(value = "/CancelIVFBatch", method = RequestMethod.POST)
	@ResponseBody
	public int CancelIVFBatch(@RequestParam("ivfBatchMasterId") int batchID,
			@RequestParam("BatchCancelNarration") String BatchCancelNarration, HttpServletRequest request) {
		int BatchCancel = 0;
		BatchCancel = ivfService.CancelIVFBatch(batchID, BatchCancelNarration, request);
		return BatchCancel;

	}

	@RequestMapping(value = "/autoSuggestionForBatchDetails", method = RequestMethod.POST)
	@ResponseBody
	public IVFBatchMaster autoSuggestionForBatchDetails(@RequestParam("findText") String findText,
			@RequestParam("batchSearchType") String batchSearchType, @RequestParam("callFrom") String callFrom) {

		IVFBatchMaster ltIVFBatchMasterDto = new IVFBatchMaster();
		ltIVFBatchMasterDto = ivfService.autoSuggestionForBatchDetails(findText, Integer.parseInt(batchSearchType),
				callFrom);
		return ltIVFBatchMasterDto;
	}

	@RequestMapping(value = "/autoSuggestionForBatchDetails1", method = RequestMethod.POST)
	@ResponseBody
	public IVFBatchMaster autoSuggestionForBatchDetails1(@RequestParam("ivfBatchMasterId") String ivfBatchMasterId,
			@RequestParam("callFrom") String callFrom) {

		IVFBatchMaster ltIVFBatchMaster = new IVFBatchMaster();
		ltIVFBatchMaster = ivfService.autoSuggestionForBatchDetails1(Integer.parseInt(ivfBatchMasterId), callFrom);
		return ltIVFBatchMaster;
	}

	@RequestMapping(value = "/fetchNarrationOfCouple", method = RequestMethod.POST)
	@ResponseBody
	public String fetchNarrationOfCouple(@RequestParam("ivfCoupleId") int ivfCoupleId, HttpServletRequest request) {
		String narration = "";
		narration = ivfService.fetchNarrationOfCouple(ivfCoupleId, request);
		return narration;
	}

//@author : Amol Jadhav @date: 24-March-2021 @reason : To Save

	@RequestMapping(value = "/saveSurgeryadviceService", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateSurgeryadvice(SurgeryAdviceForIvfDTO obj, HttpServletRequest request) {

		int res = 0;
		res = ivfService.saveOrUpdateSurgeryadvice(obj, request);

		return res;
	}

	// @author : Amol Jadhav @date: 24-March-2021 @reason : To Fetch
	@RequestMapping(value = "/fetchSurgeryAdviceInfoForIVF", method = RequestMethod.POST)
	@ResponseBody
	public SurgeryAdviceForIvfDTO fetchSurgeryAdviceInfoForIVF(@RequestParam("treatmentId") Integer treatmentId) {

		SurgeryAdviceForIvfDTO obj1 = new SurgeryAdviceForIvfDTO();

		List<SurgeryAdviceForIvfDTO> list = ivfService.fetchSurgeryAdviceInfoForIVF(treatmentId);

		obj1.setLstSubServiceforSurgeryadvice(list);

		return obj1;
	}
	// @author : Amol Jadhav @date: 24-March-2021 @reason : To Delete

	@RequestMapping(value = "/deleteDataforsurgeryAdviceBasicInfo", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDataforsurgeryAdviceBasicInfo(@RequestParam("adviceMasterId") Integer adviceMasterId,
			@RequestParam("userId") Integer userId) {

		String msg = ivfService.deleteDataforsurgeryAdviceBasicInfo(adviceMasterId, userId);
		return msg;
	}

	// @author : Amol Jadhav @date: 25-March-2021 @reason : To Edit
	@RequestMapping(value = "/editsurgeryadvicerecord", method = RequestMethod.GET)
	public @ResponseBody SurgeryAdviceForIvfDTO editsurgeryadvicerecord(@RequestParam("adviceID") Integer adviceID) {

		SurgeryAdviceForIvfDTO obj2 = new SurgeryAdviceForIvfDTO();
		obj2 = ivfService.editsurgeryadvicerecord(adviceID);
		return obj2;
	}

	// @author : Amol Jadhav @date: 29-March-2021 @reason : To Save

	@RequestMapping(value = "/saveOrUpdateAdmissionNote", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateAdmissionNote(IVFAdmissionNoteDTO obj, HttpServletRequest request) {

		int res = 0;
		res = ivfService.saveOrUpdateAdmissionNote(obj, request);

		return res;
	}

	// @author : Amol Jadhav @date: 29-March-2021 @reason : To Fetch

	@RequestMapping(value = "/fetchRecordadmissionnoteForIVF", method = RequestMethod.POST)
	@ResponseBody
	public IVFAdmissionNoteDTO fetchRecordadmissionnoteForIVF(@RequestParam("treatmentId") Integer treatmentId) {

		IVFAdmissionNoteDTO obj2 = new IVFAdmissionNoteDTO();

		List<IVFAdmissionNoteDTO> list = ivfService.fetchRecordadmissionnoteForIVF(treatmentId);

		obj2.setLstivfaddnote(list);

		return obj2;
	}
	// @author : Amol Jadhav @date: 1-April-2021 @reason : To Save

	@RequestMapping(value = "/saveOrUpdateClinicalEvaluationforAllergyAlert", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateClinicalEvaluationforAllergyAlert(IVFClinicalEvaluationForAllergyAlertDTO obj,
			HttpServletRequest request) {

		int res = 0;
		res = ivfService.saveOrUpdateClinicalEvaluationforAllergyAlert(obj, request);

		return res;
	}

	// @author : Amol Jadhav @date: 1-apr-2021 @reason : To Fetch
	@RequestMapping(value = "/fetchRecordClinicalEvaluationForIVF", method = RequestMethod.POST)
	@ResponseBody
	public IVFClinicalEvaluationForAllergyAlertDTO fetchRecordClinicalEvaluationForIVF(
			@RequestParam("treatmentId") Integer treatmentId) {

		IVFClinicalEvaluationForAllergyAlertDTO obj2 = new IVFClinicalEvaluationForAllergyAlertDTO();

		List<IVFClinicalEvaluationForAllergyAlertDTO> list = ivfService
				.fetchRecordClinicalEvaluationForIVF(treatmentId);

		obj2.setLstclinicalevaluationallergyallert(list);

		return obj2;
	}

	// @author : Amol Jadhav @date: 1-apr-2021 @reason : To Edit
	@RequestMapping(value = "/editRecordClinicalEvaluationForIVFAllergyAlert", method = RequestMethod.GET)
	public @ResponseBody IVFClinicalEvaluationForAllergyAlertDTO editRecordClinicalEvaluationForIVFAllergyAlert(
			@RequestParam("allergyalertid") Integer allergyalertid) {

		IVFClinicalEvaluationForAllergyAlertDTO obj2 = new IVFClinicalEvaluationForAllergyAlertDTO();
		obj2 = ivfService.editRecordClinicalEvaluationForIVFAllergyAlert(allergyalertid);
		return obj2;
	}

	// @author : Amol Jadhav @date: 1-apr-2021 @reason : To Delete
	@RequestMapping(value = "/deleterecordClinicalEvaluationForIVFAllergyAlert", method = RequestMethod.GET)
	@ResponseBody
	public String deleterecordClinicalEvaluationForIVFAllergyAlert(
			@RequestParam("allergyalertIdRow") String allergyalertIdRow, @RequestParam("userId") int userId) {
		// System.out.println("deleteIvfPrescriptionRow.....prescriptionIdRow..userId" +
		// prescriptionIdRow + " ;;;;;" + userId);
		String msg = ivfService.deleterecordClinicalEvaluationForIVFAllergyAlert(allergyalertIdRow, userId);
		return msg;
	}

	// @author : Amol Jadhav @date: 29-March-2021 @reason : To Save

	@RequestMapping(value = "/saveOrUpdateInfoPreganacyData", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateInfoPreganacyData(IVFClinicalEvaluatonPregnancyDTO obj, HttpServletRequest request) {

		int res = 0;
		res = ivfService.saveOrUpdateInfoPreganacyData(obj, request);

		return res;
	}

	@RequestMapping(value = "/fetchInfoPreganacyData", method = RequestMethod.GET)
	@ResponseBody
	public IVFClinicalEvaluatonPregnancyDTO fetchInfoPreganacyData(@RequestParam("treatmentId") Integer treatmentId) {
		System.out.println("treatmentId" + treatmentId);
		IVFClinicalEvaluatonPregnancyDTO obj = new IVFClinicalEvaluatonPregnancyDTO();
		obj = ivfService.fetchInfoPreganacyData(treatmentId);

		System.out.println("IVFClinicalEvaluatonPregnancyDTOIVFClinicalEvaluatonPregnancyDTO" + obj);
		return obj;
	}
//@author : Amol Jadhav @date: 29-March-2021 @reason : To Save

	@RequestMapping(value = "/saveOrUpdateCKEditorDocterDeskIvf", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrUpdateCKEditorDocterDeskIvf(IVFClinicalEvaluationDTO obj, HttpServletRequest request) {

		System.out.println("IVFClinicalEvaluationDTO");
		int res = 0;
		res = ivfService.saveOrUpdateCKEditorDocterDeskIvf(obj, request);

		return res;
	}

	@RequestMapping(value = "/fetchClinicalInfo", method = RequestMethod.GET)
	@ResponseBody
	public IVFClinicalEvaluationDTO fetchClinicalInfo(@RequestParam("treatmentId") Integer treatmentId) {
		// System.out.println("treatmentId"+treatmentId);
		IVFClinicalEvaluationDTO obj = new IVFClinicalEvaluationDTO();
		obj = ivfService.fetchClinicalInfo(treatmentId);

		// System.out.println("obj"+obj);
		return obj;
	}

	@RequestMapping(value = "/viewIVFQueue", method = RequestMethod.POST)
	public @ResponseBody IvfQueueDTO getIvfQueue(HttpServletRequest request) {

		IvfQueueDTO objIvfQueue = new IvfQueueDTO();
		List<IvfQueueDTO> lstIvfQueue = new ArrayList<IvfQueueDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");// Get unit id from session
		lstIvfQueue = ivfService.viewIVFQueue(unitId);
		objIvfQueue.setLstIvfQueue(lstIvfQueue);
		return objIvfQueue;
	}
	
	@RequestMapping(value = "/autoSuggestationIvfQueue", method = RequestMethod.POST)
	public @ResponseBody IvfQueueDTO autoSuggestationIvfQueue(@RequestParam("searchText") String searchText,@RequestParam("patSearchType") String patSearchType,
	 @RequestParam("callFrom") String callFrom) {
		
		IvfQueueDTO objIvfQueue=new IvfQueueDTO();
		List<IvfQueueDTO> lstIvfQueue = new ArrayList<IvfQueueDTO>();
		lstIvfQueue = ivfService.autoSuggestationIvfQueue(searchText,Integer.parseInt(patSearchType),callFrom);		
		objIvfQueue.setLstIvfQueue(lstIvfQueue);
		return objIvfQueue;
	}

	
	@RequestMapping(value = "/getIvfQueuePatientByTreatmentId", method = RequestMethod.POST)
	public @ResponseBody IvfQueueDTO getIvfQueuePatientByTreatmentId(@RequestParam("treatId") Integer treatId) {
		
		IvfQueueDTO objIvfQueue=new IvfQueueDTO();
		
		objIvfQueue = ivfService.getIvfQueuePatientByTreatmentId(treatId);		
		
		return objIvfQueue;
	}
	
	@RequestMapping(value = "/fetchWordWiseHallList", method = RequestMethod.POST)
	@ResponseBody
	public ChargesMasterSlave fetchWordWiseHallList(@RequestParam("hallType")Integer hallType) {
		ChargesMasterSlave chargesmasterslave = new ChargesMasterSlave();
		List<ChargesMasterSlave> list = ivfService.fetchWordWiseHallList(hallType);
		chargesmasterslave.setLstChargesSlave(list);
		return chargesmasterslave;

	}

	@RequestMapping(value = "/fetchHallWiseNumberOfBeds", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto fetchHallWiseNumberOfBeds( @RequestParam("hallId")Integer hallId, @RequestParam("callFrom")String callFrom) {
		return ivfService.fetchHallWiseNumberOfBeds(hallId,callFrom);

	}
	
	@RequestMapping(value = "/getIvfPatientDetailsByTreatmentId", method = RequestMethod.POST)
	public @ResponseBody
	IvfTreBillDto fetchIvfPatientDetailsByTreatmentId(
			@RequestParam("callform") Integer treatmentId) {
		List<IvfTreBillDto> ltIvfPatientDto = new ArrayList<IvfTreBillDto>();
		ltIvfPatientDto = ivfService.fetchIvfPatientDetailsByTreatmentId(treatmentId);
		
		IvfTreBillDto obj=new IvfTreBillDto();
		obj.setListIvfTreBillDto(ltIvfPatientDto);
			
		return obj;
		
	}	
	
	@RequestMapping(value = "/allocateBedToIvfPatient", method = RequestMethod.POST)
	@ResponseBody
	public String allocateBedToIvfPatient( TreatMentBeds obj, @RequestParam("BedAllocStatus") String BedAllocStatus, @RequestParam("DallocBedId") String DallocBedId, @RequestParam("billableBedType") String billableBedType, @RequestParam("patientType") String patientType, 
			@RequestParam("coupleId") Integer CoupleId ,@RequestParam("batchNo") String BatchNo) {
		return ivfService.allocateBedToIvfPatient(obj, BedAllocStatus, DallocBedId, billableBedType, patientType,CoupleId,BatchNo);

	}
	
	@RequestMapping(value = "/getIVFBillable", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentBeds getIVFBillable(
			@RequestParam("Treatment_ID") Integer treatmentId) {
		List<TreatmentBeds> ltIvfPatientBedDetails = new ArrayList<TreatmentBeds>();
		ltIvfPatientBedDetails = ivfService.getIVFBillable(treatmentId);
		TreatmentBeds obj=new TreatmentBeds();
		obj.setList(ltIvfPatientBedDetails);
			
		return obj;
		
	}	
	
	@RequestMapping(value = "/getIVFHallDetails", method = RequestMethod.POST)
	public @ResponseBody
	Hall getIVFHallDetails(HttpServletRequest request,
			@RequestParam("hallID") Integer hallID) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		
		List<Hall> ltIvfHallDetails = new ArrayList<Hall>();
		ltIvfHallDetails = ivfService.getIVFHallDetails(hallID, unitId);
		Hall obj=new Hall();
		obj.setHallList(ltIvfHallDetails);
			
		return obj;
		
	}	
	
	@RequestMapping(value = "/cancelAdmissionOfIvfPatient", method = RequestMethod.POST)
	@ResponseBody
	public String cancelAdmission(@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivfTreatId") Integer ivfTreatId,@RequestParam("narration") String narration,HttpServletRequest request) {
		
		TreatmentDto treatmentDto = new TreatmentDto();
		treatmentDto.setPatientId(patientId);
		treatmentDto.setTreatmentId(treatmentId);
		treatmentDto.setIvfTreatID(ivfTreatId);
		treatmentDto.setCancelNarration(narration);
		
		int response = ivfService.cancelAdmissionOfIvfPatient(treatmentDto,request);
		String msg = "";
		if (response == 1) {
			msg = "IVF Patient Admission cancelled Successfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	@RequestMapping(value = "/deallocateBedToIvfPatient", method = RequestMethod.POST)
	@ResponseBody
	public String deallocateBedToIvfPatient(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return ivfService.deallocateBedToIvfPatient(treatmentId,userId);

	}
	
	@RequestMapping(value = "/checkCoupledOrNot", method = RequestMethod.POST)
	@ResponseBody   
	public String checkCoupledOrNot(@RequestParam("patientId") Integer patientId,@RequestParam("gender") String gender,HttpServletRequest request) {
		
		int response = ivfService.checkCoupledOrNot(gender, patientId ,request);
		
		String msg = "";
		if (response == 1) {
			msg = "This Patient Already Coupled..";
		} else {
			msg = "-";
		}
		return msg;	
	}
	
	
	@RequestMapping(value = "/getIvfPatientInfoByPatientId", method = RequestMethod.POST)
	@ResponseBody
	public IvfPatientInfo getIvfPatientInfoByPatientId(@RequestParam("patientId") Integer patientId,@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return ivfService.getIvfPatientInfoByPatientId(patientId, unitId);

	}
	
}

