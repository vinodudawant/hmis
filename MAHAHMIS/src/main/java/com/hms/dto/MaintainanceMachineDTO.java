package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MaintainanceMachineDTO {
	
	private Integer machine_maintainance_id;
	private Integer machine_maintainance_item_id;
	private String item_name;
	private String from_date ;
	private String to_date;
	private Integer months;
	private String comment;
	private Date maintainance_machine_create_date;
	private Date  maintainance_machine_update_date;
	private Integer maintainance_machine_delete_flag;
	private String invsrnoformainteitem = null;
	private Integer invgrnid = 0;
	
	private Integer curruserid;
	private String currusername;
	
	private String isertedmachineid;
	
	private Date  maintainance_date;
	private Integer  expire;
	private String maintainance_date2;
	
	private List<MaintainanceMachineDTO> ltMaintainanceMachineDTO;
	
	@JsonGetter("machine_maintainance_id")
	public Integer getMachine_maintainance_id() {
		return machine_maintainance_id;
	}
	@JsonSetter("machine_maintainance_id")
	public void setMachine_maintainance_id(Integer machine_maintainance_id) {
		this.machine_maintainance_id = machine_maintainance_id;
	}
	
	@JsonGetter("machine_maintainance_item_id")
	public Integer getMachine_maintainance_item_id() {
		return machine_maintainance_item_id;
	}
	@JsonSetter("machine_maintainance_item_id")
	public void setMachine_maintainance_item_id(Integer machine_maintainance_item_id) {
		this.machine_maintainance_item_id = machine_maintainance_item_id;
	}
	
	@JsonGetter("item_name")
	public String getItem_name() {
		return item_name;
	}
	@JsonSetter("item_name")
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	
	@JsonGetter("from_date")
	public String getFrom_date() {
		return from_date;
	}
	@JsonSetter("from_date")
	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}
	
	@JsonGetter("to_date")
	public String getTo_date() {
		return to_date;
	}
	@JsonSetter("to_date")
	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}
	
	@JsonGetter("months")
	public Integer getMonths() {
		return months;
	}
	@JsonSetter("months")
	public void setMonths(Integer months) {
		this.months = months;
	}
	
	@JsonGetter("maintainance_machine_create_date")
	public Date getMaintainance_machine_create_date() {
		return maintainance_machine_create_date;
	}
	@JsonSetter("maintainance_machine_create_date")
	public void setMaintainance_machine_create_date(
			Date maintainance_machine_create_date) {
		this.maintainance_machine_create_date = maintainance_machine_create_date;
	}
	
	@JsonGetter("maintainance_machine_update_date")
	public Date getMaintainance_machine_update_date() {
		return maintainance_machine_update_date;
	}
	@JsonSetter("maintainance_machine_update_date")
	public void setMaintainance_machine_update_date(
			Date maintainance_machine_update_date) {
		this.maintainance_machine_update_date = maintainance_machine_update_date;
	}
	
	@JsonGetter("maintainance_machine_delete_flag")
	public Integer getMaintainance_machine_delete_flag() {
		return maintainance_machine_delete_flag;
	}
	@JsonSetter("maintainance_machine_delete_flag")
	public void setMaintainance_machine_delete_flag(
			Integer maintainance_machine_delete_flag) {
		this.maintainance_machine_delete_flag = maintainance_machine_delete_flag;
	}
	
	@JsonGetter("ltMaintainanceMachineDTO")
	public List<MaintainanceMachineDTO> getLtMaintainanceMachineDTO() {
		return ltMaintainanceMachineDTO;
	}
	@JsonSetter("ltMaintainanceMachineDTO")
	public void setLtMaintainanceMachineDTO(
			List<MaintainanceMachineDTO> ltMaintainanceMachineDTO) {
		this.ltMaintainanceMachineDTO = ltMaintainanceMachineDTO;
	}
	
	@JsonGetter("comment")
	public String getComment() {
		return comment;
	}
	@JsonSetter("comment")
	public void setComment(String comment) {
		this.comment = comment;
	}
	@JsonGetter("invsrnoformainteitem")
	public String getInvsrnoformainteitem() {
		return invsrnoformainteitem;
	}
	@JsonSetter("invsrnoformainteitem")
	public void setInvsrnoformainteitem(String invsrnoformainteitem) {
		this.invsrnoformainteitem = invsrnoformainteitem;
	}
	@JsonGetter("invgrnid")
	public Integer getInvgrnid() {
		return invgrnid;
	}
	@JsonSetter("invgrnid")
	public void setInvgrnid(Integer invgrnid) {
		this.invgrnid = invgrnid;
	}
	@JsonGetter("curruserid")
	public Integer getCurruserid() {
		return curruserid;
	}
	@JsonSetter("curruserid")
	public void setCurruserid(Integer curruserid) {
		this.curruserid = curruserid;
	}
	@JsonGetter("currusername")
	public String getCurrusername() {
		return currusername;
	}
	@JsonSetter("currusername")
	public void setCurrusername(String currusername) {
		this.currusername = currusername;
	}
	@JsonGetter("isertedmachineid")
	public String getIsertedmachineid() {
		return isertedmachineid;
	}
	@JsonSetter("isertedmachineid")
	public void setIsertedmachineid(String isertedmachineid) {
		this.isertedmachineid = isertedmachineid;
	}
	
	@JsonGetter("maintainance_date")
	public Date getMaintainance_date() {
		return maintainance_date;
	}
	
	@JsonSetter("maintainance_date")
	public void setMaintainance_date(Date maintainance_date) {
		this.maintainance_date = maintainance_date;
	}
	
	@JsonGetter
	public Integer getExpire() {
		return expire;
	}
	
	@JsonSetter
	public void setExpire(Integer expire) {
		this.expire = expire;
	}
	
	@JsonGetter
	public String getMaintainance_date2() {
		return maintainance_date2;
	}
	@JsonSetter
	public void setMaintainance_date2(String maintainance_date2) {
		this.maintainance_date2 = maintainance_date2;
	}
	
		

}
