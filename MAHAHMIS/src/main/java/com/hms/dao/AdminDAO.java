package com.hms.dao;

import java.util.Date;
import java.util.List;

import org.json.simple.JSONArray;

import com.hms.admin.util.ComplaintMaster;
import com.hms.admin.util.OTCheckList;
import com.hms.admin.util.HraTypeMaster;
import com.hms.admin.util.QuestionMaster;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.constants.PackageTable;
import com.hms.dto.BedCorporate;
import com.hms.dto.BedState;
import com.hms.dto.Beds;
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
import com.hms.dto.HRSalaryComponent;
import com.hms.dto.Hall;
import com.hms.dto.HallType;
import com.hms.dto.HallTypeCharges;
import com.hms.dto.HospitalAccDetails;
import com.hms.dto.HospitalDepartments;
//import com.hms.dto.HospitalDepartments;
//import com.hms.dto.HospitalDetails;
import com.hms.dto.HospitalHoliday;
import com.hms.dto.HospitalOwnerDetails;
import com.hms.dto.HospitalSpecializations;
//import com.hms.dto.HospitalSpecializations;
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
import com.hms.dto.RouteDTO;
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
import com.hms.model.DocBean;

@SuppressWarnings("rawtypes")
public interface AdminDAO {
	public List searchUser(String strValue, String searchBy);

	public List fetchDefaultUser(String callFrom, String byName);

	public List fetchDefaultHall(String callFrom);

	public List saveRisPatTemp(String tid, String patTemp);

	public boolean insert(Doctor objDoctor, Users objUser, String queryType);

	public String insert(Hall objHall, Beds objBeds, String queryType);

	public boolean deleteHall(int hallId);

	public List showSearchItem(String searchBy, String strValue, String type);

	public List displayDefItem(String srchType, String alphabet);

	public int saveitem(ItemMaster objitemMaster, String itemString, String type);

	public List displayDefOtherItem();

	public List displayDefSearchItem(String searchBy, String strValue);

	public boolean saveOtheritem(OtherComps objOtherComps, String itemString);

	public List searchHall(String strValue);

	public boolean deleteUser(String userID);

	public List FetchEmptyBeds(int hallId);

	public boolean deleteSpecBed(Beds objBeds);

	public boolean AddBeds(Hall objHall);

	public int saveDistributer(Distributer objdistributer,
			Distributer_item objdistributerItem, List<String> txtItem,
			List<String> chkpriceList, String queryType, Distributer objdisitem);

	public int FetchDistID();

	public List fetchDistributor();

	public List updateDistributor(String did);

	public boolean deleteDist(int intdid);

	public List searchDist(String searchBy, String strValue);

	public List fetchDefaultOperation();

	public List searchOperation(String strValue);

	public List fetchItemPries(String equipments);

	public boolean saveOperation(Operation objOperation, String queryType);

	public boolean deleteOperation(String oid);

	public int findNewOid();

	public int findNewDid();

	public List fetEmpDet(int userId);

	public int saveDiscount(DiscountMaster objDiscountMaster,
			Object objOperation, String disRefType);

	public boolean updateDiscount(DiscountMaster objDiscountMaster);

	public int SaveEmpDetails(Users objUsers);

	public boolean saveUserDetails(Doctor objDoctor, String queryType);

	public int insertUserDetails(Users objUsers, String queryType);

	public List<DiscountMaster> fetchDefaultDiscount(String pageName);

	public int deleteDiscount(String sid, String pageName);

	public List<DiscountMaster> searchDiscount(String strValue,
			String pageName, String searchType);

	public String deadPatient(int patID);

	public List<Chart> fetchDefaultChart();

	List<DiscountMaster> fetchSpecificDiscountComponant(int mdi);

	public int findNewChartid();

	public int saveChartDetails(Chart objChart, String queryType);

	public boolean deleteChartDetails(String cid);

	public List<Chart> searchChart(String strValue);

	public Doctor getDoctors();

	public List<Test> fetchTest(String testType, String searhFlag,
			String searchText);

	public List<Test> searchTest(String strValue, String testType);

	public List<Test> editTest(int testId);

	public int updateTest(Test objTest, String queryType, String testType);

	public int fetchTestID(String testType);

	public boolean deleteTest(String tid, String testType);

	public List<Operation> fetchDefaultOperationForSDEditUtil(
			int sp_dic_master_id);

	public Doctor getDoctorsForUpdate(int sp_dic_master_id);

	public List fetchLivePat();

	public List findItemName(String itemNm);

	public List fetchPatientBill();

