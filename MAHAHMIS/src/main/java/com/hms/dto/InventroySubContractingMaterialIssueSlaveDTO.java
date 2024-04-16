package com.hms.dto;

import java.sql.Date;
import java.util.List;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventroySubContractingMaterialIssueSlaveDTO {
	
	

	private Integer inv_subMIS_id;
	private Integer subMIS_doc_quantity;
	private Integer subMIS_factor1;
	private Integer subMIS_factor2;
	private Integer subMIS_factor3;
	private Integer subMIS_factor4;
	private Integer subMIS_delete_flag;
	private Date  subMIS_update_date;
	private Date subMIS_created_date;
	private Integer subMIM_id;
	private Integer subMIM_Item_Code;
	
	private List<InventroySubContractingMaterialIssueSlaveDTO> inventroySubContractingMaterialIssueSlaveDTOs;

	@JsonGetter("inv_subMIS_id")
	public Integer getInv_subMIS_id() {
		return inv_subMIS_id;
	}

	@JsonSetter("inv_subMIS_id")
	public void setInv_subMIS_id(Integer inv_subMIS_id) {
		this.inv_subMIS_id = inv_subMIS_id;
	}

	@JsonGetter("subMIS_doc_quantity")
	public Integer getSubMIS_doc_quantity() {
		return subMIS_doc_quantity;
	}

	@JsonSetter("subMIS_doc_quantity")
	public void setSubMIS_doc_quantity(Integer subMIS_doc_quantity) {
		this.subMIS_doc_quantity = subMIS_doc_quantity;
	}

	@JsonGetter("subMIS_factor1")
	public Integer getSubMIS_factor1() {
		return subMIS_factor1;
	}

	@JsonSetter("subMIS_factor1")
	public void setSubMIS_factor1(Integer subMIS_factor1) {
		this.subMIS_factor1 = subMIS_factor1;
	}

	@JsonGetter("subMIS_factor2")
	public Integer getSubMIS_factor2() {
		return subMIS_factor2;
	}

	@JsonSetter("subMIS_factor2")
	public void setSubMIS_factor2(Integer subMIS_factor2) {
		this.subMIS_factor2 = subMIS_factor2;
	}
	
	
	@JsonGetter("subMIS_factor3")
	public Integer getSubMIS_factor3() {
		return subMIS_factor3;
	}

	@JsonSetter("subMIS_factor3")
	public void setSubMIS_factor3(Integer subMIS_factor3) {
		this.subMIS_factor3 = subMIS_factor3;
	}

	@JsonGetter("subMIS_factor4")
	public Integer getSubMIS_factor4() {
		return subMIS_factor4;
	}

	@JsonSetter("subMIS_factor4")
	public void setSubMIS_factor4(Integer subMIS_factor4) {
		this.subMIS_factor4 = subMIS_factor4;
	}
	
	@JsonGetter("subMIS_delete_flag")
	public Integer getSubMIS_delete_flag() {
		return subMIS_delete_flag;
	}
	@JsonSetter("subMIS_delete_flag")
	public void setSubMIS_delete_flag(Integer subMIS_delete_flag) {
		this.subMIS_delete_flag = subMIS_delete_flag;
	}

	@JsonGetter("subMIS_update_date")
	public Date getSubMIS_update_date() {
		return subMIS_update_date;
	}

	@JsonSetter("subMIS_update_date")
	public void setSubMIS_update_date(Date subMIS_update_date) {
		this.subMIS_update_date = subMIS_update_date;
	}

	@JsonGetter("subMIM_id")
	public Integer getSubMIM_id() {
		return subMIM_id;
	}

	@JsonSetter("subMIM_id")
	public void setSubMIM_id(Integer subMIM_id) {
		this.subMIM_id = subMIM_id;
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

	@JsonGetter("subMIM_Item_Code")
	public Integer getSubMIM_Item_Code() {
		return subMIM_Item_Code;
	}

	@JsonSetter("subMIM_Item_Code")
	public void setSubMIM_Item_Code(Integer subMIM_Item_Code) {
		this.subMIM_Item_Code = subMIM_Item_Code;
	}

	@JsonGetter("subMIS_created_date")
	public Date getSubMIS_created_date() {
		return subMIS_created_date;
	}

	@JsonSetter("subMIS_created_date")
	public void setSubMIS_created_date(Date subMIS_created_date) {
		this.subMIS_created_date = subMIS_created_date;
	}
	

	

}