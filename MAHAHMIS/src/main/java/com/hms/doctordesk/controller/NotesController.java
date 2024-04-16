package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.HistoryMaster;
import com.hms.doctordesk.dto.NotesDto;
import com.hms.doctordesk.service.NotesService;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.RegTreBillDto;


@RestController
@RequestMapping(value="/notes")
public class NotesController {
	
static Logger log=Logger.getLogger(NotesController.class.getName());
	
	@Autowired
	NotesService notesService;
	
	static {
		System.out.println("NotesController Loaded...!");
	}

	@RequestMapping(value = "/getNextNotesID", method = RequestMethod.GET)
	public @ResponseBody
	String getNextNotesID(@RequestParam ("tid")Integer treatmentId,HttpServletRequest request){
		log.info("In NotesController getNextNotesID()");
		String obj = notesService.getNextNotesID(treatmentId);
		log.debug("Response-----> "+obj);
		return obj;
	}
	@RequestMapping(value = "/saveNotes", method = RequestMethod.POST)
	public int saveNotes(NotesDto notes, HttpServletRequest request) {
		log.info("In NotesController saveNotes()");
		//System.out.println(radio);
		//String msg = "";
		int response = notesService.saveNotes(notes, request);
		log.debug("Response----->"+response);
		return response;
	}
	@RequestMapping(value = "/getAllNotes", method = RequestMethod.GET)
	public @ResponseBody
	NotesDto getAllNotes(@RequestParam("tid") int treatmentId,HttpServletRequest request) {
		log.info("In NotesController getAllNotes()");
		List<NotesDto> lstNotes = new ArrayList<NotesDto>();
		lstNotes = notesService.getAllNotes(treatmentId);
		NotesDto obj = new NotesDto();
		obj.setLstnotes(lstNotes);
		log.debug("Response----> "+obj);
		return obj;
	}	
	@RequestMapping(value = "/viewNotesById", method = RequestMethod.GET)
	public @ResponseBody
	NotesDto viewNotesById(@RequestParam("tid") int treatmentId,@RequestParam("notesId")int notesId,HttpServletRequest request) {
		log.info("In NotesController viewNotesById()");
		List<NotesDto> lstNotes = new ArrayList<NotesDto>();
		lstNotes = notesService.viewNotesById(treatmentId,notesId);
		NotesDto obj = new NotesDto();
		obj.setLstnotes(lstNotes);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/getAllNotesCount", method = RequestMethod.GET)
	public @ResponseBody
	NotesDto getAllNotesCount(@RequestParam("pid") int patientId,HttpServletRequest request) {
		log.info("In NotesController getAllNotes()");
		List<NotesDto> lstNotes = new ArrayList<NotesDto>();
		lstNotes = notesService.getAllNotesCount(patientId);
		NotesDto obj = new NotesDto();
		obj.setLstnotes(lstNotes);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	
	@RequestMapping(value = "/editNotes", method = RequestMethod.GET)
	public @ResponseBody
	NotesDto editNotes(@RequestParam("notesId") Integer notesId) {
		log.info("In NotesController editNotes()");
		NotesDto obj = new NotesDto();
		obj = notesService.editNotes(notesId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	@RequestMapping(value = "/deleteNotes", method = RequestMethod.POST)
	public @ResponseBody
	String deleteNotes(@RequestParam("notesId") Integer notesId,HttpServletRequest request) {
		log.info("In NotesController deleteNotes()");
		System.out.println("notesId :"+ notesId);
		boolean response = notesService.deleteNotes(notesId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	
	/*@RequestMapping(value = "/notesCount", method = RequestMethod.GET)
	@ResponseBody
	public NotesDto notesCount(@RequestParam ("unitId")Integer unitid)
	{
		return notesService.notesCount(unitid);
	}*/
	//Previous patient wise data for second Header


}
