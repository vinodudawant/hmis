package com.hms.ehat.dao;



import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DoctorRoundReport;
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

public interface DoctorDeskDao {
	int savecpoe(BillDetailsDto billDetailsDto, 
			String queryType, String module);
	List<CpoeServdetails> getlistbiil(Integer pID, String callform, Integer servid);
	int deleteservdetails(String labservicelist, Integer userId, String callform);
	
	int deleteServices(String servId, String tretId,Integer uid);
	
	int cancleServices(String servId, String tretId,String cancleType,Integer uid,String remarkcanceltest);
	
	int saveIpd(BillDetailsIpdDto billDetailsIpdDto, String queryType, String module);
	int addPathologyPackageFromIpdBilling(BillDetailsIpdDto billDetailsDto, HttpServletRequest request, String queryType, String module,String sampleWiseBarcodes);
	
	int savecpoeOT(BillDetailsIpdDto billDetailsIpdDto, String queryType, String callfrom);
	List<CpoeOTdetails> getlistservciesotcope(Integer tID, String callform, Integer treatmentoperationid);
	
	int deletesIpdSrvDetails(String labservicelist, Integer userId);
	
	int deleteIpdServices(String servId, String tretId, Integer userId);
	
	int cancleIpdServices(String servId, String tretId, String cancleType,
			Integer userId,String remarkcanceltest);
	List<CpoeIPDdetails> getlistservciesipdcope(Integer tID, String callform);
	
	//@author Bilal @date 03-JULY-2017 @code for update receipt , Integer billDetailsId
	int updateOPDrecipt(BillDetailsDto billDetailsDto,
				HttpServletRequest request, String queryType);
	
	//@author Bilal @date 05-JULY-2017 @code for update receipt of IPD
	int updateOPDreciptIPD(BillDetailsIpdDto billDetailsIpdDto,
				HttpServletRequest request, String queryType);
	
	//@author Bilal @date 07-JULY-2017 @code for save service to receipt of OPD
	int saveNewSer(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType);
	
	//@author Bilal @date 07-JULY-2017 @code for save service to receipt of IPD
	int saveNewToIPD(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request, String queryType);
	
	//@author Bilal @date 10-JULY-2017 @code for delete service from receipt of OPD
	int deleteReceiptOfOPD(Integer slaveId, HttpServletRequest request);
	
	//@author Bilal @date 17-JULY-2017 @code for delete service from receipt of IPD
	int deleteOnClickForRecieptIPD(Integer billRecSlaveId,
			HttpServletRequest request);
	
	//@author Bilal @date 21-JULY-2017 @code for delete master receipt of OPD
	int deleteMasterReceiptOPD(Integer recId,String deleteRemark, HttpServletRequest request);
	
	//@author Bilal @date 21-JULY-2017 @code for reset deleted master receipt of OPD
	int resetMasterReceiptOPD(Integer recId, HttpServletRequest request);
	
	//@author Bilal @date 24-JULY-2017 @code for delete master receipt of IPD
	int deleteMasterReceiptIPD(Integer recId, String deleteRemark,	HttpServletRequest request);
	
	//@author Bilal @date 24-JULY-2017 @code for reset deleted master receipt of IPD
	int resetMasterReceiptIPD(Integer recId, HttpServletRequest request);
	
	//@author Bilal @date 25-JULY-2017 @code for save records in other billing table
	int saveToOtherBilling(BillDetailsDto billDetailsDto, String queryType,
			Integer sponsorId, Integer chargesSlaveId, String a, HttpServletRequest request);
	
	//@author Bilal @date 7-AUG-2017 @code for save records in other billing table of ipd
	int saveToOtherBillingIpd(BillDetailsIpdDto billDetailsIpdDto,
			String queryType, Integer sponsorId, Integer chargesSlaveId, String a, HttpServletRequest request);
	
	//@author Bilal @date 9-AUG-2017 @code for save records in other billing table of package opd
	int savePackageOpd(
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request, String queryType, String callfrom);
	
	//@author Bilal @date 16-AUG-2017 @code for cancle records in other billing table of package opd
	int cancleOPDPackageSer(Integer otherBillDetailsId, String cancleType,
			HttpServletRequest request);
	
