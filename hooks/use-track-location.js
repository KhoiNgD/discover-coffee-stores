import { useState } from "react";

function useTrackLocation() {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  function success(position) {
    const { latitude, longitude } = position.coords;
    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  }

  function error() {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  }

  function handleTrackLocation() {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return { latLong, locationErrorMsg, isFindingLocation, handleTrackLocation };
}

export default useTrackLocation;
