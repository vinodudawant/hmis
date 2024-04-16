package com.hms.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.print.Doc;

import org.json.simple.JSONArray;


import com.hms.admin.util.ComplaintMaster;
import com.hms.admin.util.OTCheckList;
import com.hms.admin.util.HraTypeMaster;
import com.hms.admin.util.QuestionMaster;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.constants.PackageTable;
import com.hms.dao.AdminDAO;
import com.hms.dao.ExpenseVoucherGroup;
import com.hms.dao.LedgerHead;
import com.hms.dao.PreOpPrep;
import com.hms.dto.BedCorporate;
import com.hms.dto.BedState;
import com.hms.dto.Beds;
import com.hms.dto.BillMaster;
import com.hms.dto.BillTowards;
import com.hms.dto.CathTrolley;
import com.hms.dto.Chart;
import com.hms.dto.ChartInfoDto;
import com.hms.dto.ChartReport;
import com.hms.dto.ChartTypeTbl;
import com.hms.dto.ChequeRegister;
import com.hms.dto.CompanyAgreement;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DiscountMaster;
import com.hms.dto.Distributer;
import com.hms.dto.Distributer_item;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorSpecility;
import com.hms.dto.Ehat_module;
import com.hms.dto.EmployeeSalaryDetails;
import com.hms.dto.GeneralVoucherDTO;
import com.hms.dto.GeneralVouchersDTO;
import com.hms.dto.HRSalaryComponent;
import com.hms.dto.Hall;
import com.hms.dto.HallType;
import com.hms.dto.HallTypeCharges;
//import com.hms.dto.HospitalDepartments;
//import com.hms.dto.HospitalAccDetails;
//import com.hms.dto.HospitalDepartments;
//import com.hms.dto.HospitalDetails;
import com.hms.dto.HospitalHoliday;
import com.hms.dto.HospitalOwnerDetails;
import com.hms.dto.HospitalSpecializations;
import com.hms.dto.ICD10_L;
import com.hms.dto.ICD10_L1;
import com.hms.dto.ICD10_L2;
import com.hms.dto.InvestigationTestDto;
import com.hms.dto.ItemMaster;
import com.hms.dto.LaundryBillMaster;
import com.hms.dto.LaundryOwner;
import com.hms.dto.LeaveMaster;
import com.hms.dto.LoundaryItem;
import com.hms.dto.MainteDate;
import com.hms.dto.Mainte_Machine_Master;
import com.hms.dto.Mainte_Mashine_Date;
import com.hms.dto.MaintenanceExtraItem;
import com.hms.dto.MotivatorPaymentDetails;
import com.hms.dto.MotivatorReportFromdateTodateDTO;
import com.hms.dto.MotivatorVoucherDetailsDTO;
import com.hms.dto.NursingChart;
import com.hms.dto.NursingTrolley;
import com.hms.dto.OTGroup;
import com.hms.dto.OTType;
import com.hms.dto.Operation;
import com.hms.dto.OperationChargehallwise;
import com.hms.dto.OperationDocTbl;
import com.hms.dto.OperationHallwiseCharges;
import com.hms.dto.OperationTypeTbl;
import com.hms.dto.OtherComps;
import com.hms.dto.OtherServicesDTO;
import com.hms.dto.Patient;
import com.hms.dto.PatientTitle;
import com.hms.dto.PayAllMatrix;
import com.hms.dto.PharmaCategoryDTO;
import com.hms.dto.PhysiotherapyTestDTO;
import com.hms.dto.ProFeesDTO;
import com.hms.dto.ProFeesVoucherDTO;
import com.hms.dto.RadiologyTemplate;
import com.hms.dto.ReportToMotivatorDTO;
import com.hms.dto.SalaryComponant;
import com.hms.dto.SalaryMaster;
import com.hms.dto.SchedularDoctorTimeSlot;
import com.hms.dto.SponsoredDetailsDTO;
import com.hms.dto.SurgicalKitComp;
import com.hms.dto.SurgicalKitMaster;
import com.hms.dto.SymptomsDetailsComp;
import com.hms.dto.TempPresComp;
import com.hms.dto.TemplateMaster;
import com.hms.dto.Test;
import com.hms.dto.TreatmentDoctors;
import com.hms.dto.TreatmentOperations;
import com.hms.dto.Users;
import com.hms.dto.Users_access;
import com.hms.dto.VaccineDTO;
import com.hms.dto.Visiting_doc_Procedure;
import com.hms.dto.VitalSing;
import com.hms.dto.district_taluka_city;
import com.hms.ehat.dto.SubServiceDto;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.getContext().ApplicationContext;
// import org.springframework.getContext().annotation.AnnotationConfigApplicationContext;
// import org.springframework.getContext().support.ClassPathXmlApplicationContext;

// import com.hms.utility.ApplicationContextUtils;

@SuppressWarnings({ "unchecked", "rawtypes" })
public class AdminModel extends AbstractModel {

	// ApplicationContext getContext() = new
	// ClassPathXmlApplicationContext("Spring-Admin.xml");

	// ApplicationContext getContext() = new
	// AnnotationConfigApplicationContext("com.hms.model.AdminDAO");

	// ApplicationContext getContext() =
	// ApplicationContextUtils.getApplicationContext();

	// ApplicationContext getContext() = new
	// ClassPathXmlApplicationContext("../ehat1.1pharmacy-hibernate-cofing.xml");

	public List<HospitalDetails> fetchHodspitalDetails(String corporateId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HospitalDetails> arrHodspitalDetails = adminDAO
				.fetchHodspitalDetails(corporateId);
		return arrHodspitalDetails;

	}

	public List<Users> fetchDefaltUser(String callFrom, String byName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultUser = adminDAO.fetchDefaultUser(callFrom, byName);
		return arrDefaultUser;
	}

	public List<Users> searchUser(String strValue, String searchBy) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultUser = adminDAO.searchUser(strValue,searchBy);

