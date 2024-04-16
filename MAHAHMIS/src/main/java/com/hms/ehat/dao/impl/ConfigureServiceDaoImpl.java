package com.hms.ehat.dao.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanToPropertyValueTransformer;
import org.apache.commons.collections.CollectionUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.ConfigureServiceDao;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurRegistrationServicesDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.ConfigurationChargesViewDto;
import com.hms.ehat.dto.ConfigurationRegistrationChargesViewDto;
import com.hms.ehat.dto.ConfigurationViewServiceDto2;
import com.hms.ehat.dto.ConfigurationYearView;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.YearWiseConfigureDto;
import com.hms.ipdbill.dto.BulkSettlementMasterDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class ConfigureServiceDaoImpl implements ConfigureServiceDao {

	// @Bilal:- SessionFactory is define to get connection with db
	@Autowired
	SessionFactory sessionFactory;

	// @Bilal:- ResourceBundle allows you to write programs that can:
	// be easily localized, or translated, into different languages
	// be easily modified later to support even more

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);

	String hallIdss    =(String) resourceBundleEhat.getString("hallId");
	Integer hallIdEhat = Integer.parseInt(hallIdss);
	
	String sponsor =(String) resourceBundleEhat.getString("sponsor");
	Integer sponsorid = Integer.parseInt(sponsor);
	
	/**
	 * @author Bilal
	 * @date 30_May_2017
	 * @code This method is used to save or update records in db
	 ***/
	@Override
	public int saveOrUpdateConfigService(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			Integer configId, String queryType,
			Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges,
			double isoHallCharges, double isoMedicalCharges, Integer isComServId, Integer isComServlastId) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			//converting J-son list in java object 
			configurServicesDto = (ConfigurServicesDto) ConfigUIJSONUtility
					.getObjectFromJSON(configurationlist,
							ConfigurServicesDto.class);
       	
			// To Insert Record if query type is insert
				if (queryType.equalsIgnoreCase("insert")) { 
					
					//Update ConfigurServicesDto set deleted = 'Y'
					Query update = sessionFactory
							.getCurrentSession()
							.createQuery(
									"delete from ConfigurServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId and isComServId= :isComServId and isComServlastId= :isComServlastId");

					update.setParameter("chargesId", chargesId);
					update.setParameter("chargesSlaveId", chargesSlaveId);

					update.setParameter("hallId", hallId);
					update.setParameter("hallSlaveId", hallSlaveId);

					update.setParameter("isComServId", isComServId);
					update.setParameter("isComServlastId", isComServlastId);

					update.executeUpdate();
					
					for (ConfigurServicesDto configurServicesDto2 : configurServicesDto
							.getLstConfigurService()) {
						
						
						//getting count of service id in configuration
						/*Query q = sessionFactory.getCurrentSession().createSQLQuery(
						                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' and service_id="
						                     +configurServicesDto2.getServiceId()+" and charges_id="+chargesId+" and chargesSlave_id="
						                     +chargesSlaveId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="
						                     +isComServId+" and is_com_servlastId="+isComServlastId );

						 Integer count = ((Number) q.uniqueResult()).intValue();*/
						 
						 /*if(count > 0){
							 
							// Integer id= configurServicesDto2.getConfigId();
								// creating session to updating records in other bill table 
							 ConfigurServicesDto obj = (ConfigurServicesDto) sessionFactory
										.getCurrentSession().get(
												ConfigurServicesDto.class,
												configurServicesDto2.getConfigId());
							// criteria.add(Restrictions.not(Restrictions.in("billDetailsId", masterChecked)));
							 
							 obj.setCreatedBy(userId);
							 obj.setUnitId(unitId);
							 obj.setCreatedBy(configurServicesDto2
										.getCreatedBy());

							 obj.setDeleted("N");
							 obj.setCreatedDate(new Date(
										new java.util.Date().getTime()));
							 obj.setMasterId(masterId);
							 obj.setHallId(hallId);
							 obj.setHallSlaveId(hallSlaveId);
							 obj.setHallCharges(hallCharges);
							 obj.setMedicalCharges(medicalCharges);
							 obj.setCharges(configurServicesDto2.getCharges());
							 obj.setServiceId(configurServicesDto2.getServiceId());
							 obj.setOperator(configurServicesDto2.getOperator());
							 obj.setNumber(configurServicesDto2.getNumber());
							 obj.setIncreaseordecrease(configurServicesDto2.getIncreaseordecrease());
							 obj.setChargesId(configurServicesDto2.getChargesId());
							 obj.setChargesSlaveId(configurServicesDto2.getChargesSlaveId());
							 obj.setDistribute(configurServicesDto2.getDistribute());
							 obj.setFromDate(configurServicesDto2.getFromDate());
							 obj.setToDate(configurServicesDto2.getToDate());
							 obj.setDepartMentID(configurServicesDto2.getDepartMentID());
							 obj.setCopay(configurServicesDto2.getCopay());
							 obj.setTotalcharges(configurServicesDto2.getTotalcharges());
							 obj.setIsComServId(configurServicesDto2.getIsComServId());
							 obj.setIsComServlastId(configurServicesDto2.getIsComServlastId());
							 obj.setServiceLastId(configurServicesDto2.getServiceLastId());
							 obj.setIscatHall(configurServicesDto2.getIscatHall());
							 obj.setSelfId(configurServicesDto2.getSelfId());
							 
							 SubServiceDto obje = (SubServiceDto) sessionFactory
										.getCurrentSession().get(
												SubServiceDto.class,
												configurServicesDto2.getServiceId());
							 obj.setIscombination(obje.getIscombination());
							 
							 ChargesMasterSlave obje2 = (ChargesMasterSlave) sessionFactory
										.getCurrentSession().get(
												ChargesMasterSlave.class,
												hallSlaveId);
							 obj.setIscatHall(obje2.getIsCategory());
							 
							 //for changing package amount in sub service
							 if (chargesId ==0 && chargesSlaveId ==0 && hallId ==0 && hallSlaveId ==0 && isComServId > 0 && isComServlastId >0) {
								 savetotalinsubservice(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,
										 isComServlastId,configurServicesDto2.getTotalcharges());
							 }
						 }else{
*/							    configurServicesDto2.setCreatedBy(userId);
								configurServicesDto2.setUnitId(unitId);
								configurServicesDto2.setCreatedBy(configurServicesDto2
										.getCreatedBy());

								configurServicesDto2.setDeleted("N");
								configurServicesDto2.setCreatedDate(new Date(
										new java.util.Date().getTime()));
								configurServicesDto2.setMasterId(masterId);
								configurServicesDto2.setHallId(hallId);
								configurServicesDto2.setHallSlaveId(hallSlaveId);
								configurServicesDto2.setHallCharges(hallCharges);
								configurServicesDto2.setMedicalCharges(medicalCharges);
								configurServicesDto2.setIsoHallCharges(isoHallCharges);
								configurServicesDto2.setIsoMedicalCharges(isoMedicalCharges);
								
								SubServiceDto obje = (SubServiceDto) sessionFactory
										.getCurrentSession().get(
												SubServiceDto.class,
												configurServicesDto2.getServiceId());
								configurServicesDto2.setIscombination(obje.getIscombination());
								
								/* ChargesMasterSlave obje2 = (ChargesMasterSlave) sessionFactory
											.getCurrentSession().get(
													ChargesMasterSlave.class,
													hallSlaveId);
								 configurServicesDto2.setIscatHall(obje2.getIsCategory());*/
								sessionFactory.getCurrentSession().merge(
										configurServicesDto2);
								//for changing package amount in sub service
								if (chargesId ==0 && chargesSlaveId ==0 && hallId ==0 && hallSlaveId ==0 && isComServId > 0 && isComServlastId >0) {
									 savetotalinsubservice(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,
											 isComServlastId,configurServicesDto2.getTotalcharges());
								}
						 //}
						
					}
				} else {// To Update Record  delete from
					
				Query update = sessionFactory
						.getCurrentSession()
						.createQuery(
								"delete from ConfigurServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId and isComServId= :isComServId and isComServlastId= :isComServlastId");

				update.setParameter("chargesId", chargesId);
				update.setParameter("chargesSlaveId", chargesSlaveId);

				update.setParameter("hallId", hallId);
				update.setParameter("hallSlaveId", hallSlaveId);

				update.setParameter("isComServId", isComServId);
				update.setParameter("isComServlastId", isComServlastId);

				update.executeUpdate();
				
					for (ConfigurServicesDto configurServicesDto2 : configurServicesDto
							.getLstConfigurService()) {
						
					
						
						//where deleted='N' and deleted='N'
						/*Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' and service_id="
						                     +configurServicesDto2.getServiceId()+" and charges_id="+chargesId+" and chargesSlave_id="
						                     +chargesSlaveId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="
						                     +isComServId+" and is_com_servlastId="+isComServlastId );

						 Integer count = ((Number) q.uniqueResult()).intValue();*/
						
						// if(count == 0){
							 configurServicesDto2.setCreatedBy(userId);
								configurServicesDto2.setUnitId(unitId);
								configurServicesDto2.setCreatedBy(configurServicesDto2
										.getCreatedBy());

								configurServicesDto2.setDeleted("N");
								configurServicesDto2.setCreatedDate(new Date(
										new java.util.Date().getTime()));
								configurServicesDto2.setMasterId(masterId);
								configurServicesDto2.setHallId(hallId);
								configurServicesDto2.setHallSlaveId(hallSlaveId);
								configurServicesDto2.setHallCharges(hallCharges);
								configurServicesDto2.setMedicalCharges(medicalCharges);
								configurServicesDto2.setIsoHallCharges(isoHallCharges);
								configurServicesDto2.setIsoMedicalCharges(isoMedicalCharges);
								
								SubServiceDto obje = (SubServiceDto) sessionFactory
										.getCurrentSession().get(
												SubServiceDto.class,
												configurServicesDto2.getServiceId());
								configurServicesDto2.setIscombination(obje.getIscombination());
								
								/* ChargesMasterSlave obje2 = (ChargesMasterSlave) sessionFactory
											.getCurrentSession().get(
													ChargesMasterSlave.class,
													hallSlaveId);
								 configurServicesDto2.setIscatHall(obje2.getIsCategory());*/
								sessionFactory.getCurrentSession().merge(
										configurServicesDto2);
								//for changing package amount in sub service
								if (chargesId ==0 && chargesSlaveId ==0 && hallId ==0 && hallSlaveId ==0 && isComServId > 0 && isComServlastId >0) {
									 savetotalinsubservice(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,
											 isComServlastId,configurServicesDto2.getTotalcharges());
								}
						// }else{
						 // creating session to updating records in other bill table 
							 /*ConfigurServicesDto obj = (ConfigurServicesDto) sessionFactory
										.getCurrentSession().get(
												ConfigurServicesDto.class,
												configurServicesDto2.getConfigId());
							 
							 obj.setCreatedBy(userId);
							 obj.setUnitId(unitId);
							 obj.setCreatedBy(configurServicesDto2
										.getCreatedBy());

							 obj.setDeleted("N");
							 obj.setCreatedDate(new Date(
										new java.util.Date().getTime()));
							 obj.setMasterId(masterId);
							 obj.setHallId(hallId);
							 obj.setHallSlaveId(hallSlaveId);
							 obj.setHallCharges(hallCharges);
							 obj.setMedicalCharges(medicalCharges);
							 obj.setCharges(configurServicesDto2.getCharges());
							 obj.setServiceId(configurServicesDto2.getServiceId());
							 obj.setOperator(configurServicesDto2.getOperator());
							 obj.setNumber(configurServicesDto2.getNumber());
							 obj.setIncreaseordecrease(configurServicesDto2.getIncreaseordecrease());
							 obj.setChargesId(configurServicesDto2.getChargesId());
							 obj.setChargesSlaveId(configurServicesDto2.getChargesSlaveId());
							 obj.setDistribute(configurServicesDto2.getDistribute());
							 obj.setFromDate(configurServicesDto2.getFromDate());
							 obj.setToDate(configurServicesDto2.getToDate());
							 obj.setDepartMentID(configurServicesDto2.getDepartMentID());
							 obj.setCopay(configurServicesDto2.getCopay());
							 obj.setTotalcharges(configurServicesDto2.getTotalcharges());
							 obj.setIsComServId(configurServicesDto2.getIsComServId());
							 obj.setIsComServlastId(configurServicesDto2.getIsComServlastId());
							 obj.setServiceLastId(configurServicesDto2.getServiceLastId());
							 obj.setIscombination(configurServicesDto2.getIscombination());
							 obj.setIscatHall(configurServicesDto2.getIscatHall());
							 obj.setSelfId(configurServicesDto2.getSelfId());
							 
							 SubServiceDto obje = (SubServiceDto) sessionFactory
										.getCurrentSession().get(
												SubServiceDto.class,
												configurServicesDto2.getServiceId());
							 obj.setIscombination(obje.getIscombination());
							 
							 ChargesMasterSlave obje2 = (ChargesMasterSlave) sessionFactory
										.getCurrentSession().get(
												ChargesMasterSlave.class,
												hallSlaveId);
							 obj.setIscatHall(obje2.getIsCategory());
							//for changing package amount in sub service
							 if (chargesId ==0 && chargesSlaveId ==0 && hallId ==0 && hallSlaveId ==0 && isComServId > 0 && isComServlastId >0) {
								 savetotalinsubservice(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,
										 isComServlastId,configurServicesDto2.getTotalcharges());
							 }
						 }*/
						
					 }
				}
			

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @COde      :For update package amount in sub service****/
	public void savetotalinsubservice(Integer chargesId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, Integer isComServId,
			Integer isComServlastId, double total) {
		SubServiceDto obj = (SubServiceDto) sessionFactory
				.getCurrentSession().get(
						SubServiceDto.class,
						isComServlastId);
	   // obj.setCharges(total);// committed by dayanand 
	}

	/**
	 * @author Bilal
	 * @date 115-JUN-2017
	 * @code For getting autosuggetions 
	 * ***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurServicesDto> getAutoSuggestionConfigService(String letter) {
		
		List<ConfigurServicesDto> ltConfiguration = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurServicesDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("configId"));
			// criteria.setMaxResults(10);
			criteria.add(Restrictions.like("chargesName", letter + "%"));

			criteria.setMaxResults(autoLimit);
			ltConfiguration = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltConfiguration;
		}
		return ltConfiguration;
	}

	/**
	 * @author Bilal
	 * @date 14-JUN-2017
	 * @code For getting all list of configuration from view 
	 * ***/
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationChargesViewDto> getConfigurationListFromView(Integer startIndex) {
		
		List<ConfigurationChargesViewDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(ConfigurationChargesViewDto.class);
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			//criteria.addOrder(Order.desc("idConfiguration"));
			/*Criteria criteria2 = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationChargesViewDto.class);
			criteria2.setProjection( Projections.distinct( Projections.property("chargesSlaveId")));	
			
			@SuppressWarnings("unchecked")
			List<Integer> listDocs = (List<Integer>) criteria2.list();
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();
			for(Integer id:listDocs){
				
				masterChecked.add(id);
				
				
				
				
			}
			//array list to add in operator with criteria fro charges slav id
			criteria.add(Restrictions.in("chargesSlaveId", masterChecked));	*/		
			
		//	SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery("call sp_ehat_configuration_view3()");
			//createSQLQuery.addEntity(ConfigurationChargesViewDto.class);
			//createSQLQuery.setResultTransformer(new AliasToBeanResultTransformer(ConfigurationChargesViewDto.class));
            
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	
	public Integer getAllChargesCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_configuration_view3" ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	/**
	 * @author Bilal
	 * @date 14-JUN-2017
	 * @code For getting all list of charges and service Name
	 * ***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationViewServiceDto2> getConfigurationListFromViewForSub(
			Integer chargesId, Integer chargesSlaveId,
			 Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId) {
		List<ConfigurationViewServiceDto2> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConfigurationViewServiceDto2.class);
			//criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			/*criteria.addOrder(Order.desc("idConfigurations"));*/
			
			criteria.add(Restrictions.eq("chargesId", chargesId));
			criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
			
			criteria.add(Restrictions.eq("hallId", hallId));
			criteria.add(Restrictions.eq("hallSlaveId", hallSlaveId));
			
			criteria.add(Restrictions.eq("isComServId", isComServId));
			criteria.add(Restrictions.eq("isComServlastId", isComServlastId));
			
			criteria.add(Restrictions.eq("deleted", "N"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**
	 * @author Bilal
	 * @date 115-JUN-2017
	 * @code For deleting configuration list the flag is y 
	 * ***/
	@Override
	public boolean deleteConfigurationList(Integer idConfiguration,
			Integer chargesId, Integer chargesSlaveId,
			HttpServletRequest request,
			Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId) {
		try {
			HttpSession session = request.getSession();
			@SuppressWarnings("unused")
			Integer userId = (Integer) session.getAttribute("userId1");
			//Integer unitId =(Integer) session.getAttribute("uId");
			
			//Update ConfigurServicesDto set deleted = 'Y'
			Query update = sessionFactory
					.getCurrentSession()
					.createQuery(
							"delete from ConfigurServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId and isComServId= :isComServId and isComServlastId= :isComServlastId");

			update.setParameter("chargesId", chargesId);
			update.setParameter("chargesSlaveId", chargesSlaveId);

			update.setParameter("hallId", hallId);
			update.setParameter("hallSlaveId", hallSlaveId);

			update.setParameter("isComServId", isComServId);
			update.setParameter("isComServlastId", isComServlastId);

			update.executeUpdate();
			
			
			/*Query alfa = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_configuration_services set deleted = 'Y', deleted_by="+userId+
							" , deleted_date_time= now()" +
							" where chargesSlave_id = "+chargesSlaveId+"  and charges_id = "+chargesId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="+isComServId+" and is_com_servlastId="+isComServlastId);
									
			alfa.executeUpdate();*/
			

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * @author Bilal
	 * @date 24-JUN-2017
	 * @code For Fetching List of configuration for update 
	 * ***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurServicesDto> fetchAllListForUpdate(Integer hallId,
			Integer hallSlaveId, Integer chargesId, Integer chargesSlaveId) {
		List<ConfigurServicesDto> lstConfigurService = null;
		try {

		/*	String query1 = "select ehs.category_name as categoryName,ehs.service_name as serviceName "
					+ "from ehat_configuration_services ehs,ehat_subservice es,ehat_service_master esm where es.id=ehs.service_id and esm.service_id=ehs.master_id";
			Query q = sessionFactory.getCurrentSession().createSQLQuery(query1);
			lstConfigurService =q.list();*/
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurServicesDto.class);
			if (hallId == 0 && hallSlaveId == 0 ) {
				criteria.addOrder(Order.desc("configId"));
				criteria.add(Restrictions.eq("chargesId", chargesId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
				criteria.add(Restrictions.eq("hallId", hallId));
				criteria.add(Restrictions.eq("hallSlaveId", hallSlaveId));
				
				lstConfigurService = criteria.list();
				
			} else if (chargesId == 0 && chargesSlaveId == 0) {
				criteria.addOrder(Order.desc("configId"));
				criteria.add(Restrictions.eq("hallId", hallId));
				criteria.add(Restrictions.eq("hallSlaveId", hallSlaveId));
				criteria.add(Restrictions.eq("chargesId", chargesId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
				
				lstConfigurService = criteria.list();
				
			} else{
				criteria.addOrder(Order.desc("configId"));
				criteria.add(Restrictions.eq("chargesId", chargesId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
				criteria.add(Restrictions.eq("hallId", hallId));
				criteria.add(Restrictions.eq("hallSlaveId", hallSlaveId));
			
				lstConfigurService = criteria.list();
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurService;
		}
		return lstConfigurService;
	}

	/**
	 * @author Bilal
	 * @date 115-JUN-2017
	 * @code For Fetching List of records with stored procedure from data base
	 * ***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurByChargesandByHallDto> fetchAllListByHallIdAndByChargesId() {
		
		List<ConfigurByChargesandByHallDto> lstConfigurByHallIdandChargesId =null;
		
	

		Query criteria =  sessionFactory.getCurrentSession().createSQLQuery(
				"CALL ehat_config_sev_byspnid_byhallid(:chargesId ,:chargesSlaveId, :HallId, :HallSlaveId, :deleted)")
				.addEntity(ConfigurByChargesandByHallDto.class)
				.setParameter("chargesId", 4)
				.setParameter("chargesSlaveId", 11)
				.setParameter("HallId", 3)
				.setParameter("HallSlaveId", 3)
				.setParameter("deleted", 'N');

		 lstConfigurByHallIdandChargesId = criteria.list();
			for(int i=0; i<lstConfigurByHallIdandChargesId.size(); i++){
				@SuppressWarnings("unused")
				ConfigurByChargesandByHallDto stock = (ConfigurByChargesandByHallDto)lstConfigurByHallIdandChargesId.get(i);
			
			}
			
			
			return lstConfigurByHallIdandChargesId;
		
	}


	/**
	 * @author Bilal
	 * @date 21-JUN-2017
	 * @code For Fectching HallType Id
	 * ***/
	@Override
	public int fetchehatHallTypeId(int hallTypeId) {
	   Integer a=0;
		try {	
			Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
					"select ehat_halltype_id from hall_type where idhall_type="
							+ hallTypeId);

			a =(Integer) hallType.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
			return  a;
		}
		return  a;
	}

	/**
	 * @author Bilal
	 * @date 21-JUN-2017
	 * @code For Fectching Hall Id
	 * ***/
	@Override
	public int fetchehatHallNmaeId(int hallId) {
		Integer a=0;
		try {	
			Query hall = sessionFactory.getCurrentSession().createSQLQuery(
					"select ehat_hallid from hall where Hall_ID="
							+ hallId);

			a =(Integer) hall.uniqueResult();
			

		} catch (Exception e) {
			e.printStackTrace();
			return  a;
		}
		return  a;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurServicesDto> getConfigurationListFromView2() {
		List<ConfigurServicesDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurServicesDto.class);
			criteria.addOrder(Order.desc("configId"));
			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);		
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));*/
			criteria.setProjection( Projections.distinct( Projections.property("billDetailsId")));			
			
			List<Integer> listDocs = (List<Integer>) criteria.list();
			for(Integer id:listDocs){
				
				BillDetailsIpdDto objectToUpdate = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class, id);
				objectToUpdate.setPaidFlag("Y");
			}
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**@author  :Bilal
	 * @date    :28-08-2017
	 * @code    :for combination data***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigCombinationDto> getConfigurationdata(String callfrom,Integer startIndex) {
		List<ConfigCombinationDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigCombinationDto.class);
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			
			lstConfigurations = criteria.list();

			
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**@author  :Bilal
	 * @date    :28-08-2017
	 * @code    :for sponsor wise data***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigSponsorDto> getConfigdataSponsor(Integer startIndex) {
		List<ConfigSponsorDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigSponsorDto.class);	
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			
			lstConfigurations = criteria.list();

			
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**@author  :Bilal
	 * @date    :28-08-2017
	 * @code    :for Hall wise data***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigHallWiseDto> getConfigdataHallWise() {
		List<ConfigHallWiseDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigHallWiseDto.class);	
			
			lstConfigurations = criteria.list();

			
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**@author  :Bilal
	 * @date    :28-08-2017
	 * @code    :for delete services based on id***/
	@Override
	public boolean newdelete(Integer id, HttpServletRequest request) {
		
		
		try {
			Query bet = sessionFactory.getCurrentSession().createQuery
					("DELETE  FROM ConfigurServicesDto AS c WHERE c.configId=:stDate ");
			bet.setParameter("stDate", id);
			bet.executeUpdate();
			

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @COde      :For getting List of sponsor hall and package****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationChargesViewDto> searchall(String letter,Integer startIndex) {
		List<ConfigurationChargesViewDto> lstConfigurations = null;
		List<ConfigurationChargesViewDto> lstConfigurations1 = new ArrayList<>();
		
		try {
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationChargesViewDto.class);
			criteria.add(Restrictions
					.sqlRestriction("charges_name LIKE '" + letter + "%' OR category_name LIKE '" + letter + "%'" +
							"OR Hall_name LIKE '" + letter + "%' OR HallSlave_name LIKE '" + letter + "%'" +
									"OR combination_name LIKE '" + letter + "%' OR subService_name LIKE '" + letter + "%'"));
			criteria.setMaxResults(10);
			*/
			
			//Added By Rahul
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationChargesViewDto.class);
			
			criteria.add(Restrictions.sqlRestriction(
				    "charges_name LIKE ? OR category_name LIKE ? OR Hall_name LIKE ? OR HallSlave_name LIKE ? OR combination_name LIKE ? OR subService_name LIKE ?",
				    new Object[] { "%" + letter + "%", "%" + letter + "%", "%" + letter + "%", "%" + letter + "%", "%" + letter + "%", "%" + letter + "%" },
				    new Type[] { StandardBasicTypes.STRING, StandardBasicTypes.STRING, StandardBasicTypes.STRING, StandardBasicTypes.STRING, StandardBasicTypes.STRING, StandardBasicTypes.STRING }
				));
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			//criteria.setFetchSize(Integer.MIN_VALUE);
			lstConfigurations = criteria.list();
			
			// ====================================================
			String sql = "select count(*) from ehat_configuration_view3 where 	" + 
					"charges_name LIKE '%"+letter+"%' 	" + 
					"OR category_name LIKE '%"+letter+"%' 	" + 
					"OR Hall_name LIKE '%"+letter+"%' 	" + 
					"OR HallSlave_name LIKE '%"+letter+"%' OR combination_name LIKE '%"+letter+"%'  	" + 
					"OR subService_name LIKE '%"+letter+"%' ;";
			SQLQuery sqlres = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) sqlres.uniqueResult()).intValue();
			
			for(ConfigurationChargesViewDto rs : lstConfigurations)
			{
				rs.setAllChargesCount(count);
				lstConfigurations1.add(rs);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations1;
		}
		return lstConfigurations1;
	}

	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @COde      :For getting List of Combination or package****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigCombinationDto> searchcombination(String letter,Integer startIndex) {
		List<ConfigCombinationDto> lstConfigurations = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigCombinationDto.class);
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			criteria.add(Restrictions
					.sqlRestriction("combination_name LIKE '%" + letter + "%' OR com_slave_name LIKE '%" + letter + "%'"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	
	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @COde      :For getting List of Sponsor for auto suggestion****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigSponsorDto> searchsponsor(String letter,Integer startIndex) {
		List<ConfigSponsorDto> lstConfigurations = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigSponsorDto.class);
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			criteria.add(Restrictions
					.sqlRestriction("sponsor_name LIKE '%" + letter + "%' OR sponsor_slave_name LIKE '%" + letter + "%'"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @COde      :For getting List of hall for auto suggestion****/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigHallWiseDto> searchhallwise(String letter) {
		List<ConfigHallWiseDto> lstConfigurations = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigHallWiseDto.class);
			criteria.add(Restrictions
					.sqlRestriction("hall_name LIKE '%" + letter + "%' OR hall_slave_name LIKE '%" + letter + "%'"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	/***@author     :BILAL
	 * @Date        :23-10-2017
	 * @Code        :For Saving hall charges***/
	@Override
	public int saveOrUpdateConfigService2(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			String queryType,String hallandhallslave,
			Integer masterId, Integer serviceLastId) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			//converting J-son list in java object 
			configurServicesDto = (ConfigurServicesDto) ConfigUIJSONUtility
					.getObjectFromJSON(configurationlist,
							ConfigurServicesDto.class);
			
			//converting J-son list in java object of hall slave id's
			ConfigurServicesDto obj=new ConfigurServicesDto();
			obj = (ConfigurServicesDto) ConfigUIJSONUtility
					.getObjectFromJSON(hallandhallslave,
							ConfigurServicesDto.class);
       	
			//Deleting records of hall wise configuration
			int isDeleted = deletePrevHallWiseRecode(obj,masterId,serviceLastId,configurServicesDto);
			
			//Saving and updating records of hall wise configuration
			int isIntserted = insertHalWiseVal(configurServicesDto,userId,unitId,masterId, serviceLastId);
			
			System.err.println(isDeleted +"==============="+isIntserted);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	/***@author     :BILAL
	 * @Date        :24-10-2017
	 * @Code        :For fetching list of services hall wise***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurServicesDto> fetchhallwiseservices(
			String hallandhallslave) {
		List<ConfigurServicesDto> lstConfigurations = null;
		try {
			//converting J-son list in java object of hall slave id's
			ConfigurServicesDto obj=new ConfigurServicesDto();
			obj = (ConfigurServicesDto) ConfigUIJSONUtility
					.getObjectFromJSON(hallandhallslave,
							ConfigurServicesDto.class);
			
			
			List<Integer> idList = (List<Integer>) CollectionUtils.collect(obj.getLstConfigurService(), 
                    new BeanToPropertyValueTransformer("hallSlaveId"));
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurServicesDto.class);	
			
			
			Integer chargesId      = 0;
			Integer chargesSlaveId =0;
			Integer isComServId    = 0;
			Integer isComServlastId =0;
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("configId"));
			criteria.add(Restrictions.eq("hallId", hallIdEhat));
			criteria.add(Restrictions.eq("iscatHall", "Y"));
			criteria.add(Restrictions.eq("chargesId", chargesId));
			criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
			criteria.add(Restrictions.eq("isComServId", isComServId));
			criteria.add(Restrictions.eq("isComServlastId", isComServlastId));
			criteria.add(Restrictions.in("hallSlaveId", idList));
			
			lstConfigurations = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	
	//by TK 11-NOV-2017
	public int deletePrevHallWiseRecode(ConfigurServicesDto obj,int masterId,int serviceLastId, ConfigurServicesDto configurServicesDto){
		int val=0;
		try {
			
			@SuppressWarnings("unchecked")
			List<Integer> idList = (List<Integer>) CollectionUtils.collect(obj.getLstConfigurService(), 
                    new BeanToPropertyValueTransformer("hallSlaveId"));
			
		
			Session session = sessionFactory.openSession(); //create session object from the session factory
			session.beginTransaction();
			
			
				Integer chargesId      = 0;
				Integer chargesSlaveId =0;
				Integer isComServId    = 0;
				Integer isComServlastId =0;
				for (ConfigurServicesDto configurServicesDto2 : configurServicesDto
						.getLstConfigurService()) {
				Query update = session
						.createQuery(
								"delete from ConfigurServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId in (:hallSlaveId) and isComServId= :isComServId and isComServlastId= :isComServlastId and serviceId= :serviceId");

				update.setParameter("chargesId", chargesId);
				update.setParameter("chargesSlaveId", chargesSlaveId);

				update.setParameter("hallId", hallIdEhat);
				update.setParameterList("hallSlaveId", idList);//("hallSlaveId", obj2.getHallSlaveId());

				update.setParameter("isComServId", isComServId);
				update.setParameter("isComServlastId", isComServlastId);
				
				update.setParameter("serviceId", configurServicesDto2.getServiceId()); 
				//update.setParameter("masterId", masterId);
				//update.setParameter("serviceLastId", serviceLastId);   and masterId= :masterId and serviceLastId= :serviceLastId

				update.executeUpdate();
				
				}	
				
				session.getTransaction().commit(); //commit the transaction
				session.close();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return val;
	}
	
	//by TK 11-NOV-2017
	private int insertHalWiseVal(ConfigurServicesDto configurServicesDto,int userId,int unitId,Integer masterId, Integer serviceLastId) {
		int val=0;
		int i=0;
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction(); //initialize the transaction object from session
		try {
			
			
			for (ConfigurServicesDto configurServicesDto2 : configurServicesDto
					.getLstConfigurService()) {
				configurServicesDto2.setHallId(hallIdEhat);
				configurServicesDto2.setChargesId(0);
				configurServicesDto2.setChargesSlaveId(0);
				configurServicesDto2.setIsComServId(0);
				configurServicesDto2.setIsComServlastId(0);
				configurServicesDto2.setMasterId(masterId);
				configurServicesDto2.setServiceLastId(serviceLastId);
				configurServicesDto2.setCreatedBy(userId);
				configurServicesDto2.setCreatedDate(new Date(
						new java.util.Date().getTime()));
				configurServicesDto2.setDeleted("N");
				configurServicesDto2.setIscatHall("Y");
				configurServicesDto2.setSelfId(0);
				
				session.save(configurServicesDto2);
				
				if(i % 20 == 0 ) { // Same as the JDBC batch size
					//flush a batch of inserts and release memory:
					session.flush();
					session.clear();
				}
				i++;
			}
			
			

				session.getTransaction().commit(); //commit the transaction
				session.close();
				
		} catch (Exception e) {
			e.printStackTrace();
			val=-1;
			session.getTransaction().rollback();
		}
		return val;
	}//end insertHalWiseVal
	/**
	 * @author  : BILAL
	 * @date    : 09-01-2018
	 * @code    : For medical team charges and hall charges 
	 ***/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurServicesDto> fetchMedicalTeamCharges(int chargesId,
			int chargesSlaveId, int hallId, int hallSlaveId, int isComServId,
			int isComServlastId) {
		System.out.println("Values================>chargesSlaveId:"+chargesId +" chargesSlaveId:"+chargesSlaveId +" hallId:"+ hallId +" hallSlaveId:" + hallSlaveId +" isComServId:" + isComServId +" isComServlastId:" + isComServlastId);
		List<ConfigurServicesDto> ltconfig=new ArrayList<ConfigurServicesDto>();
		try {
			int has =hallSlaveId;
			if (hallId > 0) {
				
				//checking the count of that hall slave id if count greater than zero then the hall slave id will be same
				Integer count = countofhallandsponsor(chargesId,
						chargesSlaveId, hallId, has, isComServId,
						isComServlastId);
				
				if (count > 0) {
					System.err.println("?2333112222222222222???????????????????has" + has);
				} else {
					
					
					//calling method to get hall slave id till not get
				    has = subhallId( chargesId, chargesSlaveId,  hallId,  has,  isComServId,
			             isComServlastId);
				   
				 
				    //checking the count of that hall slave id if count greater than zero then the hall slave id will be same
					Integer count2 = countofhallandsponsor(chargesId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId);
					
					if (count2 > 0) {
						System.err.println("????????????????????has" + has);
					} else {
						//getting sponsor master till top
						if (chargesSlaveId > 0) {
							chargesSlaveId = subsponsortillTop( chargesId, chargesSlaveId,  hallId,  has,  isComServId,
						             isComServlastId);
						}
					}
				}
			}
			else{
				//getting master or super one id charges not available in configuration table with sub id of sponsor
				if (chargesSlaveId > 0) {
					Integer count3 = countofhallandsponsor(chargesId,
							chargesSlaveId, hallId, has, isComServId,
							isComServlastId);
					
					if (count3 > 0) {
						System.err.println("????????????????????chargesSlaveId" + chargesSlaveId);
					} else {
					chargesSlaveId = subsponsortillTop( chargesId, chargesSlaveId,  hallId,  has,  isComServId,
				             isComServlastId );
					}
				}
			}
			
		
			//getting charges from Auto suggestion date wise
			Query date = sessionFactory.getCurrentSession().createQuery
					("SELECT  toDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");
			
			
			date.setParameter("sponsorId", chargesId);
			date.setParameter("chargesSlaveId", chargesSlaveId);
			
			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", has);
			
			date.setParameter("isComServId", isComServId);
			date.setParameter("isComServlastId", isComServlastId);
			date.setMaxResults(1);
			
			java.sql.Date d= (java.sql.Date) date.uniqueResult();
			
			Query fromdate = sessionFactory.getCurrentSession().createQuery
					("SELECT  fromDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");
			
			
			fromdate.setParameter("sponsorId", chargesId);
			fromdate.setParameter("chargesSlaveId", chargesSlaveId);
			
			fromdate.setParameter("hallId", hallId);
			fromdate.setParameter("hallSlaveId", has);
			
			fromdate.setParameter("isComServId", isComServId);
			fromdate.setParameter("isComServlastId", isComServlastId);
			fromdate.setMaxResults(1);
			
			java.sql.Date fd= (java.sql.Date) fromdate.uniqueResult();
				
				
			if (d != null && fd != null) {
				
				//getting charges from Auto suggestion date wise
				Query bet = sessionFactory.getCurrentSession().createQuery
						("FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId  AND current_date() BETWEEN  DATE_FORMAT(:stDate, '%Y-%m-%d')  AND DATE_FORMAT(:edDate, '%Y-%m-%d')");
				
				bet.setParameter("sponsorId", chargesId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
				
				bet.setDate("stDate", fd);
				bet.setDate("edDate", d);
				
				ltconfig = bet.setMaxResults(1).list();
				
			//double	sumOfRefund = (Double) bet.uniqueResult();
			} else {
				//getting charges from Auto suggestion  
				Query bet = sessionFactory.getCurrentSession().createQuery
						("FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");
				
				bet.setParameter("sponsorId", chargesId);
				bet.setParameter("chargesSlaveId", chargesSlaveId);
				
				bet.setParameter("hallId", hallId);
				bet.setParameter("hallSlaveId", has);
				
				bet.setParameter("isComServId", isComServId);
				bet.setParameter("isComServlastId", isComServlastId);
				
			
				
				ltconfig = bet.setMaxResults(1).list();
			}
				
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
			return ltconfig ;
		
	
	}
	/****
	 * @author   :BILAL
	 * @Date     :27-11-2017
	 * @Code     :For Fetching sponsor slave id 
	 * ****/
	private int subsponsortillTop(int sponsorId, int chargesSlaveId, int hallId,
		int has, int isComServId, int isComServlastId) {
		
			
			List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
			ltSubCharges = fetchSuperCatofchargesSlave(chargesSlaveId);

			if (ltSubCharges.size() > 0) {

				for (int i = 0; i < ltSubCharges.size(); i++) {

					Integer count1 = countofhallandsponsor(sponsorId,
							ltSubCharges.get(i)
							.getSlaveId(), hallId, has, isComServId,
							isComServlastId);
					
					if (count1 > 0) {
						chargesSlaveId = ltSubCharges.get(i).getSlaveId();
						break;
					}

				}

			}
		
	return chargesSlaveId;
  }
	/****
	 * @author   :BILAL
	 * @Date     :27-11-2017
	 * @Code     :For Fetching hall slave id 
	 * ****/
	public int subhallId(int sponsorId,int chargesSlaveId, int hallId, int has, int isComServId,
			int isComServlastId) {

	
			try {
				// getting list of hall
				List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
				ltSubCharges = fetchSuperCatofchargesSlave(has);

				if (ltSubCharges.size() > 0) {

					for (int i = 0; i < ltSubCharges.size(); i++) {
						if (chargesSlaveId > 0) {
							chargesSlaveId=	subsponsortillTop( sponsorId,  chargesSlaveId,  hallId,
									ltSubCharges.get(i).getSlaveId(),  isComServId,  isComServlastId);
						}
						
						
						Integer count1 = countofhallandsponsor(sponsorId,
								chargesSlaveId, hallId, ltSubCharges.get(i)
										.getSlaveId(), isComServId,
								isComServlastId);
						if (count1 > 0) {
							has = ltSubCharges.get(i).getSlaveId();
							break;
						}

					}

				}
				return has;
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.getMessage();
				return 0;
			}
		
	
		
    }
	/***@author     :BILAL
	 * @Date        :18-10-2017
	 * @Code        :For getting list of super id's using store procedure****/
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> fetchSuperCatofchargesSlave(
			Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		
		//Calling stored procedure
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				"CALL  fetchSuperCatogoires (:chargesMasterDto)")
				.setParameter("chargesMasterDto", chargesMasterDto);
				String result =(String) query.uniqueResult();
				if (result != null) {
					String[] ary = result.split(",");
					
					//converting string object into Integer
					List<Integer> ae =  new ArrayList<Integer>();
					for (int i = 0; i < ary.length; i++) {
						ae.add(Integer.parseInt(ary[i]));
					}
		
					//First checking the Length should be greater then zero
					if (ary.length>0) {
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterSlave.class);
						//criteria.addOrder(Order.desc("subId"));
						criteria.add(Restrictions.in("slaveId", ae));
						ltSubCharges = criteria.list();
						System.err.println("Size of list"+ltSubCharges.size());
					}
				} 
				
				
	return ltSubCharges;
	}
	
	/***@Author    :BILAL
	 * @Date       :19-10-2017
	 * @Code       :For getting count from configuration table***/
	public int countofhallandsponsor(Integer sponsorId,Integer chargesSlaveId,Integer hallId,Integer hallSlaveId,Integer isComServId,
			Integer isComServlastId) {
		Integer count=0;
		try {
			Query countquery = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId  ");
			
			countquery.setParameter("sponsorId", sponsorId);
			countquery.setParameter("chargesSlaveId", chargesSlaveId);
			
			countquery.setParameter("hallId", hallId);
			countquery.setParameter("hallSlaveId", hallSlaveId);
			
			countquery.setParameter("isComServId", isComServId);
			countquery.setParameter("isComServlastId", isComServlastId);
			
			
		    count = ((Number) countquery.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;
		
	}
	/******
	 * @author     :BILAL
	 * @Date       :24-01-2018
	 * @Code       :For Save   Year wise configuration 
	 * *********/
	@Override
	public List<YearWiseConfigureDto> saveandupdateYearWise(HttpServletRequest request,
			String configurationlist,
			YearWiseConfigureDto yearWiseConfigureDto, String queryType, Date fromDate, Date toDate) {
		
		//return list to show user the following sub service is already configured.
		List<YearWiseConfigureDto> listYear =new  ArrayList<YearWiseConfigureDto>();
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			// converting J-son list in java object
			YearWiseConfigureDto yearWiseConfigureDto2 = new YearWiseConfigureDto();
			yearWiseConfigureDto2 = (YearWiseConfigureDto) ConfigUIJSONUtility
					.getObjectFromJSON(configurationlist,
							YearWiseConfigureDto.class);
			
			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(YearWiseConfigureDto.class);
			criteriaMax.setProjection(Projections.max("countDate"));
			Integer maxcount = (Integer)criteriaMax.uniqueResult();
			if (maxcount == null ) {
				maxcount =0;
			}
			maxcount = maxcount + 1;
			// To Insert Record if query type is insert
			if (queryType.equalsIgnoreCase("insert")) {

				

				for (YearWiseConfigureDto yerwise : yearWiseConfigureDto2
						.getLstyearwise()) {

					
					Query q = sessionFactory.getCurrentSession().createSQLQuery(
		                    "SELECT count(*) as count, ifnull( id, 0) as config_id, ifnull(charges,0) as old_charges FROM ehat_configyearwise where deleted='N' and service_id="
				                     +yerwise.getServiceId()+" and ( fromDate between  '"+ fromDate +"' and '" + toDate 
				                     +"' || toDate between  '"+ fromDate +"' and '" + toDate + "' ) ");

					double charges =0.0;
			        int    count  =0;
			        int    configid=0;
			        
					@SuppressWarnings("unchecked")
					List<Object[]> rows = q.list();
					for (Object[] row : rows) {
						count      = Integer.parseInt(row[0].toString());
						configid   = Integer.parseInt(row[1].toString());
						charges    = Double.parseDouble(row[2].toString());
						
					}
			        
					
					yerwise.setCreatedBy(userId);
					yerwise.setUnitId(unitId);

					yerwise.setDeleted("N");
					yerwise.setCreatedDate(new Date(new java.util.Date()
							.getTime()));

					yerwise.setIscombination("N");
					yerwise.setMasterId(yearWiseConfigureDto.getMasterId());
					yerwise.setHallCharges(yearWiseConfigureDto
							.getHallCharges());
					yerwise.setMedicalCharges(yearWiseConfigureDto
							.getMedicalCharges());
					yerwise.setOperator(yearWiseConfigureDto.getOperator());
					yerwise.setNumber(yearWiseConfigureDto.getNumber());
					yerwise.setIncreaseordecrease(yearWiseConfigureDto
							.getIncreaseordecrease());
					yerwise.setDistribute(yearWiseConfigureDto.getDistribute());
					yerwise.setFromDate(fromDate);
					yerwise.setToDate(toDate);
					yerwise.setDepartMentID(yearWiseConfigureDto
							.getDepartMentID());
					yerwise.setTotalcharges(yearWiseConfigureDto
							.getTotalcharges());
					yerwise.setServiceLastId(yearWiseConfigureDto
							.getServiceLastId());
					yerwise.setCountDate(maxcount);
					
					if(count==0){
						sessionFactory.getCurrentSession().merge(yerwise);
						
					}else{
						SubServiceDto obje = (SubServiceDto) sessionFactory
								.getCurrentSession().get(
										SubServiceDto.class,
										yerwise.getServiceId());
						yerwise.setServiceName(obje.getCategoryName());
						yerwise.setOldCharges(charges);
						yerwise.setConfigId(configid);
						listYear.add(yerwise);
					}
					

				}
			} else {// To Update Record delete from

				for (YearWiseConfigureDto yerwise : yearWiseConfigureDto2
						.getLstyearwise()) {
						
					
						if (yerwise.getConfigId() > 0) {
							YearWiseConfigureDto yerwiseUpdate = (YearWiseConfigureDto) sessionFactory
									.getCurrentSession().get(
											YearWiseConfigureDto.class,
											yerwise.getConfigId());
							
							
							yerwiseUpdate.setCreatedBy(userId);
							yerwiseUpdate.setUnitId(unitId);

							yerwiseUpdate.setDeleted("N");
							yerwiseUpdate.setCreatedDate(new Date(new java.util.Date()
									.getTime()));

							
							yerwiseUpdate.setIscombination("N");
							yerwiseUpdate.setMasterId(yearWiseConfigureDto.getMasterId());
							yerwiseUpdate.setHallCharges(yearWiseConfigureDto
									.getHallCharges());
							yerwiseUpdate.setMedicalCharges(yearWiseConfigureDto
									.getMedicalCharges());
							yerwiseUpdate.setOperator(yearWiseConfigureDto.getOperator());
							yerwiseUpdate.setNumber(yearWiseConfigureDto.getNumber());
							yerwiseUpdate.setIncreaseordecrease(yearWiseConfigureDto
									.getIncreaseordecrease());
							yerwiseUpdate.setDistribute(yearWiseConfigureDto.getDistribute());
							yerwiseUpdate.setFromDate(fromDate);
							yerwiseUpdate.setToDate(toDate);
							yerwiseUpdate.setDepartMentID(yearWiseConfigureDto
									.getDepartMentID());
							yerwiseUpdate.setTotalcharges(yearWiseConfigureDto
									.getTotalcharges());
							yerwiseUpdate.setServiceLastId(yearWiseConfigureDto
									.getServiceLastId());
							yerwiseUpdate.setCharges(yerwise.getCharges());
							yerwiseUpdate.setServiceId(yerwise.getServiceId());
							
						}else{
							
							/*Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count, ifnull( id, 0) as config_id, ifnull(charges,0) as old_charges FROM ehat_configyearwise where deleted='N' and service_id="
						                     +yerwise.getServiceId()+" and ( fromDate between  '"+ fromDate +"' and '" + toDate 
						                     +"' || toDate between  '"+ fromDate +"' and '" + toDate + "' ) ");

							
					        double charges =0.0;
					        int    count  =0;
					        int    configid=0;
					        
							@SuppressWarnings("unchecked")
							List<Object[]> rows = q.list();
							for (Object[] row : rows) {
								count      = Integer.parseInt(row[0].toString());
								configid   = Integer.parseInt(row[1].toString());
								charges    = Double.parseDouble(row[2].toString());
								
							}*/
							yerwise.setCreatedBy(userId);
							yerwise.setUnitId(unitId);

							yerwise.setDeleted("N");
							yerwise.setCreatedDate(new Date(new java.util.Date()
									.getTime()));

							
							yerwise.setIscombination("N");
							yerwise.setMasterId(yearWiseConfigureDto.getMasterId());
							yerwise.setHallCharges(yearWiseConfigureDto
									.getHallCharges());
							yerwise.setMedicalCharges(yearWiseConfigureDto
									.getMedicalCharges());
							yerwise.setOperator(yearWiseConfigureDto.getOperator());
							yerwise.setNumber(yearWiseConfigureDto.getNumber());
							yerwise.setIncreaseordecrease(yearWiseConfigureDto
									.getIncreaseordecrease());
							yerwise.setDistribute(yearWiseConfigureDto.getDistribute());
							yerwise.setFromDate(fromDate);
							yerwise.setToDate(toDate);
							yerwise.setDepartMentID(yearWiseConfigureDto
									.getDepartMentID());
							yerwise.setTotalcharges(yearWiseConfigureDto
									.getTotalcharges());
							yerwise.setServiceLastId(yearWiseConfigureDto
									.getServiceLastId());
							
							yerwise.setCountDate(yearWiseConfigureDto.getCountDate());
							//if(count==0){
								sessionFactory.getCurrentSession().merge(yerwise);
							/*}else{
								SubServiceDto obje = (SubServiceDto) sessionFactory
										.getCurrentSession().get(
												SubServiceDto.class,
												yerwise.getServiceId());
								yerwise.setServiceName(obje.getCategoryName());
								yerwise.setOldCharges(charges);
								yerwise.setConfigId(configid);
								listYear.add(yerwise);
							}*/
							
						}
						
					

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return listYear;
		}
		return listYear;
	}
	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For Save or override  Year wise configuration 
	 * *********/
	@Override
	public int overrideYearWise(String configurationlist,
			HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			// converting J-son list in java object
			YearWiseConfigureDto yearWiseConfigureDto2 = new YearWiseConfigureDto();
			yearWiseConfigureDto2 = (YearWiseConfigureDto) ConfigUIJSONUtility
					.getObjectFromJSON(configurationlist,
							YearWiseConfigureDto.class);

			for (YearWiseConfigureDto yerwise : yearWiseConfigureDto2
					.getLstyearwise()) {

				int configid = yerwise.getConfigId();
				if (configid > 0) {

					YearWiseConfigureDto obj = (YearWiseConfigureDto) sessionFactory
							.getCurrentSession().get(
									YearWiseConfigureDto.class, configid);
					obj.setCharges(yerwise.getCharges());
					obj.setServiceId(yerwise.getServiceId());
					obj.setOperator(yerwise.getOperator());
					obj.setNumber(yerwise.getNumber());
					obj.setDepartMentID(yerwise.getDepartMentID());
					obj.setDistribute(yerwise.getDistribute());
					obj.setHallCharges(yerwise.getHallCharges());
					obj.setIncreaseordecrease(yerwise.getIncreaseordecrease());
					obj.setMasterId(yerwise.getMasterId());
					obj.setMedicalCharges(yerwise.getMedicalCharges());
					obj.setFromDate(yerwise.getFromDate());
					obj.setToDate(yerwise.getToDate());
					obj.setTotalcharges(yerwise.getTotalcharges());
					obj.setServiceLastId(yerwise.getServiceLastId());

					obj.setUpdatedBy(userId);
					obj.setUnitId(unitId);
					obj.setDeleted("N");
					obj.setUpdatedDate(new Date(new java.util.Date().getTime()));
					obj.setIscombination("N");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For getting list of year wise 
	 * *********/
	@SuppressWarnings("unchecked")
	@Override
	public List<YearWiseConfigureDto> getYearWisedata() {
		
		List<YearWiseConfigureDto> ltyear = null;
		try {
			
			
			Query bet = sessionFactory.getCurrentSession().createQuery
					("FROM YearWiseConfigureDto WHERE deleted='N'  group by countDate");
			
			ltyear=bet.list();
			

		} catch (Exception e) {
			e.printStackTrace();
			return ltyear;
		}
		return ltyear;
	}
	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For edit year wise configuration 
	 * *********/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationYearView> editYearWise(int countDate) {
		
		List<ConfigurationYearView> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationYearView.class);
			/*criteria.addOrder(Order.desc("idConfigurations"));*/
			
			criteria.add(Restrictions.eq("countDate", countDate));
				
			criteria.add(Restrictions.eq("deleted", "N"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For delete year wise configuration 
	 * *********/
	@Override
	public boolean deleteYearWise(int countDate, HttpServletRequest request) {
		
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
		
         	Query alfa = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_configyearwise set deleted = 'Y', deleted_by="+userId+
							" , deleted_date_time= now()" +
							" where count_date="+countDate);
									
			alfa.executeUpdate();
			
			
		} catch (Exception e) {

			e.printStackTrace();
			return false;
		}
		return true;
	}
	/******
	 * @author     :BILAL
	 * @Date       :31-01-2018
	 * @Code       :For getting data date wise  
	 * *********/
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationYearView> getDataWithDate(Date fromDate,
			Date toDate) {
		
		List<ConfigurationYearView> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationYearView.class);
		
			criteria.add(Restrictions.eq("fromDate", fromDate));
			criteria.add(Restrictions.eq("toDate", toDate));
				
			criteria.add(Restrictions.eq("deleted", "N"));
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	/******
	 * @author     :BILAL
	 * @Date       :12-03-2018
	 * @Code       :For saving configuration data by excel of sponsor
	 * *********/
	@SuppressWarnings("unused")
	@Override
	public int importSponsor(String file, HttpServletRequest request) {
		    
		    List<SubServiceDto> listsub =new  ArrayList<SubServiceDto>();
		  
			String filePath = file;
			int res =0;
			try {
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId =(Integer) session.getAttribute("uId");
				
				InputStream ExcelFileToRead = new FileInputStream(filePath);
				XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
				
				XSSFSheet sheet = wb.getSheetAt(0);
			    XSSFRow row;
				XSSFCell cell;

				@SuppressWarnings("rawtypes")
				Iterator rows = sheet.rowIterator();
				if (rows.hasNext())
					rows.next();
				
				while (rows.hasNext()) {
				   row = (XSSFRow) rows.next();

					@SuppressWarnings("rawtypes")
					Iterator cells = row.cellIterator();
					XSSFCell sponsorname = null;
					XSSFCell sponsorslavename = null;
					XSSFCell  subserviceName= null;
					XSSFCell  charges= null;
					XSSFCell  codenamech= null;
			
					String sponsorName      = row.getCell(0).toString().trim();
					String sponsorslaveName = row.getCell(1).toString().trim();
					subserviceName = row.getCell(2);
					String categoryName =row.getCell(2).toString().trim();
					charges = row.getCell(3);
					codenamech = row.getCell(4);
				    
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
					String date = dateFormat.format(new java.util.Date());
					
				try {
					if (row.getCell(0) != null && row.getCell(2) != null) {
						int hallid   =0;
						int hallslaveid =0;
						int isComServId =0;
						int isComServlastId =0;
						int zeronum =0;
						
						//getting sponsor id 
						int chargesId    = sponsorid;
						
						//getting sponsor leaf id 
						int chargesSlavId = getmaxIdOfColumn("id",
								"ehat_charges_master_slave", "category_name",
								sponsorslaveName);
						
						//getting sub service id 
						int subserviceId =  getmaxIdOfColumn("id",
								"ehat_subservice", "category_name",
								categoryName);
						
						if (subserviceId > 0) {
						
							Query q = sessionFactory.getCurrentSession().createSQLQuery(
					                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' and service_id="
					                     +subserviceId+" and charges_id="+chargesId+" and chargesSlave_id="
					                     +chargesSlavId+" and hall_id="+hallid+" and hallSlave_id="+hallslaveid+" and is_com_servId="
					                     +isComServId+" and is_com_servlastId="+isComServlastId );
			
					        Integer count = ((Number) q.uniqueResult()).intValue();
						      
					          if (count == 0) {

									String query =

									"insert into ehat_configuration_services (charges,charges_id,chargesSlave_id,created_by,created_date_time,deleted,service_id,unit_id,hall_id,hallSlave_id,is_com_servId,is_com_servlastId,codenamech,distribute,master_id,number,operator) values('"
											+ charges
											+ "' , '"
											+ chargesId
											+ "', '"
											+ chargesSlavId
											+ "', '"
											+ userId
											+ "', '"
											+ date
											+ "', '"
											+ 'N' 
											+ "', '" 
											+ subserviceId
											
											+ "', '" 
											+ unitId
											
											+ "', '" 
											+ hallid
											
											+ "', '" 
											+ hallslaveid
											
											+ "', '" 
											+ isComServId
											
											+ "', '" 
											+ isComServlastId
											
											+ "', '" 
											+ codenamech
											
											+ "', '" 
											+ zeronum
											
											+ "', '" 
											+ zeronum
											
											+ "', '" 
											+ zeronum
											
											+ "', '" 
											+ zeronum

											+ "')";
									SQLQuery queryservice = sessionFactory
											.getCurrentSession().createSQLQuery(
													query);
									queryservice.executeUpdate();

								
							  }
					          
						} else {
							
							SubServiceDto obj=new SubServiceDto();
							obj.setCategoryName(categoryName);
							listsub.add(obj);
						}
					}
		 
				} catch (Exception e) {
					    res =0;
						e.printStackTrace();
				}

				}
				res =1;
			} catch (Exception e) {
				res =0;
				e.printStackTrace();
			}
			return res;
		}
	
	/******
	 * @author    :BILAL
	 * @Date      :02-02-2018
	 * @Code      :For getting primary of column from any table dynamically  
	 * ******/
	public int getmaxIdOfColumn(String idname, String tableName,
			 String columnName, String columnValue) {
		
		
		Integer anyId =0;
		try {
			String queryser = "SELECT max("+idname+") FROM "+tableName+" where deleted='N' and "+columnName+"='"
					+ columnValue + "'";

			SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
					queryser);

			anyId = (Integer) queryservice
					.uniqueResult();
			if (anyId == null) {
				anyId =0;
			}
		} catch (Exception e) {
			
			anyId=0;
			e.printStackTrace();
		}
		
		return anyId;
	}
	/******
	 * @author     :BILAL
	 * @Date       :12-03-2018
	 * @Code       :For saving configuration data by excel of hall
	 * *********/
	@SuppressWarnings("unused")
	@Override
	public int importhall(String file, HttpServletRequest request) {
	    
	    List<SubServiceDto> listsub =new  ArrayList<SubServiceDto>();
	  
		String filePath = file;
		int res =0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			InputStream ExcelFileToRead = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
			
			XSSFSheet sheet = wb.getSheetAt(0);
		    XSSFRow row;
			XSSFCell cell;

			@SuppressWarnings("rawtypes")
			Iterator rows = sheet.rowIterator();
			if (rows.hasNext())
				rows.next();
			
			while (rows.hasNext()) {
			   row = (XSSFRow) rows.next();

				@SuppressWarnings("rawtypes")
				Iterator cells = row.cellIterator();
				XSSFCell sponsorname = null;
				XSSFCell sponsorslavename = null;
				XSSFCell  subserviceName= null;
				XSSFCell  charges= null;
				XSSFCell  codenamech= null;
		
				String hallName      = row.getCell(0).toString().trim();
				String hallslaveName = row.getCell(1).toString().trim();
				subserviceName = row.getCell(2);
				String categoryName =row.getCell(2).toString().trim();
				charges = row.getCell(3);
				codenamech = row.getCell(4);
			    
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String date = dateFormat.format(new java.util.Date());
				
			try {
				if (row.getCell(0) != null && row.getCell(2) != null) {
					
					int isComServId =0;
					int isComServlastId =0;
					int zeronum =0;
					int chargesId =0;
					int chargesSlavId=0;
					
					//getting hall id 
					int hallid    = hallIdEhat;
					
					//getting hall leaf id 
					int hallslaveid = getmaxIdOfColumn("id",
							"ehat_charges_master_slave", "category_name",
							hallslaveName);
					
					//getting sub service id 
					int subserviceId =  getmaxIdOfColumn("id",
							"ehat_subservice", "category_name",
							categoryName);
					
					if (subserviceId > 0) {
					
						Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' and service_id="
				                     +subserviceId+" and charges_id="+chargesId+" and chargesSlave_id="
				                     +chargesSlavId+" and hall_id="+hallid+" and hallSlave_id="+hallslaveid+" and is_com_servId="
				                     +isComServId+" and is_com_servlastId="+isComServlastId );
		
				        Integer count = ((Number) q.uniqueResult()).intValue();
					      
				          if (count == 0) {

								String query =

								"insert into ehat_configuration_services (charges,charges_id,chargesSlave_id,created_by,created_date_time,deleted,service_id,unit_id,hall_id,hallSlave_id,is_com_servId,is_com_servlastId,codenamech,distribute,master_id,number,operator) values('"
										+ charges
										+ "' , '"
										+ chargesId
										+ "', '"
										+ chargesSlavId
										+ "', '"
										+ userId
										+ "', '"
										+ date
										+ "', '"
										+ 'N' 
										+ "', '" 
										+ subserviceId
										
										+ "', '" 
										+ unitId
										
										+ "', '" 
										+ hallid
										
										+ "', '" 
										+ hallslaveid
										
										+ "', '" 
										+ isComServId
										
										+ "', '" 
										+ isComServlastId
										
										+ "', '" 
										+ codenamech
										
										+ "', '" 
										+ zeronum
										
										+ "', '" 
										+ zeronum
										
										+ "', '" 
										+ zeronum
										
										+ "', '" 
										+ zeronum

										+ "')";
								SQLQuery queryservice = sessionFactory
										.getCurrentSession().createSQLQuery(
												query);
								queryservice.executeUpdate();

							
						  }
				          
					} else {
						
						SubServiceDto obj=new SubServiceDto();
						obj.setCategoryName(categoryName);
						listsub.add(obj);
					}
				}
	 
			} catch (Exception e) {
				    res =0;
					e.printStackTrace();
			}

			}
			res =1;
		} catch (Exception e) {
			res =0;
			e.printStackTrace();
		}
		return res;
	}
	
	/***********
	 * @author	: Vinod Udawant
	 * @date	: 08-05-2019
	 * @base	: For Import Configuration excel dynamically 
	 ***********/
	@SuppressWarnings("unused")
	@Override
	public int importConfiguration(String file,HttpServletRequest request) {
	    
	    List<ConfigurServicesDto> listsub =new  ArrayList<ConfigurServicesDto>();
	  
		String filePath = file;
		int res =0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			InputStream ExcelFileToRead = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
			
			XSSFSheet sheet = wb.getSheetAt(0);
		    XSSFRow row;
			XSSFCell cell;

			@SuppressWarnings("rawtypes")
			Iterator rows = sheet.rowIterator();
			if (rows.hasNext())
				rows.next();
			
			while (rows.hasNext()) {
			
				row = (XSSFRow) rows.next();

				@SuppressWarnings("rawtypes")
				Iterator cells = row.cellIterator();
							
				XSSFCell chargesX = row.getCell(0);
				XSSFCell chargesIdX = row.getCell(1);	
				XSSFCell chargesSlaveIdX = row.getCell(2);												
				XSSFCell serviceIdX = row.getCell(3);																							
				XSSFCell hallIdX = row.getCell(4);		
				XSSFCell hallSlaveIdX = row.getCell(5);		
				XSSFCell hallChargesX = row.getCell(6);		
				XSSFCell medicalTeamChargesX = row.getCell(7);												
				XSSFCell totalChargesX = row.getCell(8);		
				XSSFCell isComServIdX = row.getCell(9);	
				XSSFCell isComServlastIdX = row.getCell(10);	
				XSSFCell serviceLastIdX = row.getCell(11);	
				XSSFCell iscombinationX = row.getCell(12);	
				XSSFCell iscatHallX = row.getCell(13);	
				XSSFCell selfidX = row.getCell(14);	
				XSSFCell codenamechX = row.getCell(15);
		
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String date = dateFormat.format(new java.util.Date());
				
				try {
					if (row.getCell(0) != null && row.getCell(2) != null) {
						
						double charges = Double.parseDouble(chargesX.toString());
						int chargesId = (int) Double.parseDouble(chargesIdX.toString());	
						int chargesSlaveId = (int) Double.parseDouble(chargesSlaveIdX.toString());												
						int serviceId = (int) Double.parseDouble(serviceIdX.toString());																							
						int hallId = (int) Double.parseDouble(hallIdX.toString());		
						int hallSlaveId = (int) Double.parseDouble(hallSlaveIdX.toString());		
						int departmentId = 0;
						int hallCharges = (int) Double.parseDouble(hallChargesX.toString());		
						int medicalTeamCharges = (int) Double.parseDouble(medicalTeamChargesX.toString());												
						double totalCharges = Double.parseDouble(totalChargesX.toString());		
						int isComServId = (int) Double.parseDouble(isComServIdX.toString());	
						int isComServlastId = (int) Double.parseDouble(isComServlastIdX.toString());	
						int serviceLastId = (int) Double.parseDouble(serviceLastIdX.toString());	
						String iscombination = iscombinationX.toString();	
						String iscatHall = iscatHallX.toString();	
						int selfid = (int) Double.parseDouble(selfidX.toString());	
						String codenamech = codenamechX.toString();
						
						String query = "insert into ehat_configuration_services (charges,charges_id,chargesSlave_id,created_by,created_date_time,service_id,unit_id,hall_id,hallSlave_id,department_id," 
									  + "hall_charges,is_com_servId,medical_team_charges,totalcharges,is_com_servlastId,serviceLastId,iscombination,iscat_hall,selfid,codenamech,deleted) values" 
									  + "("+ charges +","+ chargesId +","+ chargesSlaveId + ","+ userId + ",'"+ date + "',"+ serviceId + ","+ unitId + ","+ hallId + ","+ hallSlaveId + ","+ departmentId + ","
									  + " "+ hallCharges +","+ isComServId +","+ medicalTeamCharges + ","+ totalCharges + ","+ isComServlastId + ","+ serviceLastId + ",'"+ iscombination + "','"+ iscatHall + "',"+ selfid + ","+ codenamech + ",'N')";
						SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(query);
						queryservice.executeUpdate();									 
					}
		 
				} catch (Exception e) {
				    res =0;
					e.printStackTrace();
				}
			}
			res =1;
		} catch (Exception e) {
			res =0;
			e.printStackTrace();
		}
		return res;
	}
	
	/**
	 * @author Rohini Ambhore
	 * @date 17_jan_2024
	 ***/
	
	@Override
	public int saveOrUpdateRegistrationConfigCharges(ConfigurRegistrationServicesDto configurServicesDto,
			HttpServletRequest request, Integer configId, String queryType, Integer chargesId, Integer chargesSlaveId,
			Integer masterId, Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges,
			Integer isComServId, Integer isComServlastId, double opdCharges, double ipdCharges, double diagCharges) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			//converting J-son list in java object 
			/*configurServicesDto = (ConfigurServicesDto) ConfigUIJSONUtility
					.getObjectFromJSON(configurationlist,
							ConfigurServicesDto.class);*/
       	
			// To Insert Record if query type is insert
				if (queryType.equalsIgnoreCase("insert")) { 
					
					//Update ConfigurServicesDto set deleted = 'Y'
					Query update = sessionFactory
							.getCurrentSession()
							.createQuery(
									//"delete from ConfigurRegistrationServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId and isComServId= :isComServId and isComServlastId= :isComServlastId");
									"delete from ConfigurRegistrationServicesDto where chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId ");

					//update.setParameter("chargesId", chargesId);
					update.setParameter("chargesSlaveId", chargesSlaveId);

					update.setParameter("hallId", hallId);
					update.setParameter("hallSlaveId", hallSlaveId);

					//update.setParameter("isComServId", isComServId);
					//update.setParameter("isComServlastId", isComServlastId);

					update.executeUpdate();
					
				//	for (ConfigurRegistrationServicesDto configurServicesDto2 : configurServicesDto.getLstConfigurService()) {
						
						ConfigurRegistrationServicesDto configurServicesDto2 = new ConfigurRegistrationServicesDto();
						
						      configurServicesDto2.setCreatedBy(userId);
								configurServicesDto2.setUnitId(unitId);
								configurServicesDto2.setCreatedBy(configurServicesDto2.getCreatedBy());

								configurServicesDto2.setDeleted("N");
								configurServicesDto2.setCreatedDate(new Date(new java.util.Date().getTime()));
								configurServicesDto2.setMasterId(masterId);
								configurServicesDto2.setHallId(hallId);
								configurServicesDto2.setHallSlaveId(hallSlaveId);
								configurServicesDto2.setHallCharges(hallCharges);
								//configurServicesDto2.setMedicalCharges(medicalCharges);
								configurServicesDto2.setIsoHallCharges(configurServicesDto.getIsoHallCharges());
								//configurServicesDto2.setIsoMedicalCharges(configurServicesDto.getIsoMedicalCharges());
								configurServicesDto2.setChargesSlaveId(chargesSlaveId);
								configurServicesDto2.setOpdCharges(opdCharges);
								configurServicesDto2.setIpdCharges(ipdCharges);
								configurServicesDto2.setDiagCharges(diagCharges);
							
								/*SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,configurServicesDto2.getServiceId());
								configurServicesDto2.setIscombination(obje.getIscombination());*/
								
								
								sessionFactory.getCurrentSession().merge(
										configurServicesDto2);
								//for changing package amount in sub service
								/*if (chargesId ==0 && chargesSlaveId ==0 && hallId ==0 && hallSlaveId ==0 && isComServId > 0 && isComServlastId >0) {
									 savetotalinsubservice(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,
											 isComServlastId,configurServicesDto2.getTotalcharges());
								}*/
						 //}
						
					//}
				} else {// To Update Record  delete from
					
				Query update = sessionFactory
						.getCurrentSession()
						.createQuery(
								//"delete from ConfigurRegistrationServicesDto where chargesId= :chargesId  and chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId and isComServId= :isComServId and isComServlastId= :isComServlastId");
								"delete from ConfigurRegistrationServicesDto where  chargesSlaveId= :chargesSlaveId and hallId= :hallId and hallSlaveId= :hallSlaveId ");
				//update.setParameter("chargesId", chargesId);
				update.setParameter("chargesSlaveId", chargesSlaveId);

				update.setParameter("hallId", hallId);
				update.setParameter("hallSlaveId", hallSlaveId);

				//update.setParameter("isComServId", isComServId);
				//update.setParameter("isComServlastId", isComServlastId);

				update.executeUpdate();
				
					//for (ConfigurRegistrationServicesDto configurServicesDto2 : configurServicesDto	.getLstConfigurService()) {
				ConfigurRegistrationServicesDto configurServicesDto2 = new ConfigurRegistrationServicesDto();
							 configurServicesDto2.setCreatedBy(userId);
								configurServicesDto2.setUnitId(unitId);
								configurServicesDto2.setCreatedBy(configurServicesDto2
										.getCreatedBy());

								configurServicesDto2.setDeleted("N");
								configurServicesDto2.setCreatedDate(new Date(
										new java.util.Date().getTime()));
								configurServicesDto2.setMasterId(masterId);
								configurServicesDto2.setHallId(hallId);
								configurServicesDto2.setHallSlaveId(hallSlaveId);
								configurServicesDto2.setHallCharges(hallCharges);
								//configurServicesDto2.setMedicalCharges(medicalCharges);
								configurServicesDto2.setIsoHallCharges(configurServicesDto.getIsoHallCharges());
								//configurServicesDto2.setIsoMedicalCharges(configurServicesDto.getIsoMedicalCharges());
								
								configurServicesDto2.setChargesSlaveId(chargesSlaveId);
								configurServicesDto2.setOpdCharges(opdCharges);
								configurServicesDto2.setIpdCharges(ipdCharges);
								configurServicesDto2.setDiagCharges(diagCharges);
								
								//SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,configurServicesDto2.getServiceId());
												
								sessionFactory.getCurrentSession().merge(
										configurServicesDto2);
								
					// }
				}
			

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ConfigurationRegistrationChargesViewDto> getConfigurationRegistrationChargeList() {
		
		List<ConfigurationRegistrationChargesViewDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ConfigurationRegistrationChargesViewDto.class);
			
			lstConfigurations = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	@Override
	public List<ConfigurRegistrationServicesDto> getupdateConfigurationRegCharge(Integer chargesId,
			Integer chargesSlaveId, Integer hallId, Integer hallSlaveId) {
		List<ConfigurRegistrationServicesDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ConfigurRegistrationServicesDto.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("configId",chargesId));
			
			criteria.addOrder(Order.desc("configId"));
			// criteria.setMaxResults(10);
			//criteria.add(Restrictions.like("chargesName", letter + "%"));
			criteria.setMaxResults(10);
			lstConfigurations = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}
	
	//Added By Badrinath For Combination Services Count
	public Integer getCombinationCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_config_combination_view" ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//@Override
	//Added By Badrinath For Sponsor Services Count
	public Integer getSponsorCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_config_sponsor_view" ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//Added By Badrinath For Sponsor Services Count for search
//	@Override
	public Integer getSponCntSearch(String letter,Integer startIndex) {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_config_sponsor_view where sponsor_name LIKE '%" + letter + "%' OR sponsor_slave_name LIKE '%" + letter + "%' " ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//Added By Badrinath For Combination Services Count for search
   //@Override
	public Integer getComCntSearch(String letter) {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_config_combination_view where combination_name LIKE '%" + letter + "%' OR com_slave_name LIKE '%" + letter + "%' " ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
