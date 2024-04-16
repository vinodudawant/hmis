package com.hms.dto;

import java.util.List;
import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OpdBillParticular {
	
	private Integer idOpdBill;
	private String testType;
	private String testName;
	private Integer idTest;
	private float testRate;
	private float testQty;
	private float testAmt;
	private float testConc;
	private float testPayable;
	private Integer idTreatment;
	private Integer assignTestId;
	private String billFlag;
	private String msg;
	private String testStatus;
	private String billTypeFlag;
	private String consul;
	private String labresultFlag;
	private int invsGroupID;
	
	//opd consumable list
	private List<InventoryConsumptionItemSlaveDTO> ltInventoryConsumptionItemSlaveDTOs;
	@JsonGetter("ltInventoryConsumptionItemSlaveDTOs")
	public List<InventoryConsumptionItemSlaveDTO> getLtInventoryConsumptionItemSlaveDTOs() {
		return ltInventoryConsumptionItemSlaveDTOs;
	}

	@JsonSetter("ltInventoryConsumptionItemSlaveDTOs")
	public void setLtInventoryConsumptionItemSlaveDTOs(
			List<InventoryConsumptionItemSlaveDTO> ltInventoryConsumptionItemSlaveDTOs) {
		this.ltInventoryConsumptionItemSlaveDTOs = ltInventoryConsumptionItemSlaveDTOs;
	}
		

	private List<OpdBillParticular> listOpdBill;
	private List<BillMaster> listBillMaster;
	
	private List<Patient> patientlist;
	private List<Doctor> doctorlist;
	
	private long patcount;
	private String docname;
	private String totalamount;
	private Integer discount;
	private String payable;
	private Integer doctor_charges;
	private String querytype;
	
	public String getQuerytype() {
		return querytype;
	}

	public void setQuerytype(String querytype) {
		this.querytype = querytype;
	}

	public Integer getDoctor_charges() {
		return doctor_charges;
	}

	public void setDoctor_charges(Integer doctor_charges) {
		this.doctor_charges = doctor_charges;
	}

	public String getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(String totalamount) {
		this.totalamount = totalamount;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public String getPayable() {
		return payable;
	}

	public void setPayable(String payable) {
		this.payable = payable;
	}

	public String getDocname() {
		return docname;
	}

	public void setDocname(String docname) {
		this.docname = docname;
	}

	public long getPatcount() {
		return patcount;
	}

	public void setPatcount(long patcount) {
		this.patcount = patcount;
	}

	public List<Patient> getPatientlist() {
		return patientlist;
	}

	public void setPatientlist(List<Patient> patientlist) {
		this.patientlist = patientlist;
	}

	public List<Doctor> getDoctorlist() {
		return doctorlist;
	}

	public void setDoctorlist(List<Doctor> doctorlist) {
		this.doctorlist = doctorlist;
	}


	@JsonGetter("liOpd")
	public List<OpdBillParticular> getListOpdBill() {
		return listOpdBill;
	}
	@JsonSetter("liOpd")
	public void setListOpdBill(List<OpdBillParticular> listOpdBill) {
		this.listOpdBill = listOpdBill;
	}
	
	@JsonGetter("bill_type_flag")
	public String getBillTypeFlag() {
		return billTypeFlag;
	}
	@JsonSetter("bill_type_flag")
	public void setBillTypeFlag(String billTypeFlag) {
		this.billTypeFlag = billTypeFlag;
	}
	@JsonGetter("id_opd_bill")
	public Integer getIdOpdBill() {
		return idOpdBill;
	}
	
	@JsonSetter("id_opd_bill")
	public void setIdOpdBill(Integer idOpdBill) {
		this.idOpdBill = idOpdBill;
	}
	@JsonGetter("test_type")
	public String getTestType() {
		return testType;
	}
	@JsonSetter("test_type")
	public void setTestType(String testType) {
		this.testType = testType;
	}
	@JsonGetter("test_name")
	public String getTestName() {
		return testName;
	}
	@JsonSetter("test_name")
	public void setTestName(String testName) {
		this.testName = testName;
	}
	@JsonGetter("id_test")
	public Integer getIdTest() {
		return idTest;
	}
	@JsonSetter("id_test")
	public void setIdTest(Integer idTest) {
		this.idTest = idTest;
	}
	@JsonGetter("test_rate")
	public float getTestRate() {
		return testRate;
	}
	@JsonSetter("test_rate")
	public void setTestRate(float testRate) {
		this.testRate = testRate;
	}
	@JsonGetter("test_qty")
	public float getTestQty() {
		return testQty;
	}
	@JsonSetter("test_qty")
	public void setTestQty(float testQty) {
		this.testQty = testQty;
	}
	@JsonGetter("test_amt")
	public float getTestAmt() {
		return testAmt;
	}
	@JsonSetter("test_amt")
	public void setTestAmt(float testAmt) {
		this.testAmt = testAmt;
	}
	@JsonGetter("test_conc")
	public float getTestConc() {
		return testConc;
	}
	@JsonSetter("test_conc")
	public void setTestConc(float testConc) {
		this.testConc = testConc;
	}
	@JsonGetter("test_payable")
	public float getTestPayable() {
		return testPayable;
	}
	@JsonSetter("test_payable")
	public void setTestPayable(float testPayable) {
		this.testPayable = testPayable;
	}
	@JsonGetter("id_treatment")
	public Integer getIdTreatment() {
		return idTreatment;
	}
	@JsonSetter("id_treatment")
	public void setIdTreatment(Integer idTreatment) {
		this.idTreatment = idTreatment;
	}
	@JsonGetter("assign_test_id")
	public Integer getAssignTestId() {
		return assignTestId;
	}
	@JsonSetter("assign_test_id")
	public void setAssignTestId(Integer assignTestId) {
		this.assignTestId = assignTestId;
	}
	@JsonGetter("bill_flag")
	public String getBillFlag() {
		return billFlag;
	}
	@JsonSetter("bill_flag")
	public void setBillFlag(String billFlag) {
		this.billFlag = billFlag;
	}
	@JsonGetter("msg")
	public String getMsg() {
		return msg;
	}
	@JsonSetter("msg")
	public void setMsg(String msg) {
		this.msg = msg;
	}
	@JsonGetter("test_status")
	public String getTestStatus() {
		return testStatus;
	}
	@JsonSetter("test_status")
	public void setTestStatus(String string) {
		this.testStatus = string;
	}

	@JsonGetter("listBillMaster")
	public List<BillMaster> getListBillMaster() {
		return listBillMaster;
	}
	@JsonSetter("listBillMaster")
	public void setListBillMaster(List<BillMaster> listBillMaster) {
		this.listBillMaster = listBillMaster;
	}
	@JsonGetter("consul")
	public String getConsul() {
		return consul;
	}
	@JsonSetter("consul")
	public void setConsul(String consul) {
		this.consul = consul;
	}
	@JsonGetter("lrflag")
	public String getLabresultFlag() {
		return labresultFlag;
	}
	@JsonSetter("lrflag")
	public void setLabresultFlag(String labresultFlag) {
		this.labresultFlag = labresultFlag;
	}
	@JsonGetter("igi")
	public int getInvsGroupID() {
		return invsGroupID;
	}
	
	@JsonSetter("igi")
	public void setInvsGroupID(int invsGroupID) {
		this.invsGroupID = invsGroupID;
	}
	
}
