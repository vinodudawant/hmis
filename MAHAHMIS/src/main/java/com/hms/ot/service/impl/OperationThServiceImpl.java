package com.hms.ot.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
//import org.json.JSONException;
//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
import com.hms.dto.PreAnaestheticRequest;
import com.hms.dto.Users;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ot.dao.OperationThDao;
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
import com.hms.ot.service.OperationThService;

@Service
//@Transactional
public class OperationThServiceImpl implements OperationThService {

	@Autowired
	OperationThDao otDao;

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public List<OperationTypeTbl> fetchPTName() {
		return otDao.fetchPTName();
	}

	@Override
	@Transactional
	public List<OTGroup> fetchGroupDetails() {
		return otDao.fetchGroupDetails();
	}

	@Override
	@Transactional
	public List<OTType> fetchOTName() {
		return otDao.fetchOTName();
	}

	@Override
	@Transactional
	public List<Operation> fetchOperationName(String opType, String department) {
		return  otDao.fetchOperationName(opType,department) ;
	}

	@Override
	@Transactional
	public List<OperationTeam> fetchOperationTeamList(String searchQuery, String callFrom) {
		return otDao.fetchOperationTeamList(searchQuery,callFrom);
	}

	@Override
	@Transactional
	public List<Operation> fetchOperation() {
		return otDao.fetchOperation();
	}

	@Override
	@Transactional
	public int newOperationID() {
		return otDao.newOperationID();
	}

	@Override
	@Transactional
	public String saveOTGroupDetails(OTGroup obj) {
		return otDao.saveOTGroupDetails(obj);
	}

	@Override
	@Transactional
	public List<OTGroup> searchGroupDetails(String searchText, String searhFlag) {
		return otDao.searchGroupDetails(searchText,searhFlag);
	}

	@Override
	@Transactional
	public String saveOTDetails(OTType obj) {
		return otDao.saveOTDetails(obj);
	}

	@Override
	@Transactional
	public List<OTType> searchOTDetails(String strValue) {
		return otDao.searchOTDetails(strValue);
	}

	@Override
	@Transactional
	public List<OTCheckList> fetchCheckList(String byName, String type) {
		return otDao.fetchCheckList(byName, type);
	}

	@Override
	@Transactional
	public int maxIDofList() {
		return otDao.maxIDofList();
	}

	@Override
	@Transactional
	public String insertCheckList(OTCheckList obj) {
		return otDao.insertCheckList(obj);
	}

	@Override
	@Transactional
	public String deleteChkList(int txtListID) {
		return otDao.deleteChkList(txtListID);
	}

	@Override
	@Transactional
	public List<SurgicalKitMaster> fetchTempTopicList(String pageName) {
		return otDao.fetchTempTopicList(pageName);
	}

	@Override
	@Transactional
	public String saveTemplate(SurgicalKitMaster obj) {
		return otDao.saveTemplate(obj);
	}

	@Override
	@Transactional
	public List<String> manageOperationPatient(String findingName, String autoType) {
		return  otDao.manageOperationPatient( findingName,  autoType);
	}

	@Override
	@Transactional
	public List<Doctor> setAutoCompleteForDoctorName(String findingName, String usertype) {
		return otDao.setAutoCompleteForDoctorName( findingName, usertype);
	}

	@Override
	@Transactional
	public List<Users> fetchUser(String callFrom, String byName) {
		return otDao.fetchUser(callFrom,byName);
	}

	@Override
	@Transactional
	public List<String> getUserNameFromType(String type, String letter) {
		return otDao.getUserNameFromType(type,letter);
	}

	@Override
	@Transactional
	public List<Patient> displayOperationPat(String otDate, String page_name, String searchBy, String value) {
		return otDao.displayOperationPat( otDate,  page_name,  searchBy,  value);
	}

	@Override
	@Transactional
	public List<OperationTypeTbl> searchPT(String strValue) {
		return otDao.searchPT(strValue);
	}