	public boolean changeBillStatus(String id);

	public List searchPatientBill(String searchBy, String strValue);

	public List searchDeathPat(String searchBy, String strValue);

	public boolean deleteItem(String id, String type);

	public boolean deleteOtherItem(String id);

	public List fetchDefLoundaryItem();

	public int saveLaundryDetail(String laundryDetailString,
			LoundaryItem objLoundaryItem);

	public boolean DeleteLaundry(LoundaryItem objLoundaryItem);

	public List searchLaundryItem(String searchBy, String strValue);

	public List fetchLOwner(String type);

	public int findNewOwnerid();

	public int saveLOwnerDetails(LaundryOwner objLaundryOwner, String queryType);

	public boolean deleteLOwner(LaundryOwner objlLaundryOwner);

	public List searchLOwner(String searchBy, String strValue);

	public List searchPrevLoundaryBill(String from, String to);

	public boolean saveLaundryBill(String strRowsValues, String txtSubtotal,
			String txtSign, String popup_container2, int intOid);

	public List fetchPrevLoundaryBill();

	public List fetchLoundaryBill(String bmid);

	public boolean deleteLBill(LaundryBillMaster objLaundryBillMaster);

	public boolean updatePrevBill(LaundryBillMaster objLaundryBillMaster,
			String strRowsVal);

	public MainteDate fetchDefMMDatesUtil();

	public boolean deleteMaintenanceMahineDate(MainteDate objMainteDate);

	public boolean saveMaintenanceMahineDate(String mMDDetailString,
			MainteDate objMainteDate);

	public MaintenanceExtraItem FetchextraMItem();

	public int saveExtraMaintenanceMahine(String mMDDetailString,
			MaintenanceExtraItem objMEItem);

	public boolean DeleteExtraMaintenanceMahine(MaintenanceExtraItem objMEItem);

	public boolean saveExtraMaintenanceMahine(String mMDDetailString);

	public List<Mainte_Machine_Master> fetchMachineWithDate(String mmi);

	public List<Mainte_Machine_Master> fetchAllMachine();

	public List<MainteDate> fetchAllMachinMeaintDateType();

	public boolean updateMaintMachineDate(
			Mainte_Machine_Master objMainte_Machine_Master, String chkDate);

	public int saveMaintMachineDate(
			Mainte_Machine_Master objMainte_Machine_Master, String chkDate);

	public Mainte_Mashine_Date fetchMachineMaintenance();

	public boolean saveMainMachineMsainte(
			Mainte_Mashine_Date objMainte_Mashine_Date);

	public List<EmployeeSalaryDetails> GetSalaryDates();

	public boolean updateNoOfMonthSecDepo(int empmachCode, float f,
			float total_sub_depo, String sec_curr_month);

	public boolean saveEmpSalaryDetails(
			EmployeeSalaryDetails objEmployeeSalaryDetails);

	public List<EmployeeSalaryDetails> fetchAllPrevSalaryDetails();

	public List<EmployeeSalaryDetails> searchPrevSalaryDetails(String strValue);

	public Mainte_Mashine_Date fetchMachineMaintenanceView();

	public MaintenanceExtraItem FetchextraMItemView();

	public Mainte_Mashine_Date fetchPrevMacMaintence(int intMmmi, String dn);

	public MaintenanceExtraItem FetchExtraPrevMItem(String emi);

	public boolean saveTrolleyDetails(List<String> txtItem, String trolleyType);

	public List<NursingTrolley> fetchDefNursingTrolleyItem();

	public boolean saveNursingDetail(String txtmqty, String txtaqty,
			String txtheading, String itemID);

	public List<CathTrolley> fetchDefCathTrolleyItem();

	public boolean saveCathDetail(String txtmqty, String txtaqty,
			String txtheading, String itemID);

	public List<NursingTrolley> searchNursingTrolleyItems(String searchBy,
			String strValue);

	public List<CathTrolley> searchCathTrolleyItems(String searchBy,
			String strValue);

	public boolean deleteNursingTrolleyItems(NursingTrolley objNursingTrolley);

	public boolean deleteCathTrolleyItem(CathTrolley objCathTrolley);

	public boolean deleteMachine(String mmi);

	public boolean saveBillTowards(String tname, String querytype);

	public List<BillTowards> getBillTowards(String searchbyTowards);

	public boolean deleteTowards(String id);

	public List<SalaryMaster> getSalaryDetails(int userID);

	public List<SalaryComponant> getSalarySlipForEmp(int userID);

	public String saveSalaryDetails(SalaryMaster objSalaryMaster,
			String queryType);

