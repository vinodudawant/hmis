package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class BillMaster implements Serializable {

	private static final long serialVersionUID = 1L;

	private int bill_id;
	private int treatment_ID;
	private String bill_date;
	private Float total_amount;
	private Float paid_amount;
	private int updated_by;
	private Float on_bill_dic_amount;
	private Float remain_amount;
	private String discount_notes;
	private List<BillMaster> billList;
	private String bill_type;
	private String status;
	private Float ipd_paid_amount;
	private String consFollowup;
	private int sp_dic_master_id;
	private Float payable_amount;
	private int doc_fee;
	private String rec_no;
	private Float refund;
	private String seltowards;
	private String reasone;
	private Float hospitalDiscount;
	private String hospitalNarration;
	private int billCount;
	private String sdiscountNm;
	private String refby;
	private int isCredit;
	private Float convertToIpd;
	private String startdate;
	private String bill_date_admin;
	private Patient objPatient;
	private String dept_name;
	private List<BillAdvAmt> billAdvAmtList;
	private String refByName;
	
	
	

	@JsonGetter("refByName")
	public String getRefByName() {
		return refByName;
	}
	@JsonSetter("refByName")
	public void setRefByName(String refByName) {
		this.refByName = refByName;
	}

	@JsonGetter("billAdvAmtList")
	public List<BillAdvAmt> getBillAdvAmtList() {
		return billAdvAmtList;
	}

	@JsonSetter("billAdvAmtList")
	public void setBillAdvAmtList(List<BillAdvAmt> billAdvAmtList) {
		this.billAdvAmtList = billAdvAmtList;
	}

	@JsonGetter
	public String getStartdate() {
		return startdate;
	}

	@JsonSetter
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	@JsonGetter("ctipd")
	public Float getConvertToIpd() {
		return convertToIpd;
	}

	@JsonSetter("ctipd")
	public void setConvertToIpd(Float opdPendingAmount) {
		this.convertToIpd = opdPendingAmount;
	}

	@JsonGetter("isCredit")
	public int getIsCredit() {
		return isCredit;
	}

	@JsonSetter("isCredit")
	public void setIsCredit(int isCredit) {
		this.isCredit = isCredit;
	}

	@JsonGetter("hospdis")
	public Float getHospitalDiscount() {
		return hospitalDiscount;
	}

	@JsonSetter("hospdis")
	public void setHospitalDiscount(Float hospitalDiscount2) {
		this.hospitalDiscount = hospitalDiscount2;
	}

	@JsonGetter("hospnarr")
	public String getHospitalNarration() {
		return hospitalNarration;
	}

	@JsonSetter("hospnarr")
	public void setHospitalNarration(String hospitalNarration) {
		this.hospitalNarration = hospitalNarration;
	}

	public String getSeltowards() {
		return seltowards;
	}

	public void setSeltowards(String seltowards) {
		this.seltowards = seltowards;
	}

	@JsonGetter("rfd")
	public Float getRefund() {
		return refund;
	}

	@JsonSetter("rfd")
	public void setRefund(Float refund) {
		this.refund = refund;
	}

	@JsonGetter("rno")
	public String getRec_no() {
		return rec_no;
	}

	@JsonSetter("rno")
	public void setRec_no(String rec_no) {
		this.rec_no = rec_no;
	}

	@JsonGetter("df")
	public int getDoc_fee() {
		return doc_fee;
	}

	@JsonSetter("df")
	public void setDoc_fee(int doc_fee) {
		this.doc_fee = doc_fee;
	}

	@JsonGetter("bda")
	public String getBill_date_admin() {
		return bill_date_admin;
	}

	@JsonSetter("bda")
	public void setBill_date_admin(String bill_date_admin) {
		this.bill_date_admin = bill_date_admin;
	}

	public Patient getObjPatient() {
		return objPatient;
	}

	public void setObjPatient(Patient objPatient) {
		this.objPatient = objPatient;
	}

	/**
	 * @return the on_bill_dic_amount
	 */
	@JsonGetter("da")
	public Float getOn_bill_dic_amount() {
		return on_bill_dic_amount;
	}

	/**
	 * @param on_bill_dic_amount
	 *            the on_bill_dic_amount to set
	 */
	@JsonSetter("da")
	public void setOn_bill_dic_amount(Float on_bill_dic_amount) {
		this.on_bill_dic_amount = on_bill_dic_amount;
	}

	/**
	 * @return the sp_dic_master_id
	 */
	@JsonGetter("sdisc")
	public int getSp_dic_master_id() {
		return sp_dic_master_id;
	}

	/**
	 * @param sp_dic_master_id
	 *            the sp_dic_master_id to set
	 */
	@JsonSetter("sdisc")
	public void setSp_dic_master_id(int sp_dic_master_id) {
		this.sp_dic_master_id = sp_dic_master_id;
	}

	/**
	 * @return the payable_amount
	 */
	@JsonGetter("pay")
	public Float getPayable_amount() {
		return payable_amount;
	}

	/**
	 * @param payable_amount
	 *            the payable_amount to set
	 */
	@JsonSetter("pay")
	public void setPayable_amount(Float payable_amount) {
		this.payable_amount = payable_amount;
	}

	@JsonGetter("ra")
	public Float getRemain_amount() {
		return remain_amount;
	}

	@JsonSetter("ra")
	public void setRemain_amount(Float remain_amount) {
		this.remain_amount = remain_amount;
	}

	/**
	 * @return the bill_type
	 */
	@JsonGetter("bt")
	public String getBill_type() {
		return bill_type;
	}

	/**
	 * @param bill_type
	 *            the bill_type to set
	 */
	@JsonSetter("bt")
	public void setBill_type(String bill_type) {
		this.bill_type = bill_type;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @param ipd_paid_amount
	 *            the ipd_paid_amount to set
	 */
	@JsonGetter("ippaidamt")
	public Float getIpd_paid_amount() {
		return ipd_paid_amount;
	}

	@JsonSetter("ippaidamt")
	public void setIpd_paid_amount(Float ipd_paid_amount) {
		this.ipd_paid_amount = ipd_paid_amount;
	}

	/**
	 * @param consFollowup
	 *            the consFollowup to set
	 */
	@JsonGetter("consFollowup")
	public String getConsFollowup() {
		return consFollowup;
	}

	@JsonSetter("consFollowup")
	public void setConsFollowup(String consFollowup) {
		this.consFollowup = consFollowup;
	}

	/**
	 * @return the billList
	 */
	@JsonGetter("bl")
	public List<BillMaster> getBillList() {
		return billList;
	}

	/**
	 * @param billList
	 *            the billList to set
	 */
	@JsonSetter("bl")
	public void setBillList(List<BillMaster> billList) {
		this.billList = billList;
	}

	/**
	 * @param bill_id
	 * @param treatment_ID
	 * @param bill_date
	 * @param total_amount
	 * @param paid_amount
	 * @param updated_by
	 * @param discount_amount
	 * @param discount_notes
	 */
	public BillMaster(int bill_id, int treatment_ID, String bill_date,
			Float total_amount, Float paid_amount, int updated_by,
			Float discount_amount, String discount_notes) {
		this.bill_id = bill_id;
		this.treatment_ID = treatment_ID;
		this.bill_date = bill_date;
		this.total_amount = total_amount;
		this.paid_amount = paid_amount;
		this.updated_by = updated_by;

		this.discount_notes = discount_notes;
	}

	public BillMaster() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the bill_id
	 */

	@JsonGetter("sdiscNm")
	public String getSdiscountNm() {
		return sdiscountNm;
	}

	@JsonSetter("sdiscNm")
	public void setSdiscountNm(String sdiscountNm) {
		this.sdiscountNm = sdiscountNm;
	}

	@JsonGetter("id")
	public int getBill_id() {
		return bill_id;
	}

	/**
	 * @param bill_id
	 *            the bill_id to set
	 */
	@JsonSetter("id")
	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("tid")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("tid")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	/**
	 * @return the bill_date
	 */
	@JsonGetter("bd")
	public String getBill_date() {
		return bill_date;
	}

	/**
	 * @param bill_date
	 *            the bill_date to set
	 */
	@JsonSetter("bd")
	public void setBill_date(String bill_date) {
		this.bill_date = bill_date;
	}

	/**
	 * @return the total_amount
	 */
	@JsonGetter("ta")
	public Float getTotal_amount() {
		return total_amount;
	}

	/**
	 * @param total_amount
	 *            the total_amount to set
	 */
	@JsonSetter("ta")
	public void setTotal_amount(Float total_amount) {
		this.total_amount = total_amount;
	}

	/**
	 * @return the paid_amount
	 */
	@JsonGetter("pa")
	public Float getPaid_amount() {
		return paid_amount;
	}

	/**
	 * @param paid_amount
	 *            the paid_amount to set
	 */
	@JsonSetter("pa")
	public void setPaid_amount(Float paid_amount) {
		this.paid_amount = paid_amount;
	}

	/**
	 * @return the updated_by
	 */
	@JsonGetter("ub")
	public int getUpdated_by() {
		return updated_by;
	}

	/**
	 * @param updated_by
	 *            the updated_by to set
	 */
	@JsonSetter("ub")
	public void setUpdated_by(int updated_by) {
		this.updated_by = updated_by;
	}

	/**
	 * @return the discount_notes
	 */
	@JsonGetter("dn")
	public String getDiscount_notes() {
		return discount_notes;
	}

	/**
	 * @param discount_notes
	 *            the discount_notes to set
	 */
	@JsonSetter("dn")
	public void setDiscount_notes(String discount_notes) {
		this.discount_notes = discount_notes;
	}

	/**
	 * @return the serialVersionUID
	 */
	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	@JsonGetter("rb")
	public String getRefby() {
		return refby;
	}

	@JsonSetter("rb")
	public void setRefby(String refby) {
		this.refby = refby;
	}

	@JsonGetter("rea")
	public String getReasone() {
		return reasone;
	}

	@JsonSetter("rea")
	public void setReasone(String reasone) {
		this.reasone = reasone;
	}

	@JsonGetter("billCount")
	public int getBillCount() {
		return billCount;
	}

	@JsonSetter("billCount")
	public void setBillCount(int billCount) {
		this.billCount = billCount;
	}

	@JsonGetter("dept_name")
	public String getDept_name() {
		return dept_name;
	}

	@JsonSetter("dept_name")
	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}

}
