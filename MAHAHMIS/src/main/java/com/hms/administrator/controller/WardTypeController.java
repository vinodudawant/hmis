package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.BedStatus;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.administrator.dto.HallType;
import com.hms.administrator.service.WardTypeService;
import com.hms.dto.HallTypeCharges;
import com.hms.ehat.dto.ChargesMasterSlave;

@Controller
@RequestMapping(value="/wardtypecontroller")
public class WardTypeController {

	@Autowired
	WardTypeService wardtypeservice;
	

	/**
	 * @author :Navnath Erande
	 * @Date :08-01-2020
	 * @Code : fetch IPD Bed Status
	 **/
	@RequestMapping(value = "/fetchipdbedstatusadmin", method = RequestMethod.POST)
	@ResponseBody
	public BedStatus fetchipdbedstatus() {
		BedStatus bedstatus = new BedStatus();
		List<BedStatus> bedstatelist = wardtypeservice.fetchipdbedstatus();
		bedstatus.setBedstatuslist(bedstatelist);
		return bedstatus;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :08-01-2020
	 * @Code : fetch IPD Bed Status
	 **/
	@RequestMapping(value = "/fetchwordtypelist", method = RequestMethod.POST)
	@ResponseBody
	public ChargesMasterSlave fetchWordTypeList(Integer id) {
		ChargesMasterSlave chargesmasterslave = new ChargesMasterSlave();
		List<ChargesMasterSlave> list = wardtypeservice.fetchWordTypeList(id);
		chargesmasterslave.setLstChargesSlave(list);
		;
		return chargesmasterslave;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :13-01-2020
	 * @Code :save Hall Type
	 **/
	@RequestMapping(value = "/saveaddwardtype", method = RequestMethod.POST)
	@ResponseBody
	public String saveHallTypeCharges(HallType halltype,
			@RequestParam("ChargesNormalSpeciality") String ChargesNormalSpeciality,
			@RequestParam("ChargesNormalSuperSpeciality") String ChargesNormalSuperSpeciality,
			@RequestParam("ChargesNormalIntensivist") String ChargesNormalIntensivist,
			@RequestParam("chargesNormalMedicalTeamNursingCharges") String chargesNormalMedicalTeamNursingCharges,
			@RequestParam("isolationSpeciality") String isolationSpeciality,
			@RequestParam("isolationSuperSpeciality") String isolationSuperSpeciality,
			@RequestParam("isolationIntensivist") String isolationIntensivist,
			@RequestParam("isolationMedicalTeamNursingCharges") String isolationMedicalTeamNursingCharges,
			@RequestParam("hallTypecharge_id") String hallTypecharge_id,
			@RequestParam("hallTypecharge") String hallTypecharge

	) {
		float fChargesNormalSpeciality = Float.parseFloat(ChargesNormalSpeciality);
		float fChargesNormalSuperSpeciality = Float.parseFloat(ChargesNormalSuperSpeciality);
		float fChargesNormalIntensivist = Float.parseFloat(ChargesNormalIntensivist);
		float fchargesNormalMedicalTeamNursingCharges = Float.parseFloat(chargesNormalMedicalTeamNursingCharges);

		float fisolationSpeciality = Float.parseFloat(isolationSpeciality);
		float fisolationSuperSpeciality = Float.parseFloat(isolationSuperSpeciality);
		float fisolationIntensivist = Float.parseFloat(isolationIntensivist);
		float fisolationMedicalTeamNursingCharges = Float.parseFloat(isolationMedicalTeamNursingCharges);

		List<HallTypeCharges> list = new ArrayList<HallTypeCharges>();
		int id1 = Integer.parseInt(hallTypecharge_id);
		int id2 = Integer.parseInt(hallTypecharge);
		HallTypeCharges halltypecharges = new HallTypeCharges();
		halltypecharges.setIdhall_type_charges(id1);
		halltypecharges.setSpecialityNormalCharges(fChargesNormalSpeciality);
		halltypecharges.setSuperSpecialityNormalCharges(fChargesNormalSuperSpeciality);
		halltypecharges.setIntencivistNormalCharges(fChargesNormalIntensivist);
		halltypecharges.setMedicalTeamNormalCharges(fchargesNormalMedicalTeamNursingCharges);
		halltypecharges.setCreatedBy(halltype.getCreatedBy());
		halltypecharges.setCreatedDate(new Date());
		halltypecharges.setIsolationFlag("N");
		list.add(halltypecharges);
		HallTypeCharges halltypechargesio = new HallTypeCharges();
		halltypechargesio.setIdhall_type_charges(id2);
		halltypechargesio.setSpecialityNormalCharges(fisolationSpeciality);
		halltypechargesio.setSuperSpecialityNormalCharges(fisolationSuperSpeciality);
		halltypechargesio.setIntencivistNormalCharges(fisolationIntensivist);
		halltypechargesio.setMedicalTeamNormalCharges(fisolationMedicalTeamNursingCharges);
		halltypechargesio.setCreatedBy(halltype.getCreatedBy());
		halltypechargesio.setCreatedDate(new Date());
		halltypechargesio.setIsolationFlag("Y");
		list.add(halltypechargesio);
		/* hall.setHallTypeCharges(list); */
		halltype.setHallTypeId(0);
		System.out.println(halltype);
		String str = wardtypeservice.saveHallTypeCharges(halltype, list);

		return str;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :14-01-2020
	 * @Code :fetch Hall Type charges
	 **/
	@RequestMapping(value = "/fetchhalltypeandcharges", method = RequestMethod.POST)
	@ResponseBody
	public HallType fetchHallTypeCharges(@RequestParam("name") String name) {

		HallType halltype = new HallType();
		List<HallType> list = wardtypeservice.fetchHallTypeCharges(name);
		halltype.setHallTypeList(list);
		return halltype;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :14-01-2020
	 * @Code :delete Hall Type charges
	 **/
	@RequestMapping(value = "/deletehalltype", method = RequestMethod.POST)
	@ResponseBody
	public String deleteHallType(Integer id, Integer userid) {
		String str = "";
		Integer count = wardtypeservice.deleteHallType(id, userid);
		if (count == 1) {
			str = "Delete successfuly.";
			return str;
		} else {
			str = "Record Not delete.";
			return str;
		}
	}

	/**
	 * @author :Navnath Erande
	 * @Date :14-01-2020
	 * @Code :Update Hall Type charges Id
	 **/
	@RequestMapping(value = "/updatehalltypeid", method = RequestMethod.POST)
	@ResponseBody
	public HallType updateHallTypeId(Integer id) {
		return wardtypeservice.updateHallTypeId(id);
	}

	/**
	 * @author :Navnath Erande
	 * @Date :16-01-2020
	 * @Code :fetch ward Name
	 **/
	@RequestMapping(value = "/fetchwardname", method = RequestMethod.POST)
	@ResponseBody
	public ChargesMasterSlave fetchWardName() {
		ChargesMasterSlave chargesMasterSlave = new ChargesMasterSlave();
		List<ChargesMasterSlave> list = wardtypeservice.fetchWardName();
		chargesMasterSlave.setLstChargesSlave(list);
		return chargesMasterSlave;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :16-01-2020
	 * @Code :fetch Hall Type Name
	 **/
	@RequestMapping(value = "/fetchhallname", method = RequestMethod.POST)
	@ResponseBody
	public ChargesMasterSlave fetchHallName() {
		ChargesMasterSlave hallType = new ChargesMasterSlave();
		List<ChargesMasterSlave> list = wardtypeservice.fetchHallName();
		hallType.setLstChargesSlave(list);
		return hallType;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :16-01-2020
	 * @Code :Save Hall Information
	 **/
	@RequestMapping(value = "/savehallinformation", method = RequestMethod.POST)
	@ResponseBody
	public String saveHallInformation(@RequestParam("hall") String hall) {
		Integer response = wardtypeservice.saveHallInformation(hall);
		if (response == 1) {
			return "Recorde save successfuly";
		} else if (response == 2) {
			return "Update successfuly.";
		} else if (response == -1) {
			return "Already Hall Inserted.";
		} else {
			return "Recorde not save";
		}

	}

	/**
	 * @author :Navnath Erande
	 * @Date :16-01-2020
	 * @Code :fatch Hall Information
	 **/
	@RequestMapping(value = "/fetchhallinfo", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto fetchHallInfo() {
		HallManagementDto hall = new HallManagementDto();
		List<HallManagementDto> list = wardtypeservice.fetchHallInfo();
		hall.setHallList(list);
		return hall;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :21-01-2020
	 * @Code :Edit Hall Information
	 **/
	@RequestMapping(value = "/edithalltype", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto editHallType(Integer hall_id) {
		HallManagementDto hall = wardtypeservice.editHallType(hall_id);
		return hall;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :21-01-2020
	 * @Code :Add Hall Information
	 **/
	@RequestMapping(value = "/addHallType", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto addHallType(Integer hall_id) {
		return wardtypeservice.addHallType(hall_id);

	}

	/**
	 * @author :Navnath Erande
	 * @Date :21-01-2020
	 * @Code :Add bed Hall Information
	 **/
	@RequestMapping(value = "/addbedhalltype", method = RequestMethod.POST)
	@ResponseBody
	public String addBedHallType(HallManagementDto hall, Integer numberofbed) {
		String str = "";
		Integer response = wardtypeservice.addBedHallType(hall, numberofbed);
		if (response == 1) {
			str = "Save successfuly";
		} else {
			str = "Recorde Not Save.";
		}

		return str;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :21-01-2020
	 * @Code :delete Hall Information
	 **/
	@RequestMapping(value = "/deletehallbeds", method = RequestMethod.POST)
	@ResponseBody
	public String deleteHallType(HallManagementDto hall) {
		String str = "";
		Integer response = wardtypeservice.deleteHallType(hall);
		if (response == 1) {
			str = "Delete Successfuly.";
		} else {
			str = "Recorde Not Delete.";
		}
		return str;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :22-01-2020
	 * @Code :fetch delete Information
	 **/
	@RequestMapping(value = "/deletehallbedipd", method = RequestMethod.POST)
	@ResponseBody
	public Beds deleteHallbeds(Integer id) {
		Beds beds = new Beds();
		List<Beds> list = wardtypeservice.deleteHallbeds(id);
		beds.setBedList(list);
		return beds;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :22-01-2020
	 * @Code :delete Bed Information
	 **/
	@RequestMapping(value = "/deletebedhalladmin", method = RequestMethod.POST)
	@ResponseBody
	public String deletebedhalladmin(Beds beds) {
		String str = "";
		Integer response = wardtypeservice.deletebedhalladmin(beds);
		if (response == 1) {
			str = "Delete Successfuly.";
		} else {
			str = "Recorde Not Delete.";
		}
		return str;
	}

	/**
	 * @author :Dayanand Khandekar
	 * @Date :16-04-2021
	 * @Code :Add bed In Perticular Hall 
	 **/
	@RequestMapping(value = "/addbedinhall", method = RequestMethod.POST)
	@ResponseBody
	public int addbedInHall(@RequestParam("hall") Integer hall, @RequestParam("numberOfBed") Integer numberOfBed, @RequestParam("numberofbed") Integer numberofbed) {
		int  res = 0;
		 res = wardtypeservice.addbedInHall(hall,numberOfBed, numberofbed);
		

		return res;
	}
	
	/**
	 * @author :Dayanand Khandekar
	 * @Date :16-04-2021
	 * @Code :Add bed status
	 **/
	@RequestMapping(value = "/saveBedState", method = RequestMethod.POST)
	@ResponseBody
	public int saveBedState(BedStatus obj) {
		int  res = 0;
		 res = wardtypeservice.saveBedState(obj);
		return res;
	}
	
	/**
	 * @author :Dayanand Khandekar
	 * @Date :16-04-2021
	 * @Code :edit bed status
	 **/
	@RequestMapping(value = "/editBedState", method = RequestMethod.GET)
	@ResponseBody
	public BedStatus editBedState(@RequestParam("idbedState") Integer idbedState) {
		
		BedStatus  res = wardtypeservice.editBedState(idbedState);
		return res;
	}
	
	/**
	 * @author :Dayanand Khandekar
	 * @Date :16-04-2021
	 * @Code :delete bed status
	 **/
	@RequestMapping(value = "/deleteBedState", method = RequestMethod.POST)
	@ResponseBody
	public int deleteBedState(@RequestParam("idbedState") Integer idbedState) {
		int  res = 0;
		 res = wardtypeservice.deleteBedState(idbedState);
		return res;
	}
			
  }
