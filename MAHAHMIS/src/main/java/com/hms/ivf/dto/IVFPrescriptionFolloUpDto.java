package com.hms.ivf.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.pharmacy.pojo.ProductMaster;

import javassist.SerialVersionUID;

@Entity
@Component
@Table(name = "follow_up_ivf")
public class IVFPrescriptionFolloUpDto implements Serializable{
	

	private static final long serialVersionUID = -3432643029879521594L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ivf_follow_up_id")
	private Integer ivfFollowUpId;
	
	@Column(name = "radio_day_week_moth")
	private String radioDayWeekMonth;
	
	@Column(name = "value_day_week_month")
	private Integer valueDayWeekMonth;
	
	@Column(name = "doctor_id")
	private Integer doctorId;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="treatment_id",unique=true)
	private TreatmentDto treatmentDto;
	
	// for IVF
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="ivf_treatment_id",nullable = false)
	private IVFTreatmentDTO ivfTreatmentDto;
	
	@Column(name = "treatment_doc_id")
	private Integer treatmentDocId;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "date")
	private Date date;
	
	// Meta-Data
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	

@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status="Y";
	
	@Transient
	private List<IVFPrescriptionFolloUpDto> listOPDPrescriptionFolloUpDto;

	

	public Integer getIvfFollowUpId() {
		return ivfFollowUpId;
	}

	public void setIvfFollowUpId(Integer ivfFollowUpId) {
		this.ivfFollowUpId = ivfFollowUpId;
	}

	public IVFTreatmentDTO getIvfTreatmentDto() {
		return ivfTreatmentDto;
	}

	public void setIvfTreatmentDto(IVFTreatmentDTO ivfTreatmentDto) {
		this.ivfTreatmentDto = ivfTreatmentDto;
	}

	public String getRadioDayWeekMonth() {
		return radioDayWeekMonth;
	}

	public void setRadioDayWeekMonth(String radioDayWeekMonth) {
		this.radioDayWeekMonth = radioDayWeekMonth;
	}

	public Integer getValueDayWeekMonth() {
		return valueDayWeekMonth;
	}

	public void setValueDayWeekMonth(Integer valueDayWeekMonth) {
		this.valueDayWeekMonth = valueDayWeekMonth;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public Integer getTreatmentDocId() {
		return treatmentDocId;
	}

	public void setTreatmentDocId(Integer treatmentDocId) {
		this.treatmentDocId = treatmentDocId;
	}

	

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public List<IVFPrescriptionFolloUpDto> getListOPDPrescriptionFolloUpDto() {
		return listOPDPrescriptionFolloUpDto;
	}

	public void setListOPDPrescriptionFolloUpDto(List<IVFPrescriptionFolloUpDto> listOPDPrescriptionFolloUpDto) {
		this.listOPDPrescriptionFolloUpDto = listOPDPrescriptionFolloUpDto;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "IVFPrescriptionFolloUpDto [ivfFollowUpId=" + ivfFollowUpId + ", radioDayWeekMonth=" + radioDayWeekMonth
				+ ", valueDayWeekMonth=" + valueDayWeekMonth + ", doctorId=" + doctorId + ", doctorName=" + doctorName
				+ ", patientId=" + patientId + ", patientName=" + patientName + ", treatmentDto=" + treatmentDto
				+ ", ivfTreatmentDto=" + ivfTreatmentDto + ", treatmentDocId=" + treatmentDocId + ", date=" + date
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", deleted=" + deleted + ", status=" + status
				+ ", listOPDPrescriptionFolloUpDto=" + listOPDPrescriptionFolloUpDto + "]";
	}

}
