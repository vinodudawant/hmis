package com.hms.dto;

import java.sql.Date;
import java.util.List;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventroySubContractingMaterialIssueMasterDTO {
	
	
	private Integer inv_subMIM_id;
	private Integer  subMIM_doc_no;
	private Date subMIM_doc_date;
	private Integer subMIM_total_doc_quantity;
	private String subMIM_remark;
	private Integer subMIM_delete_flag;
	private Date subMIM_update_date;
	private Date subMIM_create_date;
	
	private List<InventroySubContractingMaterialIssueMasterDTO> inventroySubContractingMaterialIssueMasterDTO;

	private List<InventroySubContractingMaterialIssueSlaveDTO>inventroySubContractingMaterialIssueSlaveDTOs;
	
	@JsonGetter("inv_subMIM_id")
	public Integer getInv_subMIM_id() {
		return inv_subMIM_id;
	}

	@JsonSetter("inv_subMIM_id")
	public void setInv_subMIM_id(Integer inv_subMIM_id) {
		this.inv_subMIM_id = inv_subMIM_id;
	}

	@JsonGetter("subMIM_doc_no")
	public Integer getSubMIM_doc_no() {
		return subMIM_doc_no;
	}

	@JsonSetter("subMIM_doc_no")
	public void setSubMIM_doc_no(Integer subMIM_doc_no) {
		this.subMIM_doc_no = subMIM_doc_no;
	}

	@JsonGetter("subMIM_doc_date")	
	public Date getSubMIM_doc_date() {
		return subMIM_doc_date;
	}

	@JsonSetter("subMIM_doc_date")
	public void setSubMIM_doc_date(Date subMIM_doc_date) {
		this.subMIM_doc_date = subMIM_doc_date;
	}

	@JsonGetter("subMIM_total_doc_quantity")
	public Integer getSubMIM_total_doc_quantity() {
		return subMIM_total_doc_quantity;
	}

	@JsonSetter("subMIM_total_doc_quantity")
	public void setSubMIM_total_doc_quantity(Integer subMIM_total_doc_quantity) {
		this.subMIM_total_doc_quantity = subMIM_total_doc_quantity;
	}

	@JsonGetter("subMIM_remark")
	public String getSubMIM_remark() {
		return subMIM_remark;
	}

	@JsonSetter("subMIM_remark")
	public void setSubMIM_remark(String subMIM_remark) {
		this.subMIM_remark = subMIM_remark;
	}

	@JsonGetter("subMIM_delete_flag")
	public Integer getSubMIM_delete_flag() {
		return subMIM_delete_flag;
	}

	@JsonSetter("subMIM_delete_flag")
	public void setSubMIM_delete_flag(Integer subMIM_delete_flag) {
		this.subMIM_delete_flag = subMIM_delete_flag;
	}

	@JsonGetter("subMIM_update_date")
	public Date getSubMIM_update_date() {
		return subMIM_update_date;
	}

	@JsonSetter("subMIM_update_date")
	public void setSubMIM_update_date(Date subMIM_update_date) {
		this.subMIM_update_date = subMIM_update_date;
	}

	@JsonGetter("subMIM_create_date")
	public Date getSubMIM_create_date() {
		return subMIM_create_date;
	}

	@JsonSetter("subMIM_create_date")
	public void setSubMIM_create_date(Date subMIM_create_date) {
		this.subMIM_create_date = subMIM_create_date;
	}

	@JsonGetter("inventroySubContractingMaterialIssueMasterDTO")
	public List<InventroySubContractingMaterialIssueMasterDTO> getInventroySubContractingMaterialIssueMasterDTO() {
		return inventroySubContractingMaterialIssueMasterDTO;
	}

	@JsonSetter("inventroySubContractingMaterialIssueMasterDTO")
	public void setInventroySubContractingMaterialIssueMasterDTO(
			List<InventroySubContractingMaterialIssueMasterDTO> inventroySubContractingMaterialIssueMasterDTO) {
		this.inventroySubContractingMaterialIssueMasterDTO = inventroySubContractingMaterialIssueMasterDTO;
	}

	@JsonGetter("inventroySubContractingMaterialIssueSlaveDTOs")
	public List<InventroySubContractingMaterialIssueSlaveDTO> getInventroySubContractingMaterialIssueSlaveDTOs() {
		return inventroySubContractingMaterialIssueSlaveDTOs;
	}
	@JsonSetter("inventroySubContractingMaterialIssueSlaveDTOs")
	public void setInventroySubContractingMaterialIssueSlaveDTOs(
			List<InventroySubContractingMaterialIssueSlaveDTO> inventroySubContractingMaterialIssueSlaveDTOs) {
		this.inventroySubContractingMaterialIssueSlaveDTOs = inventroySubContractingMaterialIssueSlaveDTOs;
	}
	
	

}