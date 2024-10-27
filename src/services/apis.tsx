const HARDCODED_BASE_URL_FOR_TESTING = "https://inland-katee-xavis-0b1b3b63.koyeb.app";

export const getDeviceStatus = async () => {
  const response = await fetch(`${HARDCODED_BASE_URL_FOR_TESTING}/check-device-status`);
  if (!response.ok) throw new Error("Failed to fetch device status");
  return response.json();
};

export const getSensorData = async () => {
  const response = await fetch(`${HARDCODED_BASE_URL_FOR_TESTING}/get-sensor-data`);
  if (!response.ok) throw new Error("Failed to fetch sensor data");
  return response.json();
};

export const getSerialMessages = async () => {
  const response = await fetch(`${HARDCODED_BASE_URL_FOR_TESTING}/latest-serial-messages`);
  if (!response.ok) throw new Error("Failed to fetch serial messages");
  return response.json();
};
