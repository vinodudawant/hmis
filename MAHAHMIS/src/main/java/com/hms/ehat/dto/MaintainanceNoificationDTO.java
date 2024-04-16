package com.hms.ehat.dto;

import java.sql.Date;

import java.util.List;

public class MaintainanceNoificationDTO {
	

	private Integer machine_maintainance_id; 
	
	private Integer machine_maintainance_item_id;
	
	private String item_name;
	
	private Date  maintainance_date;
	
	private Integer  expire;  
	
	private String maintainance_date2;
	
	private List<MaintainanceNoificationDTO> ltMaintainanceNotificationDTO;

	public Integer getMachine_maintainance_id() {
		return machine_maintainance_id;
	}

	public void setMachine_maintainance_id(Integer machine_maintainance_id) {
		this.machine_maintainance_id = machine_maintainance_id;
	}

	public Integer getMachine_maintainance_item_id() {
		return machine_maintainance_item_id;
	}

	public void setMachine_maintainance_item_id(Integer machine_maintainance_item_id) {
		this.machine_maintainance_item_id = machine_maintainance_item_id;
	}

	public String getItem_name() {
		return item_name;
	}

	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	public Date getMaintainance_date() {
		return maintainance_date;
	}

	public void setMaintainance_date(Date maintainance_date) {
		this.maintainance_date = maintainance_date;
	}

	public Integer getExpire() {
		return expire;
	}

	public void setExpire(Integer expire) {
		this.expire = expire;
	}

	public String getMaintainance_date2() {
		return maintainance_date2;
	}

	public void setMaintainance_date2(String maintainance_date2) {
		this.maintainance_date2 = maintainance_date2;
	}

	public List<MaintainanceNoificationDTO> getLtMaintainanceNotificationDTO() {
		return ltMaintainanceNotificationDTO;
	}

	public void setLtMaintainanceNotificationDTO(
			List<MaintainanceNoificationDTO> ltMaintainanceNotificationDTO) {
		this.ltMaintainanceNotificationDTO = ltMaintainanceNotificationDTO;
	}

}
