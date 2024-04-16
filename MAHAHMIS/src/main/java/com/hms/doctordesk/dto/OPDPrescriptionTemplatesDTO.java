package com.hms.doctordesk.dto;

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
import com.hms.pharmacy.pojo.ProductMaster;

import javassist.SerialVersionUID;

@Entity
@Component
@Table(name = "opd_prescription_templates")
public class OPDPrescriptionTemplatesDTO implements Serializable{
	

	private static final long serialVersionUID = -3432643029879521594L;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "template_id")
	private Integer templateId;
	
	@Column(name = "template_name")
	private String templateName;
	
	@Column(name = "my_template_checkbox_flag", columnDefinition="varchar(2) default 'N'")
	private String myTemplateCheckBoxFlag = "N";
	
	@Column(name = "org_template_checkbox_flag", columnDefinition="varchar(2) default 'N'")
	private String orgTemplateCheckBoxFlag = "N";

	@Column(name = "doctor_name")
	private String doctorName;
	
	@Transient
	List<OPDPrescriptionTemplateMedicineDto> listOPDPrescriptionTemplateMedicineDto;
	
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
	
	@Transient
	private List<OPDPrescriptionTemplatesDTO> listOPDPrescriptionTemplatesDTO;

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getMyTemplateCheckBoxFlag() {
		return myTemplateCheckBoxFlag;
	}

	public void setMyTemplateCheckBoxFlag(String myTemplateCheckBoxFlag) {
		this.myTemplateCheckBoxFlag = myTemplateCheckBoxFlag;
	}

	public String getOrgTemplateCheckBoxFlag() {
		return orgTemplateCheckBoxFlag;
	}

	public void setOrgTemplateCheckBoxFlag(String orgTemplateCheckBoxFlag) {
		this.orgTemplateCheckBoxFlag = orgTemplateCheckBoxFlag;
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

	public List<OPDPrescriptionTemplatesDTO> getListOPDPrescriptionTemplatesDTO() {
		return listOPDPrescriptionTemplatesDTO;
	}

	public void setListOPDPrescriptionTemplatesDTO(List<OPDPrescriptionTemplatesDTO> listOPDPrescriptionTemplatesDTO) {
		this.listOPDPrescriptionTemplatesDTO = listOPDPrescriptionTemplatesDTO;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public List<OPDPrescriptionTemplateMedicineDto> getListOPDPrescriptionTemplateMedicineDto() {
		return listOPDPrescriptionTemplateMedicineDto;
	}

	public void setListOPDPrescriptionTemplateMedicineDto(
			List<OPDPrescriptionTemplateMedicineDto> listOPDPrescriptionTemplateMedicineDto) {
		this.listOPDPrescriptionTemplateMedicineDto = listOPDPrescriptionTemplateMedicineDto;
	}

	
	

}
