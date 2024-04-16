package com.hms.ivf.controller;

import java.lang.invoke.MethodHandles;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.service.IVFCalenderService;

import groovy.util.logging.Slf4j;
@Controller
@RequestMapping(value = "/ivfcalender")
@Slf4j
public class IvfCalenderController {
	
	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	IVFCalenderService ivfservice;
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for saveFmStudy
	 * *****/
	@RequestMapping(value = "/saveIvfCalender", method = RequestMethod.POST)
	@ResponseBody	
	public int saveIvfCalender(IVFFollicularStudy obj, HttpServletRequest request) {
		logger.info("inside saveIvfCalender");
		int response = ivfservice.saveIvfCalender(obj);
		logger.debug("response saveIvfCalender...."+response);
		return response;
	}
}