	public String saveSalarySlip(SalaryComponant objSalaryComponant);

	public boolean saveTempDetails(TempPresComp objTempPresComp,
			String tempName, String idTempMast, String queryTyp,
			String selTempTyp, String status);

	public List<TempPresComp> fetchTempDetails(String idtm);

	List<TemplateMaster> fetchAllTempName(String tempType);

	public List<SurgicalKitMaster> fetchAllSKName(String pageName);

	public List<SurgicalKitComp> fetchSKDetails(String idskm, String pageName);

	public int saveSKDetail(SurgicalKitComp objSurgicalKitComp,
			String tempName, String idTempMast, String queryTyp,
			String selTempTyp, String status, String pageType);

	public List<HallType> fetchDefaultHallType(Integer corporateId);

	public String saveHallTypeDetails(HallType objHallType,
			HallTypeCharges objHallTypeCharges, String queryType);

	public boolean deleteHallTypeDetails(int hallId);

	public List<HallType> searchHallType(String strValue);

	public List<Doctor> getHrDetials(int userID);

	public List showPharmacyItem(String srchType);

	public List<LeaveMaster> fetchLeavesDetails(int userID, String callFrom);

	public List<Users_access> fetchUserAccessView(String ui);

	public List<Ehat_module> fetchAllEhatModule();

	public boolean saveUserAccessDetails(String ui, String modli,
			String queryType);

	public boolean saveLeavesDetails(LeaveMaster objLeaveMaster,
			String queryType, int userId);

	public boolean updateLeavesDetails(LeaveMaster objLeaveMaster);

	public String saveOTNameDetails(OTType objOTType, String queryType);

	public List<OTType> fetchOTName();

	public boolean deleteOT(int otId);

	public List<OTType> searchOT(String strValue);

	public void cancelLeaveStatus(String allVals);

	public boolean saveDiscountMaster(DiscountMaster objDiscountMaster,
			String pageName, String queryType);

	public List<Doctor> fetchAllVisitingDoc();

	public boolean updateVisitingDocFee(String docId, String feeApp,
			String charges, String hospcharges,
			Visiting_doc_Procedure objVisitdocPro, String chargTypVD);

	public List<Doctor> fetchAllAnesthetistDoc();

	public List<Doctor> searchDocFeeInfo(String strValue, String type);

	public boolean updateAnesthetistDocFee(String docId, String feeApp,
			String charges, String hospcharges);

	public String savePTDetails(OperationTypeTbl objOperationTypeTbl,
			String queryType);

	public List<OperationTypeTbl> fetchPTName();

	public List<OperationTypeTbl> searchPT(String strValue);

	public boolean deletePT(int ptId);

	public boolean saveHospitalDetail(HospitalDetails objHospitalDetails,
			HospitalDepartmentDto objHospitalDepartments,
			HospitalSpecializations objHospitalSpecializations,
			String txtTimingScheduleId, String txtAppoStrtTime,
			String txtAppoEndTime, String txtAppoDure,
			HospitalAccDetails objHospitalAccDetails);

	public boolean saveuploadfile(String TID, String path, String date);

	// public List<HospitalDetails> fetchHodspitalDetails();

	public boolean saveHospitalOwnerDetails(
			HospitalOwnerDetails objHospitalOwnerDetails);

	public List<HospitalOwnerDetails> fetchHospitalOwnerDetails();

	public boolean deleteHospitalOwner(
			HospitalOwnerDetails objHospitalOwnerDetails);

	public List<ICD10_L> fetchICD10Level1(String type, String byName, String callFrom);

	public boolean saveICDDiagnosisLevel1(ICD10_L objIcd10_L);

	public boolean saveICDDiagnosisLevel2(ICD10_L objIcd10_L,
			ICD10_L1 objIcd10_L1);

	public boolean saveICDDiagnosisLevel3(ICD10_L1 objIcd10_L1,
			ICD10_L2 objIcd10_L2);

	public boolean saveDoctorSpeciality(DoctorSpecility objDoctorSpecility,
			String queryType);

	// public List<DoctorSpecility> fetchDoctorSpeciality();

	public boolean removeThemDept(String deptId);

	public boolean removeThemSpl(String splId);

	public String saveBedStateDetails(BedState objBedstate, String queryType);

	boolean deleteBedStateDetails(int bedStateid);

	List<BedState> fetchDefaultBesState();

	public int saveHospitalHoliday(HospitalHoliday objHospitalHoliday);

	public List<HospitalHoliday> fetchHospitalHoliday(String pageName,
			String year);

