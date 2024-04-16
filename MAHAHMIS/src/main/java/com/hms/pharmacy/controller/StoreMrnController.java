package com.hms.pharmacy.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
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
import com.hms.pharmacy.pojo.MrnIssueMaster;
import com.hms.pharmacy.pojo.MrnMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.StoreMrnService;

@Controller
@RequestMapping(value = "/mrn")
public class StoreMrnController {
	
	@Autowired
	StoreMrnService storeMrnService;
	
	@Autowired
	CommonService commonService; 
	
	@Autowired
	SessionFactory sessionFactory;
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPOViewFrm(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("mrn", new MrnMaster());
			modelAndView.setViewName("pharma_store_mrn");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/view.list.htm", method = RequestMethod.GET)
	public ModelAndView getHospitalSaleBillLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<MrnIssueMaster> mrnIssueMasters = storeMrnService.getMRNList("limit","");
		modelAndView.addObject("mrnIssueMasters", mrnIssueMasters);

		modelAndView.setViewName("pharma_mrn_issue_list");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getNextAutoIncrement", method = RequestMethod.GET)
	public @ResponseBody
	Integer getNextAutoIncrement() 
	{
		Integer mrnId = storeMrnService.getNextAutoIncrement();
		return mrnId;
	}
	
	@RequestMapping(value = "/deleteMRN", method = RequestMethod.POST)
	public @ResponseBody void deleteMRN(@RequestParam("mrnId") Integer mrnId) {
		try
		{
			storeMrnService.deleteMRN(mrnId);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/fetchStock", method = RequestMethod.POST)
	public @ResponseBody String fetchStock(HttpServletRequest request) {
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		
		if(storeId==null)
		{
			return "please select store first";
		}
		
		Map<String,JSONArray> batchData=new HashMap<String, JSONArray>();
		batchData = storeMrnService.fetchStock(Integer.parseInt(storeId));
		return JSONValue.toJSONString(batchData);
	}
	
	
	@RequestMapping(value = "/storeWiseMRN", method = RequestMethod.POST)
	public @ResponseBody List<MrnMaster> getStoreWiseMRN(@RequestParam("storeId") Integer storeId) {
		
		List<MrnMaster> mrnMasters = storeMrnService.getStoreWiseMrnList(storeId);
		return mrnMasters;
	}
	/*@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("mrn") MrnMaster mrnMaster,BindingResult errors,HttpServletRequest request) throws ParseException {
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		mrnMaster.setMrnAddedBy(userId.toString());
		mrnMaster.setMrnModBy(userId.toString());
		mrnMaster.setMrnStatus("pending");
		
		
		String storeId=request.getParameter("mrnStoreId");
		String vouNO=request.getParameter("txtOrderNo");
		String storeName=request.getParameter("txtMrnStoreName");
		String remark=request.getParameter("mrnRemark");
		String count=request.getParameter("txtCount");
		String time=request.getParameter("txtTime");
		
		String list[]= request.getParameterValues("mrnSlaves");
		
		MrnMaster mrnMaster2=new MrnMaster();
		
		String str = list[0].substring(0, list[0].length());
		
		mrnMaster2 = (MrnMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						MrnMaster.class);
		
		mrnMaster2.setMrnDocId(vouNO);
		mrnMaster2.setMrnStoreId(Integer.parseInt(storeId));
		mrnMaster2.setMrnStoreName(storeName);
		mrnMaster2.setMrnRemark(remark);
		mrnMaster2.setMrnProductCount(Integer.parseInt(count));
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		
		mrnMaster2.setMrnUpdateDate(date);
		mrnMaster2.setMrnDate(date);
		
		mrnMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));
		
		ModelAndView modelAndView = new ModelAndView();
		if (storeMrnService.saveOrUpdateMRN(mrnMaster)) {
			if (mrnMaster.getMrnId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		
		PoMaster poMaster2=new PoMaster();
		try
		{
			poMaster2=poService.getPOByIdForPrint(poMaster.getPoId());
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		List<PoMaster> poMasters=new ArrayList<PoMaster>();
		poMasters.add(poMaster2);
		
		modelAndView.addObject("poData", poMasters);
		modelAndView.setViewName("redirect:/pharmacy/mrn/view-frm");
		
		return modelAndView;
	}*/
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody String saveOrUpdateDoctor(HttpServletRequest request,HttpServletResponse response) throws ParseException 
	{
		HttpSession session = request.getSession(true);
		
		MrnMaster mrnMaster2=new MrnMaster();
		String storeId=request.getParameter("mrnStoreId");
		
		Integer userId=(Integer)session.getAttribute("userId1");
		if(userId==null)
		{
			return "not valid session";
		}
		
		if(storeId==null)
		{
			return "please select store first";
		}
			
		
		String vouNO=request.getParameter("txtOrderNo");
		String storeName=request.getParameter("txtMrnStoreName");
		String remark=request.getParameter("mrnRemark");
		String count=request.getParameter("txtCount");
		String time=request.getParameter("txtTime");
		String mrnApproved="";
		
		String list[]= request.getParameterValues("mrnSlaves");
		
		String str = list[0].substring(0, list[0].length());
		
		mrnMaster2 = (MrnMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						MrnMaster.class);
		
		String mrnId=request.getParameter("txtMrnId");
		if(!mrnId.equals(null) && !mrnId.equals(""))
		{	
			mrnId=request.getParameter("txtMrnId");
			mrnMaster2.setMrnId(Integer.parseInt(mrnId));
		}
		
		if(request.getParameter("mrnMainStoreId")==null)
			mrnMaster2.setMrnMainStoreId(0);
		else{
			try{
			mrnMaster2.setMrnMainStoreId(Integer.parseInt(request.getParameter("mrnMainStoreId")));
			}catch(Exception e){
				mrnMaster2.setMrnMainStoreId(0);
			}
		}
		
		mrnMaster2.setMrnAddedBy(userId.toString());
		mrnMaster2.setMrnModBy(userId.toString());
		mrnMaster2.setMrnStatus("pending");
		
		if(request.getParameter("mrnApproved")!=null && request.getParameter("mrnApproved")!="")
		{	
			mrnApproved=request.getParameter("mrnApproved");
			if(mrnApproved.equals("0")) {
				mrnApproved="1";
			}
			mrnMaster2.setMrnApproved(Integer.parseInt(mrnApproved));
		}
		
		mrnMaster2.setMrnDocId(vouNO);
		mrnMaster2.setMrnStoreId(Integer.parseInt(storeId));
		mrnMaster2.setMrnStoreName(storeName);
		mrnMaster2.setMrnRemark(remark);
		mrnMaster2.setMrnProductCount(Integer.parseInt(count));
		mrnMaster2.setMrnTime(time);
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		
		mrnMaster2.setMrnUpdateDate(date);
		mrnMaster2.setMrnDate(date);
		
		/*mrnMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));*/
		
		ModelAndView modelAndView = new ModelAndView();
		if (storeMrnService.saveOrUpdateMRN(mrnMaster2)) {
			if (mrnMaster2.getMrnId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		
		return "record save succesfully";
	}
	
	@RequestMapping(value = "/saveReceiveMrn", method = RequestMethod.POST)
	public @ResponseBody String saveReceiveMrn(HttpServletRequest request,HttpServletResponse response) throws ParseException 
	{
		MrnMaster mrnMaster2=new MrnMaster();
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		
		Integer mrnId=Integer.parseInt(request.getParameter("mrnId"));
		
		if(storeId.equals(null)) {
			Query query= sessionFactory.getCurrentSession().createQuery("Select mrnStoreId from MrnMaster where mrnId='"+mrnId+"'");
			Integer storeId1 = (Integer) query.uniqueResult();
			mrnMaster2.setMrnStoreId(storeId1);
		}
		String list[]= request.getParameterValues("mrnSlaves");
		String str = list[0].substring(0, list[0].length());
		mrnMaster2 = (MrnMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						MrnMaster.class);
		
			mrnMaster2.setMrnId((mrnId));
			mrnMaster2.setMrnStoreId(Integer.parseInt(storeId));
		
		ModelAndView modelAndView = new ModelAndView();
		if (storeMrnService.saveReceiveMrn(mrnMaster2)) {
			if (mrnMaster2.getMrnId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		
		return "record save succesfully";
	}
	
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPurchaseLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<MrnMaster> mrnMasters = storeMrnService.getMrnList("limit");
		modelAndView.addObject("mrnMasters", mrnMasters);

		modelAndView.setViewName("pharma_store_mrn_list");
		return modelAndView;
	}
	
	@RequestMapping(value = "/view.htm", method = RequestMethod.GET)
	public ModelAndView getMRNIsueePage(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("mrnIssue", new MrnIssueMaster());
			modelAndView.setViewName("pharma_mrn_issue");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/getPendingMRN", method = RequestMethod.GET)
	public @ResponseBody
	List<MrnMaster> getPendingMRN() {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		mrnMasters = storeMrnService.getPendingMRN();
		return mrnMasters;
	}

	@RequestMapping(value = "/getMRNDetailsByMrnId", method = RequestMethod.POST)
	public @ResponseBody
	MrnMaster getPurchaseOrderByPurchaseId(
			@RequestParam("mrnId") Integer mrnId) {
		MrnMaster mrnMaster=new MrnMaster();
		mrnMaster = storeMrnService.getMRNDetailsByMrnId(mrnId);
		return mrnMaster;
	}
	
	@RequestMapping(value = "/getPendingMRNCount", method = RequestMethod.GET)
	public @ResponseBody
	Integer getPendingMRNCount() {
		Integer count = storeMrnService.getPendingMRNCount();
		return count;
	}
	
	@RequestMapping(value = "/saveMrn", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveMrn(HttpServletRequest request) throws ParseException 
	{
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
				
		String list[]= request.getParameterValues("mrnIssueSlaves");
		
		MrnIssueMaster mrnIssueMaster=new MrnIssueMaster();
		
		String str = list[0].substring(0, list[0].length());
		
		mrnIssueMaster = (MrnIssueMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						MrnIssueMaster.class);
		
		
		/*if(request.getParameter("txtCD")!=null && request.getParameter("txtCD")!="")
		{	
			Double txtCd= Double.parseDouble(request.getParameter("txtCD"));
			mrnIssueMaster.setMrnIssueCD(txtCd);
		}
		else
		{
			mrnIssueMaster.setMrnIssueCD(0.0);
		}
		
		if(request.getParameter("txtCDAmt")!=null && request.getParameter("txtCDAmt")!="")
		{	
			Double txtCdAmt= Double.parseDouble(request.getParameter("txtCDAmt"));
			mrnIssueMaster.setMrnIssueCdAmt(txtCdAmt);
		}
		else
		{
			mrnIssueMaster.setMrnIssueCdAmt(0.0);
		}*/
		
	/*	if(request.getParameter("txtCN")!=null && request.getParameter("txtCN")!="")
		{	
			Double txtCn= Double.parseDouble(request.getParameter("txtCN"));
			mrnIssueMaster.setMrnIssueCN(txtCn);
		}
		else
		{
			mrnIssueMaster.setMrnIssueCN(0.0);
		}*/
		
		
		/*if(request.getParameter("txtCNAmt")!=null && request.getParameter("txtCNAmt")!="")
		{	
			Double txtCnAmt= Double.parseDouble(request.getParameter("txtCNAmt"));
			mrnIssueMaster.setMrnIssueCnAmt(txtCnAmt);
		}
		else
		{
			mrnIssueMaster.setMrnIssueCnAmt(0.0);
		}
		*/
		if(request.getParameter("txtAdd")!=null && request.getParameter("txtAdd")!="")
		{
			Double txtAdd= Double.parseDouble(request.getParameter("txtAdd"));
			mrnIssueMaster.setMrnIssueAdd(txtAdd);
		}
		else
		{
			mrnIssueMaster.setMrnIssueAdd(0.0);
		}
		
		if(request.getParameter("txtGrossAmt")!=null && request.getParameter("txtGrossAmt")!="")
		{
			mrnIssueMaster.setMrnIssueGrossAmt(Double.parseDouble(request.getParameter("txtGrossAmt")));
		}
		else
		{
			mrnIssueMaster.setMrnIssueGrossAmt(0.0);
		}
		
		if(request.getParameter("txtLessAmount")!=null && request.getParameter("txtLessAmount")!="")
		{
			mrnIssueMaster.setMrnIssueLess(Double.parseDouble(request.getParameter("txtLessAmount")));
		}
		else
		{
			mrnIssueMaster.setMrnIssueLess(0.0);
		}
		
		mrnIssueMaster.setMrnIssueNarration("");
		
		
		if(request.getParameter("txtNetAmt")!=null && request.getParameter("txtNetAmt")!="")
		{
			mrnIssueMaster.setMrnIssueNetAmt(Double.parseDouble(request.getParameter("txtNetAmt")));
		}
		else
		{
			mrnIssueMaster.setMrnIssueNetAmt(0.0);
		}
		
		if(request.getParameter("txtRound")!=null && request.getParameter("txtRound")!="")
		{
			mrnIssueMaster.setMrnIssueRound(Double.parseDouble(request.getParameter("txtRound")));	
		}
		else
		{
			mrnIssueMaster.setMrnIssueRound(0.0);
		}
		
		/*if(request.getParameter("txtSpecialDisc")!=null && request.getParameter("txtSpecialDisc")!="")
		{
			mrnIssueMaster.setMrnIssueSpecialDisc(Double.parseDouble(request.getParameter("txtSpecialDisc")));
		}
		else
		{
			mrnIssueMaster.setMrnIssueSpecialDisc(0.0);
		}*/
		
		if(request.getParameter("txtSurcharge")!=null && request.getParameter("txtSurcharge")!="")
		{
			mrnIssueMaster.setMrnIssueSurcharges(Double.parseDouble(request.getParameter("txtSurcharge")));
		}
		else
		{
			mrnIssueMaster.setMrnIssueSurcharges(0.0);
		}
		
		String mrnId="";
		if(request.getParameter("txtMrnId")!=null && request.getParameter("txtMrnId")!="")
		{	
			mrnId=request.getParameter("txtMrnId");
			mrnIssueMaster.setMrnIssueId(Integer.parseInt(mrnId));
		}
		
		mrnIssueMaster.setMainStoreId(request.getParameter("mainStoreId"));
		mrnIssueMaster.setMrnIssueAmountBalance(0.0);
		mrnIssueMaster.setMrnIssueAmountReceive(0.0);
		mrnIssueMaster.setMrnIssuePreviousBalance(0.0);
		
		mrnIssueMaster.setMrnIssueBillMode(Integer.parseInt(request.getParameter("paymentMode")));
		mrnIssueMaster.setMrnIssueDeleteFlag(0);
		mrnIssueMaster.setMrnIssueDocNo(request.getParameter("txtBillNo"));
		mrnIssueMaster.setMrnAddedBy(userId.toString());
		mrnIssueMaster.setMrnModBy(userId.toString());
		
		
		mrnIssueMaster.setStoreId(request.getParameter("storeId"));
		mrnIssueMaster.setStoreName(request.getParameter("storeName"));
		
		MrnMaster mrnMaster=new MrnMaster();
		mrnMaster.setMrnId(Integer.parseInt(request.getParameter("txtMrnNo")));
		mrnIssueMaster.setMrnMaster(mrnMaster);
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		
		mrnIssueMaster.setMrnIssueUpdateDate(date);
		mrnIssueMaster.setMrnReceivedDate(date);
		
		mrnIssueMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));
		/*mrnIssueMaster.setMrnIssueNarration(request.getParameter("txtNaration"));*/
		
		String status=request.getParameter("receiveStatus");
		
		Map<String, String> result=storeMrnService.saveMRNIssue(mrnIssueMaster,status);
		
		return result;
	}
	
	
	@RequestMapping(value = "/view.htm1", method = RequestMethod.POST)
	public ModelAndView getMRNIsuee1Page() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("mrnIssue", new MrnIssueMaster());
		modelAndView.setViewName("pharma_mrn_issue1");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/storeWisePendingMrn", method = RequestMethod.POST)
	public @ResponseBody
	List<MrnMaster> getDeptWisePendingMrn(
			@RequestParam("storeId") Integer storeId) {
		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		mrnMasters = storeMrnService.getStoreWisePendingMRN(storeId);
		return mrnMasters;
	}
	
	@RequestMapping(value = "/storeWiseMrnIssue", method = RequestMethod.POST)
	public @ResponseBody
	List<MrnIssueMaster> getStoreWiseMrnIssue(
			@RequestParam("storeId") Integer storeId) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		mrnIssueMasters = storeMrnService.getStoreWiseMrnIssue(storeId);
		return mrnIssueMasters;
	}
	
	//Search MRN issue by mrn no
	@RequestMapping(value = "/autoSuggestionMRNIssueNumber", method = RequestMethod.GET)
	public @ResponseBody List<MrnIssueMaster> autoSuggestionMRNIssueNumber(@RequestParam("letter")String letter) {
		 
		List<MrnIssueMaster> indentSaleMasters = storeMrnService.getAutoSuggestionMRNIssueNumber(letter);
		return indentSaleMasters;
	}
	
	@RequestMapping(value = "/autoSuggestionMRNNumber", method = RequestMethod.GET)
	public @ResponseBody List<MrnMaster> autoSuggestionMRNNumber(@RequestParam("letter")String letter) {
		 
		List<MrnMaster> indentSaleMasters = storeMrnService.getAutoSuggestionMRNNumber(letter);
		return indentSaleMasters;
	}
	
	@RequestMapping(value = "/mrnNoWiseMrnIssue", method = RequestMethod.POST)
	public @ResponseBody
	List<MrnIssueMaster> getMrnNoWiseMrnIssue(
			@RequestParam("mrnIssueId") Integer mrnIssueId) {
		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		mrnIssueMasters = storeMrnService.getMrnNoWiseMrnIssue(mrnIssueId);
		return mrnIssueMasters;
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public @ResponseBody MrnMaster editMRN(@RequestParam("mrnId") Integer mrnId) {
		MrnMaster mrnMaster = storeMrnService.editMrn(mrnId);
		mrnMaster.setMrnModBy(mrnMaster.getMrnAddedBy());
		mrnMaster.setMrnUpdateDate(mrnMaster.getMrnDate());
		return mrnMaster;
	}
	
	@RequestMapping(value = "/saveSessionToStore", method = RequestMethod.POST)
	public @ResponseBody void saveSessionToStore(HttpServletRequest request) 
	{
		String storeId=request.getParameter("storeId");
		String storeName=request.getParameter("storeName");
		String storeUsers=request.getParameter("storeUsers");
		HttpSession httpSession=request.getSession();
		httpSession.setAttribute("pharmacyStoreId", storeId);
		httpSession.setAttribute("pharmacyStoreName", storeName);
		httpSession.setAttribute("pharmacyStoreUsers", storeUsers);
	}
	
	@RequestMapping(value = "/invalidateSesion", method = RequestMethod.POST)
	public @ResponseBody void invalidateSesion(HttpServletRequest request) {
		
		HttpSession httpSession=request.getSession();
		httpSession.removeAttribute("pharmacyStoreId");
		httpSession.removeAttribute("pharmacyStoreName");
		httpSession.removeAttribute("pharmacyStoreUsers");
	}
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printMRN(
			@RequestParam("mrnId") Integer mrnId) {
		ModelAndView modelAndView = new ModelAndView();
		MrnMaster mrnMaster = new MrnMaster();

		try {
			mrnMaster = storeMrnService.mrnPrint(mrnId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnMaster> mrnMasters = new ArrayList<MrnMaster>();
		mrnMasters.add(mrnMaster);

		modelAndView.addObject("mrnData", mrnMasters);
		modelAndView.setViewName("pharma_store_mrn_bill");
		return modelAndView;

	}
	
	
	@RequestMapping(value = "/mrnIssueprintView", method = RequestMethod.GET)
	public ModelAndView printMRNIssue(
			@RequestParam("mrnIssueId") Integer mrnIssueId) {
		ModelAndView modelAndView = new ModelAndView();
		MrnIssueMaster mrnMaster = new MrnIssueMaster();

		try {
			mrnMaster = storeMrnService.mrnIssuePrint(mrnIssueId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<MrnIssueMaster> mrnIssueMasters = new ArrayList<MrnIssueMaster>();
		mrnIssueMasters.add(mrnMaster);

		modelAndView.addObject("mrnIssueData", mrnIssueMasters);
		modelAndView.setViewName("pharma_mrn_issue_bill");
		return modelAndView;

	}
	
	
	@RequestMapping(value = "/setApprovalStatus", method = RequestMethod.POST)
	public @ResponseBody
	String setApprovalStatus(
			@RequestParam("mrnIdArray") Integer mrnIdArray[],HttpServletRequest request) {
		HttpSession session=request.getSession();
		Integer userId=(Integer) session.getAttribute("userId1");
		
		if(userId==null)
		{
			return "login credentials not found please login again";
		}
		
		return storeMrnService.setApprovalStatus(mrnIdArray,userId.toString());
	}
	
	
	@RequestMapping(value = "/mrnIssueList", method = RequestMethod.POST)
	public @ResponseBody List<MrnIssueMaster> getMrnIssueLIst(HttpServletRequest request) {
		
		String type=request.getParameter("type");
		List<MrnIssueMaster> mrnIssueMasters = storeMrnService.getMRNList("",type);
		return mrnIssueMasters;
	}
	
	@RequestMapping(value = "/mrnIssueListForReceive", method = RequestMethod.POST)
	public @ResponseBody List<MrnIssueMaster> getMrnIssueLIstForReceive(HttpServletRequest request) 
	{
		String storeId=request.getParameter("storeId");
		List<MrnIssueMaster> mrnIssueMasters = storeMrnService.getMRNListForReceive(storeId);
		return mrnIssueMasters;
	}
	
	
	@RequestMapping(value = "/editMRNIssue", method = RequestMethod.POST)
	public @ResponseBody MrnMaster editMRNIssue(@RequestParam("mrnIssueId") Integer mrnIssueId) {
		MrnMaster mrnMaster = storeMrnService.editMrn(mrnIssueId);
		mrnMaster.setMrnModBy(mrnMaster.getMrnAddedBy());
		mrnMaster.setMrnUpdateDate(mrnMaster.getMrnDate());
		return mrnMaster;
	}
	
	@RequestMapping(value = "/getStoreDetailsByStoreName", method = RequestMethod.POST)
	public @ResponseBody String getStoreDetailsByStoreName(HttpServletRequest request) {
		
		String storeName=request.getParameter("storeName");
		
		if(storeName==null)
		{
			return "store Name Can't Blank";
		}
		
		Map<String,JSONArray> storeData=new HashMap<String, JSONArray>();
		storeData = storeMrnService.getStoreDetailsByStoreName(storeName);
		return JSONValue.toJSONString(storeData);
	}
	
	
	@RequestMapping(value = "/editMRNIssueById", method = RequestMethod.POST)
	public @ResponseBody MrnIssueMaster editMrnIssue(@RequestParam("mrnIssueId") Integer mrnIssueId) {
		MrnIssueMaster mrnMaster = storeMrnService.editMrnIssue(mrnIssueId);
		return mrnMaster;
	}
	
	@RequestMapping(value = "/editMRNIssueByIdForReceive", method = RequestMethod.POST)
	public @ResponseBody MrnMaster editStoreMrnForReceive(@RequestParam("storeMrnId") Integer mrnId)
	{
		MrnMaster mrnMaster = storeMrnService.editStoreMrnForReceive(mrnId);
		return mrnMaster;
	}
	
	@RequestMapping(value = "/getPendingMRNDetailsByMrnId", method = RequestMethod.POST)
	public @ResponseBody
	String getPendingMRNDetailsByMrnId(
			@RequestParam("mrnId") Integer mrnId) {
		JSONArray jsonArray=new JSONArray();
		jsonArray = storeMrnService.getPendingMRNDetailsByMrnId(mrnId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/storeWiseMrnByStoreId", method = RequestMethod.POST)
	public @ResponseBody
	List<MrnMaster> getStoreWiseMrnByStoreId(
			@RequestParam("storeId") Integer storeId) {
		List<MrnMaster> mrnIssueMasters = new ArrayList<MrnMaster>();
		mrnIssueMasters = storeMrnService.getStoreWiseMrnByStoreId(storeId);
		return mrnIssueMasters;
	}
	/******
	 * @author     :BILAL
	 * @Date       :06-12-2017
	 * @Code       :For delete of MRN Issue
	 * ******/
	@RequestMapping(value = "/deleteMRNIssueById", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMRNIssueById(@RequestParam("mrnIssueId") int mrnIssueId,
			HttpServletRequest request) {

		boolean response = storeMrnService.deleteMRNIssueById(mrnIssueId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
}
