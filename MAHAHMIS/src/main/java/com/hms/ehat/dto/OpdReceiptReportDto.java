package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class OpdReceiptReportDto {
	
	private int id;
	
	private String patient_name; 
	
	private int bill_id;
	
	private int rec_id;
	
	
	private Date bill_date_time; 
	
	private Date created_date_time;
	
	private Date deleted_date_time;
	
	private String deleted;
	
	private String deleted_user_name;
	
	private String delete_remark; 
	
	private int treatment_id;
	
	private int against_id;
	
	private String pay_name;
	
	private String card_number;

	private String bank_name;
	
	private double rec_amount;
	
	private String referred_by;
	
	private String unit_name;
	
	private String user_name;
	
	private Integer unit_id;	

	private Integer userId;
	
	private String callFrom;
	
	private String fDate;
	
	private  String tDate;
	
	private Integer pay_mode;

	private List<OpdReceiptReportDto> listOpdReceiptReportDto;
	
	

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getCallFrom() {
		return callFrom;
	}

	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}

	public String getfDate() {
		return fDate;
	}

	public void setfDate(String fDate) {
		this.fDate = fDate;
	}

	public String gettDate() {
		return tDate;
	}

	public void settDate(String tDate) {
		this.tDate = tDate;
	}

	public List<OpdReceiptReportDto> getListOpdReceiptReportDto() {
		return listOpdReceiptReportDto;
	}

	public void setListOpdReceiptReportDto(List<OpdReceiptReportDto> listOpdReceiptReportDto) {
		this.listOpdReceiptReportDto = listOpdReceiptReportDto;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}
	
	public Integer getPay_mode() {
		return pay_mode;
	}

	public void setPay_mode(Integer pay_mode) {
		this.pay_mode = pay_mode;
	}
	
	public String getCard_number() {
		return card_number;
	}

	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public int getBill_id() {
		return bill_id;
	}

	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}

	public int getRec_id() {
		return rec_id;
	}

	public void setRec_id(int rec_id) {
		this.rec_id = rec_id;
	}

	public Date getBill_date_time() {
		return bill_date_time;
	}

	public void setBill_date_time(Date bill_date_time) {
		this.bill_date_time = bill_date_time;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public Date getDeleted_date_time() {
		return deleted_date_time;
	}

	public void setDeleted_date_time(Date deleted_date_time) {
		this.deleted_date_time = deleted_date_time;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDeleted_user_name() {
		return deleted_user_name;
	}

	public void setDeleted_user_name(String deleted_user_name) {
		this.deleted_user_name = deleted_user_name;
	}

	public String getDelete_remark() {
		return delete_remark;
	}

	public void setDelete_remark(String delete_remark) {
		this.delete_remark = delete_remark;
	}

	public int getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	public int getAgainst_id() {
		return against_id;
	}

	public void setAgainst_id(int against_id) {
		this.against_id = against_id;
	}

	public String getPay_name() {
		return pay_name;
	}

	public void setPay_name(String pay_name) {
		this.pay_name = pay_name;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public double getRec_amount() {
		return rec_amount;
	}

	public void setRec_amount(double rec_amount) {
		this.rec_amount = rec_amount;
	}

	public String getReferred_by() {
		return referred_by;
	}

	public void setReferred_by(String referred_by) {
		this.referred_by = referred_by;
	}

	public String getUnit_name() {
		return unit_name;
	}

	public void setUnit_name(String unit_name) {
		this.unit_name = unit_name;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}


	
}