	//@author Bilal @date 16-AUG-2017 @code for cancle records in other billing table of package Ipd
	int cancleIPDPackageSer(Integer otherBillDetailsId, String cancleType,
			HttpServletRequest request);
	//@author Laxman @date 13-Feb-2018 @code for get Lab test details
	 CpoeServdetails fetchlabbilldetails(Integer tID, String callform, Integer deptId);
	//@author Laxman @date 14-Feb-2018 @code for get Lab test Result base on subservice id.
	List fetchLabTestResult(Integer testmasterId,Integer subSerId,
			Integer labReqSlvId, Integer tretId);
	//@author Laxman @date 15-Feb-2018 @code for get Lab test Result base on treatment id.
	List fetchLabTestResult(Integer tretId, String callfrom);
	CpoeIPDdetails fetchIpdCoversheetLab(Integer tID, String callform, Integer deptId);
	//@author Laxman @date 22-Feb-2018 @code fetch for compare Lab test Result
	List compareLabTestResult(String callfrom, Integer tretId,
			Integer patientId);
int deleteom(String opId, String callform, HttpServletRequest request);

	/*int saveComplaintFinding(int pId, int treatId,
			EhatComplaintFindingDto checkAnswer, String type, String queryType, HttpServletRequest request);
	*/
	List<EhatComplaintFindingDto> fetchComplaintFinding(Integer pId,
			Integer treatId, Integer emrId, HttpServletRequest request);
	
	SubObjTemplateDto fetchSubObjTemplate(Integer bodyPart, Integer speciality,
			HttpServletRequest request);
	
	/*QuestionMasterDto setOncoEmrTemplates(Integer selDocSpec, Integer bodyPart,
			Integer tempId, Integer pId, Integer treatId, Integer emrId,
			HttpServletRequest request);
	
	int saveEmrQueAns(List<EhatEMRPatientTemplate> ehatEMRPatientTemplates,
			HttpServletRequest request);
	
	EhatEMRPatientTemplate fetchEMRTemplate(Integer pId, Integer treatId,
			Integer emrId, HttpServletRequest request);*/
	//@author Laxman @date 26-Feb-2018 @code fetch for compare Lab test Result base on slave_id on single click.
	List fetchLabTestResultOnClick(Integer testmasterId,
			Integer labReqSlvId, Integer subSerId, Integer tretId, String isPackageFlag);
	//@author Laxman @date 04-March-2018 @code for sendToLab in OPD CPOE 
	int OpdCpoeSendToLab(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request);
	//@author Laxman @date 04-March-2018 @code for sendToLab in IPD CPOE 
	int IpdCpoeSendToLab(BillDetailsIpdDto billDetailsIpdDto,
			String subList, HttpServletRequest request);
	int cancelLabTest(String billDetId, String cancleType,
			Integer deptId, HttpServletRequest request);
	int cancelInvestigationTest(String billDetId, String cancleType,
			String callform, HttpServletRequest request);
	int IpdBillSendToLab(BillDetailsIpdDto billDetailsIpdDto,
			HttpServletRequest request);
	List<CpoeIPDdetails> getlistservciesipdcopenew(Integer tID, String callform);
	int OpdCpoeSendToRis(BillDetailsDto billDetailsDto, String subList,
			HttpServletRequest request);
	int IpdCpoeSendToRis(BillDetailsIpdDto billDetailsIpdDto, String subList,
			HttpServletRequest request);
	List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId,
			HttpServletRequest request);
	
	List<RadiologyTemplateReportDTO> getTestRadilogyReports(Integer patientId,Integer testId,Integer billdetailsid,Integer treatmentId);
	List<RisImageUploadDTO> fetchXrayImage(Integer treatmentId,Integer testId,Integer billdetailsid);
	int packageOpdSendToLab(EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto,
			HttpServletRequest request);
	int deleteLabPackageTest(Integer otherBillDetailsId, Integer deptId,
			HttpServletRequest request);
	List<DoctorRoundReport> fetchSelctedIpdDrRound(Integer treatmentID,
			String date, HttpServletRequest request);
	
	int deleteOPDPrepDocTemp(Integer prepTemplateDocID,
			HttpServletRequest request);
	int savecpoeOTsurgan(BillDetailsIpdDto billDetailsIpdDto, String queryType,
			String callfrom, HttpServletRequest request);
	
	List<DoctorDto> fetchDoctorList(String doctodType);
	
	int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto,HttpServletRequest request, 
			String queryType, String module,String sampleWiseBarcodes);
	
	String  deleteservdetailsPreviousOPD(String labservicelist,  HttpServletRequest request);
	
	int canclePreviousServices(String servId, String tretId,String cancleType, HttpServletRequest request);
	
	int cancelLabTestCheckService(String servId, String tretId,String cancleType,Integer uid);
}
