package com.hms.dto;

import java.sql.Date;
import java.util.List;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryMaterialRequestNoteItemInfoSlaveDTO {
	
	private Integer mrn_item_info_slave_id;
	private Integer mrn_id;
	private String mrn_item_info_slave_item_name;
	private Integer mrn_item_info_slave_doc_qty;
	private String mrn_item_info_slave_item_factor1;
	private String mrn_item_info_slave_item_factor2;
	private String mrn_item_info_slave_item_factor3;
	
	private String mrn_item_info_slave_item_factor4;
	private Integer mrn_item_info_slave_delete_flag;
	private String mrn_item_info_slave_update_date;
	private String mrn_item_info_slave_create_date;
	private Integer mrn_item_issue_qty;
	private Integer mrn_item_info_slave_item_code;
	private String mrn_item_info_slave_item_selItemQty;
	private String inv_mrn_item_info_slave_subinventory;
	private Integer mrn_item_info_slave_issue_qty;
	
	private String  mrn_status; 
	 private String inv_mrn_received_date	;
	 private Integer inv_mrn_item_info_slave_subinventory_consumption_qty;
	 private Integer mrn_item_info_slave_fixed_issue_qty_to_subinventory;
	 private String inv_mrn_item_info_slave_subinventory_consumption_date;
	 
	 private String inv_consumption_master_patient_name;
	 private Integer inv_consumption_master_patient_id;
	 
	 private Integer currentSubInventoryStock;
	 private Integer mainInventoryStock;
	 private String inv_subinventory_id;	
	 
	 
/**********************addd mrn returnquantity by paras @date 11nov *********************/
	 
	 private Integer mrn_item_info_slave_Return_qty;
	 private Integer mrn_item_info_slave_Return_ConsumeQty;
	 private Integer mrnReturndocno;
	 private String  mrnDate;
	 private Integer  mrnTotal;
	 private String mrnRemark;
	 private String mrnReturnName;
	 private String  mrnReturnDate;
	 private String mrnReturnBy;
	 private String mrntotalReturn;
	 private Integer currentUserID;
	 private String currentuserName;
/*******************end  addd mrn returnquantity by paras @date 11nov****************************/	 
	 private String mrnSrNo;
	 private Integer maintncAstId;
	 
	 
	 
	 private String itmeurjStatus;
	 private String accptRejtstus;
	 private String noteforItem;
	 
	 
	 public String getItmeurjStatus() {
			return itmeurjStatus;
		}
		public void setItmeurjStatus(String itmeurjStatus) {
			this.itmeurjStatus = itmeurjStatus;
		}
		public String getAccptRejtstus() {
			return accptRejtstus;
		}
		public void setAccptRejtstus(String accptRejtstus) {
			this.accptRejtstus = accptRejtstus;
		}
		public String getNoteforItem() {
			return noteforItem;
		}
		public void setNoteforItem(String noteforItem) {
			this.noteforItem = noteforItem;
		}
		
		

	 @JsonGetter("inv_subinventory_id")
	 public String getInv_subinventory_id() {
		return inv_subinventory_id;
	}
	 @JsonSetter("inv_subinventory_id")
	public void setInv_subinventory_id(String inv_subinventory_id) {
		this.inv_subinventory_id = inv_subinventory_id;
	}

	private Integer subinventory_id;
	public Integer getSubinventory_id() {
		return subinventory_id;
	}
	public void setSubinventory_id(Integer subinventory_id) {
		this.subinventory_id = subinventory_id;
	}

	private List<InventoryMaterialRequestNoteItemInfoSlaveDTO> inventoryMaterialRequestNoteItemInfoSlaveDTO ;

	@JsonGetter("mrn_item_info_slave_id")
	public Integer getMrn_item_info_slave_id() {
		return mrn_item_info_slave_id;
	}

	@JsonSetter("mrn_item_info_slave_id")
	public void setMrn_item_info_slave_id(Integer mrn_item_info_slave_id) {
		this.mrn_item_info_slave_id = mrn_item_info_slave_id;
	}

	@JsonGetter("mrn_id")
	public Integer getMrn_id() {
		return mrn_id;
	}

	@JsonSetter("mrn_id")
	public void setMrn_id(Integer mrn_id) {
		this.mrn_id = mrn_id;
	}
	@JsonGetter("mrn_item_info_slave_item_name")
	public String getMrn_item_info_slave_item_name() {
		return mrn_item_info_slave_item_name;
	}
	@JsonSetter("mrn_item_info_slave_item_name")
	public void setMrn_item_info_slave_item_name(
			String mrn_item_info_slave_item_name) {
		this.mrn_item_info_slave_item_name = mrn_item_info_slave_item_name;
	}
	
	
	@JsonGetter("mrn_item_info_slave_doc_qty")
	public Integer getMrn_item_info_slave_doc_qty() {
		return mrn_item_info_slave_doc_qty;
	}

	@JsonSetter("mrn_item_info_slave_doc_qty")
	public void setMrn_item_info_slave_doc_qty(Integer mrn_item_info_slave_doc_qty) {
		this.mrn_item_info_slave_doc_qty = mrn_item_info_slave_doc_qty;
	}

	@JsonGetter("mrn_item_info_slave_item_factor1")
	public String getMrn_item_info_slave_item_factor1() {
		return mrn_item_info_slave_item_factor1;
	}

	@JsonSetter("mrn_item_info_slave_item_factor1")
	public void setMrn_item_info_slave_item_factor1(
			String mrn_item_info_slave_item_factor1) {
		this.mrn_item_info_slave_item_factor1 = mrn_item_info_slave_item_factor1;
	}

	@JsonGetter("mrn_item_info_slave_item_factor2")
	public String getMrn_item_info_slave_item_factor2() {
		return mrn_item_info_slave_item_factor2;
	}

	@JsonSetter("mrn_item_info_slave_item_factor2")
	public void setMrn_item_info_slave_item_factor2(
			String mrn_item_info_slave_item_factor2) {
		this.mrn_item_info_slave_item_factor2 = mrn_item_info_slave_item_factor2;
	}

	@JsonGetter("mrn_item_info_slave_item_factor3")
	public String getMrn_item_info_slave_item_factor3() {
		return mrn_item_info_slave_item_factor3;
	}

	@JsonSetter("mrn_item_info_slave_item_factor3")
	public void setMrn_item_info_slave_item_factor3(
			String mrn_item_info_slave_item_factor3) {
		this.mrn_item_info_slave_item_factor3 = mrn_item_info_slave_item_factor3;
	}
	
	@JsonGetter("mrn_item_info_slave_item_factor4")
	public String getMrn_item_info_slave_item_factor4() {
		return mrn_item_info_slave_item_factor4;
	}

	@JsonSetter("mrn_item_info_slave_item_factor4")
	public void setMrn_item_info_slave_item_factor4(
			String mrn_item_info_slave_item_factor4) {
		this.mrn_item_info_slave_item_factor4 = mrn_item_info_slave_item_factor4;
	}

	@JsonGetter("mrn_item_info_slave_delete_flag")
	public Integer getMrn_item_info_slave_delete_flag() {
		return mrn_item_info_slave_delete_flag;
	}

	@JsonSetter("mrn_item_info_slave_delete_flag")
	public void setMrn_item_info_slave_delete_flag(
			Integer mrn_item_info_slave_delete_flag) {
		this.mrn_item_info_slave_delete_flag = mrn_item_info_slave_delete_flag;
	}
		
	@JsonGetter("mrn_item_info_slave_update_date")
	public String getMrn_item_info_slave_update_date() {
		return mrn_item_info_slave_update_date;
	}

	@JsonSetter("mrn_item_info_slave_update_date")
	public void setMrn_item_info_slave_update_date(
			String mrn_item_info_slave_update_date) {
		this.mrn_item_info_slave_update_date = mrn_item_info_slave_update_date;
	}
	
	@JsonGetter("mrn_item_info_slave_create_date")
	public String getMrn_item_info_slave_create_date() {
		return mrn_item_info_slave_create_date;
	}

	@JsonSetter("mrn_item_info_slave_create_date")
	public void setMrn_item_info_slave_create_date(
			String mrn_item_info_slave_create_date) {
		this.mrn_item_info_slave_create_date = mrn_item_info_slave_create_date;
	}

	@JsonGetter("inventoryMaterialRequestNoteItemInfoSlaveDTO")
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getInventoryMaterialRequestNoteItemInfoSlaveDTO() {
		return inventoryMaterialRequestNoteItemInfoSlaveDTO;
	}

	@JsonSetter("inventoryMaterialRequestNoteItemInfoSlaveDTO")
	public void setInventoryMaterialRequestNoteItemInfoSlaveDTO(
			List<InventoryMaterialRequestNoteItemInfoSlaveDTO> inventoryMaterialRequestNoteItemInfoSlaveDTO) {
		this.inventoryMaterialRequestNoteItemInfoSlaveDTO = inventoryMaterialRequestNoteItemInfoSlaveDTO;
	}
	
	@JsonGetter("mrn_item_issue_qty")
	public Integer getMrn_item_issue_qty() {
		return mrn_item_issue_qty;
	}

	@JsonSetter("mrn_item_issue_qty")
	public void setMrn_item_issue_qty(Integer mrn_item_issue_qty) {
		this.mrn_item_issue_qty = mrn_item_issue_qty;
	}
	@JsonGetter("mrn_item_info_slave_item_code")
	public Integer getMrn_item_info_slave_item_code() {
		return mrn_item_info_slave_item_code;
	}

	@JsonSetter("mrn_item_info_slave_item_code")
	public void setMrn_item_info_slave_item_code(
			Integer mrn_item_info_slave_item_code) {
		this.mrn_item_info_slave_item_code = mrn_item_info_slave_item_code;
	}
	@JsonGetter("mrn_item_info_slave_item_selItemQty")
	public String getMrn_item_info_slave_item_selItemQty() {
		return mrn_item_info_slave_item_selItemQty;
	}

	@JsonSetter("mrn_item_info_slave_item_selItemQty")
	public void setMrn_item_info_slave_item_selItemQty(
			String mrn_item_info_slave_item_selItemQty) {
		this.mrn_item_info_slave_item_selItemQty = mrn_item_info_slave_item_selItemQty;
	}

	@JsonGetter("inv_mrn_item_info_slave_subinventory")
	public String getInv_mrn_item_info_slave_subinventory() {
		return inv_mrn_item_info_slave_subinventory;
	}

	@JsonSetter("inv_mrn_item_info_slave_subinventory")
	public void setInv_mrn_item_info_slave_subinventory(
			String inv_mrn_item_info_slave_subinventory) {
		this.inv_mrn_item_info_slave_subinventory = inv_mrn_item_info_slave_subinventory;
	}
	
	@JsonGetter("mrn_item_info_slave_issue_qty")
	public Integer getMrn_item_info_slave_issue_qty() {
		return mrn_item_info_slave_issue_qty;
	}

	@JsonSetter("mrn_item_info_slave_issue_qty")
	public void setMrn_item_info_slave_issue_qty(
			Integer mrn_item_info_slave_issue_qty) {
		this.mrn_item_info_slave_issue_qty = mrn_item_info_slave_issue_qty;
	}
	@JsonGetter("mrn_status")
	public String getMrn_status() {
		return mrn_status;
	}
	@JsonSetter("mrn_status")
	public void setMrn_status(String mrn_status) {
		this.mrn_status = mrn_status;
	}
	@JsonGetter("inv_mrn_received_date")
	public String getInv_mrn_received_date() {
		return inv_mrn_received_date;
	}

	@JsonSetter("inv_mrn_received_date")
	public void setInv_mrn_received_date(String inv_mrn_received_date) {
		this.inv_mrn_received_date = inv_mrn_received_date;
	}

	@JsonGetter("inv_mrn_item_info_slave_subinventory_consumption_qty")
	public Integer getInv_mrn_item_info_slave_subinventory_consumption_qty() {
		return inv_mrn_item_info_slave_subinventory_consumption_qty;
	}

	@JsonSetter("inv_mrn_item_info_slave_subinventory_consumption_qty")
	public void setInv_mrn_item_info_slave_subinventory_consumption_qty(
			Integer inv_mrn_item_info_slave_subinventory_consumption_qty) {
		this.inv_mrn_item_info_slave_subinventory_consumption_qty = inv_mrn_item_info_slave_subinventory_consumption_qty;
	}

	@JsonGetter("mrn_item_info_slave_fixed_issue_qty_to_subinventory")
	public Integer getMrn_item_info_slave_fixed_issue_qty_to_subinventory() {
		return mrn_item_info_slave_fixed_issue_qty_to_subinventory;
	}

	@JsonSetter("mrn_item_info_slave_fixed_issue_qty_to_subinventory")
	public void setMrn_item_info_slave_fixed_issue_qty_to_subinventory(
			Integer mrn_item_info_slave_fixed_issue_qty_to_subinventory) {
		this.mrn_item_info_slave_fixed_issue_qty_to_subinventory = mrn_item_info_slave_fixed_issue_qty_to_subinventory;
	}

	@JsonGetter("inv_mrn_item_info_slave_subinventory_consumption_date")
	public String getInv_mrn_item_info_slave_subinventory_consumption_date() {
		return inv_mrn_item_info_slave_subinventory_consumption_date;
	}

	@JsonSetter("inv_mrn_item_info_slave_subinventory_consumption_date")
	public void setInv_mrn_item_info_slave_subinventory_consumption_date(
			String inv_mrn_item_info_slave_subinventory_consumption_date) {
		this.inv_mrn_item_info_slave_subinventory_consumption_date = inv_mrn_item_info_slave_subinventory_consumption_date;
	}
	@JsonGetter("inv_consumption_master_patient_name")
	public String getInv_consumption_master_patient_name() {
		return inv_consumption_master_patient_name;
	}

	@JsonSetter("inv_consumption_master_patient_name")
	public void setInv_consumption_master_patient_name(
			String inv_consumption_master_patient_name) {
		this.inv_consumption_master_patient_name = inv_consumption_master_patient_name;
	}

	@JsonGetter("inv_consumption_master_patient_id")
	public Integer getInv_consumption_master_patient_id() {
		return inv_consumption_master_patient_id;
	}

	@JsonSetter("inv_consumption_master_patient_id")
	public void setInv_consumption_master_patient_id(
			Integer inv_consumption_master_patient_id) {
		this.inv_consumption_master_patient_id = inv_consumption_master_patient_id;
	}

	@JsonGetter("currentSubInventoryStock")
	public Integer getCurrentSubInventoryStock() {
		return currentSubInventoryStock;
	}

	@JsonSetter("currentSubInventoryStock")
	public void setCurrentSubInventoryStock(Integer currentSubInventoryStock) {
		this.currentSubInventoryStock = currentSubInventoryStock;
	}

	@JsonGetter("mainInventoryStock")
	public Integer getMainInventoryStock() {
		return mainInventoryStock;
	}

	@JsonSetter("mainInventoryStock")
	public void setMainInventoryStock(Integer mainInventoryStock) {
		this.mainInventoryStock = mainInventoryStock;
	}
	
 
	
	
	
	
	
	
	
	 
	 /*********addd mrn returnquantity by paras @date 11nov *******************/
	
	 
	 
	 @JsonGetter("mrntotalReturn")
		public String getMrntotalReturn() {
		return mrntotalReturn;
	}
	 @JsonSetter("mrntotalReturn")
	public void setMrntotalReturn(String mrntotalReturn) {
		this.mrntotalReturn = mrntotalReturn;
	}
		@JsonGetter("mrnReturnBy")
		public String getMrnReturnBy() {
		return mrnReturnBy;
	}
		 @JsonSetter("mrnReturnBy")
	public void setMrnReturnBy(String mrnReturnBy) {
		this.mrnReturnBy = mrnReturnBy;
	}
		@JsonGetter("mrnReturnDate")
	 public String getMrnReturnDate() {
		return mrnReturnDate;
	}
		 @JsonSetter("mrnReturnDate")
	public void setMrnReturnDate(String mrnReturnDate) {
		this.mrnReturnDate = mrnReturnDate;
	}
	@JsonGetter("mrnReturnName")
	 public String getMrnReturnName() {
		return mrnReturnName;
	}
	 @JsonSetter("mrnReturnName")
	public void setMrnReturnName(String mrnReturnName) {
		this.mrnReturnName = mrnReturnName;
	}
	@JsonGetter("mrnRemark")
	 public String getMrnRemark() {
		return mrnRemark;
	}
	 @JsonSetter("mrnRemark")
	public void setMrnRemark(String mrnRemark) {
		this.mrnRemark = mrnRemark;
	}
	@JsonGetter("mrnTotal")
	 public Integer getMrnTotal() {
		return mrnTotal;
	}
	 @JsonSetter("mrnTotal")
	public void setMrnTotal(Integer mrnTotal) {
		this.mrnTotal = mrnTotal;
	}
	@JsonGetter("mrnDate")
	 public String getMrnDate() {
		return mrnDate;
	}
	 @JsonSetter("mrnDate")
	public void setMrnDate(String mrnDate) {
		this.mrnDate = mrnDate;
	}
	@JsonGetter("mrnReturndocno")
		public Integer getMrnReturndocno() {
		return mrnReturndocno;
	}
	 @JsonSetter("mrnReturndocno")
	public void setMrnReturndocno(Integer mrnReturndocno) {
		this.mrnReturndocno = mrnReturndocno;
	}

		@JsonGetter("mrn_item_info_slave_Return_ConsumeQty")
	 public Integer getMrn_item_info_slave_Return_ConsumeQty() {
		return mrn_item_info_slave_Return_ConsumeQty;
	}	
		 
	@JsonSetter("mrn_item_info_slave_Return_ConsumeQty")
	public void setMrn_item_info_slave_Return_ConsumeQty(
			Integer mrn_item_info_slave_Return_ConsumeQty) {
		this.mrn_item_info_slave_Return_ConsumeQty = mrn_item_info_slave_Return_ConsumeQty;
	} 

	@JsonGetter("mrn_item_info_slave_Return_qty")
	 public Integer getMrn_item_info_slave_Return_qty() {
		return mrn_item_info_slave_Return_qty;
	}
	@JsonSetter("mrn_item_info_slave_Return_qty")
	public void setMrn_item_info_slave_Return_qty(
			Integer mrn_item_info_slave_Return_qty) {
		this.mrn_item_info_slave_Return_qty = mrn_item_info_slave_Return_qty;
	}
	@JsonGetter("currentUserID")
	public Integer getCurrentUserID() {
		return currentUserID;
	}
	@JsonSetter("currentUserID")
	public void setCurrentUserID(Integer currentUserID) {
		this.currentUserID = currentUserID;
	}
	@JsonGetter("currentuserName")
	public String getCurrentuserName() {
		return currentuserName;
	}
	@JsonSetter("currentuserName")
	public void setCurrentuserName(String currentuserName) {
		this.currentuserName = currentuserName;
	}
	@JsonGetter("mrnSrNo")
	public String getMrnSrNo() {
		return mrnSrNo;
	}
	@JsonSetter("mrnSrNo")
	public void setMrnSrNo(String mrnSrNo) {
		this.mrnSrNo = mrnSrNo;
	}
	@JsonGetter("maintncAstId")
	public Integer getMaintncAstId() {
		return maintncAstId;
	}
	@JsonSetter("maintncAstId")
	public void setMaintncAstId(Integer maintncAstId) {
		this.maintncAstId = maintncAstId;
	}
	
	
	
	
	 
	/*********addd mrn returnquantity by paras @date 11nov *******************/
	
	
	
	
}