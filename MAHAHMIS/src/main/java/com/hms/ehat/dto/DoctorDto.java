package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
 
@Entity
@Table(name = "doctor")
public class DoctorDto {
		 
 	
		@Id
		@GeneratedValue
		@Column(name = "Doctor_ID")
		private int Doctor_ID;
		
		@Column(name = "doc_name")
		private String doc_name;

		@Column(name = "specialisation")
		private String specialisation;
		
		@Column(name = "doc_Type")
		private String doc_Type;
		
		@Column(name = "status")
		private String status;
		
		@Column(name = "fixed_income")
		private Double fixedIncome=0.0;
		
		@Column(name = "User_ID")
		private int User_ID=0;
		
		@Column(name = "group_master_id",columnDefinition="int default 0")
		private Integer group_master_id=0;
		
		@Column(name = "dynamic_group_master_id",columnDefinition="int default 0")
		private Integer dynamic_group_master_id=0;
		
		@Column(name = "folloup_fees")
		private double folloupFees=0;
		
		@Column(name = "folloup_weekend")
		private double folloupWeekend=0;
		
		@Column(name = "specializationName",columnDefinition="varchar(2) default ''")
		 private String specialisationName ;
		
		
		public String getSpecialisationName() {
			return specialisationName;
		}

		public void setSpecialisationName(String specialisationName) {
			this.specialisationName = specialisationName;
		}

		@Transient
		private List<DoctorDto> lstDoctorDto;
		
		@Transient
		private List<DoctorDto> lstRefDoctorDto;
		
		public List<DoctorDto> getLstDoctorDto() {
			return lstDoctorDto;
		}

		public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
			this.lstDoctorDto = lstDoctorDto;
		}

		public int getDoctor_ID() {
			return Doctor_ID;
		}

		public void setDoctor_ID(int doctor_ID) {
			Doctor_ID = doctor_ID;
		}

		public String getDoc_name() {
			return doc_name;
		}

		public void setDoc_name(String doc_name) {
			this.doc_name = doc_name;
		}

		public String getSpecialisation() {
			return specialisation;
		}

		public void setSpecialisation(String specialisation) {
			this.specialisation = specialisation;
		}

		public String getDoc_Type() {
			return doc_Type;
		}

		public void setDoc_Type(String doc_Type) {
			this.doc_Type = doc_Type;
		}

		public Double getFixedIncome() {
			return fixedIncome;
		}

		public void setFixedIncome(Double fixedIncome) {
			this.fixedIncome = fixedIncome;
		}

		public int getUser_ID() {
			return User_ID;
		}

		public void setUser_ID(int user_ID) {
			User_ID = user_ID;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public Integer getGroup_master_id() {
			return group_master_id;
		}

		public void setGroup_master_id(Integer group_master_id) {
			this.group_master_id = group_master_id;
		}

		public Integer getDynamic_group_master_id() {
			return dynamic_group_master_id;
		}

		public void setDynamic_group_master_id(Integer dynamic_group_master_id) {
			this.dynamic_group_master_id = dynamic_group_master_id;
		}

		public List<DoctorDto> getLstRefDoctorDto() {
			return lstRefDoctorDto;
		}

		public void setLstRefDoctorDto(List<DoctorDto> lstRefDoctorDto) {
			this.lstRefDoctorDto = lstRefDoctorDto;
		}

		public double getFolloupFees() {
			return folloupFees;
		}

		public void setFolloupFees(double folloupFees) {
			this.folloupFees = folloupFees;
		}

		public double getFolloupWeekend() {
			return folloupWeekend;
		}

		public void setFolloupWeekend(double folloupWeekend) {
			this.folloupWeekend = folloupWeekend;
		}
		
		
}