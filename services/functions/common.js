

//Calculates distance between two points
export function getDistanceFromLatLonInMi(dist1, dist2) {
  if (!dist1 || !dist2) {
    return 0;
  }

  var R = 3958.8; // Radius of the earth in km
  var dLat = deg2rad(dist2.latitude - dist1.lat);  // deg2rad below
  var dLon = deg2rad(dist2.longitude - dist1.long);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(dist1.lat)) * Math.cos(deg2rad(dist2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return Math.round(d * 100) / 100;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}