package com.hms.pathology.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.inventory.dto.ItemMasterDto;

@Entity
@Table(name = "pathology_labprofile_reagent")
public class LabProfileReagentDetailsDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idReagentDetail;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idReagent",unique = false)
	private ItemMasterDto itemMasterReagent;

	@Column(name = "quantity")
	private String quantity;
	
	@Column(name = "idUnit")
	private String idUnit;
	
	@Column(name = "flag")
	private String flag;
	
	/*@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idAsset",unique = false)
	private ItemMasterDto itemMasterAsset;*/
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idtestMethod")
	private LabTestMethodDTO labTestMethod;
	
	@Column(name = "reagent_type")
	private String reagentType;
	
	@Column(name = "unit_name")
	private String unitName;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "deleted", length = 2)
	private String deleted = "N";
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Transient
	private Integer labTestId;
	
	@Transient
	private Integer labTestMethodId;
	
	@Transient
	private Integer assestId;
	
	@Transient
	private Integer reagentId;
	
	@Transient
	private List<LabProfileReagentDetailsDTO> labProfileReagentDetailsList;

	public Integer getIdReagentDetail() {
		return idReagentDetail;
	}

	public void setIdReagentDetail(Integer idReagentDetail) {
		this.idReagentDetail = idReagentDetail;
	}

	public ItemMasterDto getItemMasterReagent() {
		return itemMasterReagent;
	}

	public void setItemMasterReagent(ItemMasterDto itemMasterReagent) {
		this.itemMasterReagent = itemMasterReagent;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getIdUnit() {
		return idUnit;
	}

	public void setIdUnit(String idUnit) {
		this.idUnit = idUnit;
	}

	/*
	public ItemMasterDto getItemMasterAsset() {
		return itemMasterAsset;
	}

	public void setItemMasterAsset(ItemMasterDto itemMasterAsset) {
		this.itemMasterAsset = itemMasterAsset;
	}
	*/
	
	public LabTestMethodDTO getLabTestMethod() {
		return labTestMethod;
	}

	public void setLabTestMethod(LabTestMethodDTO labTestMethod) {
		this.labTestMethod = labTestMethod;
	}

	public Integer getLabTestId() {
		return labTestId;
	}

	public void setLabTestId(Integer labTestId) {
		this.labTestId = labTestId;
	}

	public Integer getLabTestMethodId() {
		return labTestMethodId;
	}

	public void setLabTestMethodId(Integer labTestMethodId) {
		this.labTestMethodId = labTestMethodId;
	}

	public Integer getAssestId() {
		return assestId;
	}

	public void setAssestId(Integer assestId) {
		this.assestId = assestId;
	}

	public Integer getReagentId() {
		return reagentId;
	}

	public void setReagentId(Integer reagentId) {
		this.reagentId = reagentId;
	}

	public List<LabProfileReagentDetailsDTO> getLabProfileReagentDetailsList() {
		return labProfileReagentDetailsList;
	}

	public void setLabProfileReagentDetailsList(List<LabProfileReagentDetailsDTO> labProfileReagentDetailsList) {
		this.labProfileReagentDetailsList = labProfileReagentDetailsList;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
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

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getReagentType() {
		return reagentType;
	}

	public void setReagentType(String reagentType) {
		this.reagentType = reagentType;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Override
	public String toString() {
		return "LabProfileReagentDetailsDTO [idReagentDetail=" + idReagentDetail + ", itemMasterReagent="
				+ itemMasterReagent + ", quantity=" + quantity + ", idUnit=" + idUnit + ", flag=" + flag
				+ ", labTestMethod=" + labTestMethod + ", reagentType=" + reagentType + ", unitName=" + unitName
				+ ", unitId=" + unitId + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedBy=" + deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", labTestId=" + labTestId + ", labTestMethodId=" + labTestMethodId + ", assestId=" + assestId
				+ ", reagentId=" + reagentId + ", labProfileReagentDetailsList=" + labProfileReagentDetailsList + "]";
	}
}