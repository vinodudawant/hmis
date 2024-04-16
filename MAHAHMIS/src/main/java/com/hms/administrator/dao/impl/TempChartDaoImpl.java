package com.hms.administrator.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.TempChartDao;
import com.hms.administrator.dto.ChartSlave;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class TempChartDaoImpl implements TempChartDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<ChartSlave> fetchdefaultChartView(Integer ctype) {
		List<ChartSlave> list = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChartSlave.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("cType", ctype));
			list = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}

	@Override
	public String deleteChartSlave(String chartslaveid) {
		String msg = "";
		try {
			String[] str = chartslaveid.split(",");
			for (int i = 0; i <= str.length; i++) {
				int id = Integer.parseInt(str[i]);
				ChartSlave chartslave = (ChartSlave) sessionFactory.getCurrentSession().get(ChartSlave.class, id);
				chartslave.setStatus("N");
				msg = "Delete Successfuly";
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return msg;
	}

	@Override
	public Integer saveChartSlaveName(String objcharslave) {
		try {
			Session session = sessionFactory.getCurrentSession();
			ChartSlave chaslave = (ChartSlave) ConfigUIJSONUtility.getObjectFromJSON(objcharslave, ChartSlave.class);
			for (int i = 0; i < chaslave.getListChartType().size(); i++) {
				ChartSlave slave = new ChartSlave();
				slave = chaslave.getListChartType().get(i);
				slave.setStatus("Y");
				if (slave.getIdchartTypeTbl() == 0) {
					session.save(slave);
				} else {
					session.merge(slave);
				}

			}
			return 1;
		} catch (Exception e) {
			e.getMessage();
		}
		return 0;

	}

}
