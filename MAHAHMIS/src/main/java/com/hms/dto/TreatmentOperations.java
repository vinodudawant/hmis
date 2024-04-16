package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.ot.dto.AssistantSurgeon;
import com.hms.ot.dto.BillComponentSample;
import com.hms.ot.dto.Operation;
import com.hms.ot.dto.OperationAnesthetist;
import com.hms.ot.dto.OperationDocTbl;

public class TreatmentOperations {

	private int iD;
	private int treatment_ID;
	private int operation_ID;
	private String operName;
	private int operationCharge;
	private String doctor_IDs;
	private String start_Time;
	private String end_Time;
	private String nurse_IDs;
	private String equipments_Used;
	private String medicine_Used;
	private String comments;
	private String status;
	private int op_type;
	private String doc_names;
	private String date;
	private String surInstrumentCharge;
	private String route;
	private String stent_detail;
	private String finding;
	private String provlon;
	private String veesel_det;
	private String pro_name;
	private String ohr;
	private String chr;
	private String obp;
	private String cbp;
	private int sheet_remove_by;
	private String kitName;
	private List<String> docNameList;
	private String anesthetistId;
	private int otid;
	private String anesthesia;
	private String department;
	private String emergencyFlag;
	private String infectionFlag;
	private String criticalFlag;
	private int treatmentOperationsManageID;
	private List<AssistantSurgeon> listAssistantSurgeon;
	private String asstSurgeonName;
	private List<OperationDocTbl> listOperationDoc;
	private List<TreatmentOperations> listtreatmentoperation;
	private Operation objOperation;
	private String anechargetype;
	private String bedSideService;
	private String opcat;
	@JsonGetter("opcat")
	public String getOpcat() {
		return opcat;
	}
	@JsonSetter("opcat")
	public void setOpcat(String opcat) {
		this.opcat = opcat;
	}

	private List<OperationAnesthetist> listOperationAnesthetist;
	
	private List<BillComponentSample> surgryconsumablelist;
	
	@JsonGetter("surgryconsumablelist")
	public List<BillComponentSample> getSurgryconsumablelist() {
		return surgryconsumablelist;
	}
	@JsonSetter("surgryconsumablelist")
	public void setSurgryconsumablelist(
			List<BillComponentSample> surgryconsumablelist) {
		this.surgryconsumablelist = surgryconsumablelist;
	}

	private String scheduledProcedure;
	private String remark;
	private String precaution;
	private String surgeryDescription;
	private String indicationForSurgery;
	private Integer teamId;
	private Integer bookedBy;
	private String anesthesiaType;
	private String suggestedBy;
	private String otherReference;
	private String contactOfReference;
	private String emailOfReference;
	
	@JsonGetter("on")
	public String getOperName() {
		return operName;
	}
	
	@JsonSetter("on")
	public void setOperName(String operName) {
		this.operName = operName;
	}
	
	@JsonGetter("otherReference")
	public String getOtherReference() {
		return otherReference;
	}
	@JsonSetter("otherReference")
	public void setOtherReference(String otherReference) {
		this.otherReference = otherReference;
	}
	@JsonGetter("contactOfReference")
	public String getContactOfReference() {
		return contactOfReference;
	}
	@JsonSetter("contactOfReference")
	public void setContactOfReference(String contactOfReference) {
		this.contactOfReference = contactOfReference;
	}
	@JsonGetter("emailOfReference")
	public String getEmailOfReference() {
		return emailOfReference;
	}
	@JsonSetter("emailOfReference")
	public void setEmailOfReference(String emailOfReference) {
		this.emailOfReference = emailOfReference;
	}
	
	@JsonGetter("listOpeAnes")
	public List<OperationAnesthetist> getListOperationAnesthetist() {
		return listOperationAnesthetist;
	}
	
	@JsonSetter("listOpeAnes")
	public void setListOperationAnesthetist(
			List<OperationAnesthetist> listOperationAnesthetist) {
		this.listOperationAnesthetist = listOperationAnesthetist;
	}
	
	@JsonGetter("act")
	public String getAnechargetype() {
		return anechargetype;
	}
	@JsonSetter("act")
	public void setAnechargetype(String anechargetype) {
		this.anechargetype = anechargetype;
	}
	@JsonGetter("pid")
	public int getPatientId() {
		return patientId;
	}

	@JsonSetter("pid")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	private String gasAndMonitorService;
	private String instrumentAndEquipementService;
	private int patientId;

	private List<Test> listTest;

	@JsonGetter("liTest")
	public List<Test> getListTest() {
		return listTest;
	}

