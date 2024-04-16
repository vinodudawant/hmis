package com.hms.dto;

import java.util.Date;
import java.util.List;
import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MotivatorPaymentDetails {

	private int idehat_motivator_payment_details;
	private String test_name = null;
	private int test_id = 0;
	private int test_quantity = 0;
	private int test_group_id =0;
	private String test_group_name = null;
	private int treatment_id = 0;
	private String patient_referred_to = null;
	private String payment_type = null;
	private Date date = null;
	private String time = null;
	private String status = null;
	private int inserted_by = 0 ;
	private int bill_receipt_id = 0;
	private int bill_component_id = 0;
	private double test_actual_rate = 0;
	private double motivator_actual_cut = 0;
	private double test_paid_amount = 0;
	private double discount_on_test = 0;
	private double reduction_amount =0;
	private double motivator_paid_amount = 0;
	private double motivator_unpaid_amount = 0;
	private String motivator_voucher_generated = null;
	private int refered_doctor_id = 0;
	private String bill_receipt_paid_status = null;
	private String patientName=null;
	private String testPartName=null;
	private int year = 0;
	private List<MotivatorPaymentDetails> list_Of_Motivator_Payment_Details = null;
	
	@JsonGetter("idmotipaydt")
	public int getIdehat_motivator_payment_details() {
		return idehat_motivator_payment_details;
	}
	@JsonSetter("idmotipaydt")
	public void setIdehat_motivator_payment_details(
			int idehat_motivator_payment_details) {
		this.idehat_motivator_payment_details = idehat_motivator_payment_details;
	}
	
	@JsonGetter("tname")
	public String getTest_name() {
		return test_name;
	}
	@JsonSetter("tname")
	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}
	
	@JsonGetter("tid")
	public int getTest_id() {
		return test_id;
	}
	@JsonSetter("tid")
	public void setTest_id(int test_id) {
		this.test_id = test_id;
	}
	
	@JsonGetter("tqty")
	public int getTest_quantity() {
		return test_quantity;
	}
	@JsonSetter("tqty")
	public void setTest_quantity(int test_quantity) {
		this.test_quantity = test_quantity;
	}
	
	@JsonGetter("tgid")
	public int getTest_group_id() {
		return test_group_id;
	}
	@JsonSetter("tgid")
	public void setTest_group_id(int test_group_id) {
		this.test_group_id = test_group_id;
	}
	
	@JsonGetter("tgname")
	public String getTest_group_name() {
		return test_group_name;
	}
	@JsonSetter("tgname")
	public void setTest_group_name(String test_group_name) {
		this.test_group_name = test_group_name;
	}
	
	@JsonGetter("trid")
	public int getTreatment_id() {
		return treatment_id;
	}
	@JsonSetter("trid")
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}
	
	@JsonGetter("prefto")
	public String getPatient_referred_to() {
		return patient_referred_to;
	}
	@JsonSetter("prefto")
	public void setPatient_referred_to(String patient_referred_to) {
		this.patient_referred_to = patient_referred_to;
	}
	
	@JsonGetter("payty")
	public String getPayment_type() {
		return payment_type;
	}
	@JsonSetter("payty")
	public void setPayment_type(String payment_type) {
		this.payment_type = payment_type;
	}
	
	@JsonGetter("date")
	public Date getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(Date date) {
		this.date = date;
	}
	
	@JsonGetter("time")
	public String getTime() {
		return time;
	}
	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}
	
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	
	@JsonGetter("insrtby")
	public int getInserted_by() {
		return inserted_by;
	}
	@JsonSetter("insrtby")
	public void setInserted_by(int inserted_by) {
		this.inserted_by = inserted_by;
	}
	
	@JsonGetter("bilrepid")
	public int getBill_receipt_id() {
		return bill_receipt_id;
	}
	@JsonSetter("bilrepid")
	public void setBill_receipt_id(int bill_receipt_id) {
		this.bill_receipt_id = bill_receipt_id;
	}
	
	@JsonGetter("bilcomid")
	public int getBill_component_id() {
		return bill_component_id;
	}
	@JsonSetter("bilcomid")
	public void setBill_component_id(int bill_component_id) {
		this.bill_component_id = bill_component_id;
	}
	
	@JsonGetter("tactrate")
	public double getTest_actual_rate() {
		return test_actual_rate;
	}
	@JsonSetter("tactrate")
	public void setTest_actual_rate(double test_actual_rate) {
		this.test_actual_rate = test_actual_rate;
	}
	
	@JsonGetter("motactcut")
	public double getMotivator_actual_cut() {
		return motivator_actual_cut;
	}
	@JsonSetter("motactcut")
	public void setMotivator_actual_cut(double motivator_actual_cut) {
		this.motivator_actual_cut = motivator_actual_cut;
	}
	
	@JsonGetter("tpaidamt")
	public double getTest_paid_amount() {
		return test_paid_amount;
	}
	@JsonSetter("tpaidamt")
	public void setTest_paid_amount(double test_paid_amount) {
		this.test_paid_amount = test_paid_amount;
	}
	
	@JsonGetter("disontest")
	public double getDiscount_on_test() {
		return discount_on_test;
	}
	@JsonSetter("disontest")
	public void setDiscount_on_test(double discount_on_test) {
		this.discount_on_test = discount_on_test;
	}
	
	@JsonGetter("reducamt")
	public double getReduction_amount() {
		return reduction_amount;
	}
	@JsonSetter("reducamt")
	public void setReduction_amount(double reduction_amount) {
		this.reduction_amount = reduction_amount;
	}
	
	@JsonGetter("motpaidamt")
	public double getMotivator_paid_amount() {
		return motivator_paid_amount;
	}
	@JsonSetter("motpaidamt")
	public void setMotivator_paid_amount(double motivator_paid_amount) {
		this.motivator_paid_amount = motivator_paid_amount;
	}
	
	@JsonGetter("motunpaidamt")
	public double getMotivator_unpaid_amount() {
		return motivator_unpaid_amount;
	}
	@JsonSetter("motunpaidamt")
	public void setMotivator_unpaid_amount(double motivator_unpaid_amount) {
		this.motivator_unpaid_amount = motivator_unpaid_amount;
	}
	
	@JsonGetter("motvochgen")
	public String getMotivator_voucher_generated() {
		return motivator_voucher_generated;
	}
	@JsonSetter("motvochgen")
	public void setMotivator_voucher_generated(String motivator_voucher_generated) {
		this.motivator_voucher_generated = motivator_voucher_generated;
	}
	
	@JsonGetter("listmopaydet")
	public List<MotivatorPaymentDetails> getList_Of_Motivator_Payment_Details() {
		return list_Of_Motivator_Payment_Details;
	}
	@JsonSetter("listmopaydet")
	public void setList_Of_Motivator_Payment_Details(
			List<MotivatorPaymentDetails> list_Of_Motivator_Payment_Details) {
		this.list_Of_Motivator_Payment_Details = list_Of_Motivator_Payment_Details;
	}
	
	@JsonGetter("refdocid")
	public int getRefered_doctor_id() {
		return refered_doctor_id;
	}
	@JsonSetter("refdocid")
	public void setRefered_doctor_id(int refered_doctor_id) {
		this.refered_doctor_id = refered_doctor_id;
	}
	
	@JsonGetter("bilrecpstatus")
	public String getBill_receipt_paid_status() {
		return bill_receipt_paid_status;
	}
	@JsonSetter("bilrecpstatus")
	public void setBill_receipt_paid_status(String bill_receipt_paid_status) {
		this.bill_receipt_paid_status = bill_receipt_paid_status;
	}
	
	@JsonGetter("patientName")
	public String getPatientName() {
		return patientName;
	}
	@JsonSetter("patientName")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	@JsonGetter("testPartName")
	public String getTestPartName() {
		return testPartName;
	}
	
	@JsonSetter("testPartName")
	public void setTestPartName(String testPartName) {
		this.testPartName = testPartName;
	}
	@JsonGetter("year")
	public int getYear() {
		return year;
	}
	@JsonSetter("year")
	public void setYear(int year) {
		this.year = year;
	}
	
}
