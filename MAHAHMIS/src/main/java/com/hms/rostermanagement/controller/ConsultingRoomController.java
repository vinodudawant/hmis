package com.hms.rostermanagement.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;
import com.hms.rostermanagement.service.ConsultingRoomService;
import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/croom")
@Slf4j
public class ConsultingRoomController {
	
	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	ConsultingRoomService rservice;
	
	/******
	 * @author   :HM00054
	 * @Date     :18-1-2022
	 * @Code     :this method used for saveConsultingRoom
	 * *****/
	@RequestMapping(value = "/saveConsultingRoom", method = RequestMethod.POST)
	@ResponseBody	
	public int saveConsultingRoom(ConsultingRoomMaterDTO obj, HttpServletRequest request) {
		
		logger.info("inside saveConsultingRoom");
		int response = rservice.saveConsultingRoom(obj);
		logger.debug("response saveConsultingRoom...."+response);
		return response;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Date     :18-1-2022
	 * @Code     :this method used for getAllConsultingRoom
	 * *****/
	@RequestMapping(value = "/getAllConsultingRoom", method = RequestMethod.POST)
	@ResponseBody	
	public ConsultingRoomMaterDTO getAllConsultingRoom(@RequestParam("unitId")Integer unitId, HttpServletRequest request) {
		ConsultingRoomMaterDTO obj=new ConsultingRoomMaterDTO();
		logger.info("inside getAllConsultingRoom");
		List<ConsultingRoomMaterDTO>  list  = rservice.getAllConsultingRoom(unitId);
		obj.setGetListOfConsultingRoomMaterDTO(list);
		logger.debug("response getAllConsultingRoom...."+obj);
		return obj;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :18-1-2022
	 * @Code     :this method used for deleteConsultingRoom
	 * *****/
	@RequestMapping(value = "/deleteConsultingRoom", method = RequestMethod.GET)
	@ResponseBody	
	public int deleteConsultingRoom(@RequestParam("roomId")Integer roomId,@RequestParam("userId")Integer userId, HttpServletRequest request) {
		
		logger.info("inside deleteConsultingRoom");
		int res  = rservice.deleteConsultingRoom(roomId, userId);
		logger.debug("response deleteConsultingRoom...."+res);
		return res;
	}
	
	/******
	 * @author   :HM00054
	 * @Date     :18-1-2022
	 * @Code     :this method used for editConsultingRoom
	 * *****/
	@RequestMapping(value = "/editConsultingRoom", method = RequestMethod.GET)
	@ResponseBody	
	public ConsultingRoomMaterDTO editConsultingRoom(@RequestParam("roomId")Integer roomId, HttpServletRequest request) {
		
		logger.info("inside editConsultingRoom");
		ConsultingRoomMaterDTO res  = rservice.editConsultingRoom(roomId);
		logger.debug("response editConsultingRoom...."+res);
		return res;
	}

}
