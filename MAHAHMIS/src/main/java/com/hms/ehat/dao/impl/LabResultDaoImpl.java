package com.hms.ehat.dao.impl;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.MsSqlServerConnection;
import com.hms.ehat.dao.LabResultDao;
import com.hms.ehat.dto.LabResultDTO;

@Repository
public class LabResultDaoImpl implements LabResultDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<LabResultDTO> getResult(String reqNo) {
		ArrayList<LabResultDTO> al = new ArrayList<LabResultDTO>();
		try {
			Connection connection = MsSqlServerConnection.getConnection();
			if (connection != null) {
				String sql = "select * from LISRESULTVIEW where OrderID in ("+reqNo+") order by OrderID asc ";
				
				// Prepare a statement
				Statement ps = connection.createStatement();
				
			    ResultSet rs = ps.executeQuery(sql) ;
			    while( rs.next() ){
			    	LabResultDTO lrd = new LabResultDTO(
			    			rs.getString("VisitCode"),
			    			rs.getInt("OrderID"),
			    			rs.getDate("VisitDate"),
			    			rs.getString("FullName"),
			    			rs.getString("ServiceName"),
			    			rs.getString("SampleStatus"),
			    			rs.getString("StatusDescription"),
			    			rs.getString("ItemName"),
			    			rs.getString("Result"),
			    			rs.getString("NormalLow"),
			    			rs.getString("NormalHigh"),
			    			rs.getString("NormalRange"),
			    			rs.getString("PrintUnit"),
			    			"-");//rs.getString("VisitType")
			    	al.add(lrd);
			    }
			    rs.close();
			    ps.close();
			    connection.close();
			    	
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return al;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Integer> getReqNoByTid(Integer tid) {
		List<Integer> list=null;
		
		try {
			Query query = sessionFactory
					.getCurrentSession()
					.createQuery("SELECT labRequestId FROM LabRequestDTO where treatmentId= :tid and discardFlag= :dflag ");
				query.setParameter("tid", tid);
				query.setParameter("dflag", 'N');
				list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}