	public boolean deleteHospitalHoliday(String[] allVals);

	public List<OperationChargehallwise> featchGrpCatWiseProCharge(
			String opcatid, String corporateAcId, String operationID, String sponsrid);

	public boolean saveGrpCatWiseProCharge(
			OperationChargehallwise objopchrhallwise, String queryType,
			String opcatid, String operationID, String sponsrid);

	public String saveOTGroupDetails(OTGroup objotGroup, String queryType);

	public List<OTGroup> fetchGroupDetails();

	public boolean deleteOTGroups(int grpid);

	public int saveCorporateAccountDiscount(DiscountMaster objDiscountMaster,
			String queryType);

	public boolean deleteIcdCode(String[]  icdid, String level);

	public List<HospitalDetails> fetchHodspitalDetails(String corporateId);

	public List<HospitalDetails> fetchHodspitalDetailsForPharmacy(
			String corporateId);

	public List<Doctor> fetchDoctorSlotList();

	/** **************Richa Code For Dynamic patient title************** */
	public int savePatientTitle(PatientTitle objPatientTitle, String queryType);

	public boolean deletePatientTitle(int pid);

	public String saveHallTypeAccountDetails(HallType objHallType,
			HallTypeCharges objHallTypeCharges, String queryType, String hall_id);

	/** **************End************************************ */

	public List<PatientTitle> fetchTitle();

	List<DoctorSpecility> fetchDoctorSpeciality(Integer corporateAcId);

	public int setBedCharges(String itemString, String queryType,
			BedCorporate objBedCorporate);

	public List<Hall> FetchBedCharges(String type, Integer corporateAcId);

	/** ***********Jyoti code for temp. patient data storage************** */

	/** ***********Jyoti code for temp. patient data storage************** */

	public int saveSymDetail(SymptomsDetailsComp objSymptomsDetailsComp,
			String queryTyp);

	public List<SymptomsDetailsComp> fetchAllSymptoms(String did);

	public boolean deleteSymptoms(List<String> chkList);

	public List<ChartTypeTbl> fetchChartName();

	public List<ChartTypeTbl> fetchChartNameNew();

	public int setAddChart();

	public int saveChartName(ChartTypeTbl objChart);

	public int saveChartReport(ChartReport objChart);

	public boolean saveNursingChart(NursingChart objNursingChart, String Items,
			String tid);

	public List<ChartTypeTbl> fetchdefaultChartView(String cType);

	public List<ChartReport> fetchdefaultChartSlaveView(String cType,
			String tid, String date);

	public List<NursingChart> fetchdefaultNursingChart(String tid, String date);

	public boolean deleteChartName(List<String> chkList);

	public boolean SaveHospitalAccDetails(
			HospitalAccDetails objHospitalAccDetails, String queryType);

	public List<com.hms.administrator.dto.HospitalAccDetails> fetchHospitalAccDetails(String corporateId);

	/** ********************End ************************************* */

	/** HR Details **/
	public int saveHrSalaryComponent(HRSalaryComponent objHrSalaryComponent);

	public HRSalaryComponent fetchHrSalaryComponent();

	/** End **/

	public List<SalaryMaster> fetchHRPrevSalaryDetails(String user_id,
			String from_date, String to_date);

	public List<CustomizeTemplate> fetchCustomizeTempList();

	public List<RadiologyTemplate> fetchRisTempListTempList();

	public List<RadiologyTemplate> fetchRisType(String ID);

	public List<CustomizeTemplate> fetchRisTempList();

	public boolean saveCustomizeTemp(CustomizeTemplate objCustomizeTemplate,
			String Type);

	public boolean saveRisTemp(CustomizeTemplate objCustomizeTemplate,
			String Type);

	public boolean saveCrtReportTemp(String TempID, String TempTypeID, int TestID, String patId, String note, int userId, int tretId, int invidrd);

	public boolean saveChangedUserPassword(String userName, String newPassword,
			String userID, String queryType);

	public int saveSponsoredDetails(SponsoredDetailsDTO sponsoredDetailsDTO);

	public List<SponsoredDetailsDTO> fetchSponsoredDetailsList(String strValue,
			String type);

	public int editSponsoredDetails(SponsoredDetailsDTO sdDTO);

	public String deleteSponsoredDetails(int sponsoredID);

	public int saveDoctorSlotTime(
			SchedularDoctorTimeSlot schedularDoctorTimeSlot, String queryType);

	public List<DiscountMaster> fetchSponsredNameBySponserTyp(int sponsredTypeId);

	public List<Test> fetchDefaultTestType();

