package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.administrator.dto.Test;

@Entity
@Table(name = "treatmentoperationsmanage")
public class TreatmentOperationsManage implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManageID;
	
	@Column(name = "treatmentOperationsID")
	private int iD;
	
	@Column(name = "Operation_ID")
	private int operation_ID;
	
	@Column(name = "anesthetistId")
	private String anesthetistId;
	
	@Column(name = "eCharge")
	private Integer eCharge;
	
	@Column(name = "Equipments_Used")
	private String equipments_Used;
	
	@Column(name = "totalAmount")
	private String totalAmount;
	
	@Column(name = "Comments")
	private String comments;
	
	@Column(name = "Status")
	private String status;
	
	@Column(name = "surInstrumentCharge")
	private String surInstrumentCharge;
	
	@Column(name = "procedur")
	private String scheduledProcedure;
	
	@Column(name = "route")
	private String route;
	
	@Column(name = "stent_detail")
	private String stent_detail;
	
	@Column(name = "finding")
	private String finding;
	
	@Column(name = "provlon")
	private String provlon;
	
	@Column(name = "veesel_det")
	private String veesel_det;
	
	@Column(name = "opStatus")
	private String opStatus;
	
	@Column(name = "doc_names")
	private String doc_names;
	
	@Column(name = "ohr")
	private String ohr;
	
	@Column(name = "chr")
	private String chr;
	
	@Column(name = "obp")
	private String obp;
	
	@Column(name = "cbp")
	private String cbp;
	
	@Column(name = "sheet_remove_by")
	private int sheet_remove_by;
	
	@Column(name = "kit_ids")
	private String kit_ids;
	
	@Column(name = "flag")
	private String flag;
	
	@Column(name = "report_flag")
	private String report_flag;
	
	@Column(name = "ot_id")
	private int otid;
	
	@Column(name = "anesthesia")
	private String anesthesia;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "asstSurgeonName")
	private String asstSurgeonName;
	
	@Column(name = "bedSideServices")
	private String bedSideService;
	
	@Column(name = "gasAndMonitorServices")
	private String gasAndMonitorServices;
	
	@Column(name = "insrumentAndEquipemntServices")
	private String insrumentAndEquipemntServices;
	
	@Column(name = "bill_flag")
	private String billflag;
	
	@Column(name = "operation_status")
	private String operationStatus;
	
	@Column(name = "operationCharge")
	private int operationCharge;
	
	@Column(name = "anachargetype")
	private String anachargetype;
	
	@Column(name = "scheduled_procedure")
    @Type(type="text")
	private String scheduled_procedure;
	
	@Column(name = "remark")
    @Type(type="text")
	private String remark;
	
	@Column(name = "precaution")
    @Type(type="text")
	private String precaution;
	
	@Column(name = "surgery_description")
    @Type(type="text")
	private String surgeryDescription;
	
	@Column(name = "indication_for_surgery")
    @Type(type="text")
	private String indicationForSurgery;
	
	@Column(name = "surgery_team")
	private Integer teamId;
	
	@Column(name = "bookedBy")
	private Integer bookedBy;
	
	@Column(name = "anesthesiaType")
	private String anesthesiaType;
	
	@Column(name = "suggestedBy")
	private String suggestedBy;
	
	@Column(name = "other_reference")
	private String otherReference;
	
	@Column(name = "contact_of_reference")
	private String contactOfReference;
	
	@Column(name = "email_of_reference")
	private String emailOfReference;
	
	@Column(name = "opgread")
	private String opcat;
	
	@Column(name = "unit_id")
	private Integer unitId=1;
	
	@Transient
	private int treatment_ID;
	@Transient
	private String operName;
	@Transient
	private String doctor_IDs;
	@Transient
	private String start_Time;
	@Transient
	private String end_Time;
	@Transient
	private String nurse_IDs;
	@Transient
	private String medicine_Used;
	@Transient
	private int op_type;
	@Transient
	private String date;
	@Transient
	private String pro_name;
	@Transient
	private String kitName;
	@Transient
	private List<String> docNameList;
	@Transient
	private String emergencyFlag;
	@Transient
	private String infectionFlag;
	@Transient
	private String criticalFlag;
	@Transient
	private List<AssistantSurgeon> listAssistantSurgeon;
	@Transient
	private List<OperationDocTbl> listOperationDoc;
	@Transient
	private List<TreatmentOperationsManage> listtreatmentoperation;
	@Transient
	private Operation objOperation;
	@Transient
	private String anechargetype;
	@Transient
	private List<OperationAnesthetist> listOperationAnesthetist;
	@Transient
	private List<BillComponentSample> surgryconsumablelist;
	@Transient
	private String gasAndMonitorService;
	@Transient
	private String instrumentAndEquipementService;
	@Transient
	private int patientId;
	@Transient
	private List<Test> listTest;
	
	@JsonGetter("opcat")
	public String getOpcat() {
		return opcat;
	}

	@JsonSetter("opcat")
	public void setOpcat(String opcat) {
		this.opcat = opcat;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@JsonGetter("surgryconsumablelist")
	public List<BillComponentSample> getSurgryconsumablelist() {
		return surgryconsumablelist;
	}

	@JsonSetter("surgryconsumablelist")
	public void setSurgryconsumablelist(List<BillComponentSample> surgryconsumablelist) {
		this.surgryconsumablelist = surgryconsumablelist;
	}


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
	public void setListOperationAnesthetist(List<OperationAnesthetist> listOperationAnesthetist) {
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
	public void setInstrumentAndEquipementService(String instrumentAndEquipementService) {
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
	public List<TreatmentOperationsManage> getListtreatmentoperation() {
		return listtreatmentoperation;
	}

	@JsonSetter("toli")
	public void setListtreatmentoperation(List<TreatmentOperationsManage> listtreatmentoperation) {
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
	public void setListAssistantSurgeon(List<AssistantSurgeon> listAssistantSurgeon) {
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
	 * @param date the date to set
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
	 * @param procedure the procedure to set
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
	 * @param route the route to set
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
	 * @param stent_detail the stent_detail to set
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
	 * @param finding the finding to set
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
	 * @param provlon the provlon to set
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
	 * @param veesel_det the veesel_det to set
	 */
	@JsonSetter("vd")
	public void setVeesel_det(String veesel_det) {
		this.veesel_det = veesel_det;
	}

	public TreatmentOperationsManage() {
	}
	
	@JsonGetter("id")
	public int getiD() {
		return iD;
	}
	
	@JsonSetter("id")
	public void setiD(int iD) {
		this.iD = iD;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID the treatment_ID to set
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
	 * @param operation_ID the operation_ID to set
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
	 * @param doctor_IDs the doctor_IDs to set
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
	 * @param startTime1 the start_Time to set
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
	 * @param endTime1 the end_Time to set
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
	 * @param nurse_IDs the nurse_IDs to set
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
	 * @param equipments_Used the equipments_Used to set
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
	 * @param medicine_Used the medicine_Used to set
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
	 * @param comments the comments to set
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
	 * @param status the status to set
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
	
	public String getOpStatus() {
		return opStatus;
	}

	public void setOpStatus(String opStatus) {
		this.opStatus = opStatus;
	}

	public Integer geteCharge() {
		return eCharge;
	}

	public void seteCharge(Integer eCharge) {
		this.eCharge = eCharge;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getKit_ids() {
		return kit_ids;
	}

	public void setKit_ids(String kit_ids) {
		this.kit_ids = kit_ids;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getReport_flag() {
		return report_flag;
	}

	public void setReport_flag(String report_flag) {
		this.report_flag = report_flag;
	}

	public String getGasAndMonitorServices() {
		return gasAndMonitorServices;
	}

	public void setGasAndMonitorServices(String gasAndMonitorServices) {
		this.gasAndMonitorServices = gasAndMonitorServices;
	}

	public String getInsrumentAndEquipemntServices() {
		return insrumentAndEquipemntServices;
	}

	public void setInsrumentAndEquipemntServices(String insrumentAndEquipemntServices) {
		this.insrumentAndEquipemntServices = insrumentAndEquipemntServices;
	}

	public String getBillflag() {
		return billflag;
	}

	public void setBillflag(String billflag) {
		this.billflag = billflag;
	}

	public String getOperationStatus() {
		return operationStatus;
	}

	public void setOperationStatus(String operationStatus) {
		this.operationStatus = operationStatus;
	}

	public String getAnachargetype() {
		return anachargetype;
	}

	public void setAnachargetype(String anachargetype) {
		this.anachargetype = anachargetype;
	}

	public String getScheduled_procedure() {
		return scheduled_procedure;
	}

	public void setScheduled_procedure(String scheduled_procedure) {
		this.scheduled_procedure = scheduled_procedure;
	}
	
}