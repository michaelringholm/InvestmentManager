package dk.ihedge.finance.dtl;

import java.util.Date;

public class Tournament {
	public enum UserRoleEnum { Standard, Admin, Owner };
	
	private int id;
	private String title;
	private boolean isPublic;
	private boolean isSignedUp;
	private Date startDate;
	private Date endDate;
	private double startCash;
	
	
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isPublic() {
		return isPublic;
	}
	public void setPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
	public boolean isSignedUp() {
		return isSignedUp;
	}
	public void setSignedUp(boolean isSignedUp) {
		this.isSignedUp = isSignedUp;
	}
	public double getStartCash() {
		return startCash;
	}
	public void setStartCash(double startCash) {
		this.startCash = startCash;
	}
}
