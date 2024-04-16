package com.hms.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.hms.canteen.dto.DietMaster;
import com.hms.dto.BillComponent;
import com.hms.dto.Chart;
import com.hms.dto.ChartReport;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeSummery;
import com.hms.dto.DoctorList;
import com.hms.dto.DoctorRoundReport;
import com.hms.dto.DoctorRoundTempDTO;
import com.hms.dto.IPDHistoryMaster;
import com.hms.dto.IpdExpenceVoucher;
import com.hms.dto.Order_comp_druges;
import com.hms.dto.Order_master;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.dto.Patient;
import com.hms.dto.TreatmentNurses;
@Transactional
public interface IPDTreatmentDAO {

	public List<DoctorRoundReport> fetchDoctorPreRound(String tid, String date);

	public List<DoctorRoundReport> fetchPrintDoctorPreRound(String tid);

	public boolean insertDoctorRound(String tid, String date, String drrString,
			DoctorRoundReport objdrr, String treatmentbedid, int userid);

	public List<Chart> fetchChart();

	public List<ChartReport> fetchChartReport(String tid, String cid,
			String date);

	public List<ChartReport> fetchPrintChartReport(String tid, String cid,
			String date);

	public boolean insertChartReport(String tid, String cid, String date,
			String chartString, String sign, ChartReport objchart, int userId,int dptid,String did,int pid,int bid);

	public List<BillComponent> fetchPatientMaterialUsed(String tid, String date);

	public int insertMaterialUsed(String tid, String date,
			String materialString, BillComponent objmat);

	public boolean fecthDeleteDIC(TreatmentNurses objtn,String userId);

	public boolean fecthUpdateDIC(TreatmentNurses objtn, String datePick,String userId, String userUpdate, String password);

	public boolean fecthDeleteDRR(DoctorRoundReport objdrr, int userid);

	public boolean fecthDeleteMat(BillComponent objmat);

	public boolean fecthDeleteChart(ChartReport objchart);

	public List<Patient> getDischargeSummary(String patID, String treatID);

	/*************************fetchDischargeAutoSummary**************************/
	public List<DischargeSummery> fetchDischargeAutoSummary(String patID, String treatID);
	
	public List<TreatmentNurses> fetchAllNursingChart(String treatID,
			String clickValue);

	public List<ChartReport> printInvestChart(String tid);

	public int SaveDischargeSummary(DischargeSummery objds, PaediatricDeptNICU objpdn);

	public List<Order_comp_druges> OrderFormPopup();

	public List<Order_master> featchOrderFormByDate(String date, String tid, String type);

	public boolean fecthDeleteMat(Order_comp_druges objOrder_comp_druges,
			Order_master objOrder_master, String queryType,String Page_Type);

	public boolean changeBedState(String bedid, String bedstateid);

	public int saveIPDHistory(IPDHistoryMaster objIPDHistoryMaster,
			       IPDHistoryMaster objIPDHistoryComp, String queryType,String tretID,int userid);

	public List<IPDHistoryMaster> fetchIPDHistory(String tretID);

	public boolean deleteIPDHistory(String allVals);

	public List<Patient> featchPreviousDischargeSummary(String strValue,
			String type);

	public int copyCurrentOrderForm(String tid, String date, String previousDate, int deleteForm);

public boolean saveExpenseVoucher(IpdExpenceVoucher objExpenseVoucher,
			String queryType, int userid, String ipAddress);
public List<IpdExpenceVoucher> fetchExpenceVoucher(String pageName,int idipdm,String byType);

public boolean deleteExpenseVoucher(String allVals, int userid);

public int getMaxExpenseID();

public boolean deleteOrderForm(int OFSlaveID);

public List<Patient> getDischargeSummeryList();

public List<Patient> getOperationSummeryList();

int saveUpdateMaterialUsed(String tid, String date, String materialString,
		BillComponent objmat, int userid);

public int SaveAutoDischargeSummary(DischargeSummery objds,
		PaediatricDeptNICU objpdn,String notes);

public boolean DeleteMat(String slaveid, String masterid, int userid);

public boolean updateAdmissionNote(int parseInt, int parseInt2, String note);

public List fetchNursingMedication(String todayDate, String callfrom,int treatmentId);

public int administratedDoneReverse(String nursingMediIds, String callfrom,int userId);

public boolean DeleteMedicineChart(TreatmentNurses objtn,List<String> chkList,String userId);

public boolean UpdateMedicineChart(TreatmentNurses objtn, String datePick,String userId, String userUpdate, String password);

public boolean cancelExpenseVoucher(String id, int userid);

	// @codeBy:Irfan khan @codeDate:26-Dec-2016 (For Saving doctor Round template details)
	public int saveDoctorRoundTemplate(DoctorRoundTempDTO objdrt);

	// @codeBy:Irfan khan @codeDate:27-Dec-2016 (To Fetch doctor Round template details)
	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(String callFrom,String searchText);

	// @codeBy:Irfan khan @codeDate:27-Dec-2016 (to delete doctor Round template)
	public boolean deleteDoctorRoundTemplate(int templateId, int userId);
	
	// @codeBy:Manisha @codeDate:29-Dec-2016 (to fetch Treatment At Discharge template)
	public List<Order_master> featchTreatmentAtDischarge(String date, String tid, String type);
	
	public List<Order_comp_druges> fetchTreatmentAtDischrageOrder_comp_druges(int treatID);
	
	// @codeBy:Irfan khan @codeDate:8-feb-2016 (to update doctor Round template from nursing station)
	public int updateDoctorRoundTemp(String drrList,String ipAddress, int userId);
	
	public List<Order_comp_druges> fetchOrderForm(String docTemplateNameSelectID,
			int userId);
	
	List<Order_comp_druges> fetchOrderFormDocTemplateMedicine(
            int prescriptionTemplateID);
	
	
	public boolean saveUpdateDocOrderFormTemplate(
			Order_comp_druges ocdTemplateDTO);
	
	public boolean saveOrderFormDetailsTemp(
			Order_comp_druges objOrder_comp_druges,
			Order_master objOrder_master, String queryType, String page_Type, int userId);

	public boolean deleteDocOrderFormTemplateMedicine(
			String[] prepTempDocMedIDArray);

	public boolean usePrepDocTempForTreatment(String prepTemplateDocID,
			String treatmentId, String pagetyp);

	boolean saveOrderformtemplate(Order_comp_druges objOrder_master,
			String queryType, String Page_Type);

	public List<DoctorRoundReport> getDRRoundList(String tid, String date);
	
	public List<DoctorRoundTempDTO> fetchIpdPainScale(Integer pid, Integer tid,String date, String callform, String fromdate, String todate);
	
	public int saveIpdPainScale(DoctorRoundTempDTO objdrt, Integer pid,
			Integer tid, String date);
	
	public List<CustomizeTemplate> fetchCKEditorClinicalEvalutionOPD(String treatmentId);
	
	public List<DietMaster> fetchPrevDietOPD(String treatmentId);

	public List<Order_comp_druges> fetchIPDPresciption(String prevTreat);

	}
