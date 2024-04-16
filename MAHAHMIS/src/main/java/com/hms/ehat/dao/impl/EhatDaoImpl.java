package com.hms.ehat.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.EhatDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;

@Repository
public class EhatDaoImpl implements EhatDao {

	@Autowired
	SessionFactory sessionFactory;

	/**
	 * @author Bilal @date 16_May_2017 this method is used to save or update
	 *         records in db
	 * **/
	/*@Override
	public Boolean saveOrUpdateCharges(ChargesMasterDto chargesMaster) {
		try {
			sessionFactory.getCurrentSession().merge(chargesMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to get records from db
	 * **//*
	@Override
	public List<ChargesMasterDto> getCharges() {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("chargesId"));
			 criteria.setMaxResults(10); 
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to delete records from
	 *         db
	 * **//*
	@Override
	public Boolean deleteCharges(Integer ChargesId) {

		try {
			ChargesMasterDto chargesMaster = (ChargesMasterDto) sessionFactory
					.getCurrentSession().get(ChargesMasterDto.class, ChargesId);
		//	chargesMaster.setDeletedBy(deletedBy)
			chargesMaster.setDeleted("Y");
			chargesMaster.setDeletedBy(chargesMaster.getDeletedBy());
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to get auto
	 *         suggestions on browser from db
	 **//*
	@Override
	public List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter) {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("chargesName", letter,
					MatchMode.ANYWHERE));
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to get records by id
	 *         from db
	 **//*
	@Override
	public List<ChargesMasterDto> getChargesById(Integer chargesId) {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			if (chargesId != 0) {
				criteria.add(Restrictions.eq("chargesId", chargesId));
			}

			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to get all records
	 *         from db
	 **//*
	@Override
	public List<ChargesMasterDto> getAllCharges() {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("chargesId"));
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 this method is used to get records with
	 *         deleted from db
	 **//*
	@Override
	public List<ChargesMasterDto> getAllChargeswithDeleted() {
		List<ChargesMasterDto> ltChargesMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterDto.class);
			criteria.addOrder(Order.desc("chargesId"));
			ltChargesMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesMasters;
		}
		return ltChargesMasters;
	}*/
	/** End of charges methods ***/
	
	

	/**
	 * @author Sagar @date 16_May_2017 this method is used to save or update
	 *         records in db
	 * **/
	@Override
	public Boolean saveOrUpdateDept(DeptMasterDto deptMaster) {
		// TODO Auto-generated method stub
		try {
			
			sessionFactory.getCurrentSession().merge(deptMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records from db
	 * **/
	@Override
	public List<DeptMasterDto> getDept() {
		// TODO Auto-generated method stub
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));  
			criteria.addOrder(Order.desc("deptId"));
			/*criteria.setMaxResults(10);*/
			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}

	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to delete records from
	 *         db
	 * **/
	@Override
	public Boolean deleteDept(Integer deptId) {
		// TODO Auto-generated method stub
		try {
			DeptMasterDto deptMaster = (DeptMasterDto) sessionFactory
					.getCurrentSession().get(DeptMasterDto.class, deptId);
			deptMaster.setDeleted("Y");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get auto
	 *         suggestions on browser from db
	 **/
	@Override
	public List<DeptMasterDto> getAutoSuggestionDeptNames(String letter) {
		// TODO Auto-generated method stub
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", 'N'));
			criteria.add(Restrictions.like("deptName", letter,
					MatchMode.ANYWHERE));
			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}

	
	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records by id
	 *         from db
	 **/
	 @Override
	public List<DeptMasterDto> getDeptById(Integer deptId) {
		// TODO Auto-generated method stub
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			if (deptId != 0) {
				criteria.add(Restrictions.eq("compId", deptId));
			}

			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}

	
	

	

	/**
	 * @author Sagar @date 16_May_2017 this method is used to get all records
	 *         from db
	 **/
	@Override
	public List<DeptMasterDto> getAllDept() {
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("deptId"));
			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	
	
	/**
	 * @author Sagar @date 16_May_2017 this method is used to get records with
	 *         deleted from db
	 **/
	@Override
	public List<DeptMasterDto> getAllDeptwithDeleted() {
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.addOrder(Order.desc("deptId"));
			ltDeptMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	/** End of Departments methods ***/
	
	
}
