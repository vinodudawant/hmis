package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DoctorRoundReport;
import com.hms.dto.LabProfile;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.Treatment;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatComplaintFindingDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ipd.dto.DoctorRoundDTO;

public interface DoctorDeskService {

	int savecpoe(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module);

	List<CpoeServdetails> getlistbiil(Integer pID, String callform,
			Integer servid, HttpServletRequest request);

	int deleteservdetails(String labservicelist, String callform, HttpServletRequest request);

	

	//List<BillDetailsDto> deleteServices(Integer treatmentId, Integer serviceId);

	//List<BillDetailsDto> deleteServices(Integer treatmentId, Integer serviceId);

	int deleteServices(String servId, String tretId, HttpServletRequest request);

	int cancleServices(String servId, String tretId,String cancleType,String remarkcanceltest, HttpServletRequest request);

	int saveIpd(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request, String queryType, String module);
	int addPathologyPackageFromIpdBilling(BillDetailsIpdDto billDetailsDto, HttpServletRequest request, String queryType, String module,String sampleWiseBarcodes);

	int savecpoeOT(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType, String callfrom);

	List<CpoeOTdetails> getlistservciesotcope(Integer tID, String callform,
			HttpServletRequest request, Integer treatmentoperationid);
	
	int deletesIpdSrvDetails(String labservicelist, HttpServletRequest request);

	int deleteIpdServices(String servId, String tretId,
			HttpServletRequest request);

	int cancleIpdServices(String servId, String tretId, String cancleType,String remarkcanceltest,
			HttpServletRequest request);
	
	//@author Bilal @date 03-JULY-2017 @code for update OPD receipt , Integer billDetailsId
	int updateOPDrecipt(BillDetailsDto billDetailsDto,
			HttpServletRequest request, String queryType);


	List<CpoeIPDdetails> getlistservciesipdcope(Integer tID, String callform,
			HttpServletRequest request);
	
	//@author Bilal @date 05-JULY-2017 @code for update IPD receipt 
	int updateOPDreciptIPD(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType);

	//@author Bilal @date 07-JULY-2017 @code for save new service to OPD receipt 
	int saveNewSer(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType);
	
	//@author Bilal @date 07-JULY-2017 @code for save new service to IPD receipt 
	int saveNewToIPD(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType);

	//@author Bilal @date 10-JULY-2017 @code for delete service from receipt
	int deleteReceiptOfOPD(Integer slaveId, HttpServletRequest request);

	//@author Bilal @date 17-July-2017 @code for delete service from IPD Receipt
	int deleteOnClickForRecieptIPD(Integer billRecSlaveId,
			HttpServletRequest request);

	//@author Bilal @date 21-July-2017 @code for delete main opd Receipt
	//int deleteMasterReceiptOPD(Integer recId, HttpServletRequest request);
	int deleteMasterReceiptOPD(Integer recId,String deleteRemark, HttpServletRequest request);

	//@author Bilal @date 21-July-2017 @code for reset main opd Receipt
	int resetMasterReceiptOPD(Integer recId, HttpServletRequest request);

	//@author Bilal @date 24-July-2017 @code for delete main Ipd Receipt
	int deleteMasterReceiptIPD(Integer recId, String deleteRemark,	 HttpServletRequest request);

	//@author Bilal @date 24-July-2017 @code for reset main opd Receipt
	int resetMasterReceiptIPD(Integer recId, HttpServletRequest request);

	//@author Bilal @date 9-AGug-2017 @code for save package billing data of opd
	int savePackageOpd(
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request, String queryType, String callfrom);

	//@author Bilal @date 16-AGug-2017 @code for cancle package billing services of opd
	int cancleOPDPackageSer(Integer otherBillDetailsId, String cancleType,
			HttpServletRequest request);
	
