package com.hms.model;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

//import org.springframework.getContext().ApplicationContext;
//import org.springframework.getContext().support.ClassPathXmlApplicationContext;

import com.hms.dao.AdminDAO;
import com.hms.dao.PathologyDAO;
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
import com.hms.dto.TreatmentTests;
import com.hms.dto.haemodialysis_flow_chart_component;
import com.hms.dto.pathologistDto;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.ehat.dto.LabTestResultViewDto;
import com.hms.utility.ApplicationContextUtils;

@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class PathologyModel extends AbstractModel {

	/*
	 * ApplicationContext getContext() = new ClassPathXmlApplicationContext(
	 * "Spring-Pathology.xml");
	 */

//	ApplicationContext getContext() = ApplicationContextUtils
//			.getApplicationContext();

	public List<Labpatienttype> getLabPatTypes(String strValue, String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labpatienttype> arrDefaultUser = pathologyDAO.getLabPatTypes(
				strValue, type);

		return arrDefaultUser;
	}

	public int saveLabPatTypes(Labpatienttype objLabpatienttype,
			String queryType) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveLabPatTypes(objLabpatienttype,
				queryType);
		return isInserted;
	}

	public boolean deleteLabPatTypes(int intidgr) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.deleteLabPatTypes(intidgr);
		return isInserted;
	}

	public List<Labdocchargestype> getDocChargeTypes(String strValue,
			String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labdocchargestype> arrDefaultUser = pathologyDAO
				.getDocChargeTypes(strValue, type);

		return arrDefaultUser;
	}

	public int saveDocChargeTypes(Labdocchargestype objLabdocchargestype,
			String queryType) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveDocChargeTypes(objLabdocchargestype,
				queryType);
		return isInserted;
	}

	public boolean deleteDocChargeTypes(int intidgr) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.deleteDocChargeTypes(intidgr);
		return isInserted;
	}

	public List<Laborgans> getLabOrgans(String strValue, String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Laborgans> arrDefaultUser = pathologyDAO.getLabOrgans(strValue,
				type);

		return arrDefaultUser;
	}

	public boolean saveaveLabOrgans(Laborgans objLaborgans, String queryType) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveaveLabOrgans(objLaborgans,
				queryType);
		return isInserted;
	}

	public boolean deleteLabOrgans(int intidgr) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.deleteLabOrgans(intidgr);
		return isInserted;
	}

	public List<LabTest> featchTeastUnderHeading(String headingId) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTest> arrDefaultUser = pathologyDAO
				.featchTeastUnderHeading(headingId);
		return arrDefaultUser;
	}

	public List<LabProfile> getProfiles(String strValue, String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabProfile> arrDefaultUser = pathologyDAO.getProfiles(strValue,
				type);

		return arrDefaultUser;
	}

	public int saveLabProfile(LabProfile objLabProfile, String queryType,
			String testLi) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveLabProfile(objLabProfile, queryType,
				testLi);
		return isInserted;
	}

	public boolean deleteLabProfiles(int intidgr, String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.deleteLabProfiles(intidgr, type);
		return isInserted;
	}

	/*************** Start Nitin *********************************************/
	public int saveGroups(Labheadings objLabheadings, String queryType) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveGroups(objLabheadings, queryType);
		return isInserted;
	}

	public List<Labheadings> getGroups(String strValue, String type,
			int headingId) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labheadings> arrDefaultUser = pathologyDAO.getGroups(strValue,
				type, headingId);

		return arrDefaultUser;
	}

	public int getGroupID() {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.getGroupID();
		return isInserted;

	}

	public boolean deleteGroups(int intidgr) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.deleteGroups(intidgr);
		return isInserted;
	}

	public List<LabTestgroups> getTestDashboard(String strValue) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTestgroups> arrDefaultUser = pathologyDAO
				.getTestDashboard(strValue);

		return arrDefaultUser;
	}

	/*************** End Nitin *********************************************/

	/**************** Start Sagar ****************************/
	public boolean saveOwnLabDetails(LabMainlab objLabMainlab, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveOwnLabDetails(objLabMainlab,
				queryType);
		return isInserted;
	}

	public List<LabMainlab> fetchOwnLabDetails() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabMainlab> arrLabMainlab = pathologyDAO.fetchOwnLabDetails();
		return arrLabMainlab;
	}

	public int fetchLabId() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int lid = pathologyDAO.fetchLabId();
		return lid;
	}

	public boolean saveSubLabDetails(LabSublabs objLabSublabs, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveSubLabDetails(objLabSublabs,
				queryType);
		return isInserted;
	}

	public List<LabSublabs> fetchSubLabDetails() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabSublabs> arrLabSublabs = pathologyDAO.fetchSubLabDetails();
		return arrLabSublabs;
	}

	public boolean deleteSublabs(int intSublid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteSublabs(intSublid);
		return isDeleted;
	}

	public int fetchSubTestId() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int subTestid = pathologyDAO.fetchSubTestId();
		return subTestid;
	}

	public List<LabTests> getTestForGroupId(String grpid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTests> arrLabTests = pathologyDAO.getTestForGroupId(grpid);

		return arrLabTests;
	}

	public boolean saveSubTestDetails(LabSubtest objlLabSubtest,
			String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveSubTestDetails(objlLabSubtest,
				queryType);
		return isInserted;
	}

	public List<LabSubtest> fetchSubTestDetails(String strValue) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabSubtest> arrLabSubtest = pathologyDAO
				.fetchSubTestDetails(strValue);
		return arrLabSubtest;
	}

	public boolean deleteSubTest(int intSubTestId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteSubTest(intSubTestId);
		return isDeleted;
	}

	public int fetchTestId() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int testId = pathologyDAO.fetchTestId();
		return testId;
	}

	public boolean saveTestDetails(LabTests objLabTests, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveTestDetails(objLabTests,
				queryType);
		return isInserted;
	}

	public boolean deletePathologyTest(int intTestId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deletePathologyTest(intTestId);
		return isDeleted;
	}

	public boolean savePatientAssignedTests(
			LabPatienttestsMaster objLabPatienttestsMaster,
			LabTestgroups objLabTestgroups, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.savePatientAssignedTests(
				objLabPatienttestsMaster, objLabTestgroups, queryType);
		return isInserted;
	}

	public List<LabPatienttestsMaster> fetchPatientAssignedTest() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabPatienttestsMaster> arrLabPatienttestsMaster = pathologyDAO
				.fetchPatientAssignedTest();
		return arrLabPatienttestsMaster;
	}

	public List<Patient> fetchRegPatientsForPathalogyTests(String pageName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List arrSearchPat = pathologyDAO
				.fetchRegPatientsForPathalogyTests(pageName);

		return arrSearchPat;
	}

	public List<Patient> searchRegPatientsForPathologyTest(String searchBy,
			String strValue, String pageName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List arrSearchPat = pathologyDAO.searchRegPatientsForPathologyTest(
				searchBy, strValue, pageName);

		return arrSearchPat;
	}

	public boolean savePatientTestsRoutine(
			LabPatienttestsMaster objLabPatienttestsMaster,
			LabPatientSubtestsSlave objLabPatientSubtestsSlave) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.savePatientTestsRoutine(
				objLabPatienttestsMaster, objLabPatientSubtestsSlave);
		return isInserted;
	}

	public boolean removeAssignedTest(String[] slaveIds) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.removeAssignedTest(slaveIds);
		return isDeleted;
	}

	public List<LabPatienttestsMaster> searchPatientAssignedTest(
			String searchBy, String strValue) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabPatienttestsMaster> arrLabPatienttestsMaster = pathologyDAO
				.searchPatientAssignedTest(searchBy, strValue);
		return arrLabPatienttestsMaster;
	}

	public boolean saveRadiologyfileDetails(
			RadiologyFileComponent objRadiologyFileComponent, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveRadiologyfileDetails(
				objRadiologyFileComponent, queryType);
		return isInserted;
	}

	public List<RadiologyFileMaster> fetchRadiologyFiles(String type,
			String searchBy, String value) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<RadiologyFileMaster> arrRadiologyFileMaster = pathologyDAO
				.fetchRadiologyFiles(type, searchBy, value);
		return arrRadiologyFileMaster;
	}

	public boolean removeRadiologyUploadFiles(String[] fileComponentIds) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO
				.removeRadiologyUploadFiles(fileComponentIds);
		return isDeleted;
	}

	public boolean SaveRadiologyAssignedTests(Test objtest, int userid,
			String queryType, String trId, String totalAmt,
			RadiologyFileMaster objradiotest, String ipdOPd, int hallid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO
				.SaveRadiologyAssignedTests(objtest, userid, queryType, trId,
						totalAmt, objradiotest, ipdOPd, hallid);
		return isInserted;

	}

	public boolean SaveCardiologyAssignedTests(Test objtest, int userid,
			String queryType, String trId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.SaveCardiologyAssignedTests(objtest,
				userid, queryType, trId);
		return isInserted;

	}

	public List<Patient> FetchCardiologyTestsUtil(String callFor,
			String searchBy, String value) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Patient> arrRadiologyFileMaster = pathologyDAO
				.fetchCardiologyTests(callFor, searchBy, value);
		return arrRadiologyFileMaster;
	}

	public String SaveUnitType(LabUnitType objunit, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.SaveUnitType(objunit, queryType);
		return msg;
	}

	public List<LabUnitType> FetchUnitType(String callFrom, String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabUnitType> arrLabUnitType = pathologyDAO.FetchUnitTypes(
				callFrom, byName);
		return arrLabUnitType;
	}

	public boolean deleteUitType(int unitid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteUitType(unitid);
		return isDeleted;
	}

	public String SaveTestMethod(LabTestMethod objtestmethod, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.SaveTestMethod(objtestmethod, queryType);
		return msg;
	}

	public List<LabTestMethod> FetchTestMethod(String fetchType, String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTestMethod> arrLabTestMethod = pathologyDAO.FetchTestMethod(
				fetchType, byName);
		return arrLabTestMethod;
	}

	public boolean deleteTestmethod(int methodId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteTestmethod(methodId);
		return isDeleted;
	}

	public String SaveTestSample(LabTestSample objtestsample, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.SaveTestSample(objtestsample, queryType);
		return msg;
	}

	public List<LabTestSample> FetchTestSample(String fetchType, String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTestSample> arrLabTestsample = pathologyDAO.FetchTestSample(
				fetchType, byName);
		return arrLabTestsample;
	}

	public boolean deleteTestSample(int sampleId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteTestSample(sampleId);
		return isDeleted;
	}

	public String saveDoctorTechnician(LabDoctorTechnician objdt,
			String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.saveDoctorTechnician(objdt, queryType);
		return msg;
	}

	public List<LabDoctorTechnician> fetchDoctechnician(String fetchType,
			String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabDoctorTechnician> arrfetchDoctechnician = pathologyDAO
				.fetchDoctechnician(fetchType, byName);
		return arrfetchDoctechnician;
	}

	public boolean deleteDocTechnician(int id) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteDocTechnician(id);
		return isDeleted;
	}

	public String saveCollectionCenter(LabCollectionCenter objcc,
			String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.saveCollectionCenter(objcc, queryType);
		return msg;
	}

	public List<LabCollectionCenter> fetchCollectionCenter(String fetchType,
			String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabCollectionCenter> arrLabCollectionCenter = pathologyDAO
				.fetchCollectionCenter(fetchType, byName);
		return arrLabCollectionCenter;
	}

	public boolean deleteCollectionCenter(int ccId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteCollectionCenter(ccId);
		return isDeleted;
	}

	public String saveLabTest(LabTest objtest,
			LabTestNormalValues objLabTestNormalValues,LabTestNormalValues objnewLabTestNVl, String general,
			String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String msg = pathologyDAO.saveLabTest(objtest, objLabTestNormalValues,objnewLabTestNVl,
				general, queryType);
		return msg;
	}

	public List<LabTest> fetchlabTest(String fetchType, String byName) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTest> arrLabTest = pathologyDAO.fetchlabTest(fetchType, byName);
		return arrLabTest;
	}

	public boolean deleteLabTest(int id) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteLabTest(id);
		return isDeleted;
	}

	public List<Labheadings> featchProAndTest(String idHed, String type,
			String hallid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labheadings> arrLabTest = pathologyDAO.featchProAndTest(idHed,
				type, hallid);
		return arrLabTest;
	}

	public LabTestResultViewDto getPatientTestDash(String strValue,
			String type,String barocde) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		LabTestResultViewDto arrLabTest = pathologyDAO.getPatientTestDash(
				strValue, type,barocde);
		return arrLabTest;
	}

	public List<LabProfile> ViewTestforResult(String testmasterId, String tretId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabProfile> arrLabTest = pathologyDAO.viewTestforResult(
				testmasterId, tretId);
		return arrLabTest;
	}

	public boolean savePatientTestsResult(String resultSet, LabPatient objp,
			LabTestResultMaster objltrm) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.savePatientTestsResult(resultSet,
				objp, objltrm);
		return isDeleted;
	}

	public boolean saveAssignTests(LabTestResultMaster objltrm,
			LabPatient objp, LabTestResult objTestResult,
			LabTestResult objProResult, LabTestResult objPkgResult,
			String queryType, int userid, String hallid,String labresultFlag,String callFrom) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean msg = pathologyDAO.saveAssignTests(objltrm, objp,
				objTestResult, objProResult, objPkgResult, queryType, userid,
				hallid,labresultFlag,callFrom);
		return msg;
	}

	/***************
	 * End Sagar
	 * 
	 * @param hallid
	 *********************************************/

	public List featchPrevLabTestOfPat(String treatmentId, String hallid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabProfile> arrLabTest = pathologyDAO.featchPrevLabTestOfPat(
				treatmentId, hallid);
		return arrLabTest;
	}

	public List<Labheadings> GetsearchPathologyTestDetails(String strValue) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labheadings> arrLabTest = pathologyDAO
				.GetsearchPathologyTestDetails(strValue);
		return arrLabTest;
	}

	public boolean saveDentalAssignServices(Test objtest, int userid,
			String queryType, String trId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveDentalAssignServices(objtest,
				userid, queryType, trId);
		return isInserted;

	}

	public List<Patient> fetchDentalServicesPat(String searchBy, String value,
			String type) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Patient> arrRadiologyFileMaster = pathologyDAO
				.fetchDentalServicesPat(searchBy, value, type);
		return arrRadiologyFileMaster;
	}

	public boolean saveCausalityAssignServices(Test objtest, int userid,
			String queryType, String trId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isInserted = pathologyDAO.saveCausalityAssignServices(objtest,
				userid, queryType, trId);
		return isInserted;

	}

	public List<Patient> fetchCasualtyServicesPat(String searchBy,
			String value, String type) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Patient> arrRadiologyFileMaster = pathologyDAO
				.fetchCasualtyServicesPat(searchBy, value, type);
		return arrRadiologyFileMaster;
	}

	public List<Labheadings> searchProAndTest(String idHed, String strValue,
			String type, String hallid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Labheadings> arrLabTest = pathologyDAO.searchProAndTest(idHed,
				strValue, type, hallid);
		return arrLabTest;
	}

	public boolean saveLabFormula(LabFormula objLF) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean msg = pathologyDAO.saveLabFormula(objLF);
		return msg;
	}

	public List<LabFormula> featchLabFormulas(String serchTxt, String serchTyp) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabFormula> arrLabFormula = pathologyDAO.featchLabFormulas(
				serchTxt, serchTyp);
		return arrLabFormula;
	}

	public boolean deleteLabFormula(String labFormId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean msg = pathologyDAO.deleteLabFormula(labFormId);
		return msg;
	}

	public int SaveReport(
			HaemodialysisFlowChartMaster objHaemodialysisFlowChartMaster,
			haemodialysis_flow_chart_component objhaemodialysis_flow_chart_component,
			String queryType) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.SaveReport(
				objHaemodialysisFlowChartMaster,
				objhaemodialysis_flow_chart_component, queryType);
		return isInserted;
	}

	public List<HaemodialysisFlowChartMaster> fetchReport(String tretID) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");

		List<HaemodialysisFlowChartMaster> HaemodialysisFlowChartMasterList = pathologyDAO
				.fetchFormReport(tretID);

		return HaemodialysisFlowChartMasterList;
	}

	public boolean deleteFormDetail(String allVals) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");

		boolean issaved = pathologyDAO.deleteFormDetail(allVals);
		return true;
	}

	public boolean savePackages(LabPkg objLabPkgfin, String queryType) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean msg = pathologyDAO.savePackages(objLabPkgfin, queryType);
		return msg;
	}

	public List<LabPkg> getPackages(String strValue, String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabPkg> arrLabPkg = pathologyDAO.getPackages(strValue, type);

		return arrLabPkg;
	}

	public List<Patient> PatientDashboardForHaemodialysis(String strValue,
			String type) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Patient> arrLabTest = pathologyDAO
				.PatientDashboardForHaemodialysis(strValue, type);
		return arrLabTest;
	}

	public List<Test> getRadiologyTestBodyPart(String radiologyTestId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Test> arrradioTestbodyPart = pathologyDAO
				.getRadiologyTestBodyPart(radiologyTestId);
		return arrradioTestbodyPart;
	}

	public List GetpatientAllAssignedtest(String treatmentId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List arrAllTest = pathologyDAO.GetpatientAllAssignedtest(treatmentId);
		return arrAllTest;
	}

	public List<TestDashboard> fetchTestDashboard(String treatId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<TestDashboard> arr = pathologyDAO.fetchTestDashboard(treatId);
		return arr;
	}

	public List<TestDashboard> fetchAllRadiologyDetail(String TID) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<TestDashboard> arr = pathologyDAO.fetchAllRadiologyDetail(TID);
		return arr;
	}

	public List<TestDashboard> fetchtestrisdetails(String TestID) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<TestDashboard> arr = pathologyDAO.fetchtestrisdetails(TestID);
		return arr;
	}

	public List<Radiology> fetchRadioTest(String TID) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Radiology> arr = pathologyDAO.fetchRadioTest(TID);
		return arr;
	}

	public List<RadiollogyImage> fetchImageTest(String TID, String TestID, String invid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<RadiollogyImage> arr = pathologyDAO.fetchImageTest(TID, TestID,invid);
		return arr;
	}

	public List<RadioImageMaster> fetchRisImage(String tid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<RadioImageMaster> arr = pathologyDAO.fetchRisImage(tid);
		return arr;
	}

	public List<Test> setRadiologyDetails(String radiologyTestTypeId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Test> arr = pathologyDAO.setRadiologyDetails(radiologyTestTypeId);
		return arr;
	}

	public List<Test> SetInvestigationDetails(String radiologyTestTypeId) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Test> arr = pathologyDAO
				.SetInvestigationDetails(radiologyTestTypeId);
		return arr;
	}

	public List<Chanelling_doctor> fetchDoctorHospital() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<Chanelling_doctor> arrTest = pathologyDAO.fetchDoctorHospital();
		return arrTest;
	}

	public boolean saveCasualityAssignedTests(CasualtyTreatment casualService,
			String trId, String queryType, String pagetype, int userid) {
		boolean isInserted = false;
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		isInserted = pathologyDAO.saveCasualityAssignedTests(casualService,
				trId, queryType, pagetype, userid);
		return isInserted;
	}

	public String fetchCasualityTestNameById(int testId) {
		String testName = "";
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		testName = pathologyDAO.fetchCasualityTestNameById(testId);
		return testName;
	}

	// Author : nIKHIL; Date : 14/10/2014;
	public boolean deleteCPOE_Test(int CPOE_testId, String testType, int trId, int userid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		boolean isDeleted = pathologyDAO.deleteCPOE_Test(CPOE_testId, testType,
				trId,userid);

		return isDeleted;
	}

	public int SaveLabTestHallWiseCharges(LabTest objtestchrg, String pageType,
			String sid) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.SaveLabTestHallWiseCharges(objtestchrg,
				pageType, sid);

		return isInserted;
	}

	public int SaveLabProfileHallWiseCharges(LabProfile objprofilechrg) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO
				.SaveLabProfileHallWiseCharges(objprofilechrg);

		return isInserted;
	}

	public int SaveLabPackageHallWiseCharges(LabPkg objpkgchrg,
			String pageType, String sid) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.SaveLabPackageHallWiseCharges(objpkgchrg,
				pageType, sid);

		return isInserted;
	}

	public boolean savePhysiotherapyAssignedTests(
			CasualtyTreatment casualService, String trId, String queryType,
			String pagetype, int userid) {
		boolean isInserted = false;
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		isInserted = pathologyDAO.savePhysiotherapyAssignedTests(casualService,
				trId, queryType, pagetype, userid);
		return isInserted;
	}

	public boolean SaveOtherServicesAssignedTests(
			CasualtyTreatment casualService, String trId, String queryType,
			String pagetype, int userid) {
		boolean isInserted = false;
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		isInserted = pathologyDAO.SaveOtherServicesAssignedTests(casualService,
				trId, queryType, pagetype, userid);
		return isInserted;
	}

	
	public boolean saveDigitalSignatureImageDetail(HospitalDetails objDigSign)
	{
		boolean isInserted = false;
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		isInserted = pathologyDAO.saveDigitalSignatureImageDao(objDigSign);
		return isInserted;
	}
	public List<HospitalDetails> fetchOnLoadDigitalSignatureImageDetail() {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<HospitalDetails> arrTest = pathologyDAO.fetchOnLoadDigitalSignatureImageDetail();
		return arrTest;
	}
