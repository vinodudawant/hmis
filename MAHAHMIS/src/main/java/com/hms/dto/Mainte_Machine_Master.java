package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Mainte_Machine_Master {

	private int mainteMachineMAsterId;
	private String machineName;
	private String machineCode;

	private List<Mainte_Mashine_Date> mainte_Mashine_DateList;

	@JsonGetter("mmdList")
	public List<Mainte_Mashine_Date> getMainte_Mashine_DateList() {
		return mainte_Mashine_DateList;
	}

	@JsonSetter("mmdList")
	public void setMainte_Mashine_DateList(
			List<Mainte_Mashine_Date> mainte_Mashine_DateList) {
		this.mainte_Mashine_DateList = mainte_Mashine_DateList;
	}

	private MainteDate objMainteDate;

	@JsonGetter("objmd")
	public MainteDate getObjMainteDate() {
		return objMainteDate;
	}

	@JsonSetter("objmd")
	public void setObjMainteDate(MainteDate objMainteDate) {
		this.objMainteDate = objMainteDate;
	}

	private List<Mainte_Machine_Master> Mainte_Machine_MasterList;

	@JsonGetter("mmmlist")
	public List<Mainte_Machine_Master> getMainte_Machine_MasterList() {
		return Mainte_Machine_MasterList;
	}

	@JsonSetter("mmmlist")
	public void setMainte_Machine_MasterList(
			List<Mainte_Machine_Master> mainte_Machine_MasterList) {
		Mainte_Machine_MasterList = mainte_Machine_MasterList;
	}

	@JsonGetter("mmmi")
	public int getMainteMachineMAsterId() {
		return mainteMachineMAsterId;
	}

	@JsonSetter("mmmi")
	public void setMainteMachineMAsterId(int mainteMachineMAsterId) {
		this.mainteMachineMAsterId = mainteMachineMAsterId;
	}

	@JsonGetter("mn")
	public String getMachineName() {
		return machineName;
	}

	@JsonSetter("mn")
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}

	@JsonGetter("mc")
	public String getMachineCode() {
		return machineCode;
	}

	@JsonSetter("mc")
	public void setMachineCode(String machineCode) {
		this.machineCode = machineCode;
	}

}
