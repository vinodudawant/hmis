package com.hms.ehat.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "ehat_template_ipd_history_master_temp")
public class TemplateIPDHistoryDto implements Serializable{
	
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

	@Column(name = "deleted_by")
	private Integer deletedBy=0;
	
	@Column(name = "chief_complaints_temp",length = 400)
	private String chiefComplaintsTemp="-";
	
	@Column(name = "clinicalfinding",length = 400)
	private String clinicalFinding="-";
	
	@Column(name = "dm")
	private String dm="-";
	
	@Column(name = "htn")
	private String htn="-";
	
	@Column(name = "ihd")
	private String ihd="-";
	
	@Column(name = "bacopd")
	private String bacopd="-";
	
	@Column(name = "other")
	private String other="-";
	
	@Column(name = "past_surgical_his",length = 400)
	private String past_surgical_his="-";
	
	@Column(name = "medications",length = 400)
	private String medications="-";
	
	@Column(name = "gynac",length = 400)
	private String gynac="-";
	
	@Column(name = "drugreactions",length = 400)
	private String drugReactions="-";
	
	@Column(name = "familyhistory",length = 400)
	private String familyHistory="-";
	
	@Column(name = "personalhistory",length = 400)
	private String personalHistory="-";
	
	@Column(name = "temp")
	private String temp="-";
	
	@Column(name = "pallor")
	private String pallor="-";
	
	@Column(name = "lcterus")
	private String lcterus="-";
	
	@Column(name = "pulse")
	private String pulse="-";
	
	@Column(name = "clubbing")
	private String clubbing="-";
	
	@Column(name = "oedema")
	private String oedema="-";
	
	@Column(name = "bp")
	private String bp="-";
	
	@Column(name = "lymph")
	private String lymph="-";
	
	@Column(name = "cvs")
	private String cvs="-";
	
	@Column(name = "rs")
	private String rs="-";
	
	@Column(name = "pa")
	private String pa="-";

	@Column(name = "cns")
	private String cns="-";
	
	@Column(name = "local_exma",length = 400)
	private String local_Exma="-";
	
	@Column(name = "investigation",length = 400)
	private String investigation="-";
	
	@Transient	
    private List<TemplateIPDHistoryDto> ltITemplateIPDHistoryDto;
	
