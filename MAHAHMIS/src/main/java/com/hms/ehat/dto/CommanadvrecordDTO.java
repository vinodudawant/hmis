package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
@Entity
@Immutable
@Table(name = "commanadv_records_details")

public class CommanadvrecordDTO {

	
		@Id
		@Column(name = "common_adv_id")
		private int commonadv_id;

		@Column(name = "patient_id")
		private int patient_ID;
		@Column(name = "patient_name")
		private String patient_name;
		@Column(name = "treatment_id")
		private int treatmentId;

		@Column(name = "common_adv_amnt")
		private double commonadv_amnt;
		
	

		@Column(name = "total_common_amnt")
		private double total_amnt;
		
		
		
		@Column(name = "department_id")
		private int department_id;

		
		@Column(name = "deleted")
		private String deleted;
		@Column(name = "post_flag")
		private String post_flag;
		
		@Column(name = "deptName")
		private String deptName;

		@Column(name = "trcount")
		private String trcount;
		
		@Column(name = "created_date_time")
		private Date createdDate;
		
		@Column(name = "narration")
		private String narration;
		@Column(name = "deduct_common_amnt")
		private double deduct_amnt;
		
		@Column(name = "remaining_common_amnt")
		private double remaining_amnt;
		
		public String getDeptName() {
			return deptName;
		}

		public void setDeptName(String deptName) {
			this.deptName = deptName;
		}

		@Column(name = "refund_amnt")
		private Double refund_amnt=0.0;
		
		@Column(name = "paymode")
		private Integer payMode;
		
		@Column(name = "bank_id")
		private String bankId;
		
		@Column(name = "bank_number")
		private String bankNumber;
		
		@Column(name = "center_patient_id")
		private String centerPatientId;
		
		public Double getRefund_amnt() {
			return refund_amnt;
		}

		public void setRefund_amnt(Double refund_amnt) {
			this.refund_amnt = refund_amnt;
		}

		public String getNarration() {
			return narration;
		}

		public void setNarration(String narration) {
			this.narration = narration;
		}

		public Date getCreatedDate() {
			return createdDate;
		}

		public void setCreatedDate(Date createdDate) {
			this.createdDate = createdDate;
		}

		@Transient
		private List<CommanadvrecordDTO> lstCommonadvrecrd;
		@Transient
		private List<CommanAdvRefund> lstrefundCommonadv;
		
		public List<CommanAdvRefund> getLstrefundCommonadv() {
			return lstrefundCommonadv;
		}

		public void setLstrefundCommonadv(List<CommanAdvRefund> lstrefundCommonadv) {
			this.lstrefundCommonadv = lstrefundCommonadv;
		}

		public int getCommonadv_id() {
			return commonadv_id;
		}

		public void setCommonadv_id(int commonadv_id) {
			this.commonadv_id = commonadv_id;
		}

		public int getPatient_ID() {
			return patient_ID;
		}

		public void setPatient_ID(int patient_ID) {
			this.patient_ID = patient_ID;
		}

		public String getPatient_name() {
			return patient_name;
		}

		public void setPatient_name(String patient_name) {
			this.patient_name = patient_name;
		}

		public int getTreatmentId() {
			return treatmentId;
		}

		public void setTreatmentId(int treatmentId) {
			this.treatmentId = treatmentId;
		}

		public double getCommonadv_amnt() {
			return commonadv_amnt;
		}

		public void setCommonadv_amnt(double commonadv_amnt) {
			this.commonadv_amnt = commonadv_amnt;
		}

		public double getTotal_amnt() {
			return total_amnt;
		}

		public void setTotal_amnt(double total_amnt) {
			this.total_amnt = total_amnt;
		}

		public int getDepartment_id() {
			return department_id;
		}

		public void setDepartment_id(int department_id) {
			this.department_id = department_id;
		}

		public String getDeleted() {
			return deleted;
		}

		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}

		public String getPost_flag() {
			return post_flag;
		}

		public void setPost_flag(String post_flag) {
			this.post_flag = post_flag;
		}

		public String getTrcount() {
			return trcount;
		}

		public void setTrcount(String trcount) {
			this.trcount = trcount;
		}

		public List<CommanadvrecordDTO> getLstCommonadvrecrd() {
			return lstCommonadvrecrd;
		}

		public void setLstCommonadvrecrd(List<CommanadvrecordDTO> lstCommonadvrecrd) {
			this.lstCommonadvrecrd = lstCommonadvrecrd;
		}

		public double getDeduct_amnt() {
			return deduct_amnt;
		}

		public void setDeduct_amnt(double deduct_amnt) {
			this.deduct_amnt = deduct_amnt;
		}

		public double getRemaining_amnt() {
			return remaining_amnt;
		}

		public void setRemaining_amnt(double remaining_amnt) {
			this.remaining_amnt = remaining_amnt;
		}

		public Integer getPayMode() {
			return payMode;
		}

		public void setPayMode(Integer payMode) {
			this.payMode = payMode;
		}

		public String getBankId() {
			return bankId;
		}

		public void setBankId(String bankId) {
			this.bankId = bankId;
		}

		public String getBankNumber() {
			return bankNumber;
		}

		public void setBankNumber(String bankNumber) {
			this.bankNumber = bankNumber;
		}

		public String getCenterPatientId() {
			return centerPatientId;
		}

		public void setCenterPatientId(String centerPatientId) {
			this.centerPatientId = centerPatientId;
		}	
		
	
}
