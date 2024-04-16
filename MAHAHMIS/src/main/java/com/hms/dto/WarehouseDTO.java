package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class WarehouseDTO {
	private Integer warehouseId;
	private String warehouseName;
	private String warehouselocation;
	private String warehousecontactNo;

	private Integer warehouse_delete_flag;
	private Date warehouse_update_date;
	
	private Integer inv_warehouse_master_not_applicable_for_maintanace;
	private Integer inv_warehouse_master_applicable_for_maintanace;
	
	
	private List<WarehouseDTO> ltWarehouseDTOs;
	@JsonGetter("warehouseId")
	public Integer getWarehouseId() {
		return warehouseId;
	}
	@JsonSetter("warehouseId")
	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}
	@JsonGetter("warehousecontactNo")
	public String getWarehousecontactNo() {
		return warehousecontactNo;
	}
	@JsonSetter("warehousecontactNo")
	public void setWarehousecontactNo(String warehousecontactNo) {
		this.warehousecontactNo = warehousecontactNo;
	}
	@JsonGetter("warehouseName")
	public String getWarehouseName() {
		return warehouseName;
	}@JsonSetter("warehouseName")
	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}
	@JsonGetter("warehouselocation")
	public String getWarehouselocation() {
		return warehouselocation;
	}
	@JsonSetter("warehouselocation")
	public void setWarehouselocation(String warehouselocation) {
		this.warehouselocation = warehouselocation;
	}
	@JsonGetter("warehouse_delete_flag")
	public Integer getWarehouse_delete_flag() {
		return warehouse_delete_flag;
	}
	@JsonSetter("warehouse_delete_flag")
	public void setWarehouse_delete_flag(Integer warehouse_delete_flag) {
		this.warehouse_delete_flag = warehouse_delete_flag;
	}
	public Date getWarehouse_update_date() {
		return warehouse_update_date;
	}
	public void setWarehouse_update_date(Date warehouse_update_date) {
		this.warehouse_update_date = warehouse_update_date;
	}
	@JsonGetter("ltWarehouseDTOs")
	public List<WarehouseDTO> getLtWarehouseDTOs() {
		return ltWarehouseDTOs;
	}
	@JsonSetter("ltWarehouseDTOs")
	public void setLtWarehouseDTOs(List<WarehouseDTO> ltWarehouseDTOs) {
		this.ltWarehouseDTOs = ltWarehouseDTOs;
	}
	@JsonGetter("inv_warehouse_master_not_applicable_for_maintanace")
	public Integer getInv_warehouse_master_not_applicable_for_maintanace() {
		return inv_warehouse_master_not_applicable_for_maintanace;
	}
	@JsonSetter("inv_warehouse_master_not_applicable_for_maintanace")
	public void setInv_warehouse_master_not_applicable_for_maintanace(
			Integer inv_warehouse_master_not_applicable_for_maintanace) {
		this.inv_warehouse_master_not_applicable_for_maintanace = inv_warehouse_master_not_applicable_for_maintanace;
	}
	@JsonGetter("inv_warehouse_master_applicable_for_maintanace")
	public Integer getInv_warehouse_master_applicable_for_maintanace() {
		return inv_warehouse_master_applicable_for_maintanace;
	}
	@JsonSetter("inv_warehouse_master_applicable_for_maintanace")
	public void setInv_warehouse_master_applicable_for_maintanace(
			Integer inv_warehouse_master_applicable_for_maintanace) {
		this.inv_warehouse_master_applicable_for_maintanace = inv_warehouse_master_applicable_for_maintanace;
	}
	 
}
