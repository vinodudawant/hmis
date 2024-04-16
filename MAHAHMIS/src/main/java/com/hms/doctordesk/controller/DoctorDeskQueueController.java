package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.Doctordeskipddto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.service.DoctorDeskQueueService;

@Controller
@RequestMapping(value="doctordeskqueuecontroller")
public class DoctorDeskQueueController {
	
	@Autowired
	DoctorDeskQueueService doctordeskqueueservice;
	
	static Logger log=Logger.getLogger(DoctorDeskQueueController.class.getName());
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :13-02-2020
	 * @Code :This method is fetch Doctor Desk Deshboard
	 * @return
	 **/

	@RequestMapping(value = "/fetchdoctordeskdeshboard", method = RequestMethod.POST)
	@ResponseBody
	public Doctordeskopderdto fetchDoctorDeskDeshboard(@RequestParam ("depid")Integer depid,
			@RequestParam ("startIndex")Integer startIndex,
			HttpServletRequest request) {
		log.info("In DoctorDesk fetchPreparationMaster()");
		HttpSession session = request.getSession();
		
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		String userType = (String) session.getAttribute("userType");//get user Type which is login
		
		Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
		if(depid == 2)
		{
			 List<Doctordeskipddto> list=doctordeskqueueservice.fetchIpdDoctorDeskDeshboard(depid,unitId,userId1,userType,startIndex);
			 regtrebilldto.setListRegTreBillDto1(list);
		}
		else
		{
		 List<Doctordeskopderdto> list=doctordeskqueueservice.fetchDoctorDeskDeshboard(depid,unitId,userId1,userType,startIndex);
		 regtrebilldto.setListRegTreBillDto(list);
		}
		
		log.debug("Reponse----> "+regtrebilldto);
		return regtrebilldto;
	}
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :14-02-2020
	 * @Code :This method is serach fetch Doctor Desk Deshboard
	 * @return
	 **/

	@RequestMapping(value = "/serachdoctordeskdeshboard", method = RequestMethod.POST)
	@ResponseBody
	public Doctordeskopderdto serachDoctorDeskDeshboard(@RequestParam ("depid")Integer depid,
			@RequestParam ("selectsearchby")Integer selectsearchby,
			@RequestParam ("value")String value,
			HttpServletRequest request) {
		log.info("In DoctorDesk serachDoctorDeskDeshboard()");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		String userType = (String) session.getAttribute("userType");//get user Type which is login
		
		Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
		if(depid == 2)
		{
			List<Doctordeskipddto> list=doctordeskqueueservice.serachDoctorDeskDeshboardIpd(depid, unitId, userId1, userType, selectsearchby, value);
			 regtrebilldto.setListRegTreBillDto1(list);
		}
		else
		{
			List<Doctordeskopderdto> list=doctordeskqueueservice.serachDoctorDeskDeshboard(depid, unitId, userId1, userType, selectsearchby, value);
			 regtrebilldto.setListRegTreBillDto(list);
		}
		
		log.debug("Reponse----> "+regtrebilldto);
		return regtrebilldto;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :14-02-2020
	 * @Code :This method is serach Date Wise Quque
	 * @return
	 **/

	@RequestMapping(value = "/serachdatewisequque", method = RequestMethod.POST)
	@ResponseBody
	public Doctordeskopderdto serachDateWiseQuque(@RequestParam ("depid")Integer depid,
			@RequestParam("fdate")String fdate,
			@RequestParam("tdate")String tdate,
			HttpServletRequest request) {
		log.info("In DoctorDesk serachDateWiseQuque()");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		String userType = (String) session.getAttribute("userType");//get user Type which is login
		Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
		if(depid == 2)
		{
			List<Doctordeskipddto> list=doctordeskqueueservice.serachDateWiseQuqueIpd(depid, unitId, userId1, userType, fdate,tdate);
			 regtrebilldto.setListRegTreBillDto1(list);
		}
		else
		{
			List<Doctordeskopderdto> list=doctordeskqueueservice.serachDateWiseQuque(depid, unitId, userId1, userType, fdate,tdate);
			regtrebilldto.setListRegTreBillDto(list);
		}
		
		log.debug("Reponse----> "+regtrebilldto);
		return regtrebilldto;
	}
	
	@RequestMapping(value = "/doctordeskpatientcount", method = RequestMethod.POST)
	@ResponseBody
	public DoctorDeskCountDto doctorDeskPatientCount(@RequestParam ("unitId")Integer unitid)
	{
		return doctordeskqueueservice.doctorDeskPatientCount(unitid);
	}
	
}
