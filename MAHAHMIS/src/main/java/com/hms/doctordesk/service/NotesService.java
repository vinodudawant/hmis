package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.NotesDto;
import com.hms.ehat.dto.RegTreBillDto;

public interface NotesService {

	//String getNextNotesID();

	int saveNotes(NotesDto notes, HttpServletRequest request);

	List<NotesDto> getAllNotes(int treatmentId);

	NotesDto editNotes(Integer notesId);

	boolean deleteNotes(Integer notesId, HttpServletRequest request);

	String getNextNotesID(Integer treatmentId);

	List<NotesDto> getAllNotesCount(int patientId);

	List<NotesDto> viewNotesById(int treatmentId, int notesId);


	

	//NotesDto notesCount(Integer unitid);

}
