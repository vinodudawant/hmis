package com.hms.pharmacy.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentTemplateMaster;
import com.hms.pharmacy.pojo.WardConsumptionMaster;
import com.hms.pharmacy.service.CounterSaleService;
import com.hms.pharmacy.service.IndentTemplateService;

@Controller
@RequestMapping(value = "/indentTemplate")
public class IndentTemplateController {

	@Autowired
	IndentTemplateService indentTemplateService;
	
	@RequestMapping(value = "/saveIndentTemplate", method = RequestMethod.POST)
	public void saveOrUpdateIndent(
			HttpServletRequest request,HttpServletResponse response) throws ParseException {
		ModelAndView modelAndView = new ModelAndView();
		
		IndentTemplateMaster newIndentMaster = new IndentTemplateMaster();
		
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		
		String ipaddress=request.getRemoteAddr();
		
		String list[]= request.getParameterValues("indentTemplateSlaves");
		
		String str = list[0].substring(0, list[0].length());
		
		try
		{
			newIndentMaster = (IndentTemplateMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						IndentTemplateMaster.class);
			
			String templateName="";
			String templateNarration="";
			
			if(request.getParameter("indentTemplateName")!="" && request.getParameter("indentTemplateName")!=null)
			{
				templateName=request.getParameter("indentTemplateName");
				newIndentMaster.setIndentTemplateName(templateName);
			}
			
			if(request.getParameter("indentTemplateNarration")!="" && request.getParameter("indentTemplateNarration")!=null)
			{
				templateNarration=request.getParameter("indentTemplateNarration");
				newIndentMaster.setIndentTemplateNarration(templateNarration);
			}
			
			
			
			String userIp="";
			if(request.getParameter("txtIndentUserIp")!=null && request.getParameter("txtIndentUserIp")!="")
			{	
				userIp=request.getParameter("txtIndentUserIp");
				newIndentMaster.setIndentTemplateIp(userIp);
			}
			
			String addUserId="";
			if(request.getParameter("txtIndentAddUserId")!=null && request.getParameter("txtIndentAddUserId")!="")
			{	
				addUserId=request.getParameter("txtIndentAddUserId");
				newIndentMaster.setIndentTemplateAddUserId(Integer.parseInt(addUserId));
			}
			
			String addUserTime="";
			if(request.getParameter("txtIndentAddTime")!=null && request.getParameter("txtIndentAddTime")!="")
			{	
				addUserTime=request.getParameter("txtIndentAddTime");
				newIndentMaster.setIndentTemplateAddTime(addUserTime);
			}
			
			String addDate="";
			if(request.getParameter("txtIndentAddDate")!=null && request.getParameter("txtIndentAddDate")!="")
			{	
				addDate=request.getParameter("txtIndentAddDate");
				SimpleDateFormat simpleDateFormat=new SimpleDateFormat("dd/MM/yyyy");
				
				Date date=simpleDateFormat.parse(addDate);
				newIndentMaster.setIndentTemplateAddDate(date);
			}
			
			java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
			java.util.Calendar cal = java.util.Calendar.getInstance();
			String time=dateFormat1.format(cal.getTime());
			
			String indentTemplateId="";
			if(request.getParameter("txtIndentTemplateId")!=null && request.getParameter("txtIndentTemplateId")!="")
			{	
				indentTemplateId=request.getParameter("txtIndentTemplateId");
				newIndentMaster.setIndentTemplateId(Integer.parseInt(indentTemplateId));
			}
			else
			{	
				newIndentMaster.setIndentTemplateAddDate(new Date());
				newIndentMaster.setIndentTemplateAddUserId(userId);
				newIndentMaster.setIndentTemplateIp(ipaddress);
				newIndentMaster.setIndentTemplateAddTime(time);
			}	
			newIndentMaster.setIndentTemplateUpdateDate(new Date());
			newIndentMaster.setIndentTemplateModUserId(userId);
			newIndentMaster.setIndentTemplateUpdateTime(time);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		indentTemplateService.saveIndentTemplate(newIndentMaster);
		
	}
	
	@RequestMapping(value = "/getIndentTemplateDetails", method = RequestMethod.POST)
	public @ResponseBody String  getPreviousIndentData() {
		 
		JSONArray jsonArray = indentTemplateService.getIndentTemplateDetails();
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getIndentTemplateDetailsById", method = RequestMethod.GET)
	public @ResponseBody List<IndentTemplateMaster>  getMultipleIndentSaleDataById(@RequestParam("indentTemplateId")Integer indentTemplateId) {
		 
		List<IndentTemplateMaster> indentTemplateMasters = indentTemplateService.getIndentTemplateDetailsById(indentTemplateId);
		return indentTemplateMasters;
	}
	
	@RequestMapping(value = "/deleteIndentTemplateDetails", method = RequestMethod.POST)
	public @ResponseBody void  deleteIndentTemplateDetails(@RequestParam("indentTemplateId")Integer indentTemplateId,HttpServletRequest request,HttpServletResponse response) {
		indentTemplateService.deleteIndentTemplateDetails(indentTemplateId);
	}
	
}
