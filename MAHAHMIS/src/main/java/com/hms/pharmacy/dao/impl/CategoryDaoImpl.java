package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;



import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.pharmacy.dao.CategoryDao;
import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;

@Repository
public class CategoryDaoImpl implements CategoryDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateCategory(CategoryMaster categoryMaster) {
		// TODO Auto-generated method stub
		try {
			Integer catId = categoryMaster.getCatId();
			if(catId==null) {
				catId=0;
			}
			if(catId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM CategoryMaster WHERE catDeleteFlag=0 AND catName= :catName");
				hql.setParameter("catName", categoryMaster.getCatName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(categoryMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(categoryMaster);
				
			}
		
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CategoryMaster> getCategoryMasters() {
		// TODO Auto-generated method stub
		List<CategoryMaster> ltCategoryMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CategoryMaster.class);
			criteria.add(Restrictions.eq("catDeleteFlag", 0));
			criteria.addOrder(Order.desc("catId"));
			criteria.setMaxResults(10);
			ltCategoryMaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCategoryMaster;
		}
		return ltCategoryMaster;
	}

	@Override
	public Boolean deleteCategory(Integer catId) {
		// TODO Auto-generated method stub
		try {
			CategoryMaster categoryMaster = (CategoryMaster) sessionFactory
					.getCurrentSession().get(CategoryMaster.class, catId);
			categoryMaster.setCatDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CategoryMaster> getAutoSuggestionCategoryNames(String letter) {
		// TODO Auto-generated method stub
		List<CategoryMaster> ltCategoerMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CategoryMaster.class);
			criteria.add(Restrictions.eq("catDeleteFlag", 0));
			criteria.add(Restrictions.like("catName", letter,
					MatchMode.ANYWHERE));
			ltCategoerMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCategoerMasters;
		}
		return ltCategoerMasters;
	}

	@Override
	public List<CategoryMaster> getCategoryById(Integer catId) {
		// TODO Auto-generated method stub
		List<CategoryMaster> ltCatagoryMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CategoryMaster.class);
			criteria.add(Restrictions.eq("catDeleteFlag", 0));
			if (catId != 0) {
				criteria.add(Restrictions.eq("catId", catId));
			}

			ltCatagoryMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCatagoryMasters;
		}
		return ltCatagoryMasters;
	}

	@Override
	public CategoryMaster getCategoryByIdForDate(Integer catId) {

		CategoryMaster categoryMaster = new CategoryMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CategoryMaster.class);
			criteria.add(Restrictions.eq("catDeleteFlag", 0));
			if (catId != 0) {
				criteria.add(Restrictions.eq("catId", catId));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("categoryAddDate"));
			criteria.setProjection(proList);

			Date date;
			date = (Date) criteria.uniqueResult();
			categoryMaster.setCategoryAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return categoryMaster;
		}
		return categoryMaster;
	}

	@Override
	public List<CategoryMaster> getAllCategoryList() {
		List<CategoryMaster> ltCategoryMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CategoryMaster.class);
			criteria.add(Restrictions.eq("catDeleteFlag", 0));
			criteria.addOrder(Order.desc("catId"));
			ltCategoryMaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCategoryMaster;
		}
		return ltCategoryMaster;
	}

}
