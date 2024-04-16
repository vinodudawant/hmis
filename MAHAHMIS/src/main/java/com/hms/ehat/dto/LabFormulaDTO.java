package com.hms.ehat.dto;

import java.io.Serializable;
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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.hms.pathology.dto.LabTestDTO;

@Entity
@Table(name = "labformula")
public class LabFormulaDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idlabFormula")
	private int idlabFormula;
	@Column(name = "expTestId")
	private String expTestId;
	@Column(name = "formStatus", length = 2)
	private String formStatus = "Y";
	@Column(name = "unit_id")
	private Integer unitId;
	@Column(name = "created_by")
	private Integer createdBy;
	@Column(name = "updated_by")
	private Integer updatedBy;
	@Column(name = "deleted_by")
	private Integer deletedBy;
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	@UpdateTimestamp
	@Column(name = "update_date_time")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "resultTestId")
	private LabTestDTO labTestDTO;
	
	@Transient
	private int resultTestId;
	@Transient
	private String formulaLH;
	@Transient
	private List<LabFormulaDTO> labFormulaList;
	
	
	public int getIdlabFormula() {
		return idlabFormula;
	}
	
	public void setIdlabFormula(int idlabFormula) {
		this.idlabFormula = idlabFormula;
	}
	
	public String getExpTestId() {
		return expTestId;
	}
	
	public void setExpTestId(String expTestId) {
		this.expTestId = expTestId;
	}
	
	public String getFormStatus() {
		return formStatus;
	}
	
	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}
	
	public Integer getUnitId() {
		return unitId;
	}
	
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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
	
	public Date getCreateDate() {
		return createDate;
	}
	
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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
	
	public LabTestDTO getLabTestDTO() {
		return labTestDTO;
	}
	
	public void setLabTestDTO(LabTestDTO labTestDTO) {
		this.labTestDTO = labTestDTO;
	}
	
	public int getResultTestId() {
		return resultTestId;
	}
	
	public void setResultTestId(int resultTestId) {
		this.resultTestId = resultTestId;
	}
	
	public String getFormulaLH() {
		return formulaLH;
	}
	
	public void setFormulaLH(String formulaLH) {
		this.formulaLH = formulaLH;
	}
	
	public List<LabFormulaDTO> getLabFormulaList() {
		return labFormulaList;
	}
	
	public void setLabFormulaList(List<LabFormulaDTO> labFormulaList) {
		this.labFormulaList = labFormulaList;
	}
}