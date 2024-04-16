package com.hms.dto;

import java.util.Date;
import java.util.List;



public class MotivatorVoucherDetailsDTO {

	private int idMotivatorVoucherDetails = 0;
	private Date date = null;
	private int idAuthorisedBy =0;
	private String doctorName = null;
	private int	doctorId = 0;
	private String payTo = null;
	private int idService = 0;
	private String narration = null;
	private double totalAmount = 0;
	private double totalDiscount = 0;
	private double totalReduction = 0;
	private double totalMotivation = 0;
	private double tds = 0;
	private double amountPayable=0;
	private String status= null;
	private int insertedBy=0;
	private Date insertedDateTime = null;
	private int cancelBy = 0;
	private String cancelNarration = null;
	private String cancel_date_time =null;
	private String cancelByName=null;
	private String serviceName= null;
	private String insertedByName = null;
	private String authorisedByName = null;
	
	//private MotivatorPaymentDetails motivatorPaymentDetails = null;
	private List<MotivatorPaymentDetails> listmopaydet = null;
	private List<MotivatorVoucherDetailsDTO> listmotivatorVoucherDetails = null;

	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getIdMotivatorVoucherDetails() {
		return idMotivatorVoucherDetails;
	}
	public void setIdMotivatorVoucherDetails(int idMotivatorVoucherDetails) {
		this.idMotivatorVoucherDetails = idMotivatorVoucherDetails;
	}
	public int getIdAuthorisedBy() {
		return idAuthorisedBy;
	}
	public void setIdAuthorisedBy(int idAuthorisedBy) {
		this.idAuthorisedBy = idAuthorisedBy;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public String getPayTo() {
		return payTo;
	}
	public void setPayTo(String payTo) {
		this.payTo = payTo;
	}
	public int getIdService() {
		return idService;
	}
	public void setIdService(int idService) {
		this.idService = idService;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public double getTotalDiscount() {
		return totalDiscount;
	}
	public void setTotalDiscount(double totalDiscount) {
		this.totalDiscount = totalDiscount;
	}
	public double getTotalReduction() {
		return totalReduction;
	}
	public void setTotalReduction(double totalReduction) {
		this.totalReduction = totalReduction;
	}
	public double getTotalMotivation() {
		return totalMotivation;
	}
	public void setTotalMotivation(double totalMotivation) {
		this.totalMotivation = totalMotivation;
	}
	public double getTds() {
		return tds;
	}
	public void setTds(double tds) {
		this.tds = tds;
	}
	public double getAmountPayable() {
		return amountPayable;
	}
	public void setAmountPayable(double amountPayable) {
		this.amountPayable = amountPayable;
	}
	public List<MotivatorVoucherDetailsDTO> getListmotivatorVoucherDetails() {
		return listmotivatorVoucherDetails;
	}
	public void setListmotivatorVoucherDetails(
			List<MotivatorVoucherDetailsDTO> listmotivatorVoucherDetails) {
		this.listmotivatorVoucherDetails = listmotivatorVoucherDetails;
	}
	public List<MotivatorPaymentDetails> getListmopaydet() {
		return listmopaydet;
	}
	public void setListmopaydet(List<MotivatorPaymentDetails> listmopaydet) {
		this.listmopaydet = listmopaydet;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getInsertedBy() {
		return insertedBy;
	}
	public void setInsertedBy(int insertedBy) {
		this.insertedBy = insertedBy;
	}
	public Date getInsertedDateTime() {
		return insertedDateTime;
	}
	public void setInsertedDateTime(Date insertedDateTime) {
		this.insertedDateTime = insertedDateTime;
	}
	public int getCancelBy() {
		return cancelBy;
	}
	public void setCancelBy(int cancelBy) {
		this.cancelBy = cancelBy;
	}
	public String getCancelNarration() {
		return cancelNarration;
	}
	public void setCancelNarration(String cancelNarration) {
		this.cancelNarration = cancelNarration;
	}
	public String getCancel_date_time() {
		return cancel_date_time;
	}
	public void setCancel_date_time(String cancel_date_time) {
		this.cancel_date_time = cancel_date_time;
	}
	public String getCancelByName() {
		return cancelByName;
	}
	public void setCancelByName(String cancelByName) {
		this.cancelByName = cancelByName;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getInsertedByName() {
		return insertedByName;
	}
	public void setInsertedByName(String insertedByName) {
		this.insertedByName = insertedByName;
	}
	public String getAuthorisedByName() {
		return authorisedByName;
	}
	public void setAuthorisedByName(String authorisedByName) {
		this.authorisedByName = authorisedByName;
	}	
}
