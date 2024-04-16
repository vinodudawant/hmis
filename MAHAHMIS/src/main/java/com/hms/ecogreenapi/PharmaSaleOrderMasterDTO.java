package com.hms.ecogreenapi;


import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Transient;

public class PharmaSaleOrderMasterDTO {

	int order_value;
	String branch_code;
	String order_no;
	String  order_date;
    String  act_code;
     String customer_name;
     String email ;
     String doctor_name;
     String  customer_id;
     String customer_mobile;
     String shipping_add1; 
   String shipping_add2;
    String  shipping_city;
     String shipping_pin;
     String  shipping_state;
     String shipping_mobile_no;
     String billing_name;
     String billing_add1;
     String billing_add2;
     String billing_city;
     String billing_pin;
     String billing_state;
     String billing_mobile_no;
     String discount_per;
     String urgent;
     String conversion;
		/* String conversion_invdc; */
     String conversion_dc_inv;
     String inter_sale;
     String  disc_rs;
     int  payment_method;
     String post;
     
     String c_reg_no;// added for treatmentId
     String  c_ref_no;// added for departmentId
     String c_reason;// added for store Id
     String c_note;// added for sponsor details
     
     @Transient
     String remark;
     
     @Transient
     List<PharmaSaleOrderSlaveDTO>  item;
     
	public int getOrder_value() {
		return order_value;
	}
	public void setOrder_value(int order_value) {
		this.order_value = order_value;
	}
	public String getBranch_code() {
		return branch_code;
	}
	public void setBranch_code(String branch_code) {
		this.branch_code = branch_code;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	
	public String getAct_code() {
		return act_code;
	}
	public void setAct_code(String act_code) {
		this.act_code = act_code;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public String getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_mobile() {
		return customer_mobile;
	}
	public void setCustomer_mobile(String customer_mobile) {
		this.customer_mobile = customer_mobile;
	}
	public String getShipping_add1() {
		return shipping_add1;
	}
	public void setShipping_add1(String shipping_add1) {
		this.shipping_add1 = shipping_add1;
	}
	public String getShipping_add2() {
		return shipping_add2;
	}
	public void setShipping_add2(String shipping_add2) {
		this.shipping_add2 = shipping_add2;
	}
	public String getShipping_city() {
		return shipping_city;
	}
	public void setShipping_city(String shipping_city) {
		this.shipping_city = shipping_city;
	}
	public String getShipping_pin() {
		return shipping_pin;
	}
	public void setShipping_pin(String shipping_pin) {
		this.shipping_pin = shipping_pin;
	}
	public String getShipping_state() {
		return shipping_state;
	}
	public void setShipping_state(String shipping_state) {
		this.shipping_state = shipping_state;
	}
	public String getShipping_mobile_no() {
		return shipping_mobile_no;
	}
	public void setShipping_mobile_no(String shipping_mobile_no) {
		this.shipping_mobile_no = shipping_mobile_no;
	}
	public String getBilling_name() {
		return billing_name;
	}
	public void setBilling_name(String billing_name) {
		this.billing_name = billing_name;
	}
	public String getBilling_add1() {
		return billing_add1;
	}
	public void setBilling_add1(String billing_add1) {
		this.billing_add1 = billing_add1;
	}
	public String getBilling_add2() {
		return billing_add2;
	}
	public void setBilling_add2(String billing_add2) {
		this.billing_add2 = billing_add2;
	}
	public String getBilling_city() {
		return billing_city;
	}
	public void setBilling_city(String billing_city) {
		this.billing_city = billing_city;
	}
	public String getBilling_pin() {
		return billing_pin;
	}
	public void setBilling_pin(String billing_pin) {
		this.billing_pin = billing_pin;
	}
	public String getBilling_state() {
		return billing_state;
	}
	public void setBilling_state(String billing_state) {
		this.billing_state = billing_state;
	}
	public String getBilling_mobile_no() {
		return billing_mobile_no;
	}
	public void setBilling_mobile_no(String billing_mobile_no) {
		this.billing_mobile_no = billing_mobile_no;
	}
	public String getDiscount_per() {
		return discount_per;
	}
	public void setDiscount_per(String discount_per) {
		this.discount_per = discount_per;
	}
	public String getUrgent() {
		return urgent;
	}
	public void setUrgent(String urgent) {
		this.urgent = urgent;
	}
	public String getConversion() {
		return conversion;
	}
	public void setConversion(String conversion) {
		this.conversion = conversion;
	}
	
	public String getInter_sale() {
		return inter_sale;
	}
	public void setInter_sale(String inter_sale) {
		this.inter_sale = inter_sale;
	}
	public String getDisc_rs() {
		return disc_rs;
	}
	public void setDisc_rs(String disc_rs) {
		this.disc_rs = disc_rs;
	}
	public int getPayment_method() {
		return payment_method;
	}
	public void setPayment_method(int payment_method) {
		this.payment_method = payment_method;
	}
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	public List<PharmaSaleOrderSlaveDTO> getItem() {
		return item;
	}
	public void setItem(List<PharmaSaleOrderSlaveDTO> item) {
		this.item = item;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getConversion_dc_inv() {
		return conversion_dc_inv;
	}
	public void setConversion_dc_inv(String conversion_dc_inv) {
		this.conversion_dc_inv = conversion_dc_inv;
	}
	public String getOrder_date() {
		return order_date;
	}
	public void setOrder_date(String order_date) {
		this.order_date = order_date;
	}
	public String getC_reg_no() {
		return c_reg_no;
	}
	public void setC_reg_no(String c_reg_no) {
		this.c_reg_no = c_reg_no;
	}
	public String getC_ref_no() {
		return c_ref_no;
	}
	public void setC_ref_no(String c_ref_no) {
		this.c_ref_no = c_ref_no;
	}
	public String getC_reason() {
		return c_reason;
	}
	public void setC_reason(String c_reason) {
		this.c_reason = c_reason;
	}
	public String getC_note() {
		return c_note;
	}
	public void setC_note(String c_note) {
		this.c_note = c_note;
	}
	@Override
	public String toString() {
		return "PharmaSaleOrderMasterDTO [order_value=" + order_value + ", branch_code=" + branch_code + ", order_no="
				+ order_no + ", order_date=" + order_date + ", act_code=" + act_code + ", customer_name="
				+ customer_name + ", email=" + email + ", doctor_name=" + doctor_name + ", customer_id=" + customer_id
				+ ", customer_mobile=" + customer_mobile + ", shipping_add1=" + shipping_add1 + ", shipping_add2="
				+ shipping_add2 + ", shipping_city=" + shipping_city + ", shipping_pin=" + shipping_pin
				+ ", shipping_state=" + shipping_state + ", shipping_mobile_no=" + shipping_mobile_no
				+ ", billing_name=" + billing_name + ", billing_add1=" + billing_add1 + ", billing_add2=" + billing_add2
				+ ", billing_city=" + billing_city + ", billing_pin=" + billing_pin + ", billing_state=" + billing_state
				+ ", billing_mobile_no=" + billing_mobile_no + ", discount_per=" + discount_per + ", urgent=" + urgent
				+ ", conversion=" + conversion + ", conversion_dc_inv=" + conversion_dc_inv + ", inter_sale="
				+ inter_sale + ", disc_rs=" + disc_rs + ", payment_method=" + payment_method + ", post=" + post
				+ ", c_reg_no=" + c_reg_no + ", c_ref_no=" + c_ref_no + ", c_reason=" + c_reason + ", c_note=" + c_note
				+ ", remark=" + remark + ", item=" + item + "]";
	}
	
	
	
	
	
	
	
     
}
