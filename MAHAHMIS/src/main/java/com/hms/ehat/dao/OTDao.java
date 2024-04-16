package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.ehat.controller.Fetchprocedure;
import com.hms.ehat.controller.OTPercentageDTO;
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
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.ot.dto.Operation;
import com.hms.pharmacy.pojo.ProductMaster;

public interface OTDao {
	
	int saveOTdetails(
			String ehatOtherBillDetailForIpdDto,
			String queryType, String callform, HttpServletRequest request, int othersid, int treatmentoperationid, Double tamount);
	
	List<OTbilldetaildto> getOTdetails(Integer patienttId, Integer masterid,
			Integer treatmentId, Integer selfId, String queryType, String callform, Integer treatmentoperationid);
	int deleteservdetails(String labservicelist, String callform, Integer userId, Integer patienttId, Integer treatmentId, Integer treatmentoperationid, Integer bill_details_id,Integer storeId);

	int savefreez(Freezdto freezdto);
	
	int unfreez(Freezdto freezdto);

	List<Ehat_freez_details>  fetchfreez(String module, String submodule);

	String fetchotprocedure(int patienttId, int treatmentId);

	List<ProductMaster> giveVendorList(int patienttId, int treatmentId, int srvid, int subSrvid);

	List<Fetchprocedure> fetotchprocedure(Integer opId);

	String fethopid(Integer pId, Integer trId);

	List<AutosugeestionDto> hallwiseOPchargeOT(Integer pId, Integer trId, String scheduledProcedure, String findingName, Integer unit, Integer depdocdeskid, Float chargesOS, Integer count1);

	int SaveOTPercentage(OTPercentageDTO otPercentageDTO, HttpServletRequest request);

	List<OTPercentageDTO> fetchOTPercentage();

	String hallwisechargeOT(Integer pId, Integer trId, String scheduledProcedure, String callfrom);

	pharmaConsumtionDTO fetchOTPendingAmount(Integer tId);

	int Saveprocategaory(String txtprcName, int txtprcID,
			HttpServletRequest request);

	List<ProcedureCat> fetchprocedureCatsedrv();

	OTReportDto fetchOTReportdetails(Integer pid, String name, String fromdate,
			String todate, String callfrom);
	String hallwisechargeOTNew(Integer pId, Integer trId,
			String scheduledProcedure);

	Ehat_view_ot_operation_records fetchOTdetails(Integer docid, String fromdate, String todate);

	Ot_cathlabDto fetchot_otcatlab(Integer docid, String fromdate, String todate);

	List<AutosugeestionDto> operationcharge(Integer pId, Integer trId,
			String scheduledProcedure, String findingName, Integer unit,
			Integer depdocdeskid, Float chargesOS, Integer count1, Integer treatmentoperationid);

	int SaveOPmaster(String txtpr, int txtprcID, int opgrade, int txtstep, int unit, HttpServletRequest request);

	List<OperationMaster> fetchOperationmaster();

	Integer fetchcountOT(Integer patienttId, Integer treatmentId,
			String callform, Integer treatmentoperationid);

	public int saveOtConsentDetails(otConsentDTO objDto,HttpServletRequest request);
	
	public List<otConsentDTO> fetchOtConsentDetails(int patientId,int treatmentId);

	List<CustomizeTemplate> getAllOTTemplates();
	
	List<CustomizeTemplate> getOTTemplateDataById(HttpServletRequest request,Integer templateId);
	
	int saveOTConsentForm(OTConsentFormDTO otConsentFormDTO,HttpServletRequest request);
	
	OTConsentFormDTO getAllOtConsentForms(HttpServletRequest request);
	
	List<OTConsentFormDTO> getOTConsentDataById(HttpServletRequest request,Integer templateId);

	SurgreyWiseDto getreportsurgery(String opname, String fromdate,
			String todate);

	String fetchdrramount(Integer treatmentId, String callform, Integer drid, String time);

	Double operationchargeNew(Integer pId, Integer trId,
			String scheduledProcedure, String findingName, Integer unit,
			Integer depdocdeskid, Float chargesOS, Integer count1,
			Integer treatmentoperationid, String otProcedure);

	String hallwisechargeOTSurganwise(Integer pId, Integer trId,
			String scheduledProcedure, String callfrom);

	boolean deleteProcedureCategory(String id,HttpServletRequest request);

	
	double getEmergancyChargesOTfinal();

	List<SubInventoryMasterDto> fetchAllSubInventory();

	int saveOTSubInv(String name, HttpServletRequest request, Integer id);
	
	int getPercentageDetails(int subserviceId,int unitId);
	
	//Added By Badrinath Wagh
	//For OT DashBoard 
	
	OTDashboardDTO fetchTodaysOperationDetails();

	OTDashboardDTO fetchTomorrowOperationDetails();

	OTDashboardDTO fetchOpreationFromDate(String opDate);
	
	int saveAutoChargesForOT(BillDetailsIpdDto obj);

	List<Operation> fetchOperationName(HttpServletRequest request, String status);
	
	double fetchOperationCount(Integer treatmentId,Integer categoryId,Integer topId,Integer patientId);
	
	double fetchSubServiceCharge(Integer categoryId,Integer unitId);
	
	int deleteMultipleOTservice(String labservicelist, String callform, Integer userId, Integer patienttId, Integer treatmentId, Integer treatmentoperationid,Integer storeId);

}
