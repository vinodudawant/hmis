package com.hms.rostermanagement.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity 
@Table(name = "ehat_scheduler_room_master")
public class SchedulerRoomMasterDto {
	
	
	@Id
	@Column(name = "room_id")
	private Integer roomId;
	
	@Column(name = "room_name")
	private String roomName;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "added_by",updatable=false)
	private String addedBy;
	
	@Column(name = "added_on",updatable=false)
	private String addedOn;
	
	@Column(name = "modify_by")
	private String modifyBy;
	
	@Column(name = "modify_on")
	private String modifyOn;
	
	@Column(name = "remote_ip")
	private String remoteAddress;
	
	@Transient
	private List<SchedulerRoomMasterDto> listSchedulerRoomMasterDto;

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	public String getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(String addedOn) {
		this.addedOn = addedOn;
	}

	public String getModifyBy() {
		return modifyBy;
	}

	public void setModifyBy(String modifyBy) {
		this.modifyBy = modifyBy;
	}

	public String getModifyOn() {
		return modifyOn;
	}

	public void setModifyOn(String modifyOn) {
		this.modifyOn = modifyOn;
	}

	public String getRemoteAddress() {
		return remoteAddress;
	}

	public void setRemoteAddress(String remoteAddress) {
		this.remoteAddress = remoteAddress;
	}

	public List<SchedulerRoomMasterDto> getListSchedulerRoomMasterDto() {
		return listSchedulerRoomMasterDto;
	}

	public void setListSchedulerRoomMasterDto(
			List<SchedulerRoomMasterDto> listSchedulerRoomMasterDto) {
		this.listSchedulerRoomMasterDto = listSchedulerRoomMasterDto;
	}
	
	
}