	@JsonSetter("liTest")
	public void setListTest(List<Test> listTest) {
		this.listTest = listTest;
	}

	@JsonGetter("bedside")
	public String getBedSideService() {
		return bedSideService;
	}

	@JsonSetter("bedside")
	public void setBedSideService(String bedSideService) {
		this.bedSideService = bedSideService;
	}

	@JsonGetter("gas")
	public String getGasAndMonitorService() {
		return gasAndMonitorService;
	}

	@JsonSetter("gas")
	public void setGasAndMonitorService(String gasAndMonitorService) {
		this.gasAndMonitorService = gasAndMonitorService;
	}

	@JsonGetter("instrument")
	public String getInstrumentAndEquipementService() {
		return instrumentAndEquipementService;
	}

	@JsonSetter("instrument")
	public void setInstrumentAndEquipementService(
			String instrumentAndEquipementService) {
		this.instrumentAndEquipementService = instrumentAndEquipementService;
	}

	@JsonGetter("ctrFlg")
	public String getCriticalFlag() {
		return criticalFlag;
	}

	@JsonSetter("ctrFlg")
	public void setCriticalFlag(String criticalFlag) {
		this.criticalFlag = criticalFlag;
	}

	@JsonGetter("opobj")
	public Operation getObjOperation() {
		return objOperation;
	}

	@JsonSetter("opobj")
	public void setObjOperation(Operation objOperation) {
		this.objOperation = objOperation;
	}

	@JsonGetter("toli")
	public List<TreatmentOperations> getListtreatmentoperation() {
		return listtreatmentoperation;
	}

	@JsonSetter("toli")
	public void setListtreatmentoperation(
			List<TreatmentOperations> listtreatmentoperation) {
		this.listtreatmentoperation = listtreatmentoperation;
	}

