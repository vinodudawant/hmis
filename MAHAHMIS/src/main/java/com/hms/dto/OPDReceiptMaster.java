package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonSetter;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OPDReceiptMaster {

	private int idopd_receipt_master;
	private double total;
	private String discount_name;
	private String department_name;
	private String in_charge;
	private String recDate;
	private String recTime;
	private float on_bill_dic_amount;
	private float paid_amount;
	private String payMode;
	private String card_no;
	private String cheque_no;
	private float cash_amt_mode;
	private float card_amt_mode;
	private float cheque_amt_mode;
	private String bank_name;
	private String chk_bank_name;
	private int idipdmodeofpay;
	private String remaining_value;
	private String receiptStatus;
	private String narration;
	private int billID;
	private String billDate;
	private String prev;
	private String testId;
	// RTGS
	private String accno;
	private float rtgs_amt;
	private String ifsc_code;
	private String utr_no;
	private String rtgs_bank_name;
	private float commonAdAmt;
	private String previousPendingType;
	private String billtype;
	private Patient objPatient;
	private Treatment objTreatment;
	
	private String testType;
	private String groupId;
	
	private List<OPDReceiptMaster> listOPDReceiptMaster;
	private List<OPDReceiptComponant> listOPDReceiptComponant;
	
	private String manageNarration;
	
	private int idopd_bill;
	private int idopd_rec_comp;
	private int receipt_id;
	
	@JsonGetter("idopd_bill")
	public int getIdopd_bill() {
		return idopd_bill;
	}
	@JsonSetter("idopd_bill")
	public void setIdopd_bill(int idopd_bill) {
		this.idopd_bill = idopd_bill;
	}
	@JsonGetter("idopd_rec_comp")
	public int getIdopd_rec_comp() {
		return idopd_rec_comp;
	}
	@JsonSetter("idopd_rec_comp")
	public void setIdopd_rec_comp(int idopd_rec_comp) {
		this.idopd_rec_comp = idopd_rec_comp;
	}
	@JsonGetter("receipt_id")
	public int getReceipt_id() {
		return receipt_id;
	}
	@JsonSetter("receipt_id")
	public void setReceipt_id(int receipt_id) {
		this.receipt_id = receipt_id;
	}
	
	@JsonGetter("managNrr")
	public String getManageNarration() {
		return manageNarration;
	}
	@JsonSetter("managNrr")
	public void setManageNarration(String manageNarration) {
		this.manageNarration = manageNarration;
	}

	@JsonGetter("listOPDReceiptComponant")
	public List<OPDReceiptComponant> getListOPDReceiptComponant() {
		return listOPDReceiptComponant;
	}

	@JsonSetter("listOPDReceiptComponant")
	public void setListOPDReceiptComponant(
			List<OPDReceiptComponant> listOPDReceiptComponant) {
		this.listOPDReceiptComponant = listOPDReceiptComponant;
	}

	@JsonGetter("rtgs_bank_name")
	public String getRtgs_bank_name() {
		return rtgs_bank_name;
	}

	@JsonSetter("rtgs_bank_name")
	public void setRtgs_bank_name(String rtgs_bank_name) {
		this.rtgs_bank_name = rtgs_bank_name;
	}

	@JsonGetter("accno")
	public String getAccno() {
		return accno;
	}

	@JsonSetter("accno")
	public void setAccno(String accno) {
		this.accno = accno;
	}

	@JsonGetter("rtgs_amt")
	public float getRtgs_amt() {
		return rtgs_amt;
	}

	@JsonSetter("rtgs_amt")
	public void setRtgs_amt(float rtgs_amt) {
		this.rtgs_amt = rtgs_amt;
	}

	@JsonGetter("ifsc_code")
	public String getIfsc_code() {
		return ifsc_code;
	}

	@JsonSetter("ifsc_code")
	public void setIfsc_code(String ifsc_code) {
		this.ifsc_code = ifsc_code;
	}

	@JsonGetter("utr_no")
	public String getUtr_no() {
		return utr_no;
	}

	@JsonSetter("utr_no")
	public void setUtr_no(String utr_no) {
		this.utr_no = utr_no;
	}

	@JsonGetter("billDate")
	public String getBillDate() {
		return billDate;
	}

	@JsonSetter("billDate")
	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	@JsonGetter("billID")
	public int getBillID() {
		return billID;
	}

	@JsonSetter("billID")
	public void setBillID(int billID) {
		this.billID = billID;
	}

	@JsonGetter("rs")
	public String getReceiptStatus() {
		return receiptStatus;
	}

	@JsonSetter("rs")
	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	@JsonGetter("rval")
	public String getRemaining_value() {
		return remaining_value;
	}

	@JsonSetter("rval")
	public void setRemaining_value(String remaining_value) {
		this.remaining_value = remaining_value;
	}

	@JsonGetter("idipd")
	public int getIdipdmodeofpay() {
		return idipdmodeofpay;
	}

	@JsonSetter("idipd")
	public void setIdipdmodeofpay(int idipdmodeofpay) {
		this.idipdmodeofpay = idipdmodeofpay;
	}

	@JsonGetter("bname")
	public String getBank_name() {
		return bank_name;
	}

	@JsonSetter("bname")
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	@JsonGetter("idrm")
	public int getIdopd_receipt_master() {
		return idopd_receipt_master;
	}

	@JsonSetter("idrm")
	public void setIdopd_receipt_master(int idopd_receipt_master) {
		this.idopd_receipt_master = idopd_receipt_master;
	}

	@JsonGetter("listRecMaster")
	public List<OPDReceiptMaster> getListOPDReceiptMaster() {
		return listOPDReceiptMaster;
	}

	@JsonSetter("listRecMaster")
	public void setListOPDReceiptMaster(
			List<OPDReceiptMaster> listOPDReceiptMaster) {
		this.listOPDReceiptMaster = listOPDReceiptMaster;
	}

	@JsonGetter("inCharge")
	public String getIn_charge() {
		return in_charge;
	}

	@JsonSetter("inCharge")
	public void setIn_charge(String in_charge) {
		this.in_charge = in_charge;
	}

	@JsonGetter("deptName")
	public String getDepartment_name() {
		return department_name;
	}

	@JsonSetter("deptName")
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}

	@JsonGetter("discName")
	public String getDiscount_name() {
		return discount_name;
	}

	@JsonSetter("discName")
	public void setDiscount_name(String discount_name) {
		this.discount_name = discount_name;
	}

	@JsonGetter("total")
	public double getTotal() {
		return total;
	}

	@JsonSetter("total")
	public void setTotal(double total) {
		this.total = total;
	}

	@JsonGetter("recDate")
	public String getRecDate() {
		return recDate;
	}

	@JsonSetter("recDate")
	public void setRecDate(String recDate) {
		this.recDate = recDate;
	}

	@JsonGetter("onBilDis")
	public float getOn_bill_dic_amount() {
		return on_bill_dic_amount;
	}

	@JsonSetter("onBilDis")
	public void setOn_bill_dic_amount(float on_bill_dic_amount) {
		this.on_bill_dic_amount = on_bill_dic_amount;
	}

	@JsonGetter("pdAmt")
	public float getPaid_amount() {
		return paid_amount;
	}

	@JsonSetter("pdAmt")
	public void setPaid_amount(float paid_amount) {
		this.paid_amount = paid_amount;
	}

	@JsonGetter("pay_mode")
	public String getPayMode() {
		return payMode;
	}

	@JsonSetter("pay_mode")
	public void setPayMode(String payMode) {
		this.payMode = payMode;
	}

	@JsonGetter("card_no")
	public String getCard_no() {
		return card_no;
	}

	@JsonSetter("card_no")
	public void setCard_no(String cardNum) {
		this.card_no = cardNum;
	}

	@JsonGetter("cash_amt")
	public float getCash_amt_mode() {
		return cash_amt_mode;
	}

	@JsonSetter("cash_amt")
	public void setCash_amt_mode(float cash_amt_mode) {
		this.cash_amt_mode = cash_amt_mode;
	}

	@JsonGetter("card_amt")
	public float getCard_amt_mode() {
		return card_amt_mode;
	}

	@JsonSetter("card_amt")
	public void setCard_amt_mode(float card_amt_mode) {
		this.card_amt_mode = card_amt_mode;
	}

	@JsonGetter("narr")
	public String getNarration() {
		return narration;
	}

	@JsonSetter("narr")
	public void setNarration(String narration) {
		this.narration = narration;
	}

	@JsonGetter("chq_no")
	public String getCheque_no() {
		return cheque_no;
	}

	@JsonSetter("chq_no")
	public void setCheque_no(String cheque_no) {
		this.cheque_no = cheque_no;
	}

	@JsonGetter("chq_amt")
	public float getCheque_amt_mode() {
		return cheque_amt_mode;
	}

	@JsonSetter("chq_amt")
	public void setCheque_amt_mode(float cheque_amt_mode) {
		this.cheque_amt_mode = cheque_amt_mode;
	}

	@JsonGetter("chq_bank")
	public String getChk_bank_name() {
		return chk_bank_name;
	}

	@JsonSetter("chq_bank")
	public void setChk_bank_name(String chk_bank_name) {
		this.chk_bank_name = chk_bank_name;
	}

	@JsonGetter("prev")
	public String getPrev() {
		return prev;
	}

	@JsonSetter("prev")
	public void setPrev(String prev) {
		this.prev = prev;
	}
	
	@JsonGetter("tstid")
	public String getTestId() {
		return testId;
	}

	@JsonSetter("tstid")
	public void setTestId(String testId) {
		this.testId = testId;
	}
	@JsonGetter("commonAdAmt")
	public float getCommonAdAmt() {
		return commonAdAmt;
	}
	@JsonSetter("commonAdAmt")
	public void setCommonAdAmt(float commonAdAmt) {
		this.commonAdAmt = commonAdAmt;
	}

	@JsonGetter("previousPendingType")
	public String getPreviousPendingType() {
		return previousPendingType;
	}
	@JsonSetter("previousPendingType")
	public void setPreviousPendingType(String previousPendingType) {
		this.previousPendingType = previousPendingType;
	}
	@JsonGetter("billtype")
	public String getBilltype() {
		return billtype;
	}
	@JsonSetter("billtype")
	public void setBilltype(String billtype) {
		this.billtype = billtype;
	}
	@JsonGetter("objPatient")
	public Patient getObjPatient() {
		return objPatient;
	}
	@JsonSetter("objPatient")
	public void setObjPatient(Patient objPatient) {
		this.objPatient = objPatient;
	}
	@JsonGetter("objTreatment")
	public Treatment getObjTreatment() {
		return objTreatment;
	}
	@JsonSetter("objTreatment")
	public void setObjTreatment(Treatment objTreatment) {
		this.objTreatment = objTreatment;
	}
	@JsonGetter("recTime")
	public String getRecTime() {
		return recTime;
	}
	@JsonSetter("recTime")
	public void setRecTime(String recTime) {
		this.recTime = recTime;
	}

	@JsonGetter("ttype")
	public String getTestType() {
		return testType;
	}
	@JsonSetter("ttype")
	public void setTestType(String testType) {
		this.testType = testType;
	}
	@JsonGetter("gid")
	public String getGroupId() {
		return groupId;
	}
	@JsonSetter("gid")
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

}