	@Override
	@Transactional
	public String saveEditOperationTeam(OperationTeam obj) {
		try {
			String msg = "";
			if (obj.getTeamId() == 0) {

				String sql = "select ifnull(count(idoperation_team_master),0) FROM operation_team_master otm WHERE otm.status = 'Y' AND otm.name = '"
						+ obj.getTeamName() + "' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number) refQuery.uniqueResult()).intValue();

				if (count == 0) {

					return otDao.saveEditOperationTeam(obj);
				} else {
					return msg = "Operation Team Name is Already Exist...";
				}
			} else {
				return otDao.saveEditOperationTeam(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Something went wrong..";
		}
	}	
		
		
		

	@Override
	@Transactional
	public String SaveOperationDetails(Operation obj,String queryType) {
		return otDao.SaveOperationDetails(obj,queryType);
	}

	@Override
	@Transactional
	public List<Operation> searchOperation(String strValue) {
		return otDao.searchOperation(strValue);
	}

	@Override
	@Transactional
	public String scheduleOperation(TreatmentOperations obj, String queryType) {
		return otDao.scheduleOperation(obj,queryType);
	}

	@Override
	@Transactional
	public List<OperationDocTbl> fetchOperationDocList(Integer tomId) {
		return otDao.fetchOperationDocList(tomId) ;
	}

	@Override
	@Transactional
	public List<PreOpPrep> fetchPreOpPre(Integer tomId) {
		return otDao.fetchPreOpPre( tomId);
	}

	@Override
	@Transactional
	public List<UploadOTDocuments> fetchOTDoc(Integer tomId, Integer patId) {
		return otDao.fetchOTDoc(tomId,patId);
	}

	@Override
	@Transactional
	public List<OTDescription> fetchOTDescription(Integer tomId) {
		return otDao.fetchOTDescription(tomId);
	}

	@Override
	@Transactional
	public String addDocNameToList1(OperationDocTbl obj) {
		return otDao.addDocNameToList1(obj);
	}

	@Override
	@Transactional
	public String deleteDocRecord(OperationDocTbl obj) {
		return otDao.deleteDocRecord(obj);
	}

	@Override
	@Transactional
	public String absentDoc(OperationDocTbl obj) {
		return otDao.absentDoc(obj);
	}

	@Override
	@Transactional
	public String confirmDoc(OperationDocTbl obj, Integer userId) {
		return otDao.confirmDoc(obj,userId);
	}

	@Override
	@Transactional
	public String arrivalDoc(OperationDocTbl obj, Integer userId) {
		return otDao.arrivalDoc(obj,userId);
	}

	@Override
	@Transactional
	public String savePreOpPrep(String popString, PreOpPrep objdrr, Integer userid) {
		return otDao.savePreOpPrep( popString,  objdrr,  userid);
	}

	@Override
	@Transactional
	public String saveOTDescription(Integer tomId, String descr, Integer userid) {
		return otDao.saveOTDescription( tomId,  descr,  userid);
	}

	@Override
	@Transactional
	public String saveOTDocument(MultipartFile[] uploadfiles,Integer userid, Integer patId, Integer tomId, String filePath, String note,
			Date date) {
		return otDao.saveOTDocument(uploadfiles,userid, patId, tomId, filePath, note, date);
	}

	@Override
	@Transactional
	public String delOTDocument(Integer hr, Integer patId, Integer userid) {
		return otDao.delOTDocument( hr,  patId,  userid);
	}

	@Override
	@Transactional
	public List<Assessment> fetchAssessment(Integer treatmentId) {
		return otDao.fetchAssessment( treatmentId); 
	}

	@Override
	@Transactional
	public CustomizeTemplate fetchCustomizeTemplateList(Integer departmentid , String selectTemplateType) {
		return otDao.fetchCustomizeTemplateList(departmentid,selectTemplateType); 
	}

	@Override
	@Transactional
	public List<HraTypeMaster> fetchhraList(String byName, String type) {
		 return otDao.fetchhraList(byName,type) ;
	}

	@Override
	@Transactional
	public String saveAssessmentOpd(Assessment objAssessment) {
		 return otDao.saveAssessmentOpd(objAssessment) ;
	}

	@Override
	@Transactional
	public String deleteAssessment(Integer diagnoslaveid) {
		return otDao.deleteAssessment(diagnoslaveid) ;
	}

	@Override
	@Transactional
	public List<String> fetchUserList(String letter) {
		return otDao.fetchUserList(letter);
	}

	@Override
	@Transactional
	public String saveOTNotesData(EhatOTOperationNotes obj) {
		return otDao.saveOTNotesData(obj);
	}
	
	@Override
	@Transactional
	public List<EhatOTOperationNotes> fetchOTNotesData(int tomId){
		return otDao.fetchOTNotesData(tomId);
	}

	@Override
	@Transactional
	public String deleteOperation(Integer opId, Integer treatId) {
		return otDao.deleteOperation(opId,treatId);
	}
	
	@Override
	@Transactional
	public List<OperationChargehallwiseAdmin> featchGrpCatWiseProCharge(
			OperationChargehallwise operationchargehallwise) {
		return otDao.featchGrpCatWiseProCharge(operationchargehallwise);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchHallTypeProchargeOpration() {
		return otDao.fetchHallTypeProchargeOpration();
	}

	@Override
	@Transactional
	public Integer saveGroupCatWiseproCharges(String opcharge) {
		return otDao.saveGroupCatWiseproCharges(opcharge);
	}

	@Override
	@Transactional
	public List<RegTreBillDto> fetchPateintNameAutosugg(String patientName, String typeOfpatient) {
		// TODO Auto-generated method stub
		return otDao.fetchPateintNameAutosugg(patientName,typeOfpatient);
	}
	
	@Override
	@Transactional
	public String removePreOpPrep(PreOpPrep objPreOpPrep) {
		
		return otDao.removePreOpPrep(objPreOpPrep);
	}

	@Override
	@Transactional
	public String scheduleMangeOperation(TreatmentOperations obj) {
		// TODO Auto-generated method stub
		return otDao.scheduleMangeOperation(obj);
	}
	
	@Override
	@Transactional
	public String savePreAnaestheticDetails(PreAnaestheticRequest preAnaestheticRequest) {
		
		PreAnaesthetic preAnaesthetic = new PreAnaesthetic();
		try {
			BeanUtils.copyProperties(preAnaesthetic, preAnaestheticRequest);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		String msg	= otDao.savePreAnaestheticDetails(preAnaesthetic);
		return msg;
	}
	
	@Override
	@Transactional
	public ChartReport defaultOTVitalsView(String cType,String tomId,String tretId,String defaultDate) {
		
		ChartReport chartReport =otDao.defaultOTVitalsView(cType,tomId,tretId,defaultDate);
		return chartReport;
	}

	@Override
	@Transactional
	public String masterDeleteOperation(int oid) {
		return otDao.masterDeleteOperation(oid);
	}

	@Override
	@Transactional
	public List<TreatmentOperations> fetchOTDetailsbyTreatmentId(Integer treatId) {
		// TODO Auto-generated method stub
		return otDao.fetchOTDetailsbyTreatmentId(treatId);
	}

	@Override
	@Transactional
	public List<Patient> displayOpeSummary(String trid,Integer startIndex) {
	
		return otDao.displayOpeSummary(trid,startIndex);
	}
	
	@Override
	@Transactional
	public List<Patient> showSearchOperSum1(String searchBy, String patient_ID,
			String pageName, String fdate, String todate, int surganname, int surgerytype) {
		
		return otDao.showSearchOperSum1(searchBy,patient_ID,pageName,fdate,todate,surganname,surgerytype);
	}

	@Override
	@Transactional
	public int saveOTVitals(ChartReport objChart, Integer userId, String type, String tomId, String tid) {
		
		return otDao.saveOTVitals(objChart, userId, type, tomId, tid);
	}
	
	@Override
	@Transactional
	public CustomizeTemplate fetchCustomizeTemplateListByDeptId(Integer departmentid) {
		return otDao.fetchCustomizeTemplateListByDeptId(departmentid); 
	}

	@Override
	@Transactional
	public String deleteOperationTeamList(Integer teamId) {
		return otDao.deleteOperationTeamList(teamId);
	}

	@Override
	@Transactional
	public OperationTeam fetchTeambyId(Integer teamId) {
		// TODO Auto-generated method stub
		return otDao.fetchTeambyId(teamId);
	}

	@Override
	@Transactional
	public List<ConductAnaesthesia> fetchAddConductAnaesthesia(String tretID,String anaesID) {
		List<ConductAnaesthesia> conductanaesthesiaList = otDao.fetchAddConductAnaesthesia(tretID,anaesID);
		return conductanaesthesiaList;
	}

	
	@Override
	@Transactional
	public List<PreAnaesthetic> fetchAnaestheticDetails(String treatmentID) {
		
		return otDao.fetchAnaestheticDetails(treatmentID);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> getSubChargesById(Integer masterId, Integer selfId) {
		
		return otDao.getSubChargesById( masterId,  selfId);
	}

	@Override
	public ChargesMasterDto fetchServiceListCom(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return otDao.fetchServiceListCom(request);
	}
	
	
	@Override
	@Transactional
	public Integer getPrevOperationCount() {
		// TODO Auto-generated method stub
		return otDao.getPrevOperationCount();
	}
	
	@Override
	public List<Doctor> getPatientOperationDoctors(int OperationManageId)
	{
		return otDao.getPatientOperationDoctors(OperationManageId);
	}
	
	@Override
	@Transactional
	public OTNotesFetchOperationDto getOtNotesDataByOtId(int otNotesId, String callFrom) {
		// TODO Auto-generated method stub
		return otDao.getOtNotesDataByOtId(otNotesId, callFrom);
	}
}
