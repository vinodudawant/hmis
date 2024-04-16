package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InvestigationBodyPart {

	private int id;
	private String bodyPartName;
	private String groupName;
	private int groupId;
	private List<InvestigationBodyPart> InvList;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("bodyPartName")
	public String getBodyPartName() {
		return bodyPartName;
	}
	@JsonSetter("bodyPartName")
	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
	}
	@JsonGetter("groupName")
	public String getGroupName() {
		return groupName;
	}
	@JsonSetter("groupName")
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	@JsonGetter("groupId")
	public int getGroupId() {
		return groupId;
	}
	@JsonSetter("groupId")
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	@JsonGetter("InvList")
	public List<InvestigationBodyPart> getInvList() {
		return InvList;
	}
	@JsonSetter("InvList")
	public void setInvList(List<InvestigationBodyPart> invList) {
		InvList = invList;
	}
}
