package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.dto.Doctor;

@Entity
@Table(name = "ehat_template_ipd_history_slave_temp")
public class TemplateIPDHistorySlaveDto  implements  Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id_ipdhistoryslave")	
	private int id_ipdhistoryslave;
	
	@Column(name = "idipd_add_history_componanat")
	private int idipd_add_history_componanat;
	
	@Column(name = "chief_com_durration")
	private String chief_com_durration="-";
	
	@Column(name = "chief_complaints_temp",length = 400)
	private String chiefComplaintsTemp="-";
	
	@Column(name = "days_month_year")
	private String days_month_year="-";
	
	@Column(name = "status")
	private String status="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Transient	
	private List<TemplateIPDHistorySlaveDto> listTemplateIPDHistorySlaveDto;
	
	@Transient	
	private List<Doctor> listofDoctor;
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getId_ipdhistoryslave() {
		return id_ipdhistoryslave;
	}

	public int getIdipd_add_history_componanat() {
		return idipd_add_history_componanat;
	}

	public String getChief_com_durration() {
		return chief_com_durration;
	}

	public String getChiefComplaintsTemp() {
		return chiefComplaintsTemp;
	}

	public String getDays_month_year() {
		return days_month_year;
	}

	public String getStatus() {
		return status;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public List<TemplateIPDHistorySlaveDto> getListTemplateIPDHistorySlaveDto() {
		return listTemplateIPDHistorySlaveDto;
	}

	public List<Doctor> getListofDoctor() {
		return listofDoctor;
	}

	public void setId_ipdhistoryslave(int id_ipdhistoryslave) {
		this.id_ipdhistoryslave = id_ipdhistoryslave;
	}

	public void setIdipd_add_history_componanat(int idipd_add_history_componanat) {
		this.idipd_add_history_componanat = idipd_add_history_componanat;
	}

	public void setChief_com_durration(String chief_com_durration) {
		this.chief_com_durration = chief_com_durration;
	}

	public void setChiefComplaintsTemp(String chiefComplaintsTemp) {
		this.chiefComplaintsTemp = chiefComplaintsTemp;
	}

	public void setDays_month_year(String days_month_year) {
		this.days_month_year = days_month_year;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public void setListTemplateIPDHistorySlaveDto(
			List<TemplateIPDHistorySlaveDto> listTemplateIPDHistorySlaveDto) {
		this.listTemplateIPDHistorySlaveDto = listTemplateIPDHistorySlaveDto;
	}

	public void setListofDoctor(List<Doctor> listofDoctor) {
		this.listofDoctor = listofDoctor;
	}

	@Override
	public String toString() {
		return "TemplateIPDHistorySlaveDto [id_ipdhistoryslave="
				+ id_ipdhistoryslave + ", idipd_add_history_componanat="
				+ idipd_add_history_componanat + ", chief_com_durration="
				+ chief_com_durration + ", chiefComplaintsTemp="
				+ chiefComplaintsTemp + ", days_month_year=" + days_month_year
				+ ", status=" + status + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", updatedBy="
				+ updatedBy + ", updatedDateTime=" + updatedDateTime
				+ ", deleted=" + deleted + ", deletedBy=" + deletedBy
				+ ", deletedDateTime=" + deletedDateTime
				+ ", listTemplateIPDHistorySlaveDto="
				+ listTemplateIPDHistorySlaveDto + ", listofDoctor="
				+ listofDoctor + "]";
	}
	
	
}
