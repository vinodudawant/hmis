package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Test implements Serializable {

	private int test_ID;
	private String tName;
	private String suggest;
	private String ipdservicetype;
	private float charges1;
	private float testPatientCharges;
	private String testChargesApplicableFlag;
	private float qty;
	private int id;
	private List<Test> testList;
	private String test_report;
	private List<TreatmentTests> listTreatmentTests;
	private String investigationInstruction;
	private String investigationClinicalNote;
	private int investigationUrgentFlag;
	private int testType;
	private int bodyPart;
	private String tid;
	private String doctor;
	private String hospital;
	private int asignBy;
	private String bodyPartName;
	private int billSlaveID;
	private int investigationSlaveID;
	private String GroupName;
	private int GroupId;
	private float pay;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList;
	
	private double clinicPercent;
	
	///added by paras for new ot
	private int ipdbillid;

	
	private int billid;

	
	@JsonGetter("ipdbillid")
	public int getIpdbillid() {
		return ipdbillid;
	}
	@JsonSetter("ipdbillid")
	public void setIpdbillid(int ipdbillid) {
		this.ipdbillid = ipdbillid;
	}
	@JsonGetter("billid")
	public int getBillid() {
		return billid;
	}
	@JsonSetter("billid")
	public void setBillid(int billid) {
		this.billid = billid;
	}

	
//end	
	
	@JsonGetter("clinicPercent")
	public double getClinicPercent() {
		return clinicPercent;
	}

	@JsonSetter("clinicPercent")
	public void setClinicPercent(double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}
	private String assignUserName;
	private String assignDateTime;
	
	public String getAssignUserName() {
		return assignUserName;
	}

	public String getAssignDateTime() {
		return assignDateTime;
	}

	public void setAssignUserName(String assignUserName) {
		this.assignUserName = assignUserName;
	}

	public void setAssignDateTime(String assignDateTime) {
		this.assignDateTime = assignDateTime;
	}

	public Test() {}
	
	@JsonGetter("pay")
	public float getPay() {
		return pay;
	}

	@JsonSetter("pay")
	public void setPay(float pay) {
		this.pay = pay;
	}

	@JsonGetter("billSlaveID")
	public int getBillSlaveID() {
		return billSlaveID;
	}
	
	@JsonSetter("billSlaveID")
	public void setBillSlaveID(int billSlaveID) {
		this.billSlaveID = billSlaveID;
	}
	
	@JsonGetter("investigationSlaveID")
	public int getInvestigationSlaveID() {
		return investigationSlaveID;
	}

	@JsonSetter("investigationSlaveID")
	public void setInvestigationSlaveID(int investigationSlaveID) {
		this.investigationSlaveID = investigationSlaveID;
	}

	@JsonGetter("doctor")
	public String getDoctor() {
		return doctor;
	}
	
	@JsonSetter("doctor")
	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}
	
	@JsonGetter("hospital")
	public String getHospital() {
		return hospital;
	}
	
	@JsonSetter("hospital")
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	
	@JsonGetter("tid")
	public String getTid() {
		return tid;
	}
	@JsonSetter("tid")
	public void setTid(String tid) {
		this.tid = tid;
	}
	
	@JsonGetter("testType")
	public int getTestType() {
		return testType;
	}

	@JsonSetter("testType")
	public void setTestType(int testType) {
		this.testType = testType;
	}

	@JsonGetter("bodyPart")
	public int getBodyPart() {
		return bodyPart;
	}

	@JsonSetter("bodyPart")
	public void setBodyPart(int bodyPart) {
		this.bodyPart = bodyPart;
	}

	@JsonGetter("investigationInstruction")
	public String getInvestigationInstruction() {
		return investigationInstruction;
	}

	@JsonSetter("investigationInstruction")
	public void setInvestigationInstruction(String investigationInstruction) {
		this.investigationInstruction = investigationInstruction;
	}

	@JsonGetter("investigationClinicalNote")
	public String getInvestigationClinicalNote() {
		return investigationClinicalNote;
	}

	@JsonSetter("investigationClinicalNote")
	public void setInvestigationClinicalNote(String investigationClinicalNote) {
		this.investigationClinicalNote = investigationClinicalNote;
	}

	@JsonGetter("investigationUrgentFlag")
	public int getInvestigationUrgentFlag() {
		return investigationUrgentFlag;
	}

	@JsonSetter("investigationUrgentFlag")
	public void setInvestigationUrgentFlag(int investigationUrgentFlag) {
		this.investigationUrgentFlag = investigationUrgentFlag;
	}

	@JsonGetter("ipdservicetype")
	public String getIpdservicetype() {
		return ipdservicetype;
	}

	@JsonSetter("ipdservicetype")
	public void setIpdservicetype(String ipdservicetype) {
		this.ipdservicetype = ipdservicetype;
	}

	@JsonGetter("suggest")
	public String getSuggest() {
		return suggest;
	}

	@JsonSetter("suggest")
	public void setSuggest(String suggest) {
		this.suggest = suggest;
	}

	@JsonGetter("tname")
	public String getTName() {
		return tName;
	}

	@JsonSetter("tname")
	public void setTName(String tName) {
		this.tName = tName;
	}

	@JsonGetter("id")
	public int getId() {
		return id;
	}

	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}

	@JsonGetter("listTreatmentTests")
	public List<TreatmentTests> getListTreatmentTests() {
		return listTreatmentTests;
	}

	@JsonSetter("listTreatmentTests")
	public void setListTreatmentTests(List<TreatmentTests> arrTRTest) {
		this.listTreatmentTests = arrTRTest;
	}

	@JsonGetter("test_report")
	public String getTest_report() {
		return test_report;
	}

	@JsonSetter("test_report")
	public void setTest_report(String test_report) {
		this.test_report = test_report;
	}

	@JsonGetter("test_ID")
	public int getTest_ID() {
		return test_ID;
	}

	@JsonSetter("test_ID")
	public void setTest_ID(int test_ID) {
		this.test_ID = test_ID;
	}

	@JsonSetter("testList")
	public void setTestList(List<Test> testList) {
		this.testList = testList;
	}
	
	@JsonGetter("testList")
	public List<Test> getTestList() {
		return testList;
	}

	@JsonGetter("charges1")
	public float getCharges1() {
		return charges1;
	}

	@JsonSetter("charges1")
	public void setCharges1(float charges1) {
		this.charges1 = charges1;
	}

	@JsonGetter("asignBy")
	public int getAsignBy() {
		return asignBy;
	}

	@JsonSetter("asignBy")
	public void setAsignBy(int asignBy) {
		this.asignBy = asignBy;
	}

	@JsonGetter("qty")
	public float getQty() {
		return qty;
	}

	@JsonSetter("qty")
	public void setQty(float qty) {
		this.qty = qty;
	}

	@JsonGetter("testPatientCharges")
	public float getTestPatientCharges() {
		return testPatientCharges;
	}

	@JsonSetter("testPatientCharges")
	public void setTestPatientCharges(float testPatientCharges) {
		this.testPatientCharges = testPatientCharges;
	}

	@JsonGetter("testChargesApplicableFlag")
	public String getTestChargesApplicableFlag() {
		return testChargesApplicableFlag;
	}

	@JsonSetter("testChargesApplicableFlag")
	public void setTestChargesApplicableFlag(String testChargesApplicableFlag) {
		this.testChargesApplicableFlag = testChargesApplicableFlag;
	}

	@JsonGetter("bpn")
	public String getBodyPartName() {
		return bodyPartName;
	}
	@JsonSetter("bpn")
	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
	}
	@JsonGetter("GroupName")
	public String getGroupName() {
		return GroupName;
	}
	@JsonSetter("GroupName")
	public void setGroupName(String groupName) {
		GroupName = groupName;
	}
	@JsonGetter("groupId")
	public int getGroupId() {
		return GroupId;
	}
	@JsonSetter("groupId")
	public void setGroupId(int groupId) {
		GroupId = groupId;
	}
	@JsonGetter("hallWsTestChrgsList")
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	@JsonSetter("hallWsTestChrgsList")
	public void setHallWsTestChrgsList(List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}


}
