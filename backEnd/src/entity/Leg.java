package entity;

import java.util.List;

public class Leg {
	List<Step> steps;
	
	private int distance; //distence in meters
	private int duration; //duration in seconds
	
	private String start_location_lat;
	private String start_location_lot;
	
	private String end_location_lat;
	private String end_location_lot;
	
	private String start_address;
	private String end_address;
	
	
	//TODO: Implement Builder Design Pattern

}
