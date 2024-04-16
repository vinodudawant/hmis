package com.hms.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.CasualtyTreatment;
import com.hms.dto.Chanelling_doctor;
import com.hms.dto.HaemodialysisFlowChartMaster;
import com.hms.dto.HospitalDetails;
import com.hms.dto.LabCollectionCenter;
import com.hms.dto.LabDoctorTechnician;
import com.hms.dto.LabFormula;
import com.hms.dto.LabMainlab;
import com.hms.dto.LabPatient;
import com.hms.dto.LabPatientSubtestsSlave;
import com.hms.dto.LabPatienttestsMaster;
import com.hms.dto.LabPkg;
import com.hms.dto.LabProfile;
import com.hms.dto.LabProfileTestComp;
import com.hms.dto.LabSublabs;
import com.hms.dto.LabSubtest;
import com.hms.dto.LabTest;
import com.hms.dto.LabTestMethod;
import com.hms.dto.LabTestNormalValues;
import com.hms.dto.LabTestResult;
import com.hms.dto.LabTestResultMaster;
import com.hms.dto.LabTestSample;
import com.hms.dto.LabTestgroups;
import com.hms.dto.LabTests;
import com.hms.dto.LabUnitType;
import com.hms.dto.Labdocchargestype;
import com.hms.dto.Labheadings;
import com.hms.dto.Laborgans;
import com.hms.dto.Labpatienttype;
import com.hms.dto.Patient;
import com.hms.dto.RadioImageMaster;
import com.hms.dto.RadiollogyImage;
import com.hms.dto.Radiology;
import com.hms.dto.RadiologyFileComponent;
import com.hms.dto.RadiologyFileMaster;
import com.hms.dto.Test;
import com.hms.dto.TestDashboard;
import com.hms.dto.haemodialysis_flow_chart_component;
import com.hms.dto.pathologistDto;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.ehat.dto.LabTestResultViewDto;

@Transactional
public interface PathologyDAO {

	public List<Labpatienttype> getLabPatTypes(String strValue, String type);

	public int saveLabPatTypes(Labpatienttype objLabpatienttype,
			String queryType);

	public boolean deleteLabPatTypes(int intidgr);

	public List<Labdocchargestype> getDocChargeTypes(String strValue,
			String type);

	public int saveDocChargeTypes(Labdocchargestype objLabdocchargestype,
			String queryType);

	public boolean deleteDocChargeTypes(int intidgr);

	public List<Laborgans> getLabOrgans(String strValue, String type);

	public boolean saveaveLabOrgans(Laborgans objLaborgans, String queryType);

	public boolean deleteLabOrgans(int intidgr);

	public List<LabTest> featchTeastUnderHeading(String headingId);

	public List<LabProfile> getProfiles(String strValue, String type);

	public int saveLabProfile(LabProfile objLabProfile, String queryType,
			String testLi);

	public boolean deleteLabProfiles(int intidgr, String type);

	/***************
	 * Start Nitin
	 * 
	 * @param type
	 * @param headingId 
	 *********************************************/
	public List<Labheadings> getGroups(String strValue, String type, int headingId);

	public int saveGroups(Labheadings objLabheadings, String queryType);

	public int getGroupID();

	public boolean deleteGroups(int intidgr);

	public List<LabTestgroups> getTestDashboard(String strValue);

	/*************** End Nitin *********************************************/

	/*************** Start Sagar *******************************************/

	boolean saveOwnLabDetails(LabMainlab objLabMainlab, String queryType);

	public List<LabMainlab> fetchOwnLabDetails();

	public int fetchLabId();

	public boolean saveSubLabDetails(LabSublabs objLabSublabs, String queryType);

	public List<LabSublabs> fetchSubLabDetails();

	public boolean deleteSublabs(int intSublid);

	public int fetchSubTestId();

	public List<LabTests> getTestForGroupId(String grpid);

	public boolean saveSubTestDetails(LabSubtest objlLabSubtest,
			String queryType);

	public List<LabSubtest> fetchSubTestDetails(String strValue);

	public boolean deleteSubTest(int intSubTestId);

	public int fetchTestId();

	public boolean saveTestDetails(LabTests objLabTests, String queryType);

	public boolean deletePathologyTest(int intTestId);

