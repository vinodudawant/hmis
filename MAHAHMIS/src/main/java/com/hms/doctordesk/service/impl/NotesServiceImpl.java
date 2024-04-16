package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.NotesDao;
import com.hms.doctordesk.dto.NotesDto;
import com.hms.doctordesk.service.NotesService;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.RegTreBillDto;

@Service
@Transactional
public class NotesServiceImpl implements NotesService{
	
	@Autowired
	NotesDao notesDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String getNextNotesID(Integer treatmentId) {
		return notesDao.getNextNotesID(treatmentId);
	}

	@Override
	public int saveNotes(NotesDto notes, HttpServletRequest request) {
		return notesDao.saveNotes(notes,request);
	}

	@Override
	public List<NotesDto> getAllNotes(int treatmentId) {
		return notesDao.getAllNotes(treatmentId);
	}

	@Override
	public NotesDto editNotes(Integer notesId) {
		return notesDao.editNotes(notesId);
	}

	@Override
	public boolean deleteNotes(Integer notesId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return notesDao.deleteNotes(notesId,userId);
	}

	@Override
	public List<NotesDto> getAllNotesCount(int patientId) {
		return notesDao.getAllNotesCount(patientId);
	}

	@Override
	public List<NotesDto> viewNotesById(int treatmentId, int notesId) {
		// TODO Auto-generated method stub
		return notesDao.viewNotesById(treatmentId,notesId);
	}

	

	/*@Override
	public NotesDto notesCount(Integer unitid) {
		return notesDao.notesCount(unitid);
	}*/

}
