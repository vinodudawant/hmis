package com.hms.ot.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

public class AssistantSurgeon {
	
	private int idAsstSurgeon;
	private int asstDocId;
	private String status;
	private List<AssistantSurgeon> listAssistantSurgeon;

	@JsonGetter("idAsstSur")
	public int getIdAsstSurgeon() {
		return idAsstSurgeon;
	}

	@JsonSetter("idAsstSur")
	public void setIdAsstSurgeon(int idAsstSurgeon) {
		this.idAsstSurgeon = idAsstSurgeon;
	}

	@JsonGetter("asstDocId")
	public int getAsstDocId() {
		return asstDocId;
	}

	@JsonSetter("asstDocId")
	public void setAsstDocId(int asstDocId) {
		this.asstDocId = asstDocId;
	}

	@JsonGetter("liAsstSurgeon")
	public List<AssistantSurgeon> getListAssistantSurgeon() {
		return listAssistantSurgeon;
	}

	@JsonSetter("liAsstSurgeon")
	public void setListAssistantSurgeon(
			List<AssistantSurgeon> listAssistantSurgeon) {
		this.listAssistantSurgeon = listAssistantSurgeon;
	}

	@JsonGetter("st")
	public String getStatus() {
		return this.status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
}
