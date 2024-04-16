package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//simport org.jboss.resteasy.spi.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.HsnMaster;
import com.hms.pharmacy.service.HsnService;

@Controller
@RequestMapping(value = "/hsn")
public class HsnController 
{
	@Autowired
	HsnService hsnSevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView gethsnView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("hsn", new HsnMaster());

		List<HsnMaster> ltHsnMasters = new ArrayList<HsnMaster>();
		ltHsnMasters = hsnSevice.getAllHsn();
		modelAndView.addObject("ltHsnMasters", ltHsnMasters);
	   	modelAndView.setViewName("Pharma_hsn_master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("hsn") HsnMaster hsnMaster, HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView();
		
		/*
		 * HttpSession session=request.getSession(); Integer userId=(Integer)
		 * session.getAttribute("userId1"); Integer unitId =(Integer)
		 * session.getAttribute("uId"); hsnMaster.setUserId(userId);
		 * hsnMaster.setUserId(unitId);
		 */
		int record=hsnSevice.saveOrUpdateHsn(hsnMaster);
		if (record == 0) 
		{
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}else if(record == 3){
			modelAndView.addObject("duplicate", "! Duplicate HSN number can not save..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/hsn/view");
		return modelAndView;
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDoctor(@RequestParam("hsnId") Integer hsnId) {
		Boolean flag = false;
		if (hsnSevice.deleteHsn(hsnId)) {
			flag = true;
		}
		return flag;
	}

	
	@RequestMapping(value = "/allhsnList", method = RequestMethod.GET)
	public @ResponseBody
	List<HsnMaster> getAllCompaniesList() {
		List<HsnMaster> ltHsnMasters = new ArrayList<HsnMaster>();
		ltHsnMasters = hsnSevice.getAllHsn();
		return ltHsnMasters;
	}

}
