package com.hms.ot.dao;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.admin.util.HraTypeMaster;
import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.administrator.dto.OTGroup;
import com.hms.administrator.dto.OperationChargehallwiseAdmin;
import com.hms.dto.Assessment;
import com.hms.dto.ChartReport;
import com.hms.dto.Doctor;
import com.hms.dto.OperationChargehallwise;
import com.hms.dto.Patient;
import com.hms.dto.Users;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ot.dto.ConductAnaesthesia;
import com.hms.ot.dto.OTCheckList;
import com.hms.ot.dto.OTDescription;
import com.hms.ot.dto.OTNotesFetchOperationDto;
import com.hms.ot.dto.OTType;
import com.hms.ot.dto.Operation;
import com.hms.ot.dto.OperationDocTbl;
import com.hms.ot.dto.OperationTeam;
import com.hms.ot.dto.OperationTypeTbl;
import com.hms.ot.dto.PreAnaesthetic;
import com.hms.ot.dto.PreOpPrep;
import com.hms.ot.dto.SurgicalKitMaster;
import com.hms.ot.dto.TreatmentOperations;
import com.hms.ot.dto.UploadOTDocuments;

public interface OperationThDao {

	List<OperationTypeTbl> fetchPTName();

	List<OTGroup> fetchGroupDetails();

	List<OTType> fetchOTName();

	List<Operation> fetchOperationName(String opType, String department);

	List<OperationTeam> fetchOperationTeamList(String searchQuery, String callFrom);

	List<Operation> fetchOperation();

	int newOperationID();

	String saveOTGroupDetails(OTGroup obj);

	List<OTGroup> searchGroupDetails(String searchText, String searhFlag);

	String saveOTDetails(OTType obj);

	List<OTType> searchOTDetails(String strValue);

	List<OTCheckList> fetchCheckList(String byName, String type);

	int maxIDofList();

	String insertCheckList(OTCheckList obj);

	String deleteChkList(int txtListID);

	List<SurgicalKitMaster> fetchTempTopicList(String pageName);

	String saveTemplate(SurgicalKitMaster obj);

	List<String> manageOperationPatient(String findingName, String autoType);

	List<Doctor> setAutoCompleteForDoctorName(String findingName, String usertype);

	List<Users> fetchUser(String callFrom, String byName);

	List<String> getUserNameFromType(String type, String letter);

	List<Patient> displayOperationPat(String otDate, String page_name, String searchBy, String value);

	List<OperationTypeTbl> searchPT(String strValue);

	String saveEditOperationTeam(OperationTeam obj);

	String SaveOperationDetails(Operation obj, String queryType);

	List<Operation> searchOperation(String strValue);

	String scheduleOperation(TreatmentOperations obj, String queryType);

	List<OperationDocTbl> fetchOperationDocList(Integer tomId);

	List<PreOpPrep> fetchPreOpPre(Integer tomId);

	List<UploadOTDocuments> fetchOTDoc(Integer tomId, Integer patId);

	List<OTDescription> fetchOTDescription(Integer tomId);

	String addDocNameToList1(OperationDocTbl obj);

	String deleteDocRecord(OperationDocTbl obj);

	String absentDoc(OperationDocTbl obj);

	String confirmDoc(OperationDocTbl obj, Integer userId);

	String arrivalDoc(OperationDocTbl obj, Integer userId);

	String savePreOpPrep(String popString, PreOpPrep objdrr, Integer userid);

	String saveOTDescription(Integer tomId, String descr, Integer userid);

	String saveOTDocument(MultipartFile[] uploadfiles,Integer userid, Integer patId, Integer tomId, String filePath, String note, Date date);

	String delOTDocument(Integer hr, Integer patId, Integer userid);

	List<Assessment> fetchAssessment(Integer treatmentId);

	CustomizeTemplate fetchCustomizeTemplateList(Integer departmentid,String selectTemplateType);

	List<HraTypeMaster> fetchhraList(String byName, String type);

	String saveAssessmentOpd(Assessment objAssessment);

	String deleteAssessment(Integer diagnoslaveid);

	List<String> fetchUserList(String letter);

	String saveOTNotesData(EhatOTOperationNotes obj);
	
	List<EhatOTOperationNotes> fetchOTNotesData(int tomId);

	String deleteOperation(Integer opId, Integer treatId);
	
	List<OperationChargehallwiseAdmin> featchGrpCatWiseProCharge(OperationChargehallwise operationchargehallwise);
	
	List<ChargesMasterSlave> fetchHallTypeProchargeOpration();

	Integer saveGroupCatWiseproCharges(String opcharge);

	List<RegTreBillDto> fetchPateintNameAutosugg(String patientName, String typeOfpatient);

	String removePreOpPrep(PreOpPrep objPreOpPrep);

	String scheduleMangeOperation(TreatmentOperations obj);
	
	String savePreAnaestheticDetails(PreAnaesthetic preAnaesthetic);
	
	public List<PreAnaesthetic> fetchPreAnaestheticReport(String tretID,String anaesID);
	
	ChartReport defaultOTVitalsView(String cType,String tomId,String tretId,String defaultDate);

	public String masterDeleteOperation(int oid);
	
	List<TreatmentOperations> fetchOTDetailsbyTreatmentId(Integer treatId);
	
	public List<Patient> displayOpeSummary(String trid,Integer startIndex);
	
	public List<Patient> showSearchOperSum1(String searchBy, String patient_ID,
			String pageName, String fdate, String todate, int surganname, int surgerytype);
	
	public int saveOTVitals(ChartReport objChart, Integer userId, String type ,String tomId,String tid);
	
	CustomizeTemplate fetchCustomizeTemplateListByDeptId(Integer departmentid);
	
	String deleteOperationTeamList(Integer teamId);
	
	public List<ConductAnaesthesia> fetchAddConductAnaesthesia(String tretID,String anaesID);
	
	OperationTeam fetchTeambyId(Integer teamId);
	
	List<PreAnaesthetic> fetchAnaestheticDetails(String treatmentID);

	List<ChargesMasterSlave> getSubChargesById(Integer masterId, Integer selfId);

	ChargesMasterDto fetchServiceListCom(HttpServletRequest request);
	
	ChartReport defaultOTVitalsView2(String cType,String tomId,String tretId,String defaultDate);

	List<Doctor> getPatientOperationDoctors(int operationManageId);

	Integer getPrevOperationCount();
	
	OTNotesFetchOperationDto getOtNotesDataByOtId(int otNotesId, String callFrom);

}
