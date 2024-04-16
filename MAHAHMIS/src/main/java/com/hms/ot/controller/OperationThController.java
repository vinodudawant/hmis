package com.hms.ot.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
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
import com.hms.patient.util.ConfigUIJSONUtility;

@RestController
@RequestMapping(value = "/otdata")
public class OperationThController {

	@Autowired
	OperationThService otService;
	
	@RequestMapping(value="/fetchPTName",method=RequestMethod.GET)
	@ResponseBody
	public OperationTypeTbl fetchPTName(){
		OperationTypeTbl obj=new OperationTypeTbl();
		List<OperationTypeTbl> list = otService.fetchPTName();
		obj.setListOperationType(list);
		return obj;
	}
	
	@RequestMapping(value="/SearchPT",method=RequestMethod.GET)
	@ResponseBody
	public OperationTypeTbl searchPT(@RequestParam("strValue") String strValue){
		OperationTypeTbl obj=new OperationTypeTbl();
		List<OperationTypeTbl> list = otService.searchPT(strValue);
		obj.setListOperationType(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchGroupDetails",method=RequestMethod.GET)
	@ResponseBody
	public OTGroup fetchGroupDetails(){
		OTGroup obj=new OTGroup();
		List<OTGroup> list = otService.fetchGroupDetails();
		obj.setOtGroupList(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchOTName",method=RequestMethod.GET)
	@ResponseBody
	public OTType fetchOTName(){
		OTType obj=new OTType();
		List<OTType> list = otService.fetchOTName();
		obj.setOtNameList(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchOperationName",method=RequestMethod.GET)
	@ResponseBody
	public Operation fetchOperationName(@RequestParam("opType") String opType,
			@RequestParam("department") String department){
		Operation obj=new Operation();
		List<Operation> list = otService.fetchOperationName(opType,department);
		obj.setOperationList(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchOperationTeamList",method=RequestMethod.GET)
	@ResponseBody
	public OperationTeam fetchOperationTeamList(@RequestParam("searchQuery") String searchQuery,
			@RequestParam("callFrom") String callFrom){
		OperationTeam obj=new OperationTeam();
		List<OperationTeam> list = otService.fetchOperationTeamList(searchQuery,callFrom);
		obj.setListTeam(list);
		return obj;
	}
	
	@RequestMapping(value = "/deleteOperationTeamList", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOperationTeamList( @RequestParam("teamId") Integer teamId) {
		String msg = otService.deleteOperationTeamList(teamId);
		return msg;
	}
	
	@RequestMapping(value="/fetchOperation",method=RequestMethod.GET)
	@ResponseBody
	public Operation fetchOperation(){
		Operation obj=new Operation();
		List<Operation> list = otService.fetchOperation();
		obj.setOperationList(list);
		return obj;
	}
	
	@RequestMapping(value="/newOperationID",method=RequestMethod.GET)
	@ResponseBody
	public int newOperationID(){
		int max = otService.newOperationID();
		return max;
	}
	
	@RequestMapping(value = "/saveOTGroupDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveOTGroupDetails(@RequestParam("groupId") int groupId, @RequestParam("queryType") String queryType,
			@RequestParam("grpName") String grpName,@RequestParam("selGrpType") String selGrpType) {
		OTGroup obj=new OTGroup();
		obj.setGroupName(grpName);
		obj.setIdGroupDetails(groupId);
		obj.setGroupType(selGrpType);
		String msg = otService.saveOTGroupDetails(obj);
		return msg;
	}
	
	@RequestMapping(value="/searchGroupDetails",method=RequestMethod.GET)
	@ResponseBody
	public OTGroup searchGroupDetails(@RequestParam("searchText") String searchText,@RequestParam("searhFlag") String searhFlag){
		OTGroup obj=new OTGroup();
		List<OTGroup> list = otService.searchGroupDetails(searchText,searhFlag);
		obj.setOtGroupList(list);
		return obj;
	}
	
	@RequestMapping(value = "/SaveOTDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveOTDetails(@RequestParam("OT_ID") int OTid, @RequestParam("OTname") String OTname,
			@RequestParam("OTcharge") String OTcharge,@RequestParam("color") String color) {
		OTType obj=new OTType();
		obj.setIdOT_name(OTid);
		obj.setOt_name(OTname);
		obj.setTheaterCharges(Float.parseFloat(OTcharge));
		obj.setColor(color);
		String msg = otService.saveOTDetails(obj);
		return msg;
	}
	
	@RequestMapping(value="/SearchOT",method=RequestMethod.GET)
	@ResponseBody
	public OTType searchOTDetails(@RequestParam("strValue") String strValue){
		OTType obj=new OTType();
		List<OTType> list = otService.searchOTDetails(strValue);
		obj.setOtNameList(list);
		return obj;
	}
	
	@RequestMapping(value="/FetchCheckList",method=RequestMethod.GET)
	@ResponseBody
	public OTCheckList fetchCheckList(@RequestParam("byName") String byName,
			@RequestParam("type") String type){
		OTCheckList obj=new OTCheckList();
		List<OTCheckList> list = otService.fetchCheckList(byName,type);
		obj.setLichk_access(list);
		return obj;
	}
	
	@RequestMapping(value="/MaxIDofList",method=RequestMethod.GET)
	@ResponseBody
	public int maxIDofList(){
		int max = otService.maxIDofList();
		return max;
	}
	
	@RequestMapping(value = "/InsertList", method = RequestMethod.POST)
	@ResponseBody
	public String insertCheckList(@RequestParam("txtListID") int txtListID, @RequestParam("txtCheckListName") String txtCheckListName,
			@RequestParam("txtRemark") String txtRemark,@RequestParam("queryType") String queryType) {
		OTCheckList obj=new OTCheckList();
		if (!queryType.equals("insert")) {
			obj.setIdCheckList(txtListID);
		}
		obj.setCheckListName(txtCheckListName);
		obj.setCheckListRemark(txtRemark);
		String msg = otService.insertCheckList(obj);
		return msg;
	}
	
	@RequestMapping(value = "/DeleteChkList", method = RequestMethod.POST)
	@ResponseBody
	public String deleteChkList(@RequestParam("ListID") int txtListID) {
		String msg = otService.deleteChkList(txtListID);
		return msg;
	}
	
	@RequestMapping(value="/fetchTempTopicList",method=RequestMethod.GET)
	@ResponseBody
	public SurgicalKitMaster fetchTempTopicList(@RequestParam("pageName") String pageName){
		SurgicalKitMaster obj=new SurgicalKitMaster();
		List<SurgicalKitMaster> list = otService.fetchTempTopicList(pageName);
		obj.setSurgicalKitMasterList(list);
		return obj;
	}
	
	@RequestMapping(value = "/saveTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String saveTemplate(@RequestParam("idTempMast") int idTempMast, @RequestParam("objSKC") String objSKC,
			@RequestParam("tempName") String tempName,@RequestParam("pageType") String pageType,@RequestParam("queryType") String queryType,
			@RequestParam("unitId") int unitId) {
		SurgicalKitMaster obj = (SurgicalKitMaster) ConfigUIJSONUtility.getObjectFromJSON(objSKC, SurgicalKitMaster.class);
		obj.setIdTempTopic(idTempMast);
		obj.setTopicName(tempName);
		obj.setStatus("Y");
		obj.setKit_name(objSKC);
		obj.setUnitId(unitId);
		String msg = otService.saveTemplate(obj);
		return msg;
	}
	
	@RequestMapping(value="/ManageOperationPatient",method=RequestMethod.POST)
	@ResponseBody
	public List<String> manageOperationPatient(@RequestParam("q") String findingName,
			@RequestParam("autoType") String autoType){
		List<String> list = otService.manageOperationPatient(findingName,autoType);
		return list;
	}
	
	@RequestMapping(value="/setAutoCompleteForDoctorName",method=RequestMethod.GET)
	@ResponseBody
	public Doctor setAutoCompleteForDoctorName(@RequestParam("findingName") String findingName,
			@RequestParam("usertype") String usertype){
		Doctor obj=new Doctor();
		List<Doctor> list = otService.setAutoCompleteForDoctorName(findingName,usertype);
		obj.setDoctorList(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchUser",method=RequestMethod.GET)
	@ResponseBody
	public Users fetchUser(@RequestParam("callFrom") String callFrom,
			@RequestParam(value = "byName", required=false) String byName){
		Users obj=new Users();
		List<Users> list = otService.fetchUser(callFrom,byName);
		obj.setUsersList(list);
		return obj;
	}
	
	@RequestMapping(value="/getUserNameFromType",method=RequestMethod.GET)
	@ResponseBody
	public List<String> getUserNameFromType(@RequestParam(value = "type", required=false) String type,
			@RequestParam(value = "letter", required=false) String letter){
		List<String> list = otService.getUserNameFromType(type,letter);
		return list;
	}
	
	@RequestMapping(value="/DisplayOperationPat",method=RequestMethod.GET)
	@ResponseBody
	public Patient displayOperationPat(@RequestParam(value = "otDate", required=false) String otDate,
			@RequestParam(value = "page_name", required=false) String page_name,
			@RequestParam(value = "searchBy", required=false) String searchBy,
			@RequestParam(value = "value", required=false) String value){
		List<Patient> list = otService.displayOperationPat(otDate,page_name,searchBy,value);
		Patient p=new Patient();
		p.setPatientList(list);
		return p;
	}
	
	/************
	 *@author	: AKshata Desai
	 *@code		:Fetch Patient Name
	 ***********/
	
	@RequestMapping(value = "/fetchPateintNameAutosugg", method = RequestMethod.POST)
	@ResponseBody
	public RegTreBillDto fetchPateintNameAutosugg(@RequestParam(value = "patientName", required=false) String patientName,
			@RequestParam(value = "typeOfpatient", required=false) String typeOfpatient,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = otService.fetchPateintNameAutosugg(typeOfpatient,patientName);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);
			
		return obj;
}

	@RequestMapping(value = "/saveEditOperationTeam", method = RequestMethod.POST)
	@ResponseBody
	public String saveEditOperationTeam( @RequestParam("queryType") String queryType,
			@RequestParam("users") String users) {
		OperationTeam obj = (OperationTeam) ConfigUIJSONUtility
				.getObjectFromJSON(users, OperationTeam.class);
		String msg = otService.saveEditOperationTeam(obj);
		return msg;
	}
	
	@RequestMapping(value = "/SaveOperationDetails", method = RequestMethod.POST)
	@ResponseBody
	public String SaveOperationDetails( @RequestParam("queryType") String queryType,
			@RequestParam("operationDetails") String operationDetails) {
		
		Operation obj = (Operation) ConfigUIJSONUtility
				.getObjectFromJSON(operationDetails, Operation.class);
		String msg = otService.SaveOperationDetails(obj,queryType);
		return msg;
	}
	
	@RequestMapping(value="/searchOperation",method=RequestMethod.GET)
	@ResponseBody
	public Operation searchOperation(@RequestParam("strValue") String strValue){
		Operation obj=new Operation();
		List<Operation> list = otService.searchOperation(strValue);
		obj.setOperationList(list);
		return obj;
	}
	
	@RequestMapping(value = "/scheduleOperation", method = RequestMethod.POST)
	@ResponseBody
	public String scheduleOperation( @RequestParam("queryType") String queryType,
			@RequestParam("objTreatmentOperation") String objTreatmentOperation) {
		
		TreatmentOperations obj = (TreatmentOperations) ConfigUIJSONUtility
				.getObjectFromJSON(objTreatmentOperation, TreatmentOperations.class);
		String msg = otService.scheduleOperation(obj,queryType);
		return msg;
	}
	
	@RequestMapping(value="/fetchOperationDocList",method=RequestMethod.GET)
	@ResponseBody
	public TreatmentOperations fetchOperationDocList(@RequestParam("tomId") Integer tomId){
		TreatmentOperations obj=new TreatmentOperations();
		List<OperationDocTbl> list = otService.fetchOperationDocList(tomId);
		obj.setListOperationDoc(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchPreOpPre",method=RequestMethod.GET)
	@ResponseBody
	public PreOpPrep fetchPreOpPre(@RequestParam("tomId") Integer tomId){
		PreOpPrep obj=new PreOpPrep();
		List<PreOpPrep> list = otService.fetchPreOpPre(tomId);
		obj.setListpreOpPrep(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchOTDoc",method=RequestMethod.GET)
	@ResponseBody
	public UploadOTDocuments fetchOTDoc(@RequestParam("tomId") Integer tomId,
			@RequestParam("patId") Integer patId){
		UploadOTDocuments obj=new UploadOTDocuments();
		List<UploadOTDocuments> list = otService.fetchOTDoc(tomId,patId);
		obj.setListDocs(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchOTDescription",method=RequestMethod.GET)
	@ResponseBody
	public OTDescription fetchOTDescription(@RequestParam("tomId") Integer tomId){
		OTDescription obj=new OTDescription();
		List<OTDescription> list = otService.fetchOTDescription(tomId);
		obj.setListOTDesc(list);
		return obj;
	}
	
	@RequestMapping(value = "/addDocNameToList1", method = RequestMethod.POST)
	@ResponseBody
	public String addDocNameToList1( @RequestParam("docId") Integer docId,
			@RequestParam("tomId") Integer tomId,
			@RequestParam("type") String type,
			@RequestParam("userNm") String userNm,
			@RequestParam("doctype") String doctype) {
		OperationDocTbl obj=new OperationDocTbl();
		obj.setDocId(docId);
		obj.setIdtreatmentOperationManage(tomId);
		obj.setDocType(type);
		obj.setSurgeonType(doctype);
		obj.setDocName(userNm);
		String msg = otService.addDocNameToList1(obj);
		return msg;
	}
	
	@RequestMapping(value = "/deleteDocRecord", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDocRecord( @RequestParam("docId") Integer docId,
			@RequestParam("tomId") Integer tomId,@RequestParam("idopDocTbl") Integer idopDocTbl,
			@RequestParam("narra") String narra,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId");
		OperationDocTbl obj=new OperationDocTbl();
		obj.setIdoperationDocTbl(idopDocTbl);
		obj.setDocId(docId);
		obj.setIdtreatmentOperationManage(tomId);
		obj.setNarration(narra);
		obj.setRemovedMarkBy(userId);
		String msg = otService.deleteDocRecord(obj);
		return msg;
	}
	
	@RequestMapping(value = "/absentDoc", method = RequestMethod.POST)
	@ResponseBody
	public String absentDoc( @RequestParam("docId") Integer docId,
			@RequestParam("tomId") Integer tomId,@RequestParam("idopDocTbl") Integer idopDocTbl,
			@RequestParam("narra") String narra,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId");
		OperationDocTbl obj=new OperationDocTbl();
		obj.setIdoperationDocTbl(idopDocTbl);
		obj.setDocId(docId);
		obj.setIdtreatmentOperationManage(tomId);
		obj.setNarration(narra);
		obj.setRemovedMarkBy(userId);
		String msg = otService.absentDoc(obj);
		return msg;
	}
	
	@RequestMapping(value = "/confirmDoc", method = RequestMethod.POST)
	@ResponseBody
	public String confirmDoc( @RequestParam("docId") Integer docId,
			@RequestParam("tomId") Integer tomId,@RequestParam("idopDocTbl") Integer idopDocTbl,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId");
		OperationDocTbl obj=new OperationDocTbl();
		obj.setIdoperationDocTbl(idopDocTbl);
		obj.setDocId(docId);
		obj.setIdtreatmentOperationManage(tomId);
		String msg = otService.confirmDoc(obj,userId);
		return msg;
	}
	
	@RequestMapping(value = "/arrivalDoc", method = RequestMethod.POST)
	@ResponseBody
	public String arrivalDoc( @RequestParam("docId") Integer docId,
			@RequestParam("tomId") Integer tomId,@RequestParam("idopDocTbl") Integer idopDocTbl,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId");
		OperationDocTbl obj=new OperationDocTbl();
		obj.setIdoperationDocTbl(idopDocTbl);
		obj.setDocId(docId);
		obj.setIdtreatmentOperationManage(tomId);
		String msg = otService.arrivalDoc(obj,userId);
		return msg;
	}
	
	@RequestMapping(value = "/savePreOpPrep", method = RequestMethod.POST)
	@ResponseBody
	public String savePreOpPrep( @RequestParam("PreOpPrepString") String popString,
			@RequestParam("parsebcObj") String popobj,HttpServletRequest request) {
		
		PreOpPrep objdrr = new PreOpPrep();
		if (!popobj.equals("")) {
			objdrr = (PreOpPrep) ConfigUIJSONUtility.getObjectFromJSON(
					popobj, PreOpPrep.class);
		} else {
			objdrr = null;
		}
		Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		String msg = otService.savePreOpPrep(popString,
				objdrr,userid);
		return msg;
	}
	
	@RequestMapping(value = "/saveOTDescription", method = RequestMethod.POST)
	@ResponseBody
	public String saveOTDescription( @RequestParam("tomId") Integer tomId,
			@RequestParam("descr") String descr, HttpServletRequest request) {
		Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		String msg = otService.saveOTDescription(tomId, descr, userid);
		return msg;
	}
	
	@RequestMapping(value = "/saveOTDocument", method = RequestMethod.POST)
	@ResponseBody
	public String saveOTDocument(@RequestParam("ifile") MultipartFile[] uploadfiles, @RequestParam("tomId") Integer tomId,
			@RequestParam("patId") Integer patId, @RequestParam("Tid") Integer tid,
			@RequestParam("filePath") String filePath,@RequestParam("note") String note, HttpServletRequest request) {
		Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		//DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new java.util.Date();
		
		String msg = otService.saveOTDocument(uploadfiles,userid, patId, tomId, filePath, note, date);
		return msg;
	}
	
	@RequestMapping(value = "/delOTDocument", method = RequestMethod.POST)
	@ResponseBody
	public String delOTDocument( @RequestParam("tomId") Integer tomId,
			@RequestParam("Pid") Integer patId, @RequestParam("tId") Integer tid,
			@RequestParam("hr") Integer hr, HttpServletRequest request) {
		Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		String msg = otService.delOTDocument(hr,patId,userid);
		return msg;
	}
	
	@RequestMapping(value="/fetchAssessment",method=RequestMethod.GET)
	@ResponseBody
	public Assessment fetchAssessment(@RequestParam("treatmentId") Integer treatmentId){
		Assessment obj=new Assessment();
		List<Assessment> list = otService.fetchAssessment(treatmentId);
		obj.setAssessmentList(list);
		return obj;
	}
	
	@RequestMapping(value="/fetchCustomizeTemplateList",method=RequestMethod.GET)
	@ResponseBody
	public CustomizeTemplate fetchCustomizeTemplateList(@RequestParam("departmentId") Integer departmentId,@RequestParam("selectTemplateType") String selectTemplateType){
		CustomizeTemplate obj=new CustomizeTemplate();
		obj = otService.fetchCustomizeTemplateList(departmentId,selectTemplateType);
		return obj;
	}
	
	@RequestMapping(value="/FetchhraList",method=RequestMethod.GET)
	@ResponseBody
	public HraTypeMaster fetchhraList(@RequestParam("byName") String byName,
			@RequestParam("type") String type){
		HraTypeMaster obj=new HraTypeMaster();
		List<HraTypeMaster> list = otService.fetchhraList(byName,type);
		obj.setLians_access(list);
		return obj;
	}
	
	@RequestMapping(value = "/saveAssessmentOpd", method = RequestMethod.POST)
	@ResponseBody
	public String saveAssessmentOpd(
			@RequestParam("treatmentId") Integer treatmentId,@RequestParam("diagno_slave_id") Integer diagnoslaveid,
			@RequestParam("diagnosis") String diagnosis,@RequestParam("diagno_description") String diagno_description,
			@RequestParam("icd10_code") String icd10_code,@RequestParam("date") String date,
			@RequestParam("diagno_type") String diagno_type,@RequestParam("comment") String comment,
			HttpServletRequest request) {
		Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		Assessment objAssessment = new Assessment();
		objAssessment.setTreatmentId(treatmentId);
		objAssessment.setDiagnosis(diagnosis);
		objAssessment.setDiagno_description(diagno_description);
		objAssessment.setIcd10_code(icd10_code);
		objAssessment.setDate(date);
		objAssessment.setDiagno_type(diagno_type);
		objAssessment.setComment(comment);
		objAssessment.setDiagno_slave_id(diagnoslaveid);
		objAssessment.setDiagnosed_by(userid.toString());
		String msg = otService.saveAssessmentOpd(objAssessment);
		return msg;
	}
	
	@RequestMapping(value = "/deleteAssessment", method = RequestMethod.POST)
	@ResponseBody
	public String deleteAssessment( @RequestParam("diagno_slave_id") Integer diagnoslaveid) {
		String msg = otService.deleteAssessment(diagnoslaveid);
		return msg;
	}
	
	@RequestMapping(value = "/fetchUserList", method = RequestMethod.GET)
	@ResponseBody
	public List<String> fetchUserList(@RequestParam(value = "letter", required = false) String letter) {
		List<String> list = otService.fetchUserList(letter);
		return list;
	}
	
	@RequestMapping(value = "/saveOTNotesData", method = RequestMethod.POST)
	@ResponseBody
	public String saveOTNotesData(
			@RequestParam("idOTNote") Integer idOTNote,@RequestParam("tomId") Integer tomId,
			@RequestParam("EBLoss") String EBLoss,@RequestParam("ABLoss") String ABLoss,
			@RequestParam("ICount") Integer ICount,@RequestParam("RecBy") String RecBy,
			@RequestParam("MOPCount") String MOPCount,@RequestParam("OTNotesComment") String OTNotesComment,
			@RequestParam("implantDetails") String implantDetails,
			@RequestParam("selCustomizeTemp") Integer selCustomizeTemp,
			@RequestParam("templateData") String templateData,
			@RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {
		//Integer userid = (Integer) (request.getSession()).getAttribute("userId");
		EhatOTOperationNotes obj=new EhatOTOperationNotes();
		obj.setTreatmentOperationsManageID(tomId);
		obj.setEstimatedBLoodLoss(EBLoss);
		obj.setActualBloodLoss(ABLoss);
		obj.setInstrumentCount(ICount);
		obj.setRecordedBy(RecBy);
		obj.setMopCountRecordedBy(MOPCount);
		obj.setComment(OTNotesComment);
		obj.setImplantDetails(implantDetails);
		obj.setTemplateID(selCustomizeTemp);
		obj.setChkEditerdata(templateData);
		obj.setIdEhatOTOperationNotes(idOTNote);
		String msg = otService.saveOTNotesData(obj);
		return msg;
	}
	
	@RequestMapping(value = "/fetchOTNotesData", method = RequestMethod.POST)
	@ResponseBody
	public List<EhatOTOperationNotes> fetchOTNotesData(@RequestParam("tomId") int tomId) {
		List<EhatOTOperationNotes> list = otService.fetchOTNotesData(tomId);
		return list;
	}
	
	
	@RequestMapping(value = "/deleteOperation", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOperation( @RequestParam("opId") Integer opId,
			@RequestParam("treatId") Integer treatId, HttpServletRequest request) {
		String msg = otService.deleteOperation(opId, treatId);
		return msg;
	}
	
	@ResponseBody
	@RequestMapping(value = "/featchgrpcatwiseprochargeadmin", method = RequestMethod.POST)
	public OperationChargehallwiseAdmin featchGrpCatWiseProCharge(OperationChargehallwise operationchargehallwise) {
		OperationChargehallwiseAdmin operationchargehallwiseadmin = new OperationChargehallwiseAdmin();
		List<OperationChargehallwiseAdmin> list = otService.featchGrpCatWiseProCharge(operationchargehallwise);
		operationchargehallwiseadmin.setOperationchargehall(list);
		return operationchargehallwiseadmin;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchhalltypeprochargeopration", method = RequestMethod.POST)
	public ChargesMasterSlave fetchHallTypeProchargeOpration() {
		ChargesMasterSlave halltype = new ChargesMasterSlave();
		List<ChargesMasterSlave> list = otService.fetchHallTypeProchargeOpration();
		halltype.setLstChargesSlave(list);
		return halltype;
	}

	@ResponseBody
	@RequestMapping(value = "/savegroupcatwiseprocharges", method = RequestMethod.POST)
	public String saveGroupCatWiseproCharges(@RequestParam("opcharge") String opcharge) {
		String str = "";
		Integer response = otService.saveGroupCatWiseproCharges(opcharge);
		if (response == 1) {
			str = "Record Save Successfuly.";
		} else {
			str = "Record Not Save.";
		}
		return str;
	}
	
	@ResponseBody
	@RequestMapping(value = "/removePreOpPrep", method = RequestMethod.POST)
	public String removePreOpPrep( @RequestParam("idPreOpPrep") Integer idPreOpPrep) {
		PreOpPrep obj = new PreOpPrep();
		obj.setIdpre_op_prep_details(idPreOpPrep);
		String msg = otService.removePreOpPrep(obj);
		return msg;
	}
	
	@RequestMapping(value = "/scheduleMangeOperation", method = RequestMethod.POST)
	@ResponseBody
	public String scheduleMangeOperation(
			@RequestParam("objTreatmentOperation") String objTreatmentOperation) {
		
		TreatmentOperations obj = (TreatmentOperations) ConfigUIJSONUtility
				.getObjectFromJSON(objTreatmentOperation, TreatmentOperations.class);
		String msg = otService.scheduleMangeOperation(obj);
		return msg;
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/savePreAnaestheticDetails", method = RequestMethod.POST)
	@ResponseBody
	public String savePreAnaestheticDetails(@RequestParam("savePreAnaestheticDetails") String objTreatmentOperation) {
			
		Gson gson = new Gson();
		PreAnaesthetic preAnaesthetic = gson.fromJson(objTreatmentOperation, PreAnaesthetic.class); 
		
		PreAnaestheticRequest preAnaestheticRequest = gson.fromJson(objTreatmentOperation, PreAnaestheticRequest.class); 
		
		String msg =otService.savePreAnaestheticDetails(preAnaestheticRequest);
		return msg;
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/defaultOTVitalsView", method = RequestMethod.POST)
	@ResponseBody
	public void defaultOTVitalsView(@RequestParam("cType") String cType,@RequestParam("tomId") String tomId,
			@RequestParam("tid") String tretId,@RequestParam("date") String todaysDefaultDate,HttpServletResponse response) {
		ChartReport arrChart = new ChartReport();
		arrChart =otService.defaultOTVitalsView(cType,tomId,tretId,todaysDefaultDate);
		//return chartReport;
		
		includeJSONResponseObject(arrChart, response);
	}
	
	@RequestMapping(value = "/masterDeleteOperation", method = RequestMethod.POST)
	@ResponseBody
	public String masterDeleteOperation(@RequestParam("oid") int oid) {
		String msg = otService.masterDeleteOperation(oid);
		return msg;
	}
	
	//Added By Badrinath Wagh
    //For fetching details on ipd dashboard
	@RequestMapping(value = "/fetchOTDetailsbyTreatmentId", method = RequestMethod.POST)
	@ResponseBody
	public TreatmentOperations fetchOTDetailsbyTreatmentId(@RequestParam("treatId") Integer treatId) {
		
		TreatmentOperations obj = new TreatmentOperations();
		
		List<TreatmentOperations> list = new ArrayList<TreatmentOperations>();
		
		list = otService.fetchOTDetailsbyTreatmentId(treatId);
		
		obj.setListtreatmentoperation(list);
			
		return obj;
	}
	
	
	@RequestMapping(value = "/DisplayOpSum", method = RequestMethod.POST)
	public @ResponseBody
	Patient displayOpeSummary(@RequestParam(value = "trid") String trid,
			 @RequestParam("startIndex") Integer startIndex) {
		
		List<Patient> plist =new ArrayList<>();
		
		Patient obj = new Patient();
		
		plist = otService.displayOpeSummary(trid,startIndex);		
		Integer PrevOperationCnt=otService.getPrevOperationCount();
		obj.setPrevOperationCnt(PrevOperationCnt);
		obj.setPatientList(plist);
		
		return obj;
		 	
	}
	
	
	@RequestMapping(value = "/showSearchOperSum1", method = RequestMethod.POST)
	public @ResponseBody
	Patient showSearchOperSum1(@RequestParam(value = "searchBy") String searchBy, @RequestParam(value = "patient_ID") String patient_ID,			
			@RequestParam(value = "pageName") String pageName,	@RequestParam(value = "fdate") String fdate, @RequestParam(value = "todate") String todate,
			@RequestParam(value = "surganname") int surganname, @RequestParam(value = "surgerytype") int surgerytype
		) {
		
		List<Patient> lstpattientdto = new ArrayList<>(); 
		lstpattientdto = otService.showSearchOperSum1(searchBy,patient_ID,pageName,fdate,todate,surganname,surgerytype);		
		Patient obj=new Patient();
		obj.setPatientList(lstpattientdto);
		return obj;		
	}
	
	
	@RequestMapping(value = "/saveOTVitals", method = RequestMethod.POST)
	public @ResponseBody
	String saveOTVitals(@RequestParam(value = "ajaxRes") String ChartData, @RequestParam(value = "userId") int userId,			
			@RequestParam(value = "type") String type,	@RequestParam(value = "tomId") String tomId, @RequestParam(value = "tid") String tid,HttpServletRequest request) {
		
		int isInserted = 0;
		
		//ChartReportDTO objChart = new ChartReportDTO();
		ChartReport objChart = new ChartReport();
		String[] ajaxRes = request.getParameterValues("ajaxRes");
		String str = ajaxRes[0].substring(0, ajaxRes[0].length());

		if (!ajaxRes.equals("null")) {
			for (int i = 0; i < ajaxRes.length; i++) {
				objChart = (ChartReport) ConfigUIJSONUtility.getObjectFromJSON(
						str, ChartReport.class);
				System.out.println("ajaxRes...."+ajaxRes.length);
			}
		} else {
			ajaxRes = null;
		}
		
		isInserted = otService.saveOTVitals(objChart,userId,type,tomId,tid);	
		String msg="";
		if (isInserted == 1) {
			
			msg = "Data inserted successfully...";

		} else {
			
			msg=	"Oops some problem occured while inserting record...";
		}
		return msg;		
	}
	
	//added by vishant 
	@RequestMapping(value="/fetchCustomizeTemplateListByDeptId",method=RequestMethod.GET)
	@ResponseBody
	public CustomizeTemplate fetchCustomizeTemplateListByDeptId(@RequestParam("departmentId") Integer departmentId){
		CustomizeTemplate obj=new CustomizeTemplate();
		obj = otService.fetchCustomizeTemplateListByDeptId(departmentId);
		return obj;
	}
	
	@RequestMapping(value="/fetchAddConductAnaesthesia",method=RequestMethod.POST)
	@ResponseBody
	public void fetchAddConductAnaesthesia(@RequestParam("tretID") String tretID,@RequestParam("anaesID") String anaesID,HttpServletResponse response){

		List<ConductAnaesthesia> conductAnaesthesiaList = otService.fetchAddConductAnaesthesia(tretID,anaesID);
		
		ConductAnaesthesia objConductAnaesthesia = new ConductAnaesthesia();

		objConductAnaesthesia.setConductanaesthesialist(conductAnaesthesiaList);

		includeJSONResponseObject(objConductAnaesthesia, response);
	}
	
	public static void includeJSONResponseObject(Object jsonObject, HttpServletResponse response) {

		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html");
			ConfigUIJSONUtility.getJSONFromObjectToStream(jsonObject,
					response.getWriter());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@RequestMapping(value="/fetchTeambyId", method = RequestMethod.POST)
	@ResponseBody public OperationTeam fetchTeambyId(@RequestParam("teamId") Integer teamId)
	{
		OperationTeam obj = otService.fetchTeambyId(teamId);
		return obj;
	}
	
	//added by vishant  for fetch pre anaesthetic details 
	@RequestMapping(value="/fetchAnaestheticDetails",method=RequestMethod.POST)
	@ResponseBody
	public PreAnaesthetic fetchAnaestheticDetails(@RequestParam("treatmentId") String treatmentId){
		PreAnaesthetic anaesthetic = new PreAnaesthetic();
		List<PreAnaesthetic> list = otService.fetchAnaestheticDetails(treatmentId);
		anaesthetic.setPreAnaestheticList(list);
		return anaesthetic;
	}
	
	
	@RequestMapping(value = "/getSubChargesById", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getSubChargesById(@RequestParam("masterId") Integer masterId,
					@RequestParam("selfId") Integer selfId) {

		List<ChargesMasterSlave> ltSubService = new ArrayList<ChargesMasterSlave>();
		ltSubService = otService.getSubChargesById(masterId, selfId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltSubService);
		return obj;
	}
	
	
	@RequestMapping(value = "/fetchServiceListCom", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterDto fetchServiceListCom(HttpServletRequest request) {     
		ChargesMasterDto ltServiceMasterDto = new ChargesMasterDto();
		ltServiceMasterDto = otService.fetchServiceListCom(request);

		return ltServiceMasterDto;
	}
	
	@RequestMapping(value = "/getPatientOperationDoctors", method = RequestMethod.GET)
	public List<Doctor> getPatientOperationDoctors(@RequestParam("OperationManageId") int OperationManageId)
	{
		return otService.getPatientOperationDoctors(OperationManageId);
		
	}
	
	@RequestMapping(value = "/getOtNotesDataByOtId", method = RequestMethod.POST)
	@ResponseBody
	public OTNotesFetchOperationDto getOtNotesDataByOtId(
			@RequestParam(value = "otNotesId") int otNotesId,	
			@RequestParam(value = "callFrom") String callFrom) {
		
		return otService.getOtNotesDataByOtId(otNotesId,callFrom);
	}
	
}
