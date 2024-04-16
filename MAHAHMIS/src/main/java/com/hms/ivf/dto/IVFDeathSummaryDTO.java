package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name="ivf_death_summary_info")
public class IVFDeathSummaryDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "death_master_id")
	private Integer deathMasterId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	
	@Column(name = "patient_name",columnDefinition="varchar(20) default ''")
	private String patientName="";
	
	@Column(name = "patient_age",columnDefinition="varchar(20) default ''")
	private String patient_age="";
	
	@Column(name = "patient_gender",columnDefinition="varchar(20) default ''")
	private String patient_gender="";
	
	@Column(name = "patient_mobile",columnDefinition="varchar(20) default ''")
	private String mobile="";
	
	@Column(name = "patient_address",columnDefinition="varchar(2000) default ''")
	private String address="";
	
	@Column(name = "occupation",columnDefinition="varchar(200) default ''")
	private String occupation="";
	
	@Column(name = "date_of_illness",columnDefinition="varchar(20) default ''")
	private String dateOfIllness="";
	
	@Column(name = "sign_symtom",columnDefinition="varchar(2000) default ''")
	private String signAndSymtom="";
	
	@Column(name = "physical_condition",columnDefinition="varchar(2000) default ''")
	private String physicalCondition="";
	
	@Column(name = "treatment_givent_at",columnDefinition="varchar(2000) default ''")
	private String treatmentGivenAt="";
	
	
	@Column(name = "first_doctor_from",columnDefinition="varchar(200) default ''")
	private String firstDoctorFrom="";
	
	@Column(name = "second_doctor_from",columnDefinition="varchar(200) default ''")
	private String secondDoctorFrom="";
	
	
	@Column(name = "ho",columnDefinition="varchar(2000) default ''")
	private String ho="";
	
	@Column(name = "iiw_dt_from",columnDefinition="varchar(200) default ''")
	private String IIWDtFrom="";
	
	@Column(name = "refering_hospital",columnDefinition="varchar(200) default ''")
	private String referingHospital="";
	
	@Column(name = "date_admissin_in_iiw",columnDefinition="varchar(200) default ''")
	private String dateAdmissionInIIW="";
	
	@Column(name = "time_admissin_in_iiw",columnDefinition="varchar(200) default ''")
	private String timeAdmissionInIIW="";
	
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<IVFDeathSummaryDTO>  getListOfIVFDeathSummaryDTO;
}
