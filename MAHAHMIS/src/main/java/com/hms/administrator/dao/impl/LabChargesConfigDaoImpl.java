package com.hms.administrator.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.LabChargesConfigDao;
import com.hms.administrator.dto.LabChargesConfigurationDto;
import com.hms.administrator.dto.LabChargesConfigurationViewDto;
import com.hms.administrator.dto.LabConfigureServicesViewDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class LabChargesConfigDaoImpl implements LabChargesConfigDao {

	@Autowired
	SessionFactory sessionFactory;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);

	String hallIdss    =(String) resourceBundleEhat.getString("hallId");
	Integer hallIdEhat = Integer.parseInt(hallIdss);
	
	String sponsor =(String) resourceBundleEhat.getString("sponsor");
	Integer sponsorid = Integer.parseInt(sponsor);

	@Override
	public List<LabChargesConfigurationViewDto> getConfigurationListFromView(String letter, String callfrom) {
		//added by prayagraj for input search with letter
		List<LabChargesConfigurationViewDto> lstConfigurations = null;
		try {
			
			if(callfrom.equals("search")){
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(LabChargesConfigurationViewDto.class);
				criteria.addOrder(Order.desc("idConfiguration"));
				// criteria.setMaxResults(10);
				criteria.add(Restrictions.like("customerName", letter + "%"));

				criteria.setMaxResults(autoLimit);
				lstConfigurations = criteria.list();
			}
			else{
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabChargesConfigurationViewDto.class);
				lstConfigurations = criteria.list();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return lstConfigurations;
		}
		return lstConfigurations;
	}

	@Override
	public boolean deleteConfigurationList(Integer idConfiguration, Integer chargesId, Integer chargesSlaveId,
			HttpServletRequest request, Integer hallId, Integer hallSlaveId, Integer isComServId,
			Integer isComServlastId) {
		try {
			HttpSession session = request.getSession();
			@SuppressWarnings("unused")
			Integer userId = (Integer) session.getAttribute("userId1");
			
			String sql="update lab_charges_configuration set deleted='Y', deleted_by='"+userId+"' where is_com_servlastId='"+isComServlastId+"' and customer_name='"+idConfiguration+"' ";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<LabConfigureServicesViewDto> getConfigurationListFromViewForSub(Integer chargesId,
			Integer chargesSlaveId, Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId,
			Integer customerType, Integer customerName) {
		List<LabConfigureServicesViewDto> lstConfigurations = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabConfigureServicesViewDto.class);
			criteria.add(Restrictions.eq("customerType", customerType));
			criteria.add(Restrictions.eq("customerName", customerName));
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

	@Override
	public int saveOrUpdateConfigServiceUnitWise(
			LabChargesConfigurationDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			Integer configId, String queryType,
			Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges,
			Integer isComServId, Integer isComServlastId, Integer unitId) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			//Integer unitId =(Integer) session.getAttribute("uId");
			
			//converting J-son list in java object 
			configurServicesDto = (LabChargesConfigurationDto) ConfigUIJSONUtility.getObjectFromJSON(configurationlist,LabChargesConfigurationDto.class);
			
			int custType = configurServicesDto.getLstConfigurService().get(0).getCustType();
			int custName = configurServicesDto.getLstConfigurService().get(0).getCustName();
       	
			// To Insert Record if query type is insert
			if (queryType.equalsIgnoreCase("insert")) { 
				
				//Update ConfigurServicesDto set deleted = 'Y'
				Query update = sessionFactory.getCurrentSession().createQuery("delete from LabChargesConfigurationDto where custType= :custType  and custName= :custName and isComServId= :isComServId  and isComServlastId= :isComServlastId");
				update.setParameter("custType", custType);
				update.setParameter("custName", custName);
				update.setParameter("isComServId", isComServId);
				update.setParameter("isComServlastId", isComServlastId);
				
				update.executeUpdate();
				
				for (LabChargesConfigurationDto configurServicesDto2 : configurServicesDto.getLstConfigurService()) {
					
					configurServicesDto2.setCreatedBy(userId);
					configurServicesDto2.setUnitId(unitId);
					configurServicesDto2.setCreatedBy(configurServicesDto2.getCreatedBy());
					configurServicesDto2.setDeleted("N");
					configurServicesDto2.setCreatedDate(new Date(new java.util.Date().getTime()));
					configurServicesDto2.setMasterId(masterId);
					configurServicesDto2.setHallId(hallId);
					configurServicesDto2.setHallSlaveId(hallSlaveId);
					configurServicesDto2.setHallCharges(hallCharges);
					configurServicesDto2.setMedicalCharges(medicalCharges);
					
					SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,configurServicesDto2.getServiceId());
					configurServicesDto2.setIscombination(obje.getIscombination());								
					sessionFactory.getCurrentSession().merge(configurServicesDto2);								
				}
			} else {// To Update Record  delete from
				
				Query update = sessionFactory.getCurrentSession().createQuery("delete from LabChargesConfigurationDto where custType= :custType  and custName= :custName and isComServId= :isComServId  and isComServlastId= :isComServlastId");
				update.setParameter("custType", custType);
				update.setParameter("custName", custName);
				update.setParameter("isComServId", isComServId);
				update.setParameter("isComServlastId", isComServlastId);
				update.executeUpdate();
				
				for (LabChargesConfigurationDto configurServicesDto2 : configurServicesDto.getLstConfigurService()) {
						
				 	configurServicesDto2.setCreatedBy(userId);
					configurServicesDto2.setUnitId(unitId);
					configurServicesDto2.setCreatedBy(configurServicesDto2.getCreatedBy());

					configurServicesDto2.setDeleted("N");
					configurServicesDto2.setCreatedDate(new Date(new java.util.Date().getTime()));
					configurServicesDto2.setMasterId(masterId);
					configurServicesDto2.setHallId(hallId);
					configurServicesDto2.setHallSlaveId(hallSlaveId);
					configurServicesDto2.setHallCharges(hallCharges);
					configurServicesDto2.setMedicalCharges(medicalCharges);
					
					SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,configurServicesDto2.getServiceId());
					configurServicesDto2.setIscombination(obje.getIscombination());
					sessionFactory.getCurrentSession().merge(configurServicesDto2);
								
				}
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
}
