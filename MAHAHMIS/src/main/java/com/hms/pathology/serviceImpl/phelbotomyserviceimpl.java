package com.hms.pathology.serviceImpl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.pathology.dao.Phlebotomydao;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestGeneralValueDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologySampleWiseSlave;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.dto.SendToOutSourceDocumentDto;
import com.hms.pathology.service.Phlebotomyservice;

@Service
@Transactional
public class phelbotomyserviceimpl  implements Phlebotomyservice{

	@Autowired
	Phlebotomydao phelbotomydao;
	
	@Autowired
	SessionFactory sessionfactory;
	
	@Override
	public List<PathologySampleWiseMaster> getphlebotomyRecord(String patientType,
			String callFrom,String emergencyFlag,HttpServletRequest request) {
		return phelbotomydao.getphlebotomyRecord(patientType, callFrom,emergencyFlag,request);
	}
	@Override
	public List<PathologySampleWiseMaster> getPhlebotomyRecordWithSamplyWise(
			Integer pId, Integer tId,HttpServletRequest request) {
		return phelbotomydao.getPhlebotomyRecordWithSamplyWise(pId, tId,request);
	}
	
	
	@Override
	public Integer sendToLab(PathologySampleWiseMaster master, String subList,String histoList, String registeredAt, HttpServletRequest request) {
		return phelbotomydao.sendToLab(master, subList,histoList, registeredAt, request);
	}
	@Override
	public LabTestDTO getPathologyPreDetails(PathologySampleWiseMaster master, String callFrom,HttpServletRequest request) {
		return phelbotomydao.getPathologyPreDetails(master, callFrom, request);
	}
	@Override
	public boolean collectionRecord(String idList,String callform, HttpServletRequest request,String meeshaFlow,String collectionTime,String SampleCollected) {
		return phelbotomydao.collectionRecord(idList,callform, request, meeshaFlow, collectionTime, SampleCollected);
	}
	@Override
	public boolean patientTestHold(String id,String phlebotype, HttpServletRequest request) {
		return phelbotomydao.patientTestHold(id,phlebotype, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getAccessionRecord(String callfrom,String emergencyFlag,HttpServletRequest request) {
		return phelbotomydao.getAccessionRecord(callfrom,emergencyFlag,request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getProfileAndTestRecord(String Id,String outlabId,
			HttpServletRequest request) {
		return phelbotomydao.getProfileAndTestRecord(Id,outlabId, request);
	}
	@Override
	public String getCountOfTabs(HttpServletRequest request) {
		return phelbotomydao.getCountOfTabs(request);
	}
	@Override
	public boolean rejectedInprofiletest(Integer masterid, Integer profileid,
			Integer testId,String testflag,Integer rejectedResion,String callfrom, HttpServletRequest request) {
		return phelbotomydao.rejectedInprofiletest(masterid,profileid,testId,testflag,rejectedResion,callfrom,request);

	}
	@Override
	public boolean AccessionpatientTestReject(String idList,String remarks,String callfrom,
			HttpServletRequest request) {
		return phelbotomydao.AccessionpatientTestReject(idList,remarks,callfrom, request);

	}
	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutl(String masterid,
			 Integer treatmentid, String patientType,HttpServletRequest request) {
		return phelbotomydao.getRoutinevalueResutl(masterid,treatmentid,patientType, request);
	}

	@Override
	public Integer savePrerequisiteInTreatment(String hieghtPupUp, String weightPupUp, String urineValumePupUp,String lmpDatePupUp,
			Integer tId, Integer pId) {
		
		return phelbotomydao.savePrerequisiteInTreatment(hieghtPupUp, weightPupUp,urineValumePupUp,lmpDatePupUp,tId,pId);
	}
	@Override
	public String getPageCount(String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		return phelbotomydao.getPageCount(callFrom, tabId, emergencyFlag, request);
	}
	@Override
	public String getBarcodeIdFromSampleWise(Integer patientId,
			Integer treatmentId, Integer sampleTypeId, Integer inOutHouse,
			HttpServletRequest request) {
		return phelbotomydao.getBarcodeIdFromSampleWise(patientId, treatmentId, sampleTypeId,inOutHouse, request);
	}

	@Override
	public List<LabPhlebotomyMaster> getpathologistname(HttpServletRequest request) {
		return phelbotomydao.getpathologistname(request);
	}
	@Override
	public boolean saveLabTestRoutineValueResult(String id, String statusFlag,
			Integer idPathologist,String kitSpecId,Integer machineId,String SerialNo, String phlebotomyListTestsalve,String profileIdcomments,
			HttpServletRequest request,HttpServletResponse res,String phlebotomysamplemastertable) {
		return phelbotomydao.saveLabTestRoutineValueResult(id, statusFlag,idPathologist,kitSpecId,machineId,SerialNo,phlebotomyListTestsalve,profileIdcomments,request,res,phlebotomysamplemastertable);

	}
	@Override
	public boolean changeStatusOfTest(String idList, String statusFlag,
			HttpServletRequest request) {
		return phelbotomydao.changeStatusOfTest(idList, statusFlag, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutlusingPrint(String masterid, Integer treatmentid,
			String patientType, Integer unitId,HttpServletRequest request) {
		return phelbotomydao.getRoutinevalueResutlusingPrint(masterid,treatmentid,patientType,unitId, request);

	}
	@Override
	public List<PathologySampleWiseMaster> getdepartmentname(
			HttpServletRequest request) {
		return phelbotomydao.getdepartmentname(request);
	}
	@Override
	public List<PathologySampleWiseMaster> getdepartmentWiseWorkList(
			 Integer Iddepartment,
			HttpServletRequest request) {
		return phelbotomydao.getdepartmentWiseWorkList(Iddepartment, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getTreatmentIdList(
			Integer patientId, HttpServletRequest request) {
		return phelbotomydao.getTreatmentIdList(patientId, request);

	}
	@Override
	public List<PathologySampleWiseMaster> getTreatmentIdwiseRoutineValueResult(
			Integer tId, HttpServletRequest request) {
		return phelbotomydao.getTreatmentIdwiseRoutineValueResult(tId, request);

	}
	@Override
	public String getPageCountRecollection(String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		return phelbotomydao.getPageCountRecollection(callFrom, tabId, emergencyFlag, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getAllRecollectionRequestBToBAndBToC(
			String callfrom, String emergencyFlag, HttpServletRequest request) {
		return phelbotomydao.getAllRecollectionRequestBToBAndBToC(callfrom, emergencyFlag, request);

	}
	@Override
	public List<PathologySampleWiseMaster> gettestViewRecollectionRequest(
			String masterid, Integer treatmentid, String patientType,
			String reCollectionType,String tabType, HttpServletRequest request) {
		return phelbotomydao.gettestViewRecollectionRequest(masterid,treatmentid,patientType,reCollectionType,tabType,request);
	}
	@Override
	public List<PathologyTestReasonDto> getTestReasonName(String callfrom, String sampleTypeId,
			HttpServletRequest request) {
		return phelbotomydao.getTestReasonName(callfrom, sampleTypeId, request);
	}
	@Override
	public boolean processingAreaRecollectionTest(String recollectionList,String recollectionReason,HttpServletRequest request) {
		return phelbotomydao.processingAreaRecollectionTest(recollectionList,recollectionReason, request);
	}
	@Override
	public boolean unjectsampleAccessionTab(String masterId, String callform,
			HttpServletRequest request) {
		
		return phelbotomydao.unjectsampleAccessionTab(masterId,callform,request);
	}
	
	@Override
	public String getRecordCountForAuthorizeTabIndicator(Integer statusCode, String txtFdate, String txtTdate, 
			HttpServletRequest request) {
		return phelbotomydao.getRecordCountForAuthorizeTabIndicator(statusCode, txtFdate, txtTdate, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getRecordAgainstIndicator(String indicatorType, Integer startIndex,Integer statusCode, String fromDate,String toDate,HttpServletRequest request) {
		return phelbotomydao.getRecordAgainstIndicator(indicatorType, startIndex,statusCode,fromDate, toDate,request);
	}
	
	@Override
	public boolean sendToOutSourceTest(String idList, Integer labCenterId,
			String dispatchDate, String dispatchTime, String carrierName,
			String comment,Integer inouthouse, HttpServletRequest request) {
		
		return phelbotomydao.sendToOutSourceTest(idList, labCenterId, dispatchDate, dispatchTime, carrierName, comment, inouthouse,request);
	}
	@Override
	public List<PathologySampleWiseMaster> getForcedOutSourcedRecord(String emergencyFlag,
			HttpServletRequest request) {
		
		return phelbotomydao.getForcedOutSourcedRecord(emergencyFlag, request);
	}
	@Override
	public List<PathologySampleWiseMaster> outSourcedPatientAutoSuggestion(
			String searchText, String tabId, HttpServletRequest request) {
		
		return phelbotomydao.outSourcedPatientAutoSuggestion(searchText, tabId, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getOutSourceTypeById(Integer outSourceType,
			Integer outSourceTypeId, String tabId, HttpServletRequest request) {
		
		return phelbotomydao.getOutSourceTypeById(outSourceType,outSourceTypeId, tabId, request);
	}
	@Override
	public List<PathologySampleWiseMaster> fetchLabNameByType(
			Integer outSourceType, HttpServletRequest request) {
		
		return phelbotomydao.fetchLabNameByType(outSourceType, request);
	}
	@Override
	public boolean sendToPhlebotomyRecollection(String idList,
			HttpServletRequest request) {
		
		return phelbotomydao.sendToPhlebotomyRecollection(idList, request);
	}
	@Override
	public boolean rejectSampleFromRecollection(String idList,
			HttpServletRequest request) {
		return phelbotomydao.rejectSampleFromRecollection(idList, request);
	}
	@Override
	public boolean dropSampleFromRecollection(String idList,
			HttpServletRequest request) {
		
		return phelbotomydao.dropSampleFromRecollection(idList, request);
	}
	@Override
	public boolean sendToProcessingTest(String phlebotomyListTestsalve,
			String callfrom, HttpServletRequest request) {
	
		return phelbotomydao.sendToProcessingTest(phlebotomyListTestsalve, callfrom, request);
	}
	@Override
	public boolean rejectTestRequestInPathologistTab(
			String phlebotomyListTestsalve, String callfrom,
			HttpServletRequest request) {
		return phelbotomydao.rejectTestRequestInPathologistTab(phlebotomyListTestsalve, callfrom, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getTestwiseTrendanalysis(
			Integer patientId, Integer testId, HttpServletRequest request) {
		return phelbotomydao.getTestwiseTrendanalysis(patientId, testId, request);
	}
	
	@Override
	public List<LabPhlebotomyMaster> getmachinename(HttpServletRequest request) {
		
		return phelbotomydao.getmachinename(request);
	}
	@Override
	public boolean bulkPostRecord(String idList, HttpServletRequest request,HttpServletResponse res) {
		
		return phelbotomydao.bulkPostRecord(idList, request,res);
	}
	@Override
	public boolean checkDuplicateFile(String documentName, String Id) {
		
		return phelbotomydao.checkDuplicateFile(documentName, Id);

	}
	@Override
	public int saveOutsourceDocument(List<SendToOutSourceDocumentDto> docList) {
		
		return phelbotomydao.saveOutsourceDocument(docList);
	}
	@Override
	public List<SendToOutSourceDocumentDto> getOutsourceDocumentsById(
			Integer treatmentId, Integer id) {
		
		return phelbotomydao.getOutsourceDocumentsById(treatmentId, id);
	}
	@Override
	public boolean deleteOutSourceUploadedDocument(Integer outmasterId,
			HttpServletRequest request) {
		
		return phelbotomydao.deleteOutSourceUploadedDocument(outmasterId, request);
	}
	@Override
	public List<LabMicroorganismsDto> getmicroorganismName(Integer testId,
			HttpServletRequest request) {
		
		return phelbotomydao.getmicroorganismName(testId,request);
	}
	@Override
	public List<LabGradingsDto> getgradingName(Integer testId,
			HttpServletRequest request) {
		
		return phelbotomydao.getgradingName(testId, request);
	}
	@Override
	public boolean reRunTestResult(String reRunTestResultList,
			HttpServletRequest request) {
	
		return phelbotomydao.reRunTestResult(reRunTestResultList, request);
	}
	@Override
	public TreatmentDto showPatientPreviousHistory(Integer treatmentId, HttpServletRequest request) {
		return phelbotomydao.showPatientPreviousHistory(treatmentId, request);
	}
	@Override
	public String getOldestCollectionDateInString(String masterIds) {
		return phelbotomydao.getOldestCollectionDateInString(masterIds);
	}
	@Override
	public List<LabTestGeneralValueDto> getGenralValueName(Integer testId,
			HttpServletRequest request) {
		
		return phelbotomydao.getGenralValueName(testId, request);
	}
	@Override
	public boolean bulkAuthoriseRecord(String idList, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return phelbotomydao.bulkAuthoriseRecord(idList, request);
	}
	@Override
	public List<PathologySampleWiseMaster> getemailFileds(String idList,
			HttpServletRequest request) {
		
		return phelbotomydao.getemailFileds(idList, request);
	}

	@Override
	public boolean checkTestAssignedToPatient(Integer patientId, Integer treatmentId, String masterId, HttpServletRequest request) {
		return phelbotomydao.checkTestAssignedToPatient(patientId, treatmentId, masterId, request);
	}
	
	@Override
	public String getMergedReportPath(Integer patientId, Integer treatmentId, Integer unitId,
			HttpServletRequest request) {
		return phelbotomydao.getMergedReportPath(patientId, treatmentId, unitId, request);
	}
	
	@Override
	public String updateEmailStatus(String masterid, Integer treatmentid, String patientType, Integer unitId, String mailStatus, Integer userId) {
		return phelbotomydao.updateEmailStatus(masterid,treatmentid,patientType,unitId,mailStatus, userId);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getSampleTypeListFromTid(
			Integer patientId, Integer treatmentId, String callFrom,
			HttpServletRequest request) {
		
		return phelbotomydao.getSampleTypeListFromTid(patientId,treatmentId,callFrom,request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getBarcodeWiseTestIds(Integer patientId, Integer treatmentId, Date currentDateTime, HttpServletRequest request) {
		return phelbotomydao.getBarcodeWiseTestIds(patientId, treatmentId, currentDateTime, request);
	}

	@Override
	public List<PathologySampleWiseMaster> getSampleWiseProfileFromPackage(Integer unitId, Integer businessType,
			Integer serviceId, Integer subServiceId, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.getSampleWiseProfileFromPackage(unitId, businessType, serviceId, subServiceId, patientId, treatmentId, billDetailsId);
	}
	@Override
	public String checkDuplicateServicesFromPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	@Override
	public String getDefaultBarcodeForPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	@Override
	public String checkDuplicateServicesInPackage(Integer serviceId, Integer subServiceId, Integer editSubServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.checkDuplicateServicesInPackage(serviceId, subServiceId, editSubServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	@Override
	public String getDefaultBarcodeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.getDefaultBarcodeForEditPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	@Override
	public Integer getDefaultSampleTypeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		return phelbotomydao.getDefaultSampleTypeForEditPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	}
	@Override
	public long checkDuplicateBarcodeForPackage(Integer unitId, Integer businessType, Integer patientId,
			Integer treatmentId, Integer billDetailsId, String sampleWiseBarcodes, String barcode, String callFrom) {
		return phelbotomydao.checkDuplicateBarcodeForPackage(unitId, businessType, patientId, treatmentId, billDetailsId, sampleWiseBarcodes, barcode, callFrom);
	}

	@Override
	public Integer checkDuplicateCollectionCharges(Integer serviceId, Integer subServiceId, Integer unitId, Integer businessType, Integer patientId, Integer treatmentId) {
		
		int result = 0;
		try {
			String sql = "SELECT count(*) as count FROM ehat_bill_details where sub_service_id="+subServiceId+" AND treatment_id="+treatmentId+" AND deleted='N' AND cancle='N' ";
			Query qry = sessionfactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number)qry.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@Override
	public PathologySampleWiseMaster getPatientWiseSamples(Integer unitId, Integer testStatus, Integer patientId,
			Integer treatmentId, String callFrom) {
		return phelbotomydao.getPatientWiseSamples(unitId, testStatus, patientId, treatmentId, callFrom);
	}
	
	@Transactional
	@Override
	public int saveTemplateInfo(PathologyTemplateRotineValueDTO obj,HttpServletRequest request) {
		String sql="";
		String sqlauth="";
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		try {
			
			if(obj.getCallFrom().equalsIgnoreCase("save")) {
				
				//added set flag_mark='N' by Rohit on 23-09-2021
				sql=" update pathology_sample_wise_slave set flag_mark='N',profile_name='"+obj.getProfileName()+"',template_id="+obj.getTemplateId()+",template_name='"+obj.getTemplateName()+"',template_data='"+obj.getTemplateData()+"' where master_id="+obj.getMasterId()+"  ";
				Query q=   sessionfactory.getCurrentSession().createSQLQuery(sql);
				q.executeUpdate();
				
				sqlauth=" update pathology_sample_wise_master set  test_status="+3+",machine_Id="+obj.getMachineId()+",machine_name='"+obj.getMachineName()+"',authorized_date=:postdatetime where id="+obj.getMasterId()+" ";
				Query qauth=   sessionfactory.getCurrentSession().createSQLQuery(sqlauth);
				qauth.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
				qauth.executeUpdate();
			
			}else if(obj.getCallFrom().equalsIgnoreCase("auth")) {
				
				//added set flag_mark='N' by Rohit on 23-09-2021
				sql=" update pathology_sample_wise_slave set flag_mark='N',profile_name='"+obj.getProfileName()+"',template_id="+obj.getTemplateId()+",template_name='"+obj.getTemplateName()+"',template_data='"+obj.getTemplateData()+"' where master_id="+obj.getMasterId()+"  ";
				Query q=   sessionfactory.getCurrentSession().createSQLQuery(sql);
				q.executeUpdate();
				
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where unit_Id="+unitId+" and test_status=5";
      			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
      			Integer result = ((Number)query12.uniqueResult()).intValue();      					
      			result++;
				
				sqlauth=" update pathology_sample_wise_master set sample_count="+result+", test_status="+5+",machine_Id="+obj.getMachineId()+",machine_name='"+obj.getMachineName()+"',authorized_date=:postdatetime where id="+obj.getMasterId()+" ";
				Query qauth=   sessionfactory.getCurrentSession().createSQLQuery(sqlauth);
				qauth.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
				qauth.executeUpdate();
			
			}else if(obj.getCallFrom().equalsIgnoreCase("post")) {
				
				sql=" update pathology_sample_wise_slave set profile_name='"+obj.getProfileName()+"',template_id="+obj.getTemplateId()+",template_name='"+obj.getTemplateName()+"',template_data='"+obj.getTemplateData()+"' where master_id="+obj.getMasterId()+"  ";
				Query q=   sessionfactory.getCurrentSession().createSQLQuery(sql);
				q.executeUpdate();
				
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where unit_Id="+unitId+" and test_status=6";
      			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
      			Integer result = ((Number)query12.uniqueResult()).intValue();      					
      			result++;
				
				sqlauth=" update pathology_sample_wise_master set sample_count="+result+", test_status="+6+", post_date=:postdatetime, post_by="+userId+",machine_Id="+obj.getMachineId()+",machine_name='"+obj.getMachineName()+"' where id="+obj.getMasterId()+" ";
				Query qauth=   sessionfactory.getCurrentSession().createSQLQuery(sqlauth);
				qauth.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
				qauth.executeUpdate();
			
			}else if(obj.getCallFrom().equalsIgnoreCase("outsource")) {
				sql=" update pathology_sample_wise_slave set profile_name='"+obj.getProfileName()+"',template_id="+obj.getTemplateId()+",template_name='"+obj.getTemplateName()+"',template_data='"+obj.getTemplateData()+"' where master_id="+obj.getMasterId()+"  ";
				Query q=   sessionfactory.getCurrentSession().createSQLQuery(sql);
				q.executeUpdate();
				
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where unit_Id="+unitId+" and test_status=6";
      			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
      			Integer result = ((Number)query12.uniqueResult()).intValue();      					
      			result++;
				
				sqlauth=" update pathology_sample_wise_master set sample_count="+result+", test_status="+8+", post_date=:postdatetime, post_by="+userId+",machine_Id="+obj.getMachineId()+",machine_name='"+obj.getMachineName()+"' where id="+obj.getMasterId()+" ";
				Query qauth=   sessionfactory.getCurrentSession().createSQLQuery(sqlauth);
				qauth.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
				qauth.executeUpdate();
			}
			
			
			return 1;
		  	
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public PathologyTemplateRotineValueDTO getTemplateInfoByMasterId(Integer masterid) {
		
		return phelbotomydao.getTemplateInfoByMasterId(masterid);
	}
	@Override
	public PathologyTemplateMasterDTO getDefaultTemplateByProfileId(Integer profileId) {
		PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
		try {
			Criteria c= sessionfactory.getCurrentSession().createCriteria(PathologyTemplateMasterDTO.class);
			c.add(Restrictions.eq("profileId", profileId));
			c.add(Restrictions.eq("templateDefault", "Y"));
			c.add(Restrictions.eq("deleted", "N"));
			obj=(PathologyTemplateMasterDTO) c.uniqueResult();
			return obj;
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
	@Override
	public Integer getPrintCount(String masterId) {

		int result = 0;
        int count = 0;
        
        for( int i= 0; i < masterId.length(); i++)
        {
            if(masterId.charAt(i) == ',')
                count++;
        }
        
        if(count > 0)
        {
        	String[] myData = masterId.split(",");
        	for (String s: myData) {
        		try {
        			String sql = "UPDATE pathology_sample_wise_master SET print_count = print_count + 1 WHERE id = "+s;
        			Query qry = sessionfactory.getCurrentSession().createSQLQuery(sql);
        			qry.executeUpdate();
        			
        		} catch (Exception e) {
        			e.printStackTrace();
        		}
        	}
        	
        }else{
        	
    		try {
    			String sql = "UPDATE pathology_sample_wise_master SET print_count = print_count + 1 WHERE id = "+masterId;
    			Query qry = sessionfactory.getCurrentSession().createSQLQuery(sql);
    			qry.executeUpdate();
    			
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
        }
		
		return result;
		
	}	
	
	@Override
	public String getGeneralType(String generalValue,HttpServletRequest request) {
		return phelbotomydao.getGeneralType(generalValue);
	}
	@Override
	public PathologySampleWiseMaster getRecordCountOnAuthorization(	Integer statusCode, String fromDate, String toDate, HttpServletRequest request) {
		
		return phelbotomydao.getRecordCountOnAuthorization( statusCode, fromDate, toDate, request);
	}
	
	
	  @Override public LabTestDTO
	  getInvstigationPreDetails(PathologySampleWiseMaster master, String callFrom,HttpServletRequest request) 
	  { 
		  return  phelbotomydao.getInvstigationPreDetails(master, callFrom, request); }
	 
	@Override
	public PathologySampleWiseSlave getPathologySamplewiseSlaveDetailsForPrint(int testId, int profileId,
			int treatmentId) {
		
		return phelbotomydao.getPathologySamplewiseSlaveDetailsForPrint(testId, profileId, treatmentId);
	}
	@Override
	public PathologySampleWiseMaster getLabTestNormalValueDetialsForPrint(String sex, int agetType, int age,List<LabTestNormalValuesDTO>  listNormalResult) {
		
		return phelbotomydao.getLabTestNormalValueDetialsForPrint(sex, agetType, age, listNormalResult);
	}
	@Override
	public List<PathologySampleWiseMaster> getTestComponentListByProfileId(int profileId) {
		
		return phelbotomydao.getTestComponentListByProfileId(profileId);
	}
	@Override
	public PathologySampleWiseMaster getLabNormalValuesForPrint(String sex, int agetType, int age, int testId) {
		
		return phelbotomydao.getLabNormalValuesForPrint(sex, agetType, age, testId);
	}
	@Override
	public PathologySampleWiseMaster getTrendAnaylsisDetailsForPrint(int patientId, int treatMentId, int testId) {
		
		return phelbotomydao.getTrendAnaylsisDetailsForPrint(patientId, treatMentId, testId);
	}
	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutlusingNewPrint(String masterid, Integer treatmentid,
			String patientType, Integer unitId, HttpServletRequest request) {
		
		return phelbotomydao.getRoutinevalueResutlusingNewPrint(masterid, treatmentid, patientType, unitId, request);
	}
	@Override
	public PathologySampleWiseMaster getLabNormalValuesForPrintInDays(String sex,int agetType,int age,int testId) {
		// TODO Auto-generated method stub
		return phelbotomydao.getLabNormalValuesForPrintInDays(sex, agetType, age, testId);
	}
	@Override
	public int convertReportingToAutorization(String idList, String statusFlag, HttpServletRequest request) {
		
		return phelbotomydao.convertReportingToAutorization(idList, statusFlag, request);
	}
}