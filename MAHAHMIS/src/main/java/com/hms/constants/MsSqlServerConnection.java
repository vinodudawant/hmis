package com.hms.constants;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ResourceBundle;

public class MsSqlServerConnection {
	
	
	public static Connection getConnection(){
		Connection connection=null;
		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("datasource");
			String driverClass	=resourceBundle.getObject("driverClassNameLab").toString();
			String url			=resourceBundle.getObject("databaseUrlLab").toString();
			String userName		=resourceBundle.getObject("usernameLab").toString();
			String password		=resourceBundle.getObject("passwordLab").toString();
			//Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
			//connection = DriverManager.getConnection("jdbc:odbc:user_DSN");
			// String dbURL = "jdbc:sqlserver://localhost:1433;databaseName=orca;integratedSecurity=true";
			 //connection = DriverManager.getConnection("jdbc:sqlserver://192.168.1.102:1433;databaseName=orca","sa" , "p@ssw0rd");
			 Class.forName(driverClass);
			 connection = DriverManager.getConnection(url,userName , password);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		
		return connection;
		
		
	}

}
