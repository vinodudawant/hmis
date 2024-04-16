package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "ehat_template_ipd_history_master")
public class TemplateIPDHistory {
	@Id
	@GeneratedValue
	@Column(name = "id_ipdhistorymaster")
	private int id_ipdhistorymaster;

	@Column(name = "templatename")
	private String templatename;
	
	@Column(name = "status")
	private String status="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;
	
	@Transient	
    private List<TemplateIPDHistory> ltiTemplateIPDHistory;
	@OneToMany(fetch = FetchType.LAZY ,cascade = {CascadeType.ALL})
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "id_ipdhistorymaster", referencedColumnName = "id_ipdhistorymaster")
	private List<TemplateIPDHistoryslave> ltITemplateIPDHistoryslave;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getId_ipdhistorymaster() {
		return id_ipdhistorymaster;
	}
	public void setId_ipdhistorymaster(int id_ipdhistorymaster) {
		this.id_ipdhistorymaster = id_ipdhistorymaster;
	}
	

	public String getTemplatename() {
		return templatename;
	}
	public void setTemplatename(String templatename) {
		this.templatename = templatename;
	}
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Integer getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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
	public List<TemplateIPDHistory> getLtiTemplateIPDHistory() {
		return ltiTemplateIPDHistory;
	}
	public void setLtiTemplateIPDHistory(
			List<TemplateIPDHistory> ltiTemplateIPDHistory) {
		this.ltiTemplateIPDHistory = ltiTemplateIPDHistory;
	}
	@JsonGetter("ltITemplateIPDHistoryslave")
	public List<TemplateIPDHistoryslave> getLtITemplateIPDHistoryslave() {
		return ltITemplateIPDHistoryslave;
	}
	@JsonSetter("ltITemplateIPDHistoryslave")
	public void setLtITemplateIPDHistoryslave(
			List<TemplateIPDHistoryslave> ltITemplateIPDHistoryslave) {
		this.ltITemplateIPDHistoryslave = ltITemplateIPDHistoryslave;
	}
	
	
}