	public boolean savePatientAssignedTests(
			LabPatienttestsMaster objLabPatienttestsMaster,
			LabTestgroups objLabTestgroups, String queryType);

	public List<LabPatienttestsMaster> fetchPatientAssignedTest();

	public List fetchRegPatientsForPathalogyTests(String pageName);

	public List searchRegPatientsForPathologyTest(String searchBy,
			String strValue, String pageName);

	public boolean savePatientTestsRoutine(
			LabPatienttestsMaster objLabPatienttestsMaster,
			LabPatientSubtestsSlave objLabPatientSubtestsSlave);

	public boolean removeAssignedTest(String[] slaveIds);

	public List<LabPatienttestsMaster> searchPatientAssignedTest(
			String searchBy, String strValue);

	public boolean saveRadiologyfileDetails(
			RadiologyFileComponent objRadiologyFileComponent, String queryType);

	public List<RadiologyFileMaster> fetchRadiologyFiles(String type,
			String searchBy, String value);

	public boolean removeRadiologyUploadFiles(String[] fileComponentIds);

	public boolean SaveRadiologyAssignedTests(Test objtest, int userid,
			String queryType, String trId, String totalAmt,
			RadiologyFileMaster objradiotest, String ipdOPd, int hallid );

	public boolean SaveCardiologyAssignedTests(Test objtest, int userid,
			String queryType, String trId);

	public List<Patient> fetchCardiologyTests(String callFor, String searchBy,
			String value);

	public String SaveUnitType(LabUnitType objunit, String queryType);

	public List<LabUnitType> FetchUnitTypes(String callFrom, String byName);

	public boolean deleteUitType(int unitid);

	public String SaveTestMethod(LabTestMethod objtestmethod, String queryType);

	public List<LabTestMethod> FetchTestMethod(String fetchType, String byName);

	public boolean deleteTestmethod(int methodId);

	public String SaveTestSample(LabTestSample objtestsample, String queryType);

	public List<LabTestSample> FetchTestSample(String fetchType, String byName);

	public boolean deleteTestSample(int sampleId);

	public String saveDoctorTechnician(LabDoctorTechnician objdt,
			String queryType);

	public List<LabDoctorTechnician> fetchDoctechnician(String fetchType,
			String byName);

	public boolean deleteDocTechnician(int id);

	public String saveCollectionCenter(LabCollectionCenter objcc,
			String queryType);

	public List<LabCollectionCenter> fetchCollectionCenter(String fetchType,
			String byName);

	public boolean deleteCollectionCenter(int ccId);

	public String saveLabTest(LabTest objtest,
			LabTestNormalValues objLabTestNormalValues,LabTestNormalValues objnewLabTestNVl,String general,
			String queryType);

	public List<LabTest> fetchlabTest(String fetchType, String byName);

	public boolean deleteLabTest(int id);

	public List<Labheadings> featchProAndTest(String idHed, String type, String hallid);

	public LabTestResultViewDto getPatientTestDash(String strValue,
			String type,String barcode);

	public List viewTestforResult(String testmasterId,String tretId);

	public boolean savePatientTestsResult(String resultSet, LabPatient objp,
			LabTestResultMaster objltrm);

	public boolean saveAssignTests(LabTestResultMaster objltrm,
			LabPatient objp, LabTestResult objTestResult,
			LabTestResult objProResult, LabTestResult objPkgResult,
			String queryType, int userid, String hallid,String labresultFlag,String callFrom);

	/*************** End Sagar 
	 * @param hallid *********************************************/

	public List<LabProfile> featchPrevLabTestOfPat(String treatmentId, String hallid);

	public List<Labheadings> GetsearchPathologyTestDetails(String strValue);

	public boolean saveDentalAssignServices(Test objtest, int userid,
			String queryType, String trId);

	public List<Patient> fetchDentalServicesPat(String searchBy, String value,
			String type);

	public boolean saveCausalityAssignServices(Test objtest, int userid,
			String queryType, String trId);

	public List<Patient> fetchCasualtyServicesPat(String searchBy,
			String value, String type);

	public List<Labheadings> searchProAndTest(String idHed, String strValue,
			String type, String hallid);

	public boolean saveLabFormula(LabFormula objLF);