//CodeBy: Touheed Khan @codeDate:18-Feb-2016
	public String fetchLabResultData(String tid) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		String data = pathologyDAO.fetchLabResultData(tid);
		return data;
	}
	//CodeBy: Touheed Khan 
	public int postLabReportUtil(String labResultMasterid,String time, String date) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.postLabReportUtil(labResultMasterid,time,date);
		return isInserted;
	}

	public int saveEditorForResult(String idLabResult, String noteLab) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveEditorForResult(idLabResult,noteLab);
		return isInserted;
	}
	
	public List<LabProfileTestComp> fetchProfileTest(int pid) {

		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabProfileTestComp> arrTest = pathologyDAO.fetchProfileTest(pid);
		return arrTest;
	}

	public List<pathologistDto> fetchOnloadPathologistslist() {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<pathologistDto> pathoList = pathologyDAO.FetchOnloadPathologistslist();
		return pathoList;
	}

	public int discardLabReport(String labResultMasterid, String time,
			String date) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.discardLabReport(labResultMasterid,time,date);
		return isInserted;
	}

	public List<LabTestResultMaster> getPreviousTreatTest(String callFrom) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		List<LabTestResultMaster> arrLabTest = pathologyDAO.getPreviousTreatTest(callFrom);
		return arrLabTest;
	}

	/***********
	 * @author	: TouHeeD KhaN 
	 * @date	: 10-May-2016
	 * @reason	: for saving date and time to lab collected and accepted button
	 ***********/
	public int saveCollectionAndAccepted(String labTestResultMasterId,
			String smplDateTime, String btntype, String deptId, int userId) {
		
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		int isInserted = pathologyDAO.saveCollectionAndAccepted(labTestResultMasterId,smplDateTime,btntype,deptId,userId);
		return isInserted;
	}
	/************
	 *@author	: paras suryawanshi
	 *@date		:  23-Dec-2016
	 *@code		:Removerownvl
	 ***********/
	public String removenvlindLabTest(LabTestNormalValues objremoveLabTestNVl) {
		// TODO Auto-generated method stub
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
	String isRemove= pathologyDAO.removerownvl (objremoveLabTestNVl);
		return isRemove;
		
	}

	/************
	 *@author	: Laxman Nikam
	 * @param request 
	 *@date		:  02-Feb-2018
	 *@code		: Get Lab Result Patient Details
	 ***********/
	public LabResultMstViewDto getMstPatientTestDash(String strValue,
			String type, String barcode, HttpServletRequest request) {
		PathologyDAO pathologyDAO = (PathologyDAO) getContext()
				.getBean("pathologyDAO");
		LabResultMstViewDto arrLabTest = pathologyDAO.getMstPatientTestDash(strValue, type,barcode,request);
		return arrLabTest;
	}

	//Tushar Changes
		public String saveLabTestTemplate(LabTest objtest, String queryType) {

			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			String msg = pathologyDAO.saveLabTestTemplate(objtest, queryType);
			return msg;
		}
		
		//Tushar Changes
		public String UpdateLabTestTemplate(LabTest objTest) {

			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			String msg = pathologyDAO.UpdateLabTestTemplate(objTest);
			return msg;
		}
		public List<LabTest> fetchTestTemplateData(String idOfTest, String val) {
			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			List<LabTest> labPatientTemps = pathologyDAO.fetchTestTemplateData(idOfTest, val);
			return labPatientTemps;
		}
		public List<LabTest> fetchlabTestById(int id) {

			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			List<LabTest> arrLabTest = pathologyDAO.fetchlabTestById(id);
			return arrLabTest;
		}
		public List<LabTest> fetchPatientTestTemplate(String idResultTest) {
			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			List<LabTest> labPatientTemps = pathologyDAO.fetchPatientTestTemplate(
					idResultTest);
			return labPatientTemps;
		}
		public String savePatientTestTemplate(LabTest objTest, String queryType) {

			PathologyDAO pathologyDAO = (PathologyDAO) getContext()
					.getBean("pathologyDAO");
			String msg = pathologyDAO.savePatientTestTemplate(objTest, queryType);
			return msg;
		}

}