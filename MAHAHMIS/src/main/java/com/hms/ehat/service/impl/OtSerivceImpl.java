package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.controller.Fetchprocedure;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.dao.OTDao;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.Ehat_freez_details;
import com.hms.ehat.dto.Ehat_view_ot_operation_records;
import com.hms.ehat.dto.Freezdto;
import com.hms.ehat.dto.OTConsentFormDTO;
import com.hms.ehat.dto.OTDashboardDTO;
import com.hms.ehat.dto.OTReportDto;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.ehat.dto.OperationMaster;
import com.hms.ehat.dto.Ot_cathlabDto;
import com.hms.ehat.dto.ProcedureCat;
import com.hms.ehat.dto.SurgreyWiseDto;
import com.hms.ehat.dto.otConsentDTO;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.ehat.service.OtService;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.ot.dto.Operation;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.ProductMaster;
@Service
public class OtSerivceImpl implements OtService{
	@Autowired
    OTDao otDao;
	
	@Autowired
	SessionFactory sf;
	
	@Override
	@Transactional
	public int saveOTdetails(
			String ehatOtherBillDetailForIpdDto,
			HttpServletRequest request, String queryType,String callform ,int othersid ,int treatmentoperationid ,Double tamount) {
		

		return otDao.saveOTdetails(ehatOtherBillDetailForIpdDto,queryType,callform,request,othersid ,treatmentoperationid ,tamount);
		
	}
	@Override
	@Transactional
	public List<OTbilldetaildto> getOTdetails(Integer patienttId,
			Integer masterid, Integer treatmentId, Integer selfId,
			String queryType,String callform ,Integer treatmentoperationid) {
		// TODO Auto-generated method stub
		return otDao.getOTdetails(patienttId, masterid, treatmentId, selfId, queryType,callform , treatmentoperationid);
	}
	@Override
	@Transactional
	public int deleteservdetails(String labservicelist, Integer patienttId, Integer treatmentId, Integer treatmentoperationid, String callform,
			HttpServletRequest request , Integer bill_details_id,Integer storeId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return otDao.deleteservdetails(labservicelist, callform,userId,patienttId,treatmentId,treatmentoperationid , bill_details_id,storeId);
	}
	@Override
	@Transactional
	public int savefreez(Freezdto freezdto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return otDao.savefreez(freezdto);
	}
	@Override
	@Transactional
	public int unfreez(Freezdto freezdto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return otDao.unfreez(freezdto);
	}
	@Override
	@Transactional
	public List<Ehat_freez_details>  fetchfreez(String module, String submodule) {
		return otDao.fetchfreez(module, submodule);
	}
	@Override
	@Transactional
	public String fetchotprocedure(int patienttId, int treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return otDao.fetchotprocedure(patienttId,treatmentId);
	}
	@Override
	@Transactional
	public String pharmareflect(int patienttId, int treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	@Transactional
	public List<ProductMaster> giveVendorList(int patienttId, int treatmentId,
			int srvid, int subSrvid) {
		// TODO Auto-generated method stub
		return otDao.giveVendorList(patienttId,treatmentId,srvid,subSrvid);
	}
	@Override
	@Transactional
	public List<Fetchprocedure> fetotchprocedure(Integer opId) {
		// TODO Auto-generated method stub
		return otDao.fetotchprocedure(opId);
	}
	@Override
	@Transactional
	public String fethopid(Integer pId, Integer trId) {
		// TODO Auto-generated method stub
		return otDao.fethopid(pId,trId);
	}
	@Override
	@Transactional
	public List<AutosugeestionDto> hallwiseOPchargeOT(Integer pId, Integer trId, String scheduledProcedure, String findingName, Integer unit, Integer depdocdeskid,Float chargesOS,Integer count1) {
		// TODO Auto-generated method stub
		return otDao.hallwiseOPchargeOT(pId,trId,scheduledProcedure,findingName,unit,depdocdeskid , chargesOS,count1);
	}
	@Override
	@Transactional
	public int SaveOTPercentage(OTPercentageDTO otPercentageDTO,
			HttpServletRequest request) {
	
		
		return otDao.SaveOTPercentage(otPercentageDTO, request);
	}
	@Override
	@Transactional
	public List<OTPercentageDTO> fetchOTPercentage() {
		// TODO Auto-generated method stub
		return otDao.fetchOTPercentage();
	}
	@Override
	@Transactional
	public String hallwisechargeOT(Integer pId, Integer trId, String scheduledProcedure, String callfrom) {
		// TODO Auto-generated method stub
		return otDao.hallwisechargeOT(pId,trId,scheduledProcedure,callfrom);
	}
	
	@Override
	@Transactional
	public String hallwisechargeOTNew(Integer pId, Integer trId,
			String scheduledProcedure) {
		// TODO Auto-generated method stub
		return otDao.hallwisechargeOTNew(pId,trId,scheduledProcedure);
	}
	
	@Override
	@Transactional
	public pharmaConsumtionDTO fetchOTPendingAmount(Integer tId) {
		// TODO Auto-generated method stub
		return otDao.fetchOTPendingAmount(tId);
	}
	@Override
	@Transactional
	public int Saveprocategaory(String txtprcName, int txtprcID,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return otDao.Saveprocategaory( txtprcName,  txtprcID ,request);
	}
	@Override
	@Transactional
	public List<ProcedureCat> fetchprocedureCatsedrv() {
		// TODO Auto-generated method stub
		return otDao.fetchprocedureCatsedrv();
	}
	@Override
	@Transactional
	public OTReportDto fetchOTReportdetails(Integer pid, String name,
			String fromdate, String todate, String callfrom) {
		// TODO Auto-generated method stub
		return otDao.fetchOTReportdetails( pid,  name,
				 fromdate,  todate , callfrom);
	}
	@Override
	@Transactional
	public Ehat_view_ot_operation_records fetchOTdetails(Integer docid, String fromdate, String todate) {
		// TODO Auto-generated method stub
		return otDao.fetchOTdetails(docid,fromdate,todate);
	}
	@Override
	@Transactional
	public Ot_cathlabDto fetchot_otcatlab(Integer docid, String fromdate,
			String todate) {
		// TODO Auto-generated method stub
		return otDao.fetchot_otcatlab(docid,fromdate,todate);
	}
	@Override
	@Transactional
	public List<AutosugeestionDto> operationcharge(Integer pId, Integer trId,
			String scheduledProcedure, String findingName, Integer unit,
			Integer depdocdeskid, Float chargesOS, Integer count1,Integer treatmentoperationid) {
		// TODO Auto-generated method stub
		return otDao.operationcharge( pId,  trId,
				 scheduledProcedure,  findingName,  unit,
				 depdocdeskid,  chargesOS,  count1,treatmentoperationid) ;
	}
	@Override
	@Transactional
	public int saveOtConsentDetails(otConsentDTO objDto,HttpServletRequest request) {

		return otDao.saveOtConsentDetails(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<otConsentDTO> fetchOtConsentDetails(int patientId,int treatmentId){
		
		return otDao.fetchOtConsentDetails(patientId, treatmentId);
		
	}
	
	
@Override
	@Transactional
	public int SaveOPmaster(String txtpr, int txtprcID, int opgrade, int txtstep, int unit, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return otDao.SaveOPmaster( txtpr,  txtprcID,opgrade,txtstep,unit,
				request );
	}
	@Override
	@Transactional
	public List<OperationMaster> fetchOperationmaster() {
		// TODO Auto-generated method stub
		return otDao.fetchOperationmaster();
	}
	@Override
	@Transactional
	public Integer fetchcountOT(Integer patienttId, Integer treatmentId,
			String callform, Integer treatmentoperationid) {
		// TODO Auto-generated method stub
		return otDao.fetchcountOT( patienttId,  treatmentId,
				 callform,  treatmentoperationid);
	}


	
@Override
	@Transactional
	public List<CustomizeTemplate> getAllOTTemplates(HttpServletRequest request) {
		
		return otDao.getAllOTTemplates();
	}
	@Override
	@Transactional
	public List<CustomizeTemplate> getOTTemplateDataById(
			HttpServletRequest request, Integer templateId) {
		
		return otDao.getOTTemplateDataById(request,templateId);
	}
	@Override
	@Transactional
	public int saveOTConsentForm(OTConsentFormDTO otConsentFormDTO,
			HttpServletRequest request) {
		
		System.err.println("OtConsentFormId "+otConsentFormDTO.getOtConsentFormId());
		if (otConsentFormDTO.getOtConsentFormId() == null || otConsentFormDTO.getOtConsentFormId() == 0)
		{
		
			otConsentFormDTO.setTempListId(otConsentFormDTO.getTempListId());
			otConsentFormDTO.setTemplateData(otConsentFormDTO.getTemplateData());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			otConsentFormDTO.setCreatedBy(userId);
			otConsentFormDTO.setCreatedBy(otConsentFormDTO.getCreatedBy());
			otConsentFormDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
			otConsentFormDTO.setStatus("Y");
			
			int response = otDao.saveOTConsentForm(otConsentFormDTO,request);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			otConsentFormDTO.setUpdatedBy(userId);
			otConsentFormDTO.setUpdatedBy(otConsentFormDTO.getUpdatedBy());
			otConsentFormDTO.setUpdatedDate(new Date(new java.util.Date().getTime()));
			otConsentFormDTO.setStatus("Y");
			
			int response = otDao.saveOTConsentForm(otConsentFormDTO,request);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}
	@Override
	@Transactional
	public OTConsentFormDTO getAllOtConsentForms(HttpServletRequest request) {
		
		return otDao.getAllOtConsentForms(request);
	}
	@Override
	@Transactional
	public List<OTConsentFormDTO> getOTConsentDataById(
			HttpServletRequest request, Integer templateId) {
		
		return otDao.getOTConsentDataById(request,templateId);
	}
	@Override
	@Transactional
	public SurgreyWiseDto getreportsurgery(String opname, String fromdate,
			String todate) {
		// TODO Auto-generated method stub
		return otDao.getreportsurgery( opname,  fromdate,
				 todate);
	}
	@Override
	@Transactional
	public String fetchdrramount(Integer treatmentId, String callform,
			Integer drid,String time) {
		// TODO Auto-generated method stub
		return otDao.fetchdrramount(treatmentId,callform,drid,time);
	}
	@Override
	@Transactional
	public Double operationchargeNew(Integer pId, Integer trId,
			String scheduledProcedure, String findingName, Integer unit,
			Integer depdocdeskid, Float chargesOS, Integer count1,
			Integer treatmentoperationid,String otProcedure) {
		// TODO Auto-generated method stub
		return otDao.operationchargeNew( pId,  trId,
				 scheduledProcedure,  findingName,  unit,
				 depdocdeskid,  chargesOS,  count1,treatmentoperationid,otProcedure) ;
	}
	@Override
	@Transactional
	public String hallwisechargeOTSurganwise(Integer pId, Integer trId,
			String scheduledProcedure, String callfrom) {
		// TODO Auto-generated method stub
		 return otDao.hallwisechargeOTSurganwise(pId,trId,scheduledProcedure,callfrom);
	}
	@Override
	@Transactional
	public double getEmergancyChargesOTfinal() {
		// TODO Auto-generated method stub
		return otDao.getEmergancyChargesOTfinal();
	}
	@Override
	@Transactional
	public boolean deleteProcedureCategory(String id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return otDao.deleteProcedureCategory(id, request);
	}
	@Override
	@Transactional
	public List<SubInventoryMasterDto> fetchAllSubInventory() {
		// TODO Auto-generated method stub
		return otDao.fetchAllSubInventory();
	}
	@Override
	@Transactional
	public int saveOTSubInv(String name, HttpServletRequest request, Integer id) {
		// TODO Auto-generated method stub
		return otDao.saveOTSubInv(name,request,id);
	}
	
	@Override
	@Transactional
	public int getPercentageDetails(int subserviceId, int unitId) {
		
		return otDao.getPercentageDetails(subserviceId, unitId);
	}
	//Added  By Badrinath Wagh
	//For OT DashBoard 
	
	@Override
	@Transactional
	public OTDashboardDTO fetchTodaysOperationDetails() {
		return otDao.fetchTodaysOperationDetails();
	}
	
	@Override
	@Transactional
	public OTDashboardDTO fetchTomorrowOperationDetails() {
		return otDao.fetchTomorrowOperationDetails();
	}
	
	@Override
	@Transactional
	public OTDashboardDTO fetchOpreationFromDate(String opDate) {
		return otDao.fetchOpreationFromDate(opDate);
	}
	@Override
	@Transactional
	public int saveAutoChargesForOT(String serviceDetails) {
		BillDetailsIpdDto ipdobj = (BillDetailsIpdDto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, BillDetailsIpdDto.class);	
		List<BillDetailsIpdDto> list = ipdobj.getListBillDetailsIpd();
		 int count=0;
		 int res=0;
		 try {
		   for(BillDetailsIpdDto obj :list) {
					     String sql= "select count(*) from  ehat_bill_details_ipd where treatment_id="+obj.getTreatmentId()+" and doctor_id="+obj.getDoctorId()+" and service_id="+obj.getServiceId()+" and sub_service_id="+obj.getSubServiceId()+"  and ot_procedure in('"+obj.getOtprocedure()+"')     ";
				  
				       SQLQuery q   =sf.getCurrentSession().createSQLQuery(sql);
				   count= ((Number) q.uniqueResult()).intValue();
				      if( count ==0) {
					   otDao.saveAutoChargesForOT(obj);
					   res=1;
				   }
		   }
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}

	@Override
	@Transactional
	public List<Operation> fetchOperationName(HttpServletRequest request,String status) {
	
		return otDao.fetchOperationName(request, status);
	}
	@Override
	public double fetchOperationCount(Integer treatmentId, Integer categoryId,Integer topId,Integer patientId) {
		// TODO Auto-generated method stub
		return otDao.fetchOperationCount(treatmentId, categoryId,topId,patientId);
	}
	@Override
	public double fetchSubServiceCharge(Integer categoryId, Integer unitId) {
		// TODO Auto-generated method stub
		return otDao.fetchSubServiceCharge(categoryId, unitId);
	}
	@Override
	@Transactional
	public int deleteMultipleOTservice(String labservicelist, Integer patienttId, Integer treatmentId, Integer treatmentoperationid, String callform,
			HttpServletRequest request ,Integer storeId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return otDao.deleteMultipleOTservice(labservicelist, callform,userId,patienttId,treatmentId,treatmentoperationid ,storeId);
	}	

}