	public int updateBodyPart(Test objTest, String queryType, String testType);

	public boolean deleteBodyPart(String bodyPart_Id, String testType);

	public String saveGroup(Test objGroup, String queryType);

	public List<InvestigationTestDto> fetchBodyPart();

	public int saveEditInvstTest(InvestigationTestDto objTest, String queryType);

	public List<InvestigationTestDto> fetchInvstTest(String searhFlag,
			String searchText);

	public boolean deleteInvstTest(int invstId);

	public int fetchSetDoctorSpecilizations(String treatmentId);

	public List<CustomizeTemplate> fetchCustomizeTemplates(
			String doctor_spl_id, String ipdOpdFlag);

	public int saveNewChartDetails(ChartInfoDto chartInfo, String queryType);

	public List<ChartInfoDto> getExistingInputCharts(int chart_id,
			int treatment_id, String chart_date);

	public int deleteInputOutputChartDetails(ChartInfoDto chartInfo);

	public List<ChartInfoDto> defaultChartNames(int cType_id);

	public boolean saveCKEditorDocterDesk1(int idTreatmentCkeditor,
			String treatmentId, String keyValueCKEditorArrayDiv,
			String editorSubObjTreatmentData, int userid);

	public List<CustomizeTemplate> fetchCKEditorDocterDesk1(String treatmentId);

	public int saveAgreement(CompanyAgreement objCompanyAgreement,
			String queryType);

	public List<CompanyAgreement> fetchCompanyAgreementDetails(String type,
			String strValue);

	public boolean deleteCompanyAgreement(Integer id);

	public List<CompanyAgreement> fetchCompanyAgreementDetails(int parseInt);

	public List<DiscountMaster> fetchCompanyAgreementDetails(int spId, int comId);

	public int SaveInvTestHallWiseCharges(InvestigationTestDto objtestchrg,
			String pageType, String sid);
	
	public int saveOperationDetailsWithHWChrages(Operation obj,
			String queryType,String updateType);

	public int SaveServicesHallWiseCharges(Test objtestchrg, String testType,
			String pageType, String sid);

	public List<OTGroup> searchGroupDetails(String searhFlag, String searchText);

	public List<InvestigationTestDto> FetchInvstTestForTPAhallwiseCharges(
			String searhFlag, String searchText, String sid);

	public List<Test> fetchIPDServicesForTPAhallwiseCharges(String testType,
			String searhFlag, String searchText, String sid);

	public List<Test> loadPathologyTestForTPA(int sp_dic_master_id,
			String heading, String searchType, String testName);

	public List<Test> loadPathologyPackagesForTPA(int sp_dic_master_id,
			String searchType, String searchText);

	public boolean saveUpdateImmunization(VaccineDTO vaccineDTO);

	public List fetchImmunization(String onloadSearchParam,
			String searchVaccineByName);

	public boolean deleteImmunization(String saveUpdateImmunizationID);
	
	public int FetchDistrictID(String DistrictType);

	public List<district_taluka_city> fetchDistrict(String DistrictType, String searhFlag,
			String searchText);

	public int updateDistrict(district_taluka_city objDistrict, String queryType, String TalukaType);
	
	public boolean deleteDistrict(String Districtid, String DistrictType);
	
	public List<district_taluka_city> searchDistrict(String strValue, String DistrictType);
	
	public List<district_taluka_city> fetchTaluka(String TalukaType, String searhFlag,
			String searchText);
	
	public int FetchTalukaID(String TalukaType);
	
	public List<district_taluka_city> fetchDistrictList(String DistrictType);
	
	public int updateTaluka(district_taluka_city objTaluka, String queryType, String TalukaType);
	
	public boolean deleteTaluka(String Talukaid, String TalukaType);
	
	public List<district_taluka_city> searchTaluka(String strValue, String TalukaType);
	
	public int updateCity(district_taluka_city objCity, String queryType, String CityType);
	
	public int FetchCityID(String CityType);
	
	public List<district_taluka_city> fetchTalukaList(String TalukaType);
	
	public List<district_taluka_city> fetchCity(String CityType, String searhFlag,
			String searchText);
	
	public boolean deleteCity(String Cityid, String CityType);
	
	public List<district_taluka_city> searchCity(String strValue, String CityType);
	
	public List<district_taluka_city> fetchCityList(String CityType);
	
	public int FetchStateID(String StateType);
	
	public List<district_taluka_city> fetchState(String StateType, String searhFlag,
			String searchText);
	
	public int updateState(district_taluka_city objState, String queryType, String StateType);
	
	public boolean deleteState(String Stateid, String StateType);
	
