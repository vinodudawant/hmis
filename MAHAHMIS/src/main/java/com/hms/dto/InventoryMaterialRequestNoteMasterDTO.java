package com.hms.dto;

import java.sql.Date;
import java.util.List;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryMaterialRequestNoteMasterDTO 

{		
	
	private Integer  mrn_id;
	private Integer mrn_doc_no;
	private String mrn_remark;
	private Integer mrn_total_qty; 
	private Integer mrn_delete_flag;
	private String mrn_update_date;
	private String mrn_create_date;
	private String mrn_date;
	private String mrn_status;
	private Integer mrn_pr_flag;
	private String  inv_mrn_location_name;
	private String  inv_mrn_location;
	private String inv_mrn_dispatched_date;
	private String inv_mrn_recived_date;
	private String  inv_mrn_receiver_name;
	private String inv_mrn_booker_name;
	private Integer idinv_purchase_request_number;
	private String  inv_mrn_approved_status;
	private String inv_mrn_a1_doc_id;
	private String inv_mrn_a2_doc_id;
	private String inv_mrn_a3_doc_id;
	private String inv_subinventory_id;
	
	private String tosubInvName;
	private Integer tosubInvId;
	private Integer currtUsrId;
	
	private String ipAddress;
	private String showIncloud; 
	
	private Integer hllCenterId;
	private String hllCenterName;
	private Integer purReqId;
	private String purReqDate;
	private String clubMrn;
	private String centerId;
	private String mrnFromClient;
	private String mrnReview;
	private String mrnNote;
	private String rejectFlag;
	private String orderReciveflag;
	
	private List<InventoryMaterialRequestNoteItemInfoSlaveDTO> ltInventoryMaterialRequestNoteItemInfoSlaveDTOs;
	private List<InventoryMaterialRequestNoteMasterDTO> inventoryMaterialRequestNoteMasterDTO;


	@JsonGetter("mrn_id")
	public Integer getMrn_id() {
		return mrn_id;
	}

	@JsonSetter("mrn_id")
	public void setMrn_id(Integer mrn_id) {
		this.mrn_id = mrn_id;
	}

	@JsonGetter("mrn_doc_no")
	public Integer getMrn_doc_no() {
		return mrn_doc_no;
	}
	
	@JsonSetter("mrn_doc_no")
	public void setMrn_doc_no(Integer mrn_doc_no) {
		this.mrn_doc_no = mrn_doc_no;
	}

	@JsonGetter("mrn_remark")
	public String getMrn_remark() {
		return mrn_remark;
	}

	@JsonSetter("mrn_remark")
	public void setMrn_remark(String mrn_remark) {
		this.mrn_remark = mrn_remark;
	}

	@JsonGetter("mrn_total_qty")
	public Integer getMrn_total_qty() {
		return mrn_total_qty;
	}

	@JsonSetter("mrn_total_qty")
	public void setMrn_total_qty(Integer mrn_total_qty) {
		this.mrn_total_qty = mrn_total_qty;
	}

	@JsonGetter("mrn_delete_flag")
	public Integer getMrn_delete_flag() {
		return mrn_delete_flag;
	}
	
	@JsonSetter("mrn_delete_flag")
	public void setMrn_delete_flag(Integer mrn_delete_flag) {
		this.mrn_delete_flag = mrn_delete_flag;
	}

	@JsonGetter("mrn_update_date")
	public String getMrn_update_date() {
		return mrn_update_date;
	}
	
	@JsonSetter("mrn_update_date")
	public void setMrn_update_date(String mrn_update_date) {
		this.mrn_update_date = mrn_update_date;
	}

	@JsonGetter("mrn_create_date")
	public String getMrn_create_date() {
		return mrn_create_date;
	}

	@JsonSetter("mrn_create_date")
	public void setMrn_create_date(String mrn_create_date) {
		this.mrn_create_date = mrn_create_date;
	}

	@JsonGetter("mrn_date")
	public String getMrn_date() {
		return mrn_date;
	}

	@JsonSetter("mrn_date")
	public void setMrn_date(String mrn_date) {
		this.mrn_date = mrn_date;
	}
	
	@JsonGetter("mrn_status")
	public String getMrn_status() {
		return mrn_status;
	}

	@JsonSetter("mrn_status")
	public void setMrn_status(String mrn_status) {
		this.mrn_status = mrn_status;
	}
	
	
	@JsonGetter("mrn_pr_flag")
	public Integer getMrn_pr_flag() {
		return mrn_pr_flag;
	}

	@JsonSetter("mrn_pr_flag")
	public void setMrn_pr_flag(Integer mrn_pr_flag) {
		this.mrn_pr_flag = mrn_pr_flag;
	}
	@JsonGetter("inv_mrn_location_name")	
	public String getInv_mrn_location_name() {
		return inv_mrn_location_name;
	}

	@JsonSetter("inv_mrn_location_name")
	public void setInv_mrn_location_name(String inv_mrn_location_name) {
		this.inv_mrn_location_name = inv_mrn_location_name;
	}

	@JsonGetter("inv_mrn_location")
	public String getInv_mrn_location() {
		return inv_mrn_location;
	}

	@JsonSetter("inv_mrn_location")
	public void setInv_mrn_location(String inv_mrn_location) {
		this.inv_mrn_location = inv_mrn_location;
	}
	
	@JsonGetter("inv_mrn_dispatched_date")
	public String getInv_mrn_dispatched_date() {
		return inv_mrn_dispatched_date;
	}
	@JsonSetter("inv_mrn_dispatched_date")
	public void setInv_mrn_dispatched_date(String inv_mrn_dispatched_date) {
		this.inv_mrn_dispatched_date = inv_mrn_dispatched_date;
	}

	@JsonGetter("inv_mrn_recived_date")
	public String getInv_mrn_recived_date() {
		return inv_mrn_recived_date;
	}

	@JsonSetter("inv_mrn_recived_date")
	public void setInv_mrn_recived_date(String inv_mrn_recived_date) {
		this.inv_mrn_recived_date = inv_mrn_recived_date;
	}

	@JsonGetter("inventoryMaterialRequestNoteMasterDTO")
	public List<InventoryMaterialRequestNoteMasterDTO> getInventoryMaterialRequestNoteMasterDTO() {
		return inventoryMaterialRequestNoteMasterDTO;
	}

	@JsonSetter("inventoryMaterialRequestNoteMasterDTO")
	public void setInventoryMaterialRequestNoteMasterDTO(
			List<InventoryMaterialRequestNoteMasterDTO> inventoryMaterialRequestNoteMasterDTO) {
		this.inventoryMaterialRequestNoteMasterDTO = inventoryMaterialRequestNoteMasterDTO;
	}

	@JsonGetter("ltInventoryMaterialRequestNoteItemInfoSlaveDTOs")
	public List<InventoryMaterialRequestNoteItemInfoSlaveDTO> getLtInventoryMaterialRequestNoteItemInfoSlaveDTOs() {
		return ltInventoryMaterialRequestNoteItemInfoSlaveDTOs;
	}

	@JsonSetter("ltInventoryMaterialRequestNoteItemInfoSlaveDTOs")
	public void setLtInventoryMaterialRequestNoteItemInfoSlaveDTOs(
			List<InventoryMaterialRequestNoteItemInfoSlaveDTO> ltInventoryMaterialRequestNoteItemInfoSlaveDTOs) {
		this.ltInventoryMaterialRequestNoteItemInfoSlaveDTOs = ltInventoryMaterialRequestNoteItemInfoSlaveDTOs;
	}

	@JsonGetter("inv_mrn_receiver_name")
	public String getInv_mrn_receiver_name() {
		return inv_mrn_receiver_name;
	}
	
	@JsonSetter("inv_mrn_receiver_name")
	public void setInv_mrn_receiver_name(String inv_mrn_receiver_name) {
		this.inv_mrn_receiver_name = inv_mrn_receiver_name;
	}

	@JsonGetter("inv_mrn_booker_name")
	public String getInv_mrn_booker_name() {
		return inv_mrn_booker_name;
	}
	
	@JsonSetter("inv_mrn_booker_name")
	public void setInv_mrn_booker_name(String inv_mrn_booker_name) {
		this.inv_mrn_booker_name = inv_mrn_booker_name;
	}

	@JsonGetter("idinv_purchase_request_number")
	public Integer getIdinv_purchase_request_number() {
		return idinv_purchase_request_number;
	}

	@JsonSetter("idinv_purchase_request_number")
	public void setIdinv_purchase_request_number(
			Integer idinv_purchase_request_number) {
		this.idinv_purchase_request_number = idinv_purchase_request_number;
	}
	@JsonGetter("inv_mrn_approved_status")
	public String getInv_mrn_approved_status() {
		return inv_mrn_approved_status;
	}
	
	@JsonSetter("inv_mrn_approved_status")
	public void setInv_mrn_approved_status(String inv_mrn_approved_status) {
		this.inv_mrn_approved_status = inv_mrn_approved_status;
	}

	@JsonGetter("inv_mrn_a1_doc_id")
	public String getInv_mrn_a1_doc_id() {
		return inv_mrn_a1_doc_id;
	}

	@JsonSetter("inv_mrn_a1_doc_id")
	public void setInv_mrn_a1_doc_id(String inv_mrn_a1_doc_id) {
		this.inv_mrn_a1_doc_id = inv_mrn_a1_doc_id;
	}

	@JsonGetter("inv_mrn_a2_doc_id")
	public String getInv_mrn_a2_doc_id() {
		return inv_mrn_a2_doc_id;
	}

	@JsonSetter("inv_mrn_a2_doc_id")
	public void setInv_mrn_a2_doc_id(String inv_mrn_a2_doc_id) {
		this.inv_mrn_a2_doc_id = inv_mrn_a2_doc_id;
	}

	@JsonGetter("inv_mrn_a3_doc_id")
	public String getInv_mrn_a3_doc_id() {
		return inv_mrn_a3_doc_id;
	}

	@JsonSetter("inv_mrn_a3_doc_id")
	public void setInv_mrn_a3_doc_id(String inv_mrn_a3_doc_id) {
		this.inv_mrn_a3_doc_id = inv_mrn_a3_doc_id;
	}

	@JsonGetter("inv_subinventory_id")
	public String getInv_subinventory_id() {
		return inv_subinventory_id;
	}
	@JsonSetter("inv_subinventory_id")
	public void setInv_subinventory_id(String inv_subinventory_id) {
		this.inv_subinventory_id = inv_subinventory_id;
	}
	@JsonGetter("tosubInvName")
	public String getTosubInvName() {
		return tosubInvName;
	}

	@JsonSetter("tosubInvName")
	public void setTosubInvName(String tosubInvName) {
		this.tosubInvName = tosubInvName;
	}

	@JsonGetter("tosubInvId")
	public Integer getTosubInvId() {
		return tosubInvId;
	}
	
	@JsonSetter("tosubInvId")
	public void setTosubInvId(Integer tosubInvId) {
		this.tosubInvId = tosubInvId;
	}

	public Integer getCurrtUsrId() {
		return currtUsrId;
	}

	public void setCurrtUsrId(Integer currtUsrId) {
		this.currtUsrId = currtUsrId;
	}
	
	
	 public String getIpAddress() {
	        return ipAddress;
	    }

	    public void setIpAddress(String ipAddress) {
	        this.ipAddress = ipAddress;
	    }
	    @JsonGetter("showIncloud")
		public String getShowIncloud() {
			return showIncloud;
		}
	    @JsonSetter("showIncloud")
		public void setShowIncloud(String showIncloud) {
			this.showIncloud = showIncloud;
		}
		@JsonGetter("hllCenterId")
		public Integer getHllCenterId() {
			return hllCenterId;
		}
		@JsonSetter("hllCenterId")
		public void setHllCenterId(Integer hllCenterId) {
			this.hllCenterId = hllCenterId;
		}
		@JsonGetter("hllCenterName")
		public String getHllCenterName() {
			return hllCenterName;
		}
		@JsonSetter("hllCenterName")
		public void setHllCenterName(String hllCenterName) {
			this.hllCenterName = hllCenterName;
		}
		@JsonGetter("purReqId")
		public Integer getPurReqId() {
			return purReqId;
		}

		@JsonSetter("purReqId")
		public void setPurReqId(Integer purReqId) {
			this.purReqId = purReqId;
		}

		@JsonGetter("purReqDate")
		public String getPurReqDate() {
			return purReqDate;
		}
	@JsonSetter("purReqDate")
		public void setPurReqDate(String purReqDate) {
			this.purReqDate = purReqDate;
		}

	public String getClubMrn() {
		return clubMrn;
	}

	public void setClubMrn(String clubMrn) {
		this.clubMrn = clubMrn;
	}
	@JsonGetter("center_id")
	 public String getCenterId() {
			return centerId;
		}
	
	@JsonSetter("center_id")
		public void setCenterId(String centerId) {
			this.centerId = centerId;
		}

	public String getMrnFromClient() {
		return mrnFromClient;
	}

	public void setMrnFromClient(String mrnFromClient) {
		this.mrnFromClient = mrnFromClient;
	}

	public String getMrnReview() {
		return mrnReview;
	}

	public void setMrnReview(String mrnReview) {
		this.mrnReview = mrnReview;
	}

	public String getMrnNote() {
		return mrnNote;
	}

	public void setMrnNote(String mrnNote) {
		this.mrnNote = mrnNote;
	}

	public String getRejectFlag() {
		return rejectFlag;
	}

	public void setRejectFlag(String rejectFlag) {
		this.rejectFlag = rejectFlag;
	}

	public String getOrderReciveflag() {
		return orderReciveflag;
	}

	public void setOrderReciveflag(String orderReciveflag) {
		this.orderReciveflag = orderReciveflag;
	}

	
	 
}