	@OneToMany(fetch = FetchType.LAZY ,cascade = {CascadeType.ALL})
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "id_ipdhistorymaster", referencedColumnName = "id_ipdhistorymaster")
	private List<TemplateIPDHistorySlaveDto> ltITemplateIPDHistorySlaveDto;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public String getChiefComplaintsTemp() {
		return chiefComplaintsTemp;
	}

	public void setChiefComplaintsTemp(String chiefComplaintsTemp) {
		this.chiefComplaintsTemp = chiefComplaintsTemp;
	}

	public String getClinicalFinding() {
		return clinicalFinding;
	}

	public void setClinicalFinding(String clinicalFinding) {
		this.clinicalFinding = clinicalFinding;
	}

	public String getDm() {
		return dm;
	}

	public void setDm(String dm) {
		this.dm = dm;
	}

	public String getHtn() {
		return htn;
	}

	public void setHtn(String htn) {
		this.htn = htn;
	}

	public String getIhd() {
		return ihd;
	}

	public void setIhd(String ihd) {
		this.ihd = ihd;
	}

	public String getBacopd() {
		return bacopd;
	}

	public void setBacopd(String bacopd) {
		this.bacopd = bacopd;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getPast_surgical_his() {
		return past_surgical_his;
	}

	public void setPast_surgical_his(String past_surgical_his) {
		this.past_surgical_his = past_surgical_his;
	}

	public String getMedications() {
		return medications;
	}

	public void setMedications(String medications) {
		this.medications = medications;
	}

	public String getGynac() {
		return gynac;
	}

	public void setGynac(String gynac) {
		this.gynac = gynac;
	}

	public String getDrugReactions() {
		return drugReactions;
	}

	public void setDrugReactions(String drugReactions) {
		this.drugReactions = drugReactions;
	}

	public String getFamilyHistory() {
		return familyHistory;
	}

	public void setFamilyHistory(String familyHistory) {
		this.familyHistory = familyHistory;
	}

	public String getPersonalHistory() {
		return personalHistory;
	}

	public void setPersonalHistory(String personalHistory) {
		this.personalHistory = personalHistory;
	}

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getPallor() {
		return pallor;
	}

	public void setPallor(String pallor) {
		this.pallor = pallor;
	}

	public String getLcterus() {
		return lcterus;
	}

	public void setLcterus(String lcterus) {
		this.lcterus = lcterus;
	}

	public String getPulse() {
		return pulse;
	}

	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	public String getClubbing() {
		return clubbing;
	}

	public void setClubbing(String clubbing) {
		this.clubbing = clubbing;
	}

	public String getOedema() {
		return oedema;
	}

	public void setOedema(String oedema) {
		this.oedema = oedema;
	}

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
	}

	public String getLymph() {
		return lymph;
	}

	public void setLymph(String lymph) {
		this.lymph = lymph;
	}

	public String getCvs() {
		return cvs;
	}

	public void setCvs(String cvs) {
		this.cvs = cvs;
	}

	public String getRs() {
		return rs;
	}

	public void setRs(String rs) {
		this.rs = rs;
	}

	public String getPa() {
		return pa;
	}

	public void setPa(String pa) {
		this.pa = pa;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getLocal_Exma() {
		return local_Exma;
	}

	public void setLocal_Exma(String local_Exma) {
		this.local_Exma = local_Exma;
	}

	public String getInvestigation() {
		return investigation;
	}

	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}

	public List<TemplateIPDHistoryDto> getLtITemplateIPDHistoryDto() {
		return ltITemplateIPDHistoryDto;
	}

	public void setLtITemplateIPDHistoryDto(
			List<TemplateIPDHistoryDto> ltITemplateIPDHistoryDto) {
		this.ltITemplateIPDHistoryDto = ltITemplateIPDHistoryDto;
	}

	public List<TemplateIPDHistorySlaveDto> getLtITemplateIPDHistorySlaveDto() {
		return ltITemplateIPDHistorySlaveDto;
	}

	public void setLtITemplateIPDHistorySlaveDto(
			List<TemplateIPDHistorySlaveDto> ltITemplateIPDHistorySlaveDto) {
		this.ltITemplateIPDHistorySlaveDto = ltITemplateIPDHistorySlaveDto;
	}

	@Override
	public String toString() {
		return "TemplateIPDHistoryDto [id_ipdhistorymaster="
				+ id_ipdhistorymaster + ", templatename=" + templatename
				+ ", status=" + status + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", updatedBy="
				+ updatedBy + ", updatedDateTime=" + updatedDateTime
				+ ", deletedBy=" + deletedBy + ", chiefComplaintsTemp="
				+ chiefComplaintsTemp + ", clinicalFinding=" + clinicalFinding
				+ ", dm=" + dm + ", htn=" + htn + ", ihd=" + ihd + ", bacopd="
				+ bacopd + ", other=" + other + ", past_surgical_his="
				+ past_surgical_his + ", medications=" + medications
				+ ", gynac=" + gynac + ", drugReactions=" + drugReactions
				+ ", familyHistory=" + familyHistory + ", personalHistory="
				+ personalHistory + ", temp=" + temp + ", pallor=" + pallor
				+ ", lcterus=" + lcterus + ", pulse=" + pulse + ", clubbing="
				+ clubbing + ", oedema=" + oedema + ", bp=" + bp + ", lymph="
				+ lymph + ", cvs=" + cvs + ", rs=" + rs + ", pa=" + pa
				+ ", cns=" + cns + ", local_Exma=" + local_Exma
				+ ", investigation=" + investigation
				+ ", ltITemplateIPDHistoryDto=" + ltITemplateIPDHistoryDto
				+ ", ltITemplateIPDHistorySlaveDto="
				+ ltITemplateIPDHistorySlaveDto + "]";
	}
	
	
	
}