	public List<district_taluka_city> searchState(String strValue, String StateType);
	
	public List<district_taluka_city> fetchStateList(String StateType);
	
	public List<OperationHallwiseCharges> fetchOperationHallCharges(String opID);
	public List<OperationHallwiseCharges> fetchHallwiseChargesOnLoad(String Type);
	
	//Author@ Manisha - Create Date 06 May 2016
	public int FetchReasonofVisitID(String ReasonOfVisitType);
	
	public int UpdateReasonOfVisit(district_taluka_city objReasonOfVisit, String queryType, String ReasonOfVisitType,int userid,int moduleId);

	public List<district_taluka_city> fetchReasonOfVisitDetails(String ReasonOfVisitType, String searhFlag,
			String searchText);
	
	public boolean DeleteReasonOfVisitDetails(String ReasonOfVisitId, String ReasonOfVisitType,int userid);
	
	public List<district_taluka_city> searchReasonOfVisit(String strValue, String ReasonOfVisitType);
	public List<SponsoredDetailsDTO> getSponsordetails(String strValue);

	public boolean deactivateDatabaseAccess();
	
	public boolean saveuploaddoc(int userId, String tID, String filePath, String note, Date svDate, String PatID, String ivfFlag);

	public List<DocBean> fetchDocuments(String tID, String patId);

	public boolean deluploaddoc(String TID, String date);

	public List<MotivatorPaymentDetails> fetchTestRelatedtToDoctorAndGroupId(
			int doctorId, int groupId);

	public int saveMotivatorVoucherList(String[] voucherList,String[] vocherDetails,int userid,String ipAddress);

	public Integer getNextMotivatorVoucherDetailsId(
			PackageTable ehatMotivatorVoucherDetails);

	public List<MotivatorVoucherDetailsDTO> fetchAllGeneratedVouchers(
			String callFrom, String voucherNo);

	public MotivatorVoucherDetailsDTO viewMotivatorVoucherDetailsForId(
			String callFrom, int id);

	public int cancelGenratedVoucher(int id, String narration, int userid);

	public List<PayAllMatrix> fetchMotivatorBetweenDate(
			String callFrom, String fromDate, String toDate);

	public int payAllMotivatorFromToDate(String fromDate, String toDate,
			String callFrom, int userid, String ipAddress);

	public List<Doctor> fetchAuthorisedBy(String callFrom);

	public List<ReportToMotivatorDTO> motivatorReportFromdateTodate(
			String callFrom, String fromdate, String todate, String doctorId,
			String idService, String radioType);
	public int InsertCheckList(OTCheckList objList, String queryType);

	public List<OTCheckList> fetchCheckList(String byName, String type);

	public boolean DeleteChkList(String ListID);

	public int MaxIDofList();
	
	// @author	: Irfan Khan  @date	: 17-Nov-2016  @reason	: Get next Id
	public Integer getNextId(String tableName);
	
	// @author	: Irfan Khan  @date	: 18-Nov-2016  @reason	: to get Test List from payment details
	public List<ProFeesDTO> proFeesFetchTestList(
			int doctorId, String serviceType);
	
	public List<ExpenseVoucherGroup> fetchVoucher(String voucherType,
			String searhFlag, String searchText);

	public int FetchVoucherID(String voucherType);

	public List<ExpenseVoucherGroup> fetchVoucherList(String voucherType);

	public int updateVoucher(int userid, ExpenseVoucherGroup objState, String queryType,
			String voucherType);
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: Fetching Next Voucher ID 
	public int fetchVoucherID();
	
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: Fetching all Vouchers 
	public List<GeneralVoucherDTO> fetchVouchers(String actionFlag,String searchText);
	
	// @author: Vinod Udawant   @date: 24-Nov-2016   @codeFor: save/update/delete Voucher 
	public int saveVoucherDetails(GeneralVoucherDTO obj, String queryType);

	public boolean deleteVoucher(int userid, String voucherid,
			String voucherType);

	public List<ExpenseVoucherGroup> searchVoucher(String strValue,
			String voucherType);

	public int FetchLedgerHeadID(String ledgerHeadType);

	public List<LedgerHead> fetchLedgerHead(String ledgerHeadType,
			String searhFlag, String searchText);

	public int UpdateLedgerHead(int userid, LedgerHead objHead, String queryType,
			String ledgerHeadType);

	public boolean deleteLedgerHead(int userid, String lhid,
			String ledgerHeadType);

	public List<LedgerHead> searchLedgerHead(String strValue,
			String ledgerHeadType);