	@JsonGetter("tomid")
	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}

	@JsonSetter("tomid")
	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}

	@JsonGetter("liAssSurgeon")
	public List<AssistantSurgeon> getListAssistantSurgeon() {
		return listAssistantSurgeon;
	}

	@JsonSetter("liAssSurgeon")
	public void setListAssistantSurgeon(
			List<AssistantSurgeon> listAssistantSurgeon) {
		this.listAssistantSurgeon = listAssistantSurgeon;
	}

	@JsonGetter("assSurgeonName")
	public String getAsstSurgeonName() {
		return asstSurgeonName;
	}

	@JsonSetter("assSurgeonName")
	public void setAsstSurgeonName(String asstSurgeonName) {
		this.asstSurgeonName = asstSurgeonName;
	}

	@JsonGetter("emerFlg")
	public String getEmergencyFlag() {
		return emergencyFlag;
	}

	@JsonSetter("emerFlg")
	public void setEmergencyFlag(String emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
	}

	@JsonGetter("infFlg")
	public String getInfectionFlag() {
		return infectionFlag;
	}

	@JsonSetter("infFlg")
	public void setInfectionFlag(String infectionFlag) {
		this.infectionFlag = infectionFlag;
	}

	@JsonGetter("dpt")
	public String getDepartment() {
		return department;
	}

	@JsonSetter("dpt")
	public void setDepartment(String department) {
		this.department = department;
	}

	@JsonGetter("liOpDoc")
	public List<OperationDocTbl> getListOperationDoc() {
		return listOperationDoc;
	}

	@JsonSetter("liOpDoc")
	public void setListOperationDoc(List<OperationDocTbl> listOperationDoc) {
		this.listOperationDoc = listOperationDoc;
	}

	@JsonGetter("otid")
	public int getOtid() {
		return otid;
	}

	@JsonSetter("otid")
	public void setOtid(int otid) {
		this.otid = otid;
	}

	@JsonGetter("ktNm")
	public String getKitName() {
		return kitName;
	}

	@JsonSetter("ktNm")
	public void setKitName(String kitName) {
		this.kitName = kitName;
	}

	@JsonGetter("anid")
	public String getAnesthetistId() {
		return anesthetistId;
	}

	@JsonSetter("anid")
	public void setAnesthetistId(String anesthetistId) {
		this.anesthetistId = anesthetistId;
	}

	@JsonGetter("otp")
	public int getOp_type() {
		return op_type;
	}

	@JsonSetter("otp")
	public void setOp_type(int op_type) {
		this.op_type = op_type;
	}

	@JsonGetter("dnl")
	public List<String> getDocNameList() {
		return docNameList;
	}

	@JsonSetter("dnl")
	public void setDocNameList(List<String> docNameList) {
		this.docNameList = docNameList;
	}

	@JsonGetter("srb")
	public int getSheet_remove_by() {
		return sheet_remove_by;
	}

	@JsonSetter("srb")
	public void setSheet_remove_by(int sheet_remove_by) {
		this.sheet_remove_by = sheet_remove_by;
	}

	@JsonGetter("oh")
	public String getOhr() {
		return ohr;
	}

	@JsonSetter("oh")
	public void setOhr(String ohr) {
		this.ohr = ohr;
	}

	@JsonGetter("ch")
	public String getChr() {
		return chr;
	}

	@JsonSetter("ch")
	public void setChr(String chr) {
		this.chr = chr;
	}

	@JsonGetter("ob")
	public String getObp() {
		return obp;
	}

	@JsonSetter("ob")
	public void setObp(String obp) {
		this.obp = obp;
	}

	@JsonGetter("cb")
	public String getCbp() {
		return cbp;
	}

	@JsonSetter("cb")
	public void setCbp(String cbp) {
		this.cbp = cbp;
	}

	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	/**
	 * @param date
	 *            the date to set
	 */
	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * @return the procedure
	 */
	@JsonGetter("surinstr")
	public String getSurInstrumentCharge() {
		return surInstrumentCharge;
	}

	/**
	 * @param procedure
	 *            the procedure to set
	 */
	@JsonSetter("surinstr")
	public void setSurInstrumentCharge(String surInstrumentCharge) {
		this.surInstrumentCharge = surInstrumentCharge;
	}

	/**
	 * @return the route
	 */
	@JsonGetter("rt")
	public String getRoute() {
		return route;
	}

	/**
	 * @param route
	 *            the route to set
	 */
	@JsonSetter("rt")
	public void setRoute(String route) {
		this.route = route;
	}

	/**
	 * @return the stent_detail
	 */
	@JsonGetter("stnt")
	public String getStent_detail() {
		return stent_detail;
	}

	/**
	 * @param stent_detail
	 *            the stent_detail to set
	 */
	@JsonSetter("stnt")
	public void setStent_detail(String stent_detail) {
		this.stent_detail = stent_detail;
	}

	/**
	 * @return the finding
	 */
	@JsonGetter("fnd")
	public String getFinding() {
		return finding;
	}

	/**
	 * @param finding
	 *            the finding to set
	 */
	@JsonSetter("fnd")
	public void setFinding(String finding) {
		this.finding = finding;
	}

	/**
	 * @return the provlon
	 */
	@JsonGetter("prv")
	public String getProvlon() {
		return provlon;
	}

	/**
	 * @param provlon
	 *            the provlon to set
	 */
	@JsonSetter("prv")
	public void setProvlon(String provlon) {
		this.provlon = provlon;
	}

	/**
	 * @return the veesel_det
	 */
	@JsonGetter("vd")
	public String getVeesel_det() {
		return veesel_det;
	}

	/**
	 * @param veesel_det
	 *            the veesel_det to set
	 */
	@JsonSetter("vd")
	public void setVeesel_det(String veesel_det) {
		this.veesel_det = veesel_det;
	}

	public TreatmentOperations() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the iD
	 */
	@JsonGetter("id")
	public int getiD() {
		return iD;
	}

	/**
	 * @param id
	 *            the iD to set
	 */
	@JsonSetter("id")
	public void setiD(int id) {
		this.iD = id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	/**
	 * @return the operation_ID
	 */
	@JsonGetter("oi")
	public int getOperation_ID() {
		return operation_ID;
	}

	/**
	 * @param operation_ID
	 *            the operation_ID to set
	 */
	@JsonSetter("oi")
	public void setOperation_ID(int operation_ID) {
		this.operation_ID = operation_ID;
	}

	/**
	 * @return the doctor_IDs
	 */
	@JsonGetter("di")
	public String getDoctor_IDs() {
		return doctor_IDs;
	}

	/**
	 * @param doctor_IDs
	 *            the doctor_IDs to set
	 */
	@JsonSetter("di")
	public void setDoctor_IDs(String doctor_IDs) {
		this.doctor_IDs = doctor_IDs;
	}

	/**
	 * @return the start_Time
	 */
	@JsonGetter("st")
	public String getStart_Time() {
		return start_Time;
	}

	/**
	 * @param startTime1
	 *            the start_Time to set
	 */
	@JsonSetter("st")
	public void setStart_Time(String startTime1) {
		this.start_Time = startTime1;
	}

	/**
	 * @return the end_Time
	 */
	@JsonGetter("et")
	public String getEnd_Time() {
		return end_Time;
	}

	/**
	 * @param endTime1
	 *            the end_Time to set
	 */
	@JsonSetter("et")
	public void setEnd_Time(String endTime1) {
		this.end_Time = endTime1;
	}

	/**
	 * @return the nurse_IDs
	 */
	@JsonGetter("ni")
	public String getNurse_IDs() {
		return nurse_IDs;
	}

	/**
	 * @param nurse_IDs
	 *            the nurse_IDs to set
	 */
	@JsonSetter("ni")
	public void setNurse_IDs(String nurse_IDs) {
		this.nurse_IDs = nurse_IDs;
	}

	/**
	 * @return the equipments_Used
	 */
	@JsonGetter("eu")
	public String getEquipments_Used() {
		return equipments_Used;
	}

	/**
	 * @param equipments_Used
	 *            the equipments_Used to set
	 */
	@JsonSetter("eu")
	public void setEquipments_Used(String equipments_Used) {
		this.equipments_Used = equipments_Used;
	}

	/**
	 * @return the medicine_Used
	 */
	@JsonGetter("mu")
	public String getMedicine_Used() {
		return medicine_Used;
	}

	/**
	 * @param medicine_Used
	 *            the medicine_Used to set
	 */
	@JsonSetter("mu")
	public void setMedicine_Used(String medicine_Used) {
		this.medicine_Used = medicine_Used;
	}

	/**
	 * @return the comments
	 */
	@JsonGetter("cm")
	public String getComments() {
		return comments;
	}

	/**
	 * @param comments
	 *            the comments to set
	 */
	@JsonSetter("cm")
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * @return the status
	 */
	@JsonGetter("sts")
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	@JsonSetter("sts")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("pn")
	public String getPro_name() {
		return pro_name;
	}

	@JsonSetter("pn")
	public void setPro_name(String pro_name) {
		this.pro_name = pro_name;
	}

	@JsonGetter("docnms")
	public String getDoc_names() {
		return doc_names;
	}

	@JsonSetter("docnms")
	public void setDoc_names(String doc_names) {
		this.doc_names = doc_names;
	}

	@JsonGetter("anesthesia")
	public String getAnesthesia() {
		return anesthesia;
	}

	@JsonSetter("anesthesia")
	public void setAnesthesia(String anesthesia) {
		this.anesthesia = anesthesia;
	}

	@JsonSetter("operationCharge")
	public int getOperationCharge() {
		return operationCharge;
	}

	@JsonSetter("operationCharge")
	public void setOperationCharge(int operationCharge) {
		this.operationCharge = operationCharge;
	}

	@JsonGetter("schPro")
	public String getScheduledProcedure() {
		return scheduledProcedure;
	}

	@JsonSetter("schPro")
	public void setScheduledProcedure(String scheduledProcedure) {
		this.scheduledProcedure = scheduledProcedure;
	}

	@JsonGetter("rem")
	public String getRemark() {
		return remark;
	}

	@JsonSetter("rem")
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@JsonGetter("presc")
	public String getPrecaution() {
		return precaution;
	}

	@JsonSetter("presc")
	public void setPrecaution(String precaution) {
		this.precaution = precaution;
	}
	
	@JsonGetter("surDesc")
	public String getSurgeryDescription() {
		return surgeryDescription;
	}

	@JsonSetter("surDesc")
	public void setSurgeryDescription(String surgeryDescription) {
		this.surgeryDescription = surgeryDescription;
	}

	@JsonGetter("inSur")
	public String getIndicationForSurgery() {
		return indicationForSurgery;
	}

	@JsonSetter("inSur")
	public void setIndicationForSurgery(String indicationForSurgery) {
		this.indicationForSurgery = indicationForSurgery;
	}

	@JsonGetter("teamId")
	public Integer getTeamId() {
		return teamId;
	}

	@JsonSetter("teamId")
	public void setTeamId(Integer teamId) {
		this.teamId = teamId;
	}

	@JsonSetter("boBy")
	public Integer getBookedBy() {
		return bookedBy;
	}

	@JsonSetter("boBy")
	public void setBookedBy(Integer bookedBy) {
		this.bookedBy = bookedBy;
	}
	
	@JsonGetter("anesType")
	public String getAnesthesiaType() {
		return anesthesiaType;
	}
	@JsonSetter("anesType")
	public void setAnesthesiaType(String anesthesiaType) {
		this.anesthesiaType = anesthesiaType;
	}
	@JsonGetter("sugBy")
	public String getSuggestedBy() {
		return suggestedBy;
	}
	@JsonSetter("sugBy")
	public void setSuggestedBy(String suggestedBy) {
		this.suggestedBy = suggestedBy;
	}

	
}
