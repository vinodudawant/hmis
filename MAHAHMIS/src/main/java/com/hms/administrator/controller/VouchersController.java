package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.IPDReceiptVoucherDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.service.VouchersService;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.EnglishNumberToWords;

@Controller
@RequestMapping(value = "/vouchers")
public class VouchersController {
	
	@Autowired
	VouchersService vouchersService;
	
	@RequestMapping(value="/saveRecieptVoucher",method = RequestMethod.POST)
	@ResponseBody
	public Integer saveRecieptVoucher(@RequestParam("serviceDetails") String serviceDetails,
						@RequestParam("queryType") String queryType,
						HttpServletRequest request){
		
		IPDReceiptVoucherDTO ipdReceiptVoucherDTO = (IPDReceiptVoucherDTO) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, IPDReceiptVoucherDTO.class);
		return vouchersService.saveRecieptVoucher(ipdReceiptVoucherDTO.getListIPDReceiptVoucherDTO().get(0),queryType,request);
	}
	
	@RequestMapping(value = "/viewReceiptVoucher ", method = RequestMethod.POST)
	public @ResponseBody
	IPDReceiptVoucherDTO viewReceiptVoucher(@RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {
		
		
		List<IPDReceiptVoucherDTO> ltViewDto = new ArrayList<IPDReceiptVoucherDTO>();
		
		ltViewDto = vouchersService.viewReceiptVoucher(callFrom);
	
		IPDReceiptVoucherDTO obj=new IPDReceiptVoucherDTO();
		
		obj.setListIPDReceiptVoucherDTO(ltViewDto);
		 
		return obj;
	}
	@RequestMapping(value = "/editRecVoucher ", method = RequestMethod.POST)
	public @ResponseBody
	IPDReceiptVoucherDTO editRecVoucher(@RequestParam("receiptVoucherId") Integer receiptVoucherId,
			HttpServletRequest request) {
		
		return vouchersService.editRecVoucher(receiptVoucherId);
	}
	
	@RequestMapping(value="/deleteReceiptVoucher",method = RequestMethod.POST)
	@ResponseBody
	public Integer deleteReceiptVoucher(@RequestParam("receiptVoucherIdLst") String receiptVoucherIdLst,
			HttpServletRequest request){

		return vouchersService.deleteReceiptVoucher(receiptVoucherIdLst,request);
	}

	@RequestMapping(value = "/autoSuggRcptVchrCmnyNm", method = RequestMethod.POST)
	@ResponseBody
	public IPDReceiptVoucherDTO autoSuggRcptVchrCmnyNm(@RequestParam("letter") String letter) {
		 
		IPDReceiptVoucherDTO ltViewDto = new  IPDReceiptVoucherDTO();
		ltViewDto = vouchersService.autoSuggRcptVchrCmnyNm(letter);	
		return ltViewDto;
	}
		
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 21_Jan_2020 
	 * @Code Fetching Voucher data.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchExpenceVoucher", method = RequestMethod.POST)
		public @ResponseBody
		IpdExpenceVoucher fetchExpenceVoucher(
				@RequestParam("idvoucher") String idvoucher,
				@RequestParam("page_name") String pageName,
						HttpServletRequest request) {
			/*
			 * 
			 * 
			 * int idipdm = 0; if (!idvoucher.equals("") && !idvoucher.equals(null)) {
			 * idipdm = Integer.parseInt(idvoucher);
			 * 
			 * }
			 * 
			 * List<IpdExpenceVoucher> listfetchExpenceVoucher = new
			 * ArrayList<IpdExpenceVoucher>(); listfetchExpenceVoucher =
			 * (List<IpdExpenceVoucher>)
			 * vouchersService.fetchExpenceVoucher(pageName,idipdm,byType,request);
			 * 
			 * IpdExpenceVoucher obj=new IpdExpenceVoucher();
			 * obj.setIpdExpenceVoucherLi(listfetchExpenceVoucher);
			 * 
			 * return obj;
			 * 
			 */
		int voucherID = 0;
		
		if (!idvoucher.equals("") && !idvoucher.equals(null)) {
			voucherID = Integer.parseInt(idvoucher);
			}
		
		
			List<IpdExpenceVoucher> listfetchExpenceVoucher = new ArrayList<IpdExpenceVoucher>();
			listfetchExpenceVoucher = vouchersService.fetchExpenceVoucher(voucherID,pageName,request);
			IpdExpenceVoucher obj = new IpdExpenceVoucher();
			obj.setIpdExpenceVoucherLi(listfetchExpenceVoucher);
			return obj;
		}	
	
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande 
	 * @date 22_Jan_2020 these methods are used to save And update Voucher
	 * *************************************************************************************/
	@RequestMapping(value = "/saveExpenseVoucher", method = RequestMethod.POST)
	@ResponseBody
	public String saveExpenseVoucher(@RequestParam("voucherDetails") String ipdExpenceVoucher ,
			@RequestParam("queryType") String queryType,
			HttpServletRequest request
			) {
		
		int response = vouchersService.saveExpenseVoucher(ipdExpenceVoucher,queryType, request);
		
		return response == 1 ? "Voucher Saved sucessfully" : response == 2 ? "Voucher Updated succesfully" : "Network error";
	
	}
	
	
	@RequestMapping(value="/editExpenseVoucher",method = RequestMethod.POST)
	@ResponseBody
	public IpdExpenceVoucher EditExpenceVoucher(@RequestParam("idipdExpenceVoucher") Integer idipdExpenceVoucher,
			HttpServletRequest request){

		return vouchersService.EditExpenceVoucher(idipdExpenceVoucher,request);
	}
	
	@RequestMapping(value="/deleteExpenceVoucher",method = RequestMethod.POST)
	@ResponseBody
	public Integer deleteExpenceVoucher(@RequestParam("idipdExpenceVoucher") Integer idipdExpenceVoucher,
			HttpServletRequest request){

		int response = vouchersService.deleteExpenceVoucher(idipdExpenceVoucher,request);
		
		return response;
	}
	
	@RequestMapping(value = "/convertAmountIntoString", method = RequestMethod.POST)
	@ResponseBody
	public String convertAmountIntoString(
			@RequestParam("amount") String amount, HttpServletRequest request) {

		String myString = "";
		try {

			if (amount != null || amount != "") {
				long amt = Long.parseLong(amount);
				long newAmt = Math.round(amt);
				myString = EnglishNumberToWords.convert(newAmt);
				myString = myString.toUpperCase();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return myString;
		}
		return myString;

	}
	
	@RequestMapping(value = "/setLedgerHead", method = RequestMethod.POST)
	@ResponseBody
	public LedgerHead setLedgerHead(
			@RequestParam("idLedgerHead") Integer idLedgerHead, HttpServletRequest request) {


		List<LedgerHead> listLedgerHead = new ArrayList<LedgerHead>();
		listLedgerHead =  (List<LedgerHead>) vouchersService.setLedgerHead(idLedgerHead,request);
		
		LedgerHead obj=new LedgerHead();
		obj.setLedger_headList(listLedgerHead);
			
		return obj;

	}	
	
	
	
	@RequestMapping(value = "/printExpenceVoucher", method = RequestMethod.POST)
	public @ResponseBody
	IpdExpenceVoucher printExpenceVoucher(
			@RequestParam("idipdExpense") String idipdExpense,
			HttpServletRequest request) {

		int idipdm = 0;
		if (!idipdExpense.equals("") && !idipdExpense.equals(null)) {
			idipdm = Integer.parseInt(idipdExpense);
		}

		List<IpdExpenceVoucher> listfetchExpenceVoucher = new ArrayList<IpdExpenceVoucher>();
		listfetchExpenceVoucher = (List<IpdExpenceVoucher>) vouchersService
				.printExpenceVoucher(idipdm, request);

		IpdExpenceVoucher obj = new IpdExpenceVoucher();
		obj.setIpdExpenceVoucherLi(listfetchExpenceVoucher);

		return obj;

	}
	/**
	 * @author :Navnath Erande
	 * @Date :27-01-2020
	 * @Code : fetch group name voucher
	 **/
	@RequestMapping(value = "/fetchgroupnamevoucher", method = RequestMethod.POST)
	@ResponseBody
	public ExpenseVoucherGroup groupName() {
		ExpenseVoucherGroup voucher = new ExpenseVoucherGroup();
		List<ExpenseVoucherGroup> list = vouchersService.groupName();
		voucher.setVoucherList(list);
		return voucher;
	}
	/**
	 * @author :Navnath Erande
	 * @Date :29-01-2020
	 * @Code : fetch ledger head list
	 **/
	@RequestMapping(value = "/fetchledgerhead", method = RequestMethod.POST)
	@ResponseBody
	public LedgerHead ledgerHead(Integer id) {
		LedgerHead ledgerhead = new LedgerHead();
		List<LedgerHead> list = vouchersService.ledgerHead(id);
		ledgerhead.setLedger_headList(list);
		return ledgerhead;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :29-01-2020
	 * @Code : convert amount in words
	 **/
	@RequestMapping(value = "/convertamountinwords", method = RequestMethod.POST)
	@ResponseBody
	public String convertAmountinWords(@RequestParam("amount") Float amount) {
		return vouchersService.convertAmountinWords(amount);
	}

	
	public IPDReceiptVoucherDTO fetchReceiptVoucherForPrint(@RequestParam("voucherID") int voucherID,
		    HttpServletRequest request) {
		    List < IPDReceiptVoucherDTO > fetchData = new
		    ArrayList < IPDReceiptVoucherDTO > ();
		    fetchData =
		    		vouchersService.fetchReceiptVoucherForPrint(voucherID, request);
		    IPDReceiptVoucherDTO ReceiptVoucher = new IPDReceiptVoucherDTO();
		    ReceiptVoucher.setListIPDReceiptVoucherDTO(fetchData);
		    return ReceiptVoucher;
		}
}
