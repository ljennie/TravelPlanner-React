package entity;

import java.util.ArrayList;
import java.util.List;

public class Leg {
	List<Step> steps;

	private int distance; // distence in meters
	private int duration; // duration in seconds

	private String start_location_lat;
	private String start_location_lot;

	private String end_location_lat;
	private String end_location_lot;

	private String start_address;
	private String end_address;

	public static class LegBuilder {

		private int distance;
		private int duration;

		private String start_location_lat;
		private String start_location_lot;

		private String end_location_lat;
		private String end_location_lot;

		private String start_address;
		private String end_address;

		List<Step> steps;

		public Leg build() {
			return new Leg(this);
		}

		public LegBuilder() {
			this.steps = new ArrayList<Step>();
		}

		public void setDistance(int distance) {
			this.distance = distance;
		}

		public void setDuration(int duration) {
			this.duration = duration;
		}

		public void setStart_location_lat(String start_location_lat) {
			this.start_location_lat = start_location_lat;
		}

		public void setStart_location_lot(String start_location_lot) {
			this.start_location_lot = start_location_lot;
		}

		public void setEnd_location_lat(String end_location_lat) {
			this.end_location_lat = end_location_lat;
		}

		public void setEnd_location_lot(String end_location_lot) {
			this.end_location_lot = end_location_lot;
		}

		public void setStart_address(String start_address) {
			this.start_address = start_address;
		}

		public void setEnd_address(String end_address) {
			this.end_address = end_address;
		}

		public void addStep(Step e) {
			this.steps.add(e);
		}

	}

	public Leg(LegBuilder builder) {
		this.distance = builder.distance;
		this.duration = builder.duration;
		this.start_address = builder.start_address;
		this.end_address = builder.end_address;
		this.start_location_lat = builder.start_location_lat;
		this.start_location_lot = builder.start_location_lot;
		this.end_location_lat = builder.end_location_lat;
		this.end_location_lot = builder.end_location_lot;
		this.steps = builder.steps;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public int getDistance() {
		return distance;
	}

	public int getDuration() {
		return duration;
	}

	public String getStart_location_lat() {
		return start_location_lat;
	}

	public String getStart_location_lot() {
		return start_location_lot;
	}

	public String getEnd_location_lat() {
		return end_location_lat;
	}

	public String getEnd_location_lot() {
		return end_location_lot;
	}

	public String getStart_address() {
		return start_address;
	}

	public String getEnd_address() {
		return end_address;
	}

}
