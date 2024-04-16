package com.hms.model;

import java.util.ArrayList;
import java.util.List;

// import org.springframework.getContext().ApplicationContext;
// import org.springframework.getContext().support.ClassPathXmlApplicationContext;

import com.hms.canteen.dto.DietMaster;
import com.hms.dao.AdminDAO;
import com.hms.dao.IPDNusringMedicationDashboardDAO;
import com.hms.dao.IPDTreatmentDAO;
import com.hms.dao.TreatmentDAO;
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
import com.hms.utility.ApplicationContextUtils;

public class IPDTreatmentModel extends AbstractModel {

	/*
	 * ApplicationContext getContext() = new ClassPathXmlApplicationContext(
	 * "Spring-IpdTreatment.xml");
	 */

	// ApplicationContext getContext() = ApplicationContextUtils.getApplicationContext();

	public List<DoctorRoundReport> getPreviousRoundList(String tid, String date) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<DoctorRoundReport> drrList = ipdtreatmentDAO.fetchDoctorPreRound(
				tid, date);
		return drrList;
	}

	public List<DoctorRoundReport> getPrintPreviousRoundList(String tid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<DoctorRoundReport> drrList = ipdtreatmentDAO
				.fetchPrintDoctorPreRound(tid);
		return drrList;
	}

	public boolean setDoctorRound(String tid, String date, String drrString,
			DoctorRoundReport objdrr, String treatmentbedid, int userid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdrr = ipdtreatmentDAO.insertDoctorRound(tid, date, drrString,
				objdrr, treatmentbedid, userid);
		return isdrr;
	}

	public List<Chart> getChartList() {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<Chart> chartList = ipdtreatmentDAO.fetchChart();
		return chartList;
	}

	public List<ChartReport> getChartReportList(String tid, String cid,
			String date) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<ChartReport> chartReportList = ipdtreatmentDAO.fetchChartReport(
				tid, cid, date);
		return chartReportList;
	}

	public List<ChartReport> getPrintChartReportList(String tid, String cid,
			String date) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<ChartReport> chartReportList = ipdtreatmentDAO
				.fetchPrintChartReport(tid, cid, date);
		return chartReportList;
	}

	public boolean setChartReport(String tid, String cid, String date,
			String chartString, String sign, ChartReport objchart, int userId,int dptid,String did,int pid,int bid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean ischart = ipdtreatmentDAO.insertChartReport(tid, cid, date,
				chartString, sign, objchart, userId,dptid,did,pid,bid);
		return ischart;
	}

	public List<BillComponent> getPatientMaterialUsed(String tid, String date) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<BillComponent> ispmu = ipdtreatmentDAO.fetchPatientMaterialUsed(
				tid, date);
		return ispmu;
	}

	public int setMaterialUsed(String tid, String date, String materialString,
			BillComponent objmat, int userid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int ismu = ipdtreatmentDAO.saveUpdateMaterialUsed(tid, date,
				materialString, objmat, userid);
		return ismu;
	}

	public boolean DeleteDIC(TreatmentNurses objtn,String userId) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.fecthDeleteDIC(objtn,userId);
		return isdeleted;
	}

	public boolean UpadateDIC(TreatmentNurses objtn, String datePick,
			String userId,String userUpdate,String password) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isUpdated = ipdtreatmentDAO.fecthUpdateDIC(objtn, datePick,
				userId,userUpdate,password);
		return isUpdated;
	}

	public boolean DeleteDRR(DoctorRoundReport objdrr, int userid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.fecthDeleteDRR(objdrr,userid);
		return isdeleted;
	}

	public boolean DeleteMat(BillComponent objmat) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.fecthDeleteMat(objmat);
		return isdeleted;
	}

	public boolean DeleteChart(ChartReport objchart) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.fecthDeleteChart(objchart);
		return isdeleted;
	}

	public List<Patient> getDischargeSummary(String patID, String treatID) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<Patient> patList = ipdtreatmentDAO.getDischargeSummary(patID,
				treatID);

		return patList;
	}

	/*************************** @author husen ********************************/
	public List<DischargeSummery> fetchDischargeAutoSummary(String patID,
			String treatID) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<DischargeSummery> dsList = ipdtreatmentDAO
				.fetchDischargeAutoSummary(patID, treatID);

		return dsList;
	}

	public List<TreatmentNurses> fetchAllNursingChart(String treatID,
			String clickValue) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<TreatmentNurses> NCList = ipdtreatmentDAO.fetchAllNursingChart(
				treatID, clickValue);

		return NCList;
	}

	public List<ChartReport> printInvestChart(String tid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<ChartReport> chartReportList = ipdtreatmentDAO
				.printInvestChart(tid);
		return chartReportList;
	}

	public int SaveDischargeSummary(DischargeSummery objds,
			PaediatricDeptNICU objpdn) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int isInserted = ipdtreatmentDAO.SaveDischargeSummary(objds, objpdn);
		return isInserted;
	}

	public List<Order_comp_druges> OrderFormPopup() {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<Order_comp_druges> orderList = ipdtreatmentDAO.OrderFormPopup();
		return orderList;
	}

	public List<Order_master> featchOrderFormByDate(String date, String tid,
			String type) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<Order_master> order_masterList = ipdtreatmentDAO
				.featchOrderFormByDate(date, tid, type);

		return order_masterList;
	}

	public boolean saveOrderFormDetails(Order_comp_druges objOrder_comp_druges,
			Order_master objOrder_master, String queryType ,String Page_Type) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		boolean isdeleted = ipdtreatmentDAO.fecthDeleteMat(
				objOrder_comp_druges, objOrder_master, queryType ,Page_Type);

		return isdeleted;
	}

	public boolean changeBedState(String bedid, String bedstateid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		boolean issaved = ipdtreatmentDAO.changeBedState(bedid, bedstateid);

		return issaved;
	}

	public List<Patient> featchPreviousDischargeSummary(String strValue,
			String type) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<Patient> arrPatient = ipdtreatmentDAO
				.featchPreviousDischargeSummary(strValue, type);

		return arrPatient;
	}

	public int SaveIPDHistory(IPDHistoryMaster objIPDHistoryMaster,
			IPDHistoryMaster objIPDHistoryComp, String queryType,String tretID,int userid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int isInserted = ipdtreatmentDAO.saveIPDHistory(objIPDHistoryMaster,
				objIPDHistoryComp, queryType,tretID,userid);
		return isInserted;
	}

	public List<IPDHistoryMaster> fetchIPDHistory(String tretID) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<IPDHistoryMaster> ipdHisList = ipdtreatmentDAO
				.fetchIPDHistory(tretID);

		return ipdHisList;
	}

	public boolean deleteIPDHistory(String allVals) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean issaved = ipdtreatmentDAO.deleteIPDHistory(allVals);
		return issaved;
	}

	public int copyCurrentOrderForm(String tid, String date,
			String previousDate, int deleteForm) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int isInserted = ipdtreatmentDAO.copyCurrentOrderForm(tid, date,
				previousDate, deleteForm);
		return isInserted;
	}

	public boolean saveExpenseVoucher(IpdExpenceVoucher objExpenseVoucher,
			String queryType, int userid,String ipAddress) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isInsert = ipdtreatmentDAO.saveExpenseVoucher(
				objExpenseVoucher, queryType, userid, ipAddress);

		return isInsert;

	}

	public List<IpdExpenceVoucher> fetchExpenceVoucher(String pageName,
			int idipdm, String byType) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<IpdExpenceVoucher> ipdExpenceVoucherLi = ipdtreatmentDAO
				.fetchExpenceVoucher(pageName, idipdm, byType);

		return ipdExpenceVoucherLi;
	}

	public boolean deleteExpenseVoucher(String allVals, int userid) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean issaved = ipdtreatmentDAO.deleteExpenseVoucher(allVals,userid);
		return issaved;
	}

	public int getMaxExpenseID() {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int expenseId = ipdtreatmentDAO.getMaxExpenseID();

		return expenseId;
	}

	public boolean deleteOrderForm(int OFSlaveID) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isDeleted = ipdtreatmentDAO.deleteOrderForm(OFSlaveID);
		return isDeleted;
	}

	@SuppressWarnings("rawtypes")
	public List getDischargeSummeryList() {
		List<Patient> ipdPatientList = new ArrayList<Patient>();
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		ipdPatientList = ipdtreatmentDAO.getDischargeSummeryList();
		return ipdPatientList;
	}

	public List<Patient> getOperationSummeryList() {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List<Patient> ipdPatientList = ipdtreatmentDAO
				.getOperationSummeryList();
		return ipdPatientList;
	}

	public int SaveAutoDischargeSummary(DischargeSummery objds,
			PaediatricDeptNICU objpdn, String SummarNOte) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int isInserted = ipdtreatmentDAO.SaveAutoDischargeSummary(objds,
				objpdn, SummarNOte);
		return isInserted;
	}

	public boolean DeleteMat(String slaveid, String masterid, int userid) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isInserted = ipdtreatmentDAO.DeleteMat(slaveid, masterid, userid);
		return isInserted;
	}

	public boolean updateAdmissionNote(int patID, int treatID, String note) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isInserted = ipdtreatmentDAO.updateAdmissionNote(patID, treatID,note);
		return isInserted;
	}

	public List fetchNursingMedication(String todayDate,String callfrom,int treatmentId) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		List medicationList = ipdtreatmentDAO.fetchNursingMedication(todayDate,callfrom,treatmentId);
		return medicationList;
	}

	public int administratedDoneReverse(String nursingMediIds,
			String callfrom,int userId) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		int isdone = ipdtreatmentDAO.administratedDoneReverse(nursingMediIds,callfrom,userId);
		return isdone;
	}
	
	public boolean DeleteMedicineChart(TreatmentNurses objtn,List<String> chkList,String userId) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.DeleteMedicineChart(objtn,chkList,userId);
		return isdeleted;
	}
	

	public boolean UpdateMedicineChart(TreatmentNurses objtn, String datePick,
			String userId,String userUpdate,String password) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isUpdated = ipdtreatmentDAO.UpdateMedicineChart(objtn, datePick,
				userId,userUpdate,password);
		return isUpdated;
	}

	public boolean cancelExpenseVoucher(String id, int userid) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isUpdated = ipdtreatmentDAO.cancelExpenseVoucher(id, userid);
		return isUpdated;
	}
	
	// @codeBy:Irfan khan @codeDate:26-Dec-2016 (to Saving doctor Round template
	// details)
	public int saveDoctorRoundTemplate(DoctorRoundTempDTO objdrt) {
		IPDTreatmentDAO tDAO = (IPDTreatmentDAO) getContext().getBean(
				"ipdtreatmentDAO");
		int isNotified = tDAO.saveDoctorRoundTemplate(objdrt);
		return isNotified;
	}

	// @codeBy:Irfan khan @codeDate:27-Dec-2016 (to fetch doctor Round template
	// details)
	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(String callFrom,String searchText) {
		IPDTreatmentDAO tDAO = (IPDTreatmentDAO) getContext().getBean(
				"ipdtreatmentDAO");
		List<DoctorRoundTempDTO> isNotified = tDAO.fetchDoctorRoundTemplate(callFrom,searchText);
		return isNotified;
	}

	// @codeBy:Irfan khan @codeDate:27-Dec-2016 (to delete doctor Round template)
	public boolean deleteDoctorRoundTemplate(int templateId, int userId) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		boolean isdeleted = ipdtreatmentDAO.deleteDoctorRoundTemplate(
				templateId, userId);
		return isdeleted;
	}
	
	public List<Order_master> featchTreatmentAtDischarge(String date, String tid,
			String type) {

		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");

		List<Order_master> order_masterList = ipdtreatmentDAO
				.featchTreatmentAtDischarge(date, tid, type);

		return order_masterList;
	}
	
	public List<Order_comp_druges> fetchTreatmentAtDischrageOrder_comp_druges(int treatID) {
		IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
				.getBean("ipdtreatmentDAO");
		
		List<Order_comp_druges> order_comp_drugesli = ipdtreatmentDAO.fetchTreatmentAtDischrageOrder_comp_druges(treatID);
		
		
		return order_comp_drugesli;
	}
	
	// @codeBy:Irfan khan @codeDate:8-Feb-2017 (to update doctor Round template from nursing station)
		public int updateDoctorRoundTemp(String drrList,String ipAddress, int userId) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");
			
			int isUpdated = ipdtreatmentDAO.updateDoctorRoundTemp(drrList,ipAddress, userId);
			return isUpdated;
		}
		
		
		public List<Order_comp_druges> fetchOrderForm(
				String docTemplateNameSelectID, int userId) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");

			List<Order_comp_druges> order_masterList = ipdtreatmentDAO
					.fetchOrderForm(docTemplateNameSelectID, userId);

			return order_masterList;
		}
		
		
		public boolean saveUpdateDocOrderFormTemplate(
				Order_comp_druges ocdTemplateDTO) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");

			boolean isdeleted = ipdtreatmentDAO.saveUpdateDocOrderFormTemplate(ocdTemplateDTO);

			return isdeleted;
		}
		
		public boolean saveOrderFormDetailsTemp(
				Order_comp_druges objOrder_comp_druges,
				Order_master objOrder_master, String queryType, String page_Type, int userId) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");

			boolean isdeleted = ipdtreatmentDAO.saveOrderFormDetailsTemp(
					objOrder_comp_druges, objOrder_master, queryType ,page_Type, userId);

			return isdeleted;
		}
		
		public boolean deleteDocOrderFormTemplateMedicine(
				String[] prepTempDocMedIDArray) {
			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext().getBean(
					"ipdtreatmentDAO");
			boolean isDeleted = ipdtreatmentDAO
					.deleteDocOrderFormTemplateMedicine(prepTempDocMedIDArray);
			return isDeleted;
		}

		
		
		public boolean useOrderFormDocTempForTreatment(
				String prepTemplateDocID, String treatmentId, String pagetyp) {
			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext().getBean(
					"ipdtreatmentDAO");
			boolean flag = ipdtreatmentDAO.usePrepDocTempForTreatment(
					prepTemplateDocID, treatmentId,pagetyp);
			return flag;
		}

		public List<DoctorRoundReport> getDRRoundList(String tid, String date) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");
			List<DoctorRoundReport> drrList = ipdtreatmentDAO.getDRRoundList(
					tid, date);
			return drrList;
		}
		//jitendra 21 march 2019
		public List<DoctorRoundTempDTO> fetchIpdPainScale(
				Integer pid, Integer tid,String date, String callform, String fromdate, String todate) {
			IPDTreatmentDAO tDAO = (IPDTreatmentDAO) getContext().getBean(
					"ipdtreatmentDAO");
			List<DoctorRoundTempDTO> isNotified = tDAO.fetchIpdPainScale(pid,tid,date,callform,fromdate,todate);
			return isNotified;
		}
		
		public int saveIpdPainScale(DoctorRoundTempDTO objdrt, Integer pid,
				Integer tid, String date) {

			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");
			
			int isUpdated = ipdtreatmentDAO.saveIpdPainScale(objdrt,pid, tid,date);
			return isUpdated;
		}

		public List<CustomizeTemplate> fetchCKEditorClinicalEvalutionOPD(String treatmentId) {
			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext().getBean("ipdtreatmentDAO");
			List<CustomizeTemplate> customizeTemplateList = ipdtreatmentDAO
					.fetchCKEditorClinicalEvalutionOPD(treatmentId);
			return customizeTemplateList;
		}
		
		public List<DietMaster> fetchPrevDietOPD(String treatmentId) {
			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext().getBean("ipdtreatmentDAO");
			List<DietMaster> DietMasterList = ipdtreatmentDAO
					.fetchPrevDietOPD(treatmentId);
			return DietMasterList;
		}
		
		public List<Order_comp_druges> fetchIPDPresciption(String prevTreat) {
			IPDTreatmentDAO ipdtreatmentDAO = (IPDTreatmentDAO) getContext()
					.getBean("ipdtreatmentDAO");

			List<Order_comp_druges> order_masterList = ipdtreatmentDAO
					.fetchIPDPresciption(prevTreat);

			return order_masterList;
			}
}
