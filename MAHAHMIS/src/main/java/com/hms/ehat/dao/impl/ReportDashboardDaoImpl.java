package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ehat.dao.ReportDashboardDao;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;



@Repository
public class ReportDashboardDaoImpl implements ReportDashboardDao {

	@Autowired
	SessionFactory sessionFactory;

	Date Start = new Date();
	@SuppressWarnings("deprecation")
	int m = Start.getMonth();
	
	@SuppressWarnings("unchecked")
	@Override
	public List<BillReceiptMasterDTO> getlistOfPackageOpd() {

		List<BillReceiptMasterDTO> listBillNobleServiceDto = new ArrayList<BillReceiptMasterDTO>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillReceiptMasterDTO.class);

			criteria.add(Restrictions.eq("deleted", "N"));

			listBillNobleServiceDto = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return listBillNobleServiceDto;
		}
		return listBillNobleServiceDto;
	}

	/**
	 * @author :Bilal
	 * @date   :22-Aug-2017
	 * @code   :for total amount of opd  overAll Todays and last month
	 ***/
	@Override
	public double getTotalAmountOfOPD(String callfrom, String datecallfrom) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;

		
		try {

			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(BillReceiptMasterDTO.class);
			if (callfrom.equals("total")) {

				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
					

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}
			} else if (callfrom.equals("cridit")) {
				payMode = 2;
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			} else {
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("firstPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
		
	}

	/**
	 * @author :Bilal
	 * @date   :22-Aug-2017
	 * @code   :for total amount of ipd overAll Todays and last month
	 ***/
	@Override
	public double getTotalAmountOfIPD(String callfrom, String datecallfrom) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillReceiptMasterDTO.class);
			if (callfrom.equals("total")) {

				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}
			} else if (callfrom.equals("cridit")) {
				payMode = 2;
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));

					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			} else {
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));

					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :22-Aug-2017
	 * @code   :for Refund amount of opd overAll Today and Lastmonth Data
	 ***/
	@Override
	public double getTotalRefundAmountOfOPD(String callfrom, String datecallfrom) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(BillRefundMasterDTO.class);

			
			if (callfrom.equals("onloadtotal")) {

				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}
			} else if (callfrom.equals("onloadcridit")) {
				payMode = 2;
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));

					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			} else {
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));

					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :22-Aug-2017
	 * @code   :for Refund amount of ipd
	 ***/
	@Override
	public double getTotalRefundAmountOfIPD(String callfrom, String datecallfrom) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillRefundMasterDTO.class);
			
			if (callfrom.equals("onloadtotal")) {

				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}
			} else if (callfrom.equals("onloadcridit")) {
				payMode = 2;
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));

					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.between("payMode", payMode,
							payMode2));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			} else {
				if (datecallfrom.equals("over")) {

					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					
					sumOfRefund = (Double) criteriaSum.uniqueResult();

				} else {
					criteriaSum
							.add(Restrictions
									.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));

					criteriaSum.add(Restrictions.eq("payMode", payMode));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					//criteriaSum.add(Restrictions.eq("againstId", 0));
					sumOfRefund = (Double) criteriaSum.uniqueResult();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
		
	}

	/**
	 * @author :Bilal
	 * @date   :23-Aug-2017
	 * @code   :for total amount and cash card cheque amount based on date OPD
	 ***/
	@Override
	public double getTotalAmountDateWiseOPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			if (callfrom.equals("total")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.firstPaid) FROM BillReceiptMasterDTO AS c WHERE DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.deleted='N' ");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();
				
			} else if (callfrom.equals("card")) {
				payMode = 2;
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.firstPaid) FROM BillReceiptMasterDTO AS c WHERE c.deleted='N' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode BETWEEN :paym AND :payn ");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				bet.setParameter("paym", payMode);
				bet.setParameter("payn", payMode2);
				sumOfRefund = (Double) bet.uniqueResult();

			} else  {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.firstPaid) FROM BillReceiptMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode='1'");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :23-Aug-2017
	 * @code   :for total amount and cash card cheque amount based on date IPD
	 ***/
	@Override
	public double getTotalAmountDateWiseIPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			if (callfrom.equals("total")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillReceiptMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();
				
			} else if (callfrom.equals("card")) {
				payMode = 2;
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillReceiptMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode BETWEEN :paym AND :payn");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				bet.setParameter("paym", payMode);
				bet.setParameter("payn", payMode2);
				sumOfRefund = (Double) bet.uniqueResult();

			} else  {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillReceiptMasterDTO AS c WHERE c.deleted='N' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode='1'");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :23-Aug-2017
	 * @code   :for Refund amount Of OPD From Date to todate
	 ***/
	@Override
	public double getTotalRefundAmtDateWise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {

			if (callfrom.equals("total")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM BillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();
				
			} else if (callfrom.equals("card")) {
				payMode = 2;
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM BillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode BETWEEN :paym AND :payn");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				bet.setParameter("paym", payMode);
				bet.setParameter("payn", payMode2);
				sumOfRefund = (Double) bet.uniqueResult();

			} else  {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM BillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode='1'");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();

			}
			

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}
	/**
	 * @author :Bilal
	 * @date   :23-Aug-2017
	 * @code   :for Refund amount Of IPD From Date to todate
	 ***/
	@Override
	public double getTotalRefundAmtDateWiseIPD(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Double sumOfRefund = 0.0;
		Integer payMode = 1;
		Integer payMode2 = 3;
		try {
			
			if (callfrom.equals("total")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();
				
			} else if (callfrom.equals("card")) {
				payMode = 2;
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode BETWEEN :paym AND :payn");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				bet.setParameter("paym", payMode);
				bet.setParameter("payn", payMode2);
				sumOfRefund = (Double) bet.uniqueResult();

			} else  {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT sum(c.totalPaid) FROM IpdBillRefundMasterDTO AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND c.payMode='1'");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfRefund = (Double) bet.uniqueResult();

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfRefund;
		}
		if (sumOfRefund == null) {
			return sumOfRefund = 0.0;
		} else {
			return sumOfRefund;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :24-Aug-2017
	 * @code   :for OPD All Patient And Today and last month 
	 ***/
	@Override
	public Long getTotalPatientOPD(String callfrom, String datecallfrom) {

		Long sumOfPa = 0L;
		

		try {
			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentDto.class);

			if (callfrom.equals("total")) {

				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {

					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			} else if(callfrom.equals("active")) {
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}else{
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 1));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}
		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
		
	}

	/**
	 * @author :Bilal
	 * @date   :24-Aug-2017
	 * @code   :for IPD All Patient And Today and last month 
	 ***/
	@Override
	public Long getTotalPatientIPD(String callfrom, String datecallfrom) {

		Long sumOfPa = 0L;
		
		try {
			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentDto.class);

			if (callfrom.equals("total")) {

				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {

					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			} else if(callfrom.equals("active")) {
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}else{
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 2));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}

		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
		
	}

	/**
	 * @author :Bilal
	 * @date   :24-Aug-2017
	 * @code   :for OPD Total patient Date wise from datet to date 
	 ***/
	@Override
	public Long getTotalPatientOPDDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Long sumOfPa = 0L;
		try {

			if (callfrom.equals("totalp")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='1'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
				

			} else if(callfrom.equals("activep")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='1' AND tFlag='Y' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}else{
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='1' AND tFlag='N' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}

		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :24-Aug-2017
	 * @code   :for IPD Total patient Date wise from datet to date 
	 ***/
	@Override
	public Long getTotalPatientIPDDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Long sumOfPa = 0L;
		try {

			if (callfrom.equals("totalp")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='2'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
				

			} else if(callfrom.equals("activep")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='2' AND tFlag='Y' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}else{
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='2' AND tFlag='N' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}

		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :28-Aug-2017
	 * @code   :for Diagnostics Total patient 
	 ***/
	@Override
	public Long getTotalPatientDiagnostics(String callfrom, String datecallfrom) {

		Long sumOfPa = 0L;
		
		try {
			Criteria criteriaSum = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentDto.class);

			if (callfrom.equals("total")) {

				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {

					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			} else if(callfrom.equals("active")) {
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.add(Restrictions.eq("tFlag", "Y"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}else{
				if (datecallfrom.equals("over")) {
					
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));

					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();

				} else if (datecallfrom.equals("lastmonth")) {
					criteriaSum.add(Restrictions
							.sqlRestriction("month(created_date_time) = " + m
									+ " "));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				} else {
					criteriaSum
					.add(Restrictions
							.sqlRestriction("DATE(created_date_time)=CURDATE()"));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.add(Restrictions.eq("departmentId", 3));
					criteriaSum.add(Restrictions.eq("tFlag", "N"));
					criteriaSum.setProjection(Projections.rowCount());
					sumOfPa = (Long) criteriaSum.uniqueResult();
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}

		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
	}

	/**
	 * @author :Bilal
	 * @date   :28-Aug-2017
	 * @code   :for Diagnostics Total patient Date wise from datet to date 
	 ***/
	@Override
	public Long getTotalPatientDiagnosticsDatewise(String callfrom,
			String datecallfrom, java.sql.Date fromDate, java.sql.Date toDate) {

		Long sumOfPa = 0L;
		try {

			if (callfrom.equals("totalp")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='3'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
				

			}else if(callfrom.equals("activep")) {
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='3' AND tFlag='Y' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}else{
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM TreatmentDto AS c WHERE c.deleted='N' AND departmentId='3' AND tFlag='N' AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate");
				
				bet.setDate("stDate", fromDate);
				bet.setDate("edDate", toDate);
				sumOfPa = (Long) bet.uniqueResult();
					
			}

		} catch (Exception e) {
			e.printStackTrace();
			return sumOfPa;
		}

		if (sumOfPa == null) {
			return sumOfPa = 0L;
		} else {
			return sumOfPa;
		}
	}
}