	//@author Bilal @date 16-AGug-2017 @code for cancle package billing services of Ipd
	int cancleIPDPackageSer(Integer otherBillDetailsId, String cancleType,
			HttpServletRequest request);
	//@author Laxman @date 13-Feb-2018 @code for get Lab test details
	CpoeServdetails fetchlabbilldetails(Integer tID, String callform,
			Integer deptId, HttpServletRequest request);
	//@author Laxman @date 14-Feb-2018 @code for get Lab test Result
	List<LabProfile> fetchLabTestResult(Integer testmasterId, Integer labReqSlvId,Integer subSerId,
			Integer tretId, String isPackageFlag, String callfrom);

	CpoeIPDdetails fetchIpdCoversheetLab(Integer tID, String callform,
			Integer deptId, HttpServletRequest request);
	//@author Laxman @date 22-Feb-2018 @code fetch for compare Lab test Result
	List<LabProfile> compareLabTestResult(String callfrom, Integer tretId, Integer patientId);
	
	int deleteom(String opId, String callform, HttpServletRequest request);

	
	/*int saveComplaintFinding(int pId, int treatId, EhatComplaintFindingDto checkAnswer,
			String type, String queryType,HttpServletRequest request);*/

	List<EhatComplaintFindingDto> fetchComplaintFinding(Integer pId, Integer treatId, Integer emrId, HttpServletRequest request);

	SubObjTemplateDto fetchSubObjTemplate(Integer bodyPart, Integer speciality,
			HttpServletRequest request);

	/*QuestionMasterDto setOncoEmrTemplates(Integer selDocSpec, Integer bodyPart,
			Integer tempId, Integer pId, Integer treatId, Integer emrId,
			HttpServletRequest request);

	int saveEmrQueAns(List<EhatEMRPatientTemplate> ehatEMRPatientTemplates,
			HttpServletRequest request);

	EhatEMRPatientTemplate fetchEMRTemplate(Integer pId, Integer treatId,
			Integer emrId, HttpServletRequest request);*/
			
//@author Laxman @date 04-March-2018 @code for sendToLab in OPD CPOE 
	int OpdCpoeSendToLab(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request);
	//@author Laxman @date 04-March-2018 @code for sendToLab in IPD CPOE 
	int IpdCpoeSendToLab(BillDetailsIpdDto billDetailsIpdDto, String subList,
			HttpServletRequest request);

	int cancelLabTest(String billDetId,String cancleType,
			Integer deptId, HttpServletRequest request);
	
	int cancelInvestigationTest(String billDetId,String cancleType,
			String callform, HttpServletRequest request);

	int IpdBillSendToLab(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request);

	List<CpoeIPDdetails> getlistservciesipdcopenew(Integer tID,
			String callform, HttpServletRequest request);

	int OpdCpoeSendToRis(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request);

	int IpdCpoeSendToRis(BillDetailsIpdDto billDetailsIpdDto, String subList,
			HttpServletRequest request);
	List<RadiologyTemplateReportDTO> getTestRadilogyReports(Integer patientId,Integer testId,Integer billdetailsid,Integer treatmentId);
	List<RisImageUploadDTO> fetchXrayImage(Integer treatmentId,Integer testId,Integer billdetailsid);

	List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId,
			HttpServletRequest request);

	int packageOpdSendToLab(EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request);

	int deleteLabPackageTest(Integer otherBillDetailsId, Integer deptId,
			HttpServletRequest request);

	List<DoctorRoundReport> fetchSelctedIpdDrRound(Integer treatmentID,
			String date, HttpServletRequest request);

	int deleteOPDPrepDocTemp(Integer prepTemplateDocID,
			HttpServletRequest request);

	int savecpoeOTsurgan(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType, String callfrom);
	
	public List<DoctorDto> fetchDoctorList(String doctodType);

	int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module,String sampleWiseBarcodes);
	
	String deleteservdetailsPreviousOPD(String labservicelist,  HttpServletRequest request);
	int canclePreviousServices(String servId, String tretId,String cancleType, HttpServletRequest request);
	
	int cancelLabTestCheckService(String servId, String tretId,String cancleType, HttpServletRequest request);
}
