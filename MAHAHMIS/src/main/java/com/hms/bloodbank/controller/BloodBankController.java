package com.hms.bloodbank.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.service.BloodBankService;

@RestController
@RequestMapping(value = "/bloodBank")
public class BloodBankController {
	
	@Autowired
	BloodBankService bloodBankService;
	
	
	@RequestMapping(value = "/getAllBloodBagCollectionDonorList", method = RequestMethod.GET)
	public List<DonorBloodBagDetails> getAllBloodDonorCheckupList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<DonorBloodBagDetails> c =bloodBankService.getAllBloodBagCollectionDonorList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/editBloodBagCollectionDonorList", method = RequestMethod.GET)
	@ResponseBody
	public DonorBloodBagDetails editBloodBagCollectionDonorList(@RequestParam("id") Integer donorTreatmentId,HttpServletRequest request) {
		DonorBloodBagDetails obj=new DonorBloodBagDetails();
		obj = bloodBankService.editBloodBagCollectionDonorList(donorTreatmentId,request);
		return obj;
	}
	
	@RequestMapping(value = "/deletedBloodBagCollectionDonorList", method = RequestMethod.POST)
	public @ResponseBody
	String deletedBloodBagCollectionDonorList(@RequestParam("donorTreatmentId") Integer donorTreatmentId, HttpServletRequest request) {
		
		boolean response = bloodBankService.deletedBloodBagCollectionDonorList(donorTreatmentId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	
	@RequestMapping(value = "/getAllDonorReaction", method = RequestMethod.GET)
	public List<DonorReaction> getAllDonorReaction(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<DonorReaction> c =bloodBankService.getAllDonorReaction(unitId,request);
		return  c;
	}
	
	
	@RequestMapping(value = "/editDonorReaction", method = RequestMethod.GET)
	@ResponseBody
	public DonorReaction editDonorReaction(@RequestParam("id") Integer donorTreatmentId,HttpServletRequest request) {
		DonorReaction obj=new DonorReaction();
		obj = bloodBankService.editDonorReaction(donorTreatmentId,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteDonorReaction", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDonorReaction(@RequestParam("donorReactionId") Integer donorReactionId, HttpServletRequest request) {
		
		boolean response = bloodBankService.deleteDonorReaction(donorReactionId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/getAllBloodGroupTestingList", method = RequestMethod.GET)
	public List<BloodGroupTesting> getAllBloodGroupTestingList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<BloodGroupTesting> c =bloodBankService.getAllBloodGroupTestingList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/editBloodGroupTesting", method = RequestMethod.GET)
	@ResponseBody
	public BloodGroupTesting editBloodGroupTesting(@RequestParam("id") Integer donorTreatmentId,HttpServletRequest request) {
		BloodGroupTesting obj=new BloodGroupTesting();
		obj = bloodBankService.editBloodGroupTesting(donorTreatmentId,request);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBloodGroupTesting", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodGroupTesting(@RequestParam("bloodGroupTestingId") Integer bloodGroupTestingId, HttpServletRequest request) {
		
		boolean response = bloodBankService.deleteBloodGroupTesting(bloodGroupTestingId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/getAllTestRegister", method = RequestMethod.GET)
	public List<TestRegister> getAllTestRegister(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<TestRegister> c =bloodBankService.getAllTestRegister(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/deleteTestRegister", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTestRegister(@RequestParam("testRegisterId") Integer testRegisterId, HttpServletRequest request) {
		
		boolean response = bloodBankService.deleteTestRegister(testRegisterId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/editTestRegister", method = RequestMethod.GET)
	@ResponseBody
	public TestRegister editTestRegister(@RequestParam("id") Integer testRegisterId,HttpServletRequest request) {
		TestRegister obj=new TestRegister();
		obj = bloodBankService.editTestRegister(testRegisterId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getAllComponentSeperationList", method = RequestMethod.GET)
	public List<ComponentSeperation> getAllComponentSeperationList(@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<ComponentSeperation> c =bloodBankService.getAllComponentSeperationList(unitId,request);
		return  c;
	}
	
	@RequestMapping(value = "/deleteComponentSeperation", method = RequestMethod.POST)
	public @ResponseBody
	String deleteComponentSeperation(@RequestParam("componentSeperationId") Integer componentSeperationId, HttpServletRequest request) {
		
		boolean response = bloodBankService.deleteComponentSeperation(componentSeperationId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}

		return msg;
	}
	
	@RequestMapping(value = "/editComponentSeperation", method = RequestMethod.GET)
	@ResponseBody
	public ComponentSeperation editComponentSeperation(@RequestParam("id") Integer donorTreatmentId,@RequestParam("componentSeperationId") Integer componentSeperationId,HttpServletRequest request) {
		ComponentSeperation obj=new ComponentSeperation();
		obj = bloodBankService.editComponentSeperation(donorTreatmentId,componentSeperationId,request);
		return obj;
	}
	@RequestMapping(value = "/getDonorDetailsByIdBloodTesting", method = RequestMethod.GET)
	public BloodGroupTesting getDonorDetailsByIdBloodTesting(@RequestParam("id") Integer id, HttpServletRequest request) {
		BloodGroupTesting obj =bloodBankService.getDonorDetailsByIdBloodTesting(id,request);
		return  obj;
	}
	
	@RequestMapping(value = "/getDonorDetailsByIdTestRegister", method = RequestMethod.GET)
	public TestRegister getDonorDetailsByIdTestRegister(@RequestParam("id") Integer id, HttpServletRequest request) {
		TestRegister testRegister =bloodBankService.getDonorDetailsByIdTestRegister(id,request);
		return  testRegister;
	}

	@RequestMapping(value = "/getPatientDetailsByIdComponentsepration", method = RequestMethod.GET)
	public ComponentSeperation getPatientDetailsByIdComponentsepration(@RequestParam("id") Integer id, HttpServletRequest request) {
		ComponentSeperation componentSeperation =bloodBankService.getPatientDetailsByIdComponentsepration(id,request);
		return  componentSeperation;
	}

	@RequestMapping(value = "/getDonorDetailsByIdOrganDonation", method = RequestMethod.GET)
	public DonorReaction getDonorDetailsByIdOrganDonation(@RequestParam("id") Integer id, HttpServletRequest request) {
		DonorReaction donorReaction =bloodBankService.getDonorDetailsByIdOrganDonation(id,request);
		return  donorReaction;
	}

	
}