	public List<LabFormula> featchLabFormulas(String serchTxt, String serchTyp);

	public boolean deleteLabFormula(String labFormId);

	public int SaveReport(
			HaemodialysisFlowChartMaster objHaemodialysisFlowChartMaster,
			haemodialysis_flow_chart_component objhaemodialysis_flow_chart_component,
			String queryType);

	public List<HaemodialysisFlowChartMaster> fetchFormReport(String tretID);

	public boolean deleteFormDetail(String allVals);

	public boolean savePackages(LabPkg objLabPkgfin, String queryType);

	public List<LabPkg> getPackages(String strValue, String type);

	public List<Patient> PatientDashboardForHaemodialysis(String strValue,
			String type);

	public List<Test> getRadiologyTestBodyPart(String radiologyTestId);

	public List GetpatientAllAssignedtest(String treatmentId);
	
	public List<TestDashboard> fetchTestDashboard(String treatId);
	
	public List<TestDashboard> fetchAllRadiologyDetail(String TID);
	
	public List<TestDashboard> fetchtestrisdetails(String TestID);
	
	public List<Radiology> fetchRadioTest(String TID);
	
	public List<RadiollogyImage> fetchImageTest(String TID, String TestID, String invid);
	
	public List<RadioImageMaster> fetchRisImage(String tid);

	public List<Test> setRadiologyDetails(String radiologyTestTypeId);

	public List<Test> SetInvestigationDetails(String radiologyTestTypeId);
	public List<Chanelling_doctor> fetchDoctorHospital();
	
	public boolean deleteCPOE_Test(int CPOE_testId, String testType, int trId, int userid);

	public boolean saveCasualityAssignedTests(CasualtyTreatment casualService,
			String trId, String queryType, String pagetype, int userid);

	public String fetchCasualityTestNameById(int testId);

	//Code by Kavita
	public int SaveLabTestHallWiseCharges(LabTest objtestchrg, String pageType, String sid);

	public int SaveLabProfileHallWiseCharges(LabProfile objprofilechrg);
	// End Code by Kavita

	public int SaveLabPackageHallWiseCharges(LabPkg objpkgchrg, String pageType, String sid);

	List<LabTest> featchTeastUnderHeading(String headingId,String type,String strValue, int hallid);

	public boolean savePhysiotherapyAssignedTests(
			CasualtyTreatment casualService, String trId, String queryType,
			String pagetype, int userid);

	public boolean SaveOtherServicesAssignedTests(
			CasualtyTreatment casualService, String trId, String queryType,
			String pagetype, int userid);

	public boolean saveDigitalSignatureImageDao(HospitalDetails objDigSign);
	
	public List<HospitalDetails> fetchOnLoadDigitalSignatureImageDetail();

	public String fetchLabResultData(String tid);

	public int postLabReportUtil(String labResultMasterid,String time,String date);

	public int saveEditorForResult(String idLabResult, String noteLab);

	public List<LabProfileTestComp> fetchProfileTest(int pid);

	public List<pathologistDto> FetchOnloadPathologistslist();

	public int discardLabReport(String labResultMasterid, String time,
			String date);

	public List<LabTestResultMaster> getPreviousTreatTest(String callFrom);
	
	// @author	: TouHeeD KhaN @date	: 10-May-2016 * @reason	: for saving date and time to lab collected and accepted button
	public int saveCollectionAndAccepted(String labTestResultMasterId,
			String smplDateTime, String btntype, String deptId, int userId);

	// @author	: Paras Suryawanshi @date	: 10-Jan-2017 * @reason	: Remove selected row nvl labtest
	
	public String removerownvl(LabTestNormalValues objremoveLabTestNVl);

	public LabResultMstViewDto getMstPatientTestDash(String strValue,
			String type, String barcode, HttpServletRequest request);

	public String saveLabTestTemplate(LabTest objtest, String queryType);

	public String UpdateLabTestTemplate(LabTest objTest);

	public List<LabTest> fetchTestTemplateData(String idOfTest, String val);

	public List<LabTest> fetchlabTestById(int id);
	
	public List<LabTest> fetchPatientTestTemplate(String idResultTest);
	
	public String savePatientTestTemplate(LabTest objTest, String queryType);
	
}