	// @author	: Irfan Khan  @date	: 22-Nov-2016  @reason	: to save voucher list
	public int proFeesSaveVoucherList(String[] voucherList,String[] vocherDetails,int userid);
	
	// @author	: Irfan Khan  @date	: 23-Nov-2016  @reason	: to fetch all generated vouchers 
	public List<ProFeesVoucherDTO> proFeesFetchAllGeneratedVouchers(
			String callFrom, String voucherNo);

	public List<LedgerHead> setLedgerHeadUtil(String str, String ledgerHeadType);

	// @author	: Irfan Khan  @date	: 23-Nov-2016  @reason	: view voucher details on model by ID
	public ProFeesVoucherDTO proFeesViewVoucherDetailsById(
			String callFrom, int id);

	public List<LedgerHead> selLedgerHeadUtil(String str, String ledgerHeadType);
	
	// @author	: Irfan Khan  @date	: 24-Nov-2016  @reason	: to cancel the generated voucher
	public int proFeesCancelGenratedVoucher(int id, String narration, int userid);
	
	// @author	: Irfan Khan  @date	: 25-Nov-2016  @reason	: to fetch reports
	public List<ProFeesDTO> proFeesfetchReports(String callFrom,String fromDate,String toDate,int doctorId, String serviceType) ;

	// @author	: Irfan Khan  @date	: 30-Nov-2016  @reason	: business summary report by doctors
	public List<ProFeesDTO> proFeesBusinessReport(String callFrom,String fromDate,String toDate,String doctorName);
		
	// @author	: Irfan Khan  @date	: 5-Dec-2016  @reason	: business summary report for hospital
	public List<ProFeesDTO> proFeesBusinessReportHosp(String callFrom,String fromDate,String toDate);	
		
	//Irfan khan test hallwise charges
	public List<PhysiotherapyTestDTO> fetchPhysiotherapyTest(String searhFlag,
			String searchText);
	public List<OtherServicesDTO>fetchOtherServices(String searhFlag,
			String searchText);
	public int savePhysiotherapyTestHallWiseCharges(PhysiotherapyTestDTO objtestchrg,
			String pageType, String sid);
	public int saveOSHWCharges(OtherServicesDTO objtestchrg,
			String pageType, String sid);
	
	// @author	: Irfan Khan  @date	: 14-Dec-2016  @reason	: save vital heading
	public int saveVitalHeading(VitalSing vs, String queryType);
	
	// @author	: Irfan Khan  @date	: 14-Dec-2016  @reason	: Fetch vital heading
	public List<VitalSing> fetchVitalHeading();
	
	// @author	: Irfan Khan  @date	: 14-Dec-2016  @reason	: Delete vital heading
	public boolean deleteVitalHeading(int vhid);
	
	// @author	: Irfan Khan  @date	: 20-Dec-2016  @reason	: fetch template details
	public List<SurgicalKitMaster> fetchTemplateTopicList(String pageName);
	
	
	// @author	: Irfan Khan  @date	: 20-Dec-2016  @reason	: save template details
	public int saveTemplate(SurgicalKitComp objSurgicalKitComp,
			String tempName, String idTempMast, String queryTyp, String pageType);
	
	// @author : Irfan Khan @date : 21-Dec-2016 @reason : Delete template details
	public int deleteTempTopic(int idTempTopic);

		public List<QuestionMaster> FetchQueList(String byName, String type);

		public int MaxIDofQueList();

		public boolean DeleteQueList(String queID, int userid);

		public int InsertQue(QuestionMaster objquestionMaster, QuestionMaster objList, String queryType, int userid);

		public int MaxIDofhraList();

		public int InsertHRA(HraTypeMaster objList, String queryType, int userid);

		public List<HraTypeMaster> FetchhraList(String byName, String type);

		public boolean DeletehraList(String hraID, int userid);

		public List<HraTypeMaster> getHRAQue(String hraId, String pid, String tomid);

		public int savePatientQueAns(JSONArray jsonArray,
				int hraid, int pid, int tomid, int userid);

		// @author : Irfan Khan @date : 4-Jan-2017 @reason : to fetch number of prints
		public int generalAccessNumOfPrint(int printId);
		// @author : Tushar @date : 16-Jan-2017 @reason : to fetch Hall Name List
		public List<Hall> FetchHallNameList(String htype);

		public List<Doctor> fetchListOfSurgeons(String type);
		
		// @author : Irfan Khan @date : 20-Feb-2017 @reason : to fetch number of prints
		public int prevPendingPaymentNumOfPrint(int printId);
		
