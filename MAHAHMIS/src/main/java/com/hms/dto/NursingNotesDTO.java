package com.hms.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name="nursing_notes")
public class NursingNotesDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="notesid")
	private int noteId=0;
	
	@Column(name = "notes")
	private String notes="-";
	
	@Column(name = "heading_note")
	private String headNote="-";

	@Column(name = "status")
	private String status="Y";
	
	@Transient
	private List<NursingNotesDTO> notesList;
	
	@JsonGetter("nid")
	public int getNoteId() {
		return noteId;
	}
	@JsonSetter("nid")
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	@JsonGetter("notes")
	public String getNotes() {
		return notes;
	}
	@JsonSetter("notes")
	public void setNotes(String notes) {
		this.notes = notes;
	}
	@JsonGetter("nlist")
	public List<NursingNotesDTO> getNotesList() {
		return notesList;
	}
	@JsonSetter("nlist")
	public void setNotesList(List<NursingNotesDTO> notesList) {
		this.notesList = notesList;
	}
	@JsonGetter("hedn")
	public String getHeadNote() {
		return headNote;
	}
	@JsonSetter("hedn")
	public void setHeadNote(String headNote) {
		this.headNote = headNote;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
