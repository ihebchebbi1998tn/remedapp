import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../Navigation/apiConfig";

// Fetch App Language
export const fetchAppLanguage = async (setAppLanguage) => {
  try {
    const value = await AsyncStorage.getItem("appLanguage");
    if (value) {
      const parsedValue = JSON.parse(value);
      setAppLanguage(parsedValue.key);
    }
  } catch (error) {
    console.error(error);
  }
};

export const markReportAsCollected = async (
  selectedMarker,
  markers,
  setMarkers,
  setFilteredMarkers,
  setSelectedMarker,
  setCollectModalVisible
) => {
  if (!selectedMarker || !markers) {
    console.error('Selected marker or markers array is undefined.');
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}api/reports/mark-collected?report_id=${selectedMarker.id}&pickedup_by=Technician B`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedMarkers = markers.map((marker) =>
        marker.id === selectedMarker.id
          ? { ...marker, state: "Collected" }
          : marker
      );
      setMarkers(updatedMarkers);
      setFilteredMarkers(updatedMarkers);
      setSelectedMarker(null);
      setCollectModalVisible(false);
    } else {
      console.error('Failed to mark report as collected:', response.statusText);
    }
  } catch (error) {
    console.error('Error marking report as collected:', error);
  }
};

// Mark Report as Reported
export const markReportAsReported = async (selectedMarker, markers, setMarkers, setFilteredMarkers, setSelectedMarker, setReportModalVisible) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/reports/mark-reported?report_id=${selectedMarker.id}&pickedup_by=Technician B`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedMarkers = markers.map((marker) =>
        marker.id === selectedMarker.id
          ? { ...marker, state: "Reported" }
          : marker
      );
      setMarkers(updatedMarkers);
      setFilteredMarkers(updatedMarkers);
      setSelectedMarker(null);
      setReportModalVisible(false);
    } else {
      console.error("Error marking report as reported:", response.status);
    }
  } catch (error) {
    console.error("Error marking report as reported:", error);
  }
};

export const fetchAllReports = async (setMarkers, setFilteredMarkers) => {
  try {
    const response = await fetch(`${BASE_URL}api/reports/all`);
    
    if (response.ok) {
      const data = await response.json();
      setMarkers(data);
      setFilteredMarkers(data);
    } else {
      console.error('Error fetching all reports:', response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};