		return arrDefaultUser;
	}

	public List<Hall> fetchDefaultHall(String callFrom) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultHall = adminDAO.fetchDefaultHall(callFrom);
		return arrDefaultHall;
	}

	public boolean setUserDoctorDetails(Doctor objDoctor, Users objUser,
			String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.insert(objDoctor, objUser, queryType);
		return isInserted;
	}

	public String setHallDetails(Hall objHall, Beds objBeds, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.insert(objHall, objBeds, queryType);
		return isInserted;
	}

	public boolean setDeleteHall(int hallId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteHall(hallId);
		return isDeleted;
	}

	public boolean setDeleteUser(String userID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteUser(userID);
		return isDeleted;
	}

	public List<ItemMaster> showSearchItem(String searchBy, String strValue,
			String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchItem = adminDAO.showSearchItem(searchBy, strValue, type);

		return arrSearchItem;

	}

	public List<ItemMaster> showTopItem(String srchType, String alphabet) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultItem = adminDAO.displayDefItem(srchType, alphabet);

		return arrDefaultItem;
	}

	public int saveItem(ItemMaster objitemMaster, String itemString, String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveitem(objitemMaster, itemString, type);

		return isInserted;
	}

	public List<OtherComps> showTopOtherItem() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultOtherItem = adminDAO.displayDefOtherItem();
		return arrDefaultOtherItem;
	}

	public List<OtherComps> showSearchOtherItem(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultItem = adminDAO.displayDefSearchItem(searchBy, strValue);

		return arrDefaultItem;

	}

	public boolean saveOtherItem(OtherComps objOtherComps, String itemString) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveOtheritem(objOtherComps, itemString);

		return isInserted;
	}

	public List<Hall> searchHall(String strValue) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchtHall = adminDAO.searchHall(strValue);
		return arrSearchtHall;

	}

	public List<Beds> FetchEmptyBeds(int hallId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchtBeds = adminDAO.FetchEmptyBeds(hallId);
		return arrSearchtBeds;
	}

	public boolean deleteSpecBed(Beds objBeds) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteSpecBed(objBeds);
		return isDeleted;
	}

	public boolean AddBeds(Hall objHall) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.AddBeds(objHall);
		return isDeleted;
	}

	public int saveDistributerDetails(Distributer objdistributer,
			Distributer_item objdistributerItem, List<String> txtItem,
			List<String> chkpriceList, String queryType, Distributer objdisitem) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveDistributer(objdistributer,
				objdistributerItem, txtItem, chkpriceList, queryType,
				objdisitem);

		return isInserted;

	}

	public int fetchDistributerID() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int arrDistID = adminDAO.FetchDistID();
		return arrDistID;
	}

	public List<Distributer> fetchDefaltDistributer() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrFetchDist = adminDAO.fetchDistributor();
		return arrFetchDist;
	}

	public List<Distributer> updateDistributer(String did) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrUpdateDist = adminDAO.updateDistributor(did);
		return arrUpdateDist;
	}

	public boolean setDeleteDist(int intdid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteDist(intdid);
		return isDeleted;

	}

	public List<Distributer> showSearchDist(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchtDist = adminDAO.searchDist(searchBy, strValue);
		return arrSearchtDist;

	}

	public List<Operation> fetchDefaultOperation() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrOperation = adminDAO.fetchDefaultOperation();
		return arrOperation;
	}

	public List<Operation> searchOperation(String strValue) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrOperation = adminDAO.searchOperation(strValue);
		return arrOperation;
	}

	public List<ItemMaster> fetchItemPries(String equipments) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrItemPries = adminDAO.fetchItemPries(equipments);

		return arrItemPries;
	}

	public boolean saveOperation(Operation objOperation, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveOperation(objOperation, queryType);

		return isInserted;
	}

	public boolean deleteOperation(String oid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteOperation(oid);
		return isDeleted;
	}

	public int findNewOid() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int oid = adminDAO.findNewOid();
		return oid;
	}

	public List<Doctor> fetEmpDet(int userId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrEmpDet = adminDAO.fetEmpDet(userId);

		return arrEmpDet;
	}

	public int SaveEmpDetails(Users objUsers) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.SaveEmpDetails(objUsers);
		return isUpdated;
	}

	public boolean saveUserDetails(Doctor objDoctor, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean Isinserted = adminDAO.saveUserDetails(objDoctor, queryType);
		return Isinserted;
	}

	public int insertUserDetails(Users objUsers, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.insertUserDetails(objUsers, queryType);
		return isInserted;
	}

	public int findNewDid() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int did = adminDAO.findNewDid();
		return did;
	}

	public int saveDiscount(DiscountMaster objDiscountMaster,
			Object objOperation, String disRefType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveDiscount(objDiscountMaster, objOperation,
				disRefType);
		return isInserted;
	}

	public boolean updateDiscount(DiscountMaster objDiscountMaster) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updateDiscount(objDiscountMaster);
		return isInserted;
	}

	public List<DiscountMaster> fetchDefaultDiscount(String pageName) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DiscountMaster> arrDiscountMaster = adminDAO
				.fetchDefaultDiscount(pageName);
		return arrDiscountMaster;
	}

	public List<DiscountMaster> fetchSpecificDiscountComponant(int mdi) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DiscountMaster> arrDiscountComponant = adminDAO
				.fetchSpecificDiscountComponant(mdi);
		return arrDiscountComponant;
	}

	public int deleteDiscount(String sid, String pageName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isDeleted = adminDAO.deleteDiscount(sid, pageName);
		return isDeleted;
	}

	public List<DiscountMaster> searchDiscount(String strValue,
			String pageName, String searchType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DiscountMaster> arrDiscountMaster = adminDAO.searchDiscount(
				strValue, pageName, searchType);
		return arrDiscountMaster;
	}

	public String deadPatient(int patID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.deadPatient(patID);

		return isInserted;

	}

	public List<Chart> fetchDefaultChart() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Chart> arrChart = adminDAO.fetchDefaultChart();
		return arrChart;
	}

	public int findNewChartid() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int cid = adminDAO.findNewChartid();
		return cid;
	}

	public int saveChartDetails(Chart objChart, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveChartDetails(objChart, queryType);

		return isInserted;
	}

	public boolean deleteChart(String cid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteChartDetails(cid);

		return isInserted;
	}

	public List<Chart> searchChart(String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Chart> arrChart = adminDAO.searchChart(strValue);
		return arrChart;
	}

	public Doctor getDoctors() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Doctor objDoctor = adminDAO.getDoctors();
		return objDoctor;

	}

	public List<Test> fetchTest(String testType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> arrTest = adminDAO
				.fetchTest(testType, searhFlag, searchText);
		return arrTest;
	}

	public List<Test> searchTest(String strValue, String testType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> arrTest = adminDAO.searchTest(strValue, testType);
		return arrTest;
	}

	public List<Test> editTest(int testId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> arrTest = adminDAO.editTest(testId);
		return arrTest;
	}

	public int updateTest(Test objTest, String queryType, String testType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateTest(objTest, queryType, testType);
		return isUpdated;
	}

	public int fetchTestID(String testType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int tid = adminDAO.fetchTestID(testType);
		return tid;
	}

	public boolean deleteTest(String tid, String testType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteTest(tid, testType);

		return isInserted;
	}

	public List<Operation> fetchDefaultOperationForSDEditUtil(
			int sp_dic_master_id) {

		List<Operation> liOperation = new ArrayList<Operation>();
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		liOperation = adminDAO
				.fetchDefaultOperationForSDEditUtil(sp_dic_master_id);

		return liOperation;
	}

	public Doctor getDoctorsForUpdate(int sp_dic_master_id) {
		Doctor objDoctor = null;
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		objDoctor = adminDAO.getDoctorsForUpdate(sp_dic_master_id);

		return objDoctor;
	}

	public List<Patient> fetchLivePat() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchPat = adminDAO.fetchLivePat();

		return arrSearchPat;
	}

	public List<ItemMaster> findItemName(String itemNm) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchPat = adminDAO.findItemName(itemNm);

		return arrSearchPat;
	}

	public List<BillMaster> fetchPatientBill() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrPatientBill = adminDAO.fetchPatientBill();

		return arrPatientBill;
	}

	public boolean changeBillStatus(String id) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isChanged = adminDAO.changeBillStatus(id);

		return isChanged;
	}

	public List<BillMaster> searchPatientBill(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrPatientBill = adminDAO.searchPatientBill(searchBy, strValue);

		return arrPatientBill;
	}

	public List<Patient> searchDeathPat(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrSearchPat = adminDAO.searchDeathPat(searchBy, strValue);

		return arrSearchPat;
	}

	public boolean deleteItem(String id, String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteItem(id, type);

		return isInserted;
	}

	public boolean deleteOtherItem(String id) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteOtherItem(id);

		return isInserted;
	}

	public List<LoundaryItem> fetchDefLoundaryItem() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrarrLaundryItem = adminDAO.fetchDefLoundaryItem();

		return arrarrLaundryItem;
	}

	public int saveLaundryDetail(String laundryDetailString,
			LoundaryItem objLoundaryItem) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveLaundryDetail(laundryDetailString,
				objLoundaryItem);

		return isInserted;
	}

	public boolean DeleteLaundry(LoundaryItem objLoundaryItem) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.DeleteLaundry(objLoundaryItem);

		return isDeleted;
	}

	public List<LoundaryItem> searchLaundryItem(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrarrLaundryItem = adminDAO.searchLaundryItem(searchBy, strValue);

		return arrarrLaundryItem;
	}

	public List<LaundryOwner> fetchLOwner(String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrarrLaundryOwner = adminDAO.fetchLOwner(type);

		return arrarrLaundryOwner;
	}

	public int findNewOwnerid() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int oid = adminDAO.findNewOwnerid();
		return oid;
	}

	public int saveLOwnerDetails(LaundryOwner objLaundryOwner, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveLOwnerDetails(objLaundryOwner, queryType);

		return isInserted;
	}

	public boolean deleteLOwner(LaundryOwner objlLaundryOwner) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteLOwner(objlLaundryOwner);

		return isDeleted;
	}

	public List<LaundryOwner> searchLOwner(String searchBy, String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrLaundryOwner = adminDAO.searchLOwner(searchBy, strValue);

		return arrLaundryOwner;
	}

	public List<LaundryBillMaster> searchPrevLoundaryBill(String from, String to) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrLaundryBill = adminDAO.searchPrevLoundaryBill(from, to);

		return arrLaundryBill;
	}

	public boolean saveLaundryBill(String strRowsValues, String txtSubtotal,
			String txtSign, String popup_container2, int intOid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveLaundryBill(strRowsValues,
				txtSubtotal, txtSign, popup_container2, intOid);

		return isInserted;
	}

	public List<LaundryBillMaster> fetchPrevLoundaryBill() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrLaundryBill = adminDAO.fetchPrevLoundaryBill();

		return arrLaundryBill;
	}

	public List<LaundryBillMaster> fetchLoundaryBill(String bmid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrLaundryBill = adminDAO.fetchLoundaryBill(bmid);

		return arrLaundryBill;
	}

	public boolean deleteLBill(LaundryBillMaster objLaundryBillMaster) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteLBill(objLaundryBillMaster);

		return isDeleted;
	}

	public boolean updatePrevBill(LaundryBillMaster objLaundryBillMaster,
			String strRowsVal) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updatePrevBill(objLaundryBillMaster,
				strRowsVal);

		return isInserted;
	}

	public MainteDate fetchDefMMDatesUtil() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		MainteDate objMainteDate = adminDAO.fetchDefMMDatesUtil();

		return objMainteDate;
	}

	public boolean deleteMaintenanceMahineDate(MainteDate objMainteDate) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteMaintenanceMahineDate(objMainteDate);

		return isDeleted;
	}

	public boolean saveMaintenanceMahineDate(String mMDDetailString,
			MainteDate objMainteDate) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveMaintenanceMahineDate(
				mMDDetailString, objMainteDate);

		return isInserted;
	}

	public MaintenanceExtraItem FetchextraMItem() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		MaintenanceExtraItem objMainteExtra = adminDAO.FetchextraMItem();

		return objMainteExtra;
	}

	public int saveExtraMaintenanceMahine(String mMDDetailString,
			MaintenanceExtraItem objMEItem) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveExtraMaintenanceMahine(mMDDetailString,
				objMEItem);

		return isInserted;
	}

	public boolean DeleteExtraMaintenanceMahine(MaintenanceExtraItem objMEItem) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.DeleteExtraMaintenanceMahine(objMEItem);

		return isDeleted;
	}

	public boolean saveExtraMaintenanceMahine(String mMDDetailString) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO
				.saveExtraMaintenanceMahine(mMDDetailString);

		return isInserted;
	}

	public List<Mainte_Machine_Master> fetchMachineWithDate(String mmi) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<Mainte_Machine_Master> arrarrLaundryOwner = adminDAO
				.fetchMachineWithDate(mmi);

		return arrarrLaundryOwner;
	}

	public List<Mainte_Machine_Master> fetchAllMachine() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<Mainte_Machine_Master> arrarrLaundryOwner = adminDAO
				.fetchAllMachine();

		return arrarrLaundryOwner;
	}

	public List<MainteDate> fetchAllMachinMeaintDateType() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<MainteDate> arrarrLaundryOwner = adminDAO
				.fetchAllMachinMeaintDateType();

		return arrarrLaundryOwner;
	}

	public boolean updateMaintMachineDate(
			Mainte_Machine_Master objMainte_Machine_Master, String chkDate) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updateMaintMachineDate(
				objMainte_Machine_Master, chkDate);

		return isInserted;
	}

	public int saveMaintMachineDate(
			Mainte_Machine_Master objMainte_Machine_Master, String chkDate) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveMaintMachineDate(
				objMainte_Machine_Master, chkDate);

		return isInserted;
	}

	public Mainte_Mashine_Date fetchMachineMaintenance() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Mainte_Mashine_Date objMainte_Mashine_Date = adminDAO
				.fetchMachineMaintenance();

		return objMainte_Mashine_Date;
	}

	public boolean saveMainMachineMsainte(
			Mainte_Mashine_Date objMainte_Mashine_Date) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO
				.saveMainMachineMsainte(objMainte_Mashine_Date);

		return isInserted;
	}

	public List<EmployeeSalaryDetails> GetSalaryDates() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<EmployeeSalaryDetails> isInserted = adminDAO.GetSalaryDates();

		return isInserted;
	}

	public List<EmployeeSalaryDetails> fetchAllPrevSalaryDetails() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<EmployeeSalaryDetails> arrarrLaundryOwner = adminDAO
				.fetchAllPrevSalaryDetails();
		return arrarrLaundryOwner;
	}

	public List<EmployeeSalaryDetails> searchPrevSalaryDetails(String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<EmployeeSalaryDetails> arrarrLaundryOwner = adminDAO
				.searchPrevSalaryDetails(strValue);
		return arrarrLaundryOwner;
	}

	public boolean updateNoOfMonthSecDepo(int empmachCode, float f,
			float total_sub_depo, String sec_curr_month) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updateNoOfMonthSecDepo(empmachCode, f,
				total_sub_depo, sec_curr_month);

		return isInserted;
	}

	public boolean saveEmpSalaryDetails(
			EmployeeSalaryDetails objEmployeeSalaryDetails) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO
				.saveEmpSalaryDetails(objEmployeeSalaryDetails);

		return isInserted;
	}

	public Mainte_Mashine_Date fetchMachineMaintenanceView() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Mainte_Mashine_Date objMainte_Mashine_Date = adminDAO
				.fetchMachineMaintenanceView();

		return objMainte_Mashine_Date;
	}

	public MaintenanceExtraItem FetchextraMItemView() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		MaintenanceExtraItem objMainteExtra = adminDAO.FetchextraMItemView();

		return objMainteExtra;
	}

	public Mainte_Mashine_Date fetchPrevMacMaintence(int intMmmi, String dn) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Mainte_Mashine_Date objMainte_Mashine_Date = adminDAO
				.fetchPrevMacMaintence(intMmmi, dn);

		return objMainte_Mashine_Date;
	}

	public MaintenanceExtraItem fetchExtraPrevMItem(String emi) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		MaintenanceExtraItem objMainteExtra = adminDAO.FetchExtraPrevMItem(emi);

		return objMainteExtra;
	}

	public boolean saveTrolleyDetails(List<String> txtItem, String trolleyType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveTrolleyDetails(txtItem, trolleyType);

		return isInserted;
	}

	public List<NursingTrolley> fetchDefNursingTrolleyItem() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<NursingTrolley> arrNursingTrolley = adminDAO
				.fetchDefNursingTrolleyItem();
		return arrNursingTrolley;
	}

	public boolean saveNursingDetail(String txtmqty, String txtaqty,
			String txtheading, String itemID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveNursingDetail(txtmqty, txtaqty,
				txtheading, itemID);

		return isInserted;
	}

	public List<CathTrolley> fetchDefCathTrolleyItem() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<CathTrolley> arrCathTrolley = adminDAO.fetchDefCathTrolleyItem();
		return arrCathTrolley;
	}

	public boolean saveCathDetail(String txtmqty, String txtaqty,
			String txtheading, String itemID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveCathDetail(txtmqty, txtaqty,
				txtheading, itemID);

		return isInserted;
	}

	public List<NursingTrolley> searchNursingTrolleyItems(String searchBy,
			String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<NursingTrolley> arrNursingTrolley = adminDAO
				.searchNursingTrolleyItems(searchBy, strValue);
		return arrNursingTrolley;
	}

	public List<CathTrolley> searchCathTrolleyItems(String searchBy,
			String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<CathTrolley> arrCathTrolley = adminDAO.searchCathTrolleyItems(
				searchBy, strValue);
		return arrCathTrolley;
	}

	public boolean deleteNursingTrolleyItems(NursingTrolley objNursingTrolley) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO
				.deleteNursingTrolleyItems(objNursingTrolley);

		return isDeleted;
	}

	public boolean deleteCathTrolleyItem(CathTrolley objCathTrolley) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteCathTrolleyItem(objCathTrolley);

		return isDeleted;
	}

	public boolean deleteMachine(String mmi) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteMachine(mmi);

		return isDeleted;
	}

	public boolean saveBillTowards(String txtTname, String querytype) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveBillTowards(txtTname, querytype);

		return isInserted;

	}

	public List<BillTowards> getBillTowards(String searchbyTowards) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<BillTowards> listBillTowards = adminDAO
				.getBillTowards(searchbyTowards);
		return listBillTowards;
	}

	public boolean deleteTowards(String id) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteTowards(id);

		return isDeleted;

	}

	public List<SalaryMaster> getSalaryDetails(int userID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<SalaryMaster> arrCathTrolley = adminDAO.getSalaryDetails(userID);
		return arrCathTrolley;
	}

	public String saveSalaryDetails(SalaryMaster objSalaryMaster,
			String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveSalaryDetails(objSalaryMaster,
				queryType);
		return isInserted;
	}

	public List<SalaryComponant> getSalarySlipForEmp(int userID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<SalaryComponant> arrCathTrolley = adminDAO
				.getSalarySlipForEmp(userID);
		return arrCathTrolley;
	}

	public String saveSalarySlip(SalaryComponant objSalaryComponant) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveSalarySlip(objSalaryComponant);

		return isInserted;
	}

	public boolean saveTempDetails(TempPresComp objTempPresComp,
			String tempName, String idTempMast, String queryTyp,
			String selTempTyp, String status) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		boolean isInsert = adminDAO.saveTempDetails(objTempPresComp, tempName,
				idTempMast, queryTyp, selTempTyp, status);

		return isInsert;

	}

	public List<TempPresComp> fetchTempDetails(String idtm) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<TempPresComp> arrTempPresComp = adminDAO.fetchTempDetails(idtm);

		return arrTempPresComp;
	}

	public List<TemplateMaster> fetchAllTempName(String tempType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<TemplateMaster> arrTemplateMaster = adminDAO
				.fetchAllTempName(tempType);

		return arrTemplateMaster;
	}

	public List<SurgicalKitMaster> fetchAllSKName(String pageName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<SurgicalKitMaster> arrSurgicalKitMaster = adminDAO
				.fetchAllSKName(pageName);

		return arrSurgicalKitMaster;
	}

	public List<SurgicalKitComp> fetchSKDetails(String idskm, String pageName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<SurgicalKitComp> arrSurgicalKitComp = adminDAO.fetchSKDetails(
				idskm, pageName);

		return arrSurgicalKitComp;
	}

	public int saveSKDetail(SurgicalKitComp objSurgicalKitComp,
			String tempName, String idTempMast, String queryTyp,
			String selTempTyp, String status, String pageType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		int isInsert = adminDAO.saveSKDetail(objSurgicalKitComp, tempName,
				idTempMast, queryTyp, selTempTyp, status, pageType);

		return isInsert;

	}

	public List<HallType> fetchDefaultHallType(Integer corporateId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HallType> arrDefaultHall = adminDAO
				.fetchDefaultHallType(corporateId);
		return arrDefaultHall;
	}

	public String saveHallTypeDetails(HallType objHallType,
			HallTypeCharges objHallTypeCharges, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveHallTypeDetails(objHallType,
				objHallTypeCharges, queryType);
		return isInserted;
	}

	public boolean deleteHallTypeDetails(int hallId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteHallTypeDetails(hallId);
		return isDeleted;
	}

	public List<HallType> searchHallType(String strValue) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HallType> arrSearchtHall = adminDAO.searchHallType(strValue);
		return arrSearchtHall;

	}

	public List<Doctor> getHrDetials(int userID) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> arrSearchtHall = adminDAO.getHrDetials(userID);
		return arrSearchtHall;

	}

	public List<LeaveMaster> fetchLeavesDetails(int userID, String callFrom) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<LeaveMaster> arrLeaveMaster = adminDAO.fetchLeavesDetails(userID,
				callFrom);
		return arrLeaveMaster;

	}

	public List<ItemMaster> showPharmacyItem(String srchType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List arrDefaultItem = adminDAO.showPharmacyItem(srchType);
		return arrDefaultItem;
	}

	public List<Users_access> fetchUserAccessView(String ui) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Users_access> arrUsers_access = adminDAO.fetchUserAccessView(ui);
		return arrUsers_access;

	}

	public List<Ehat_module> fetchAllEhatModule() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Ehat_module> arrEhat_module = adminDAO.fetchAllEhatModule();
		return arrEhat_module;

	}

	public boolean saveUserAccessDetails(String ui, String modli,
			String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		boolean isInsert = adminDAO.saveUserAccessDetails(ui, modli, queryType);

		return isInsert;
	}

	public boolean saveLeavesDetails(LeaveMaster objLeaveMaster,
			String queryType, int userId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		boolean isInsert = adminDAO.saveLeavesDetails(objLeaveMaster,
				queryType, userId);

		return isInsert;
	}

	public boolean updateLeavesDetails(LeaveMaster objLeaveMaster) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		boolean isInsert = adminDAO.updateLeavesDetails(objLeaveMaster);

		return isInsert;
	}

	public String saveOTNameDetails(OTType objOTType, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveOTNameDetails(objOTType, queryType);
		return isInserted;
	}

	public List<OTType> fetchOTName() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OTType> arrOTType = adminDAO.fetchOTName();
		return arrOTType;
	}

	public boolean deleteOT(int otId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteOT(otId);
		return isDeleted;
	}

	public List<OTType> searchOT(String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OTType> arrSearchtOT = adminDAO.searchOT(strValue);
		return arrSearchtOT;
	}

	public void cancelLeaveStatus(String allVals) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		adminDAO.cancelLeaveStatus(allVals);

	}

	public boolean saveDiscountMaster(DiscountMaster objDiscountMaster,
			String pageName, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		boolean isInsert = adminDAO.saveDiscountMaster(objDiscountMaster,
				pageName, queryType);

		return isInsert;
	}

	public List<Doctor> fetchAllVisitingDoc() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> arrDoctor = adminDAO.fetchAllVisitingDoc();
		return arrDoctor;
	}

	public boolean updateVisitingDocFee(String docId, String feeApp,
			String charges, String hospcharges,
			Visiting_doc_Procedure objVisitdocPro, String chargTypVD) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updateVisitingDocFee(docId, feeApp,
				charges, hospcharges, objVisitdocPro, chargTypVD);
		return isInserted;
	}

	public List<Doctor> fetchAllAnesthetistDoc() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> arrDoctor = adminDAO.fetchAllAnesthetistDoc();
		return arrDoctor;
	}

	public List<Doctor> searchDocFeeInfo(String strValue, String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> arrDoctor = adminDAO.searchDocFeeInfo(strValue, type);
		return arrDoctor;
	}

	public boolean updateAnesthetistDocFee(String docId, String feeApp,
			String charges, String hospcharges) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.updateAnesthetistDocFee(docId, feeApp,
				charges, hospcharges);
		return isInserted;
	}

	public String savePTDetails(OperationTypeTbl objOperationTypeTbl,
			String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.savePTDetails(objOperationTypeTbl,
				queryType);
		return isInserted;
	}

	public List<OperationTypeTbl> fetchPTName() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OperationTypeTbl> arrOperationTypeTbl = adminDAO.fetchPTName();
		return arrOperationTypeTbl;
	}

	public List<OperationTypeTbl> searchPT(String strValue) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OperationTypeTbl> arrOperationTypeTbl = adminDAO
				.searchPT(strValue);
		return arrOperationTypeTbl;
	}

	public boolean deletePT(int ptId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deletePT(ptId);
		return isDeleted;
	}

	public boolean saveHospitalDetail(HospitalDetails objHospitalDetails,
			HospitalDepartmentDto objHospitalDepartments,
			HospitalSpecializations objHospitalSpecializations,
			String txtTimingScheduleId, String txtAppoStrtTime,
			String txtAppoEndTime, String txtAppoDure,
			HospitalAccDetails objHospitalAccDetails) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		/*
		 * boolean isInserted = adminDAO.saveHospitalDetail(objHospitalDetails,
		 * objHospitalDepartments, objHospitalSpecializations, txtTimingScheduleId,
		 * txtAppoStrtTime, txtAppoEndTime, txtAppoDure, objHospitalAccDetails);
		 */
		//return isInserted;
		return false;
	}

	public boolean saveuploadfile(String TID, String path, String date) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveuploadfile(TID, path, date);
		return isInserted;
	}

	public List<HospitalDetails> fetchHodspitalDetailsForPharmacy(
			String corporateId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HospitalDetails> arrHodspitalDetails = adminDAO
				.fetchHodspitalDetailsForPharmacy(corporateId);
		return arrHodspitalDetails;

	}

	public List<Doctor> fetchDoctorsList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("AdminDAO");
		List<Doctor> doctorSlotList = adminDAO.fetchDoctorSlotList();
		return doctorSlotList;
	}

	public boolean saveHospitalOwnerDetails(
			HospitalOwnerDetails objHospitalOwnerDetails) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO
				.saveHospitalOwnerDetails(objHospitalOwnerDetails);
		return isInserted;

	}

	public List<HospitalOwnerDetails> fetchHospitalOwnerDetails() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HospitalOwnerDetails> listHospitalOwnerDetails = adminDAO
				.fetchHospitalOwnerDetails();
		return listHospitalOwnerDetails;

	}

	public boolean deleteHospitalOwner(
			HospitalOwnerDetails objHospitalOwnerDetails) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO
				.deleteHospitalOwner(objHospitalOwnerDetails);
		return isDeleted;
	}

	public List<ICD10_L> fetchICD10Level1(String type, String byName, String callFrom) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ICD10_L> listICD10_L = adminDAO.fetchICD10Level1(type, byName, callFrom);
		return listICD10_L;
	}

	public boolean saveICDDiagnosisLevel1(ICD10_L objIcd10_L) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveICDDiagnosisLevel1(objIcd10_L);
		return isInserted;
	}

	public boolean saveICDDiagnosisLevel2(ICD10_L objIcd10_L,
			ICD10_L1 objIcd10_L1) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveICDDiagnosisLevel2(objIcd10_L,
				objIcd10_L1);
		return isInserted;
	}

	public boolean saveICDDiagnosisLevel3(ICD10_L1 objIcd10_L1,
			ICD10_L2 objIcd10_L2) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveICDDiagnosisLevel3(objIcd10_L1,
				objIcd10_L2);
		return isInserted;
	}

	public boolean saveDoctorSpeciality(DoctorSpecility objDoctorSpecility,
			String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveDoctorSpeciality(objDoctorSpecility,
				queryType);
		return isInserted;
	}

	public List<DoctorSpecility> fetchDoctorSpeciality(Integer corporateAcId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DoctorSpecility> listDoctorSpecility = adminDAO
				.fetchDoctorSpeciality(corporateAcId);
		return listDoctorSpecility;
	}

	public List<Doctor> fetchDoctorSlotList() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> listDoctorSlot = adminDAO.fetchDoctorSlotList();
		return listDoctorSlot;
	}

	public boolean removeThemSpl(String splId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.removeThemSpl(splId);
		return isDeleted;

	}

	public boolean removeThemDept(String deptId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.removeThemDept(deptId);
		return isDeleted;

	}

	public String saveBedStateDetails(BedState objBedstate, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO
				.saveBedStateDetails(objBedstate, queryType);
		return isInserted;
	}

	public boolean deleteBedStateUtil(int bedStateid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteBedStateDetails(bedStateid);
		return isDeleted;

	}

	public List<BedState> fetchBedState() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<BedState> listbedState = adminDAO.fetchDefaultBesState();
		return listbedState;
	}

	public int saveHospitalHoliday(HospitalHoliday objHospitalHoliday) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveHospitalHoliday(objHospitalHoliday);
		return isInserted;
	}

	public List<HospitalHoliday> fetchHospitalHoliday(String pageName,
			String year) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HospitalHoliday> listHospitalHoliday = adminDAO
				.fetchHospitalHoliday(pageName, year);
		return listHospitalHoliday;
	}

	public boolean deleteHospitalHoliday(String[] allVals) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteHospitalHoliday(allVals);
		return isDeleted;
	}

	public List<OperationChargehallwise> featchGrpCatWiseProCharge(
			String opcatid, String corporateAcId, String operationID, String sponsrid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OperationChargehallwise> listOperationChargehallwise = adminDAO
				.featchGrpCatWiseProCharge(opcatid, corporateAcId , operationID,sponsrid);
		return listOperationChargehallwise;
	}

	public boolean saveGrpCatWiseProCharge(
			OperationChargehallwise objopchrhallwise, String queryType,
			String opcatid, String operationID, String sponsrid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveGrpCatWiseProCharge(objopchrhallwise,
				queryType, opcatid ,operationID,sponsrid);
		return isInserted;
	}

	public String saveOTGroupDetails(OTGroup objotGroup, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveOTGroupDetails(objotGroup, queryType);
		return isInserted;
	}

	public List<OTGroup> fetchGroupDetails() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OTGroup> listOTGroup = adminDAO.fetchGroupDetails();
		return listOTGroup;
	}

	public boolean deleteOTGroups(int grpid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isdeleted = adminDAO.deleteOTGroups(grpid);
		return isdeleted;
	}

	public int saveCorporateAccountDiscount(DiscountMaster objDiscountMaster,
			String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveCorporateAccountDiscount(
				objDiscountMaster, queryType);
		return isInserted;
	}

	public boolean deleteIcdCodeUtil(String[] icdid, String level) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isdeleted = adminDAO.deleteIcdCode(icdid, level);
		return isdeleted;
	}

	/** **************Richa Code For Dynamic patient title************** */
	public int savePatientTitle(PatientTitle objPatientTitle, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int insert = adminDAO.savePatientTitle(objPatientTitle, queryType);
		return insert;
	}

	public boolean deletePatientTitleUtil(int pid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean istdeleted = adminDAO.deletePatientTitle(pid);
		return istdeleted;
	}

	public List<PatientTitle> fetchTitle() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PatientTitle> patientTitleList = adminDAO.fetchTitle();
		return patientTitleList;
	}

	public String saveHallTypeAccountDetails(HallType objHallType,
			HallTypeCharges objHallTypeCharges, String queryType, String hall_id) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveHallTypeAccountDetails(objHallType,
				objHallTypeCharges, queryType, hall_id);
		return isInserted;
	}

	public int setBedCharges(String itemString, String queryType,
			BedCorporate objBedCorporate) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.setBedCharges(itemString, queryType,
				objBedCorporate);
		return isInserted;
	}

	public List<Hall> FetchBedCharges(String type, Integer corporateAcId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Hall> arrBedCorporate = adminDAO.FetchBedCharges(type,
				corporateAcId);
		return arrBedCorporate;
	}

	/** ***********Richa code for HRsalarydetails************** */
	public List<SalaryMaster> fetchHRPrevSalaryDetails(String user_id,
			String from_date, String to_date) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<SalaryMaster> arrHrsalaryDetails = adminDAO
				.fetchHRPrevSalaryDetails(user_id, from_date, to_date);
		return arrHrsalaryDetails;
	}

	/** ********************End ************************************* */

	/** ***********Jyoti code for temp. patient data storage************** */

	/** ********************End ************************************* */

	/** HR Details **/
	public int saveHrSalaryComponent(HRSalaryComponent objHrSalaryComponent) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveHrSalaryComponent(objHrSalaryComponent);
		return isInserted;
	}

	public HRSalaryComponent fetchHrSalaryComponent() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		HRSalaryComponent objSalaryComponant = adminDAO
				.fetchHrSalaryComponent();
		return objSalaryComponant;
	}

	/** End **/
	public int saveSymDetail(SymptomsDetailsComp objSymptomsDetailsComp,
			String queryTyp) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		int isInsert = adminDAO.saveSymDetail(objSymptomsDetailsComp, queryTyp);

		return isInsert;

	}

	public List<SymptomsDetailsComp> fetchAllSymptoms(String did) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<SymptomsDetailsComp> arrSymptomsDetailsComp = adminDAO
				.fetchAllSymptoms(did);

		return arrSymptomsDetailsComp;
	}

	public boolean deleteSymptoms(List<String> chkList) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteSymptoms(chkList);

		return isInserted;
	}

	public List<ChartTypeTbl> fetchChartName() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartTypeTbl> arrChartTypeTbl = adminDAO.fetchChartName();
		return arrChartTypeTbl;
	}

	public List<ChartTypeTbl> fetchChartNameNew() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartTypeTbl> arrChartTypeTbl = adminDAO.fetchChartNameNew();
		return arrChartTypeTbl;
	}

	public int setAddChart() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int oid = adminDAO.setAddChart();
		return oid;
	}

	public int saveChartName(ChartTypeTbl objChart) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveChartName(objChart);

		return isInserted;
	}

	public int saveChartReport(ChartReport objChart) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveChartReport(objChart);

		return isInserted;
	}

	public boolean saveNursingChart(NursingChart objNursingChart, String Items,
			String tid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveNursingChart(objNursingChart, Items,
				tid);

		return isInserted;
	}

	public List<ChartTypeTbl> fetchdefaultChartView(String cType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartTypeTbl> arrChart = adminDAO.fetchdefaultChartView(cType);
		return arrChart;
	}

	public List<ChartReport> fetchdefaultChartSlaveView(String cType,
			String tid, String date) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartReport> arrChart = adminDAO.fetchdefaultChartSlaveView(cType,
				tid, date);
		return arrChart;
	}

	public List<NursingChart> fetchdefaultNursingChart(String tid, String date) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<NursingChart> arrChart = adminDAO.fetchdefaultNursingChart(tid,
				date);
		return arrChart;
	}

	public boolean deleteChartName(List<String> chkList) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteChartName(chkList);

		return isInserted;
	}

	public boolean SaveHospitalAccDetails(
			HospitalAccDetails objHospitalAccDetails, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		/*
		 * boolean isInserted = adminDAO.SaveHospitalAccDetails( objHospitalAccDetails,
		 * queryType);
		 */

		//return isInserted;
		return false;
	}

	public List<HospitalAccDetails> fetchHospitalAccDetails(String corporateId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<HospitalAccDetails> arrHospitalAccDetails = adminDAO
				.fetchHospitalAccDetails(corporateId);
		return arrHospitalAccDetails;
	}

	public List<CustomizeTemplate> fetchCustomizeTempList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<CustomizeTemplate> arrTemplateMaster = adminDAO
				.fetchCustomizeTempList();

		return arrTemplateMaster;
	}

	public List<RadiologyTemplate> fetchRisTempListTempList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<RadiologyTemplate> arrTemplateMaster = adminDAO
				.fetchRisTempListTempList();

		return arrTemplateMaster;
	}

	public List<RadiologyTemplate> fetchRisType(String ID) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<RadiologyTemplate> arrTemplateMaster = adminDAO.fetchRisType(ID);

		return arrTemplateMaster;
	}

	public List<CustomizeTemplate> fetchRisTempList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<CustomizeTemplate> arrTemplateMaster = adminDAO.fetchRisTempList();

		return arrTemplateMaster;
	}

	public boolean saveCustomizeTemplate(
			CustomizeTemplate objCustomizeTemplate, String Type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveCustomizeTemp(objCustomizeTemplate,
				Type);

		return isInserted;
	}

	public boolean saveRisTemplate(CustomizeTemplate objCustomizeTemplate,
			String Type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveRisTemp(objCustomizeTemplate, Type);

		return isInserted;
	}

	public boolean saveCrtReportTemp(String TempID, String TempTypeID, int TestID, String patId, String note, int userId, int tretId, int invidrd) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveCrtReportTemp(TempID, TempTypeID,TestID,patId,note,userId,tretId,invidrd);

		return isInserted;
	}
	public boolean saveChangedUserPassword(String userName, String newPassword,
			String userID, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean Isinserted = adminDAO.saveChangedUserPassword(userName,
				newPassword, userID, queryType);
		return Isinserted;

		// TODO Auto-generated method stub

	}

	/** ***********Jyoti code for temp. patient data storage************** */

	/**
	 * ***********Abhijit, kavita code for storing Sponsored
	 * Details**************
	 */
	public int saveSponsoredDetails(SponsoredDetailsDTO sponsoredDetailsDTO) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveSponsoredDetails(sponsoredDetailsDTO);

		return isInserted;
	}

	public List<SponsoredDetailsDTO> fetchSponsoredDetailsList(String strValue,
			String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<SponsoredDetailsDTO> sponsoredDetailsDTOList = null;
		sponsoredDetailsDTOList = adminDAO.fetchSponsoredDetailsList(strValue,
				type);

		return sponsoredDetailsDTOList;
	}

	public int editSponsoredDetails(SponsoredDetailsDTO sdDTO) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int msg = adminDAO.editSponsoredDetails(sdDTO);

		return msg;

	}

	public String deleteSponsoredDetails(int sponsoredID) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String msg = adminDAO.deleteSponsoredDetails(sponsoredID);

		return msg;

	}

	/*
	 * public boolean saveDoctorSlotTime(String txtMorSunStart, String
	 * txtMorMonStart, String txtMorTueStart, String txtMorWedStart, String
	 * txtMorThiStart, String txtMorFriStart, String txtMorSatStart, String
	 * txtMorSatEnd, String txtMorFriEnd, String txtMorThiEnd, String
	 * txtMorWedEnd, String txtMorTueEnd, String txtMorMonEnd, String
	 * txtMorSunEnd, String txtAftSunStart, String txtAftMonStart, String
	 * txtAftTueStart, String txtAftWedStart, String txtAftThiStart, String
	 * txtAftFriStart, String txtAftSatStart, String txtAftSatEnd, String
	 * txtAftFriEnd, String txtAftThiEnd, String txtAftWedEnd, String
	 * txtAftTueEnd, String txtAftMonEnd, String txtAftSunEnd, String
	 * txtEveSunStart, String txtEveMonStart, String txtEveTueStart, String
	 * txtEveWedStart, String txtEveThiStart, String txtEveFriStart, String
	 * txtEveSatStart, String txtEveSatEnd, String txtEveFriEnd, String
	 * txtEveThiEnd, String txtEveWedEnd, String txtEveTueEnd, String
	 * txtEveMonEnd, String txtEveSunEnd) {
	 * 
	 * SchedularDoctorTimeSlot schedularDoctorTimeSlot = new
	 * SchedularDoctorTimeSlot();
	 * schedularDoctorTimeSlot.setSunMorningStart(txtMorSunStart);
	 * schedularDoctorTimeSlot.setMonMorningStart(txtMorMonStart);
	 * schedularDoctorTimeSlot.setTueMorningStart(txtMorTueStart);
	 * schedularDoctorTimeSlot.setWedMorningStart(txtMorWedStart);
	 * schedularDoctorTimeSlot.setThiMorningStart(txtMorThiStart);
	 * schedularDoctorTimeSlot.setFriMorningStart(txtMorFriStart);
	 * schedularDoctorTimeSlot.setSatMorningStart(txtMorSatStart);
	 * schedularDoctorTimeSlot.setSunMorningEnd(txtMorSunEnd);
	 * schedularDoctorTimeSlot.setMonMorningEnd(txtMorMonEnd);
	 * schedularDoctorTimeSlot.setTueMorningEnd(txtMorTueEnd);
	 * schedularDoctorTimeSlot.setWedMorningEnd(txtMorWedEnd);
	 * schedularDoctorTimeSlot.setThiMorningEnd(txtMorThiEnd);
	 * schedularDoctorTimeSlot.setFriMorningEnd(txtMorFriEnd);
	 * schedularDoctorTimeSlot.setSatMorningEnd(txtMorSatEnd);
	 * 
	 * schedularDoctorTimeSlot.setSunAfternoonStart(txtAftSunStart);
	 * schedularDoctorTimeSlot.setMonAfternoonStart(txtAftMonStart);
	 * schedularDoctorTimeSlot.setTueAfternoonStart(txtAftTueStart);
	 * schedularDoctorTimeSlot.setWedAfternoonStart(txtAftWedStart);
	 * schedularDoctorTimeSlot.setThiAfternoonStart(txtAftThiStart);
	 * schedularDoctorTimeSlot.setFriAfternoonStart(txtAftFriStart);
	 * schedularDoctorTimeSlot.setSatAfternoonStart(txtAftSatStart);
	 * schedularDoctorTimeSlot.setSunAfternoonEnd(txtAftSunEnd);
	 * schedularDoctorTimeSlot.setMonAfternoonEnd(txtAftMonEnd);
	 * schedularDoctorTimeSlot.setTueAfternoonEnd(txtAftTueEnd);
	 * schedularDoctorTimeSlot.setWedAfternoonEnd(txtAftWedEnd);
	 * schedularDoctorTimeSlot.setThiAfternoonEnd(txtAftThiEnd);
	 * schedularDoctorTimeSlot.setFriAfternoonEnd(txtAftFriEnd);
	 * schedularDoctorTimeSlot.setSatAfternoonEnd(txtAftSatEnd);
	 * 
	 * schedularDoctorTimeSlot.setSunEverningStart(txtEveSunStart);
	 * schedularDoctorTimeSlot.setMonEverningStart(txtEveMonStart);
	 * schedularDoctorTimeSlot.setTueEverningStart(txtEveTueStart);
	 * schedularDoctorTimeSlot.setWedEverningStart(txtEveWedStart);
	 * schedularDoctorTimeSlot.setThiEverningStart(txtEveThiStart);
	 * schedularDoctorTimeSlot.setFriEverningStart(txtEveFriStart);
	 * schedularDoctorTimeSlot.setSatEverningStart(txtEveSatStart);
	 * schedularDoctorTimeSlot.setSunEverningEnd(txtEveSunEnd);
	 * schedularDoctorTimeSlot.setMonEverningEnd(txtEveMonEnd);
	 * schedularDoctorTimeSlot.setTueEverningEnd(txtEveTueEnd);
	 * schedularDoctorTimeSlot.setWedEverningEnd(txtEveWedEnd);
	 * schedularDoctorTimeSlot.setThiEverningEnd(txtEveThiEnd);
	 * schedularDoctorTimeSlot.setFriEverningEnd(txtEveFriEnd);
	 * schedularDoctorTimeSlot.setSatEverningEnd(txtEveSatEnd); //
	 * System.out.println(txtMorSunStart); AdminDAO adminDAO = (AdminDAO)
	 * getContext().getBean("adminDAO"); int isInserted =
	 * adminDAO.saveDoctorSlotTime(schedularDoctorTimeSlot);
	 * 
	 * return true; }
	 */

	public List<DiscountMaster> fetchSponsredNameBySponserTyp(int sponsredTypeId) {
		// TODO Auto-generated method stub
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DiscountMaster> listDiscountMasters = adminDAO
				.fetchSponsredNameBySponserTyp(sponsredTypeId);
		return listDiscountMasters;
	}

	/** ********************End ************************************* */

	/*
	 * Author : nIKHIL; Date : 12-9-2014; for Drop Down Menu (Radiology Test
	 * Type) on radiologyBodyPart.jsp & investigationTest.jsp;
	 */
	public List<Test> fetchDefaultTestType() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> arrDefaultTest = adminDAO.fetchDefaultTestType();
		return arrDefaultTest;
	}

	/*
	 * Author : nIKHIL; Date : 15-9-2014; for to update radiology body part on
	 * radiologyBodyPart.jsp
	 */
	public int updateBodyPart(Test objTest, String queryType, String testType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateBodyPart(objTest, queryType, testType);
		return isUpdated;
	}

	/*
	 * Author : nIKHIL; Date : 15-9-2014; for to delete radiology body part on
	 * radiologyBodyPart.jsp
	 */
	public boolean deleteBodyPart(String bodyPart_Id, String testType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteBodyPart(bodyPart_Id, testType);

		return isDeleted;
	}

	public String saveGroup(Test objotGroup, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		String isInserted = adminDAO.saveGroup(objotGroup, queryType);
		return isInserted;
	}

	public boolean saveDoctorSlotTime(
			SchedularDoctorTimeSlot objDoctorTimeSlot, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveDoctorSlotTime(objDoctorTimeSlot,
				queryType);
		if (isInserted == 1) {
			return true;
		} else
			return false;
	}

	// Author : nIKHIL; Date : 9-10-2014;
	// for Drop Down Menu (Radiology body part) on InvestigatioTest.jsp
	public List<InvestigationTestDto> fetchBodyPart() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<InvestigationTestDto> arrDefaultTest = adminDAO.fetchBodyPart();
		return arrDefaultTest;
	}

	// Author : nIKHIL; Date : 15-9-2014; for to update radiology body part on
	// radiologyBodyPart.jsp
	public int saveEditInvstTest(InvestigationTestDto objTest, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.saveEditInvstTest(objTest, queryType);
		return isUpdated;
	}

	// Author : nIKHIL; Date : 9-10-2014;
	public List<InvestigationTestDto> fetchInvstTest(String searhFlag,
			String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<InvestigationTestDto> arrDefaultTest = adminDAO.fetchInvstTest(
				searhFlag, searchText);
		return arrDefaultTest;
	}

	/*
	 * Author : nIKHIL; Date : 10-10-2014; to delete Investigation Test body
	 * part on INvestigationTest.jsp
	 */
	public boolean deleteInvstTest(int invstId) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteInvstTest(invstId);

		return isDeleted;
	}

	public int fetchSetDoctorSpecilizations(String treatmentId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int doctor_spl_id = adminDAO.fetchSetDoctorSpecilizations(treatmentId);
		return doctor_spl_id;
	}

	public List<CustomizeTemplate> fetchCustomizeTemplates(
			String doctor_spl_id, String ipdOpdFlag) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<CustomizeTemplate> customizeTemplateList = adminDAO
				.fetchCustomizeTemplates(doctor_spl_id, ipdOpdFlag);
		return customizeTemplateList;
	}

	public int saveNewChartDetails(ChartInfoDto chartInfo, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveNewChartDetails(chartInfo, queryType);
		return isInserted;
	}

	public List<ChartInfoDto> getExistingInputCharts(int chart_id,
			int treatment_id, String chart_date) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartInfoDto> chartList = adminDAO.getExistingInputCharts(
				chart_id, treatment_id,chart_date);
		return chartList;
	}

	public int deleteInputOutputChartDetails(ChartInfoDto chartInfo) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isDeleted = adminDAO.deleteInputOutputChartDetails(chartInfo);
		return isDeleted;
	}

	public List<ChartInfoDto> defaultChartNames(int cType_id) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ChartInfoDto> chartList = adminDAO.defaultChartNames(cType_id);
		return chartList;
	}

	public boolean saveCKEditorDocterDesk1(int idTreatmentCkeditor,
			String treatmentId, String keyValueCKEditorArrayDiv,
			String editorSubObjTreatmentData, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveCKEditorDocterDesk1(
				idTreatmentCkeditor, treatmentId, keyValueCKEditorArrayDiv,
				editorSubObjTreatmentData, userid);
		return isInserted;
	}

	public List<CustomizeTemplate> fetchCKEditorDocterDesk1(String treatmentId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<CustomizeTemplate> customizeTemplateList = adminDAO
				.fetchCKEditorDocterDesk1(treatmentId);
		return customizeTemplateList;
	}

	public int saveAgreement(CompanyAgreement objCompanyAgreement,
			String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveAgreement(objCompanyAgreement, queryType);
		return isInserted;
	}

	public List<CompanyAgreement> fetchCompanyAgreementDetails(String type,
			String strValue) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<CompanyAgreement> list = adminDAO.fetchCompanyAgreementDetails(
				type, strValue);
		return list;
	}

	public boolean deleteCompanyAgreement(Integer id) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteCompanyAgreement(id);
		return isDeleted;
	}

	public List<CompanyAgreement> fetchCompanyNameBySponserType(int parseInt) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<CompanyAgreement> list = adminDAO
				.fetchCompanyAgreementDetails(parseInt);
		return list;
	}

	public List<DiscountMaster> fetchPolicyNameByCompanyName(int spId, int comId) {
		// TODO Auto-generated method stub
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DiscountMaster> list = adminDAO.fetchCompanyAgreementDetails(spId,
				comId);
		return list;
	}

	public int SaveInvTestHallWiseCharges(InvestigationTestDto objtestchrg,
			String pageType, String sid) {
		// TODO Auto-generated method stub
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isinserted = adminDAO.SaveInvTestHallWiseCharges(objtestchrg,
				pageType, sid);
		return isinserted;
	}

	public int saveOperationDetailsWithHWChrages(Operation obj,
			String queryType,String updateType) {
		// TODO Auto-generated method stub
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isinserted = adminDAO.saveOperationDetailsWithHWChrages(obj,
				queryType,updateType);
		return isinserted;
	}
	
	public int SaveServicesHallWiseCharges(Test objtestchrg, String testType,
			String pageType, String sid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isinserted = adminDAO.SaveServicesHallWiseCharges(objtestchrg,
				testType, pageType, sid);
		return isinserted;
	}

	public List saveRisPatTemp(String tid, String patTemp) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List isInserted = adminDAO.saveRisPatTemp(tid, patTemp);

		return isInserted;
	}

	public List<OTGroup> searchGroupDetails(String searhFlag, String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OTGroup> listOTGroup = adminDAO.searchGroupDetails(searhFlag,
				searchText);
		return listOTGroup;
	}

	public List<InvestigationTestDto> FetchInvstTestForTPAhallwiseCharges(
			String searhFlag, String searchText, String sid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<InvestigationTestDto> arrDefaultTest = adminDAO
				.FetchInvstTestForTPAhallwiseCharges(searhFlag, searchText, sid);
		return arrDefaultTest;
	}

	public List<Test> fetchIPDServicesForTPAhallwiseCharges(String testType,
			String searhFlag, String searchText, String sid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> arrDefaultTest = adminDAO
				.fetchIPDServicesForTPAhallwiseCharges(testType, searhFlag,
						searchText, sid);
		return arrDefaultTest;
	}

	public List<Test> loadPathologyTestForTPA(int sp_dic_master_id,
			String heading, String searchType, String testName) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<Test> testListSearch = adminDAO.loadPathologyTestForTPA(
				sp_dic_master_id, heading, searchType, testName);
		return testListSearch;
	}

	public List<Test> loadPathologyPackagesForTPA(int sp_dic_master_id,
			String searchType, String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Test> testListSearch = adminDAO.loadPathologyPackagesForTPA(
				sp_dic_master_id, searchType, searchText);
		return testListSearch;
	}

	public boolean saveUpdateImmunization(VaccineDTO vaccineDTO) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean flag = adminDAO.saveUpdateImmunization(vaccineDTO);
		return flag;

	}

	public List fetchImmunization(String loadSearchParam,
			String searchVaccineByName) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List vaccineDTOList = adminDAO.fetchImmunization(loadSearchParam,
				searchVaccineByName);
		return vaccineDTOList;
	}

	public boolean deleteImmunization(String saveUpdateImmunizationID) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean flag = adminDAO.deleteImmunization(saveUpdateImmunizationID);
		return flag;

	}
   /***************************District_Taluka_City(27-Jan-2016)**************************/
	
	// Author : nIKHIL; Date : 24-9-2014;
	public int FetchDistrictID(String DistrictType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int tid = adminDAO.FetchDistrictID(DistrictType);
		return tid;
	}
	
	public List<district_taluka_city> fetchDistrict(String DistrictType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrDistrict = adminDAO
				.fetchDistrict(DistrictType, searhFlag, searchText);
		return arrDistrict;
	}

	public int updateDistrict(district_taluka_city objDistrict, String queryType, String DistrictType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateDistrict(objDistrict, queryType, DistrictType);
		return isUpdated;
	}
	
	public boolean deleteDistrict(String Districtid, String DistrictType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteDistrict(Districtid, DistrictType);

		return isInserted;
	}
	
	public List<district_taluka_city> searchDistrict(String strValue, String DistrictType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrDistrict = adminDAO.searchDistrict(strValue, DistrictType);
		return arrDistrict;
	}
	
	public List<district_taluka_city> fetchTaluka(String TalukaType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrTaluka = adminDAO
				.fetchTaluka(TalukaType, searhFlag, searchText);
		return arrTaluka;
	}
	
	public int FetchTalukaID(String TalukaType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int tid = adminDAO.FetchTalukaID(TalukaType);
		return tid;
	}

	public List<district_taluka_city> fetchDistrictList(String DistrictType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<district_taluka_city> districtList = adminDAO.fetchDistrictList(DistrictType);
		return districtList;
	}
	
	public int updateTaluka(district_taluka_city objTaluka, String queryType, String TalukaType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateTaluka(objTaluka, queryType, TalukaType);
		return isUpdated;
	}
	
	public boolean deleteTaluka(String Talukaid, String TalukaType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteTaluka(Talukaid, TalukaType);

		return isInserted;
	}
	
	public List<district_taluka_city> searchTaluka(String strValue, String TalukaType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrTaluka = adminDAO.searchTaluka(strValue, TalukaType);
		return arrTaluka;
	}
	
	public int updateCity(district_taluka_city objCity, String queryType, String CityType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateCity(objCity, queryType, CityType);
		return isUpdated;
	}
	
	public int FetchCityID(String CityType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int tid = adminDAO.FetchCityID(CityType);
		return tid;
	}
	
	public List<district_taluka_city> fetchTalukaList(String TalukaType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<district_taluka_city> talukaList = adminDAO.fetchTalukaList(TalukaType);
		return talukaList;
	}
	
	public List<district_taluka_city> fetchCity(String CityType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrCity = adminDAO
				.fetchCity(CityType, searhFlag, searchText);
		return arrCity;
	}
	
	public boolean deleteCity(String Cityid, String CityType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteCity(Cityid, CityType);

		return isInserted;
	}
	
	public List<district_taluka_city> searchCity(String strValue, String CityType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrCity = adminDAO.searchCity(strValue, CityType);
		return arrCity;
	}
	
	public List<district_taluka_city> fetchCityList(String CityType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<district_taluka_city> cityList = adminDAO.fetchCityList(CityType);
		return cityList;
	}
	
	public int FetchStateID(String StateType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int tid = adminDAO.FetchStateID(StateType);
		return tid;
	}
	
	public List<district_taluka_city> fetchState(String StateType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrState = adminDAO
				.fetchState(StateType, searhFlag, searchText);
		return arrState;
	}
	
	public int updateState(district_taluka_city objState, String queryType, String StateType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateState(objState, queryType, StateType);
		return isUpdated;
	}
	
	public boolean deleteState(String Stateid, String StateType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deleteState(Stateid, StateType);

		return isInserted;
	}
	
	public List<district_taluka_city> searchState(String strValue, String StateType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrCity = adminDAO.searchState(strValue, StateType);
		return arrCity;
	}
	
	public List<district_taluka_city> fetchStateList(String StateType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<district_taluka_city> stateList = adminDAO.fetchStateList(StateType);
		return stateList;
	}
	
	public List<OperationHallwiseCharges> fetchOperationHallCharges(String opID) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OperationHallwiseCharges> chargesList = adminDAO.fetchOperationHallCharges(opID);
		return chargesList;
	}
	
	public List<OperationHallwiseCharges> fetchHallwiseChargesOnLoad(String Type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OperationHallwiseCharges> chargesList = adminDAO.fetchHallwiseChargesOnLoad(Type);
		return chargesList;
	}

	/*public List<Doctor> fetchOnLoadDigitalSignDetail(int u_Id) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> ObjList = adminDAO.fetchOnLoadDigitalSignDetail(u_Id);
		return ObjList;
	}*/
	
	//Author@ Manisha- create Date 06 May 2016
	public int FetchReasonofVisitID(String ReasonOfVisitType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int reasonOfVisitid = adminDAO.FetchReasonofVisitID(ReasonOfVisitType);
		return reasonOfVisitid;
	}
	
	public int UpdateReasonOfVisit(district_taluka_city objReasonOfVisit, String queryType, String ReasonOfVisitType , int userid, int moduleId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.UpdateReasonOfVisit(objReasonOfVisit, queryType, ReasonOfVisitType, userid, moduleId);
		return isUpdated;
	}
	
	public List<district_taluka_city> fetchReasonOfVisitDetails(String ReasonOfVisitType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrReasonOfVisitDetails = adminDAO
				.fetchReasonOfVisitDetails(ReasonOfVisitType, searhFlag, searchText);
		return arrReasonOfVisitDetails;
	}
	
	public boolean DeleteReasonOfVisitDetails(String ReasonOfVisitId, String ReasonOfVisitType, int userid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.DeleteReasonOfVisitDetails(ReasonOfVisitId, ReasonOfVisitType,userid);

		return isInserted;
	}
	
	public List<district_taluka_city> searchReasonOfVisit(String strValue, String ReasonOfVisitType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<district_taluka_city> arrReasonOfVisit = adminDAO.searchReasonOfVisit(strValue, ReasonOfVisitType);
		return arrReasonOfVisit;
	}
	
	public boolean checkVitalDataIsPresentOrNot(List<ChartReport> arrChart) {
		
		  boolean flag = false;
		   for( int i=0; i < arrChart.size(); i++ )
		   {
			   ChartReport Obj=arrChart.get(i);
			   System.out.println("1..."+Obj.getAm8());
			   if(!Obj.getAm8().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm9().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm10().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm11().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm12().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm1().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm2().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm3().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm4().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm5().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm6().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm7().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm8().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm9().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm10().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm11().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getPm12().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm1().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm2().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
			   if(!Obj.getAm3().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   if(!Obj.getAm4().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   if(!Obj.getAm5().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   if(!Obj.getAm6().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   if(!Obj.getAm7().equals("")){
				   flag = true;
				   System.out.println("getAm8() break");
				   break;
			   }else{
				   flag = false;
			   }
			   
		   }
		   System.out.println("flag>>>>"+flag);


		return flag;
	}

	public boolean deactivateDatabaseAccess() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.deactivateDatabaseAccess();

		return isInserted;
	}
	
	public List<SponsoredDetailsDTO> getSponsordetails(String strValue) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<SponsoredDetailsDTO> list = adminDAO.getSponsordetails(strValue);
		return list;
	}


	public List<MotivatorPaymentDetails> fetchTestRelatedtToDoctorAndGroupId(
			int doctorId, int groupId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<MotivatorPaymentDetails> list = adminDAO.fetchTestRelatedtToDoctorAndGroupId(doctorId,groupId);
		return list;
	}

	public int saveMotivatorVoucherList(String[] voucherList,String[] vocherDetails,int userid,String ipAddress) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveMotivatorVoucherList(voucherList,vocherDetails,userid,ipAddress);
		return isInserted;
	}

	public Integer getNextMotivatorVoucherDetailsId(
			PackageTable ehatMotivatorVoucherDetails) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Integer nextId =adminDAO.getNextMotivatorVoucherDetailsId(ehatMotivatorVoucherDetails);
		return nextId;
	}

	public List<MotivatorVoucherDetailsDTO> fetchAllGeneratedVouchers(
			String callFrom, String voucherNo) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<MotivatorVoucherDetailsDTO> list = adminDAO.fetchAllGeneratedVouchers(callFrom, voucherNo);
		return list;
	}

	public MotivatorVoucherDetailsDTO viewMotivatorVoucherDetailsForId(
			String callFrom, int id) {
		
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		MotivatorVoucherDetailsDTO motivatorVoucherDetailsDTO = adminDAO.viewMotivatorVoucherDetailsForId(callFrom,id);			
		return motivatorVoucherDetailsDTO;
	}

	public int cancelGenratedVoucher(int id, String narration,int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isCancel = adminDAO.cancelGenratedVoucher(id,narration,userid);
		return isCancel;
	}

	public List<PayAllMatrix> fetchMotivatorBetweenDate(
			String callFrom, String fromDate, String toDate) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List list = adminDAO.fetchMotivatorBetweenDate(callFrom, fromDate, toDate);
		return list;
	}

	public boolean saveuploaddoc(int userId, String tID, String filePath, String note,
			Date svDate,String PatID, String ivfFlag) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isInserted = adminDAO.saveuploaddoc(userId,tID, filePath, note, svDate, PatID, ivfFlag);
		return isInserted;
	}

	public List<DocBean> fetchDocuments(String tID, String patId) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<DocBean> list = adminDAO.fetchDocuments(tID, patId);
		return list;
	}

	public boolean deluploaddoc(String TID, String date) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deluploaddoc(TID, date);
		return isDeleted;
	}

	public int payAllMotivatorFromToDate(String fromDate, String toDate,
			String callFrom, int userid, String ipAddress) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isPayAll = adminDAO.payAllMotivatorFromToDate(fromDate,toDate,callFrom,userid,ipAddress);
		return isPayAll;
	}

	public List<Doctor> fetchAuthorisedBy(String callFrom) {
		
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> list = adminDAO.fetchAuthorisedBy(callFrom);
		return list;
	}

	public List<ReportToMotivatorDTO> motivatorReportFromdateTodate(
			String callFrom, String fromdate, String todate, String doctorId,
			String idService, String radioType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ReportToMotivatorDTO> list = adminDAO.motivatorReportFromdateTodate(callFrom,fromdate,todate,doctorId,
				idService,radioType);
		return list;
	}

	// @author	: Irfan Khan  @date	: 17-Nov-2016  @reason	: Get next Id
	public Integer getNextId(String tableName) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		Integer nextId =adminDAO.getNextId(tableName);
		return nextId;
	}
	
	// @author	: Irfan Khan  @date	: 18-Nov-2016  @reason	: to fetch test list
	public List<ProFeesDTO> proFeesFetchTestList(
			int doctorId, String serviceType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ProFeesDTO> list = adminDAO.proFeesFetchTestList(doctorId,serviceType);
		return list;
	}
	
	// @author	: Irfan Khan  @date	: 22-Nov-2016  @reason	: to save voucher details list
	public int proFeesSaveVoucherList(String[] voucherList,String[] vocherDetails,int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.proFeesSaveVoucherList(voucherList,vocherDetails,userid);
		return isInserted;
	}
	
	// @author	: Irfan Khan  @date	: 23-Nov-2016  @reason	: to fetch all generated vouchers
	public List<ProFeesVoucherDTO> proFeesFetchAllGeneratedVouchers(
			String callFrom, String voucherNo) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ProFeesVoucherDTO> list = adminDAO.proFeesFetchAllGeneratedVouchers(callFrom, voucherNo);
		return list;
	}
	
	// @author	: Irfan Khan  @date	: 23-Nov-2016  @reason	: to view voucher details on model by ID
	public ProFeesVoucherDTO proFeesViewVoucherDetailsById(
			String callFrom, int id) {
		
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		ProFeesVoucherDTO proFeesVoucherDTO = adminDAO.proFeesViewVoucherDetailsById(callFrom,id);			
		return proFeesVoucherDTO;
	}

	// @author	: Irfan Khan  @date	: 24-Nov-2016  @reason	: to cancel the generated voucher
	public int proFeesCancelGenratedVoucher(int id, String narration,int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isCancel = adminDAO.proFeesCancelGenratedVoucher(id,narration,userid);
		return isCancel;
	}
	
	// @author	: Irfan Khan  @date	: 25-Nov-2016  @reason	: to fetch reports
	public List<ProFeesDTO> proFeesfetchReports(String callFrom,String fromDate,String toDate,int doctorId, String serviceType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ProFeesDTO> list = adminDAO.proFeesfetchReports(callFrom,fromDate,toDate,doctorId,serviceType);
		return list;
	}
	
	// @author	: Irfan Khan  @date	: 30-Nov-2016  @reason	: business summary report
		public List<ProFeesDTO> proFeesBusinessReport(String callFrom,String fromDate,String toDate,String doctorName) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<ProFeesDTO> list = adminDAO.proFeesBusinessReport(callFrom,fromDate,toDate,doctorName);
			return list;
		}
		
	// @author	: Irfan Khan  @date	: 30-Nov-2016  @reason	: business summary report
		public List<ProFeesDTO> proFeesBusinessReportHosp(String callFrom,String fromDate,String toDate) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<ProFeesDTO> list = adminDAO.proFeesBusinessReportHosp(callFrom,fromDate,toDate);
			return list;
		}
	
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: Fetching Next Voucher ID 
	public int fetchVoucherID() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int voucherId = adminDAO.fetchVoucherID();
		return voucherId;
	}
	
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: Fetching all Vouchers 
	public List<GeneralVoucherDTO> fetchVouchers(String actionFlag,String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<GeneralVoucherDTO> lstVouchers = adminDAO.fetchVouchers(actionFlag, searchText);
		return lstVouchers;
	}
	
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: save/update/delete Voucher 
	public int saveVoucherDetails(GeneralVoucherDTO obj, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveVoucherDetails(obj, queryType);
		return isInserted;
	}
	
	public List<ExpenseVoucherGroup> fetchVoucher(String VoucherType, String searhFlag,
			String searchText) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<ExpenseVoucherGroup> arrState = adminDAO
				.fetchVoucher(VoucherType, searhFlag, searchText);
		return arrState;
	}

	public int FetchVoucherID(String voucherType) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int vid = adminDAO.FetchVoucherID(voucherType);
			return vid;
		}

	public List<ExpenseVoucherGroup> fetchVoucherList(String voucherType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<ExpenseVoucherGroup> voucherList = adminDAO.fetchVoucherList(voucherType);
		return voucherList;
	}

	public int updateVoucher(int userid, ExpenseVoucherGroup objState, String queryType, String voucherType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.updateVoucher(userid, objState, queryType, voucherType);
		return isUpdated;
	}

	public boolean deleteVoucher(int userid, String voucherid, String voucherType) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			boolean isInserted = adminDAO.deleteVoucher(userid, voucherid, voucherType);

			return isInserted;
		}

	public List<ExpenseVoucherGroup> searchVoucher(String strValue,
			String VoucherType) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<ExpenseVoucherGroup> arrlist = adminDAO.searchVoucher(strValue, VoucherType);
			return arrlist;
		}

	public int FetchLedgerHeadID(String ledgerHeadType) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int tid = adminDAO.FetchLedgerHeadID(ledgerHeadType);
			return tid;
		}

	public List<LedgerHead> fetchLedgerHead(String ledgerHeadType,
			String searhFlag, String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<LedgerHead> arrhead = adminDAO
				.fetchLedgerHead(ledgerHeadType, searhFlag, searchText);
		return arrhead;
	}

	public int UpdateLedgerHead(int userid, LedgerHead objHead, String queryType,
			String ledgerHeadType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isUpdated = adminDAO.UpdateLedgerHead(userid, objHead, queryType, ledgerHeadType);
		return isUpdated;
	}

	public boolean deleteLedgerHead(int userid, String lhid,
			String ledgerHeadType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteLedgerHead(userid, lhid, ledgerHeadType);

		return isDeleted;
	}

	public List<LedgerHead> searchLedgerHead(String strValue,
			String ledgerHeadType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<LedgerHead> arrlist = adminDAO.searchLedgerHead(strValue, ledgerHeadType);
		return arrlist;
	}

	public List<LedgerHead> setLedgerHeadUtil(String str, String ledgerHeadType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<LedgerHead> arrhead = adminDAO
				.setLedgerHeadUtil(str, ledgerHeadType);
		return arrhead;
	}

	public List<LedgerHead> selLedgerHeadUtil(String str, String ledgerHeadType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<LedgerHead> arrhead = adminDAO
				.selLedgerHeadUtil(str, ledgerHeadType);
		return arrhead;
	}
	
	// @author	: Irfan Khan  @date	: 22-Sep-2016  @reason	: fetch physiotherap test
	public List<PhysiotherapyTestDTO> fetchPhysiotherapTest(String searhFlag,
			String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PhysiotherapyTestDTO> arrDefaultTest = adminDAO
				.fetchPhysiotherapyTest(searhFlag, searchText);
		return arrDefaultTest;
	}

	// @author	: Irfan Khan  @date	: 22-Sep-2016  @reason	: fetch otherservices test
	public List<OtherServicesDTO> fetchOtherServices(String searhFlag,
			String searchText) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OtherServicesDTO> arrDefaultTest = adminDAO.fetchOtherServices(
				searhFlag, searchText);
		return arrDefaultTest;
	}

	// @author	: Irfan Khan  @date	: 22-Sep-2016  @reason	: fetch physiotherap test hall wise charges
	public int savePhysiotherapyTestHallWiseCharges(
			PhysiotherapyTestDTO objtestchrg, String pageType, String sid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isinserted = adminDAO.savePhysiotherapyTestHallWiseCharges(
				objtestchrg, pageType, sid);
		return isinserted;
	}

	// @author	: Irfan Khan  @date	: 22-Sep-2016  @reason	: fetch otherservices test hall wise charges
	public int saveOSHWCharges(OtherServicesDTO objtestchrg, String pageType,
			String sid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isinserted = adminDAO.saveOSHWCharges(objtestchrg, pageType, sid);
		return isinserted;
	}
			
	public int InsertCheckList(OTCheckList objList, String queryType) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.InsertCheckList(objList, queryType);
		return isInserted;
	}

	public List<OTCheckList> fetchCheckList(String byName, String type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<OTCheckList> arrchk_access = adminDAO.fetchCheckList(byName,type);
		return arrchk_access;

	}

	public boolean setDeleteChkList(String ListID) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			boolean isDeleted = adminDAO.DeleteChkList(ListID);
			return isDeleted;
		}

	public int setMaxIDofList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int arrchk_access = adminDAO.MaxIDofList();
		return arrchk_access;

	}

	// @author : Irfan Khan @date : 14-Dec-2016 @reason : save vital heading
	public int saveVitalHeading(VitalSing vs, String queryType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int insert = adminDAO.saveVitalHeading(vs, queryType);
		return insert;
	}

	// @author : Irfan Khan @date : 14-Dec-2016 @reason : Fetch vital heading
	public List<VitalSing> fetchVitalHeading() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<VitalSing> vitalList = adminDAO.fetchVitalHeading();
		return vitalList;
	}

	// @author : Irfan Khan @date : 14-Dec-2016 @reason : Delete vital heading
	public boolean deleteVitalHeading(int vhid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean istdeleted = adminDAO.deleteVitalHeading(vhid);
		return istdeleted;
	}

	// @author : Irfan Khan @date : 20-Dec-2016 @reason : fetch template details
	public List<SurgicalKitMaster> fetchTemplateTopicList(String pageName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		List<SurgicalKitMaster> arrSurgicalKitMaster = adminDAO
				.fetchTemplateTopicList(pageName);

		return arrSurgicalKitMaster;
	}

	// @author : Irfan Khan @date : 20-Dec-2016 @reason : fetch template details
	public int saveTemplate(SurgicalKitComp objSurgicalKitComp,
			String tempName, String idTempMast, String queryTyp, String pageType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		int isInsert = adminDAO.saveTemplate(objSurgicalKitComp, tempName,
				idTempMast, queryTyp, pageType);

		return isInsert;

	}

	// @author : Irfan Khan @date : 21-Dec-2016 @reason : Delete template
	// details
	public int deleteTempTopic(int idTempTopic) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		int isInsert = adminDAO.deleteTempTopic(idTempTopic);

		return isInsert;

		}
	public List<QuestionMaster> FetchQueList(String byName, String type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<QuestionMaster> queList = adminDAO.FetchQueList(byName, type);
		return queList;
	}

	public int MaxIDofQueList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int arrque_access = adminDAO.MaxIDofQueList();
		return arrque_access;

	}

	public boolean DeleteQueList(String queID, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.DeleteQueList(queID, userid);
		return isDeleted;
	}

	public int InsertQue(QuestionMaster objquestionMaster, QuestionMaster objList, String queryType, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.InsertQue(objquestionMaster, objList, queryType, userid);
		return isInserted;
	}

	public int MaxIDofhraList() {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int arrhra_access = adminDAO.MaxIDofhraList();
		return arrhra_access;

	}

	public int InsertHRA(HraTypeMaster objList, String queryType, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.InsertHRA(objList, queryType, userid);
		return isInserted;
	}

	public List<HraTypeMaster> FetchhraList(String byName, String type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<HraTypeMaster> queList = adminDAO.FetchhraList(byName, type);
		return queList;
	}

	public boolean DeletehraList(String hraID, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.DeletehraList(hraID, userid);
		return isDeleted;
	}

	public List<HraTypeMaster> getHRAQue(String hraId, String pid, String tomid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean(
				"adminDAO");
		List<HraTypeMaster> queList = adminDAO.getHRAQue(hraId,pid,tomid);
		return queList;
	}

	public int savePatientQueAns(JSONArray jsonArray,
			int hraid, int pid, int tomid, int userid) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.savePatientQueAns(jsonArray, hraid, pid, tomid, userid);
		return isInserted;
	}

	// @author : Irfan Khan @date : 4-Jan-2017 @reason : to fetch number of print
	public int generalAccessNumOfPrint(int printId) {
		// System.err.println("inside");

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

		int numOfPrints = adminDAO.generalAccessNumOfPrint(printId);

		return numOfPrints;

	}
	// @author : Tushar @date : 16-Jan-2017 @reason : to fetch Hall Name List
	public List<Hall> FetchHallNameList(String htype) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Hall> hnameList = adminDAO.FetchHallNameList(htype);
		return hnameList;
	}

	public List<Doctor> fetchListOfSurgeons(String type) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<Doctor> docList = adminDAO.fetchListOfSurgeons(type);
		return docList;
	}

	// @author : Irfan Khan @date : 20-Feb-2017 @reason : to fetch number of print
	public int prevPendingPaymentNumOfPrint(int printId) {

	AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");

	int numOfPrints = adminDAO.prevPendingPaymentNumOfPrint(printId);

	return numOfPrints;

	}

	// @author: Irfan Khan   @date: 24-Mar-2016   @codeFor: fetch fetchPharmaCategoryMasterDetails
	public List<PharmaCategoryDTO> fetchPharmaCategoryMaster() {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PharmaCategoryDTO> catList = adminDAO.fetchPharmaCategoryMaster();
		return catList;
	}
	
	// @author: Irfan Khan   @date: 24-Mar-2016   @codeFor: Save PharmaCategoryMasterDetails
	public int saveSponsorCategory(PharmaCategoryDTO objDTO,int userId,String[] scList, String queryType, int midHidden) {
		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		int isInserted = adminDAO.saveSponsorCategory(objDTO,userId,scList, queryType, midHidden);
		return isInserted;
	}
	
	// @author: irfan klhan   @date: 28-Mar-2016   @codeFor: Fetching cat master list
	public List<PharmaCategoryDTO> fetchCatMasterList(String callFrom,String catName) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PharmaCategoryDTO> lstVouchers = adminDAO.fetchCatMasterList(callFrom, catName);
		return lstVouchers;
	}
	
	// @author: irfan klhan   @date: 28-Mar-2016   @codeFor: set cat master list
	public List<PharmaCategoryDTO> setCatMasterDetails(int mid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PharmaCategoryDTO> lstVouchers = adminDAO.setCatMasterDetails(mid);
		return lstVouchers;
	}

	// @author: irfan klhan @date: 28-Mar-2016 @codeFor: set cat slave list
	public List<PharmaCategoryDTO> setCatSlaveDetails(int mid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PharmaCategoryDTO> lstVouchers = adminDAO.setCatSlaveDetails(mid);
		return lstVouchers;
	}

	// @author: irfan klhan @date: 29-Mar-2016 @codeFor: delete cat master
	public boolean deleteCatMasterUtil(int userId,int mid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		boolean isDeleted = adminDAO.deleteCatMasterUtil(userId,mid);

		return isDeleted;
	}
	
	// @author: Manisha   @date: 25-Mar-2016   @codeFor: fetch fetchSponsorCategoryMaster
	public List<PharmaCategoryDTO> fetchSponsorCategoryMaster(String PatientType) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<PharmaCategoryDTO> catList = adminDAO.fetchSponsorCategoryMaster(PatientType);
		return catList;
	}
	
	// @author: Manisha   @date: 19 April 2017 @codeFor: fetch CompanySponsor
	public List<SponsoredDetailsDTO> fetchSponsoredCompanyDetailsList(String strValue,
			String type) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		List<SponsoredDetailsDTO> CompanyDetailsDTOList = null;
		CompanyDetailsDTOList = adminDAO.fetchSponsoredCompanyDetailsList(strValue,
				type);

		return CompanyDetailsDTOList;
	}
	
	// @author: Manisha   @date: 21 April 2017 @codeFor: fetch SponsorPolicy
	public List<SponsoredDetailsDTO> fetchSponsoredPolicyDetailsList(String strValue,
				String type) {

			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<SponsoredDetailsDTO> PolicyDetailsDTOList = null;
			PolicyDetailsDTOList = adminDAO.fetchSponsoredPolicyDetailsList(strValue,
					type);

			return PolicyDetailsDTOList;
		}
	
	// @author: Tushar   @date: 2-May-2017   @codeFor: fetch tom ID for OT Notes
		public List<TreatmentOperations> FetchOperationsData(String pid,String tid) {

			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<TreatmentOperations> idList = adminDAO.FetchOperationsData(pid,tid);
			return idList;
		}
		
		public List<SubServiceDto> fetchAllEhatHalls() {

			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<SubServiceDto> idList = adminDAO.fetchAllEhatHalls();
			return idList;
		}
		
		public List<HallType> fetchMappedHallType(int id) {

			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<HallType> idList = adminDAO.fetchMappedHallType(id);
			return idList;
		}

		
		
		public int getdepid(int trid) {
			// TODO Auto-generated method stub
			
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int dpid= adminDAO.getdepid(trid);
			return dpid;
		}

		public List<QuestionMaster> FetchEMRTemplate(int pId, int treatId, int emrId) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean(
					"adminDAO");
			List<QuestionMaster> queList = adminDAO.FetchEMRTemplate(pId,treatId,emrId);
			return queList;
		}

		public int SaveComplaintFinding(int userId, ComplaintMaster objComplaintMaster,
				int pId, int treatId, String type, String queryType) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.SaveComplaintFinding(userId,objComplaintMaster,pId,treatId,type,queryType);
			return isInserted;
		}

		public List<QuestionMaster> FetchEMRAssignedCompFind(int pId,
				int treatId, int emrId) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean(
					"adminDAO");
			List<QuestionMaster> queList = adminDAO.FetchEMRAssignedCompFind(pId,treatId,emrId);
			return queList;
		}

		public List<QuestionMaster> FetchAssignedFindings(int pId, int treatId) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean(
					"adminDAO");
			List<QuestionMaster> queList = adminDAO.FetchAssignedFindings(pId,treatId);
			return queList;
		}

		public List<QuestionMaster> FetchTemplateData(int idTemplate,int docSpecId, int bodyPartId, int pId, int treatId, int emrId) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean(
					"adminDAO");
			List<QuestionMaster> queList = adminDAO.FetchTemplateData(idTemplate,docSpecId,bodyPartId,pId,treatId,emrId);
			return queList;
		}

		public int savePatientEmrQueAns(JSONArray jsonArray, int emrId,
				int pId, int treatId, int userid) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.savePatientEmrQueAns(jsonArray, emrId, pId, treatId, userid);
			return isInserted;
		}

		public List<Doctor> getDoctorsDetails(int id) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<Doctor> listDoctor = adminDAO.getDoctorsDetails(id);
			return listDoctor;

	}
		
		public List<Doctor> getDoctorsDepDetails(int id) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			List<Doctor> listDoctor = adminDAO.getDoctorsDepDetails(id);
			return listDoctor;

		}
		
		public int setPrevSubObjToCurrent(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevSubObjToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevComplaintFindingToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevComplaintFindingToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevAssessmentToCurrent(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevAssessmentToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevPresciptionToCurrent(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevPresciptionToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevInstructionToCurrent(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevInstructionToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevIndividualInstructionToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevIndividualInstructionToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevSurgeryAdviceToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevSurgeryAdviceToCurrent(userId,patId,prev,current);
			return isInserted;
		}
		
		public int setPrevHistoryToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevHistoryToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevRadiotherapyToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevRadiotherapyToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevChemotherapyToCurrent(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevChemotherapyToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevDocumentsToCurrent(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevDocumentsToCurrent(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevOrderFormToCurrentIPD(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevOrderFormToCurrentIPD(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevClinicalEvaluationOPD(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevClinicalEvaluationOPD(userId,patId,prev,current);
			return isInserted;
		}

		public int setPrevPresciptionToCurrentOPDtoIPD(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevPresciptionToCurrentOPDtoIPD(userId,patId,prev,current);
			return isInserted;
		}
		
		public int setPrevDietOPDtoOPDAndIPD(int userId, int patId, int prev,
				int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevDietOPDtoOPDAndIPD(userId,patId,prev,current);
			return isInserted;
		}
		
		public int setPrevOrderFormToCurrentOPD(int userId, int patId,
				int prev, int current) {
			AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
			int isInserted = adminDAO.setPrevPresciptionToCurrentOPD(userId,patId,prev,current);
			return isInserted;
		}
		
}
