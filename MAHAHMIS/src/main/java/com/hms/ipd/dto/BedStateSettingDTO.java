package com.hms.ipd.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="bed_state_setting")
public class BedStateSettingDTO {

	@Id
	@GeneratedValue
    @Column(name="id")
	private int id;
	
	@Column(name="setting_type")
	private String settingType;
	
	@Column(name="time_in")
	private String timeIn;
	
	@Column(name="time_val")
	private long timeVal;
	
	@Column(name="unit_id")
	private String unitId;
	
	@Transient
	private List<BedStateSettingDTO> lstBedStateSetting;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSettingType() {
		return settingType;
	}

	public void setSettingType(String settingType) {
		this.settingType = settingType;
	}

	public String getTimeIn() {
		return timeIn;
	}

	public void setTimeIn(String timeIn) {
		this.timeIn = timeIn;
	}

	public long getTimeVal() {
		return timeVal;
	}

	public void setTimeVal(long timeVal) {
		this.timeVal = timeVal;
	}

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}

	public List<BedStateSettingDTO> getLstBedStateSetting() {
		return lstBedStateSetting;
	}

	public void setLstBedStateSetting(List<BedStateSettingDTO> lstBedStateSetting) {
		this.lstBedStateSetting = lstBedStateSetting;
	}
}
