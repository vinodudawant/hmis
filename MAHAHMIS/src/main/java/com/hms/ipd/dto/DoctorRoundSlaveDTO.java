package com.hms.ipd.dto;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.RegistrationDto;

@Entity
@Table(name = "ehat_doctor_round_slave")
public class DoctorRoundSlaveDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "doctor_round_slave_id")
	private Integer doctorRoundSlaveId;
	
	@Column(name = "time")
	private Time time;

	@Column(name = "template_id")	
	private Integer templateId;
	
	@Column(name = "clinical_notes",columnDefinition="TEXT(255) default ' '")
	private String clinicalNotes;

	@Column(name = "investigation_advice",columnDefinition="TEXT(255) default ' '")
	private String investigationAdvice;
	
	@Column(name = "template_name",columnDefinition="varchar(500) default ''")
	private String templateName="";
	
	@Column(name = "doctor_name",columnDefinition="varchar(100) default ' '")
	private String doctorName="";
	

	@Column(name = "doctor_id")
	private Integer doctorId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	
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
	
	
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "dr_r_complition_time")
	private String drComplitionTime;
	
	@Column(name = "nursing_notes")
	private String nursingNotes;
	
	@Transient
	private List<DoctorRoundSlaveDTO> list;

	

	public String getDrComplitionTime() {
		return drComplitionTime;
	}

	public void setDrComplitionTime(String drComplitionTime) {
		this.drComplitionTime = drComplitionTime;
	}

	public String getNursingNotes() {
		return nursingNotes;
	}

	public void setNursingNotes(String nursingNotes) {
		this.nursingNotes = nursingNotes;
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}

	public String getInvestigationAdvice() {
		return investigationAdvice;
	}

	public void setInvestigationAdvice(String investigationAdvice) {
		this.investigationAdvice = investigationAdvice;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public List<DoctorRoundSlaveDTO> getList() {
		return list;
	}

	public void setList(List<DoctorRoundSlaveDTO> list) {
		this.list = list;
	}

	public DoctorRoundSlaveDTO() {
		super();
	}

	public Integer getDoctorRoundSlaveId() {
		return doctorRoundSlaveId;
	}

	public void setDoctorRoundSlaveId(Integer doctorRoundSlaveId) {
		this.doctorRoundSlaveId = doctorRoundSlaveId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public DoctorRoundSlaveDTO(Integer doctorRoundSlaveId, Time time, Integer templateId, String clinicalNotes,
			String investigationAdvice, Integer doctorId, Integer unitId) {
		super();
		this.doctorRoundSlaveId = doctorRoundSlaveId;
		this.time = time;
		this.templateId = templateId;
		this.clinicalNotes = clinicalNotes;
		this.investigationAdvice = investigationAdvice;
		this.doctorId = doctorId;
		this.unitId = unitId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(clinicalNotes, doctorId, doctorRoundSlaveId, investigationAdvice, templateId, time, unitId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DoctorRoundSlaveDTO other = (DoctorRoundSlaveDTO) obj;
		return Objects.equals(clinicalNotes, other.clinicalNotes) && Objects.equals(doctorId, other.doctorId)
				&& Objects.equals(doctorRoundSlaveId, other.doctorRoundSlaveId)
				&& Objects.equals(investigationAdvice, other.investigationAdvice)
				&& Objects.equals(templateId, other.templateId) && Objects.equals(time, other.time)
				&& Objects.equals(unitId, other.unitId);
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	@Override
	public String toString() {
		return "DoctorRoundSlaveDTO [doctorRoundSlaveId=" + doctorRoundSlaveId + ", time=" + time + ", templateId="
				+ templateId + ", clinicalNotes=" + clinicalNotes + ", investigationAdvice=" + investigationAdvice
				+ ", templateName=" + templateName + ", doctorName=" + doctorName + ", doctorId=" + doctorId
				+ ", unitId=" + unitId + ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedDateTime=" + deletedDateTime + ", userId=" + userId + ", drComplitionTime="
				+ drComplitionTime + ", nursingNotes=" + nursingNotes + ", list=" + list + "]";
	}

	

	
	

	
	
	
	
	
	
}
