package com.hms.pathology.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestGeneralValueDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologySampleWiseSlave;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.dto.SendToOutSourceDocumentDto;

public interface Phlebotomyservice 
{
	List<PathologySampleWiseMaster> getphlebotomyRecord(String patientType,String callFrom,String emergencyFlag,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getPhlebotomyRecordWithSamplyWise(Integer pId,Integer tId,HttpServletRequest request);
	
	public Integer sendToLab(PathologySampleWiseMaster master, String subList,String histoList, String registeredAt, HttpServletRequest request);
	
	public LabTestDTO getPathologyPreDetails(PathologySampleWiseMaster master, String callFrom, HttpServletRequest request);

	public boolean collectionRecord(String idList,String callform,HttpServletRequest request,String meeshaFlow,String collectionTime,String SampleCollected);
   
	public boolean patientTestHold(String id,String phlebotype,HttpServletRequest request);

	List<PathologySampleWiseMaster> getAccessionRecord(String callfrom,String emergencyFlag,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getProfileAndTestRecord(String Id,String outlabId,HttpServletRequest request);
	
	public String getCountOfTabs(HttpServletRequest request);
	
	public boolean rejectedInprofiletest(Integer masterid,Integer profileid,Integer testId,String testflag,Integer rejectedResion,String callfrom, HttpServletRequest request);
	
	public boolean AccessionpatientTestReject(String idList,String remarks,String callfrom,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getRoutinevalueResutl(String masterid,Integer treatmentid, String patientType,HttpServletRequest request);
	
	public Integer savePrerequisiteInTreatment(String hieghtPupUp, String weightPupUp, String urineValumePupUp, String lmpDatePupUp,Integer tId,Integer pId);
	
	public String getPageCount(String callFrom, String tabId, String emergencyFlag, HttpServletRequest request);
	
	public String getBarcodeIdFromSampleWise(Integer patientId, Integer treatmentId,Integer sampleTypeId, Integer inOutHouse, HttpServletRequest request);
	
	List<LabPhlebotomyMaster> getpathologistname(HttpServletRequest request);
	
	public boolean saveLabTestRoutineValueResult(String id, String statusFlag,Integer idPathologist,String kitSpecId,Integer machineId,String SerialNo ,String phlebotomyListTestsalve,String profileIdcomments,HttpServletRequest request,HttpServletResponse res,String phlebotomysamplemastertable);
	
	public boolean changeStatusOfTest(String idList,String statusFlag,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getRoutinevalueResutlusingPrint(String masterid,Integer treatmentid,String patientType,Integer unitId,HttpServletRequest request);
	
	public String updateEmailStatus(String masterid,Integer treatmentid,String patientType,Integer unitId,String mailStatus, Integer userId);
	
	List<PathologySampleWiseMaster> getdepartmentname(HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getdepartmentWiseWorkList(Integer Iddepartment,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getTreatmentIdList(Integer patientId,HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getTreatmentIdwiseRoutineValueResult(Integer tId,HttpServletRequest request);
	
	public String getPageCountRecollection(String callFrom, String tabId, String emergencyFlag, HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getAllRecollectionRequestBToBAndBToC(String callfrom, String emergencyFlag, HttpServletRequest request);
	
	List<PathologySampleWiseMaster> gettestViewRecollectionRequest(String masterid,Integer treatmentid, String patientType,String reCollectionType,String tabType,HttpServletRequest request);
	
	List<PathologyTestReasonDto> getTestReasonName(String callfrom, String sampleTypeId, HttpServletRequest request);

	public boolean processingAreaRecollectionTest(String recollectionList,String recollectionReason,HttpServletRequest request);

	public boolean unjectsampleAccessionTab(String masterId,String callform,HttpServletRequest request);

	public String getRecordCountForAuthorizeTabIndicator(Integer statusCode, String txtFdate, String txtTdate, HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getRecordAgainstIndicator(String indicatorType, Integer startIndex,Integer statusCode, String fromDate, String toDate,HttpServletRequest request);
	
	public boolean sendToOutSourceTest(String idList,Integer labCenterId,String dispatchDate,String dispatchTime,String carrierName,String comment,Integer inouthouse,HttpServletRequest request);

	List<PathologySampleWiseMaster> getForcedOutSourcedRecord(String emergencyFlag, HttpServletRequest request);

	public List<PathologySampleWiseMaster> outSourcedPatientAutoSuggestion(String searchText,String tabId, HttpServletRequest request);

	List<PathologySampleWiseMaster> getOutSourceTypeById(Integer outSourceType,Integer outSourceTypeId,String tabId, HttpServletRequest request);
	
	List<PathologySampleWiseMaster> fetchLabNameByType(Integer outSourceType, HttpServletRequest request);

	public boolean sendToPhlebotomyRecollection(String idList,HttpServletRequest request);
	
	public boolean rejectSampleFromRecollection(String idList,HttpServletRequest request);

	public boolean dropSampleFromRecollection(String idList,HttpServletRequest request);
	
	public boolean sendToProcessingTest(String phlebotomyListTestsalve,String callfrom,HttpServletRequest request);

	public boolean rejectTestRequestInPathologistTab(String phlebotomyListTestsalve,String callfrom,HttpServletRequest request);

	List<PathologySampleWiseMaster> getTestwiseTrendanalysis(Integer patientId,Integer testId, HttpServletRequest request);

	List<LabPhlebotomyMaster> getmachinename(HttpServletRequest request);

	public boolean bulkPostRecord(String idList,HttpServletRequest request,HttpServletResponse res);
	
	public boolean checkDuplicateFile(String documentName, String Id);
	
	public int saveOutsourceDocument(List<SendToOutSourceDocumentDto> docList);
	
	public List<SendToOutSourceDocumentDto>  getOutsourceDocumentsById(Integer treatmentId,Integer id);

	boolean deleteOutSourceUploadedDocument(Integer outmasterId, HttpServletRequest request);

	List<LabMicroorganismsDto> getmicroorganismName(Integer testId,HttpServletRequest request);

	List<LabGradingsDto> getgradingName(Integer testId,HttpServletRequest request);

	public boolean reRunTestResult(String reRunTestResultList,HttpServletRequest request);

	public TreatmentDto showPatientPreviousHistory(Integer treatmentId, HttpServletRequest request);
	
	public String getOldestCollectionDateInString(String masterIds);
	
	List<LabTestGeneralValueDto> getGenralValueName(Integer testId,HttpServletRequest request);

	public boolean bulkAuthoriseRecord(String idList,HttpServletRequest request);

	List<PathologySampleWiseMaster>  getemailFileds(String idList,HttpServletRequest request);
	
	public boolean checkTestAssignedToPatient(Integer patientId, Integer treatmentId, String masterId, HttpServletRequest request);
	
	public String getMergedReportPath(Integer patientId, Integer treatmentId, Integer unitId, HttpServletRequest request);
	
	List<PathologySampleWiseMaster> getSampleTypeListFromTid(Integer patientId,
			Integer treatmentId, String callFrom, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getBarcodeWiseTestIds(Integer patientId, Integer treatmentId, Date currentDateTime, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getSampleWiseProfileFromPackage(Integer unitId, Integer businessType, Integer serviceId, Integer subServiceId, Integer patientId, Integer treatmentId, Integer billDetailsId);
	
	public String checkDuplicateServicesFromPackage(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId);
	
	public String getDefaultBarcodeForPackage(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId);

	public String checkDuplicateServicesInPackage(Integer serviceId, Integer subServiceId, Integer editSubServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId);

	public String getDefaultBarcodeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId);
	
	public Integer getDefaultSampleTypeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId);
	
	public long checkDuplicateBarcodeForPackage(Integer unitId, Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId, String sampleWiseBarcodes, String barcode, String callFrom);

	public Integer checkDuplicateCollectionCharges(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId);
	
	public PathologySampleWiseMaster getPatientWiseSamples(Integer unitId, Integer testStatus, Integer patientId, Integer treatmentId, String callFrom);
	//added by Dayanand 2-09-2021
	public int saveTemplateInfo(PathologyTemplateRotineValueDTO obj,HttpServletRequest request) ;
	//added by Dayanand 27-09-2021
	 PathologyTemplateRotineValueDTO getTemplateInfoByMasterId(Integer masterid);
	//added by Dayanand 27-09-2021
	 PathologyTemplateMasterDTO getDefaultTemplateByProfileId(Integer profileId);

	// added by ROHIT AMBAWADE on 22 Nov 2021 
	public Integer getPrintCount(String masterId);
	//added by Rohit 12-09-2021
	public String getGeneralType(String generalValue,HttpServletRequest request);
	
	PathologySampleWiseMaster getRecordCountOnAuthorization(Integer statusCode, String fromDate, String toDate,HttpServletRequest request);
	
	public LabTestDTO getInvstigationPreDetails(PathologySampleWiseMaster master, String callFrom, HttpServletRequest request);

    public PathologySampleWiseSlave   getPathologySamplewiseSlaveDetailsForPrint(int testId,int profileId,int treatmentId);
    
    public PathologySampleWiseMaster   getLabTestNormalValueDetialsForPrint(String sex,int agetType,int age,List<LabTestNormalValuesDTO>  listNormalResult);

    public   List<PathologySampleWiseMaster>   getTestComponentListByProfileId(int profileId);
    
    public PathologySampleWiseMaster   getLabNormalValuesForPrint(String sex,int agetType,int age,int testId);
    
    public PathologySampleWiseMaster   getTrendAnaylsisDetailsForPrint(int patientId,int treatMentId,int testId);
    
    List<PathologySampleWiseMaster> getRoutinevalueResutlusingNewPrint(String masterid,Integer treatmentid,String patientType,Integer unitId,HttpServletRequest request);

    public PathologySampleWiseMaster   getLabNormalValuesForPrintInDays(String sex,int agetType,int age,int testId);
    
    public int  convertReportingToAutorization(String idList,String statusFlag,HttpServletRequest request);

}