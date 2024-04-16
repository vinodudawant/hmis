package com.hms.pharmacy.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.doctordesk.controller.DoctorDeskQueueController;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.CreditNoteCounterSale;
import com.hms.pharmacy.pojo.FifthCounterSaleMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.CounterSaleService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/counterSale")
public class CounterSaleController {
	@Autowired
	CounterSaleService counterSaleService;
	
	@Autowired
	CommonService commonService; 
	
	static Logger log=Logger.getLogger(CounterSaleController.class.getName());

	/**
	 *
	 * @Code :This method for counter sale 
	 * @return
	 **/
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getCounterSaleView(HttpServletRequest request,HttpServletResponse response) throws JSONException, IOException {
		log.info("In Pharmacy getCounterSaleView()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("counterSale", new CounterSaleMaster());
		modelAndView.addObject("po", new PoMaster());
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.setViewName("Pharma_Counter_Sale");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		ResourceBundle bundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String stockDetails= bundle.getObject("counterSaleFetchStock").toString();
		
		HttpSession httpSession=request.getSession();
		httpSession.setAttribute("fetchStockOptionForCounterSale", stockDetails);
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for counter sale List
	 * @return
	 **/

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCounterSaleViewList(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		log.info("In Pharmacy getCounterSaleViewList()");
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		if(result)
		{
			List<CounterSaleMaster> ltCounterSaleMasters = counterSaleService
					.getCounterSales(unitId);
			modelAndView.addObject("ltCounterSaleMasters", ltCounterSaleMasters);
			modelAndView.setViewName("Pharma_Counter_Sale_List");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		

		return modelAndView;
	}
	

	/**
	 *
	 * @Code :This method for Counter Sale print
	 * @return
	 **/
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("counterSaleId") Integer counterSaleId,HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView();
		CounterSaleMaster counterMaster = new CounterSaleMaster();
		log.info("In Pharmacy printPo()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		try {
			counterMaster = counterSaleService.getCounterSlave(counterSaleId,unitId);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		List<CounterSaleMaster> counterSaleMasters = new ArrayList<CounterSaleMaster>();
		counterSaleMasters.add(counterMaster);
		
		modelAndView.addObject("counterData", counterSaleMasters);
		modelAndView.setViewName("pharma_counter_bill");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for Counter Sale print from getting fifth counter 
	 * @return
	 **/
	/*
	 * @RequestMapping(value = "/printView1", method = RequestMethod.GET) public
	 * ModelAndView printfifthCounter(
	 * 
	 * @RequestParam("counterSaleId") Integer counterSaleId) { ModelAndView
	 * modelAndView = new ModelAndView();
	 * log.info("In Pharmacy printfifthCounter()"); FifthCounterSaleMaster
	 * counterMaster = new FifthCounterSaleMaster();
	 * 
	 * try { counterMaster =
	 * counterSaleService.getCounterSlaveForFifthCounter(counterSaleId); } catch
	 * (Exception exception) { exception.printStackTrace(); }
	 * List<FifthCounterSaleMaster> counterSaleMasters = new
	 * ArrayList<FifthCounterSaleMaster>(); counterSaleMasters.add(counterMaster);
	 * 
	 * modelAndView.addObject("counterData", counterSaleMasters);
	 * modelAndView.setViewName("pharma_counter_bill"); return modelAndView; }
	 */
	
	/**
	 *
	 * @Code :This method for Counter Sale save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public synchronized @ResponseBody String[] saveOrUpdateCounterSale(HttpServletRequest request,HttpServletResponse response)
	{
		boolean results=false;
		String result[]=new String[3];
		log.info("In Pharmacy saveOrUpdateCounterSale()");
		CounterSaleMaster counterSaleMaster = new CounterSaleMaster();
		FifthCounterSaleMaster fifthCounterSaleMaster = new FifthCounterSaleMaster();
		
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName= bundle.getObject("hospitalname").toString();
		Integer saveNo= Integer.parseInt(request.getParameter("saveNo"));
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		Integer userId=(Integer) session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
	
			String txtDate= request.getParameter("txtDate");
			
			String fromArray[]=txtDate.split("/");
			StringBuffer fromReult=new StringBuffer();
			fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
			
			String txtEnterByName= request.getParameter("txtEnterByName");
			Double txtGrossAmt= Double.parseDouble(request.getParameter("txtGrossAmount"));
			Double txtNetAmt= Double.parseDouble(request.getParameter("txtNetAmount"));
			String rdoCash= request.getParameter("rdoCash");
			
			String txtPrescription= request.getParameter("txtPrescription");
			String txtName= request.getParameter("txtName");
			String txtAddress= request.getParameter("txtAddress");
			String txtMobile= request.getParameter("txtMobile");
			String txtDoctor= request.getParameter("txtDoctor");
			String txtNaration= request.getParameter("txtNaration");
			String txtTime=request.getParameter("txtTime");		
			Double txtTax5= Double.parseDouble(request.getParameter("txtTax5"));
			Double txtTax55= Double.parseDouble(request.getParameter("txtTax55"));
			
			Double txtTax12= Double.parseDouble(request.getParameter("txtTax12"));
			Double txtTax0= Double.parseDouble(request.getParameter("txtTax0"));
			Double txtTotalTax= Double.parseDouble(request.getParameter("txtTotalTax"));
			
			// ====================================================================
			// upload presciption image
		/*	String prescriptionImage=request.getParameter("prescriptionImage");	
			
			String base64String = prescriptionImage;
		    String[] strings = base64String.split(",");
		    String extension;
		    switch (strings[0]) {//check image's extension
		        case "data:image/jpeg;base64":
		            extension = "jpeg";
		            break;
		        case "data:image/png;base64":
		            extension = "png";
		            break;
		        default://should write cases for more images types
		            extension = "jpg";
		            break;
		    }
		    //convert base64 string to binary data
		    
		    byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
		    String path = FilePath.getPriscriptionPhoto()+"\\prescriptionImage_1." + extension;
		    
		    System.out.println("path:: "+path);
		    
		    File file = new File(path);
		    
		    try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
		        outputStream.write(data);
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		   */ 
		    // =============================================================

			String list[]= request.getParameterValues("ltCounterSlave");
					
			String str = list[0].substring(0, list[0].length());
		   	
			try
			{
				counterSaleMaster = (CounterSaleMaster) ConfigUIJSONUtility
					.getObjectFromJSON(str,
							CounterSaleMaster.class);
				
				SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
				Date date=dateFormat.parse(fromReult.toString());
				
				counterSaleMaster.setCounterSaleForDate(date);
				counterSaleMaster.setCounterSaleEnteredBy(txtEnterByName);
				counterSaleMaster.setCounterSaleGrossAmt(txtGrossAmt);
				counterSaleMaster.setCounterSaleNetAmt(txtNetAmt);
				counterSaleMaster.setCounterSaleTransType(rdoCash);
				
				counterSaleMaster.setCounterSalePrescription(txtPrescription);
				counterSaleMaster.setCounterSalePatientName(txtName);
				counterSaleMaster.setCounterSaleAddress(txtAddress);
				counterSaleMaster.setCounterSaleMobile(txtMobile);
				counterSaleMaster.setCounterSaleDoctor(txtDoctor);
				counterSaleMaster.setCounterSaleNaration(txtNaration);
				
				counterSaleMaster.setCounterSaleForTime(time);
				
				counterSaleMaster.setCounterTaxVat5(txtTax5);
				counterSaleMaster.setCounterTaxVat55(txtTax55);
				counterSaleMaster.setCounterTaxVat12(txtTax12);
				counterSaleMaster.setCounterTaxVat0(txtTax0);
				counterSaleMaster.setCounterTotalVat(txtTotalTax);
				counterSaleMaster.setAccountStatusCounter("N");
				
			//	counterSaleMaster.setPrescriptionImage(prescriptionImage);
				if(request.getParameter("txtTax6")!=null && request.getParameter("txtTax6")!="")
				{
					counterSaleMaster.setCounterTaxVat6(Double.parseDouble(request.getParameter("txtTax6")));
				}
				else
				{
					counterSaleMaster.setCounterTaxVat6(0.0);
				}
				
				if(request.getParameter("txtTax135")!=null && request.getParameter("txtTax135")!="")
				{
					counterSaleMaster.setCounterTaxVat135(Double.parseDouble(request.getParameter("txtTax135")));
				}
				else
				{
					counterSaleMaster.setCounterTaxVat135(0.0);
				}
				
				if(request.getParameter("bankName")!=null && request.getParameter("bankName")!="")
				{
					counterSaleMaster.setCounterTaxBankName((request.getParameter("bankName")));
				}
				else
					counterSaleMaster.setCounterTaxBankName("");
				
				
				if(request.getParameter("chequeNum")!=null && request.getParameter("chequeNum")!="")
				{
					counterSaleMaster.setCounterTaxChequeNo(request.getParameter("chequeNum"));
				}
				else
					counterSaleMaster.setCounterTaxChequeNo("");
				
				if(request.getParameter("counterTaxCardNo")!=null && request.getParameter("counterTaxCardNo")!="")
				{
					counterSaleMaster.setCounterTaxCardNo(request.getParameter("counterTaxCardNo"));
				}
				else
					counterSaleMaster.setCounterTaxCardNo("");
				
				
				if(userId!=null)
					counterSaleMaster.setCounterSaleUserId(Integer.parseInt(userId.toString()));
				
				if(storeId!=null)
				{
					counterSaleMaster.setCounterSaleStoreId(Integer.parseInt(storeId.toString()));
				}
				
				if(unitId!=null)
				{
					counterSaleMaster.setUnitId(unitId);
				}
				
				results=counterSaleService.saveOrUpdateCounterSale(counterSaleMaster, saveNo,storeId);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}

		
		if(results)
		{	
			String id="";

				id=counterSaleMaster.getCounterSaleId().toString();
		
			
			result[0]=id;
			result[1]=hospitalName;
			result[2]=saveNo.toString();
			
			
			return result;
		}
		else
		{
			result[0]="error";
			result[1]="Record Not save because of stock is not available";
		}
		return result;
	}


	/**
	 *
	 * @Code :This method for getting Last counter amount
	 * @return
	 **/
	@RequestMapping(value = "/getLastCounterAmount", method = RequestMethod.POST)
	public @ResponseBody
	Double getLastCounterAmount() {
		log.info("In Pharmacy getLastCounterAmount()");
		return counterSaleService.getLastCounterAmount();
	}
	
	/**
	 *
	 * @Code :This method for getting Last Bill Number
	 * @return
	 **/
	@RequestMapping(value = "/getLastBillNum", method = RequestMethod.POST)
	public @ResponseBody
	Integer getLastBillNumber() {
		log.info("In Pharmacy getLastBillNumber()");
		return counterSaleService.getLastBillNumber();
	}
	
	/**
	 *
	 * @Code :This method for Counter sale delete
	 * @return
	 **/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteCounterSale(
			@RequestParam("counterSaleId") Integer counterSaleId) {
		log.info("In Pharmacy deleteCounterSale()");
		Boolean flag = false;
		if (counterSaleService.deleteCounterSale(counterSaleId)) {
			flag = true;
		}
		return flag;
	}

	/**
	 *
	 * @Code :This method for Patient Autosuggestion 
	 * @return
	 **/

	@RequestMapping(value = "/autoSuggestionPatient", method = RequestMethod.GET)
	public @ResponseBody
	List<CounterSaleMaster> getAutoSuggestionPatientNames(
			@RequestParam("letter") String letter, HttpServletRequest request) {
		log.info("In Pharmacy getAutoSuggestionPatientNames()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<CounterSaleMaster> CounterSaleMasters = counterSaleService
				.getAutoSuggestionPatientNames(letter,unitId);
		return CounterSaleMasters;
	}
	/**
	 *
	 * @Code :This method for Register No Autosuggestion 
	 * @return
	 **/
	@RequestMapping(value = "/autoSuggestionRegisterNo", method = RequestMethod.GET)
	public @ResponseBody
	List<CounterSaleMaster> getAutoSuggestionRegNo(
			@RequestParam("letter") Integer letter,HttpServletRequest request) {
		log.info("In Pharmacy autoSuggestionRegisterNo()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<CounterSaleMaster> CounterSaleMasters = counterSaleService
				.getAutoSuggestionRegNo(letter,unitId);
		return CounterSaleMasters;
	}

	/**
	 *
	 * @Code :This method for hospital Counter sale Bill Details 
	 * @return
	 **/
	@RequestMapping(value = "/counterSalesBillDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<CounterSaleMaster> getHospitalBillId(
			@RequestParam("CounterSaleId") Integer CounterSaleBillId,HttpServletRequest request) {
		log.info("In Pharmacy getHospitalBillId()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<CounterSaleMaster> ltCounterSaleBillMaster = new ArrayList<CounterSaleMaster>();
		ltCounterSaleBillMaster = counterSaleService
				.getCounterBillId(CounterSaleBillId,unitId);
		return ltCounterSaleBillMaster;
	}
	/**
	 *
	 * @Code :This method for counter sale data by patient Id 
	 * @return
	 **/
	@RequestMapping(value = "/getAllCounterDataByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<CounterSaleMaster> getAllCounterReceiptDataByPatientName(@RequestParam("patientName")String patientName) 
	{
		log.info("In Pharmacy getAllCounterReceiptDataByPatientName()");
		List<CounterSaleMaster> CounterSale = new ArrayList<CounterSaleMaster>();
		CounterSale = counterSaleService.getAllCounterReceiptDataByPatientName(patientName);
		return CounterSale;
	}
	
	/**
	 *
	 * @Code :This method for counter sale data 
	 * @return
	 **/
	@RequestMapping(value = "/getAllCounterBillSaleData", method = RequestMethod.GET)
	public @ResponseBody List<CreditNoteCounterSale> getAllCounterSaleBillData(@RequestParam("counterSaleId") Integer patientId) {
		log.info("In Pharmacy getAllCounterSaleBillData()");
		List<CreditNoteCounterSale> counterSaleBillMaster = new ArrayList<CreditNoteCounterSale>();
		counterSaleBillMaster = counterSaleService.getAllCounterSaleBillData(patientId);
		return counterSaleBillMaster;
	}

}