		// @author: Irfan Khan   @date: 24-Mar-2016   @codeFor: fetch fetchPharmaCategoryMasterDetails
		public List<PharmaCategoryDTO> fetchPharmaCategoryMaster();
		
		// @author: Irfan Khan   @date: 24-Mar-2016   @codeFor: save PharmaCategoryMasterDetails
		public int saveSponsorCategory(PharmaCategoryDTO objDTO,int userId,String[] scList,String queryType, int midHidden);
		
		// @author: Manisha   @date: 25-Mar-2016   @codeFor: fetch fetchSponsorCategoryMaster
		public List<PharmaCategoryDTO> fetchSponsorCategoryMaster(String PatientType);

		// @author: irfan klhan   @date: 28-Mar-2016   @codeFor: Fetching cat master list
		public List<PharmaCategoryDTO> fetchCatMasterList(String callFrom,String catName);
		
		// @author: irfan klhan   @date: 28-Mar-2016   @codeFor: set cat master list
		public List<PharmaCategoryDTO> setCatMasterDetails(int mid);
		
		// @author: irfan klhan   @date: 28-Mar-2016   @codeFor: set cat slave list
		public List<PharmaCategoryDTO> setCatSlaveDetails(int mid);
		
		// @author: irfan klhan   @date: 29-Mar-2016   @codeFor: delete cat master
		public boolean deleteCatMasterUtil(int userId,int mid);
		
		// @author: Manisha  @date: 19-Apr-2017   @codeFor: CompanySponsor
		public List<SponsoredDetailsDTO> fetchSponsoredCompanyDetailsList(String strValue,
				String type);
		// @author: Tushar   @date: 2-May-2017   @codeFor: fetch tom ID for OT Notes
				public List<TreatmentOperations> FetchOperationsData(String pid,String tid);
		
		// @author: Manisha  @date: 21-Apr-2017   @codeFor: SponsorPolicy
		public List<SponsoredDetailsDTO> fetchSponsoredPolicyDetailsList(String strValue,
						String type);
		
		public List<SubServiceDto> fetchAllEhatHalls();
		public List<HallType> fetchMappedHallType(int id);

		public int getdepid(int trid);

		public List<QuestionMaster> FetchEMRTemplate(int pId, int treatId,
				int emrId);

		public int SaveComplaintFinding(int userId,
				ComplaintMaster objComplaintMaster, int pId, int treatId,
				String type, String queryType);

		public List<QuestionMaster> FetchEMRAssignedCompFind(int pId,
				int treatId, int emrId);

		public List<QuestionMaster> FetchAssignedFindings(int pId, int treatId);

		public List<QuestionMaster> FetchTemplateData(int idTemplate,
				int docSpecId, int bodyPartId, int pId, int treatId, int emrId);

		public int savePatientEmrQueAns(JSONArray jsonArray, int emrId,
				int pId, int treatId, int userid);

		public List<Doctor> getDoctorsDetails(int IdPathologist);
		
		public List<Doctor> getDoctorsDepDetails(int IdPathologist);

		public int setPrevSubObjToCurrent(int userId, int patId, int prev,
				int current);

		public int setPrevComplaintFindingToCurrent(int userId, int patId,
				int prev, int current);

		public int setPrevAssessmentToCurrent(int userId, int patId, int prev,
				int current);

		public int setPrevPresciptionToCurrent(int userId, int patId, int prev,
				int current);

		public int setPrevInstructionToCurrent(int userId, int patId, int prev,
				int current);

		public int setPrevIndividualInstructionToCurrent(int userId, int patId,
				int prev, int current);

		public int setPrevSurgeryAdviceToCurrent(int userId, int patId,
				int prev, int current);
		public int setPrevHistoryToCurrent(int userId, int patId,
				int prev, int current);


		public int setPrevRadiotherapyToCurrent(int userId, int patId,
				int prev, int current);

		public int setPrevChemotherapyToCurrent(int userId, int patId,
				int prev, int current);

		public int setPrevDocumentsToCurrent(int userId, int patId, int prev,
				int current);

		public int setPrevOrderFormToCurrentIPD(int userId, int patId,
				int prev, int current);
		
		public int setPrevClinicalEvaluationOPD(int userId, int patId,
				int prev, int current);

		public int setPrevPresciptionToCurrentOPDtoIPD(int userId, int patId, int prev,
				int current);
		
		public int setPrevDietOPDtoOPDAndIPD(int userId, int patId, int prev,
				int current);
		
		public int setPrevPresciptionToCurrentOPD(int userId, int patId,
				int prev, int current);

	}
