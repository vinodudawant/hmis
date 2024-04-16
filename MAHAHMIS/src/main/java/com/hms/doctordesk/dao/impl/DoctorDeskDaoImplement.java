package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctorDeskDaoInterface;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.VitalMaster;
import com.hms.pharmacy.pojo.PreparationMaster;

@Repository
public class DoctorDeskDaoImplement implements DoctorDeskDaoInterface {

	@Autowired
	SessionFactory sessionfactory; 
	static Logger log=Logger.getLogger(DoctorDeskDaoImplement.class.getName());
	
	
	@Override
	public List<PreparationMaster> fetchPreparationMaster() {
		List<PreparationMaster> list=null;
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(PreparationMaster.class);
			criteria.add(Restrictions.eq("preparationDeleteFlag",0));
			list = criteria.list();
		}
		catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return list;
	}


	@Override
	public Integer saveRouteMaster(RouteMaster routemaster) {
		Session session = sessionfactory.getCurrentSession();
		try {
			
		  Criteria criteria =
		  sessionfactory.getCurrentSession().createCriteria(RouteMaster.class);
			criteria.add(Restrictions.eq("preparation_id", routemaster.getPreparation_id()));
			/*
			 * //Added By Annapurna
			 */		  criteria.add(Restrictions.eq("routename",routemaster.getRoutename()));

		  criteria.setProjection(Projections.rowCount()); Long count = (Long)
		  criteria.uniqueResult();
		 
			 
			if (routemaster.getRoute_id() == 0   ) {
				if (count == 0 ) {
					session.save(routemaster);

					return 1;
				} else {
					return -1;
				}
			} else {
				routemaster.setUpdatedDate(new Date());
				session.merge(routemaster);
				return 2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	@Override
	public List<RouteMaster> fetchRouteMaster(String routename) {
		List<RouteMaster> list=null;
		if(routename == null)
		{
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(RouteMaster.class);
			criteria.add(Restrictions.eq("deleted","N"));
			list = criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		}
		else
		{
			try {
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(RouteMaster.class);
				criteria.add(Restrictions.ilike("routename", routename, MatchMode.ANYWHERE));
				criteria.add(Restrictions.eq("deleted","N"));
				list = criteria.list();
			} catch (Exception e) {
				log.error("Exception--> ",e);
			}
		}
		return list;
	}


	@Override
	public RouteMaster editRouteMaster(Integer id) {
		RouteMaster routemaster=null;
		try {
			
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(RouteMaster.class);
			criteria.add(Restrictions.eq("route_id",id));
			routemaster = (RouteMaster) criteria.uniqueResult();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		
		return routemaster;
	}


	@Override
	public Integer deleteRouteMaster(RouteMaster routeMaster) {
		Session session = sessionfactory.getCurrentSession();
		try {
			RouteMaster routemaster = (RouteMaster) sessionfactory.getCurrentSession().get(RouteMaster.class, routeMaster.getRoute_id());
			routemaster.setDeleted("Y");
			routemaster.setDeletedDate(new Date());
			routemaster.setDeletedBy(routeMaster.getDeletedBy());
			session.merge(routemaster);
			return 1;

		} catch (Exception e) {
			log.error("Exception--> ",e);
		}		
		return 0;
	}


	@Override
	public Integer saveImmunizationConfiguration(ImmunizationConfigurationMaster obj) {
		Session session = sessionfactory.getCurrentSession();
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria.add(Restrictions.eq("vaccine",obj.getVaccine()));
			criteria.setProjection(Projections.rowCount());
			Long count = (Long) criteria.uniqueResult();
			
			if(obj.getImmunizationconfiguration_id() == 0)
			{
				if(count == 0 )
				{
					session.save(obj);
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else
			{
			obj.setUpdatedBy(obj.getCreatedBy());
			obj.setUpdatedDate(new Date());
			session.merge(obj);
			return 2;
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return 0;
	}


	@Override
	public List<ImmunizationConfigurationMaster> fetchImmunizationConfig(String obj) {
		List<ImmunizationConfigurationMaster> list=null;
		try {
			if(obj == null)
			{
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
				criteria.add(Restrictions.eq("deleted","N"));
				list = criteria.list();
			}
			else
			{
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
				criteria.add(Restrictions.ilike("vaccine", obj, MatchMode.ANYWHERE));
				criteria.add(Restrictions.eq("deleted","N"));
				list = criteria.list();
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return list;
	}


	@Override
	public ImmunizationConfigurationMaster editImmunizationConfig(Integer Id) {
		ImmunizationConfigurationMaster immunizationconfigurationmaster=null;
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria.add(Restrictions.eq("immunizationconfiguration_id",Id));
			criteria.add(Restrictions.eq("deleted","N"));
			immunizationconfigurationmaster = (ImmunizationConfigurationMaster) criteria.uniqueResult();
			
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return immunizationconfigurationmaster;
	}


	@Override
	public Integer saveVital(VitalMaster Vitalmaster) {
		Session session = sessionfactory.getCurrentSession();
		try {
			if(Vitalmaster.getVital_id() == 0)
			{
			session.save(Vitalmaster);
			return 1;
			}
			else
			{
				Vitalmaster.setUpdatedBy(Vitalmaster.getCreatedBy());
				Vitalmaster.setUpdatedDate(new Date());
				session.merge(Vitalmaster);
				return 2;
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return 0;
	}


	@Override
	public List<VitalMaster> fetchVital(String str) {
		List<VitalMaster> list=null;
		try {
	
			
			if(str.isEmpty())
			{
				System.out.println("empty");
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(VitalMaster.class);
			criteria.setFirstResult(6);
			criteria.add(Restrictions.eq("deleted","N"));
			list=criteria.list();
			}
			if(str=="onload" || str.equalsIgnoreCase("onload")){
				
				Criteria ct = sessionfactory.getCurrentSession().createCriteria(VitalMaster.class);
				ct.add(Restrictions.eq("deleted", "N"));
				ct.setProjection(Projections.rowCount());
				Integer count = ((Number) ct.uniqueResult()).intValue();
				System.out.println("count" + count);
				List<String> vitalNames = new ArrayList<String>();
				vitalNames.add("Weight (kg)");
				vitalNames.add("Blood Pressure (mmHg)");
				vitalNames.add("Pulse (HeartBeats/min)");
				vitalNames.add("Temperature");
				vitalNames.add("Resp.Rate (Breath/min)");
				if (count <= 0) {
					for (String vital : vitalNames) {
						VitalMaster vitalMaster = new VitalMaster();
						vitalMaster.setVitalname(vital);
						sessionfactory.getCurrentSession().save(vitalMaster);
					}

				}
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(VitalMaster.class);
				criteria.add(Restrictions.eq("deleted","N"));
				criteria.setMaxResults(5);
				list=criteria.list();
			}
			else
			{
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(VitalMaster.class);
				criteria.add(Restrictions.ilike("vitalname", str, MatchMode.ANYWHERE));
				criteria.add(Restrictions.eq("deleted","N"));
				list=criteria.list();
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return list;
	}


	@Override
	public VitalMaster editVital(Integer id) {
		VitalMaster vitalmaster=null;
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(VitalMaster.class);
			criteria.add(Restrictions.eq("vital_id",id));
			criteria.add(Restrictions.eq("deleted","N"));
			vitalmaster=(VitalMaster) criteria.uniqueResult();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return vitalmaster;
	}


	@Override
	public Integer deleteVital(VitalMaster vital) {
		Session session = sessionfactory.getCurrentSession();
		try {
			VitalMaster vitalmaster= (VitalMaster) sessionfactory.getCurrentSession().get(VitalMaster.class, vital.getVital_id());
			vitalmaster.setDeleted("Y");
			vitalmaster.setDeletedDate(new Date());
			vitalmaster.setDeletedBy(vital.getDeletedBy());
			session.merge(vitalmaster);
			return 1;
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return 0;
	}
}
