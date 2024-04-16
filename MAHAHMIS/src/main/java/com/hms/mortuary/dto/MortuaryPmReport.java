package com.hms.mortuary.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.hms.dto.CustomizeTemplate;
@Entity
@Table(name="mortuarypmreport")
public class MortuaryPmReport {
	@Override
	public String toString() {
		return "MortuaryPmReport [pmreport_id=" + pmreport_id + ", template_name=" + template_name + ", template_data="
				+ template_data + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", deleted=" + deleted + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", morId=" + morId + ", listmortuarypmreport=" + listmortuarypmreport
				+ "]";
	}

	@GeneratedValue
	@Id
	@Column(name = "pmreport_id")
	private int pmreport_id;
	@Column(name="template_name")
	private String template_name;

	@Column(name="template_data",length=1000000)
	private String template_data;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;	

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="morId")
	private MortuaryMasterDto morId;
	
	
@Column(name="idCustomizeTemplate")
	private Integer idCustomizeTemplate;
	
	
	public Integer getIdCustomizeTemplate() {
	return idCustomizeTemplate;
}

public void setIdCustomizeTemplate(Integer idCustomizeTemplate) {
	this.idCustomizeTemplate = idCustomizeTemplate;
}

	@Transient
	private List<MortuaryPmReport> listmortuarypmreport;//

	
	public List<MortuaryPmReport> getListmortuarypmreport() {
		return listmortuarypmreport;
	}

	public void setListmortuarypmreport(List<MortuaryPmReport> listmortuarypmreport) {
		this.listmortuarypmreport = listmortuarypmreport;
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

	public int getPmreport_id() {
		return pmreport_id;
	}

	public void setPmreport_id(int pmreport_id) {
		this.pmreport_id = pmreport_id;
	}

	public String getTemplate_name() {
		return template_name;
	}

	public void setTemplate_name(String template_name) {
		this.template_name = template_name;
	}

	public String getTemplate_data() {
		return template_data;
	}

	public void setTemplate_data(String template_data) {
		this.template_data = template_data;
	}

	public MortuaryMasterDto getMorId() {
		return morId;
	}

	public void setMorId(MortuaryMasterDto morId) {
		this.morId = morId;
	}

	
}
