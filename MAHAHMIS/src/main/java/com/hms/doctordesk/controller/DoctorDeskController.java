package com.hms.doctordesk.controller;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.VitalMaster;
import com.hms.doctordesk.service.DoctorDeskServiceInterface;
import com.hms.ehat.dto.DoctorDto;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="doctordeskcontoller")
public class DoctorDeskController {

	@Autowired 
	DoctorDeskServiceInterface doctordeskserviceinterface;
	static Logger log=Logger.getLogger(DoctorDeskController.class.getName());
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :05-02-2020
	 * @Code :This method is fetch Preparation Master data
	 * @return
	 **/

	@RequestMapping(value = "/fetchpreparationmaster", method = RequestMethod.POST)
	@ResponseBody
	public PreparationMaster fetchPreparationMaster() {
		log.info("In DoctorDesk fetchPreparationMaster()");
		PreparationMaster preparationmaster=new PreparationMaster();
		List<PreparationMaster> list=doctordeskserviceinterface.fetchPreparationMaster();
		preparationmaster.setListpreparationmaster(list);
		log.debug("Reponse----> "+list);
		return preparationmaster;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :05-02-2020
	 * @Code :This method is Save Route Master
	 * @return
	 **/

	@RequestMapping(value = "/savesaveroutemaster", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveRouteMaster(RouteMaster routemaster) {
		log.info("In DoctorDesk saveRouteMaster()");
		Integer response=doctordeskserviceinterface.saveRouteMaster(routemaster);
		log.debug("Reponse----> "+response);
		return response;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :05-02-2020
	 * @Code : This method is fetch Route Master List
	 * @return
	 **/

	@RequestMapping(value = "/fetchroutemaster", method = RequestMethod.POST)
	@ResponseBody
	public RouteMaster fetchRouteMaster(@RequestParam ("routename") String routename) {
		log.info("In DoctorDesk fetchRouteMaster()");
		RouteMaster routemaster=new RouteMaster();
		List<RouteMaster> list=doctordeskserviceinterface.fetchRouteMaster(routename);
		routemaster.setListroutemasters(list);
		log.debug("Reponse----> "+list);
		return routemaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :05-02-2020
	 * @Code :This method is Edit Route Master Object
	 * @return
	 **/

	@RequestMapping(value = "/editroutemaster", method = RequestMethod.POST)
	@ResponseBody
	public RouteMaster editRouteMaster(@RequestParam ("id")Integer id) {
		log.info("In DoctorDesk editRouteMaster()");
		return doctordeskserviceinterface.editRouteMaster(id);
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :05-02-2020
	 * @Code :This method is delete Route Master Object
	 * @return
	 **/

	@RequestMapping(value = "/deleteroutemaster", method = RequestMethod.POST)
	@ResponseBody
	public Integer deleteRouteMaster(RouteMaster routeMaster) {
		log.info("In DoctorDesk deleteRouteMaster()");
		return doctordeskserviceinterface.deleteRouteMaster(routeMaster);
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :10-02-2020
	 * @Code :This method is save Immunization Configuration
	 * @return
	 **/

	@RequestMapping(value = "/saveimmunizationconfiguration", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveImmunizationConfiguration(ImmunizationConfigurationMaster obj){
		log.info("In DoctorDesk saveImmunizationConfiguration()");
		return doctordeskserviceinterface.saveImmunizationConfiguration(obj);
	}
	/**
	 * @author :Navnath Erande
	 * @Date :10-02-2020
	 * @Code : This method is fetch Immunization Configuration
	 * @return
	 **/

	@RequestMapping(value = "/fetchimmunizationconfig", method = RequestMethod.POST)
	@ResponseBody
	public ImmunizationConfigurationMaster  fetchImmunizationConfig(String vaccinename){
		log.info("In DoctorDesk fetchImmunizationConfig()");
		ImmunizationConfigurationMaster immunizationconfigurationmaster=new ImmunizationConfigurationMaster();
		 List<ImmunizationConfigurationMaster> list=doctordeskserviceinterface.fetchImmunizationConfig(vaccinename);
		 immunizationconfigurationmaster.setList(list);
		 log.debug("Reponse----> "+list);
		return immunizationconfigurationmaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :11-02-2020
	 * @Code :This method is Edit Immunization Configuration
	 * @return
	 **/

	@RequestMapping(value = "/editimmunizationconfig", method = RequestMethod.POST)
	@ResponseBody
	public ImmunizationConfigurationMaster  editImmunizationConfig(Integer id){
		log.info("In DoctorDesk editImmunizationConfig()");
		ImmunizationConfigurationMaster immunizationconfigurationmaster =doctordeskserviceinterface.editImmunizationConfig(id);
		log.debug("Reponse----> "+immunizationconfigurationmaster);
		return immunizationconfigurationmaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :11-02-2020
	 * @Code :This method is Save Vital Master
	 * @return
	 **/

	@RequestMapping(value = "/savewhitetal", method = RequestMethod.POST)
	@ResponseBody
	public Integer  saveVital(VitalMaster whitetalmaster){
		log.info("In DoctorDesk saveVital()");
		return doctordeskserviceinterface.saveVital(whitetalmaster);
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :11-02-2020
	 * @Code : This method is fetch Vital
	 * @return
	 **/

	@RequestMapping(value = "/fetchwhitetal", method = RequestMethod.POST)
	@ResponseBody
	public VitalMaster  fetchVital(String vitalname){
		log.info("In DoctorDesk fetchVital()");
		VitalMaster vitalmaster=new VitalMaster();
		List<VitalMaster> list= doctordeskserviceinterface.fetchVital(vitalname);
		vitalmaster.setVitallist(list);
		log.debug("Reponse----> "+list);
		return vitalmaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :11-02-2020
	 * @Code :This method is Edit vital Master
	 * @return
	 **/

	@RequestMapping(value = "/editvital", method = RequestMethod.POST)
	@ResponseBody
	public VitalMaster  editVital(Integer id){
		log.info("In DoctorDesk editVital()");
		VitalMaster vitalmaster= doctordeskserviceinterface.editVital(id);
		log.debug("Reponse----> "+vitalmaster);
		return vitalmaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :11-02-2020
	 * @Code :This method is Delete vital Master
	 * @return
	 **/

	@RequestMapping(value = "/deletevital", method = RequestMethod.POST)
	@ResponseBody
	public Integer  deleteVital(VitalMaster vital){
		log.info("In DoctorDesk deleteVital()");
		return doctordeskserviceinterface.deleteVital(vital);
	}
	/**
	 * @author :Navnath Erande
	 * @Date :13-02-2020
	 * @Code :This method is fetch doctor desk deshboard
	 * @return
	 **/

	@RequestMapping(value = "/fetchdoctordeskdeshboard", method = RequestMethod.POST)
	@ResponseBody
	public String  fetchDoctorDeskDeshboard(@RequestParam ("callFrom")String str ){
		log.info("In DoctorDesk fetchDoctorDeskDeshboard()");
		System.out.println("call from: "+str);
		return str;
	}	
	
}
